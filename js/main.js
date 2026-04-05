/**
 * Application entry — runs after DOM is ready.
 *
 * Walkthrough (why this order matters for learners):
 * 1. Footer year + images — cheap DOM updates; images fail soft via fallbacks in ui.js.
 * 2. Greeting + hero + header — visible “first paint” behaviors before heavy observers.
 * 3. Ripples + nav + dropdowns + tabs + FAQ + plans — interactive chrome users can tap immediately.
 * 4. Reels (doctors, pets, reviews) — injects DOM from data.js; safe after structure exists.
 * 5. Scroll reveal + parallax — IntersectionObserver + scroll listeners; can depend on layout.
 * 6. Router LAST — reads URL and scrolls to `data-section-id`; must run after all sections exist.
 *
 * There is no REST API: all “data” is static exports or inline HTML.
 */

import { initRouter } from "./router.js";
import { initPetReel } from "./petReel.js";
import { initScrollReveal, initParallax } from "./scrollReveal.js";
import { initRippleButtons } from "./ripple.js";
import { initHeroRotation } from "./heroRotation.js";
import { initHeroTitleWord } from "./heroTitleWord.js";
import {
  applyDynamicImages,
  initMobileNav,
  initDropdowns,
  initTabs,
  initFaq,
  initPlansTableKeyboardScroll,
  initGreeting,
  initHeaderHeroState,
} from "./ui.js";
import { initDoctorReel } from "./doctorReel.js";
import { initReviewsReel } from "./reviewsReel.js";

function boot() {
  /* Copyright year in footer — no env vars; pure client Date. */
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  /* Phase: content + hero */
  applyDynamicImages();
  initGreeting();
  initHeroRotation();
  initHeroTitleWord();
  initHeaderHeroState();
  /* Phase: chrome + forms of navigation */
  initRippleButtons();
  initMobileNav();
  initDropdowns();
  initTabs();
  initFaq();
  initPlansTableKeyboardScroll();
  /* Phase: section-specific widgets (see matching `data-*` roots in index.html) */
  initDoctorReel();
  initPetReel();
  initReviewsReel();
  /* Phase: motion (respects prefers-reduced-motion inside modules) */
  initScrollReveal();
  initParallax();
  /* Phase: URL ↔ scroll sync (History API); keep at end */
  initRouter();
}

/* DOMContentLoaded: ensures all inline HTML is parsed before we query sections. */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
