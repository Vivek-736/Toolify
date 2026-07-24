# Architecture

## Stack

| Layer | Technology | Purpose |
|--------|------------|---------|
| Framework | Next.js 16 (App Router) | Full-stack framework |
| Language | TypeScript (Strict) | Entire codebase |
| Authentication | Clerk | User authentication |
| Database | Neon PostgreSQL | Persistent storage |
| ORM | Drizzle ORM | Database access |
| Styling | Tailwind CSS v4 + shadcn/ui | UI |
| AI Agent | LangGraph | Agent orchestration |
| LLM | Gemini 2.5 Flash (Puter.js) | General reasoning |
| Search | Tavily API | Web search |
| Video | YouTube Summarizer Tool | Video summarization |
| State | React Server Components + Server Actions | UI state |
| Deployment | Vercel | Hosting |

---

# High Level Architecture

```
                User
                  │
                  ▼
          Chat Interface
                  │
                  ▼
          Server Action / API
                  │
                  ▼
          LangGraph Agent
                  │
        ┌─────────┼─────────┐
        │         │         │
        ▼         ▼         ▼
   General AI  Tavily   YouTube
   (Puter.js) Search    Summary
        │         │         │
        └─────────┼─────────┘
                  │
                  ▼
          Final AI Response
                  │
                  ▼
             Chat History
                  │
                  ▼
            Neon Database
```

---

# Folder Structure

```
/
├── AGENTS.md
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── ui-tokens.md
│   ├── ui-rules.md
│   ├── ui-registry.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── build-plan.md
│   └── progress-tracker.md
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── chat/
│   │   └── page.tsx
│   │
│   └── api/
│       └── chat/
│           └── route.ts
│
├── actions/
│   └── chat.ts
│
├── agent/
│   ├── graph.ts
│   ├── nodes.ts
│   ├── router.ts
│   ├── state.ts
│   ├── prompts.ts
│   ├── tools/
│   │   ├── tavily.ts
│   │   ├── youtube.ts
│   │   └── general.ts
│   └── types.ts
│
├── components/
│   ├── ui/
│   ├── home/
│   ├── chat/
│   └── layout/
│
├── db/
│   ├── schema.ts
│   ├── index.ts
│   └── migrations/
│
├── lib/
│   ├── clerk.ts
│   ├── puter.ts
│   ├── tavily.ts
│   ├── youtube.ts
│   └── utils.ts
│
├── hooks/
│
├── types/
│
└── public/
```

---

# System Boundaries

## app/

Contains pages, layouts, API routes and server actions only.

No AI logic.

No database queries outside server actions.

---

## agent/

Contains everything related to LangGraph.

Responsible for

- graph
- state
- routing
- prompts
- tool execution
- final response generation

Never imports React components.

---

## components/

Pure UI.

Never calls APIs directly.

Never accesses database.

---

## actions/

Server Actions.

Responsible for

- creating chats
- storing messages
- deleting chats

No AI logic.

---

## lib/

Reusable SDK wrappers.

Examples

- Puter
- Tavily
- Clerk helpers
- YouTube utilities

---

## db/

Only schema and database configuration.

No business logic.

---

# Agent Flow

```
User Message

↓

LangGraph receives state

↓

LLM decides

↓

Need Tool?

├── No
│
│   ↓
│
│ Gemini via Puter.js
│
│ ↓
│
│ Final Answer
│
└── Yes
    │
    ├── Tavily
    │
    ├── YouTube Summary
    │
    └── Future Tools
            │
            ▼
      Tool Result
            │
            ▼
     Gemini synthesizes
            │
            ▼
       Final Response
```

---

# Available Tools

## General Chat

Model

Gemini 2.5 Flash

Provider

Puter.js

Purpose

Default reasoning and conversation.

---

## Web Search

Provider

Tavily API

Purpose

Current information.

Examples

- Latest AI news
- Current stock prices
- Recent releases
- Documentation lookup

---

## YouTube Summary

Input

YouTube URL

Output

- Summary
- Key points
- Important timestamps (future)

---

# Database

## users

Managed by Clerk.

---

## chats

Stores every conversation.

Fields

- id
- userId
- title
- createdAt
- updatedAt

---

## messages

Stores every message.

Fields

- id
- chatId
- role
- content
- createdAt

---

# Current Pages

## /

Landing Page

Marketing page introducing Toolify.

---

## /chat

Main application.

Sidebar

Conversation history

Main Area

Chat

Input

Agent responses

---

## /(auth)

Authentication pages handled by Clerk.

---

# Future Expansion

The architecture is intentionally tool-based.

New tools should only require

1. Create tool
2. Register in LangGraph
3. Update prompt

Examples

- PDF Chat
- GitHub Search
- Weather
- Gmail
- Calendar
- Image Generation
- Code Interpreter
- File Analysis

No UI or routing changes should be necessary.
