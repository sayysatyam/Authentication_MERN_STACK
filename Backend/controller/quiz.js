const axios = require("axios");
const quiz = require("../models/quiz");
const user = require("../models/user");
const QuizAttempt = require("../models/quizAttempted");
const updateStreak = require("../utilis/updateStreak");
const checkWeeklyReset = require("../utilis/checkWeeklyGoal");
require("dotenv").config();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const geminiResponse = async (req, res) => {
  let { prompt, number,level } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  number = Number(number) || 10;
    level = String(level)  || "Medium";
  const request = `
You are an exam question generator.

Generate exactly ${number} MCQs and level of mcq will be ${level} from the content below.

Rules:
- Each question has exactly 4 options
- Only one correct answer
- Output ONLY valid JSON array
- No explanation text
- give a hint according to that question within less than 10 words and hint should be not match direclty with option . it must be hint .
- give title in 5 words
-give a short explanation for corresponding answer of question or option not more than 25 words
JSON format:
[
  {
    title : "",
    "question": "",
    "options": ["", "", "", ""],
    "correctAnswer": "",
    "hint": "",
    "explanation":"",
  }
]

Content:
${prompt}
`;

  let attempts = 0;

  while (attempts < 3) {
    try {
      const result = await axios.post(
        process.env.GEMINI_API_URL,
        {
          contents: [{ parts: [{ text: request }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY,
          },
          timeout: 40000,
        },
      );

      const text = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) throw new Error("Empty AI response");

      const match = text.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Invalid JSON");

      const mcqs = JSON.parse(match[0]);

      if (!Array.isArray(mcqs)) {
        throw new Error("MCQs not array");
      }

      const promptTitle = prompt
        .split(".")[0]
        .split("\n")[0]
        .trim()
        .slice(0, 100);
      const aiTitle =
        mcqs[0]?.title && typeof mcqs[0].title === "string"
          ? mcqs[0].title.trim()
          : null;

      const finalTitle = aiTitle || promptTitle;

      const answersKey = mcqs.map((q) => q.correctAnswer);

      const quizActivity = new quiz({
        createdBy: req.userId,
        prompt: prompt,
        totalQuestions: number,
        title: finalTitle,
        answersKey,
        totalCorrected: 0,
        level : level
      });
      await quizActivity.save();
     const levelKey = level.toLowerCase();
      await user.findByIdAndUpdate(req.userId, {
        $inc: {
          "stats.totalQuizzesGenerated": 1,
          "stats.totalQuestionsGenerated": number,
          [`stats.quizzesByLevel.${levelKey}`] : 1,
          [`stats.questionByLevel.${levelKey}`] : number,
          
        },
      });
      return res.status(200).json({
        success: true,
        mcqs,
        quizId: quizActivity._id,
        title: quizActivity.title,
        totalQuestions: quizActivity.totalQuestions,
      });
    } catch (err) {
      attempts++;

      if (err.response?.status === 503 && attempts < 3) {
        await sleep(1000 * attempts);
        continue;
      }

      console.error("Gemini Error:", err.message);
      return res.status(500).json({ error: "AI failed" });
    }
  }

  return res.status(503).json({
    error: "Gemini overloaded. Please try again later.",
  });
};

const calculate = async (req, res) => {
  const { quizId, attempt } = req.body;
  try {
    const quizData = await quiz.findById(quizId).select("+answersKey");
    if (!quizData) {
      return res.status(400).send({ error: "Invalid Quiz" });
    }
    const answerKey = quizData.answersKey;
    let correctCount = 0;
    if (!Array.isArray(attempt)) {
      return res.status(400).json({ error: "Invalid attempt data" });
    }
    const verifiedAttempt = attempt.map((a) => {
      const correctAnswer = answerKey[a.questionIndex];
    
      const isCorrect = a.selectedOption === correctAnswer;
      if (isCorrect) {
        correctCount++;
      }
      return {
        questionIndex: a.questionIndex,
        selectedOption: a.selectedOption,
        correctAnswer,
        isCorrect,
        question : a.question,
        options:a.options,
        explanation : a.explanation
      };              
    });
     const answers = verifiedAttempt.map((a) => ({
      questionId: a.questionIndex,              
            selectedOption: a.selectedOption,
      isCorrect: a.isCorrect,
      question:a.question,
      options : a.options,
      explanation : a.explanation,
      correctOption:a.correctAnswer
    }));
    const totalQuestions = answerKey.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const result = new QuizAttempt({
      quizId: quizId,
      createdBy: req.userId,
      correctAnswers: correctCount,
      scorePercentage: percentage,
      answers,
    });
    await result.save();

    const userDoc = await user.findById(req.userId);
    if (userDoc) {
      updateStreak(userDoc);
       checkWeeklyReset(userDoc);
      userDoc.weeklyCompleted += 1;
      await userDoc.save();
    };
    const levelKey = quizData.level.toLowerCase();
    const allowedLevels = ["easy", "medium", "hard"];
      if (!allowedLevels.includes(levelKey)) {
     return res.status(400).json({ error: "Invalid quiz level" });
};

    const userActivity = await user.findByIdAndUpdate(
      req.userId,
      {
        $inc: {
          "stats.totalCorrectAnswer": correctCount,
          [`stats.correctByLevel.${levelKey}`]: correctCount,
        },
      },
      { new: true },
    );
    await quiz.findByIdAndUpdate(quizId, {
      totalCorrected: correctCount,
    });

    if (!userActivity) {
      return res.status(400).send({ error: "No User" });
    }
    res.status(200).json({
      score: correctCount,
      percentage,
    });
  } catch (error) {
    console.log("Error Not creating");
    res.status(500).json({ error: "Server error" });
  }
};
const fetchStat = async (req, res) => {
  const userData = await user.findById(req.userId).select("stats");
  if (!userData) {
    return res.status(500).json({ error: "Error" });
  }
  res.json(userData.stats);
};
const recentActivity = async (req, res) => {
  try {
    const quizzes = await quiz
      .find({ createdBy: req.userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title totalQuestions totalCorrected level createdAt");

    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activity" });
  }
};

const recenttenActivity = async (req, res) => {
  try {
    const quizzes = await quiz.find({ createdBy: req.userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("totalQuestions totalCorrected  createdAt");
    res.status(200).json(quizzes.reverse());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
};
const getQuizHistory = async(req,res)=>{
  try {
      const { quizId } = req.params;
      const attempt = await QuizAttempt.findOne({
      quizId,
      createdBy: req.userId,
    }).sort({ createdAt: -1 });
       if (!attempt) {
      return res.status(404).json({ error: "No attempt found" });
    };
     res.status(200).json(attempt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quiz attempt" });
  }
};
const userStreak = async (req, res) => {
  try {
    const userData = await user.findById(req.userId).select("streak");
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ streak: userData.streak });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
const getWeeklyGoal = async (req, res) => {
  try {
    const userData = await user.findById(req.userId)
      .select("weeklyGoal weeklyCompleted");

    res.json({
      weeklyGoal: userData.weeklyGoal,
      weeklyCompleted: userData.weeklyCompleted,
    });
  } catch {
    res.status(500).json({ error: "Error" });
  }
};
const setWeeklyGoal = async (req, res) => {
  const { goal } = req.body;

  if (goal < 1 || goal > 50) {
    return res.status(400).json({ error: "Invalid goal" });
  }

  await user.findByIdAndUpdate(req.userId, {
    weeklyGoal: goal,
    weeklyCompleted:0
  });


  res.json({ success: true });
};
const history = async (req, res) => {
  try {
    const quizzes = await quiz
      .find({ createdBy: req.userId })
      .sort({ createdAt: -1 })
      .select("title totalQuestions totalCorrected level createdAt");

    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activity" });
  }
};

module.exports = {
  geminiResponse,
  calculate,
  fetchStat,
  recentActivity,
  recenttenActivity,
  getQuizHistory,
  userStreak,
  getWeeklyGoal,
  setWeeklyGoal,
  history,
};
