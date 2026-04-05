/**
 * Pet parent stories: 4-column vertical infinite reel.
 * All columns scroll the same direction; duration per column differs (async waterfall).
 */

import { PARENT_REVIEWS, IMAGES, IMAGE_REMOTE_FALLBACK } from "./data.js";

/**
 * Seconds per full loop (shorter = faster). 3rd fastest; 2nd faster than 1st;
 * 1st a bit faster than before; 4th mid.
 */
const COLUMN_SECONDS = [48, 42, 26, 54];

/**
 * @param {HTMLImageElement} img
 * @param {string} key
 */
function bindImg(img, key) {
  const primary = IMAGES[key];
  const remote = IMAGE_REMOTE_FALLBACK[key];
  if (primary) img.src = primary;
  img.addEventListener(
    "error",
    () => {
      if (img.dataset.reviewImgOk === "1") return;
      img.dataset.reviewImgOk = "1";
      if (remote) img.src = remote;
    },
    { once: true },
  );
}

/**
 * @param {number} n
 */
function buildStars(n) {
  const wrap = document.createElement("div");
  wrap.className = "review-reel-card__stars";
  wrap.setAttribute("aria-label", `${n} out of 5 stars`);
  for (let i = 0; i < 5; i += 1) {
    const star = document.createElement("i");
    star.className = i < n ? "fas fa-star" : "far fa-star";
    star.setAttribute("aria-hidden", "true");
    wrap.appendChild(star);
  }
  return wrap;
}

/**
 * @param {import("./data.js").PARENT_REVIEWS[number]} r
 * @param {(x: import("./data.js").PARENT_REVIEWS[number]) => void} openModal
 */
function createReviewCard(r, openModal) {
  const article = document.createElement("article");
  article.className = "review-reel-card";
  article.tabIndex = 0;
  article.dataset.reviewId = r.id;
  article.setAttribute("role", "button");
  article.setAttribute("aria-haspopup", "dialog");
  article.setAttribute("aria-label", `Read full story: ${r.headline}`);

  const petImg = document.createElement("img");
  petImg.className = "review-reel-card__pet";
  petImg.alt = r.petAlt;
  petImg.width = 400;
  petImg.height = 280;
  petImg.decoding = "async";
  petImg.loading = "lazy";
  bindImg(petImg, r.petImageKey);

  const headline = document.createElement("p");
  headline.className = "review-reel-card__headline";
  headline.textContent = r.headline;

  const quote = document.createElement("p");
  quote.className = "review-reel-card__quote";
  quote.textContent = r.quote;

  const stars = buildStars(r.stars);

  const foot = document.createElement("footer");
  foot.className = "review-reel-card__user";

  const av = document.createElement("img");
  av.className = "review-reel-card__avatar";
  av.alt = "";
  av.width = 56;
  av.height = 56;
  av.decoding = "async";
  bindImg(av, r.avatarKey);

  const meta = document.createElement("div");
  meta.className = "review-reel-card__meta";
  const name = document.createElement("span");
  name.className = "review-reel-card__owner";
  name.textContent = r.ownerName;
  const role = document.createElement("span");
  role.className = "review-reel-card__profession";
  role.textContent = r.profession;
  meta.append(name, role);
  foot.append(av, meta);

  article.append(petImg, headline, quote, stars, foot);

  const open = () => openModal(r);
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
 * @param {import("./data.js").PARENT_REVIEWS[number]} r
 */
function fillReviewModal(dialog, r) {
  const body = dialog.querySelector("[data-review-modal-body]");
  if (!body) return;
  body.textContent = "";

  const shell = document.createElement("div");
  shell.className = "doctor-modal__grid";

  const imgCol = document.createElement("div");
  imgCol.className = "doctor-modal__media";
  const pet = document.createElement("img");
  pet.className = "doctor-modal__photo";
  pet.alt = r.petAlt;
  pet.decoding = "async";
  bindImg(pet, r.petImageKey);
  imgCol.appendChild(pet);

  const textCol = document.createElement("div");
  textCol.className = "doctor-modal__text";

  const h2 = document.createElement("h2");
  h2.id = "review-modal-title";
  h2.className = "doctor-modal__name";
  h2.textContent = r.headline;

  const stars = buildStars(r.stars);
  stars.className = "review-modal__stars";

  const bio = document.createElement("p");
  bio.className = "doctor-modal__bio";
  bio.textContent = r.modalQuote;

  const row = document.createElement("div");
  row.className = "review-modal__owner-row";
  const av = document.createElement("img");
  av.className = "review-modal__avatar";
  av.alt = "";
  av.decoding = "async";
  bindImg(av, r.avatarKey);
  const names = document.createElement("div");
  names.className = "review-modal__owner-meta";
  const ownerName = document.createElement("strong");
  ownerName.className = "review-modal__owner-name";
  ownerName.textContent = r.ownerName;
  const ownerRole = document.createElement("span");
  ownerRole.className = "review-modal__owner-role";
  ownerRole.textContent = r.profession;
  names.append(ownerName, ownerRole);
  row.append(av, names);

  textCol.append(h2, stars, bio, row);
  shell.append(imgCol, textCol);
  body.appendChild(shell);
}

export function initReviewsReel() {
  const root = document.querySelector("[data-reviews-reel]");
  const dialog = document.querySelector("#review-detail-dialog");
  if (!(root instanceof HTMLElement) || !(dialog instanceof HTMLDialogElement)) return;

  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cols = [...root.querySelectorAll("[data-reviews-col]")];
  if (cols.length !== 4) return;

  const closeBtn = dialog.querySelector(".doctor-modal__close");
  closeBtn?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  const openModal = (r) => {
    fillReviewModal(dialog, r);
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      closeBtn?.focus();
    }
  };

  cols.forEach((col, colIndex) => {
    if (!(col instanceof HTMLElement)) return;
    const items = PARENT_REVIEWS.filter((_, i) => i % 4 === colIndex);
    if (!items.length) return;

    col.textContent = "";
    const track = document.createElement("div");
    track.className = "reviews-reel__track";

    const appendSet = () => {
      for (const r of items) {
        track.appendChild(createReviewCard(r, openModal));
      }
    };
    appendSet();
    if (!reduceMotion) appendSet();

    const clip = document.createElement("div");
    clip.className = "reviews-reel__col-clip";
    clip.appendChild(track);
    col.appendChild(clip);

    if (reduceMotion) {
      col.classList.add("reviews-reel__col--static");
      return;
    }

    const sec = COLUMN_SECONDS[colIndex] ?? 55;
    track.style.setProperty("--reviews-reel-sec", String(sec));
  });
}
