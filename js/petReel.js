/**
 * Infinite horizontal pet SVG marquee. Hydrates [data-pet-reel] tracks from
 * /public/pets/pet-1.svg … pet-18.svg (duplicated for seamless loop).
 *
 * Optional: data-pet-reel-pause-on=".selector" — pause while pointer/focus is
 * on matching elements within the closest <section> (e.g. .team-card).
 */

const DEFAULT_ICONS = Array.from(
  { length: 18 },
  (_, i) => `/public/pets/pet-${i + 1}.svg`,
);

/**
 * @param {string | undefined} raw
 * @returns {string[]}
 */
function parseIcons(raw) {
  if (!raw) return DEFAULT_ICONS;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_ICONS;
  } catch {
    return DEFAULT_ICONS;
  }
}

/**
 * Pause the marquee while the pointer is inside a matching element (e.g. doctor cards).
 * Uses delegation on the section so dynamically rebuilt cards (team filter) still work.
 *
 * @param {HTMLElement} reel
 * @param {HTMLElement} track
 */
function wirePauseOnHover(reel, track) {
  const pauseSel = reel.getAttribute("data-pet-reel-pause-on");
  if (!pauseSel) return;

  const scope = reel.closest("section");
  if (!scope) return;

  let depth = 0;

  const pause = () => {
    depth += 1;
    if (depth === 1) track.style.animationPlayState = "paused";
  };

  const resume = () => {
    depth = Math.max(0, depth - 1);
    if (depth === 0) track.style.animationPlayState = "running";
  };

  scope.addEventListener("mouseover", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const card = t.closest(pauseSel);
    if (!card || !scope.contains(card)) return;
    const from = e.relatedTarget;
    if (from instanceof Node && card.contains(from)) return;
    pause();
  });

  scope.addEventListener("mouseout", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const card = t.closest(pauseSel);
    if (!card || !scope.contains(card)) return;
    const to = e.relatedTarget;
    if (to instanceof Node && card.contains(to)) return;
    resume();
  });
}

export function initPetReel() {
  document.querySelectorAll("[data-pet-reel]").forEach((reel) => {
    if (!(reel instanceof HTMLElement)) return;
    const track = reel.querySelector(".pet-reel__track");
    if (!(track instanceof HTMLElement)) return;
    if (track.dataset.petReelHydrated === "1") return;
    track.dataset.petReelHydrated = "1";

    const icons = parseIcons(reel.dataset.petReelIcons);

    /* Duplicate icon sequence so CSS animation can loop without a visible seam. */
    for (let pass = 0; pass < 2; pass += 1) {
      icons.forEach((src) => {
        const item = document.createElement("span");
        item.className = "pet-reel__item";
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.decoding = "async";
        img.loading = "lazy";
        item.appendChild(img);
        track.appendChild(item);
      });
    }

    wirePauseOnHover(reel, track);
  });
}
