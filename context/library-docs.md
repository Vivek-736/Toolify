# Library Docs

Project-specific usage patterns for every third-party library used in Toolify.

This file documents how each library should be used in this project. It does **not** replace official documentation. Instead, it defines the project's conventions and best practices.

---

# Before Using Any Library

Before implementing a feature:

1. Read AGENTS.md.
2. Load any installed MCP server or skill if available.
3. Read this file.
4. Only then implement the feature.

Priority

```
MCP Documentation
↓

Installed Skill

↓

library-docs.md

↓

General Knowledge
```

Never rely only on training knowledge because APIs change frequently.

---

# Clerk

Purpose

Authentication and user management.

---

## Authentication

Always authenticate using Clerk.

Never build a custom authentication system.

Use Clerk middleware to protect private routes.

Protected Pages

```
/chat
```

Public Pages

```
/

/sign-in

/sign-up
```

---

## Current User

Server

```ts
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();
```

Client

```ts
import { useUser } from "@clerk/nextjs";
```

Rules

- Never trust client-side user IDs.
- Always verify authentication on the server.
- Every database query must be scoped to the authenticated user.

---

# Neon PostgreSQL

Purpose

Persistent storage.

Rules

- One database.
- Never create duplicate schemas.
- Never use multiple database providers.
- Keep queries small.
- Normalize data.

---

# Drizzle ORM

Purpose

Database ORM.

Schema lives in

```
db/schema.ts
```

Connection

```
db/index.ts
```

Rules

- Never write raw SQL unless absolutely necessary.
- Always use Drizzle query builder.
- Schema is the source of truth.
- Never duplicate types already generated from the schema.

Example

```ts
await db.insert(messages).values({
    ...
});
```

---

# LangGraph

Purpose

AI orchestration.

LangGraph is the brain of Toolify.

Only one graph should exist.

Folder

```
agent/
```

Contains

```
graph.ts

nodes.ts

router.ts

state.ts

prompts.ts
```

Rules

- Never create multiple graphs.
- Every AI request starts here.
- Tools never call other tools.
- Graph controls execution.
- Graph owns state.

---

## State

The graph state contains

- messages
- tool results
- current user input

Only graph nodes should modify state.

---

# Puter.js

Purpose

Gemini 2.5 Flash access.

Used for

- conversations
- reasoning
- summarization
- explanations
- coding

Not used for

- authentication
- storage
- routing

Rules

Puter is always the final reasoning model.

Tools return structured data.

Gemini generates the final response.

---

# Tavily

Purpose

Internet search.

Only used when fresh knowledge is required.

Examples

- latest AI news
- current events
- documentation
- company information

Never use Tavily for

- math
- coding
- translations
- conversations

Flow

```
User

↓

LangGraph

↓

Tavily

↓

Gemini

↓

Answer
```

---

# YouTube Summarizer

Purpose

Summarize YouTube videos.

Input

```
YouTube URL
```

Output

Structured summary.

Example

```
Overview

Key Points

Important Topics
```

Rules

The tool never formats chat responses.

Formatting always happens inside Gemini.

---

# shadcn/ui

Purpose

Reusable UI components.

Components

```
Button

Input

Textarea

Card

DropdownMenu

Dialog

Avatar

ScrollArea

Separator

Sheet

Tooltip
```

Rules

- Never modify generated components.
- Extend using wrapper components.
- Keep project-specific styling outside `components/ui`.

---

# Tailwind CSS v4

Purpose

Styling.

Rules

- Use design tokens.
- Never hardcode colors.
- Never use default Tailwind colors.
- Never use inline styles.

Correct

```
bg-background

text-text-primary

border-border
```

Never

```
bg-blue-500

text-gray-600
```

---

# React

Rules

Server Components by default.

Only use Client Components when needed.

Examples

Needs Client Component

- useState
- useEffect
- browser APIs
- event listeners

Otherwise

Use Server Components.

---

# Next.js

App Router only.

Rules

- Server Actions for mutations.
- Route Handlers for API endpoints.
- Pages contain no business logic.
- Components contain no database logic.
- Read the latest Next.js documentation before framework-specific implementation.

---

# Server Actions

Purpose

Database mutations.

Examples

- create chat
- delete chat
- rename chat

Never execute LangGraph inside a Server Action.

---

# Route Handlers

Purpose

AI execution.

Example

```
app/api/chat/route.ts
```

Responsibilities

- validate request
- invoke LangGraph
- return response

Nothing else.

---

# Markdown

AI responses should support

- headings
- lists
- tables
- fenced code blocks

Recommended renderer

```
react-markdown
```

Code highlighting can be added later.

---

# Environment Variables

Never hardcode credentials.

Expected variables

```
DATABASE_URL

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

CLERK_SECRET_KEY

TAVILY_API_KEY
```

Add future variables here as new integrations are introduced.

---

# Error Handling

Every external library call must use

```ts
try {

}
catch (error) {

}
```

Always log

```
[clerk]

[drizzle]

[tavily]

[langgraph]

[puter]
```

Never expose raw errors to users.

---

# Future Libraries

When adding a new library

1. Install package.
2. Read official documentation.
3. Add project-specific rules to this file.
4. Follow the same architecture.

Every library should have one clearly defined responsibility.
