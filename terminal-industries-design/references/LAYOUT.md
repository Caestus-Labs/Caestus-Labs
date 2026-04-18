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

