# Build Plan

## Core Principle

Build the user experience first with mock data, then wire functionality incrementally.

Every screen should be usable before AI integration begins.

The LangGraph agent should remain the single entry point for all AI interactions. New capabilities are added as tools—not new APIs.

---

# Phase 1 — Foundation

## 01 Landing Page

### UI

Build the complete marketing homepage.

Sections

- Navbar
- Hero
- Features
- How Toolify Works
- CTA
- Footer

### Logic

- Logged out → Start Chat redirects to Clerk Sign In
- Logged in → redirects to /chat

---

## 02 Authentication

Status: ✅ Completed

### Completed

- Clerk Authentication
- Protected Routes
- Session Management

---

## 03 Database

Status: ✅ Completed

### Completed

- Neon PostgreSQL
- Drizzle ORM
- User Storage
- Database Connection

---

# Phase 2 — Chat Experience

## 04 Chat Page UI

### UI

Build the complete chat interface.

Components

- Sidebar
- Conversation List
- New Chat Button
- Chat Header
- Message List
- User Bubble
- AI Bubble
- Chat Input
- Send Button
- Empty State

### Logic

Mock data only.

---

## 05 Chat Persistence

### Logic

Store conversations inside database.

Create

- chats table
- messages table

Features

- Create Chat
- Rename Chat
- Delete Chat
- Load Conversation
- Store Messages

---

# Phase 3 — LangGraph Agent

## 06 LangGraph Foundation

### Logic

Setup

- Graph State
- Graph Nodes
- Tool Router
- Agent Prompt
- Tool Execution
- Response Generation

At this stage no tools exist.

Agent only talks using Gemini.

---

## 07 General Chat Tool

### Provider

Puter.js

### Model

Gemini 2.5 Flash

### Logic

Default conversational tool.

Handles

- Coding
- Writing
- Math
- General Questions
- Brainstorming

If no tool is required, this tool answers directly.

---

# Phase 4 — Tool Calling

## 08 Tavily Search Tool

### Logic

Agent decides when current information is required.

Examples

- News
- Documentation
- Weather
- Recent Events

Flow

User

↓

LangGraph

↓

Tavily

↓

Gemini summarizes

↓

Response

---

## 09 YouTube Summary Tool

### Logic

When a YouTube URL is detected

↓

Summarization Tool

↓

Gemini formats response

Output

- Overview
- Key Takeaways
- Important Concepts

---

## 10 Tool Routing

### Logic

LLM chooses

- General Chat
- Tavily
- YouTube

No keyword matching.
Pure LangGraph routing.

---

# Phase 5 — Chat Features

## 11 Streaming Responses

### Features

- Token Streaming
- Typing Indicator
- Cancel Response

---

## 12 Chat History

### Features

- Recent Chats
- Infinite Scroll
- Auto Generated Titles
- Last Updated Time

---

## 13 Conversation Memory

### Features

- Previous Messages
- Context Window
- Follow-up Questions

---

# Phase 6 — Polish

## 14 Landing Page Polish

Improve

- Animations
- Responsive Design
- Hero
- CTA
- Accessibility

---

## 15 Chat UI Polish

Improve

- Markdown Rendering
- Code Blocks
- Copy Button
- Syntax Highlighting
- Better Loading States

---

## 16 Error Handling

Handle

- Tavily Failure
- Puter Failure
- Network Failure
- Invalid YouTube Link

Graceful fallback responses.

---

## 17 Performance

Optimize

- Server Components
- Database Queries
- Streaming
- Caching
- Lazy Loading
