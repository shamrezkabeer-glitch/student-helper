const express = require("express");
const router = express.Router();
const PracticeQuestion = require("../models/PracticeQuestion");

// Sab questions lene ke liye
router.get("/", async (req, res) => {
  try {
    const questions = await PracticeQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Naya question add karne ke liye
router.post("/", async (req, res) => {
  const question = new PracticeQuestion({
    class: req.body.class,
    subject: req.body.subject,
    chapter: req.body.chapter,
    question: req.body.question,
    solution: req.body.solution,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Question update karne ke liye (Edit)
router.put("/:id", async (req, res) => {
  try {
    const question = await PracticeQuestion.findById(req.params.id);
    if (req.body.class) question.class = req.body.class;
    if (req.body.subject) question.subject = req.body.subject;
    if (req.body.chapter) question.chapter = req.body.chapter;
    if (req.body.question) question.question = req.body.question;
    if (req.body.solution) question.solution = req.body.solution;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Question delete karne ke liye
router.delete("/:id", async (req, res) => {
  try {
    await PracticeQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;