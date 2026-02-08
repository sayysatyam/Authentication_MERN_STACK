const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    profilePic : {
      type:String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
  },
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    streak: {
  type: Number,
  default: 0,
},
lastActiveDate: {
  type: Date,
},
    resetPasswordToken: String,
    resetPasswordExpireAt: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date,
    lastVerificationEmailSentAt: {
  type: Date,
},
 stats: {
    totalQuizzesGenerated: {
      type: Number,
      default: 0,
    },
    totalQuestionsGenerated: {
      type: Number,
      default: 0,
    },
    totalCorrectAnswer : {
      type:Number,
      default:0,
    },
    quizzesByLevel: {
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    },
    correctByLevel: {
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    },
    questionByLevel:{
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    }
  },
  weeklyGoal: {
  type: Number,
  default: 10,
},
weeklyCompleted: {
  type: Number,
  default: 0,
},
lastWeeklyReset: {
  type: Date,
},
provider: {
  type: String,
  enum: ["local", "google"],
  default: "local",
},

googleId: {
  type: String,
},

avatar: {
  type: String,
},
},
  { timestamps: true },
);

const user = mongoose.model("user", userSchema);

module.exports = user;
