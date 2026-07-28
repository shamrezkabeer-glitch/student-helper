const express = require("express");
const router = express.Router();
const News = require("../models/News");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Sab news lene ke liye
router.get("/", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Nayi news add karne ke liye (with image upload)
router.post("/", async (req, res) => {
  try {
    let imageUrl = "";

    // Agar image URL provide kiya hai, use that
    if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    const news = new News({
      class: req.body.class,
      category: req.body.category,
      title: req.body.title,
      date: req.body.date,
      imageUrl: imageUrl,
    });

    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// News update karne ke liye (Edit)
router.put("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (req.body.class) news.class = req.body.class;
    if (req.body.category) news.category = req.body.category;
    if (req.body.title) news.title = req.body.title;
    if (req.body.date) news.date = req.body.date;
    if (req.body.imageUrl) news.imageUrl = req.body.imageUrl;

    const updatedNews = await news.save();
    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// News delete karne ke liye
router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      folder: "student-helper/news",
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

module.exports = router;