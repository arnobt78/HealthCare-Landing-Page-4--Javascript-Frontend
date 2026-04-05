/**
 * UI behaviors: mobile nav, dropdown, tabs, FAQ accordion, dynamic images.
 */

import { IMAGES, IMAGE_REMOTE_FALLBACK } from "./data.js";
import { setAppState } from "./appContext.js";
import {
  REVEAL_STAGGER_MS,
  revealStaggerChildrenSequential,
} from "./scrollReveal.js";

/**
 * Apply Unsplash URLs from data.js to elements with data-dynamic-img="key".
 * Educational: one function updates many images from a single data map.
 */
/**
 * SafeImage-style fallback (vanilla): if primary URL fails, swap to data-fallback-img key.
 * Mirrors docs/SAFE_IMAGE_REUSABLE_COMPONENT.md for plain HTML projects.
 */
function bindImageFallback(img) {
  const dynKey = img.getAttribute("data-dynamic-img");
  const fbKey = img.getAttribute("data-fallback-img");
  img.addEventListener(
    "error",
    () => {
      if (img.dataset.safeImgDone === "1") return;
      img.dataset.safeImgDone = "1";
      const remoteDyn = dynKey && IMAGE_REMOTE_FALLBACK[dynKey];
      const localFb = fbKey && IMAGES[fbKey];
      const remoteFb = fbKey && IMAGE_REMOTE_FALLBACK[fbKey];
      const next = remoteDyn || localFb || remoteFb;
      if (next) img.setAttribute("src", next);
    },
    { once: true },
  );
}

export function applyDynamicImages() {
  document.querySelectorAll("[data-dynamic-img]").forEach((img) => {
    bindImageFallback(img);
    const key = img.getAttribute("data-dynamic-img");
    if (key && IMAGES[key]) {
      img.setAttribute("src", IMAGES[key]);
    }
  });

}

/**
 * Mobile menu toggle (hamburger).
 */
export function initMobileNav() {
  const btn = document.querySelector("#menu-bars");
  const navbar = document.querySelector(".navbar");
  if (!btn || !navbar) return;

  const closeAll = () => {
    btn.classList.remove("fa-times");
    btn.classList.add("fa-bars");
    navbar.classList.remove("active");
    document.body.classList.remove("nav-open");
  };

  btn.addEventListener("click", () => {
    const open = !navbar.classList.contains("active");
    btn.classList.toggle("fa-times", open);
    btn.classList.toggle("fa-bars", !open);
    navbar.classList.toggle("active", open);
    document.body.classList.toggle("nav-open", open);
  });

  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) closeAll();
    });
  });
}

/**
 * Simple dropdown: click toggle + outside click to close.
 */
