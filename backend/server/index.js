const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/api/news", async (req, res) => {
  const { category = "general" } = req.query;
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));