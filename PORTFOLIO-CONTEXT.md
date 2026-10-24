# Portfolio Context Pack — lekside.vercel.app

**Purpose of this document:** ChatGPT (and other AI tools) cannot browse this site, because it is a
client-rendered React SPA — the HTML it would fetch is an empty `<div id="root">`. This file contains
everything a reviewer would see if they *could* open the site: every route, all the visible copy, the
design tokens, the full project list, and measured technical facts.

**How to use it:** paste this whole file into ChatGPT with a prompt like:

> This is a full snapshot of my portfolio site at https://lekside.vercel.app. You cannot load the site
> — the snapshot below is the source of truth. Review it as a senior frontend engineer and a hiring
> manager would. Tell me what is weak, what is missing, and what to fix first.

Snapshot date: **22 October 2026**. Source: `D:\Projects\my-portfolio` (working tree, after the
stats/timeline fix described in section 6).

---

## 1. Identity and intent

| | |
|---|---|
| Live URL | https://lekside.vercel.app |
| Owner | Olamilekan Olakunle, Nigeria |
| Positioning | Frontend developer (React / TypeScript / Next.js) **and** WordPress developer |
| Secondary | React Native / Expo mobile, Node.js + PostgreSQL/Prisma backend |
| Goal of the site | Win freelance clients **and** land full-time roles (both are stated on the contact page) |
| Audience | Nigerian SMEs/NGOs wanting websites + recruiters/tech leads hiring frontend engineers |
| Contact | horllyk12@gmail.com · WhatsApp 0706 873 6818 (wa.me/2347068736818) |
| Social | github.com/iamlekside2 · x.com/leksitech1 · linkedin.com/in/olamilekan-olakunle-07053a164 · youtube.com/@ostechs |

Design inspiration: the "Tunis" template style — a huge faded "ghost word" behind each page heading,
two-tone headings, right-edge dot navigation.

---

## 2. Tech stack and hosting

- **Build:** Vite 5 + React 18 + TypeScript 5, `tsc && vite build`
- **Styling:** Tailwind CSS 3 + a hand-written `globals.css` with CSS custom properties for theming
- **Routing:** `react-router-dom` 6, `BrowserRouter`, 4 routes, **no SSR / no pre-rendering**
- **Animation:** `framer-motion` 9 (page transitions, staggered entrances, scroll parallax),
  `react-parallax-tilt` (portrait tilt)
- **3D:** `three` 0.182 + `@react-three/fiber` + `@react-three/drei` — a rotating Earth globe on the
  contact page only, lazy-loaded via `React.lazy`
- **Forms:** `@emailjs/browser` (client-side email send), `react-hot-toast` for feedback
- **Icons:** `react-icons`
- **Host:** Vercel. `vercel.json` is a single catch-all rewrite: `/(.*)` → `/index.html`
- **No** analytics, **no** test suite, **no** CI beyond a `.github` folder, **no** `.env` committed

### Routes

| Path | Component | Page heading (ghost word → H1) |
|---|---|---|
| `/` | `pages/Home.tsx` | *(no ghost)* — H1 is the intro headline |
| `/about` | `pages/AboutPage.tsx` | "Resume" → **About Me** |
| `/portfolio` | `pages/PortfolioPage.tsx` | "Works" → **My Portfolio** |
| `/contact` | `pages/ContactPage.tsx` | "Contact" → **Get In Touch** |
| `*` | falls back to `Home` (renders home at the wrong URL, does not redirect) |

Persistent chrome on every page: theme toggle (fixed top-left), side-dot nav (fixed right on desktop,
bottom bar on mobile), floating WhatsApp/message widget (fixed bottom-right), a one-line footer
(`© 2026 Olamilekan Olakunle. All rights reserved.`).

---

## 3. Every piece of visible copy

### `<head>` (identical on all four routes — static, never updated per route)

