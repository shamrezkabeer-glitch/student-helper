const mongoose = require("mongoose");

const practiceQuestionSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("PracticeQuestion", practiceQuestionSchema);