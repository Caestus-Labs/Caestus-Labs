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

