# Caestus Labs

Static investor-facing site for Caestus Labs — haptic VR hardware.

## Pages

| Route        | Purpose                                    |
| ------------ | ------------------------------------------ |
| `/`          | Landing — 3D headset hero + 4-stage story  |
| `/product/`  | Hardware spec grid + anatomy SVG           |
| `/problem/`  | Problem cards + latency comparison chart   |
| `/team/`     | Founders + advisors                        |
| `/vision/`   | Manifesto + roadmap timeline               |
| `/contact/`  | Early-access form (writes to Supabase)     |

Tech: vanilla HTML / CSS / JS. Three.js loaded via CDN for the landing 3D scene. No build step.

Shared design system in `css/main.css` (tokens) + `css/page.css` (layout primitives) + `js/page.js` (scroll reveals, counter tween, SVG path draw).

## Local development

Just open `index.html` in a browser, or run a static server from the repo root:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then visit http://localhost:8000.

## Supabase setup (contact form database)

The contact form on `/` and `/contact/` writes submissions to a Supabase `contacts` table.

### 1. Create a Supabase project

Sign in at https://supabase.com → **New project** → wait ~2 min for provisioning.

### 2. Run the schema migration

In the Supabase dashboard: **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](./supabase/schema.sql), and click **Run**.

This creates the `contacts` table with the columns the form expects, plus indexes and Row Level Security policies that allow anonymous inserts but block anonymous reads.

### 3. Wire the keys into the site

In **Project Settings → API**, copy:

- **Project URL** (e.g. `https://abcd1234.supabase.co`)
- **anon / public** key

Then create `js/config.js` from the example:

```bash
cp js/config.example.js js/config.js
```

Edit `js/config.js` and replace the placeholders with your real values:

```js
window.SUPABASE_URL = 'https://abcd1234.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJ...';
```

`js/config.js` is gitignored so keys never enter version control. The anon key is safe to expose to browsers — security is enforced by the RLS policy in `schema.sql`.

### 4. Verify

Open `/contact/` in a browser, submit the form, then check the **Table Editor → contacts** in Supabase. You should see the row.

## Project layout

```
.
├── index.html              # landing
├── product/index.html
├── problem/index.html
├── team/index.html
├── vision/index.html
├── contact/index.html
├── css/
│   ├── main.css            # design tokens (colors, fonts)
│   ├── page.css            # shared page shell + animation primitives
│   └── {product,problem,team,vision,contact}.css
├── js/
│   ├── page.js             # IntersectionObserver reveals, counter tween
│   ├── vr-experience.js    # Three.js scene for landing
│   ├── contact-form.js     # form validation + Supabase insert
│   ├── config.example.js   # template (commit)
│   └── config.js           # your real keys (gitignored)
├── assets/                 # 3D models, images
├── vr-experience/          # standalone VR demo subsite
└── supabase/
    └── schema.sql          # one-shot migration
```

## Deployment

Deployed via GitHub Pages. Custom domain in `CNAME`.
