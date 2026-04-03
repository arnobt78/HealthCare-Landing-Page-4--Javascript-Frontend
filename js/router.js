/**
 * Minimal client-side router: syncs URL pathname with scroll position on a
 * single-page layout. Works with Vercel SPA rewrites so refresh on /about works.
 */

const SECTION_SELECTOR = "[data-section-id]";

/**
 * @param {string} path e.g. "/about" or "/"
 */
export function pathToSectionId(path) {
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/" || clean === "") return "home";
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

  window.addEventListener("popstate", () => {
    const id = pathToSectionId(window.location.pathname);
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll('a[data-route][href^="/"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http")) return;
      e.preventDefault();
      const id = pathToSectionId(href);
      navigateToSection(id);
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
    { rootMargin: "-40% 0px -45% 0px", threshold: 0.01 },
  );

  sections.forEach((sec) => io.observe(sec));
}