export function initDropdowns() {
  document.querySelectorAll("[data-dropdown]").forEach((wrap) => {
    const btn = wrap.querySelector("[data-dropdown-toggle]");
    const panel = wrap.querySelector("[data-dropdown-panel]");
    if (!btn || !panel) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = wrap.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    panel.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        wrap.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target instanceof Node && e.target.closest("[data-dropdown]")) return;
    document.querySelectorAll("[data-dropdown].is-open").forEach((wrap) => {
      wrap.classList.remove("is-open");
      const b = wrap.querySelector("[data-dropdown-toggle]");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Tab panels: data-tab-target matches panel id.
 * [data-tabs-carousel] + .tab-panels-stack: zoom crossfade + optional auto-advance.
 */
export function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const buttons = [...root.querySelectorAll("[data-tab-target]")];
    const panels = [...root.querySelectorAll("[data-tab-panel]")];
    const viewport = root.querySelector(".tab-panels-viewport");
    const stack = root.querySelector(".tab-panels-stack");
    const carousel = Boolean(
      root.hasAttribute("data-tabs-carousel") && viewport && stack,
    );

    if (!carousel) {
      const activate = (id) => {
        if (!id) return;
        buttons.forEach((b) => {
          const on = b.getAttribute("data-tab-target") === id;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        panels.forEach((p) => {
          const on = p.id === id;
          p.classList.toggle("is-active", on);
        });
      };
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => activate(btn.getAttribute("data-tab-target")));
      });
      const defaultBtn = root.querySelector(".tab-btn.is-active");
      activate(
        defaultBtn ? defaultBtn.getAttribute("data-tab-target") : buttons[0]?.getAttribute("data-tab-target"),
      );
      return;
    }

    let idx = panels.findIndex((p) => p.classList.contains("is-active"));
    if (idx < 0) idx = 0;

    const intervalMs = Math.max(3500, Number(root.getAttribute("data-tabs-interval")) || 5600);
    const reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let carouselTimer = null;

    const pauseCarousel = () => {
      if (carouselTimer != null) {
        window.clearInterval(carouselTimer);
        carouselTimer = null;
      }
    };

    const resumeCarousel = () => {
      if (reduceMotion) return;
      if (root.getAttribute("data-services-card-intro") !== "done") return;
      pauseCarousel();
      carouselTimer = window.setInterval(() => {
        go(idx + 1);
      }, intervalMs);
    };

    const syncButtons = () => {
      buttons.forEach((b, bi) => {
        const on = bi === idx;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
    };

    const syncA11y = () => {
      panels.forEach((p, pi) => {
        p.classList.toggle("is-active", pi === idx);
        p.setAttribute("aria-hidden", pi !== idx ? "true" : "false");
      });
    };

    const revealActivePanelCards = () => {
      const panel = panels[idx];
      const grid = panel.querySelector("[data-reveal-stagger]");
      const introDone = root.getAttribute("data-services-card-intro") === "done";

      if (!introDone) {
        panel.querySelectorAll(".service-pill.reveal").forEach((el) => {
          el.classList.add("is-visible");
        });
        return;
      }

      if (!grid) {
        panel.querySelectorAll(".service-pill.reveal").forEach((el) => {
          el.classList.add("is-visible");
        });
        return;
      }

      /*
       * Tab stack zooms ~580ms; delay nugget keyframes until the panel reads as “in”.
       * Always replay stagger on tab change so pop + shake run again (hero-style).
       */
      panels.forEach((p) => p.style.removeProperty("--services-nugget-base-delay"));
      panel.style.setProperty("--services-nugget-base-delay", "580ms");

      grid.querySelectorAll(":scope .reveal").forEach((el) => {
        el.classList.remove("is-visible", "service-pill--shake-phase");
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          revealStaggerChildrenSequential(grid);
        });
      });
    };

    const go = (next) => {
      idx = ((next % panels.length) + panels.length) % panels.length;
      syncButtons();
      syncA11y();
      /* Pre-intro: fill active tab; after intro, stagger first visit per tab so nugget pop+shake runs while visible. */
      revealActivePanelCards();
    };

    root.addEventListener("pawfect:services-tab", (e) => {
      const id = e.detail?.id;
      if (!id || typeof id !== "string") return;
      const bi = buttons.findIndex((b) => b.getAttribute("data-tab-target") === id);
      if (bi < 0) return;
      pauseCarousel();
      go(bi);
      resumeCarousel();
    });

    buttons.forEach((btn, bi) => {
      btn.addEventListener("click", () => {
        pauseCarousel();
        go(bi);
        resumeCarousel();
      });
    });

    root.addEventListener("mouseenter", pauseCarousel);
    root.addEventListener("mouseleave", () => {
      window.requestAnimationFrame(() => {
        if (!root.matches(":focus-within")) resumeCarousel();
      });
    });
    root.addEventListener("focusin", pauseCarousel);
    root.addEventListener("focusout", (e) => {
      if (root.contains(e.relatedTarget)) return;
      window.requestAnimationFrame(() => {
        if (!root.matches(":focus-within")) resumeCarousel();
      });
    });

    syncButtons();
    syncA11y();

    const finishServicesIntro = () => {
      root.setAttribute("data-services-card-intro", "done");
      /*
       * Do not add is-visible to inactive tab panels here — animations run while
       * parent opacity is 0, so pop+shake never shows. go() / showActiveTabCardsInstant
       * reveals pills the first time each tab becomes active (visible).
       */
      resumeCarousel();
    };

    const runServicesScrollIntro = () => {
      const activeIdx = idx;
      const grid = panels[activeIdx]?.querySelector("[data-reveal-stagger]");
      if (!grid) {
        const fallbackGrid = panels[activeIdx]?.querySelector(".service-mini-grid");
        if (fallbackGrid) {
          const fbPills = fallbackGrid.querySelectorAll(":scope .reveal");
          const n = fbPills.length;
          revealStaggerChildrenSequential(fallbackGrid);
          const settleMs = Math.max(0, n - 1) * REVEAL_STAGGER_MS + 720;
          window.setTimeout(() => finishServicesIntro(), settleMs);
        } else {
          panels[activeIdx]
            ?.querySelectorAll(".service-pill.reveal")
            .forEach((el) => el.classList.add("is-visible"));
          finishServicesIntro();
        }
        return;
      }

      const pills = grid.querySelectorAll(":scope .reveal");
      const anyVisible = [...pills].some((el) => el.classList.contains("is-visible"));
      if (anyVisible) {
        finishServicesIntro();
        return;
      }

      const n = pills.length;
      revealStaggerChildrenSequential(grid);
      const settleMs = Math.max(0, n - 1) * REVEAL_STAGGER_MS + 720;
      window.setTimeout(() => {
        finishServicesIntro();
      }, settleMs);
    };

    const scrollChrome = root.querySelector(".services-tabs__scroll-chrome");

    if (scrollChrome && !reduceMotion) {
      scrollChrome.addEventListener("pawfect:services-chrome-visible", (e) => {
        if (!e.detail?.visible) {
          root.querySelectorAll(".service-pill.reveal").forEach((el) => {
            el.classList.remove("is-visible", "service-pill--shake-phase");
          });
          return;
        }
        window.requestAnimationFrame(() => {
          if (root.getAttribute("data-services-card-intro") !== "done") {
            runServicesScrollIntro();
            return;
          }
          revealActivePanelCards();
        });
      });

      root.addEventListener("animationend", (e) => {
        if (e.animationName !== "serviceNuggetEnter") return;
        const el = e.target;
        if (!(el instanceof HTMLElement)) return;
        if (!el.classList.contains("service-pill--nugget")) return;
        el.classList.add("service-pill--shake-phase");
      });
    } else if (reduceMotion) {
      panels.forEach((p) => {
        p.querySelectorAll(".service-pill.reveal").forEach((el) => {
          el.classList.add("is-visible");
        });
      });
      root.setAttribute("data-services-card-intro", "done");
    }

    if (root.getAttribute("data-services-card-intro") === "done") {
      resumeCarousel();
    }
  });
}

