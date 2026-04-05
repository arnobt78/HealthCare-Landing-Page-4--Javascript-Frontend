/**
 * Scroll-triggered animations with optional stagger (one-by-one reveals).
 * Uses IntersectionObserver (efficient; runs off the main thread where possible).
 */

const STAGGER_MS = 85;

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
 * Replay one-by-one reveals (e.g. service tab cards). Skipped by initScrollReveal
 * for roots inside [data-tabs-carousel].
 * @param {Element | null} root
 */
export function playStaggerReveal(root) {
  if (!root) return;
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const children = root.querySelectorAll(":scope .reveal");
  if (!children.length) return;
  if (prefersReduced) {
    children.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  applyStagger(root);
  children.forEach((el) => el.classList.remove("is-visible"));
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      children.forEach((child, i) => {
        window.setTimeout(() => {
          child.classList.add("is-visible");
        }, i * STAGGER_MS);
      });
    });
  });
}

/**
 * Observe .reveal elements and toggle .is-visible when they enter the viewport.
 * Containers with [data-reveal-stagger] reveal their .reveal children in sequence.
 */
export function initScrollReveal() {
  document.querySelectorAll("[data-reveal-stagger]").forEach((root) => {
    if (root.closest("[data-tabs-carousel]")) return;
    applyStagger(root);
  });

  const standaloneReveals = document.querySelectorAll(".reveal");
  const staggerRoots = [...document.querySelectorAll("[data-reveal-stagger]")].filter(
    (el) => !el.closest("[data-tabs-carousel]"),
  );

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    standaloneReveals.forEach((el) => el.classList.add("is-visible"));
    staggerRoots.forEach((root) => {
      root.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    });
    document
      .querySelectorAll("[data-tabs-carousel] [data-reveal-stagger] .reveal")
      .forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target;

        if (target.hasAttribute("data-reveal-stagger")) {
          const children = target.querySelectorAll(":scope .reveal");
          children.forEach((child, i) => {
            window.setTimeout(() => {
              child.classList.add("is-visible");
            }, i * STAGGER_MS);
          });
          observer.unobserve(target);
          continue;
        }

        target.classList.add("is-visible");
        observer.unobserve(target);
      }
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  staggerRoots.forEach((el) => {
    observer.observe(el);
  });
  standaloneReveals.forEach((el) => {
    if (el.closest("[data-reveal-stagger]")) return;
    observer.observe(el);
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

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
