# UI Tokens

Design tokens for Toolify.

All UI must use these tokens.

Never use:

- Hardcoded hex colors
- Tailwind default colors
- Inline colors

Everything should reference the tokens defined in `app/globals.css`.

---

# Tailwind CSS v4

This project uses **Tailwind CSS v4**.

Tokens are defined using the `@theme` directive inside

```
app/globals.css
```

Never create a `tailwind.config.ts` for colors.

---

# globals.css

```css
@import "tailwindcss";

@theme {

  /* ---------------------------------- */
  /* Fonts                              */
  /* ---------------------------------- */

  --font-sans: "Inter", sans-serif;

  /* ---------------------------------- */
  /* Backgrounds                        */
  /* ---------------------------------- */

  --color-background: #0b0f17;
  --color-surface: #111827;
  --color-surface-secondary: #1a2233;
  --color-surface-tertiary: #20293d;

  /* ---------------------------------- */
  /* Borders                            */
  /* ---------------------------------- */

  --color-border: #263247;
  --color-border-muted: #32425d;

  /* ---------------------------------- */
  /* Primary Text                       */
  /* ---------------------------------- */

  --color-text-primary: #ffffff;
  --color-text-secondary: #c3cad9;
  --color-text-muted: #94a3b8;

  /* ---------------------------------- */
  /* Accent                             */
  /* ---------------------------------- */

  --color-accent: #6d5efc;
  --color-accent-hover: #5948ff;
  --color-accent-light: #8d84ff;
  --color-accent-foreground: #ffffff;

  /* ---------------------------------- */
  /* Success                            */
  /* ---------------------------------- */

  --color-success: #22c55e;
  --color-success-light: #153b27;
  --color-success-foreground: #ffffff;

  /* ---------------------------------- */
  /* Warning                            */
  /* ---------------------------------- */

  --color-warning: #f59e0b;
  --color-warning-light: #3b2b11;

  /* ---------------------------------- */
  /* Error                              */
  /* ---------------------------------- */

  --color-error: #ef4444;
  --color-error-light: #401616;

  /* ---------------------------------- */
  /* Info                               */
  /* ---------------------------------- */

  --color-info: #38bdf8;
  --color-info-light: #113646;

  /* ---------------------------------- */
  /* Radius                             */
  /* ---------------------------------- */

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;
}
```

---

# Generated Tailwind Classes

Tailwind automatically generates utility classes.

Examples

```
bg-background

bg-surface

bg-surface-secondary

text-text-primary

text-text-secondary

border-border

bg-accent

text-accent-foreground
```

Never use

```
bg-blue-500

text-gray-300

bg-[#222]

border-zinc-800
```

---

# Color Usage

## Background

Application background

```
bg-background
```

---

## Cards

Cards

```
bg-surface

border-border
```

Secondary cards

```
bg-surface-secondary
```

---

## Typography

Heading

```
text-text-primary
```

Body

```
text-text-secondary
```

Metadata

```
text-text-muted
```

---

## Accent

Used for

- Send Button
- Links
- Active Navigation
- Focus Rings
- Interactive Elements

Classes

```
bg-accent

text-accent

border-accent
```

---

## Success

Used for

- Completed Actions
- Success Messages

```
bg-success-light

text-success
```

---

## Warning

Used for

- Warnings
- Pending States

```
bg-warning-light

text-warning
```

---

## Error

Used for

- Failed Actions
- Validation
- Error Messages

```
bg-error-light

text-error
```

---

## Information

Used for

- Tool Status
- Informational Badges

```
bg-info-light

text-info
```

---

# Typography

Font

```
Inter
```

Levels

| Element | Class |
|---------|------|
| Hero Title | text-6xl font-bold |
| Page Title | text-3xl font-semibold |
| Section Title | text-xl font-semibold |
| Body | text-base |
| Small Text | text-sm |
| Caption | text-xs |

---

# Radius

| Element | Token |
|----------|------|
| Button | rounded-md |
| Input | rounded-md |
| Card | rounded-xl |
| Chat Bubble | rounded-2xl |
| Avatar | rounded-full |

---

# Shadows

Cards

```
shadow-sm
```

Floating Elements

```
shadow-lg
```

Avoid excessive shadows.

---

# Spacing

| Token | Usage |
|--------|------|
| gap-2 | Small spacing |
| gap-4 | Components |
| gap-6 | Cards |
| gap-8 | Sections |
| gap-12 | Large sections |
| gap-16 | Page spacing |

---

# Chat Tokens

## User Bubble

```
bg-accent

text-accent-foreground
```

---

## Assistant Bubble

```
bg-surface-secondary

text-text-primary
```

---

## Tool Messages

```
bg-surface

border-border
```

---

## Code Blocks

```
bg-surface-tertiary

border-border
```

---

## Input Area

```
bg-surface

border-border
```

---

# Motion

Default Transition

```
duration-200
ease-out
```

Hover

```
duration-150
```

Never use animations longer than 300ms.

---

# Future Tokens

When adding new UI features:

1. Add new tokens here.
2. Define them in `globals.css`.
3. Never hardcode colors in components.

This file is the single source of truth for Toolify's visual design system.
