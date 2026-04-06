# Pets Health Care Landing Page — JavaScript (Vanilla), HTML5, CSS3 Fundamental Project 5 (Framework-free SPA)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20modules-F7DF1E?logo=javascript&logoColor=black)](script.js)
[![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Node.js](https://img.shields.io/badge/Node.js-build%20scripts-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

An **educational, production-style landing site** for a fictional **Pawfect Care Clinic** brand: a single HTML document enhanced with **native ES modules**, **client-side routing**, scroll-driven UI, and split CSS. There is **no React, no Next.js, and no backend**—everything runs in the browser or is served as static files—so it is ideal for learners who want to understand how a “SPA feel” works without a framework.

**Live demo:** [https://pets-healthcare.vercel.app/](https://pets-healthcare.vercel.app/)

![Screenshot 1](https://github.com/user-attachments/assets/4740cd57-5d77-4181-b48f-b40cd11d5996)
![Screenshot 2](https://github.com/user-attachments/assets/fc85e1d6-65c4-4d96-81bc-da0f782f452e)
![Screenshot 3](https://github.com/user-attachments/assets/cba6ffd5-f322-4d89-b41f-fc267747f501)
![Screenshot 4](https://github.com/user-attachments/assets/6c686414-f5a5-4fb5-b630-14d439da17c8)
![Screenshot 5](https://github.com/user-attachments/assets/26e0a900-6db1-4c54-9730-b864315f6e19)
![Screenshot 6](https://github.com/user-attachments/assets/df95197c-e6e2-4d6b-98b6-8aca48ee0d0c)
![Screenshot 7](https://github.com/user-attachments/assets/0cc6b535-f740-4bb9-8721-842e5a74668a)
![Screenshot 8](https://github.com/user-attachments/assets/373cd4fa-4a2e-4e61-ac3f-bfea01005c66)
![Screenshot 9](https://github.com/user-attachments/assets/a84b3c37-1810-4858-b570-eda3d3359cca)
![Screenshot 10](https://github.com/user-attachments/assets/adfd1da1-28ef-4762-845a-518b3524a25d)
![Screenshot 11](https://github.com/user-attachments/assets/af679e8a-a5b0-4071-b839-5d2805831da3)

## Table of contents

- [Project overview](#project-overview)
- [Features and functionality](#features-and-functionality)
- [How it works (architecture)](#how-it-works-architecture)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Environment variables and `.env`](#environment-variables-and-env)
- [Dependencies and tooling](#dependencies-and-tooling)
- [How to run and build](#how-to-run-and-build)
- [Routes (client-side paths)](#routes-client-side-paths)
- [API and backend](#api-and-backend)
- [Module walkthrough (for learners)](#module-walkthrough-for-learners)
- [Reusing parts in other projects](#reusing-parts-in-other-projects)
- [Keywords](#keywords)
- [Further documentation](#further-documentation)
- [Conclusion](#conclusion)
- [License](#license)

---

## Project overview

**Pawfect Care Clinic** is a marketing-style experience: hero with rotating imagery and copy, about story, tabbed **services** by species, **wellness plans**, **team** carousel/reel, **pet parent stories** reel with modal detail, **FAQ** accordion, commitment banner, and a **contact/footer** block. URLs like `/about` or `/services` scroll to the right section; the server always serves `index.html` (SPA-style rewrite on Vercel), and JavaScript keeps the address bar in sync.

**Why vanilla?** You see the full path from HTML structure → CSS layers → small focused JS files. That makes it easier to reason about performance, accessibility, and how frameworks automate the same ideas later.

---

## Features and functionality

| Area                  | What learners should notice                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Responsive layout** | Fluid type, grids, and breakpoints in `css/layout.css` and `css/components.css`.                                                             |
| **Site header**       | Logo, primary nav, dropdown (“Care types”), mobile menu, CTA buttons with ripple/shine.                                                      |
| **Hero**              | Rotating full-bleed backgrounds, collage “nuggets”, optional word-cycle title (`heroTitleWord.js`), scroll-linked header state.              |
| **About**             | Narrative sections, chips, imagery; reveal-on-scroll.                                                                                        |
| **Services**          | Tab carousel + panels per species; “glass nugget” pills with staged pop/shake animation; deep links via `data-services-tab`.                 |
| **Plans**             | Comparison-style table with keyboard-friendly horizontal scroll helper.                                                                      |
| **Team**              | Doctor reel/cards; optional detail dialog driven by shared data.                                                                             |
| **Stories**           | Review reel, speeds, masks; modal for full review text.                                                                                      |
| **FAQ**               | Accordion rows, repeat-in-viewport animation option.                                                                                         |
| **Commitment banner** | Full-bleed photo, scrim, CTA with delayed “nugget” wiggle.                                                                                   |
| **Footer**            | Columns, dynamic copyright year, mailto/tel links.                                                                                           |
| **Routing**           | `data-route` anchors intercept clicks, `history.pushState`, `popstate` for back/forward, `IntersectionObserver` for active nav highlighting. |
| **Images**            | Many paths live under `/public/`; `data.js` + `applyDynamicImages` can fall back to remote URLs if a file is missing.                        |
| **Accessibility**     | Landmarks, `aria-*` on menus/dialogs/accordion where implemented; respect `prefers-reduced-motion` in CSS.                                   |
| **SEO (static)**      | `index.html` includes meta description, Open Graph, Twitter cards, JSON-LD, canonical URL (see deployed domain).                             |

---

## How it works (architecture)

1. **One HTML file** (`index.html`) holds all sections. Each major section has `data-section-id` (e.g. `home`, `about`, `services`).
2. **`js/main.js`** is the entry module. After `DOMContentLoaded`, it runs initializers **in a deliberate order** (images and chrome first, scroll effects, then **router last** so the page lands on the correct section).
3. **`router.js`** maps **pathname → section id** (`/` → `home`, `/team` → `team`), scrolls the target into view, updates the URL with the History API, and listens for `popstate`.
4. **Links** that should not trigger a full reload use `href="/path"` plus `data-route`; a click listener calls `preventDefault()` and uses the router.
5. **Vercel** (`vercel.json`) rewrites unknown paths to `index.html` so refreshing `/services` still loads the app; the router then scrolls to `services`.
6. **`npm run build`** runs ESLint and **`scripts/copy-static.mjs`**, which copies `index.html`, `style.css`, `js/`, `css/`, and `public/` into **`dist/`** for deployment.

There is **no JSON HTTP API** in this repo: “data” is either inline HTML or exported constants in `js/data.js` (and related modules).

---

## Technology stack

| Layer           | Choice                      | Notes                                                                                        |
| --------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| Markup          | **HTML5**                   | Semantic sections, dialog, nav.                                                              |
| Styling         | **CSS3**                    | Custom properties (design tokens), `@import` bundle from `style.css`, animations, grid/flex. |
| Logic           | **JavaScript (ES modules)** | Native `import`/`export`; runs in modern browsers without a bundler.                         |
| Icons / font    | **Font Awesome (kit)**      | Loaded from CDN in `index.html`.                                                             |
| Typography      | **Self-hosted WOFF2**       | Fredoka + Nunito under `public/fonts/`.                                                      |
| Linting         | **ESLint 9 (flat config)**  | `eslint.config.js`, scoped to `js/**/*.js` and Node scripts.                                 |
| Deploy          | **Vercel**                  | Static output from `dist/`; security headers and caching in `vercel.json`.                   |
| Optional assets | **Node scripts**            | e.g. `fetch-assets` to download hero images (see script header comments).                    |

This project intentionally **does not** use React, Next.js, TypeScript, or Webpack/Vite—so badge rows should reflect **HTML / CSS / JS / Vercel / ESLint** as above.

---

## Project structure

```text
/
├── index.html              # Single page: sections, SEO meta, module script tag
├── style.css               # Imports css/*.css (tokens, layout, components, …)
├── css/
│   ├── tokens.css          # Colors, fonts, radii, shadows
│   ├── layout.css          # Page shell, header, grids
│   ├── components.css      # Sections, cards, banners, footer
│   ├── animations.css      # Reveal, nuggets, commitment wave
│   ├── buttons.css         # .btn-paw, CTA shine
│   ├── pet-reel.css        # Pet strip / reel
│   ├── doctor-reel.css     # Team reel
│   └── reviews-reel.css    # Stories reel + modal
├── js/
│   ├── main.js             # Boot order: all init* calls
│   ├── router.js           # Path ↔ section scroll, data-route clicks
│   ├── ui.js               # Nav, dropdowns, tabs, FAQ, greeting, …
│   ├── data.js             # SITE name, image paths, fallback URLs, content constants
│   ├── scrollReveal.js     # IntersectionObserver-based reveals
│   ├── ripple.js           # Button ripple effect
│   ├── heroRotation.js     # Hero background rotation
│   ├── heroTitleWord.js    # Animated hero keyword
│   ├── doctorReel.js       # Team interactions
│   ├── petReel.js          # Pet reel
│   ├── reviewsReel.js      # Stories reel + modal
│   └── appContext.js       # Shared lightweight context if used
├── public/                 # Static files served as-is (fonts, hero, logo, svg, robots.txt)
├── scripts/
│   ├── copy-static.mjs     # Build: copy into dist/
│   └── download-hero-assets.mjs  # Optional: fetch remote hero images
├── docs/                   # Deep dives (deploy, ripple, hero spec, …)
├── eslint.config.js
├── vercel.json
├── package.json
├── LICENSE
└── dist/                   # Generated by `npm run build` (deploy this)
```

---

## Environment variables and `.env`

**You do not need a `.env` file** to run or build this project. There is **no server-side runtime** reading secrets, and `npm` scripts do not load environment variables for normal local use.

**Optional future use:** If you later add a small server, analytics keys, or a headless CMS, you could introduce `.env` (and add `.env` to `.gitignore`). For example:

```bash
# Example only — not required today
# ANALYTICS_ID=G-XXXXXXXX
# CMS_API_URL=https://api.example.com
```

Until then, treat all configuration as **static**: edit `index.html`, `js/data.js`, or `css/tokens.css`.

---

## Dependencies and tooling

**Runtime (browser):** none from npm—only your Font Awesome kit URL in HTML.

**DevDependencies** (`package.json`):

| Package      | Role                                                                 |
| ------------ | -------------------------------------------------------------------- |
| `eslint`     | Lint JavaScript for bugs and style.                                  |
| `@eslint/js` | ESLint recommended baseline.                                         |
| `globals`    | Tells ESLint that `document`, `window`, etc. exist in browser files. |

**Example — ESLint targets browser globals** (from `eslint.config.js`):

```js
{
  files: ["js/**/*.js"],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: { ...globals.browser },
  },
}
```

**Scripts:**

| Command                | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| `npm run lint`         | Run ESLint on the repo.                               |
| `npm run lint:fix`     | ESLint with `--fix` where rules support it.           |
| `npm run copy-static`  | Build `dist/` only.                                   |
| `npm run build`        | Lint + `copy-static` (used by Vercel).                |
| `npm run fetch-assets` | Optional: populate hero assets via Node (see script). |

---

## How to run and build

### Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge).
- **Node.js 18+** (recommended) if you want linting or the copy build.

### Option A — Open the file (quick)

Double-click `index.html` **may** work for a quick look, but **ES modules often require a local server** (browser CORS policy). Prefer Option B.

### Option B — Local static server (recommended)

From the project root:

```bash
# Python 3
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Paths like [http://localhost:8000/about](http://localhost:8000/about) may 404 unless your server maps all routes to `index.html`; for local testing, start at `/` and use in-app navigation, or use a dev server that supports SPA fallback.

### Option C — Lint and production folder

```bash
npm install
npm run lint
npm run build
```

Then serve the **`dist/`** directory with any static server—the paths mirror production.

### Deploy (Vercel)

The repo includes `vercel.json` with `outputDirectory: "dist"` and SPA rewrites. Connect the Git repo to Vercel and use the default build command from `package.json` (`vercel-build` → `npm run build`).

---

## Routes (client-side paths)

These are **not** separate HTML files; they are **paths handled by the router** after `index.html` loads.

| Path        | Section (`data-section-id`)                        |
| ----------- | -------------------------------------------------- |
| `/`         | `home`                                             |
| `/about`    | `about`                                            |
| `/services` | `services` (optional `data-services-tab` on links) |
| `/plans`    | `plans`                                            |
| `/team`     | `team`                                             |
| `/stories`  | `stories`                                          |
| `/faq`      | `faq`                                              |
| `/contact`  | `contact`                                          |

Adding a new route: add a section with `data-section-id="my-page"`, add nav links with `href="/my-page"` and `data-route`, and ensure the host rewrites unknown paths to `index.html`.

---

## API and backend

- **REST / GraphQL API:** none in this repository.
- **Serverless functions:** none required.
- **Database:** none.
- **Forms:** mailto/tel links are illustrative; wiring a real form would mean adding your own backend or a third-party form service (outside this repo).

---

## Module walkthrough (for learners)

### Entry and boot order

`main.js` waits for the DOM, then runs helpers in sequence. **Router runs last** so the initial scroll matches the URL:

```js
function boot() {
  applyDynamicImages();
  initGreeting();
  initHeroRotation();
  // … other UI modules …
  initScrollReveal();
  initParallax();
  initRouter();
}
```

### Router + History API

Pathnames are normalized to a section id, then the page scrolls smoothly:

```js
export function navigateToSection(sectionId, opts = {}) {
  const el = document.querySelector(`[data-section-id="${sectionId}"]`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  const path = sectionId === "home" ? "/" : `/${sectionId}`;
  if (opts.replace) {
    window.history.replaceState({ sectionId }, "", path);
  } else {
    window.history.pushState({ sectionId }, "", path);
  }
}
```

### Central content and images

`data.js` exports `SITE`, image path maps, and fallback Unsplash/Pexels URLs so `applyDynamicImages()` can recover if a local file is missing—useful when teaching progressive enhancement and error handling.

---

## Reusing parts in other projects

- **Router pattern:** Copy `router.js` ideas (`data-route`, `data-section-id`, `pushState`) into any long landing page.
- **Design tokens:** Copy `css/tokens.css` into another site and remap variables.
- **Reels / carousels:** `doctorReel.js`, `reviewsReel.js`, and related CSS are self-contained modules—trim HTML and data arrays.
- **Accordion FAQ:** `initFaq` in `ui.js` + FAQ markup + `animations.css` rules.
- **Button ripple:** `ripple.js` + `buttons.css` + `docs/RIPPLE_BUTTON_EFFECT.md`.
- **Deploy story:** See `docs/VERCEL-PLAIN-JS-DEPLOY.md` for plain static ES modules on Vercel.

Always respect **licenses** of embedded fonts, Font Awesome, and any remote stock images if you reuse fallbacks.

---

## Keywords

Pets, veterinary, Pawfect Care, healthcare landing page, responsive design, HTML5, CSS3, JavaScript, ES modules, static site, SPA routing, History API, IntersectionObserver, accessibility, ESLint, Vercel, vanilla JS, frontend learning, portfolio, Arnob Mahmud

---

## Further documentation

Inside `docs/`:

- `VERCEL-PLAIN-JS-DEPLOY.md` — deploying without a bundler.
- `RIPPLE_BUTTON_EFFECT.md` — CTA shine and ripple.
- `HERO_ROTATING_BACKGROUND_SPEC.md` — hero behavior.
- `UI_STYLING_GUIDE.md`, `SAFE_IMAGE_REUSABLE_COMPONENT.md`, `VERCEL_PRODUCTION_GUARDRAILS.md` — styling and production notes.

---

## Conclusion

This project is a **practical bridge** between static HTML/CSS and “app-like” navigation: you get real **routing**, **modular JS**, and **structured CSS** without hiding those mechanics inside a framework. Use it to teach or learn how SPAs _conceptually_ work, then compare the same ideas in React or Next.js later.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
