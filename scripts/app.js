/* ══════════════════════════════════════════
   XV AÑOS FERNANDA — app.js
   ══════════════════════════════════════════ */

// ─── PORTADA: carga inmediata ─────────────────────────────────────────────────
// La portada usa un <img> real (#hero-img) para garantizar
// carga inmediata sin depender de visibilidad ni CSS.
const heroImg    = document.getElementById("hero-img");
const heroImages = ["images/1.jpg", "images/2.jpg", "images/3.jpg"];
let heroIndex    = 0;

function setHeroImage(src) {
  if (heroImg) heroImg.src = src;
}

// Rotación cada 5 minutos (la primera imagen ya está en el HTML)
setInterval(() => {
  heroIndex = (heroIndex + 1) % heroImages.length;
  setHeroImage(heroImages[heroIndex]);
}, 300000);


// ─── FONDO DE CUERPO AL SCROLL ────────────────────────────────────────────────
const bgImages = ["images/1.jpeg", "images/6.jpeg"];
let currentBg = "";

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const threshold = document.body.scrollHeight * 0.4;
  const newBg = scroll > threshold ? bgImages[1] : bgImages[0];

  if (newBg !== currentBg) {
    currentBg = newBg;
    document.body.style.backgroundImage = `url('${newBg}')`;
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }
}, { passive: true });


// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
const countdownEl = document.getElementById("countdown");
const eventDate   = new Date("July 24, 2026 18:00:00").getTime();

function updateCountdown() {
  const diff = eventDate - Date.now();
  if (diff <= 0) {
    countdownEl.textContent = "¡Hoy es el gran día! 🎉";
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000)  / 60000);
  const s = Math.floor((diff % 60000)    / 1000);
  countdownEl.innerHTML =
    `<span>${d}</span><small>d</small> · <span>${h}</span><small>h</small> · <span>${m}</span><small>m</small> · <span>${s}</span><small>s</small>`;
}
updateCountdown();
setInterval(updateCountdown, 1000);


// ─── MÚSICA ───────────────────────────────────────────────────────────────────
const music    = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
let isPlaying  = false;

function playMusic() {
  music.play().then(() => {
    isPlaying  = true;
    musicBtn.textContent = "🔊";
  }).catch(() => {
    // El navegador bloqueó el autoplay, no pasa nada
  });
}

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.textContent = "🔇";
  } else {
    music.play();
    musicBtn.textContent = "🔊";
  }
  isPlaying = !isPlaying;
});


// ─── PANTALLA DE BIENVENIDA ───────────────────────────────────────────────────
const welcomeScreen = document.getElementById("welcome-screen");
const welcomeBtn    = document.getElementById("welcome-btn");

welcomeBtn.addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  // Intentar reproducir música al interactuar
  playMusic();
});


// ─── FADE-IN AL SCROLL ───────────────────────────────────────────────────────
const fadeSections = document.querySelectorAll(".fade-section");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      sectionObserver.unobserve(entry.target); // solo anima una vez
    }
  });
}, { threshold: 0.12 });

fadeSections.forEach(s => sectionObserver.observe(s));


// ─── GALERÍA CON TOUCH/SWIPE ──────────────────────────────────────────────────
const track  = document.getElementById("galleryTrack");
const dotsWrap = document.getElementById("galleryDots");

if (track) {
  const imgs     = track.querySelectorAll("img");
  const total    = imgs.length;
  let current    = 0;
  let touchStartX = 0;
  let isDragging  = false;

  // Crear dots
  imgs.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "gallery-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Foto ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll(".gallery-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  // Auto-avance cada 4 s
  let autoSlide = setInterval(() => goTo(current + 1), 4000);
  function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => goTo(current + 1), 4000);
  }

  // Touch/swipe
  track.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
    isDragging  = true;
  }, { passive: true });

  track.addEventListener("touchend", e => {
    if (!isDragging) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAuto();
    }
    isDragging = false;
  }, { passive: true });
}


// ─── BOTÓN VOLVER ARRIBA ─────────────────────────────────────────────────────
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});