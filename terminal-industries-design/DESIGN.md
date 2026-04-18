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
  src: url("https://terminal-industries.com/static/fonts/SuisseIntl-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Geist Mono";
  src: url("https://terminal-industries.com/static/fonts/GeistMono-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Geist Mono";
  src: url("https://terminal-industries.com/static/fonts/GeistMono-Bold.woff2") format("woff2");
  font-weight: 700;
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
