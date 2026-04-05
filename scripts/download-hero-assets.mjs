/**
 * Downloads hero collage + background JPEGs and self-hosted Google Fonts (latin woff2).
 * Run: node scripts/download-hero-assets.mjs
 * Requires network. Commit outputs under public/hero and public/fonts for offline/CDN-free loads.
 *
 * Educational: this is the only “network I/O” in the toolchain — not a runtime API for the site.
 * The live page still works if you skip this script: js/data.js lists IMAGE_REMOTE_FALLBACK URLs.
 *
 * Duck / fish-alt / guinea use Pexels CDN URLs (verified animal subjects). Pexels license: free use,
 * see https://www.pexels.com/license/
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const heroDir = path.join(root, "public", "hero");
const fontDir = path.join(root, "public", "fonts");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
}

/**
 * Collage + full-bleed slides (matches js/data.js remote fallbacks).
 * URLs chosen so each file is clearly the named animal (not generic landscapes).
 */
const HERO_IMAGES = [
  [
    "collage-puppy.jpg",
    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=85",
  ],
  [
    "collage-cat.jpg",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=85",
  ],
  [
    "collage-rabbit.jpg",
    "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=85",
  ],
  [
    "collage-hamster.jpg",
    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=85",
  ],
  [
    "collage-fish.jpg",
    "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=85",
  ],
  [
    "bg-dog-chewy.jpg",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1600&q=85",
  ],
  [
    "bg-dog-run.jpg",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=85",
  ],
  [
    "bg-dog-portrait.jpg",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1600&q=85",
  ],
  [
    "bg-cat-alt.jpg",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=85",
  ],
  [
    "bg-rabbit-alt.jpg",
    "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1600&q=85",
  ],
  [
    "bg-fish-alt.jpg",
    "https://images.pexels.com/photos/8837893/pexels-photo-8837893.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "bg-turtle-ocean.jpg",
    "https://images.unsplash.com/photo-1501706362039-c06b2d715385?auto=format&fit=crop&w=1600&q=85",
  ],
  [
    "bg-guinea.jpg",
    "https://images.pexels.com/photos/50572/guinea-pig-guinea-pig-house-cavia-porcellus-form-domestica-50572.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "bg-duck.jpg",
    "https://images.pexels.com/photos/28904052/pexels-photo-28904052.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ],
  [
    "bg-bird.jpg",
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1600&q=85",
  ],
];

async function downloadHeroImages() {
  fs.mkdirSync(heroDir, { recursive: true });
  for (const [name, url] of HERO_IMAGES) {
    process.stdout.write(`hero ${name}… `);
    await download(url, path.join(heroDir, name));
    console.log("ok");
  }
}

async function downloadLatinWoff2() {
  fs.mkdirSync(fontDir, { recursive: true });
  const cssUrl =
    "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap";
  const cssRes = await fetch(cssUrl, { headers: { "User-Agent": UA } });
  if (!cssRes.ok) throw new Error(`Font CSS ${cssRes.status}`);
  const css = await cssRes.text();

  const blocks = css.split("@font-face");
  /** @type {Map<string, string>} first saved path per woff2 URL (Google often reuses one file per family for all weights). */
  const urlToPath = new Map();
  let count = 0;

  for (const block of blocks) {
    if (!block.includes("U+0000-00FF")) continue;
    const m = block.match(/src:\s*url\(([^)]+\.woff2)\)/);
    if (!m) continue;
    const woffUrl = m[1];

    const isFredoka = /font-family:\s*['"]Fredoka['"]/.test(block);
    const fam = isFredoka ? "fredoka" : "nunito";
    const wm = block.match(/font-weight:\s*(\d+)/);
    const wt = wm ? wm[1] : "400";
    const isItalic = /font-style:\s*italic/.test(block);
    const fname = `${fam}-${wt}${isItalic ? "-italic" : ""}.woff2`;
    const dest = path.join(fontDir, fname);

    process.stdout.write(`font ${fname}… `);
    if (urlToPath.has(woffUrl)) {
      fs.copyFileSync(urlToPath.get(woffUrl), dest);
      console.log("ok (copy)");
    } else {
      await download(woffUrl, dest);
      urlToPath.set(woffUrl, dest);
      console.log("ok");
    }
    count += 1;
  }

  console.log(`Fonts: ${count} latin @font-face file(s).`);
}

async function main() {
  await downloadHeroImages();
  await downloadLatinWoff2();
  console.log("All downloads finished.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
