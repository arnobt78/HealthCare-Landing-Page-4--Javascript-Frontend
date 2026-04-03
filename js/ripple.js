/**
 * Vanilla ripple on click (see docs/RIPPLE_BUTTON_EFFECT.md).
 * Buttons/links need .btn-ripple, position relative, overflow hidden.
 */
export function initRippleButtons() {
  document.querySelectorAll(".btn-ripple").forEach((btn) => {
    btn.style.position = "relative";
    btn.style.overflow = "hidden";

    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement("span");
      ripple.className = btn.classList.contains("btn-ripple--outline")
        ? "btn-ripple-fx btn-ripple-fx--outline"
        : "btn-ripple-fx";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      btn.appendChild(ripple);
      ripple.addEventListener(
        "animationend",
        () => {
          ripple.remove();
        },
        { once: true },
      );
    });
  });
}
