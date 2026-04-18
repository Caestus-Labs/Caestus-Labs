---
name: terminal-industries-design
description: Design system skill for terminal-industries. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX. Includes ultra-mode visual journey: read references/ANIMATIONS.md, references/LAYOUT.md, references/COMPONENTS.md, and references/INTERACTIONS.md for full motion and layout details.
---

# terminal-industries Design System

You are building UI for **terminal-industries**. Light-themed, warm palette, monospace typography (SuisseIntl), standard density on a 5px grid, expressive motion.

## Visual Reference

**IMPORTANT**: Study ALL screenshots below before writing any UI. Match colors, typography, spacing, layout, and motion exactly as shown.

### Homepage

![terminal-industries Homepage](screenshots/homepage.png)

### Scroll Journey (Cinematic Visual States)

> These screenshots capture the website at different scroll depths. The design changes dramatically as you scroll — each frame shows a different cinematic state. Replicate these exact visual transitions.

#### 0% — Hero / Above the fold

![Scroll 0%](screens/scroll/scroll-000.png)

#### 17% — Mid-page at 17% scroll

![Scroll 17%](screens/scroll/scroll-017.png)

#### 33% — Mid-page at 33% scroll

![Scroll 33%](screens/scroll/scroll-033.png)

#### 50% — Mid-page at 50% scroll

![Scroll 50%](screens/scroll/scroll-050.png)

#### 67% — Mid-page at 67% scroll

![Scroll 67%](screens/scroll/scroll-067.png)

#### 83% — Mid-page at 83% scroll

![Scroll 83%](screens/scroll/scroll-083.png)

#### 100% — Footer / End of page

![Scroll 100%](screens/scroll/scroll-100.png)

> Read `references/DESIGN.md` for full token details. Read `references/ANIMATIONS.md` for motion specs. Read `references/LAYOUT.md` for layout structure. Read `references/COMPONENTS.md` for component patterns.

## Ultra Reference Files

This package includes extended documentation. **Read these files before implementing:**

| File | Contents |
|------|----------|
| `references/DESIGN.md` | Full design system tokens, colors, typography, spacing |
| `references/VISUAL_GUIDE.md` | **START HERE** — Master visual guide with all screenshots embedded |
| `references/ANIMATIONS.md` | CSS keyframes, scroll triggers, motion library stack, video specs |
| `references/LAYOUT.md` | Flex/grid containers, page structure, spacing relationships |
| `references/COMPONENTS.md` | DOM component patterns, HTML structure, class fingerprints |
| `references/INTERACTIONS.md` | Hover/focus states with before/after style diffs |
| `screens/scroll/` | 7 scroll journey screenshots showing cinematic states |

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Single typeface** — SuisseIntl carries all text. Hierarchy comes from size, weight, and color — never font mixing.
- **standard density** — 5px base grid. Every dimension is a multiple of 5.
- **warm palette** — the color temperature runs warm, matching the monospace typography.
- **Restrained accent** — `#abff02` is the only pop of color. Used exclusively for CTAs, links, focus rings, and active states.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#ffffff` | Page/app background |
| Surface | `--surface` | `#eeeeee` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#052424` | Headings, body text |
| Text Muted | `--text-muted` | `#7f7f7f` | Captions, placeholders |
| Accent | `--accent` | `#abff02` | CTAs, links, focus rings |
| Border | `--border` | `#454742` | Dividers, card borders |

### Status Colors

| Status | Hex | Use |
|--------|-----|-----|
| Success | `#22c55e` | Confirmations, positive trends |
| Danger | `#dc2626` | Errors, destructive actions |

### Extended Palette

- **tw-prose-quote-borders:** `#e5e5e5` — Light surface or highlight color
- `#c2c2c2`
- `#000000` — Deep background layer or shadow color
- `#1d1d1d` — Deep background layer or shadow color
- `#9ca3af`
- **tw-prose-invert-quote-borders:** `#374151`
- `#586a6a`
- `#f87171`

### CSS Variable Tokens

```css
--font-primary: "SuisseIntl",sans-serif;
--font-primary: "SuisseIntl",sans-serif;
--font-primary: "SuisseIntl",sans-serif;
--font-primary: "SuisseIntl",sans-serif;
--font-primary: "SuisseIntl",sans-serif;
--slider-card-width: calc(var(--svw)*100 - var(--spacing)*2);
--slider-card-width: 21.875rem;
--slider-card-width: 36.25rem;
```

## Typography

### Font Stack

- **SuisseIntl** — Heading 1, Heading 2, Heading 3
- **SFMono-Regular** — Body, Caption, Code

### Font Sources

```css
@font-face {
  font-family: "SuisseIntl";
  src: url("fonts/SuisseIntl-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Geist Mono";
  src: url("fonts/GeistMono-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Geist Mono";
  src: url("fonts/GeistMono-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | SuisseIntl | 11.3125rem | 700 |
| Heading 2 | SuisseIntl | 11.25rem | 700 |
| Heading 3 | SuisseIntl | min(5.729vw,146.6666666667px) | 700 |
| Body | SFMono-Regular | .875rem | 400 |
| Caption | SFMono-Regular | 1rem | 400 |
| Code | SFMono-Regular | 14px | 400 |

### Typography Rules

- All text uses **SuisseIntl** — never add another font family
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 5px

Every dimension (margin, padding, gap, width, height) must be a multiple of **5px**.

### Spacing Scale

`5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 2.5-5px | Tight: related items within a group |
| 10px | Medium: between groups |
| 15-20px | Wide: between sections |
| 30px+ | Vast: major section breaks |

### Border Radius

Scale: `.25rem, .3125rem, .375rem, .5rem, .75rem, 3px, 4px, 8px, inherit, .625rem, 1px, 1.25rem, 12px, 20px`
Default: `8px`

### Container

Max-width: `1023px`, centered with auto margins.

### Breakpoints

| Name | Value |
|------|-------|
| xs | 480px |
| sm | 640px |
| md | 720px |
| md | 767px |
| md | 768px |
| lg | 1023px |
| lg | 1024px |
| xl | 1034px |
| xl | 1280px |
| 2xl | 1440px |
| 2xl | 1536px |
| 2xl | 1680px |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

### Card

```css
.card {
  background: #eeeeee;
  border: 1px solid #454742;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 0 1px var(--tw-prose-kbd-shadows),0 3px 0 var(--tw-prose-kbd-shadows);
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #abff02;
  color: #052424;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #454742;
  color: #052424;
  border-radius: 8px;
  padding: 10px 20px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #ffffff;
  border: 1px solid #454742;
  border-radius: 8px;
  padding: 10px 15px;
  color: #052424;
  font-size: 14px;
}
.input:focus { border-color: #abff02; outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #eeeeee;
  color: #7f7f7f;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #eeeeee;
  border: 1px solid #454742;
  border-radius: 20px;
  padding: 30px;
  max-width: 480px;
  width: 90vw;
  box-shadow: inset 0 0 20px 20px #23232329;
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 10px 15px;
  font-weight: 500;
  font-size: 12px;
  color: #7f7f7f;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #454742;
}
.table td {
  padding: 15px;
  border-bottom: 1px solid #454742;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  border-bottom: 1px solid #454742;
}
.nav-link {
  color: #7f7f7f;
  padding: 10px 15px;
  border-radius: 8px;
  transition: color 150ms;
}
.nav-link:hover { color: #052424; }
.nav-link.active { color: #abff02; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

### Extracted Components

These components were found in the codebase:

**Button** (`html`)

**Input** (`html`)

**Card** (`html`)
- Variants: `wrapper-inner`, `image`, `content`, `subtitle`, `title-expanded`

**Navigation** (`html`)

**Badge** (`html`)

**Modal** (`html`)

**List** (`html`)

## Page Structure

The following page sections were detected:

- **Navigation** — Top navigation bar
- **Hero** — Hero section (detected from heading structure)
- **Features** — Feature/benefit cards grid
- **Cta** — Call-to-action section
- **Testimonials** — Testimonials/reviews section

When building pages, follow this section order and structure.

## Animation & Motion

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `color-transition-cafe0bfb`
- `spin-cafe0bfb`
- `popdown-in-cafe0bfb`
- `color-transition-18c5ce2a`
- `color-transition-6810d964`

### Motion Tokens

- **Duration scale:** `0ms`, `.15s`, `.2s`, `.5s`, `1ms`, `100ms`, `200ms`, `230ms`, `250ms`, `300ms`, `350ms`, `400ms`, `450ms`, `500ms`, `600ms`, `700ms`, `900ms`, `1000ms`, `1200ms`, `5000000ms`
- **Easing functions:** `ease`, `ease-out`, `cubic-bezier(.075,.82,.165,1)`, `cubic-bezier(.39,.575,.565,1)`, `cubic-bezier(.19,1,.22,1)`, `cubic-bezier(.47,0,.745,.715)`, `cubic-bezier(.785,.135,.15,.86)`, `cubic-bezier(.445,.05,.55,.95)`, `cubic-bezier(.32,.72,0,1)`, `cubic-bezier(.4,0,.2,1)`, `cubic-bezier(0,0,.2,1)`, `ease-in-out`, `cubic-bezier(.85,0,.15,1)`, `cubic-bezier(.16,1,.3,1)`, `cubic-bezier(.25,.46,.45,.94)`, `cubic-bezier(.645,.045,.355,1)`
- **Animated properties:** `color`, `border-color`, `background-color`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (0ms) for micro-interactions, long (5000000ms) for page transitions
- **Easing:** Use `ease` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Raised (cards, buttons): `0 0 0 1px var(--tw-prose-kbd-shadows),0 3px 0 var(--tw-prose-kbd-shadows)`
- Floating (dropdowns, popovers): `inset 0 0 20px 20px #23232329`
- Overlay (modals, dialogs): `0 8px 32px #00000080`
- Overlay (modals, dialogs): `-4px 0 24px #0003`
- Overlay (modals, dialogs): `inset 0 0 0 1000px #fff`
- Overlay (modals, dialogs): `0 4px 24px #0524241a`

### Z-Index Scale

