const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const API_KEY = "7f55ef3b14aa4fbc8c3359aeaab83792";

app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// NEW ROUTE (important)
app.get("/news", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    res.json(response.data.articles);
  } catch (error) {
    res.send("Error fetching news");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


app.post("/summarize", (req, res) => {
  const text = req.body.text;

  const summary = `This article is about: ${text}. It gives a quick overview in simple terms.`;

  res.json({ summary });
});