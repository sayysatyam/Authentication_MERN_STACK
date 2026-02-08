const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quiz",
      required: true,
      index: true,
    },

   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
answers: [
  {
    questionId: {
      type: Number,     // ✅ FIX
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    question:{
      type:String,
      required:true
    },
    options:{
      type:[String],
      require:true,
    },
    explanation : {
      type:String,
      required:true,
    },
    correctOption : {
      type:String,
      required:true
    }
  }
],
    correctAnswers: {
      type: Number,
      required: true,
    },

    scorePercentage: {
      type: Number,
      required: true,
    },
  },
  
  { timestamps: true }
);

const QuizAttempt = mongoose.model("quizAttempt", quizAttemptSchema);
module.exports = QuizAttempt;
