/**
 * Crossfades the hero headline emphasis word (same easing/duration as hero bg layers).
 *
 * Two stacked `.hero-title__word-layer` elements swap “front” class so one word
 * fades out while the next fades in — no duplicate text in the accessibility tree for the hidden layer.
 */

const WORDS = ["love", "care", "cute", "kind", "dear", "calm", "warm", "best"];

/** Matches `.hero-title__word-layer` transition + `.hero__bg-layer` crossfade rhythm. */
const HOLD_MS = 4200;
const CYCLE_MS = 4200 + 1750;

/**
 * Fixed slot width = widest word in the hero title font, so “your pets like family”
 * stays put; words are centered so left/right gaps stay even (no huge space after short glyphs).
 */
function applyHeroWordSlotWidth(slot) {
  const title = slot.closest(".hero-title");
  if (!(title instanceof HTMLElement)) return;

  const probe = document.createElement("span");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText =
    "position:absolute;left:-9999px;top:0;white-space:nowrap;visibility:hidden;pointer-events:none;";
  const cs = getComputedStyle(title);
  probe.style.fontFamily = cs.fontFamily;
  probe.style.fontSize = cs.fontSize;
  probe.style.fontWeight = cs.fontWeight;
  probe.style.fontStyle = cs.fontStyle;
  probe.style.letterSpacing = cs.letterSpacing;
  title.appendChild(probe);

  let maxW = 0;
  for (const w of WORDS) {
    probe.textContent = w;
    maxW = Math.max(maxW, probe.getBoundingClientRect().width);
  }
  title.removeChild(probe);

  slot.style.width = `${Math.ceil(maxW + 1)}px`;
}

export function initHeroTitleWord() {
  const slot = document.querySelector("[data-hero-title-word]");
  if (!slot) return;

  applyHeroWordSlotWidth(slot);
  window.addEventListener(
    "resize",
    () => {
      applyHeroWordSlotWidth(slot);
    },
    { passive: true },
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layers = slot.querySelectorAll(".hero-title__word-layer");
  if (layers.length < 2) return;

  let visible = /** @type {HTMLElement} */ (layers[0]);
  let hidden = /** @type {HTMLElement} */ (layers[1]);
  let wi = 0;

  function tick() {
    wi = (wi + 1) % WORDS.length;
    const nextWord = WORDS[wi];
    hidden.textContent = nextWord;
    /* Promote the off-screen layer: it becomes visible; old front gets aria-hidden. */
    hidden.classList.add("is-front");
    hidden.removeAttribute("aria-hidden");
    visible.classList.remove("is-front");
    visible.setAttribute("aria-hidden", "true");
    const t = visible;
    visible = hidden;
    hidden = t;
  }

  window.setTimeout(() => {
    tick();
    window.setInterval(tick, CYCLE_MS);
  }, HOLD_MS);
}
