# ⚔️ Agent Arena

> **Prompt once. Compare two AI models. Let a third AI judge the winner.**

Agent Arena is a full-stack AI comparison platform that lets you submit a single prompt and instantly compare responses from **Mistral** and **Cohere**. Their outputs are then evaluated by **Google Gemini**, which acts as an automated AI judge, providing scores and reasoning.

Built with a clean developer-focused interface inspired by **Vercel**, **Linear**, and **GitHub**, Agent Arena demonstrates modern AI orchestration using **LangGraph**, secure authentication, and scalable full-stack architecture.

---

## ✨ Features

* ⚔️ Compare **Mistral** and **Cohere** responses side by side
* 🏆 Automated evaluation using **Google Gemini**
* ⚡ Parallel AI execution with **LangGraph**
* 🔐 Secure Google OAuth 2.0 authentication
* 🍪 JWT authentication stored in HTTP-only cookies
* 🧪 Developer bypass for local development (no Google Cloud setup required)
* 💬 ChatGPT-style prompt input
* 📝 Markdown rendering with syntax highlighting
* 📋 One-click copy for code blocks
* 🎨 Modern responsive UI

---

## 🖥️ Demo

**Workflow**

```text
User Prompt
      │
      ▼
LangGraph Workflow
      │
      ├──────────────► Mistral
      │
      ├──────────────► Cohere
      │
      ▼
Google Gemini (Judge)
      │
      ▼
Scores + Reasoning
```

---

# 🛠 Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS v4
* Axios
* React Markdown
* Remark GFM
* Rehype Highlight

## Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser

## AI

* LangGraph
* LangChain
* Google Gemini
* Mistral
* Cohere
* Zod

---

# 🏗 Architecture

```text
Browser Client
│
├── GET  /auth/google
├── POST /invoke
└── POST /auth/logout
│
▼
Express API
│
├── Authentication Middleware
│
├── OAuth Routes
│
├── MongoDB
│
└── LangGraph Workflow
      │
      ├── Mistral
      ├── Cohere
      └── Gemini Judge
```

### AI Execution Flow

```text
START
   │
   ▼
solutionNode
(Mistral + Cohere in parallel)
   │
   ▼
judgeNode
(Google Gemini)
   │
   ▼
END
```

---

# 📁 Project Structure

```text
Agent-Arena
│
├── Backend
│   ├── src
│   │   ├── ai
│   │   │   ├── graph.ai.ts
│   │   │   └── model.ai.ts
│   │   ├── config
│   │   │   └── config.ts
│   │   ├── app.ts
│   │   ├── authMiddleware.ts
│   │   ├── authRoutes.ts
│   │   ├── db.ts
│   │   └── server.ts
│   └── package.json
│
└── Frontend
    ├── src
    │   ├── app
    │   │   ├── components
    │   │   ├── App.jsx
    │   │   └── App.css
    └── package.json
```

---

# ⚡ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/agent-arena.git

cd agent-arena
```

---

## 2. Backend Setup

```bash
cd Backend

npm install
```

Create a `.env` file.

```env
# AI Keys
GEMINI_API_KEY=
MISTRAL_API_KEY=
COHERE_API_KEY=

# App
JWT_SECRET=
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/agent-arena

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

Start the server.

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Open

```
http://localhost:5173
```

---

# 🔐 Authentication

1. User selects **Continue with Google**
2. Backend authenticates using Google OAuth
3. User profile is stored in MongoDB
4. JWT is created
5. JWT is stored in an HTTP-only cookie
6. Protected routes verify authentication using middleware

> **Developer Mode:** Leave `GOOGLE_CLIENT_ID` empty to automatically enable a local login bypass.

---

# 📡 API Endpoints

| Method | Endpoint                | Authentication | Description           |
| ------ | ----------------------- | -------------- | --------------------- |
| GET    | `/auth/google`          | Public         | Start Google OAuth    |
| GET    | `/auth/google/callback` | Public         | OAuth callback        |
| GET    | `/auth/me`              | JWT            | Get current user      |
| POST   | `/auth/logout`          | Public         | Logout user           |
| POST   | `/invoke`               | JWT            | Execute AI comparison |

---

# 🚀 Future Improvements

* Streaming AI responses
* Chat history
* Support for more AI models
* AI leaderboard
* Mobile optimization
* Export results to PDF
* Conversation sharing
* Prompt history
* Response voting
* Performance analytics

---

# 💡 Why Agent Arena?

Agent Arena demonstrates several modern software engineering concepts:

* AI orchestration using LangGraph
* Parallel execution
* Multi-model evaluation
* Secure authentication
* Full-stack architecture
* REST API design
* MongoDB integration
* Clean UI/UX
* Production-ready project structure

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub. It helps others discover the project and motivates future improvements.
