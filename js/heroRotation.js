/**
 * Two-layer hero background rotation + Ken Burns (docs/HERO_ROTATING_BACKGROUND_SPEC.md).
 * Advances on animationend; matches healthcare-ui-3 behavior.
 */

import { IMAGES } from "./data.js";

/** @type {string[][]} */
const PHOTO_CANDIDATES = [
  [IMAGES.heroGallery1, IMAGES.dogSmile, IMAGES.hero],
  [IMAGES.heroGallery2, IMAGES.catHero, IMAGES.hero],
  [IMAGES.heroGallery3, IMAGES.rabbit, IMAGES.dogSmile],
  [IMAGES.heroGallery4, IMAGES.dogSmile, IMAGES.hero],
  [IMAGES.heroGallery5, IMAGES.catHero, IMAGES.hero],
];

export function initHeroRotation() {
  const hero = document.querySelector("[data-hero]");
  const layers = hero?.querySelectorAll("[data-hero-bg-layer]");
  if (!(hero instanceof HTMLElement) || !layers || layers.length < 2) return;

  const slideCount = PHOTO_CANDIDATES.length;
  /** @type {Record<number, string>} */
  const heroUrlCache = {};

  const a = /** @type {HTMLElement} */ (layers[0]);
  const b = /** @type {HTMLElement} */ (layers[1]);

  PHOTO_CANDIDATES.flat().forEach((url) => {
    const img = new Image();
    img.src = url;
  });

  a.style.backgroundImage = `url("${PHOTO_CANDIDATES[0][0]}")`;
  b.style.backgroundImage = `url("${PHOTO_CANDIDATES[1 % slideCount][0]}")`;

  /**
   * @param {string} url
   * @returns {Promise<boolean>}
   */
  function probeImageLoad(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (typeof img.decode === "function") {
          img.decode().then(() => resolve(true)).catch(() => resolve(true));
        } else {
          resolve(true);
        }
      };
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  /**
   * @param {number} slideIndex
   * @returns {Promise<string>}
   */
  async function resolveHeroUrl(slideIndex) {
    const cached = heroUrlCache[slideIndex];
    if (cached) return cached;
    const list = PHOTO_CANDIDATES[slideIndex];
    for (const url of list) {
      if (await probeImageLoad(url)) {
        heroUrlCache[slideIndex] = url;
        return url;
      }
    }
    heroUrlCache[slideIndex] = list[0];
    return list[0];
  }

  void (async () => {
    const u0 = await resolveHeroUrl(0);
    const u1 = await resolveHeroUrl(1 % slideCount);
    a.style.backgroundImage = `url("${u0}")`;
    b.style.backgroundImage = `url("${u1}")`;
  })();

  let active = 0;
  let index = 0;
  let cycleBusy = false;
  let lastCycleAdvance = 0;

  /**
   * @returns {Promise<void>}
   */
  async function goNext() {
    const nextIndex = (index + 1) % slideCount;
    const curLayer = active === 0 ? a : b;
    const nextLayer = active === 0 ? b : a;
    const url = await resolveHeroUrl(nextIndex);

    nextLayer.style.backgroundImage = `url("${url}")`;
    curLayer.classList.remove("hero__bg-layer--active");
    nextLayer.classList.remove("hero__bg-layer--active");
    void nextLayer.offsetWidth;
    nextLayer.classList.add("hero__bg-layer--active");

    active = active === 0 ? 1 : 0;
    index = nextIndex;
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    a.classList.add("hero__bg-layer--active");
    window.setInterval(() => {
      void goNext();
    }, 8000);
    return;
  }

  const CYCLE_DEBOUNCE_MS = 120;

  /**
   * @param {AnimationEvent} e
   */
  function onCycleEnd(e) {
    if (e.animationName !== "hero-bg-kenburns-cycle") return;
    const el = /** @type {HTMLElement} */ (e.target);
    if (el !== e.currentTarget) return;
    if (!el.classList.contains("hero__bg-layer--active")) return;
    const now = performance.now();
    if (now - lastCycleAdvance < CYCLE_DEBOUNCE_MS) return;
    lastCycleAdvance = now;
    if (cycleBusy) return;
    cycleBusy = true;
    void goNext().finally(() => {
      cycleBusy = false;
    });
  }

  a.addEventListener("animationend", onCycleEnd);
  b.addEventListener("animationend", onCycleEnd);
  a.classList.add("hero__bg-layer--active");
}
