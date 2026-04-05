/**
 * Application entry — runs after DOM is ready.
 * Order matters: images + UI chrome first, then scroll effects, then router.
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
  initGreeting,
  initHeaderHeroState,
} from "./ui.js";

function boot() {
  applyDynamicImages();
  initGreeting();
  initHeroRotation();
  initHeroTitleWord();
  initHeaderHeroState();
  initRippleButtons();
  initMobileNav();
  initDropdowns();
  initTabs();
  initFaq();
  initPetReel();
  initScrollReveal();
  initParallax();
  initRouter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
