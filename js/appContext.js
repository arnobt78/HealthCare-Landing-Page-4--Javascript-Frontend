/**
 * Tiny "context" pattern (like React Context in spirit, but vanilla).
 * Subscribers run whenever state changes — useful for theme toggles or nav UI.
 *
 * This is NOT React; there are no hooks here. We use a simple store + listeners.
 *
 * Educational note: today `initGreeting` only patches `lastSection`; you could add
 * `subscribe()` in a new module to react to global UI state without prop-drilling.
 */

/** @type {{ theme: string, lastSection: string }} */
let state = {
  theme: "pawfect",
  lastSection: "home",
};

const listeners = new Set();

/**
 * @param {(s: typeof state) => void} fn
 * @returns {() => void} unsubscribe
 */
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  listeners.forEach((fn) => {
    fn(state);
  });
}

/**
 * @param {Partial<typeof state>} patch
 */
export function setAppState(patch) {
  state = { ...state, ...patch };
  notify();
}

export function getAppState() {
  return { ...state };
}
