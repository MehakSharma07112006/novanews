export default async function handler(req, res) {
  const { title, description } = req.query;
  const prompt = `Summarize this news article in 2 sentences. Title: ${title}. Description: ${description}`;
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data));
    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ summary: "Error: " + err.message });
  }
}