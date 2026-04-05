/**
 * Copies static assets into dist/ for Vercel (see docs/VERCEL-PLAIN-JS-DEPLOY.md).
 * Run: node scripts/copy-static.mjs
 *
 * Walkthrough: there is no bundler — we copy `index.html`, `style.css`, `js/`, `css/`, and
 * `public/` verbatim so import maps in the browser still resolve (`/js/main.js`, `/css/...`).
 * Optional `script.js` in root is legacy; if present it is copied too.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

const rootFiles = ["index.html", "style.css", "script.js"];
for (const f of rootFiles) {
  const src = path.join(root, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, f));
}

/** Recursive directory copy (Node fs) — preserves nested folders like public/hero. */
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

copyDir(path.join(root, "public"), path.join(dist, "public"));
copyDir(path.join(root, "js"), path.join(dist, "js"));
copyDir(path.join(root, "css"), path.join(dist, "css"));
