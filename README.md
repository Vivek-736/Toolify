<div align="center">
  <img src="public/favicon.png" alt="Toolify Logo" width="120" style="border-radius: 20px; margin-bottom: 20px;" />
  <h1>✨ Toolify ✨</h1>
  <p><strong>Your intelligent AI assistant that dynamically picks the right tools to get things done.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/LangGraph-FF5C5C?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5gYeDTIzEwzOQAAAAelJREFUOMvNU01qAkEM/SRT8QeK4kLwBHbpuAOP4K3EswgexIt4De8h+AIF3XQnLrsoClIFU8k0O0wYmRkLFsIQSEhC3vuSN5gQQsT0xRkFh4yCg5bA783mD84oOKwE7KMoOCxL/N5s/uCMgsP/Bf4kZ/f7fc1mM1gsFjSbzcz5fD6YTqfM53Pa7TaLxcL4mEwmdLtd8zxPM5vNaDabmePxGJvNpvE/Ho9MpxO73Y7ZbMZ8Pt8Yq9WKbrdr3MfjsWae581kMqHb7TJwNpsxnU7Z7XZks1nSNK31/X6fNE3ZbDaMRiPq9TrL5ZI8z2uPxyPVapXdbke326XX6xkYwOl0MgAulwt5njebTqcmyWQygcFgwOVyYXlS/sD1emW1WhGGAQDtdjvSNCWKIoIwJIoigjDENJ5OJ+r1eq2j/oYgCIiiiMFgwOVyQdd12u02R0dHxHGMYRgABEEAwGq1IggChsMhT09PPD09EQQBURQxnU55fX0F4P7+njRNqVQqxHGMpmmkaQpAlmXEcUyWZQDs93vCMMQ0TZIkIQgCkiQhSRKEEFqSJJimaQA/cTweWa/XAOi6/kMIAYBpmlr2xRkFh4yCw1rAP4iCw1rAXwQ4o+Cwlv3/gQ+d7T8j/Vn7/4F/AQX4E1X2c4rBAAAAAElFTkSuQmCC" />
    <img src="https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=flat-square&logo=postgresql&logoColor=black" alt="Neon Postgres" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

---

## 🚀 Overview

**Toolify** is a next-generation chat interface designed to effortlessly augment a standard LLM conversation with external tools. Instead of just answering text, Toolify intelligently routes your prompts, deciding when to search the web, summarize a YouTube video, or just chat with you. 

Everything is driven by a state-of-the-art **LangGraph** orchestration architecture under the hood, wrapped in a beautiful, buttery-smooth Next.js 16 dashboard.

---

## ✨ Features

- 🧠 **Autonomous Tool Routing**: Toolify automatically knows when to use **Tavily Web Search** for real-time information or when to parse **YouTube Transcripts** for video summaries.
- ⚡ **Real-Time Streaming**: Watch the AI think and type in real-time. Full support for Server-Sent Events (SSE) with robust frontend parsing.
- 💾 **Persistent Chat History**: All conversations, tools invoked, and AI responses are instantly saved to a **Neon PostgreSQL** database via **Drizzle ORM**.
- 🔄 **Contextual Memory**: Jump back into any chat from the sidebar. The agent instantly recalls your full conversation history.
- 🎨 **Gorgeous UI**: Built with **Tailwind CSS v4** and **shadcn/ui**. It features a responsive sidebar, clean animations, and syntax-highlighted message parsing.
- 🔐 **Secure Authentication**: Fully integrated with **Clerk** to keep user data private and securely isolated in the database.

---

## 🏗️ Architecture Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- **Agent Orchestration**: [LangGraph](https://github.com/langchain-ai/langgraphjs) & [LangChain](https://js.langchain.com/v0.2/docs/introduction/)
- **Reasoning Engine**: [Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/flash/) (via [Puter.js](https://puter.com/))
- **Database**: [Neon Serverless Postgres](https://neon.tech/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)

---

## 🛠️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Vivek-736/Toolify.git
cd Toolify
pnpm install
```

### 2. Environment Setup
Create a `.env` file in the root directory and add your API keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neon_postgres_url
TAVILY_API_KEY=your_tavily_api_key
```
*(Note: Gemini capabilities are currently powered directly via Puter.js!)*

### 3. Initialize Database
Push the schema to your Neon database:
```bash
pnpm run db:push
```

### 4. Run Locally
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 How The Agent Works

Toolify uses a **LangGraph StateGraph** to manage its conversation loop:
1. **User Input** is intercepted and passed to the graph.
2. The `agent` node consults the LLM. If the LLM determines it needs external data (e.g., asking for the latest news), it returns a `tool_call`.
3. LangGraph routes the execution to the `tools` node, which invokes the specific backend service (Tavily, YouTube Transcript, etc).
4. The tool results are fed back into the `agent` node to formulate a final synthesized response.
5. Everything is streamed back to the client instantly via a customized Next.js API route using `streamEvents`.

---

<br />

<div align="center">
  <p>Made with 💖 by Vivek</p>
</div>
