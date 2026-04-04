import { useEffect, useState } from "react";

function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/news`)
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.log(err));
  }, [category]);

  const getSummary = async (title) => {
    const res = await fetch("http://127.0.0.1:5000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: title }),
    });

    const data = await res.json();
    alert(data.summary);
  };

  const theme = {
    bg: dark ? "#0f172a" : "#f1f5f9",
    text: dark ? "#e2e8f0" : "#0f172a",
    card: dark ? "#1e293b" : "#ffffff",
    accent: "#38bdf8"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.bg,
      color: theme.text,
      fontFamily: "Arial",
      padding: "20px"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h1 style={{
  fontSize: "40px",
  fontWeight: "bold",
  lineHeight: "1.2",
  paddingBottom: "5px",
  background: "linear-gradient(90deg, #38bdf8, #6366f1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
}}>
  🚀 NovaNews
</h1>

        <button
          onClick={() => setDark(!dark)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "12px",
          width: "100%",
          borderRadius: "8px",
          border: "none",
          marginBottom: "15px"
        }}
      />

      {/* CATEGORY BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        {["general", "technology", "business", "sports"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              marginRight: "10px",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: category === cat ? theme.accent : "#94a3b8",
              color: "white"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px"
      }}>

        {news
          .filter(article =>
            article.title?.toLowerCase().includes(search.toLowerCase())
          )
          .map((article, i) => (

            <div key={i} style={{
              background: theme.card,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
cursor: "pointer",
            }}
           onMouseEnter={e => {
  e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
}}
onMouseLeave={e => {
  e.currentTarget.style.transform = "translateY(0) scale(1)";
}}>

              {/* IMAGE */}
              <img
                src={
                  article.urlToImage ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt=""
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div style={{ padding: "15px" }}>
                <h3>{article.title}</h3>
                <p style={{ fontSize: "12px", opacity: 0.7 }}>
  {article.source?.name}
</p>
                <p>{article.description}</p>

                <a href={article.url} target="_blank" style={{ color: theme.accent }}>
                  Read more →
                </a>

                <br />

                <button
                  onClick={() => getSummary(article.title)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    backgroundColor: theme.accent,
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "white"
                  }}
                >
                  🤖 AI Summary
                </button>
              </div>

            </div>
          ))}

      </div>
    </div>
  );
}

export default App;