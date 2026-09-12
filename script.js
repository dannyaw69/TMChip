document.getElementById("year").textContent = new Date().getFullYear();

// ---- App screenshot slideshow (auto + manual) ----
(function () {
  const root = document.getElementById("appSlideshow");
  if (!root) return;

  const track = root.querySelector(".slide-track");
  const slides = Array.from(root.querySelectorAll(".slide"));
  const dotsWrap = root.querySelector(".slide-dots");
  const prevBtn = root.querySelector(".slide-nav.prev");
  const nextBtn = root.querySelector(".slide-nav.next");

  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    return;
  }

  let index = 0;
  const AUTOPLAY_MS = 4000;
  let timer = null;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Ke slide " + (i + 1));
    dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.querySelectorAll(".slide-dot"));

  function render() {
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dots.forEach((d, i) => d.setAttribute("aria-selected", i === index ? "true" : "false"));
  }

  function goTo(i, isManual) {
    index = (i + slides.length) % slides.length;
    render();
    if (isManual) restartAutoplay();
  }

  function next(isManual) { goTo(index + 1, isManual); }
  function prev(isManual) { goTo(index - 1, isManual); }

  function startAutoplay() {
    timer = setInterval(() => next(false), AUTOPLAY_MS);
  }
  function restartAutoplay() {
    clearInterval(timer);
    startAutoplay();
  }

  nextBtn.addEventListener("click", () => next(true));
  prevBtn.addEventListener("click", () => prev(true));

  // Pause on hover/focus, resume on leave (desktop convenience)
  root.addEventListener("mouseenter", () => clearInterval(timer));
  root.addEventListener("mouseleave", startAutoplay);

  // Basic swipe support for mobile
  let touchStartX = 0;
  root.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? next(true) : prev(true); }
  }, { passive: true });

  render();
  startAutoplay();

  // ---- Klik foto slide untuk membuka lightbox (foto diperbesar) ----
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    clearInterval(timer); // jeda slideshow selama lightbox terbuka
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImg.src = "";
    startAutoplay();
  }

  slides.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox(); // klik area gelap di luar foto juga menutup
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
})();
