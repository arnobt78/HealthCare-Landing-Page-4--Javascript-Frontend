# Deploy this plain HTML / CSS / JavaScript project on Vercel

Static entry: `index.html` at the project root, modules in `js/`, styles in `css/` + `style.css`, assets in `public/`.

## Why `dist/` and `scripts/copy-static.mjs`

Vercel works best with an explicit **build** and **output directory**. This repo runs:

1. `npm run lint` — ESLint over `js/` and config.
2. `node scripts/copy-static.mjs` — copies `index.html`, `style.css`, `script.js`, and the `public/`, `js/`, and `css/` folders into `dist/`.

Output is served from **`dist/`** (see root `vercel.json`: `outputDirectory`).

## Root `vercel.json` (this project)

- **`buildCommand`**: `npm run build`
- **`outputDirectory`**: `dist`
- **`rewrites`**: SPA-style paths (e.g. `/team`) serve `index.html` so refresh works. Paths with a file extension are not rewritten.
- **`headers`**: security headers + long cache for `/js/*` and `/css/*` (see `docs/VERCEL_PRODUCTION_GUARDRAILS.md`).

## Dashboard checklist

1. **Framework preset**: Other.
2. **Root directory**: repository root (where `vercel.json` lives).
3. **Build command**: `npm run build` (or leave default if Vercel reads `vercel.json`).
4. **Output directory**: `dist`.

## Local build

```bash
npm run build
npx --yes serve dist -l 3333
```

Open the printed URL and test `/about`, `/team`, etc.

## `public/` and URLs

Files under `public/` are copied to `dist/public/`, so URLs stay **`/public/favicon.ico`**, **`/public/logo.png`**, **`/public/robots.txt`**.

## After deploy

- Hard-refresh deep links (`/faq`, `/contact`).
- Enable **Firewall → Bot protection** (and **AI bots** if desired) per `docs/VERCEL_PRODUCTION_GUARDRAILS.md`.
