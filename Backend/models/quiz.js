const mongoose = require('mongoose');

const quizActivitySchema = new mongoose.Schema({
        createdBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"user",
            required: true,
        },
        title : {
            type:String,
            required:true,
            trim:true,
        },
        prompt: {
      type: String,
      trim: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
     answersKey: {
      type: [String],
      required: true,
      select: false,  
    },
    totalCorrected : {
      type:Number,
      required : true,
    },
    level : {
      type:String,
      required:true
    },
    
},{timestamps:true});

const quiz = mongoose.model("quiz",quizActivitySchema);
module.exports = quiz;