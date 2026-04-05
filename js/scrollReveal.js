/**
 * Scroll-triggered animations with optional stagger (one-by-one reveals).
 * Uses IntersectionObserver (efficient; runs off the main thread where possible).
 *
 * Contract: elements use class `.reveal`; CSS defines hidden vs `.is-visible` states.
 * `[data-reveal-stagger]` on a parent means children reveal sequentially (timeouts).
 * Reveal state toggles whenever elements enter or leave the viewport (repeat on scroll).
 */

export const REVEAL_STAGGER_MS = 85;

const STAGGER_MS = REVEAL_STAGGER_MS;

const IO_ROOT_MARGIN = "0px 0px -8% 0px";
const IO_THRESHOLD = 0.08;

/**
 * Assign --reveal-i to descendants so CSS transition-delay can stack.
 * Uses all .reveal under the root (document order) so lists/tables can stagger.
 * @param {Element} root
 */
function applyStagger(root) {
  const kids = root.querySelectorAll(".reveal");
  kids.forEach((el, i) => {
    el.style.setProperty("--reveal-i", String(i));
  });
}

/**
 * Same timing as initScrollReveal on [data-reveal-stagger] (Snuggles chips, etc.).
 * Used for services tab cards once on scroll — not on every tab change.
 * @param {Element | null} root
 */
export function revealStaggerChildrenSequential(root) {
  if (!root) return;
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const children = root.querySelectorAll(":scope .reveal");
  if (!children.length) return;
  applyStagger(root);
  if (prefersReduced) {
    children.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  children.forEach((child, i) => {
    window.setTimeout(() => {
      child.classList.add("is-visible");
    }, i * STAGGER_MS);
  });
}

/** @type {WeakMap<Element, number[]>} */
const staggerTimeoutIds = new WeakMap();

function clearStaggerTimeouts(root) {
  const ids = staggerTimeoutIds.get(root);
  if (ids) {
    ids.forEach((id) => window.clearTimeout(id));
  }
  staggerTimeoutIds.delete(root);
}

/**
 * Run staggered .is-visible for children; cancel any in-flight timeouts first.
 * @param {Element} root
 */
function runStaggerShow(root) {
  clearStaggerTimeouts(root);
  const children = root.querySelectorAll(":scope .reveal");
  const ids = [];
  children.forEach((child, i) => {
    const tid = window.setTimeout(() => {
      child.classList.add("is-visible");
    }, i * STAGGER_MS);
    ids.push(tid);
  });
  staggerTimeoutIds.set(root, ids);
}

/**
 * Observe .reveal elements and toggle .is-visible when they enter or leave the viewport.
 * Containers with [data-reveal-stagger] reveal their .reveal children in sequence on enter
 * and clear on exit. Service pills inside [data-tabs-carousel] stay driven by ui.js only.
 */
export function initScrollReveal() {
  document.querySelectorAll("[data-reveal-stagger]").forEach((root) => {
    if (root.closest("[data-tabs-carousel]")) return;
    applyStagger(root);
  });

  const standaloneReveals = document.querySelectorAll(".reveal");
  const staggerRoots = [
    ...document.querySelectorAll("[data-reveal-stagger]"),
  ].filter((el) => !el.closest("[data-tabs-carousel]"));

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    standaloneReveals.forEach((el) => el.classList.add("is-visible"));
    staggerRoots.forEach((root) => {
      root
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("is-visible"));
    });
    document
      .querySelectorAll("[data-tabs-carousel] [data-reveal-stagger] .reveal")
      .forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const staggerObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const root = entry.target;
        const children = root.querySelectorAll(":scope .reveal");
        if (entry.isIntersecting) {
          runStaggerShow(root);
        } else {
          clearStaggerTimeouts(root);
          children.forEach((c) => c.classList.remove("is-visible"));
        }
      }
    },
    { root: null, rootMargin: IO_ROOT_MARGIN, threshold: IO_THRESHOLD },
  );

  staggerRoots.forEach((root) => {
    staggerObserver.observe(root);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const t = entry.target;
        if (entry.isIntersecting) {
          t.classList.add("is-visible");
        } else {
          t.classList.remove("is-visible");
        }
        if (t.classList.contains("services-tabs__scroll-chrome")) {
          t.dispatchEvent(
            new CustomEvent("pawfect:services-chrome-visible", {
              bubbles: true,
              detail: { visible: entry.isIntersecting },
            }),
          );
        }
      }
    },
    { root: null, rootMargin: IO_ROOT_MARGIN, threshold: IO_THRESHOLD },
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.closest("[data-tabs-carousel]")) {
      if (!el.classList.contains("services-tabs__scroll-chrome")) return;
    }
    const stagger = el.closest("[data-reveal-stagger]");
    if (stagger && !stagger.closest("[data-tabs-carousel]")) return;
    revealObserver.observe(el);
  });
}

/**
 * Subtle parallax on elements marked [data-parallax].
 * Throttled via requestAnimationFrame.
 */
export function initParallax() {
  const nodes = document.querySelectorAll("[data-parallax]");
  if (!nodes.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const y = window.scrollY;
      nodes.forEach((node) => {
        const speed = Number(node.getAttribute("data-parallax")) || 0.15;
        const shift = Math.round(y * speed * 0.25);
        node.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true }); /* passive: scroll never blocked */
  onScroll();
}