`0, 1, 2, 3, 10, 40, 50, 100, 999, 2000`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 5px
- **No extra fonts** — only SuisseIntl and SFMono-Regular are allowed
- **No arbitrary border-radius** — use the scale: .25rem, .3125rem, .375rem, .5rem, .75rem, 3px, 4px, 8px, .625rem, 1px
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — SuisseIntl, SFMono-Regular only, using the type scale
4. **Build layout** on the 5px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/static/apple-touch-icon.png`
- **Site URL:** `https://terminal-industries.com`
- **Brand color:** `#abff02`
- **Brand typeface:** SuisseIntl

## Quick Reference

```
Background:     #ffffff
Surface:        #eeeeee
Text:           #052424 / #7f7f7f
Accent:         #abff02
Border:         #454742
Font:           SuisseIntl
Spacing:        5px grid
Radius:         8px
Components:     10 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for terminal-industries
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "terminal-industries" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# terminal-industries DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 2 · Components: 10
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![terminal-industries Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a warm, approachable feel. The light background emphasizes content clarity. Typography uses **SuisseIntl** throughout — a technical, developer-focused choice that maintains consistency. Spacing follows a **5px base grid** (standard density), with scale: 5, 10, 15, 20, 25, 30, 35, 40px. The palette is predominantly monochromatic with **#abff02** as the single accent color — used sparingly for interactive elements and emphasis. Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| tw-ring-offset-color | `#ffffff` | background | Page background, darkest surface |
| surface | `#eeeeee` | surface | Card and panel backgrounds |
| text-primary | `#052424` | text-primary | Headings and body text |
| text-muted | `#7f7f7f` | text-muted | Captions, placeholders, secondary info |
| border | `#454742` | border | Dividers, card borders, outlines |
| accent | `#abff02` | accent | CTAs, links, focus rings, active states |
| danger | `#dc2626` | danger | Error states, destructive actions |
| success | `#22c55e` | success | Success states, positive indicators |
| tw-prose-quote-borders | `#e5e5e5` | unknown | Palette color |
| unknown | `#c2c2c2` | unknown | Palette color |
| unknown | `#000000` | unknown | Palette color |
| unknown | `#1d1d1d` | unknown | Palette color |
| unknown | `#9ca3af` | unknown | Palette color |
| tw-prose-invert-quote-borders | `#374151` | unknown | Palette color |
| unknown | `#586a6a` | unknown | Palette color |
| unknown | `#f87171` | unknown | Palette color |
| unknown | `#333333` | unknown | Palette color |
| unknown | `#6b7280` | unknown | Palette color |
| tw-prose-th-borders | `#d1d5db` | unknown | Palette color |
| tw-prose-invert-th-borders | `#4b5563` | unknown | Palette color |

### CSS Variable Tokens

```css
--tw-border-spacing-x: 0;
--tw-border-spacing-y: 0;
--tw-prose-quote-borders: #e5e7eb;
--tw-prose-th-borders: #d1d5db;
--tw-prose-td-borders: #e5e7eb;
--tw-prose-invert-quote-borders: #374151;
--tw-prose-invert-th-borders: #4b5563;
--tw-prose-invert-td-borders: #374151;
--tw-prose-quote-borders: #e5e7eb;
--tw-prose-th-borders: #d1d5db;
--tw-prose-td-borders: #e5e7eb;
--tw-prose-invert-quote-borders: #374151;
--tw-prose-invert-th-borders: #4b5563;
--tw-prose-invert-td-borders: #374151;
--tw-border-opacity: 1;
--font-primary: "SuisseIntl",sans-serif;
--tw-border-spacing-x: 0;
--tw-border-spacing-y: 0;
--tw-prose-quote-borders: #e5e7eb;
--tw-prose-th-borders: #d1d5db;
```


---

## 3. Typography Rules

**Font Stack:**
- **SuisseIntl** — Heading 1, Heading 2, Heading 3
- **SFMono-Regular** — Body, Caption, Code

**Font Sources:**

```css
@font-face {
  font-family: "SuisseIntl";
  src: url("fonts/SuisseIntl-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Geist Mono";
  src: url("fonts/GeistMono-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Geist Mono";
  src: url("fonts/GeistMono-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | SuisseIntl | 11.3125rem | 700 |
| Heading 2 | SuisseIntl | 11.25rem | 700 |
| Heading 3 | SuisseIntl | min(5.729vw,146.6666666667px) | 700 |
| Body | SFMono-Regular | .875rem | 400 |
| Caption | SFMono-Regular | 1rem | 400 |
| Code | SFMono-Regular | 14px | 400 |

**Typographic Rules:**
- Use **SuisseIntl** for all text — do not mix font families
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Navigation (1)

**Navigation** — `html`

### Data Display (3)

**Card** — `html`
- Variants: `wrapper-inner`, `image`, `content`, `subtitle`, `title-expanded`

**Badge** — `html`

**List** — `html`

### Data Input (2)

**Button** — `html`

**Input** — `html`
- State: :focus, :placeholder

### Overlay (1)

**Modal** — `html`

### Media (3)

**Image** — `html`

**Icon** — `html`

**Map/Canvas** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 5px
- **Spacing scale:** 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75
- **Border radius:** .25rem, .3125rem, .375rem, .5rem, .75rem, 3px, 4px, 8px, inherit, .625rem, 1px, 1.25rem, 12px, 20px
- **Max content width:** 1023px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 2.5-5px | Tight: related items within a group |
| 10px | Medium: between groups |
| 15-20px | Wide: between sections |
| 30px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Raised — cards, buttons, interactive elements

- `0 0 0 1px var(--tw-prose-kbd-shadows),0 3px 0 var(--tw-prose-kbd-shadows)`

### Floating — dropdowns, popovers, modals

- `inset 0 0 20px 20px #23232329`

### Overlay — full-screen overlays, top-level dialogs

- `0 8px 32px #00000080`
- `-4px 0 24px #0003`
- `inset 0 0 0 1000px #fff`

### Z-Index Scale

`0, 1, 2, 3, 10, 40, 50, 100, 999, 2000`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes color-transition-cafe0bfb`
- `@keyframes spin-cafe0bfb`
- `@keyframes popdown-in-cafe0bfb`
- `@keyframes color-transition-18c5ce2a`
- `@keyframes color-transition-6810d964`
- `@keyframes color-transition-63b732dd`
- `@keyframes color-transition-27d88e82`
- `@keyframes color-transition-59fa0a68`

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#abff02` for interactive elements (buttons, links, focus rings)
- Use `#ffffff` as the primary page background
- Use **SuisseIntl** for all UI text
- Follow the **5px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: .25rem, .3125rem, .375rem, .5rem, .75rem
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't mix font families — use SuisseIntl consistently
- Don't use arbitrary spacing values — stick to multiples of 5px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| xs | 480px | css |
| sm | 640px | css |
| md | 720px | css |
| md | 767px | css |
| md | 768px | css |
| lg | 1023px | css |
| lg | 1024px | css |
| xl | 1034px | css |
| xl | 1280px | css |
| 2xl | 1440px | css |
| 2xl | 1536px | css |
| 2xl | 1680px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #eeeeee
Border: 1px solid #454742
Radius: 8px
Padding: 20px
Font: SuisseIntl
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #abff02, text white
Ghost: bg transparent, border #454742
Padding: 10px 20px
Radius: 8px
Hover: opacity 0.9 or lighter shade
Focus: ring with #abff02
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 1023px, centered
Grid: 5px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #eeeeee
Label: #7f7f7f (muted, 12px, uppercase)
Value: #052424 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid #454742
Focus: border-color #abff02
Label: #7f7f7f 12px
Spacing: 20px between fields
Radius: 8px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: SuisseIntl, type scale from Section 3
4. Spacing: 5px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```

## Visual Guide — Screenshots (VISUAL_GUIDE.md)

# terminal-industries — Visual Guide

> Master visual reference. Study every screenshot carefully before implementing any UI.
> Match colors, layout, typography, spacing, and motion states exactly.

## Scroll Journey

The page has cinematic scroll animations. Each screenshot below shows the exact visual state at that scroll depth.
**Replicate these transitions precisely** — the design changes dramatically as you scroll.

### Hero — Above the fold

*Scroll position: 0px of 18127px total*

![Hero — Above the fold](../screens/scroll/scroll-000.png)

### 17% scroll depth

*Scroll position: 2929px of 18127px total*

![17% scroll depth](../screens/scroll/scroll-017.png)

### 33% scroll depth

*Scroll position: 5685px of 18127px total*

![33% scroll depth](../screens/scroll/scroll-033.png)

### 50% scroll depth

*Scroll position: 8614px of 18127px total*

![50% scroll depth](../screens/scroll/scroll-050.png)

### 67% scroll depth

*Scroll position: 11542px of 18127px total*

![67% scroll depth](../screens/scroll/scroll-067.png)

### 83% scroll depth

*Scroll position: 14298px of 18127px total*

![83% scroll depth](../screens/scroll/scroll-083.png)

### Footer — End of page

*Scroll position: 17227px of 18127px total*

![Footer — End of page](../screens/scroll/scroll-100.png)

## Full Page Screenshots

### Terminal Yard Operating System | The New Industry Standard in Yard Operations

*URL: `https://terminal-industries.com`*

![Terminal Yard Operating System | The New Industry Standard in Yard Operations](../screens/pages/home.png)

### A Different Kind of Logistics Technology Company | The Yard Reinvented

*URL: `https://terminal-industries.com/about`*

![A Different Kind of Logistics Technology Company | The Yard Reinvented](../screens/pages/about.png)

### Why Terminal | AI‑Powered Yard Management & Logistics Solutions

*URL: `https://terminal-industries.com/why-terminal`*

![Why Terminal | AI‑Powered Yard Management & Logistics Solutions](../screens/pages/why-terminal.png)

### Terminal YOS | Yard Operating System for AI‑Driven Logistics Automation

*URL: `https://terminal-industries.com/what-is-terminal-yos`*

![Terminal YOS | Yard Operating System for AI‑Driven Logistics Automation](../screens/pages/what-is-terminal-yos.png)