```
<title>Olamilekan Olakunle — Frontend & WordPress Developer</title>
<meta name="description" content="Portfolio of Olamilekan Olakunle — frontend developer (React,
TypeScript, Next.js) and WordPress developer. Web apps, dashboards and websites for businesses
across Nigeria and beyond.">
<meta property="og:title" content="Olamilekan Olakunle — Frontend & WordPress Developer">
<meta property="og:description" content="React, TypeScript, Next.js & WordPress. Explore my web
apps, dashboards and client websites.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://lekside.vercel.app/">
<meta property="og:image" content="https://lekside.vercel.app/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

There is **no** `canonical`, no `theme-color`, no `twitter:title`/`twitter:description`, no JSON-LD
structured data, no `author`, no `keywords`.

### Home (`/`)

Left: portrait card (`/portrait.jpg`, 4:5, 3D tilt on hover, gold offset block behind it; falls back
to the initials "OO" if the image 404s).

Right:

> **I'm Olamilekan Olakunle.**
> *[typewriter cycling]* Frontend Developer → WordPress Developer → Mobile App Developer
>
> I create modern, scalable user interfaces and reliable web applications with great performance. I
> build efficient, scalable and user-friendly web apps, dashboards and WordPress sites — known for
> very fast delivery, and I collaborate closely with clients to bring their ideas to life.

Buttons: **More about me →** (links to `/about`) + four social icon buttons.

### About (`/about`)

Ghost word "Resume", H1 **About Me**.

**Personal Infos** (photo `/about.jpg` + two-column label/value grid):

| Label | Value |
|---|---|
| First Name | Olamilekan |
| Last Name | Olakunle |
| Nationality | Nigerian |
| Freelance | **Available** *(gold accent)* |
| Location | Nigeria |
| Languages | English |
| Email | horllyk12@gmail.com |
| GitHub | iamlekside2 |
| Turnaround | **Very fast delivery** *(gold accent)* |
| WhatsApp | 0706 873 6818 |

Bio paragraph:

> I'm Olamilekan Olakunle, a passionate software developer with strong expertise in TypeScript,
> JavaScript, React, Next.js, React Native and WordPress, backed by Node.js and database skills. I
> build efficient, scalable, and user-friendly solutions that solve real-world problems — and I'm
> known for very fast turnaround: I deliver tasks quickly without cutting corners. I learn fast,
> adapt quickly, and collaborate closely with clients to bring their ideas to life.

**Stats** (animated count-up): `5+` Years of Experience · `8+` Web Apps & Dashboards ·
`20+` WordPress Sites · `28+` Completed Projects

These four numbers are **derived at runtime** from the project list and the experience timeline
(`src/constants/profile.ts`) using the same category-matching rule as the portfolio filter, so they
cannot drift out of step with the work on display. Years of experience is
`currentYear - earliestRoleStartYear`.

**My Skills** (animated percentage bars):

HTML & CSS 95% · JavaScript 90% · TypeScript 85% · React 92% · Next.js 85% ·
React Native / Expo 82% · Redux Toolkit 85% · Tailwind CSS 92% · WordPress 90% ·
Node.js 80% · PostgreSQL / Prisma 75% · MySQL 75% · REST APIs 88%

**Experience** (vertical timeline, newest first; **every bullet of every role is rendered** as a
gold-dotted list):

| Date | Role — Company | Bullets rendered |
|---|---|---|
| 2021 - Present | Frontend Developer & Freelance Projects — Personal Websites & Portfolios | 4 |
| 2025 | Frontend & React Developer — COMCIN Project | 4 |
| 2024-2025 | Patient Tracker Developer — Nexalife Care | 3 |
| 2023-2025 | Frontend & React Developer — Calmglobal Patient Dashboard | 3 |
| 2024 | Admin Dashboard Developer — UrCalls Admin | 3 |
| 2024 | Church Dashboard Developer — Church Management Dashboard | 3 |
| 2022 - 2023 | Frontend & React Developer — AfricanProverbs | 3 |
| 2021 | WordPress Designer & Developer — Wildfire | 3 |

Each entry carries machine-readable `start` / `end` years alongside the display string; the list is
sorted ongoing-roles-first, then by end year, then by start year, so the order holds automatically as
roles are added. Full bullet text for every role is in `src/constants/index.ts`.

### Portfolio (`/portfolio`)

Ghost word "Works", H1 **My Portfolio**.

Filter pills: **All · Web Apps & Dashboards · WordPress Sites · Mobile**
Caption: "*N* projects — swipe or use the arrows"

Layout: a **horizontal snap slider** (not a grid). Auto-advances every 3.5 s; pauses on hover/touch,
when the modal is open, and under `prefers-reduced-motion`. Desktop gets prev/next chevrons. Tiles are
4:3 live-site screenshots (280px wide mobile / 340px desktop) with a dark name bar and a "View
details" hover overlay. Clicking a tile opens a modal with the screenshot, name, category,
description, `#tag` chips, and a **Visit site →** link.

**All 28 projects:**

*Web Apps & Dashboards (7)*

