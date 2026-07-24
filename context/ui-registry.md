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

# UI Consistency Registry

This registry tracks the foundational visual patterns used across the Toolify application to ensure all future components match the established design language.

## Baseline — Established 2026-07-24

### Component: Chat Sidebar & Navigation
File: `src/components/chat/Sidebar.tsx`, `src/components/chat/ChatHeader.tsx`
Last updated: 2026-07-24

| Property         | Class           |
| ---------------- | --------------- |
| Background       | `bg-slate-50/50` (sidebar), `bg-white` (header) |
| Border           | `border-slate-200` (sidebar edge), `border-slate-100` (header edge) |
| Border radius    | `rounded-lg` (list items), `rounded-xl` (user profile box) |
| Text — primary   | `text-slate-900` (brand), `text-slate-800` (header title) |
| Text — secondary | `text-slate-700` (list item text), `text-slate-600` (header buttons) |
| Text — muted     | `text-slate-500` (group headers), `text-slate-400` (subtext/icons) |
| Spacing          | `p-4` (header/footer padding), `px-3 py-2.5` (list items) |
| Hover state      | `hover:bg-slate-100 text-slate-700` (items), `hover:bg-slate-50` (buttons) |
| Accent usage     | `bg-blue-50 text-blue-700` (active item), `bg-blue-600` (active indicator strip) |

**Pattern notes:**
- The sidebar uses a soft `slate-50/50` background to contrast slightly with the pure white main content area.
- Active states in navigation always use a very light blue background (`bg-blue-50`) with primary blue text (`text-blue-700`) and a solid blue left-border indicator (`w-1 bg-blue-600`).
- Icon buttons heavily use `text-slate-400` that transitions to `text-slate-600` on hover.

---

### Component: Chat Interface (Input & Messages)
File: `src/components/chat/ChatInput.tsx`, `src/components/chat/MessageList.tsx`
Last updated: 2026-07-24

| Property         | Class           |
| ---------------- | --------------- |
| Background       | `bg-white` (AI bubble, input container), `bg-blue-50/80` (User bubble) |
| Border           | `border-slate-200` (AI bubble, input), `border-blue-100/50` (User bubble) |
| Border radius    | `rounded-2xl` (input, bubbles), `rounded-full` (icon buttons) |
| Text — primary   | `text-slate-800` (message content, input text) |
| Text — muted     | `text-slate-400` (timestamps, action icons, disclaimer) |
| Spacing          | `px-5 py-4` (message bubbles), `px-4 py-4` (input inner) |
| Hover state      | `hover:bg-slate-100 text-slate-700` (action buttons) |
| Shadow           | `shadow-sm` (containers), `shadow-md shadow-blue-500/20` (primary send button) |
| Focus state      | `focus-within:ring-2 focus-within:ring-blue-100` (input container) |

**Pattern notes:**
- Message bubbles use asymmetric border radiuses. User bubbles have `rounded-tr-sm`, and AI bubbles have `rounded-tl-sm`.
- The user bubble stands out softly using `bg-blue-50/80` and `border-blue-100/50`.
- The main send action button leverages the primary brand color (`bg-blue-600`) and a custom soft colored shadow (`shadow-blue-500/20`).

---

### Component: Dashboard Welcome Cards
File: `src/app/dashboard/page.tsx`
Last updated: 2026-07-24

| Property         | Class           |
| ---------------- | --------------- |
| Background       | `bg-white` (card surface) |
| Border           | `border-slate-200` (card edge) |
| Border radius    | `rounded-2xl` (cards), `rounded-xl` (icon wrappers) |
| Text — primary   | `text-slate-800` (card title), `text-slate-900` (page heading) |
| Text — secondary | `text-slate-500` (card description, page sub-heading) |
| Spacing          | `p-5` (card inner padding), `gap-4` (grid layout) |
| Hover state      | `hover:border-slate-300 hover:shadow-sm` (card hover), `group-hover:scale-110` (icon scale) |

**Pattern notes:**
- Feature cards use a soft hover effect, primarily transitioning the border color and elevating slightly with `shadow-sm`.
- Micro-interactions are encouraged, such as `group-hover:scale-110 transition-transform` on the icons within the cards.
- Each feature card utilizes a specific accent color for its icon wrapper (e.g., `text-blue-600 bg-blue-100/50`, `text-indigo-600 bg-indigo-100/50`).
