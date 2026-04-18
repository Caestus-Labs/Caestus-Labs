# Caestus Labs Website

A cinematic, scroll-driven vision site for Caestus Labs - makers of an electrostatic clutch-based haptic suit for Meta Quest 3.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion, GSAP + ScrollTrigger
- **3D Graphics**: React Three Fiber (planned)
- **Deployment**: Vercel (planned)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
caestuslabs-com/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Main page assembly
│   └── globals.css          # Design system & Tailwind config
├── components/
│   ├── animations/          # Reusable animation components
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── Vision.tsx
│   │   ├── Problem.tsx
│   │   ├── SystemReveal.tsx
│   │   ├── EarlyAccess.tsx
│   │   └── Footer.tsx
│   └── ui/                  # UI components
│       ├── Nav.tsx
│       ├── SectionLabel.tsx
│       └── ScrollCue.tsx
└── public/
    ├── fonts/               # Custom fonts (PP Neue Montreal, etc.)
    ├── images/              # Product renders & assets
    └── videos/              # Scroll-scrubbed videos
```

## Design System

The site uses a minimalistic, hardware-inspired aesthetic with:

- **Colors**:
  - Background: `#0A0A0C` (primary), `#15151A` (secondary)
  - Text: `#F2EFEA` (primary), `#8A8A90` (secondary)
  - Accent: `#E6FF3C` (minimal use)

- **Typography**:
  - Display: PP Neue Montreal (bold headlines)
  - Body: Söhne / Inter (readable body text)
  - Mono: JetBrains Mono (technical labels, specs)

## Current Status

### Implemented
- Navigation with scroll state
- Hero section with animated headline & parallax
- Vision section with Ken Burns zoom
- Problem section with split layout
- System Reveal section with electrostatic clutch specs
- Early Access email form
- Footer with navigation & socials
- Responsive design (mobile-first)
- Framer Motion animations

### Pending
- [ ] Add custom font files
- [ ] Integrate product images/videos
- [ ] Build Headset Transition section (scroll-scrubbed video)
- [ ] Build Driving Demo section (scroll-locked video)
- [ ] Build Cube Grid section (Three.js)
- [ ] Build How It Works section (sticky scroll)
- [ ] Build Team section
- [ ] Implement form backend (Resend/Formspree)
- [ ] Mobile hamburger menu
- [ ] Performance optimization
- [ ] Accessibility audit

## Key Technical Details

### Electrostatic Clutch Technology
The site showcases ionoelastomer electroadhesive clutch technology (not mechanical servos/motors). All copy and specs reflect this:
- "12 CLUTCH POINTS" (not servo points)
- "Electrostatic clutch-based haptic suit"
- Variable resistance, not vibration

### Tailwind v4 Configuration
This project uses Tailwind CSS v4's new `@theme inline` syntax in `globals.css` instead of a separate config file. Design tokens are defined as CSS variables and referenced via Tailwind's theme system.

### Animation Strategy
- Framer Motion: Text reveals, scroll triggers, component animations
- GSAP (planned): Video scrubbing, complex scroll sequences
- React Three Fiber (planned): Interactive 3D cube grid

## Assets Needed

To complete the vision:
- [ ] PP Neue Montreal fonts (Regular, Bold) in .woff2 format
- [ ] Meta Quest 3 product renders (PNG/WebP with transparency)
- [ ] Full body suit 3D model/render
- [ ] Headset transition video (scroll-scrubbed)
- [ ] Driving demo video (scroll-scrubbed)
- [ ] OG image for social sharing

## Development

The dev server uses Turbopack for fast hot module replacement. Changes to components will reflect immediately in the browser.

**Note**: There may be warnings about multiple lockfiles - these are non-critical and can be resolved by configuring `turbopack.root` in `next.config.js`.

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments on push.

## License

Proprietary - Caestus Labs 2026