| Project | Link | Description shown in modal |
|---|---|---|
| COMCIN Project | comcin.com.ng | Web application for managing COMCIN workflows, including user dashboards, multi-step forms, and API integrations to streamline operations. `#react #redux #tailwind` |
| UrCalls Admin Dashboard | urcalls.com | Admin dashboard for UrCalls to manage users, subscriptions, payments, and role-based permissions, built with React and integrated with multiple payment APIs. `#react #redux` |
| Nexalife Care (Patient Tracker) | nexalifecare.com | Patient referral and tracking system with real-time dashboards, multi-step forms, and API integration. `#react #tailwind #api` |
| NHRR | hrrp.calmglobal.com | National Health Research Repository — open-access repository for Nigerian health research (articles, datasets, trials, preprints, policy briefs), with deposit, search and discovery, review workflow stages and role-scoped access. An initiative of the Federal Ministry of Health & Social Welfare. `#react #typescript #api` |
| KPI Platform | kpi.calmglobal.com/login | KPI tracking and reporting platform with dashboards, targets, and performance analytics across teams. `#react #typescript #dashboards` |
| Church Dashboard | *(no link)* | Event scheduling, member tracking, and notifications. `#react #typescript #firebase` |
| AfricanProverbs | africanproverbs.com | African proverbs platform with search, filtering, and dynamic UI. `#react #nextjs #tailwind` |

*WordPress Sites (20)*

AeroCruise Travels (aerocruisetravelsng.com) · RostrumSec (rostrumsec.com) · Tyndale Securities
(tyndale-securities.com) · TomilTrust Limited (tomiltrustlimited.com) · Oladele Oyelola Foundation
(oladeleoyelolafoundation.org) · Raya Elite Cleaning (rayaelitehomesandofficescleaningservices.com) ·
CalmGlobal Technologies (calmglobal.com) · GMBJet (gmbjet.com) · ReinstateBoost (reinstateboost.com) ·
Press Featured (pressfeatured.com) · Eniwo Egbeme (eniwoegbeme.com) · RCCG Jubilee House
(rccgjubileehouse.com) · DUMAAC Projects (dumaacprojects.com) · Xmage Photography
(xmagephotography.com) · St John's Catholic Hospital Kabba (stjohnscatholichospitalkabba.com.ng) ·
Kanary Ancillaries (kanaryancillaries.com) · Great Ife Alumni Canada (greatifealumni.ca) · Okun
Development Association (okundev.org) · Ayetoro Gbede Global Network (ayetorogbedeglobalnetwork.org) ·
Beyond Healthcare Fertility (beyondhealthcarefertility.com)

All 20 carry the **same two tags** (`#wordpress #elementor`) and a one-line description of the form
"Corporate website with service pages and enquiry flows."

*Mobile (1)*

| RealCousins | realcousins.com | Family-tree platform connecting relatives — web app plus React Native / Expo mobile app with shared backend (Node.js, Prisma, PostgreSQL). `#react-native #expo #api` |

### Contact (`/contact`)

Ghost word "Contact", H1 **Get In Touch**.

> Open to new projects, collaborations and full-time roles. Don't be shy — drop a message and I'll
> get back to you fast.

Three info chips: **WhatsApp** 0706 873 6818 · **Email** horllyk12@gmail.com · **GitHub**
github.com/iamlekside2. Then the four social buttons.

Then a two-column block: on the left a form — H2 "Send a **message**", three required fields
(`What's your name?` / `What's your email?` / `What do you want to say?`, 7 rows) and a
**Send Message →** button that shows "Sending…" while in flight. On the right (order-first on mobile)
the rotating 3D Earth globe, 340px tall on mobile → 540px on desktop.

Success toast: "Thank you! I will get back to you soon." Failure toast: "Something went wrong. Please
try again."

### Floating message widget (every page)

A fixed bottom-right gold bubble that expands into the same three-field EmailJS form, plus a direct
WhatsApp link. Success toast: "Message sent! I'll get back to you soon."

---

## 4. Design system

Fonts, loaded from Google Fonts via `@import` **inside the CSS file** (render-blocking, not preconnected):
**Space Grotesk** (300–700, the global body font), **Poppins** (600–800), **JetBrains Mono** (400–700).

### Dark theme (default — `<html class="dark">`)

| Token | Value |
|---|---|
| `--color-primary` (page bg) | `#111111` |
| `--color-tertiary` (cards) | `#1d1d1d` |
| `--color-accent` | `#ffb400` (gold) |
| `--text-primary` | `#ffffff` |
| `--text-secondary` | `#a8a8a8` |
| `--glass-border` | `rgba(255,180,0,0.14)` |

### Light theme (`.light`)

| Token | Value |
|---|---|
| `--color-primary` | `#f7f7f7` |
| `--color-tertiary` | `#ececec` |
| `--color-accent` | `#e5a200` |
| `--text-primary` | `#0a0e1a` |
| `--text-secondary` | `#4a5568` |

Effects: glassmorphism cards (`backdrop-filter: blur(16–20px)`), `translateY(-8px)` hover lift, a
`.ghost-title` oversized faded word behind each heading that drifts down and fades on scroll, pill
buttons (`.tunis-btn`) with a circular arrow that slides on hover, animated `.skill-track` bars.

Type scale: H1 34px mobile / 52px desktop; section H2 18px uppercase; body 14–16px with `line-height:
1.9`; micro-labels 11–12px uppercase with wide tracking.