/**
 * Navbar / in-page links: open Services section tab (matches data-tab-target id).
 */
export function requestServicesTab(panelTargetId) {
  document
    .querySelector(".services-tabs[data-tabs-carousel]")
    ?.dispatchEvent(
      new CustomEvent("pawfect:services-tab", {
        bubbles: false,
        detail: { id: panelTargetId },
      }),
    );
}

/**
 * FAQ accordion: one button opens one panel; ARIA friendly.
 */
export function initFaq() {
  document.querySelectorAll("[data-faq-item]").forEach((item) => {
    const btn = item.querySelector("[data-faq-toggle]");
    const panel = item.querySelector("[data-faq-panel]");
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    });
  });
}

/**
 * Wellness plans table: horizontal scroll via ArrowLeft/ArrowRight (and Home/End) when the region is focused.
 */
export function initPlansTableKeyboardScroll() {
  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".plans-table-scroll").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;

    node.addEventListener("keydown", (e) => {
      if (node.scrollWidth <= node.clientWidth) return;

      const behavior = reduceMotion ? "auto" : "smooth";
      const step = Math.round(node.clientWidth * 0.35) || 120;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        node.scrollBy({ left: -step, behavior });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        node.scrollBy({ left: step, behavior });
      } else if (e.key === "Home") {
        e.preventDefault();
        node.scrollTo({ left: 0, behavior });
      } else if (e.key === "End") {
        e.preventDefault();
        node.scrollTo({ left: node.scrollWidth, behavior });
      }
    });
  });
}

/**
 * Optional: greeting that changes by time of day (small "dynamic" delight).
 */
export function initGreeting() {
  const el = document.querySelector("[data-greeting]");
  if (!el) return;

  const h = new Date().getHours();
  let msg = "Welcome";
  if (h < 12) msg = "Good morning";
  else if (h < 17) msg = "Good afternoon";
  else msg = "Good evening";

  const textNode = el.querySelector(".hero-kicker__text");
  if (textNode) {
    textNode.textContent = `${msg}, pet parent!`;
  } else {
    el.textContent = `${msg}, pet parent!`;
  }
  setAppState({ lastSection: "home" });
}

/**
 * Transparent navbar over hero; frosted “light” bar after scrolling past hero
 * (same idea as healthcare-ui-3 initHeaderScrollState).
 */
export function initHeaderHeroState() {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector("[data-hero]");
  if (!(header instanceof HTMLElement) || !(hero instanceof HTMLElement)) return;

  const apply = () => {
    const threshold = Math.max(hero.offsetHeight - 80, 0);
    const onLight = window.scrollY > threshold;
    header.classList.toggle("site-header--on-light", onLight);
  };

  apply();
  window.addEventListener("scroll", apply, { passive: true });
  window.addEventListener("resize", apply, { passive: true });
}
