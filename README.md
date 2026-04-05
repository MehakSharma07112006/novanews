🚀 NovaNews — AI-Enhanced News Portal
A full-stack personalized news dashboard with AI-powered summaries built for the AI & Software Guild Recruitment 2026.
Live Demo: https://novanews-three.vercel.app
---
Tech Stack
Frontend: React + Vite
Backend: Vercel Serverless Functions
News API: GNews API
AI: Google Gemini API
---
Prerequisites
Make sure you have these installed:
Node.js (v18 or above)
Git
---
Getting Started Locally
1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
2. Install frontend dependencies
```bash
cd frontend
npm install
```
3. Set up environment variables
Create a `.env` file inside the `frontend` folder:
```
GNEWS_API_KEY=your_gnews_api_key
GEMINI_API_KEY=your_gemini_api_key
```
Get your free API keys from:
GNews: https://gnews.io
Gemini: https://aistudio.google.com
4. Run the frontend
```bash
npm run dev
```
Open http://localhost:5173 in your browser.
> **Note:** The `/api/news` and `/api/summary` serverless functions only work on Vercel. To test locally, you can temporarily hardcode your API keys directly in the fetch URLs inside `src/App.jsx`.
---
Project Structure
```
software_guild2026/
├── frontend/
│   ├── api/
│   │   ├── news.js        # Serverless function for fetching news
│   │   └── summary.js     # Serverless function for AI summaries
│   ├── src/
│   │   └── App.jsx        # Main React component
│   └── package.json
└── backend/               # Express backend (local development only)
    └── index.js
```
---
Features
📰 Live news headlines fetched from GNews API
🔍 Search news by keyword
📂 Filter by category (Nation, Technology, Business, Sports)
🤖 AI-powered article summaries using Google Gemini
🌙 Dark/Light mode toggle
---
Deployment
The app is deployed on Vercel. Every push to the `main` branch triggers an automatic redeployment.
Environment variables required on Vercel:
`GNEWS_API_KEY`
`GEMINI_API_KEY`
