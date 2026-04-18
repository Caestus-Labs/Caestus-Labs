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

