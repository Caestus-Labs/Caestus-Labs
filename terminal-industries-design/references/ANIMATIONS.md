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

