// Slide navigation: arrows, keys, click, swipe, hash deep-links, fullscreen
(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const counter = document.getElementById("counter");
  const bar = document.getElementById("bar");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const fsBtn = document.getElementById("fs");
  let current = 0;

  function clamp(i) {
    return Math.max(0, Math.min(slides.length - 1, i));
  }

  function show(i, push = true) {
    current = clamp(i);
    slides.forEach((s, idx) => {
      s.classList.toggle("active", idx === current);
      s.classList.toggle("past", idx < current);
    });
    counter.textContent = `${current + 1} / ${slides.length}`;
    bar.style.width = `${((current + 1) / slides.length) * 100}%`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === slides.length - 1;
    if (push) history.replaceState(null, "", `#${current + 1}`);
  }

  const next = () => show(current + 1);
  const prev = () => show(current - 1);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  fsBtn.addEventListener("click", toggleFullscreen);

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Home": show(0); break;
      case "End": show(slides.length - 1); break;
      case "f":
      case "F": toggleFullscreen(); break;
    }
  });

  // Click right half = next, left third = previous
  document.getElementById("deck").addEventListener("click", (e) => {
    const x = e.clientX / window.innerWidth;
    if (x > 0.33) next(); else prev();
  });

  // Touch swipe
  let startX = null;
  document.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    startX = null;
  });

  // Deep link: index.html#5 opens slide 5
  window.addEventListener("hashchange", () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (!isNaN(n)) show(n - 1, false);
  });

  const start = parseInt(location.hash.slice(1), 10);
  show(isNaN(start) ? 0 : start - 1, false);
})();
