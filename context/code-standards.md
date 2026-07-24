# Code Standards

Implementation rules and conventions for Toolify.

Every AI session must follow these standards. They exist to keep the project scalable, predictable, and easy to maintain.

---

# Engineering Principles

The AI agent should behave like a senior software engineer.

This means:

- Think before implementing.
- Read the context files before writing code.
- Build only what the current task requires.
- Every feature must be immediately testable.
- Keep code simple over clever.
- One feature at a time.
- Never leave partially implemented features.
- Never break an existing feature while building a new one.

---

# TypeScript

- Strict Mode enabled.
- Never use `any`.
- Prefer `unknown` and narrow types.
- Every function must have explicit parameter types.
- Every function must have an explicit return type.
- Prefer `type` over `interface`.
- Use `const` unless reassignment is required.
- No unnecessary type assertions.

Example

```ts
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
```

---

# Next.js 16

Always read the latest Next.js documentation before implementing framework-specific features.

Rules

- App Router only
- React Server Components by default
- Client Components only when necessary
- Server Actions for mutations
- Route Handlers for external requests
- Never place business logic inside pages
- Never fetch directly inside Client Components

---

# Folder Responsibilities

## app/

Owns

- pages
- layouts
- route handlers

Never contains AI logic.

---

## components/

Owns

- UI only

Never

- query database
- call LangGraph
- contain business logic

---

## actions/

Owns

- database mutations
- server actions

Never

- execute LangGraph
- call external AI providers directly

---

## agent/

Owns

Everything related to AI.

Includes

- graph
- state
- prompts
- routing
- tool execution

Nothing else.

---

## agent/tools/

Every external capability lives here.

Examples

```
agent/tools/

general.ts

tavily.ts

youtube.ts
```

Future tools

- github.ts
- gmail.ts
- weather.ts
- pdf.ts

Never place tools anywhere else.

---

## lib/

Reusable SDK wrappers.

Examples

- Puter
- Tavily
- Clerk
- Utilities

No business logic.

---

## db/

Database only.

Contains

- schema
- connection
- migrations

---

# Components

Rules

- One component per file.
- Named exports only.
- No default exports.
- Props directly above component.
- Components stay under 200 lines whenever possible.
- Extract reusable UI instead of duplicating.

---

# Naming

Folders

```
chat-history
landing-page
message-list
```

Components

```
ChatSidebar.tsx

MessageBubble.tsx

ChatInput.tsx
```

Utilities

```
puter.ts

tavily.ts

utils.ts
```

Route Handlers

Always

```
route.ts
```

---

# Database

All database access happens through Drizzle.

Never

- write raw SQL unless required
- query inside components

Always

- validate data
- scope data to authenticated user

---

# LangGraph

LangGraph is the only AI orchestrator.

Rules

- One graph.
- One state.
- One entry point.

Never create multiple disconnected graphs.

Flow

```
User

↓

Graph

↓

Tool Decision

↓

Tool

↓

LLM

↓

Final Response
```

---

# Tool Rules

Every tool must

- have one responsibility
- return structured data
- never generate the final response

Example

Good

```
Tavily Tool

↓

Search Results
```

Bad

```
Tavily Tool

↓

Writes markdown

↓

Returns final answer
```

The LLM always produces the final response.

---

# Puter.js

Rules

Use Puter only for

- reasoning
- writing
- coding
- summarization

Never

- directly manipulate UI
- store database records

---

# Tavily

Only use Tavily when external knowledge is required.

Examples

- latest news
- current events
- documentation
- internet search

Never use Tavily for

- math
- coding
- writing
- conversations

---

# YouTube Tool

Responsibilities

Input

- YouTube URL

Output

- transcript
- summary data

Never produce formatted chat responses.

---

# Error Handling

Every async function must have

```ts
try {

}
catch (error) {

}
```

Never expose raw errors to users.

Instead

```
Something went wrong.

Please try again.
```

Always log

```
[chat]

[tavily]

[youtube]

[langgraph]
```

---

# API Responses

Always return

```ts
{
    success: true,
    data
}
```

or

```ts
{
    success: false,
    error
}
```

Never return raw objects.

---

# Chat Storage

Every message is stored.

Order

```
User Message

↓

AI Response

↓

Database
```

Messages always belong to a chat.

Chats always belong to a user.

---

# Environment Variables

Never hardcode

- API Keys
- URLs
- Secrets

Always use

```
process.env
```

Examples

```
CLERK_SECRET_KEY

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

DATABASE_URL

TAVILY_API_KEY
```

---

# Imports

Always use aliases.

Correct

```ts
import { Button } from "@/components/ui/button";
```

Never

```ts
../../../components/ui/button
```

---

# UI

Always use

- Tailwind v4
- shadcn/ui
- Design Tokens

Never use

- inline styles
- hardcoded colors
- raw Tailwind color utilities

---

# Comments

Comments explain

WHY

Never

WHAT

Good

```ts
// LangGraph keeps tool routing centralized.
```

Bad

```ts
// This increments count.
count++;
```

---

# Performance

Prefer

- Server Components
- Streaming
- Lazy Loading

Avoid

- unnecessary re-renders
- duplicated fetches
- duplicated AI calls

---

# AI Principles

The LLM should reason.

Tools should execute.

Database should persist.

UI should render.

Every layer has one responsibility.

Never mix responsibilities.

---

# Future Rule

Adding a new capability should require only

1. Create tool
2. Register tool in LangGraph
3. Update system prompt

No other architecture changes should be necessary.
