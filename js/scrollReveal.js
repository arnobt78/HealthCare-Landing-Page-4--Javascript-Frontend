/**
 * Scroll-triggered animations with optional stagger (one-by-one reveals).
 * Uses IntersectionObserver (efficient; runs off the main thread where possible).
 */

const STAGGER_MS = 85;

/**
 * Assign --reveal-i to children so CSS transition-delay can stack (optional).
 * @param {Element} root
 */
function applyStagger(root) {
  const kids = root.querySelectorAll(":scope > .reveal");
  kids.forEach((el, i) => {
    el.style.setProperty("--reveal-i", String(i));
  });
}

/**
 * Observe .reveal elements and toggle .is-visible when they enter the viewport.
 * Containers with [data-reveal-stagger] reveal their .reveal children in sequence.
 */
export function initScrollReveal() {
  document.querySelectorAll("[data-reveal-stagger]").forEach(applyStagger);

  const standaloneReveals = document.querySelectorAll(".reveal");
  const staggerRoots = document.querySelectorAll("[data-reveal-stagger]");

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    standaloneReveals.forEach((el) => el.classList.add("is-visible"));
    staggerRoots.forEach((root) => {
      root.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target;

        if (target.hasAttribute("data-reveal-stagger")) {
          const children = target.querySelectorAll(".reveal");
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

  staggerRoots.forEach((el) => observer.observe(el));
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
