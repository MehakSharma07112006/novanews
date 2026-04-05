const axios = require("axios");

module.exports = async (req, res) => {
  const { category = "general" } = req.query;
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`;
  const response = await axios.get(url);
  res.json(response.data);
};