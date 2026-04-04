/**
 * UI behaviors: mobile nav, dropdown, tabs, FAQ accordion, dynamic images.
 */

import { IMAGES, IMAGE_REMOTE_FALLBACK } from "./data.js";
import { setAppState } from "./appContext.js";

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
 * Tab panels: buttons with data-tab-target match id on panels.
 */
export function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const buttons = root.querySelectorAll("[data-tab-target]");
    const panels = root.querySelectorAll("[data-tab-panel]");

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
    activate(defaultBtn ? defaultBtn.getAttribute("data-tab-target") : buttons[0]?.getAttribute("data-tab-target"));
  });
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
