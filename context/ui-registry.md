# UI Registry

Living document for every reusable UI component in Toolify.

Read this before creating any new component.

If a similar component already exists, reuse it instead of creating a new one.

After building a new component:

1. Add it here.
2. Record its file path.
3. Record its purpose.
4. Record any reusable styling patterns.

---

# Current Status

No UI components have been built yet.

The registry will grow as the application is developed.

---

# Design Philosophy

Toolify should feel

- Modern
- Minimal
- Fast
- AI-first
- Developer-friendly

The interface should stay clean and let conversations remain the primary focus.

---

# Global Layout

Status: ⏳ Planned

File

```
components/layout/
```

Responsibilities

- Navbar
- Page Container
- Theme Wrapper
- User Menu

---

# Landing Page

Status: ✅ Completed

Folder

```
components/home/
```

Planned Components

## Navbar

File

```
components/home/Navbar.tsx
```

Purpose

Landing page navigation.

---

## Hero

File

```
components/home/Hero.tsx
```

Purpose

Main introduction and CTA.

---

## Features

File

```
components/home/Features.tsx
```

Purpose

Display Toolify capabilities.

---

## How It Works

File

```
components/home/HowItWorks.tsx
```

Purpose

Explain the agent workflow.

---

## Footer

File

```
components/home/Footer.tsx
```

Purpose

Site footer.

---

# Chat Page

Status: ⏳ Planned

Folder

```
components/chat/
```

Planned Components

## ChatLayout

Purpose

Main page layout.

Contains

- Sidebar
- Conversation Area

---

## Sidebar

Purpose

Displays chat history.

Contains

- New Chat Button
- Conversation List

---

## ConversationItem

Purpose

Single conversation preview.

Displays

- Title
- Last Message
- Updated Time

---

## ChatHeader

Purpose

Conversation header.

Contains

- Conversation Title
- User Menu

---

## MessageList

Purpose

Scrollable conversation.

Contains

- User Messages
- AI Messages

---

## MessageBubble

Purpose

Display one chat message.

Supports

- Markdown
- Code Blocks
- Lists
- Tables

---

## ChatInput

Purpose

User message input.

Contains

- Textarea
- Send Button

Future

- Attachment Button

---

## TypingIndicator

Purpose

Displayed while the agent is responding.

---

## EmptyChat

Purpose

Shown before first message.

---

# Shared Components

Folder

```
components/shared/
```

## LoadingSpinner

Status

⏳ Planned

Purpose

Loading indicator.

---

## ErrorMessage

Status

⏳ Planned

Purpose

Friendly error display.

---

## EmptyState

Status

⏳ Planned

Purpose

Reusable empty state component.

---

# UI Components (shadcn/ui)

Folder

```
components/ui/
```

Expected Components

- Button
- Card
- Input
- Textarea
- DropdownMenu
- Avatar
- Dialog
- Sheet
- ScrollArea
- Separator
- Tooltip

These components should remain unmodified.

Project-specific behavior should be implemented through wrapper components.

---

# Reusable Patterns

## Cards

Status

⏳ Pending

Will document

- Border
- Radius
- Padding
- Shadow

---

## Buttons

Status

⏳ Pending

Will document

- Primary
- Secondary
- Ghost

---

## Inputs

Status

⏳ Pending

Will document

- Text Input
- Textarea
- Search Input

---

## Message Styling

Status

⏳ Pending

Will document

- User Bubble
- Assistant Bubble
- Markdown
- Code Blocks

---

# Icons

Recommended

- lucide-react

Avoid mixing multiple icon libraries.

---

# Animation

Recommended

- Framer Motion (only where needed)

Animations should enhance usability rather than distract.

---

# Component Naming

Components

```
ChatSidebar.tsx

MessageBubble.tsx

ChatInput.tsx

ConversationItem.tsx
```

Hooks

```
useChat.ts

useSidebar.ts
```

Utilities

```
chat.ts

markdown.ts
```

---

# Updating This File

Whenever a new reusable component is created:

- Add its name.
- Add its location.
- Describe its responsibility.
- Record any reusable styling or interaction patterns.
- Update the component's status from ⏳ Planned to ✅ Completed.

This registry should always reflect the current UI state of Toolify.