---

## 5. Measured technical facts

Measured against the live deployment on 22 Oct 2026.

| Metric | Value |
|---|---|
| Initial HTML | Empty `<div id="root">` — **zero content without JavaScript** |
| Main JS bundle | 343 KB raw / **113 KB gzipped** |
| Main CSS | 7.5 KB gzipped |
| Lazy chunk `Earth-*.js` (three.js) | **950 KB raw** — loads only on `/contact` |
| 3D globe model | `/public/planet/` = **2.9 MB** (`scene.bin` + 2 PNG textures) |
| Project screenshots | 27 PNGs totalling **9.8 MB** — PNG, not WebP/AVIF; largest single file 781 KB (`greatife.png`), several over 600 KB |
| Total `dist/` | **15 MB** |
| `/robots.txt` | Does **not** exist — the catch-all rewrite serves `index.html` with `200 OK` and `Content-Type: text/html` |
| `/sitemap.xml` | Same — returns the HTML page with `200 OK` |
| 404 handling | No real 404; unknown paths render the Home page at the wrong URL with a `200` |
| Per-route meta | None — all four routes share one static `<title>`/description |
| Analytics | None installed |
| Tests | None |
| Image `loading="lazy"` | Present on project tiles; **absent** on the home portrait and about photo |

### Dead code still in the repo

`src/components/sections/` (About, Contact, Experience, Feedbacks, Hero, Tech, Works),
`src/components/layout/Navbar.tsx`, `src/hoc/SectionWrapper.tsx`, and the `services`,
`technologies`, `navLinks`, `testimonials` exports in `src/constants/index.ts` are **not rendered
anywhere**. They are leftovers from the previous single-page design.

Consequence worth noting: **three testimonials exist in the data but appear nowhere on the live
site** — and they use `randomuser.me` stock-photo avatars with generic attributions ("Mr Ben, C.E.O,
ABC Consult"), so they would read as fake if they were restored as-is.

---

## 6. Things already known to be inconsistent

Give these to ChatGPT so it doesn't spend its review rediscovering them.

**Already fixed on 22 Oct 2026 — do not re-report these:**

- ~~The stats undersold the work (`7+ WordPress Sites`, `15+ Completed Projects` against 20 and 28
  actually on display).~~ The four stats are now computed from the project list itself, so they read
  `5+ / 8+ / 20+ / 28+` and match the portfolio filter counts exactly.
- ~~The experience timeline was out of chronological order and rendered only the first bullet of each
  role.~~ It is now sorted newest-first from explicit `start` / `end` years, and every bullet of every
  role renders — 26 achievement lines in total, up from 8.

**Still open:**

1. **The 20 WordPress entries are interchangeable** — identical tag pair, near-identical one-line
   descriptions, no outcome, no client problem, no result.
2. **No case study anywhere.** Every project is one sentence plus an outbound link. Nothing explains a
   problem, a decision, or a result.
3. **Light theme has a stray blue** (`--gradient-end: #1a47b8`) inside an otherwise gold palette.
4. **EmailJS keys come from `VITE_EMAILJS_*` env vars** and there is no `.env` in the repo — if those
   are not set in Vercel, both the contact form and the floating widget fail silently on the error
   toast. *(Unverified — worth testing a live submission.)*
5. **No CV/résumé download** anywhere, despite an About page titled with the ghost word "Resume".
6. **Email `horllyk12@gmail.com` reads as informal** next to a professional positioning.

---

## 7. Suggested prompt to follow the paste

> Given the snapshot above, answer in this order:
>
> 1. **First impression.** From the home-page copy alone, what do you think I do, and how good do I
>    look compared with other frontend portfolios? Be blunt.
> 2. **The two-audience problem.** The site targets both freelance clients and full-time employers.
>    Is it serving either well? Should it pick one?
> 3. **Credibility.** 28 projects with one-line descriptions and no case studies — does volume help
>    or hurt me here? What would you cut?
> 4. **The skill-percentage bars.** Do hiring managers read "TypeScript 85%" as credible or as a red
>    flag? What should replace them?
> 5. **SEO.** It's a client-rendered SPA with no prerendering, no per-route meta, no sitemap and no
>    robots.txt. Rank the fixes by effort-to-impact — including whether migrating to Next.js is
>    actually worth it for a personal portfolio.
> 6. **Performance.** 9.8 MB of PNG screenshots and a 950 KB three.js chunk for one decorative globe.
>    What goes, what stays?
> 7. **Copy rewrite.** Rewrite the home headline, the bio paragraph, and three sample WordPress
>    project descriptions as you think they should read.
> 8. **Priority list.** Give me the top 10 changes ranked by impact, each tagged with rough effort
>    (30 min / half day / multi-day).
