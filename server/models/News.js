const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);