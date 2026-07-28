const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileFolder: "./tmp",
}));

app.get("/", (req, res) => {
  res.send("Server chal raha hai!");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB se connect ho gaya!"))
  .catch((err) => console.log("MongoDB connect nahi hua:", err));

const newsRoutes = require("./routes/newsRoutes");
app.use("/api/news", newsRoutes);

const papersWorkRoutes = require("./routes/papersWorkRoutes");
app.use("/api/papers", papersWorkRoutes);

const practiceQuestionRoutes = require("./routes/practiceQuestionRoutes");
app.use("/api/questions", practiceQuestionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} pe`);
});