const express = require("express");
const router = express.Router();
const PapersWork = require("../models/PapersWork");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Sab papers lene ke liye
router.get("/", async (req, res) => {
  try {
    const papers = await PapersWork.find();
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Naya paper add karne ke liye
router.post("/", async (req, res) => {
  const paper = new PapersWork({
    class: req.body.class,
    group: req.body.group,
    subject: req.body.subject,
    type: req.body.type,
    fileUrl: req.body.fileUrl,
    title: req.body.title,
  });

  try {
    const newPaper = await paper.save();
    res.status(201).json(newPaper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// File upload endpoint
router.post("/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "student-helper/papers",
      resource_type: "auto",
    });

    res.json({
      url: result.secure_url,
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.log("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Paper update karne ke liye (Edit)
router.put("/:id", async (req, res) => {
  try {
    const paper = await PapersWork.findById(req.params.id);
    if (req.body.class) paper.class = req.body.class;
    if (req.body.group !== undefined) paper.group = req.body.group;
    if (req.body.subject) paper.subject = req.body.subject;
    if (req.body.type) paper.type = req.body.type;
    if (req.body.fileUrl) paper.fileUrl = req.body.fileUrl;
    if (req.body.title) paper.title = req.body.title;

    const updatedPaper = await paper.save();
    res.json(updatedPaper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Paper delete karne ke liye
router.delete("/:id", async (req, res) => {
  try {
    await PapersWork.findByIdAndDelete(req.params.id);
    res.json({ message: "Paper deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;