# Project Overview

# About the Project

Toolify is an AI-powered chat application built around a single intelligent agent capable of automatically selecting and using tools to answer user requests.

Instead of forcing users to choose between different AI features, Toolify allows users to simply chat naturally. The LangGraph agent understands the request, decides whether a tool is required, executes the appropriate tool, and returns a complete response.

The application follows an **agent-first architecture**, where every capability is implemented as a tool and orchestrated through LangGraph.

---

# Vision

Create an AI assistant that feels like talking to one intelligent system rather than a collection of separate utilities.

The user never chooses which AI feature to use.

The agent decides.

---

# Problem It Solves

Most AI applications separate features into different pages.

Examples

- Chat
- Web Search
- YouTube Summary
- PDF Chat
- Image Generation

Users constantly switch between interfaces.

Toolify removes this friction.

The user asks naturally.

The agent figures out:

- Does this require reasoning?
- Does it require searching the web?
- Does it require summarizing a YouTube video?
- Does it require another future tool?

Everything happens automatically.

---

# Core Philosophy

Reason first.

Use tools only when necessary.

Return one natural response.

---

# Pages

```
/                 → Landing Page
/chat             → Main AI Chat
/sign-in          → Clerk Authentication
/sign-up          → Clerk Authentication
```

---

# Navigation

Landing Page

- Home
- Features
- GitHub (future)
- Start Chat

Chat Page

- Conversation History
- New Chat
- User Menu

---

# User Flow

### Landing Page

User opens Toolify.

If authenticated

↓

Redirect to

```
/chat
```

Otherwise

↓

Show landing page.

Click

```
Start Chat
```

↓

Redirect to Clerk authentication.

---

### Authentication

Authentication handled entirely by Clerk.

After login

↓

Redirect

```
/chat
```

---

### Chat

User creates a conversation.

User types a message.

↓

LangGraph receives input.

↓

Chooses tools if necessary.

↓

Returns final answer.

↓

Conversation stored in database.

---

# AI Flow

```
User

↓

LangGraph

↓

Tool Decision

↓

Execute Tool

↓

Gemini (Puter.js)

↓

Response

↓

Database
```

---

# Initial Features

## General Chat

Powered by

Gemini 2.5 Flash

Provider

Puter.js

Examples

- Coding
- Explanations
- Brainstorming
- Writing
- General questions

---

## Web Search

Powered by

Tavily API

Automatically used for

- Current events
- News
- Documentation
- Internet search

---

## YouTube Summarizer

User pastes a YouTube URL.

Agent summarizes the video.

Output includes

- Summary
- Key points
- Important concepts

---

# Future Features

The architecture is intentionally tool-based.

Future tools include

- PDF Chat
- Website Summarizer
- Image Generation
- GitHub Search
- Gmail
- Calendar
- Weather
- File Analysis
- Deep Research

Every new feature should simply register another LangGraph tool.

---

# Database

Current Tables

## users

Managed by Clerk.

---

## chats

Stores user conversations.

---

## messages

Stores individual chat messages.

Every message belongs to a chat.

Every chat belongs to a user.

---

# Tech Stack

Framework

- Next.js 16

Language

- TypeScript

Authentication

- Clerk

Database

- Neon PostgreSQL

ORM

- Drizzle ORM

AI

- LangGraph

LLM

- Gemini 2.5 Flash (Puter.js)

Search

- Tavily API

UI

- Tailwind CSS v4
- shadcn/ui

Deployment

- Vercel

---

# Features In Scope

- Landing page
- Authentication
- AI Chat
- Conversation History
- LangGraph Agent
- Automatic Tool Selection
- Tavily Search
- YouTube Summarization
- Persistent Chat History
- Markdown Responses
- Code Block Rendering
- Responsive Design

---

# Features Out of Scope

- Team workspaces
- Voice chat
- Mobile application
- Payments
- AI image generation (initial version)
- Browser extension
- Multi-agent collaboration
- File uploads (initial version)

---

# Success Criteria

The project is considered successful when

- Users can authenticate with Clerk.
- Users can start conversations immediately.
- Every message is stored correctly.
- LangGraph correctly selects tools automatically.
- Tavily is used only when needed.
- YouTube links are summarized automatically.
- General questions are answered using Gemini.
- The user never has to manually choose a tool.
- New tools can be added without changing the chat flow.

---

# Long-Term Goal

Toolify should evolve into a modular AI platform where every capability is a LangGraph tool.

The chat interface remains the only interface users need.

Future development should focus on expanding the tool ecosystem rather than creating new pages or workflows.