### Terminal Smart Yard™ YMS | Real-Time Yard Visibility & Autonomous Operations

*URL: `https://terminal-industries.com/smart-yard-tm-yms`*

![Terminal Smart Yard™ YMS | Real-Time Yard Visibility & Autonomous Operations](../screens/pages/smart-yard-tm-yms.png)

## Section Screenshots

Clipped sections showing individual components in context.

### Section 1 — `section`

*1440×1200px*

![Section 1](../screens/sections/home-section-1.png)

### Section 1 — `section`

*1440×810px*

![Section 1](../screens/sections/about-section-1.png)

### Section 2 — `section`

*1440×1200px*

![Section 2](../screens/sections/about-section-2.png)

### Section 1 — `section`

*1440×810px*

![Section 1](../screens/sections/why-terminal-section-1.png)

### Section 2 — `section`

*1440×1043px*

![Section 2](../screens/sections/why-terminal-section-2.png)

### Section 1 — `section`

*1440×810px*

![Section 1](../screens/sections/what-is-terminal-yos-section-1.png)

### Section 2 — `section`

*1440×810px*

![Section 2](../screens/sections/what-is-terminal-yos-section-2.png)

### Section 1 — `section`

*1440×810px*

![Section 1](../screens/sections/smart-yard-tm-yms-section-1.png)

### Section 2 — `section`

*1440×1200px*

![Section 2](../screens/sections/smart-yard-tm-yms-section-2.png)

## Animations & Motion (ANIMATIONS.md)

# Animation Reference

> Cinematic motion design extracted from live DOM. Follow these specs exactly to recreate the experience.

## Motion Technology Stack

| Library | Type | Notes |
|---------|------|-------|
| Canvas (2 elements) | 2D Canvas | 2D canvas rendering |

## Scroll Journey

The page is **18,127px** tall. Each frame below shows what the user sees at that scroll depth.

> **Use these screenshots to understand WHAT animates, WHEN it animates, and HOW it moves.**

### 0% — Top / Hero
Scroll position: 0px

![Scroll 0%](../screens/scroll/scroll-000.png)

### 17% — Opening Section
Scroll position: 2,929px

![Scroll 17%](../screens/scroll/scroll-017.png)

### 33% — First Feature Section
Scroll position: 5,685px

![Scroll 33%](../screens/scroll/scroll-033.png)

### 50% — Mid-Page
Scroll position: 8,614px

![Scroll 50%](../screens/scroll/scroll-050.png)

### 67% — Lower Content
Scroll position: 11,542px

![Scroll 67%](../screens/scroll/scroll-067.png)

### 83% — Near Footer
Scroll position: 14,298px

![Scroll 83%](../screens/scroll/scroll-083.png)

### 100% — Bottom / Footer
Scroll position: 17,227px

![Scroll 100%](../screens/scroll/scroll-100.png)

## Video Elements

| # | Role | Autoplay | Loop | Muted | Size | First Frame |
|---|------|----------|------|-------|------|-------------|
| 1 | content | — | ✓ | ✓ | 695×830 | — |
| 2 | content | — | ✓ | ✓ | 695×830 | — |
| 3 | content | — | ✓ | ✓ | 695×830 | — |
| 4 | content | — | ✓ | ✓ | 695×830 | — |
| 5 | content | — | ✓ | ✓ | 695×830 | — |
| 6 | content | — | ✓ | ✓ | 695×830 | — |

- **Source:** `https://a.storyblok.com/f/337048/x/f0f51ea10f/vid_3-1_prerender_1.mp4`
- **Source:** `https://a.storyblok.com/f/337048/x/5c039660e1/vid_3-3_prerender_1.mp4`
- **Source:** `https://a.storyblok.com/f/337048/x/daeedd63c8/vid_3-5_prerender_1.mp4`
- **Source:** `https://a.storyblok.com/f/337048/x/5d1992bef6/vid_3-2_prerender_1.mp4`
- **Source:** `https://a.storyblok.com/f/337048/x/cbcaf12722/hp-where-4.mp4`
- **Source:** `https://a.storyblok.com/f/337048/x/408e8d26ba/vid_5-4_prerender_1.mp4`

## Scroll Animation Patterns

| Pattern | Library | Element Count | Duration | Delay | Easing |
|---------|---------|---------------|----------|-------|--------|
| parallax / sticky scroll | CSS | 26 | — | — | — |

### CSS Implementation

## CSS Keyframes (107 extracted)

### `@keyframes spin-cafe0bfb`

Duration: `0.6s` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.callback-spinner[data-v-cafe0bfb]`

```css
@keyframes spin-cafe0bfb {
  100% {
    transform: rotate(1turn);
  }
}
```

> Transform/motion animation

### `@keyframes popdown-in-cafe0bfb`

Duration: `0.25s` · Easing: `cubic-bezier(0.16, 1, 0.3, 1)` · Delay: `0s` · Iteration: `1` · Fill: `none`

Used by: `.popdown-enter-active[data-v-cafe0bfb]`

```css
@keyframes popdown-in-cafe0bfb {
  0% {
    clip-path: inset(0px 0px 100%);
    opacity: 0;
  }
  100% {
    clip-path: inset(0px);
    opacity: 1;
  }
}
```

> Opacity fade · Clip-path reveal

### `@keyframes dropdown-in-5aa95c1e`

Duration: `0.25s` · Easing: `cubic-bezier(0.16, 1, 0.3, 1)` · Delay: `0s` · Iteration: `1` · Fill: `none`

Used by: `[data-v-5aa95c1e] .nav-dropdown-content[data-state="open"]`

```css
@keyframes dropdown-in-5aa95c1e {
  0% {
    clip-path: inset(0px 0px 100%);
    opacity: 0;
  }
  100% {
    clip-path: inset(0px);
    opacity: 1;
  }
}
```

> Opacity fade · Clip-path reveal

### `@keyframes color-transition-8ab42d30`

Duration: `0.5s` · Easing: `ease` · Delay: `0s` · Iteration: `1` · Fill: `none`

Used by: `.title__wrapper .title[data-v-8ab42d30] strong.show`

```css
@keyframes color-transition-8ab42d30 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes spin-cafe0bfb`

Duration: `0.6s` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.callback-spinner[data-v-cafe0bfb]`

```css
@keyframes spin-cafe0bfb {
  100% {
    transform: rotate(1turn);
  }
}
```

> Transform/motion animation

### `@keyframes popdown-in-cafe0bfb`

Duration: `0.25s` · Easing: `cubic-bezier(0.16, 1, 0.3, 1)` · Delay: `0s` · Iteration: `1` · Fill: `none`

Used by: `.popdown-enter-active[data-v-cafe0bfb]`

```css
@keyframes popdown-in-cafe0bfb {
  0% {
    clip-path: inset(0px 0px 100%);
    opacity: 0;
  }
  100% {
    clip-path: inset(0px);
    opacity: 1;
  }
}
```

> Opacity fade · Clip-path reveal

### `@keyframes dropdown-in-5aa95c1e`

Duration: `0.25s` · Easing: `cubic-bezier(0.16, 1, 0.3, 1)` · Delay: `0s` · Iteration: `1` · Fill: `none`

Used by: `[data-v-5aa95c1e] .nav-dropdown-content[data-state="open"]`

```css
@keyframes dropdown-in-5aa95c1e {
  0% {
    clip-path: inset(0px 0px 100%);
    opacity: 0;
  }
  100% {
    clip-path: inset(0px);
    opacity: 1;
  }
}
```

> Opacity fade · Clip-path reveal

### `@keyframes first-star-group__ts`

Duration: `20000ms` · Easing: `linear` · Delay: `0s` · Iteration: `1` · Fill: `none`

Used by: `#salespeak-magic-icon #first-star-group`

```css
@keyframes first-star-group__ts {
  0% {
    transform: translate(18.15px, 20.4px) scale(1, 1);
  }
  21.92% {
    transform: translate(18.15px, 20.4px) scale(1, 1);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  23.6% {
    transform: translate(18.15px, 20.4px) scale(0.9, 0.9);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  27.68% {
    transform: translate(18.15px, 20.4px) scale(2.5, 2.5);
  }
  100% {
    transform: translate(18.15px, 20.4px) scale(1, 1);
  }
}
```

> Transform/motion animation

### `@keyframes first-star_c_o`

Duration: `20000ms` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `forwards`

Used by: `#salespeak-magic-icon #first-star`

```css
@keyframes first-star_c_o {
  0% {
    opacity: 1;
  }
  21.92% {
    opacity: 1;
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  23.6% {
    opacity: 0.82257;
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  27.68% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
```

> Opacity fade

### `@keyframes second-star-group__ts`

Duration: `20000ms` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `forwards`

Used by: `#salespeak-magic-icon #second-star-group`

```css
@keyframes second-star-group__ts {
  0% {
    transform: translate(6.45px, 14.95px) scale(1, 1);
  }
  23.84% {
    transform: translate(6.45px, 14.95px) scale(1, 1);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  25.52% {
    transform: translate(6.45px, 14.95px) scale(0.9, 0.9);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  29.48% {
    transform: translate(6.45px, 14.95px) scale(2.5, 2.5);
  }
  100% {
    transform: translate(6.45px, 14.95px) scale(1, 1);
  }
}
```

> Transform/motion animation

### `@keyframes second-star_c_o`

Duration: `20000ms` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `forwards`

Used by: `#salespeak-magic-icon #second-star`

```css
@keyframes second-star_c_o {
  0% {
    opacity: 1;
  }
  23.84% {
    opacity: 1;
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  25.52% {
    opacity: 0.82257;
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  29.48% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
```

> Opacity fade

### `@keyframes third-star-group__ts`

Duration: `20000ms` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `forwards`

Used by: `#salespeak-magic-icon #third-star-group`

