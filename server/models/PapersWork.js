const mongoose = require("mongoose");

const papersWorkSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  group: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("PapersWork", papersWorkSchema);