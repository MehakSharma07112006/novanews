import { useEffect, useState } from "react";

const GNEWS_API_KEY = "YOUR_GNEWS_API_KEY"; // <-- paste your GNews key here

function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true);
  const [category, setCategory] = useState("nation");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=20&apikey=${GNEWS_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setNews(data.articles.map(a => ({
            title: a.title,
            description: a.description,
            url: a.url,
            urlToImage: a.image,
            source: { name: a.source.name }
          })));
        } else {
          setNews([]);
        }
      })
      .catch(() => {
        setNews([
          {
            title: "SpaceX launches new rocket",
            description: "A major milestone in aerospace engineering.",
            url: "https://example.com",
            urlToImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400",
            source: { name: "Demo News" },
          },
          {
            title: "AI transforming industries",
            description: "Artificial intelligence is reshaping the future of work.",
            url: "https://example.com",
            urlToImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400",
            source: { name: "Tech Daily" },
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  const getSummary = (title) => {
    const summary = `This article discusses ${title}. It provides a quick overview of the topic.`;
    alert(summary);
  };

  const theme = {
    bg: dark ? "#0f172a" : "#f1f5f9",
    text: dark ? "#e2e8f0" : "#0f172a",
    card: dark ? "#1e293b" : "#ffffff",
    accent: "#38bdf8",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            lineHeight: "1.2",
            paddingBottom: "5px",
            background: "linear-gradient(90deg, #38bdf8, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🚀 NovaNews
        </h1>
        <button
          onClick={() => setDark(!dark)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
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
          marginBottom: "15px",
          boxSizing: "border-box",
        }}
      />

      {/* CATEGORY BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        {["nation", "technology", "business", "sports"].map((cat) => (
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
              color: "white",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING STATE */}
      {loading && (
        <p style={{ textAlign: "center", opacity: 0.6 }}>Loading news...</p>
      )}

      {/* GRID */}
      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {news
            .filter((article) =>
              article.title?.toLowerCase().includes(search.toLowerCase())
            )
            .map((article, i) => (
              <div
                key={i}
                style={{
                  background: theme.card,
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                {/* IMAGE */}
                <img
                  src={
                    article.urlToImage ||
                    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400"
                  }
                  alt=""
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400";
                  }}
                />
                <div style={{ padding: "15px" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "15px" }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: "12px", opacity: 0.7, margin: "0 0 8px" }}>
                    {article.source?.name}
                  </p>
                  <p style={{ fontSize: "13px", margin: "0 0 10px" }}>
                    {article.description}
                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: theme.accent }}
                  >
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
                      color: "white",
                    }}
                  >
                    🤖 AI Summary
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