```css
@keyframes third-star-group__ts {
  0% {
    transform: translate(17.3px, 9px) scale(1, 1);
  }
  25.76% {
    transform: translate(17.3px, 9px) scale(1, 1);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  27.32% {
    transform: translate(17.3px, 9px) scale(0.9, 0.9);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  31.4% {
    transform: translate(17.3px, 9px) scale(2.5, 2.5);
  }
  100% {
    transform: translate(17.3px, 9px) scale(1, 1);
  }
}
```

> Transform/motion animation

### `@keyframes third-star_c_o`

Duration: `20000ms` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `forwards`

Used by: `#salespeak-magic-icon #third-star`

```css
@keyframes third-star_c_o {
  0% {
    opacity: 1;
  }
  25.76% {
    opacity: 1;
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  27.32% {
    opacity: 0.82257;
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  31.4% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
```

> Opacity fade

### `@keyframes move-star-1`

Duration: `10s` · Easing: `ease` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `#salespeak-sparks-icon #first-star`

```css
@keyframes move-star-1 {
  0%, 100% {
    transform: translate(0px, 0px) scale(1) rotate(0deg);
  }
  7% {
    transform: translate(30%, -30%);
  }
  14% {
    transform: translate(-20%, -20%) scale(0.6) rotate(180deg);
  }
  21% {
    transform: translate(-5%, 5%) scale(0.8) rotate(90deg);
  }
  28% {
    transform: translate(0px, 0px) scale(1) rotate(0deg);
  }
}
```

> Transform/motion animation

### `@keyframes move-star-2`

Duration: `10s` · Easing: `ease` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `#salespeak-sparks-icon #second-star`

```css
@keyframes move-star-2 {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  7% {
    transform: translate(-100%, 90%);
  }
  14% {
    transform: translate(0%, 90%) rotate(90deg);
  }
  21% {
    transform: translate(0px, 0px) rotate(180deg);
  }
  28% {
    transform: translate(0%, 0%) rotate(360deg);
  }
  100% {
    transform: translate(0%, 0%) rotate(360deg);
  }
}
```

> Transform/motion animation

### `@keyframes loading`

Duration: `1.5s` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `#salespeak-sticky-input .sticky-input-container.sticky-input-container--loading:`

```css
@keyframes loading {
  100% {
    left: 100%;
  }
}
```

### `@keyframes cursorBlink`

Duration: `1s` · Easing: `steps(2)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `#salespeak-sticky-input .sticky-input-placeholder .sticky-input-placeholder-blin`

```css
@keyframes cursorBlink {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes color-transition-8ab42d30`

Duration: `0.5s` · Easing: `ease` · Delay: `0s` · Iteration: `1` · Fill: `none`

Used by: `.title__wrapper .title[data-v-8ab42d30] strong.show`

```css
@keyframes color-transition-8ab42d30 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes savingTimeBannerShow`

Duration: `15s` · Easing: `ease-in-out` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `#salespeak-sticky-input .sticky-input-saving-time-banner-container`

```css
@keyframes savingTimeBannerShow {
  0%, 65% {
    visibility: hidden;
    transform: translateY(18px);
    z-index: -1;
  }
  66% {
    visibility: visible;
    transform: translateY(0px);
    z-index: 9999;
  }
  99% {
    visibility: visible;
    transform: translateY(0px);
    z-index: 9999;
  }
  100% {
    visibility: hidden;
    transform: translateY(18px);
    z-index: -1;
  }
}
```

> Transform/motion animation

### `@keyframes floatY`

