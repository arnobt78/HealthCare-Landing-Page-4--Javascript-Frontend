/**
 * Team section: horizontal doctor reel (infinite marquee for “All roles” only),
 * category filter, dialog profiles.
 *
 * Data source: TEAM_MEMBERS in data.js (no API). Cards are created in JS so the
 * filter can rebuild the track; `<dialog>` uses the native modal API (`showModal`).
 */

import { TEAM_MEMBERS, IMAGES, IMAGE_REMOTE_FALLBACK } from "./data.js";

/**
 * @param {HTMLImageElement} img
 * @param {string} key
 */
function bindTeamImg(img, key) {
  const primary = IMAGES[key];
  const remote = IMAGE_REMOTE_FALLBACK[key];
  if (primary) img.src = primary;
  img.addEventListener(
    "error",
    () => {
      if (img.dataset.teamImgOk === "1") return;
      img.dataset.teamImgOk = "1";
      if (remote) img.src = remote;
    },
    { once: true },
  );
}

/**
 * @param {typeof TEAM_MEMBERS[number]} member
 * @param {(m: typeof TEAM_MEMBERS[number]) => void} openModal
 */
function createDoctorCard(member, openModal) {
  const article = document.createElement("article");
  article.className = "doctor-reel__card team-card";
  article.tabIndex = 0;
  article.dataset.doctorId = member.id;
  article.setAttribute("role", "button");
  article.setAttribute("aria-haspopup", "dialog");
  article.setAttribute("aria-label", `View profile: ${member.name}`);

  const img = document.createElement("img");
  img.alt = member.alt;
  img.width = 600;
  img.height = 600;
  img.decoding = "async";
  img.loading = "lazy";
  bindTeamImg(img, member.imageKey);

  const body = document.createElement("div");
  body.className = "team-card-body";

  const role = document.createElement("span");
  role.className = "team-role";
  role.textContent = member.role;

  const h3 = document.createElement("h3");
  h3.textContent = member.name;

  const p = document.createElement("p");
  p.textContent = member.shortBio;

  body.append(role, h3, p);
  article.append(img, body);

  const open = () => openModal(member);
  article.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });
  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  return article;
}

/**
 * @param {HTMLDialogElement} dialog
 * @param {typeof TEAM_MEMBERS[number]} member
 */
function fillModal(dialog, member) {
  const body = dialog.querySelector("[data-doctor-modal-body]");
  if (!body) return;

  body.textContent = "";

  const shell = document.createElement("div");
  shell.className = "doctor-modal__grid";

  const imgCol = document.createElement("div");
  imgCol.className = "doctor-modal__media";
  const img = document.createElement("img");
  img.className = "doctor-modal__photo";
  img.alt = member.alt;
  img.decoding = "async";
  bindTeamImg(img, member.imageKey);
  imgCol.appendChild(img);

  const textCol = document.createElement("div");
  textCol.className = "doctor-modal__text";

  const h2 = document.createElement("h2");
  h2.id = "doctor-modal-name";
  h2.className = "doctor-modal__name";
  h2.textContent = member.name;

  const badge = document.createElement("span");
  badge.className = "team-role doctor-modal__role";
  badge.textContent = member.role;

  const icons = document.createElement("div");
  icons.className = "doctor-modal__icons";
  icons.setAttribute("aria-hidden", "true");
  for (const ico of ["fa-heart", "fa-user-md", "fa-calendar-check"]) {
    const i = document.createElement("i");
    i.className = `fas ${ico}`;
    icons.appendChild(i);
  }

  const bio = document.createElement("p");
  bio.className = "doctor-modal__bio";
  bio.textContent = member.bio;

  const tagWrap = document.createElement("div");
  tagWrap.className = "doctor-modal__tags";
  for (const t of member.tags) {
    const tag = document.createElement("span");
    tag.className = "doctor-modal__tag";
    tag.textContent = t;
    tagWrap.appendChild(tag);
  }

  textCol.append(h2, badge, icons, bio, tagWrap);
  shell.append(imgCol, textCol);
  body.appendChild(shell);
}

/**
 * @param {HTMLElement} root
 * @param {HTMLDialogElement} dialog
 * @param {HTMLSelectElement} select
 * @param {HTMLElement} track
 * @param {HTMLButtonElement | null} clearBtn
 */
function renderTeam(root, dialog, select, track, clearBtn) {
  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cat = select.value;
  const filtered =
    cat === "all" ? [...TEAM_MEMBERS] : TEAM_MEMBERS.filter((m) => m.category === cat);

  if (clearBtn) clearBtn.hidden = cat === "all";

  track.textContent = "";
  track.style.animation = "none";

  /* Duplicate cards only for the full-team infinite loop; filtered views show each person once. */
  const useMarquee = !reduceMotion && cat === "all" && filtered.length > 1;

  const viewport = root.querySelector(".doctor-reel__viewport");
  if (viewport instanceof HTMLElement) {
    viewport.classList.toggle("doctor-reel__viewport--static", !useMarquee || filtered.length <= 1);
  }

  const openModal = (member) => {
    fillModal(dialog, member);
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      const closeBtn = dialog.querySelector(".doctor-modal__close");
      if (closeBtn instanceof HTMLElement) closeBtn.focus();
    }
  };

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "doctor-reel__empty";
    empty.textContent = "No team members in this category yet.";
    track.appendChild(empty);
    return;
  }

  const appendCards = (dup) => {
    for (const member of filtered) {
      track.appendChild(createDoctorCard(member, openModal));
    }
    if (dup) {
      for (const member of filtered) {
        track.appendChild(createDoctorCard(member, openModal));
      }
    }
  };

  if (useMarquee) {
    appendCards(true);
    const n = filtered.length;
    track.style.setProperty("--doctor-reel-seconds", String(Math.max(36, n * 9)));
  } else {
    appendCards(false);
  }

  let pauseDepth = 0;
  const setPaused = (on) => {
    track.style.animationPlayState = on ? "paused" : "running";
  };

  if (useMarquee) {
    track.querySelectorAll(".doctor-reel__card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        pauseDepth += 1;
        if (pauseDepth === 1) setPaused(true);
      });
      card.addEventListener("mouseleave", () => {
        pauseDepth = Math.max(0, pauseDepth - 1);
        if (pauseDepth === 0) setPaused(false);
      });
    });
  }

  if (useMarquee) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        track.style.animation = "";
      });
    });
  }
}

export function initDoctorReel() {
  const root = document.querySelector("[data-doctor-reel]");
  const dialog = document.querySelector("#doctor-detail-dialog");
  const select = document.querySelector("#team-category-filter");
  const clearBtn = document.querySelector("#team-filter-clear");
  const track = root?.querySelector(".doctor-reel__track");

  if (!(root instanceof HTMLElement) || !(dialog instanceof HTMLDialogElement) || !track) return;
  if (!(select instanceof HTMLSelectElement)) return;

  const closeBtn = dialog.querySelector(".doctor-modal__close");
  closeBtn?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  const refresh = () =>
    renderTeam(
      root,
      dialog,
      select,
      track,
      clearBtn instanceof HTMLButtonElement ? clearBtn : null,
    );

  select.addEventListener("change", refresh);
  if (clearBtn instanceof HTMLButtonElement) {
    clearBtn.addEventListener("click", () => {
      select.value = "all";
      refresh();
    });
  }
  refresh();
}
