import { ArrowDown, X, Check, FileQuestion } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQuizStore } from "../AuthStore/quizStore";
import { useNavigate } from "react-router-dom";
import { ProgressRing } from "./ProgressingRing";
import { useAnimatedCounter } from "./useAnimate";

const MCQ = () => {
  const quizStore = useQuizStore();
  const navigate = useNavigate();

  // 🔹 restore quizId safely (NO early return)
  const storedQuizId = localStorage.getItem("active-quiz-id");
  const quizId = quizStore.quizId || storedQuizId;
  const mcqs = quizStore.mcqs;
  const calculate = quizStore.calculate;

  // 🔹 persist quizId (MUST be before usage)
  useEffect(() => {
    if (quizId) {
      localStorage.setItem("active-quiz-id", quizId);
    }
  }, [quizId]);

  const STORAGE_KEY = quizId ? `quiz-progress-${quizId}` : null;
  const QUIZ_DATA_KEY = quizId ? `quiz-data-${quizId}` : null;

  // ---------- restore progress ----------
  const getSavedState = () => {
    if (!STORAGE_KEY) return null;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  };

  const saved = getSavedState();

  const [currentIndex, setCurrentIndex] = useState(saved?.currentIndex ?? 0);
  const [selected, setSelected] = useState(saved?.selected ?? null);
  const [answered, setAnswered] = useState(saved?.answered ?? false);
  const [showHint, setShowHint] = useState(false);
  const [correct, setCorrect] = useState(saved?.correct ?? 0);
  const [showResult, setShowResult] = useState(false);
  const [attempt, setattempt] = useState(saved?.attempt ?? []);
    const [totalQuestions, setTotalQuestions] = useState(0);
  const animatedScore = useAnimatedCounter(correct);

  // ---------- persist MCQs ----------
  useEffect(() => {
    if (mcqs && mcqs.length > 0 && QUIZ_DATA_KEY) {
      localStorage.setItem(QUIZ_DATA_KEY, JSON.stringify(mcqs));
    }
  }, [mcqs, QUIZ_DATA_KEY]);

  // ---------- persist progress ----------
  useEffect(() => {
    if (!STORAGE_KEY) return;

    const progress = {
      currentIndex,
      selected,
      answered,
      correct,
      attempt,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [currentIndex, selected, answered, correct, attempt, STORAGE_KEY]);

  // ---------- restore MCQs if zustand empty ----------
  let quizQuestions = mcqs;

  if ((!mcqs || mcqs.length === 0) && QUIZ_DATA_KEY) {
    const savedMcqs = localStorage.getItem(QUIZ_DATA_KEY);
    if (savedMcqs) {
      quizQuestions = JSON.parse(savedMcqs);
    }
  }

  // ---------- SAFE RENDER GUARDS ----------
  if (!quizId && !showResult) {
    return <div className="text-white">Restoring quiz…</div>;
  }

  if ((!quizQuestions || quizQuestions.length === 0) && !showResult) {
    return <div className="text-white">No quiz data found</div>;
  }

 const current = quizQuestions[currentIndex];

  const handleOptionClick = (option) => {
    if (answered) return;

    const isCorrect = option === current.correctAnswer;

    setSelected(option);
    setAnswered(true);

    if (isCorrect) {
      setCorrect((prev) => prev + 1);
    }

    setattempt((prev) => [
      ...prev,
      {
        questionIndex: currentIndex,
        selectedOption: option,
        question: current.question,
        options: current.options,
        explanation: current.explanation,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex === quizQuestions.length - 1) {
      calculate({ quizId, attempt });
        setTotalQuestions(quizQuestions.length)
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(QUIZ_DATA_KEY);

      setShowResult(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
    setAnswered(false);
    setShowHint(false);
  };

  return (
    <>
      {!showResult && (
        <div className="h-fit w-full max-w-xl bg-linear-to-br from-purple-950 via-violet-900 to-purple-900 py-8 pb-0 rounded-2xl shadow-xl text-white">
        <div className="px-6 flex flex-col gap-6">
          {/* Top bar */}
          <div className="flex justify-between items-center text-sm text-purple-200">
            <p>
              Question {currentIndex + 1} / {quizQuestions.length}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-purple-950 rounded-full overflow-hidden border border-purple-700/40">
            <div
              className="h-full bg-linear-to-r from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg shadow-violet-600/50 transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / quizQuestions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question + Hint */}
          <div className="flex items-center justify-evenly gap-3">
            <div className="text-lg font-medium">{current.question}</div>
            <div
              onClick={() => setShowHint((p) => !p)}
              onMouseEnter={() => setShowHint(true)}
              onMouseLeave={() => setShowHint(false)}
              className="relative flex items-center gap-1 text-sm text-purple-300 cursor-pointer w-fit"
            >
              <FileQuestion className="w-4 h-4" />
              <span>Hint</span>

              {showHint && current.hint && (
                <div className="absolute right-17 sm:right-15 w-64 p-3 rounded-xl bg-gray-950 border border-purple-700 text-purple-100 text-xs shadow-lg z-20">
                  {current.hint}
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {current.options.map((opt, i) => {
              const isCorrect = opt === current.correctAnswer;
              const isSelected = selected === opt;

              let borderColor = "border-purple-700/40";
              let bgColor = "bg-purple-800/40";

              if (answered) {
                if (isCorrect) {
                  borderColor = "border-violet-400";
                  bgColor = "bg-violet-500/20";
                } else if (isSelected) {
                  borderColor = "border-pink-500";
                  bgColor = "bg-pink-500/20";
                } else {
                  bgColor = "opacity-50";
                }
              }

              return (
                <div
                  key={i}
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full p-4 rounded-xl flex justify-between border transition
                    ${borderColor} ${bgColor}
                    ${answered ? "cursor-not-allowed" : "cursor-pointer hover:bg-purple-700/50"}
                  `}
                >
                  <span>
                    {String.fromCharCode(65 + i)}. {opt}
                  </span>

                  {answered && isCorrect && <Check className="text-green-400" />}
                  {answered && isSelected && !isCorrect && (
                    <X className="text-red-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Score footer */}
        {correct > 0 && (
          <div className="w-full mt-6 p-5 bg-linear-to-r from-purple-800 via-violet-700 to-purple-900 text-center">
            Correct • {animatedScore} / {quizQuestions.length}
          </div>
        )}

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={!answered}
          className="w-full mt-6 p-5 bg-linear-to-r from-violet-600 to-purple-700 rounded-b-2xl font-semibold cursor-pointer hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed "
        >
          {currentIndex === quizQuestions.length - 1
            ? "Finish Quiz"
            : <p className="hover:scale-105 font-bold">Next Question</p>}
        </button>
      </div>
      )}

      {showResult && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-[90%] max-w-md bg-linear-to-br from-purple-950 via-violet-900 to-purple-900 rounded-3xl p-8 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-violet-200 mb-4">
              Quiz Completed 🎉
            </h2>

            <div className="text-6xl font-extrabold text-violet-100 mb-2">
              {animatedScore}
            </div>
            <p className="text-violet-300 mb-6">
              out of {totalQuestions}
            </p>

            <div className="flex justify-center mb-6">
              <ProgressRing value={correct} total={totalQuestions} />
            </div>

            <button
              onClick={() => {
             localStorage.removeItem("active-quiz-id");
               navigate("/ai-quiz");
              }}
              className="w-full py-3 rounded-xl bg-linear-to-r from-violet-600 to-purple-700 font-semibold text-white cursor-pointer"
            >
              Start New Quiz
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MCQ;