Duration: `3.5s` · Easing: `ease-in-out` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.sticky-header-image-wrapper`

```css
@keyframes floatY {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
```

> Transform/motion animation

### `@keyframes color-transition`

```css
@keyframes color-transition {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-cafe0bfb`

```css
@keyframes color-transition-cafe0bfb {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-18c5ce2a`

```css
@keyframes color-transition-18c5ce2a {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-6810d964`

```css
@keyframes color-transition-6810d964 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-63b732dd`

```css
@keyframes color-transition-63b732dd {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-27d88e82`

```css
@keyframes color-transition-27d88e82 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-59fa0a68`

```css
@keyframes color-transition-59fa0a68 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-b399f107`

```css
@keyframes color-transition-b399f107 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-5aa95c1e`

```css
@keyframes color-transition-5aa95c1e {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-d833f30e`

```css
@keyframes color-transition-d833f30e {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-dc91bdc2`

```css
@keyframes color-transition-dc91bdc2 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-ebd3c3c9`

```css
@keyframes color-transition-ebd3c3c9 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-2a5cb2b0`

```css
@keyframes color-transition-2a5cb2b0 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-b5fe9da5`

```css
@keyframes color-transition-b5fe9da5 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-aaa1b985`

```css
@keyframes color-transition-aaa1b985 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-068da249`

```css
@keyframes color-transition-068da249 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-a85da28f`

```css
@keyframes color-transition-a85da28f {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-26ed1394`

```css
@keyframes color-transition-26ed1394 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-ce9a9e73`

```css
@keyframes color-transition-ce9a9e73 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-0da6245d`

```css
@keyframes color-transition-0da6245d {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-203e72aa`

```css
@keyframes color-transition-203e72aa {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-684aab2b`

```css
@keyframes color-transition-684aab2b {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-a66e7924`

```css
@keyframes color-transition-a66e7924 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-1fc0e13d`

```css
@keyframes color-transition-1fc0e13d {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-b0ce0e74`

```css
@keyframes color-transition-b0ce0e74 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-3fe87144`

```css
@keyframes color-transition-3fe87144 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-ccc5b99d`

```css
@keyframes color-transition-ccc5b99d {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-d8fa3fef`

```css
@keyframes color-transition-d8fa3fef {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-1f873f9c`

```css
@keyframes color-transition-1f873f9c {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-dfc3204d`

```css
@keyframes color-transition-dfc3204d {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-15a59758`

```css
@keyframes color-transition-15a59758 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-3812e7b9`

```css
@keyframes color-transition-3812e7b9 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-2b4ff538`

```css
@keyframes color-transition-2b4ff538 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-a05fa845`

```css
@keyframes color-transition-a05fa845 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-7682a121`

```css
@keyframes color-transition-7682a121 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-46d09fd2`

```css
@keyframes color-transition-46d09fd2 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-453353c7`

```css
@keyframes color-transition-453353c7 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-07366fe0`

```css
@keyframes color-transition-07366fe0 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-ac655bc0`

```css
@keyframes color-transition-ac655bc0 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-cafe0bfb`

```css
@keyframes color-transition-cafe0bfb {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-18c5ce2a`

```css
@keyframes color-transition-18c5ce2a {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-6810d964`

```css
@keyframes color-transition-6810d964 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-63b732dd`

```css
@keyframes color-transition-63b732dd {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-27d88e82`

```css
@keyframes color-transition-27d88e82 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-59fa0a68`

```css
@keyframes color-transition-59fa0a68 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-b399f107`

```css
@keyframes color-transition-b399f107 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-5aa95c1e`

```css
@keyframes color-transition-5aa95c1e {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-d833f30e`

```css
@keyframes color-transition-d833f30e {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-dc91bdc2`

```css
@keyframes color-transition-dc91bdc2 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-ebd3c3c9`

```css
@keyframes color-transition-ebd3c3c9 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-2a5cb2b0`

```css
@keyframes color-transition-2a5cb2b0 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-b5fe9da5`

```css
@keyframes color-transition-b5fe9da5 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-aaa1b985`

```css
@keyframes color-transition-aaa1b985 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-068da249`

```css
@keyframes color-transition-068da249 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-a85da28f`

```css
@keyframes color-transition-a85da28f {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-203e72aa`

```css
@keyframes color-transition-203e72aa {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-3ce802c4`

```css
@keyframes color-transition-3ce802c4 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-3fe87144`

```css
@keyframes color-transition-3fe87144 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-3812e7b9`

```css
@keyframes color-transition-3812e7b9 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-dfc3204d`

```css
@keyframes color-transition-dfc3204d {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-ac655bc0`

```css
@keyframes color-transition-ac655bc0 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes jump`

```css
@keyframes jump {
  0% {
    transform: scaleX(1.25) scaleY(0.75) translate(0px, 0px);
  }
  30% {
    transform: scaleX(0.75) scaleY(1.25) translate(0px, -10px);
  }
  50% {
    transform: scaleX(0.9) scaleY(1.1) translate(0px, -20px);
  }
  70% {
    transform: translate(0px, -30px);
  }
}
```

> Transform/motion animation

### `@keyframes bounce`

```css
@keyframes bounce {
  0% {
    transform: translateY(calc(-1 * var(--salespeak-bottom-offset, 0px))) scale(1);
  }
  50% {
    transform: translateY(calc(-1 * var(--salespeak-bottom-offset, 0px))) scale(1.1);
  }
  100% {
    transform: translateY(calc(-1 * var(--salespeak-bottom-offset, 0px))) scale(1);
  }
}
```

> Transform/motion animation

### `@keyframes color-transition-684aab2b`

```css
@keyframes color-transition-684aab2b {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-0da6245d`

```css
@keyframes color-transition-0da6245d {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-ce9a9e73`

```css
@keyframes color-transition-ce9a9e73 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-26ed1394`

```css
@keyframes color-transition-26ed1394 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-1fc0e13d`

```css
@keyframes color-transition-1fc0e13d {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-4cd0d40d`

```css
@keyframes color-transition-4cd0d40d {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-c4720eaf`

```css
@keyframes color-transition-c4720eaf {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-420d01d6`

```css
@keyframes color-transition-420d01d6 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-a66e7924`

```css
@keyframes color-transition-a66e7924 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-b0ce0e74`

```css
@keyframes color-transition-b0ce0e74 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-d8fa3fef`

```css
@keyframes color-transition-d8fa3fef {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-e284aaf6`

```css
@keyframes color-transition-e284aaf6 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-ccc5b99d`

```css
@keyframes color-transition-ccc5b99d {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-1f873f9c`

```css
@keyframes color-transition-1f873f9c {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-15a59758`

```css
@keyframes color-transition-15a59758 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-2b4ff538`

```css
@keyframes color-transition-2b4ff538 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-7682a121`

```css
@keyframes color-transition-7682a121 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-a05fa845`

```css
@keyframes color-transition-a05fa845 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-46d09fd2`

```css
@keyframes color-transition-46d09fd2 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-07366fe0`

```css
@keyframes color-transition-07366fe0 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-453353c7`

```css
@keyframes color-transition-453353c7 {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-bec5983c`

```css
@keyframes color-transition-bec5983c {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes color-transition-0f81d4fb`

```css
@keyframes color-transition-0f81d4fb {
  0% {
    color: var(--c-light-light-gray);
  }
  30% {
    color: var(--c-lime);
  }
  100% {
    color: var(--c-dark-green);
  }
}
```

> Text color shift

### `@keyframes rotate`

```css
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

> Transform/motion animation

## Motion Tokens (CSS Variables)

### Easing Tokens

```css
--ease-out: cubic-bezier(0,0,.58,1);
```

## Global Transition Declarations

These `transition` values were extracted from CSS rules across the site:

```css
transition: background-color 5000s ease-in-out;
transition: transform 0.6s cubic-bezier(0.85, 0, 0.15, 1);
transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
transition: opacity 0.6s cubic-bezier(0.39, 0.575, 0.565, 1), transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
transition: opacity 0.4s cubic-bezier(0.39, 0.575, 0.565, 1), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
transition: opacity 0.25s;
transition: opacity 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
transition: color 0.2s, border-color 0.2s, background-color 0.2s;
transition: color 0.2s;
transition: border-color 0.2s;
transition: background-color 0.2s, opacity 0.2s;
transition: opacity 0.5s;
```

## How to Recreate This Motion Design

### Step 2 — Scroll-Reveal Pattern

Elements that animate into view follow this pattern:

```css
/* Initial hidden state */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 5000s cubic-bezier(0,0,.58,1),
              transform 5000s cubic-bezier(0,0,.58,1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Step 3 — Key Motion Principles

- **Canvas elements (2)** — animated via requestAnimationFrame loop. Use canvas for particle effects, gradient animations, and WebGL scenes
- **Duration scale:** `5000s` · `0.6s` · `1.2s` — use these values, never invent new durations
- **Always add** `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

### Step 4 — Scroll Journey Reference

Match what happens at each scroll position:

- **0%** (`0px`) → `screens/scroll/scroll-000.png`
- **17%** (`2929px`) → `screens/scroll/scroll-017.png`
- **33%** (`5685px`) → `screens/scroll/scroll-033.png`
- **50%** (`8614px`) → `screens/scroll/scroll-050.png`
- **67%** (`11542px`) → `screens/scroll/scroll-067.png`
- **83%** (`14298px`) → `screens/scroll/scroll-083.png`
- **100%** (`17227px`) → `screens/scroll/scroll-100.png`

## Layout & Grid (LAYOUT.md)

# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 5px

**Scale:** `5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 85, 90` px

| Spacing | Semantic Use |
|---------|-------------|
| 5px | Tight — within a component |
| 10px | Medium — between sibling items |
| 20px | Wide — between sections |
| 40px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `div.launcher-container.launcher-container--sticky` | column | — | stretch | — | 1 |
| `div.sticky-input-container` | row | — | center | 12px | 5 |
| `div.sticky-buttons-container` | row | — | stretch | — | 4 |
| `div.site-container` | row | — | — | — | 1 |
| `div.logo-grid` | row | center | start | normal 0px | 5 |
| `div.logo-grid` | row | center | start | normal 0px | 5 |
| `form.ai-input-wrapper` | row | — | center | 8px | 3 |
| `div.form-wrapper` | column | — | — | 120px | 2 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div.message-for-user-container` | `48px 316.797px` | 16px | 3 |
| `div.site-grid.|` | `111.25px 111.25px 111.25px 111.25px 111.25px 111.2` | — | 2 |
| `section.logo-grid-wrapper` | `97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 9` | normal 15.0048px | 1 |
| `section.logo-grid-wrapper` | `97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 9` | normal 15.0048px | 1 |

## Structural Containers

### `<header>` (`header.site-header`)

```
display:          block
children:         1
```

### `<main>` 

```
display:          block
children:         1
```

### `<section>` (`section.video-carousel`)

```
display:          block
children:         2
```

### `<section>` (`section.features-steps`)

```
display:          block
padding:          48px 0px 216px
children:         1
```

### `<section>` (`section.fullscreen-features__wrapper`)

```
display:          block
children:         1
```

### `<section>` (`section.logo-grid-wrapper`)

```
display:          grid
grid-template-columns: 97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 97.5
gap:              normal 15.0048px
padding:          0px 52.5024px
children:         1
```

### `<section>` (`section.logo-grid-wrapper`)

```
display:          grid
grid-template-columns: 97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 97.5px 97.5
gap:              normal 15.0048px
padding:          0px 52.5024px
children:         1
```

### `<nav>` (`nav.nav.|`)

```
display:          block
children:         2
```

### `<section>` (`section.section__wrapper`)

```
display:          block
children:         1
```

### `<section>` (`section.sticky-holder.green`)

```
display:          block
children:         1
```

### `<section>` (`section.section__wrapper`)

```
display:          block
children:         1
```

### `<section>` (`section.section__wrapper`)

```
display:          block
children:         1
```

## Layout Rules

- **Container max-width:** `100%` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **5px**
- Never use arbitrary margin/padding values outside the spacing scale

## Component Patterns (COMPONENTS.md)

# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **Char** | unknown | 104× | `.--char` |
| **A** | unknown | 49× |  |
| **Svg Mask** | unknown | 15× | `.svg-mask` |
| **Svg** | unknown | 15× | `.svg` |
| **Line** | unknown | 9× | `.--line` |
| **Slot** | unknown | 9× | `.slot`, `.use-clip` |
| **Media Wrapper** | unknown | 9× | `.media-wrapper` |
| **Video** | unknown | 9× | `.video` |
| **Notch Section  Wrapper** | unknown | 8× | `.notch-section__wrapper` |
| **Split  Wrapper** | unknown | 6× | `.split__wrapper` |
| **Image** | unknown | 6× | `.image`, `.media-el` |
| **Slot** | unknown | 5× | `.slot`, `.use-clip` |
| **Scroll Item** | card | 5× | `.scroll-item` |
| **Navigation Menu Root** | unknown | 4× | `.navigation-menu-root` |
| **Nav Dropdown Trigger** | button | 4× | `.nav-dropdown-trigger` |
| **Title Si** | unknown | 4× | `.title-si` |
| **Section  Wrapper** | unknown | 3× | `.section__wrapper` |
| **Content Wrapper** | unknown | 3× | `.content-wrapper` |
| **Animated Strong** | unknown | 3× | `.animated-strong`, `.header` |
| **Heading  Word Wrapper** | unknown | 3× | `.heading__word-wrapper` |

## Cards

### Scroll Item

**Instances found:** 5

**CSS classes:** `.scroll-item`

**HTML structure:**

```html
<li class="scroll-item" style="--index:1;" data-v-1f873f9c=""><span class="split__wrapper" data-v-1f873f9c=""><!--[--><p data-v-1f873f9c="" aria-label="Single pane of glass visibility of all yard operations"><span class="split-chars" aria-hidden="true" style="--v-delay: 0s;">S</span><span class="split-chars" aria-hidden="true" style="--v-delay: 0.01s;">i</span><span class="split-chars" aria-hidden="true" style="--v-delay: 0.03s;">n</span><span class="split-chars" aria-hidden="true" style="--v-delay: 0.04s;">g</span><span class="split-chars" aria-hidden="true" style="--v-delay: 0.06s;">l</span>
```

**Base styles (from design tokens):**

```css
.scroll-item {
  background: #eeeeee;
  border: 1px solid #454742;
  border-radius: 8px;
  padding: 10px;
}```

## Buttons

### Nav Dropdown Trigger

**Instances found:** 4

**CSS classes:** `.nav-dropdown-trigger`

**HTML structure:**

```html
<button data-reka-collection-item="" id="reka-navigation-menu-v-0-0-trigger-System" data-state="closed" data-navigation-menu-trigger="" aria-expanded="false" aria-controls="reka-navigation-menu-v-0-0-content-System" class="nav-dropdown-trigger" type="button" data-v-5aa95c1e="">System <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" class="arrow-icon" data-v-5aa95c1e=""><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-5aa95c1e=""></path></svg></button>
```

**Base styles (from design tokens):**

```css
.nav-dropdown-trigger {
  background: #abff02;
  color: #052424;
  border-radius: 8px;
  padding: 5px 10px;
  cursor: pointer;
}```

## Other Components

### Char

**Instances found:** 104

**CSS classes:** `.--char`

**HTML structure:**

```html
<span class="--char" aria-hidden="true">W</span>
```

**Base styles (from design tokens):**

```css
.--char {
  background: #eeeeee;
  padding: 5px;
}```

### A

**Instances found:** 49

**HTML structure:**

```html
<a href="/about" class="" data-v-d833f30e="">About</a>
```

**Base styles (from design tokens):**

```css
.a {
  background: #eeeeee;
  padding: 5px;
}```

### Svg Mask

**Instances found:** 15

**CSS classes:** `.svg-mask`

**HTML structure:**

```html
<div class="svg-mask" data-v-3fe87144="" style="--d27fb6da:url(#clip-v-0-0-0-0-1-0);--b18bdda2:url(#mask-v-0-0-0-0-1-0);" data-v-ebd3c3c9=""><svg width="1440" height="48" viewBox="-0.5 -0.5 1441 49" class="svg" shape-rendering="geometricPrecision" data-v-ebd3c3c9=""><defs data-v-ebd3c3c9=""><clipPath id="clip-v-0-0-0-0-1-0" clipPathUnits="userSpaceOnUse" data-v-ebd3c3c9=""><path d="M -0.5,-0.5 L 221.69,-0.03 A 27.71,27.71 0 0 1 242.23,9.15 L 261.77,30.85 A 27.64,27.64 0 0 0 282.31,40 L 1157.69,40 A 27.64,27.64 0 0 0 1178.23,30.85 L 1197.77,9.15 A 27.71,27.71 0 0 1 1218.31,-0.03 L 1440.5,-0.5 L
```

**Base styles (from design tokens):**

```css
.svg-mask {
  background: #eeeeee;
  padding: 5px;
}```

### Svg

**Instances found:** 15

**CSS classes:** `.svg`

**HTML structure:**

```html
<svg width="1440" height="48" viewBox="-0.5 -0.5 1441 49" class="svg" shape-rendering="geometricPrecision" data-v-ebd3c3c9=""><defs data-v-ebd3c3c9=""><clipPath id="clip-v-0-0-0-0-1-0" clipPathUnits="userSpaceOnUse" data-v-ebd3c3c9=""><path d="M -0.5,-0.5 L 221.69,-0.03 A 27.71,27.71 0 0 1 242.23,9.15 L 261.77,30.85 A 27.64,27.64 0 0 0 282.31,40 L 1157.69,40 A 27.64,27.64 0 0 0 1178.23,30.85 L 1197.77,9.15 A 27.71,27.71 0 0 1 1218.31,-0.03 L 1440.5,-0.5 L 1440.5,48.5 L -0.5,48.5 L -0.5,-0.5" data-v-ebd3c3c9=""></path></clipPath></defs></svg>
```

**Base styles (from design tokens):**

```css
.svg {
  background: #eeeeee;
  padding: 5px;
}```

### Line

**Instances found:** 9

**CSS classes:** `.--line`

**HTML structure:**

```html
<span class="--line" aria-hidden="true" style="text-align: center;"><span class="--char" aria-hidden="true">W</span><span class="--char" aria-hidden="true">e</span> <span class="--char" aria-hidden="true">h</span><span class="--char" aria-hidden="true">a</span><span class="--char" aria-hidden="true">v</span><span class="--char" aria-hidden="true">e</span> <span class="--char" aria-hidden="true">r</span><span class="--char" aria-hidden="true">e</span><span class="--char" aria-hidden="true">i</span><span class="--char" aria-hidden="true">n</span><span class="--char" aria-hidden="true">v</span><s
```

**Base styles (from design tokens):**

```css
.--line {
  background: #eeeeee;
  padding: 5px;
}```

### Slot

**Instances found:** 9

**CSS classes:** `.slot` `.use-clip`

**HTML structure:**

```html
<div class="slot use-clip" data-v-ebd3c3c9=""><!--[--><!--[--><div class="notch-top__bg-container" data-v-b0ce0e74=""></div><!--]--><!--]--></div>
```

**Base styles (from design tokens):**

```css
.slot {
  background: #eeeeee;
  padding: 5px;
}```

### Media Wrapper

**Instances found:** 9

**CSS classes:** `.media-wrapper`

**HTML structure:**

```html
<div class="media-wrapper lg" data-v-18c5ce2a=""><video class="video" src="https://a.storyblok.com/f/337048/x/f0f51ea10f/vid_3-1_prerender_1.mp4" preload="auto" muted="" loop="" playsinline="" data-v-18c5ce2a=""></video></div>
```

**Base styles (from design tokens):**

```css
.media-wrapper {
  background: #eeeeee;
  padding: 5px;
}```

### Video

**Instances found:** 9

**CSS classes:** `.video`

**HTML structure:**

```html
<video class="video" src="https://a.storyblok.com/f/337048/x/f0f51ea10f/vid_3-1_prerender_1.mp4" preload="auto" muted="" loop="" playsinline="" data-v-18c5ce2a=""></video>
```

**Base styles (from design tokens):**

```css
.video {
  background: #eeeeee;
  padding: 5px;
}```

### Notch Section  Wrapper

**Instances found:** 8

**CSS classes:** `.notch-section__wrapper`

**HTML structure:**

```html
<div class="notch-section__wrapper" data-v-b0ce0e74="" data-v-3fe87144=""><div class="svg-mask" data-v-3fe87144="" style="--d27fb6da:url(#clip-v-0-0-0-0-1-0);--b18bdda2:url(#mask-v-0-0-0-0-1-0);" data-v-ebd3c3c9=""><svg width="1440" height="48" viewBox="-0.5 -0.5 1441 49" class="svg" shape-rendering="geometricPrecision" data-v-ebd3c3c9=""><defs data-v-ebd3c3c9=""><clipPath id="clip-v-0-0-0-0-1-0" clipPathUnits="userSpaceOnUse" data-v-ebd3c3c9=""><path d="M -0.5,-0.5 L 221.69,-0.03 A 27.71,27.71 0 0 1 242.23,9.15 L 261.77,30.85 A 27.64,27.64 0 0 0 282.31,40 L 1157.69,40 A 27.64,27.64 0 0 0 1178
```

**Base styles (from design tokens):**

```css
.notch-section__wrapper {
  background: #eeeeee;
  padding: 5px;
}```

### Split  Wrapper

**Instances found:** 6

**CSS classes:** `.split__wrapper`

**HTML structure:**

```html
<span class="split__wrapper" data-v-1f873f9c=""><!--[--><p data-v-1f873f9c="" aria-label="Autonomous, agentic AI-driven workflows from gate to dock"><span class="split-chars" aria-hidden="true" style="--v-delay: 0s;">A</span><span class="split-chars" aria-hidden="true" style="--v-delay: 0.01s;">u</span><span class="split-chars" aria-hidden="true" style="--v-delay: 0.03s;">t</span><span class="split-chars" aria-hidden="true" style="--v-delay: 0.04s;">o</span><span class="split-chars" aria-hidden="true" style="--v-delay: 0.06s;">n</span><span class="split-chars" aria-hidden="true" style="--v-del
```

**Base styles (from design tokens):**

```css
.split__wrapper {
  background: #eeeeee;
  padding: 5px;
}```

### Image

**Instances found:** 6

**CSS classes:** `.image` `.media-el`

**HTML structure:**

```html
<div class="media-el image is-visible" data-v-1f873f9c="" data-v-18c5ce2a=""><div class="media-wrapper lg" data-v-18c5ce2a=""><video class="video" src="https://a.storyblok.com/f/337048/x/f0f51ea10f/vid_3-1_prerender_1.mp4" preload="auto" muted="" loop="" playsinline="" data-v-18c5ce2a=""></video></div><!----></div>
```

**Base styles (from design tokens):**

```css
.image {
  background: #eeeeee;
  padding: 5px;
}```

### Slot

**Instances found:** 5

**CSS classes:** `.slot` `.use-clip`

**HTML structure:**

```html
<div class="slot use-clip" data-v-ebd3c3c9=""><!--[--><!--[--><section class="section__wrapper" data-v-ccc5b99d=""><!----><!----><!----><!----><!----><div class="section-introduction hp-si1" data-v-ccc5b99d=""><div class="content-wrapper" data-v-ccc5b99d=""><div class="section-content" data-v-ccc5b99d=""><!----><header class="header animated-strong" data-v-ccc5b99d="" aria-label="Imagine the yard as an intelligent bridge seamlessly connecting highway to warehouse."><!--[--><h2 class="title-si" data-v-ccc5b99d=""><span aria-hidden="true"><span class="--char" aria-hidden="true">I</span><span cla
```

**Base styles (from design tokens):**

```css
.slot {
  background: #eeeeee;
  padding: 5px;
}```

### Navigation Menu Root

**Instances found:** 4

**CSS classes:** `.navigation-menu-root`

**HTML structure:**

```html
<nav class="navigation-menu-root" data-v-d833f30e="" aria-label="Main" data-orientation="horizontal" dir="ltr" data-reka-navigation-menu="" data-v-5aa95c1e=""><!--[--><div style="position:relative;" data-v-5aa95c1e=""><ul data-orientation="horizontal"><!--[--><li data-menu-item="" data-v-5aa95c1e=""><!--[--><!--[--><button data-reka-collection-item="" id="reka-navigation-menu-v-0-0-trigger-System" data-state="closed" data-navigation-menu-trigger="" aria-expanded="false" aria-controls="reka-navigation-menu-v-0-0-content-System" class="nav-dropdown-trigger" type="button" data-v-5aa95c1e="">Syste
```

**Base styles (from design tokens):**

```css
.navigation-menu-root {
  background: #eeeeee;
  padding: 5px;
}```

### Title Si

**Instances found:** 4

**CSS classes:** `.title-si`

**HTML structure:**

```html
<h2 class="title-si" data-v-ccc5b99d=""><span aria-hidden="true"><span class="--char" aria-hidden="true">I</span><span class="--char" aria-hidden="true">m</span><span class="--char" aria-hidden="true">a</span><span class="--char" aria-hidden="true">g</span><span class="--char" aria-hidden="true">i</span><span class="--char" aria-hidden="true">n</span><span class="--char" aria-hidden="true">e</span></span> <span aria-hidden="true"><span class="--char" aria-hidden="true">t</span><span class="--char" aria-hidden="true">h</span><span class="--char" aria-hidden="true">e</span></span> </h2>
```

**Base styles (from design tokens):**

```css
.title-si {
  background: #eeeeee;
  padding: 5px;
}```

### Section  Wrapper

**Instances found:** 3

**CSS classes:** `.section__wrapper`

**HTML structure:**

```html
<section class="section__wrapper" data-v-ccc5b99d=""><!----><!----><!----><!----><!----><div class="section-introduction hp-si1" data-v-ccc5b99d=""><div class="content-wrapper" data-v-ccc5b99d=""><div class="section-content" data-v-ccc5b99d=""><!----><header class="header animated-strong" data-v-ccc5b99d="" aria-label="Imagine the yard as an intelligent bridge seamlessly connecting highway to warehouse."><!--[--><h2 class="title-si" data-v-ccc5b99d=""><span aria-hidden="true"><span class="--char" aria-hidden="true">I</span><span class="--char" aria-hidden="true">m</span><span class="--char" ar
```

**Base styles (from design tokens):**

```css
.section__wrapper {
  background: #eeeeee;
  padding: 5px;
}```

### Content Wrapper

**Instances found:** 3

**CSS classes:** `.content-wrapper`

**HTML structure:**

```html
<div class="content-wrapper" data-v-ccc5b99d=""><div class="section-content" data-v-ccc5b99d=""><!----><header class="header animated-strong" data-v-ccc5b99d="" aria-label="Imagine the yard as an intelligent bridge seamlessly connecting highway to warehouse."><!--[--><h2 class="title-si" data-v-ccc5b99d=""><span aria-hidden="true"><span class="--char" aria-hidden="true">I</span><span class="--char" aria-hidden="true">m</span><span class="--char" aria-hidden="true">a</span><span class="--char" aria-hidden="true">g</span><span class="--char" aria-hidden="true">i</span><span class="--char" aria-h
```

**Base styles (from design tokens):**

```css
.content-wrapper {
  background: #eeeeee;
  padding: 5px;
}```

### Animated Strong

**Instances found:** 3

**CSS classes:** `.animated-strong` `.header`

**HTML structure:**

```html
<header class="header animated-strong" data-v-ccc5b99d="" aria-label="Imagine the yard as an intelligent bridge seamlessly connecting highway to warehouse."><!--[--><h2 class="title-si" data-v-ccc5b99d=""><span aria-hidden="true"><span class="--char" aria-hidden="true">I</span><span class="--char" aria-hidden="true">m</span><span class="--char" aria-hidden="true">a</span><span class="--char" aria-hidden="true">g</span><span class="--char" aria-hidden="true">i</span><span class="--char" aria-hidden="true">n</span><span class="--char" aria-hidden="true">e</span></span> <span aria-hidden="true"><
```

**Base styles (from design tokens):**

```css
.animated-strong {
  background: #eeeeee;
  padding: 5px;
}```

### Heading  Word Wrapper

**Instances found:** 3

**CSS classes:** `.heading__word-wrapper`

**HTML structure:**

```html
<span aria-hidden="true" class="heading__word-wrapper" data-v-15a59758=""><!--[--><span data-v-15a59758="" class="hide" style="opacity: 1;">Y</span><span data-v-15a59758="" style="opacity: 1;">a</span><span data-v-15a59758="" style="opacity: 1;">r</span><span data-v-15a59758="" style="opacity: 1;">d</span><!--]--><span data-v-15a59758="" style="opacity: 1;">&nbsp;</span></span>
```

**Base styles (from design tokens):**

```css
.heading__word-wrapper {
  background: #eeeeee;
  padding: 5px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#454742` for all dividers within components
- Use `#abff02` for all interactive/active states

## Interactions & States (INTERACTIONS.md)

# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Button | 3 | default, hover, focus |
| Role Button | 1 | default, hover, focus |
| Link | 3 | default, hover, focus |
| Input | 3 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: all;
transition: background-color 0.15s, transform 0.15s;
transition: color 0.3s cubic-bezier(0, 0, 0.58, 1);
```

Apply these to all interactive elements. Never invent new durations or easings.

## Button Interactions

### Button 1 — `System`

**States:**

- Default: `../screens/states/button-1-default.png`
- Hover: `../screens/states/button-1-hover.png`
- Focus: `../screens/states/button-1-focus.png`

**On hover:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(171, 255, 2);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(171, 255, 2);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**On focus:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(171, 255, 2);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(171, 255, 2);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**Transition:** `all`

### Button 2 — `Markets`

**States:**

- Default: `../screens/states/button-2-default.png`
- Hover: `../screens/states/button-2-hover.png`
- Focus: `../screens/states/button-2-focus.png`

**On hover:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(171, 255, 2);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(171, 255, 2);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**On focus:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(171, 255, 2);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(171, 255, 2);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**Transition:** `all`

### Button 3 — `Insights`

**States:**

- Default: `../screens/states/button-3-default.png`
- Hover: `../screens/states/button-3-hover.png`
- Focus: `../screens/states/button-3-focus.png`

**On hover:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(171, 255, 2);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(171, 255, 2);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**On focus:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(171, 255, 2);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(171, 255, 2);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**Transition:** `all`

## Role Button Interactions

### Role Button 1 — `Toggle inspiration questions`

**States:**

- Default: `../screens/states/role-button-1-default.png`
- Hover: `../screens/states/role-button-1-hover.png`
- Focus: `../screens/states/role-button-1-focus.png`

**Transition:** `background-color 0.15s, transform 0.15s`

_No visible style changes detected for this element._

## Link Interactions

### Link 1 — `Go to homepage`

**States:**

- Default: `../screens/states/link-1-default.png`
- Hover: `../screens/states/link-1-hover.png`
- Focus: `../screens/states/link-1-focus.png`

**On focus:**

```css
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**Transition:** `color 0.3s cubic-bezier(0, 0, 0.58, 1)`

### Link 2 — `About`

**States:**

- Default: `../screens/states/link-2-default.png`
- Hover: `../screens/states/link-2-hover.png`
- Focus: `../screens/states/link-2-focus.png`

**On hover:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(171, 255, 2);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(171, 255, 2);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**On focus:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(171, 255, 2);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(171, 255, 2);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) solid 1px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**Transition:** `color 0.3s cubic-bezier(0, 0, 0.58, 1)`

### Link 3 — `Read More`

**States:**

- Default: `../screens/states/link-3-default.png`
- Hover: `../screens/states/link-3-hover.png`
- Focus: `../screens/states/link-3-focus.png`

**On focus:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(171, 255, 2);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(171, 255, 2);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(171, 255, 2) solid 1px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(171, 255, 2);
```

**Transition:** `color 0.3s cubic-bezier(0, 0, 0.58, 1)`

## Input Interactions

### Input 1 — `Ask Terminal`

**States:**

- Default: `../screens/states/input-1-default.png`
- Hover: `../screens/states/input-1-hover.png`
- Focus: `../screens/states/input-1-focus.png`

**Transition:** `all`

_No visible style changes detected for this element._

### Input 2 — `John Doe`

**States:**

- Default: `../screens/states/input-2-default.png`
- Hover: `../screens/states/input-2-hover.png`
- Focus: `../screens/states/input-2-focus.png`

**Transition:** `all`

_No visible style changes detected for this element._

### Input 3 — `Project manager`

**States:**

- Default: `../screens/states/input-3-default.png`
- Hover: `../screens/states/input-3-hover.png`
- Focus: `../screens/states/input-3-focus.png`

**Transition:** `all`

_No visible style changes detected for this element._

## Interaction Rules

- Accent color `#abff02` is used for focus rings, active states, and hover highlights
- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Transition durations in use: `0.15s`, `0.3s`
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

## Design Tokens — JSON Files

### tokens/colors.json
```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "core": {
    "background": {
      "value": "#ffffff",
      "role": "background",
      "name": "tw-ring-offset-color"
    },
    "text-primary": {
      "value": "#052424",
      "role": "text-primary"
    },
    "text-muted": {
      "value": "#7f7f7f",
      "role": "text-muted"
    },
    "surface": {
      "value": "#eeeeee",
      "role": "surface"
    },
    "border": {
      "value": "#454742",
      "role": "border"
    },
    "accent": {
      "value": "#abff02",
      "role": "accent"
    }
  },
  "status": {
    "danger": {
      "value": "#dc2626",
      "role": "danger"
    },
    "success": {
      "value": "#22c55e",
      "role": "success"
    }
  },
  "extended": {
    "tw-prose-quote-borders": {
      "value": "#e5e5e5",
      "role": "unknown",
      "name": "tw-prose-quote-borders"
    },
    "color-c2c2c2": {
      "value": "#c2c2c2",
      "role": "unknown"
    },
    "color-000000": {
      "value": "#000000",
      "role": "unknown"
    },
    "color-1d1d1d": {
      "value": "#1d1d1d",
      "role": "unknown"
    },
    "color-9ca3af": {
      "value": "#9ca3af",
      "role": "unknown"
    },
    "tw-prose-invert-quote-borders": {
      "value": "#374151",
      "role": "unknown",
      "name": "tw-prose-invert-quote-borders"
    },
    "color-586a6a": {
      "value": "#586a6a",
      "role": "unknown"
    },
    "color-f87171": {
      "value": "#f87171",
      "role": "unknown"
    },
    "color-333333": {
      "value": "#333333",
      "role": "unknown"
    },
    "color-6b7280": {
      "value": "#6b7280",
      "role": "unknown"
    },
    "tw-prose-th-borders": {
      "value": "#d1d5db",
      "role": "unknown",
      "name": "tw-prose-th-borders"
    },
    "tw-prose-invert-th-borders": {
      "value": "#4b5563",
      "role": "unknown",
      "name": "tw-prose-invert-th-borders"
    }
  },
  "meta": {
    "theme": "light",
    "extracted": "2026-04-18"
  }
}
```

### tokens/spacing.json
```json
{
  "base": {
    "value": "5px",
    "description": "Grid unit — all spacing must be multiples of this"
  },
  "unit": "px",
  "scale": {
    "xs": {
      "value": "5px",
      "px": 5
    },
    "sm": {
      "value": "10px",
      "px": 10
    },
    "md": {
      "value": "15px",
      "px": 15
    },
    "lg": {
      "value": "20px",
      "px": 20
    },
    "xl": {
      "value": "25px",
      "px": 25
    },
    "2xl": {
      "value": "30px",
      "px": 30
    },
    "3xl": {
      "value": "35px",
      "px": 35
    },
    "4xl": {
      "value": "40px",
      "px": 40
    },
    "5xl": {
      "value": "50px",
      "px": 50
    },
    "6xl": {
      "value": "60px",
      "px": 60
    }
  },
  "multipliers": {
    "1x": {
      "value": "5px",
      "raw": 5
    },
    "2x": {
      "value": "10px",
      "raw": 10
    },
    "3x": {
      "value": "15px",
      "raw": 15
    },
    "4x": {
      "value": "20px",
      "raw": 20
    },
    "5x": {
      "value": "25px",
      "raw": 25
    },
    "6x": {
      "value": "30px",
      "raw": 30
    },
    "7x": {
      "value": "35px",
      "raw": 35
    },
    "8x": {
      "value": "40px",
      "raw": 40
    },
    "9x": {
      "value": "45px",
      "raw": 45
    },
    "10x": {
      "value": "50px",
      "raw": 50
    },
    "11x": {
      "value": "55px",
      "raw": 55
    },
    "12x": {
      "value": "60px",
      "raw": 60
    },
    "13x": {
      "value": "65px",
      "raw": 65
    },
    "14x": {
      "value": "70px",
      "raw": 70
    },
    "15x": {
      "value": "75px",
      "raw": 75
    },
    "16x": {
      "value": "80px",
      "raw": 80
    }
  },
  "meta": {
    "totalValues": 15,
    "min": 5,
    "max": 90
  }
}
```

### tokens/typography.json
```json
{
  "families": [
    "SuisseIntl",
    "SFMono-Regular"
  ],
  "scale": {
    "heading-1": {
      "fontFamily": "SuisseIntl",
      "fontSize": "11.3125rem",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "heading-2": {
      "fontFamily": "SuisseIntl",
      "fontSize": "11.25rem",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "heading-3": {
      "fontFamily": "SuisseIntl",
      "fontSize": "min(5.729vw,146.6666666667px)",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "body": {
      "fontFamily": "SFMono-Regular",
      "fontSize": ".875rem",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    },
    "caption": {
      "fontFamily": "SFMono-Regular",
      "fontSize": "1rem",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    },
    "code": {
      "fontFamily": "SFMono-Regular",
      "fontSize": "14px",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    }
  },
  "fontFaces": [
    {
      "family": "SuisseIntl",
      "src": "https://terminal-industries.com/static/fonts/SuisseIntl-Regular.woff2",
      "format": "woff2",
      "weight": "400"
    },
    {
      "family": "SuisseIntl",
      "src": "https://terminal-industries.com/static/fonts/SuisseIntl-Book.woff2",
      "format": "woff2",
      "weight": "450"
    },
    {
      "family": "SuisseIntl",
      "src": "https://terminal-industries.com/static/fonts/SuisseIntl-Semibold.woff2",
      "format": "woff2",
      "weight": "600"
    },
    {
      "family": "SuisseIntl",
      "src": "https://terminal-industries.com/static/fonts/SuisseIntl-Medium.woff2",
      "format": "woff2",
      "weight": "500"
    },
    {
      "family": "Geist Mono",
      "src": "https://terminal-industries.com/static/fonts/GeistMono-Regular.woff2",
      "format": "woff2",
      "weight": "400"
    },
    {
      "family": "Geist Mono",
      "src": "https://terminal-industries.com/static/fonts/GeistMono-SemiBold.woff2",
      "format": "woff2",
      "weight": "600"
    },
    {
      "family": "Geist Mono",
      "src": "https://terminal-industries.com/static/fonts/GeistMono-Bold.woff2",
      "format": "woff2",
      "weight": "700"
    }
  ],
  "rules": {
    "maxSizesPerScreen": 4,
    "headingWeightRange": "600-700",
    "bodyWeight": 400,
    "lineHeightBody": 1.5,
    "lineHeightHeading": 1.2
  }
}
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/GeistMono-Black.ttf`
- `fonts/GeistMono-Bold.ttf`
- `fonts/GeistMono-ExtraBold.ttf`
- `fonts/GeistMono-ExtraLight.ttf`
- `fonts/GeistMono-Light.ttf`
- `fonts/GeistMono-Medium.ttf`
- `fonts/GeistMono-Regular.ttf`
- `fonts/GeistMono-SemiBold.ttf`
- `fonts/GeistMono-Thin.ttf`
- `fonts/SuisseIntl-450.woff2`
- `fonts/SuisseIntl-500.woff2`
- `fonts/SuisseIntl-600.woff2`
- `fonts/SuisseIntl-Regular.woff2`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

## Screenshots Inventory (screens/)

> Study all screenshots carefully before implementing any UI. Match every visual detail exactly.

### Scroll Journey (screens/scroll/)

*Cinematic scroll states — page visual at each scroll depth*

![scroll-000.png](screens/scroll/scroll-000.png)

![scroll-017.png](screens/scroll/scroll-017.png)

![scroll-033.png](screens/scroll/scroll-033.png)

![scroll-050.png](screens/scroll/scroll-050.png)

![scroll-067.png](screens/scroll/scroll-067.png)

![scroll-083.png](screens/scroll/scroll-083.png)

![scroll-100.png](screens/scroll/scroll-100.png)

### Full Page Screenshots (screens/pages/)

*Full-page screenshots of each crawled URL*

![about.png](screens/pages/about.png)

![home.png](screens/pages/home.png)

![smart-yard-tm-yms.png](screens/pages/smart-yard-tm-yms.png)

![what-is-terminal-yos.png](screens/pages/what-is-terminal-yos.png)

![why-terminal.png](screens/pages/why-terminal.png)

### Section Clips (screens/sections/)

*Clipped individual sections and components*

![about-section-1.png](screens/sections/about-section-1.png)

![about-section-2.png](screens/sections/about-section-2.png)

![home-section-1.png](screens/sections/home-section-1.png)

![smart-yard-tm-yms-section-1.png](screens/sections/smart-yard-tm-yms-section-1.png)

![smart-yard-tm-yms-section-2.png](screens/sections/smart-yard-tm-yms-section-2.png)

![what-is-terminal-yos-section-1.png](screens/sections/what-is-terminal-yos-section-1.png)

![what-is-terminal-yos-section-2.png](screens/sections/what-is-terminal-yos-section-2.png)

![why-terminal-section-1.png](screens/sections/why-terminal-section-1.png)

![why-terminal-section-2.png](screens/sections/why-terminal-section-2.png)

### Interaction States (screens/states/)

*Hover, focus, and active state captures*

![button-1-default.png](screens/states/button-1-default.png)

![button-1-focus.png](screens/states/button-1-focus.png)

![button-1-hover.png](screens/states/button-1-hover.png)

![button-2-default.png](screens/states/button-2-default.png)

![button-2-focus.png](screens/states/button-2-focus.png)

![button-2-hover.png](screens/states/button-2-hover.png)

![button-3-default.png](screens/states/button-3-default.png)

![button-3-focus.png](screens/states/button-3-focus.png)

![button-3-hover.png](screens/states/button-3-hover.png)

![input-1-default.png](screens/states/input-1-default.png)

![input-1-focus.png](screens/states/input-1-focus.png)

![input-1-hover.png](screens/states/input-1-hover.png)

![input-2-default.png](screens/states/input-2-default.png)

![input-2-focus.png](screens/states/input-2-focus.png)

![input-2-hover.png](screens/states/input-2-hover.png)

![input-3-default.png](screens/states/input-3-default.png)

![input-3-focus.png](screens/states/input-3-focus.png)

![input-3-hover.png](screens/states/input-3-hover.png)

![link-1-default.png](screens/states/link-1-default.png)

![link-1-focus.png](screens/states/link-1-focus.png)

![link-1-hover.png](screens/states/link-1-hover.png)

![link-2-default.png](screens/states/link-2-default.png)

![link-2-focus.png](screens/states/link-2-focus.png)

![link-2-hover.png](screens/states/link-2-hover.png)

![link-3-default.png](screens/states/link-3-default.png)

![link-3-focus.png](screens/states/link-3-focus.png)

![link-3-hover.png](screens/states/link-3-hover.png)

![role-button-1-default.png](screens/states/role-button-1-default.png)

![role-button-1-focus.png](screens/states/role-button-1-focus.png)

![role-button-1-hover.png](screens/states/role-button-1-hover.png)

### Screenshot Index (screens/INDEX.md)

# Screenshot Index

## Scroll Journey

> Shows the cinematic state at each point of the page

| Scroll | Y Position | File |
|--------|-----------|------|
| 0% | 0px | `screens/scroll/scroll-000.png` |
| 17% | 2929px | `screens/scroll/scroll-017.png` |
| 33% | 5685px | `screens/scroll/scroll-033.png` |
| 50% | 8614px | `screens/scroll/scroll-050.png` |
| 67% | 11542px | `screens/scroll/scroll-067.png` |
| 83% | 14298px | `screens/scroll/scroll-083.png` |
| 100% | 17227px | `screens/scroll/scroll-100.png` |

## Pages

| Page | URL | File |
|------|-----|------|
| Terminal Yard Operating System | The New Industry Standard in Yard Operations | `https://terminal-industries.com` | `screens/pages/home.png` |
| A Different Kind of Logistics Technology Company | The Yard Reinvented | `https://terminal-industries.com/about` | `screens/pages/about.png` |
| Why Terminal | AI‑Powered Yard Management & Logistics Solutions | `https://terminal-industries.com/why-terminal` | `screens/pages/why-terminal.png` |
| Terminal YOS | Yard Operating System for AI‑Driven Logistics Automation | `https://terminal-industries.com/what-is-terminal-yos` | `screens/pages/what-is-terminal-yos.png` |
| Terminal Smart Yard™ YMS | Real-Time Yard Visibility & Autonomous Operations | `https://terminal-industries.com/smart-yard-tm-yms` | `screens/pages/smart-yard-tm-yms.png` |

## Sections

| Page | Section | File |
|------|---------|------|
| home | #1 (section) | `screens/sections/home-section-1.png` |
| about | #1 (section) | `screens/sections/about-section-1.png` |
| about | #2 (section) | `screens/sections/about-section-2.png` |
| why-terminal | #1 (section) | `screens/sections/why-terminal-section-1.png` |
| why-terminal | #2 (section) | `screens/sections/why-terminal-section-2.png` |
| what-is-terminal-yos | #1 (section) | `screens/sections/what-is-terminal-yos-section-1.png` |
| what-is-terminal-yos | #2 (section) | `screens/sections/what-is-terminal-yos-section-2.png` |
| smart-yard-tm-yms | #1 (section) | `screens/sections/smart-yard-tm-yms-section-1.png` |
| smart-yard-tm-yms | #2 (section) | `screens/sections/smart-yard-tm-yms-section-2.png` |

## Homepage Screenshots (screenshots/)

![homepage.png](screenshots/homepage.png)

