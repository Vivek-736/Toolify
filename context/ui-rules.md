# UI Rules

These rules define the visual language of Toolify.

The interface should always feel

- Minimal
- Modern
- Fast
- AI-first
- Developer Friendly

Conversation is the primary focus.

Everything else is secondary.

---

# Design Principles

Every screen should answer one question immediately.

Landing Page

> What is Toolify?

Chat Page

> Continue the conversation.

Avoid visual clutter.

Whitespace is preferred over additional UI.

---

# Layout

## Maximum Width

Landing Page

```
max-w-7xl
```

Chat Page

Uses the entire viewport.

---

## Spacing

Large Sections

```
gap-24
```

Medium Sections

```
gap-12
```

Cards

```
gap-6
```

Inputs

```
gap-4
```

Never use inconsistent spacing.

---

# Navigation

Landing Page

Contains

- Logo
- Features
- GitHub (future)
- Start Chat

Chat Page

Contains

- Conversation History
- New Chat
- User Avatar

Navigation should remain lightweight.

---

# Pages

Current Pages

```
/

/chat

/sign-in

/sign-up
```

No additional pages unless absolutely necessary.

New functionality should be added as tools, not pages.

---

# Typography

Use **Inter** via `next/font/google`.

Hierarchy

## Display

Hero titles.

Large.

Bold.

---

## Heading

Page titles.

Section titles.

---

## Body

Conversation.

Descriptions.

---

## Caption

Metadata.

Dates.

Tool labels.

Never use more than three typography levels inside one component.

---

# Colors

Only use project design tokens.

Never use

```
bg-blue-500

text-gray-700

border-zinc-300
```

Always use

```
bg-background

bg-surface

text-text-primary

text-text-secondary

border-border

bg-accent
```

Never hardcode colors.

---

# Border Radius

Cards

```
rounded-xl
```

Buttons

```
rounded-lg
```

Inputs

```
rounded-lg
```

Message Bubbles

```
rounded-2xl
```

Maintain consistency throughout the application.

---

# Cards

Every reusable section should use cards.

Cards contain

- Information
- Settings
- Tool Results

Cards never contain the primary conversation.

Conversation should remain visually separate.

---

# Buttons

Three button variants only.

Primary

Main actions.

Examples

- Send
- Start Chat

---

Secondary

Alternative actions.

Examples

- Cancel
- Back

---

Ghost

Toolbar actions.

Examples

- Copy
- Delete
- Rename

Avoid creating additional button styles.

---

# Inputs

Use shadcn components.

Rules

- Consistent height
- Full width
- Clear placeholder text
- Focus state uses accent token

Never build custom input components unless necessary.

---

# Chat Layout

The chat interface consists of two areas.

Sidebar

Conversation management.

Main Area

Conversation.

The conversation area should receive the majority of available width.

---

# Sidebar

Contains

- New Chat
- Conversation List
- User Menu

Keep it visually quiet.

Avoid excessive borders.

---

# Chat Messages

Messages should be easy to scan.

Requirements

- Comfortable padding
- Clear spacing
- Proper markdown rendering

Messages should never stretch edge to edge.

Maximum readable width should be maintained.

---

# Markdown

Assistant messages must support

- Headings
- Lists
- Tables
- Blockquotes
- Code blocks
- Inline code

Markdown should render consistently.

---

# Code Blocks

Code blocks must include

- Language label (when available)
- Copy button
- Horizontal scrolling

Never wrap long code.

---

# Tool Responses

Tool execution should feel natural.

Do not expose implementation details.

Instead of

```
Calling Tavily...
```

Prefer

```
Searching the web...
```

Instead of

```
Running Tool...
```

Prefer

```
Analyzing the request...
```

Users interact with the assistant—not the framework.

---

# Loading States

Every async action should have a loading state.

Examples

- Sending message
- Searching web
- Summarizing video

Never leave the interface static during long operations.

---

# Empty States

Every empty component needs an empty state.

Examples

Conversation

```
Start a conversation.
```

History

```
No conversations yet.
```

Keep empty states short.

---

# Error States

Errors must be human-readable.

Good

```
Unable to search the web right now.

Please try again.
```

Bad

```
500 Internal Server Error
```

Never expose stack traces.

---

# Icons

Use only

```
lucide-react
```

Do not mix icon libraries.

---

# Animations

Animations should communicate state.

Allowed

- Fade
- Slide
- Opacity
- Scale (subtle)

Avoid

- Bounce
- Flash
- Long transitions

Animations should finish within approximately 200–300ms.

---

# Responsiveness

Desktop is the primary experience.

Tablet must remain fully usable.

Mobile should preserve all functionality with layout adjustments.

No feature should be desktop-only.

---

# Accessibility

Every interactive element must have

- Keyboard support
- Visible focus state
- Accessible labels
- Sufficient color contrast

Never rely on color alone to convey meaning.

---

# Consistency Rules

Before creating a new component

1. Read `ui-registry.md`
2. Reuse existing patterns
3. Only create new patterns when necessary
4. Update the registry after implementation

---

# Do Not

- Never hardcode colors.
- Never use raw Tailwind color utilities.
- Never mix multiple design styles.
- Never create duplicate components.
- Never place business logic inside UI components.
- Never make the conversation secondary to decorative elements.
- Never sacrifice readability for visual effects.

The chat experience should always remain the center of the application.
