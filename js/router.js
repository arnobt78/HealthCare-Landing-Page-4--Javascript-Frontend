/**
 * Minimal client-side router: syncs URL pathname with scroll position on a
 * single-page layout. Works with Vercel SPA rewrites so refresh on /about works.
 *
 * Educational map (this file = entire “SPA routing” for the site):
 * - No fetch(): paths are not server routes; they are labels for scroll targets.
 * - `data-route` links: in-page navigation without full page reload.
 * - `history.pushState` / `replaceState`: URL bar matches the section user sees.
 * - `popstate`: browser Back/Forward still scrolls to the right block.
 * - Nav highlight: IntersectionObserver ties scroll position to `.is-active` on `[data-nav-for]`.
 */

import { requestServicesTab } from "./ui.js";

/** Every major section in index.html should expose `data-section-id` for this router. */
const SECTION_SELECTOR = "[data-section-id]";

/**
 * @param {string} path e.g. "/about" or "/"
 */
export function pathToSectionId(path) {
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/" || clean === "") return "home";
  /* "/about" → "about" — must match `data-section-id` on a <section> */
  return clean.replace(/^\//, "");
}

/**
 * Scroll to section and optionally update history.
 * @param {string} sectionId
 * @param {{ replace?: boolean }} [opts]
 */
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

/** Read pathname on first load (after Vercel serves index.html). */
export function initRouter() {
  const initial = pathToSectionId(window.location.pathname);
  navigateToSection(initial, { replace: true });

  /* Back/forward: user landed on same index.html; we only change scroll position. */
  window.addEventListener("popstate", () => {
    const id = pathToSectionId(window.location.pathname);
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* Progressive enhancement: real hrefs work without JS; with JS we stay on one document. */
  document.querySelectorAll('a[data-route][href^="/"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http")) return;
      e.preventDefault();
      const id = pathToSectionId(href);
      navigateToSection(id);
      /* Deep-link from nav dropdown into a specific Services tab panel */
      if (id === "services") {
        const tab = anchor.getAttribute("data-services-tab");
        if (tab) requestServicesTab(tab);
      }
    });
  });

  /** Highlight nav by scroll position (educational: IntersectionObserver). */
  const sections = document.querySelectorAll(SECTION_SELECTOR);
  const navLinks = document.querySelectorAll("[data-nav-for]");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("data-section-id");
        if (!id) return;

        navLinks.forEach((link) => {
          const forId = link.getAttribute("data-nav-for");
          link.classList.toggle("is-active", forId === id);
        });
      });
    },
    /* Shrink the “active” viewport band so one section wins at a time (not all at once). */
    { rootMargin: "-40% 0px -45% 0px", threshold: 0.01 },
  );

  sections.forEach((sec) => io.observe(sec));
}
