/* ══════════════════════════════════════════════════════
   XV AÑOS FERNANDA — app.js
══════════════════════════════════════════════════════ */

// ─── REFERENCIAS ────────────────────────────────────
const music        = document.getElementById("music");
const musicBtn     = document.getElementById("musicBtn");
const backToTop    = document.getElementById("backToTop");
const countdown    = document.getElementById("countdown");
const modal        = document.getElementById("welcomeModal");
const btnConSonido = document.getElementById("btnConSonido");
const btnSinSonido = document.getElementById("btnSinSonido");

let isPlaying = false;

// ─── MODAL DE BIENVENIDA ─────────────────────────────
// Se muestra automáticamente. Al pulsar el botón, se cierra
// y (si eligieron con sonido) se reproduce la música.

function cerrarModal(conSonido) {
    modal.classList.add("hidden");

    setTimeout(() => {
        modal.style.display = "none";
    }, 600); // Esperar a que termine la transición

    if (conSonido) {
        music.volume = 0;
        music.play().then(() => {
            fadeInMusic();
            isPlaying = true;
            musicBtn.innerHTML = "🔊";
        }).catch(err => {
            // Si el navegador sigue bloqueando, se ignora silenciosamente
            console.warn("Autoplay bloqueado:", err);
        });
    }
}

function fadeInMusic() {
    let vol = 0;
    const interval = setInterval(() => {
        vol = Math.min(vol + 0.05, 0.7);
        music.volume = vol;
        if (vol >= 0.7) clearInterval(interval);
    }, 150);
}

btnConSonido.addEventListener("click", () => cerrarModal(true));
btnSinSonido.addEventListener("click", () => cerrarModal(false));

// ─── BOTÓN DE MÚSICA ─────────────────────────────────
musicBtn.addEventListener("click", () => {
    if (isPlaying) {
        music.pause();
        musicBtn.innerHTML = "🔇";
    } else {
        music.play();
        musicBtn.innerHTML = "🔊";
    }
    isPlaying = !isPlaying;
});

// ─── PORTADA ─────────────────────────────────────────
// ⚠️ FIX: La imagen se define en CSS directamente (#hero background-image)
//    para que cargue al instante. Aquí solo cambiamos el fondo del body
//    al hacer scroll (sin tocar el hero).

const bgImages = ["images/1.jpeg", "images/6.jpeg"];

window.addEventListener("scroll", () => {
    const scroll  = window.scrollY;
    const half    = document.body.scrollHeight / 2;
    const newImg  = scroll > half * 0.633 ? bgImages[1] : bgImages[0];

    document.body.style.backgroundImage    = `url('${newImg}')`;
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize    = "cover";
    document.body.style.backgroundPosition = "center";

    // Botón volver arriba
    if (scroll > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

// ─── BOTÓN VOLVER ARRIBA ─────────────────────────────
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ─── COUNTDOWN ───────────────────────────────────────
const eventDate = new Date("July 24, 2026 17:00:00").getTime();

function updateCountdown() {
    const now  = Date.now();
    const diff = eventDate - now;

    if (diff <= 0) {
        countdown.innerHTML = "¡Hoy es el gran día! 🎉";
        return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    countdown.innerHTML = `${d}<small>d</small> ${h}<small>h</small> ${m}<small>m</small> ${s}<small>s</small>`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ─── FADE-IN AL SCROLL ───────────────────────────────
const fadeSections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Solo una vez
        }
    });
}, { threshold: 0.15 });

fadeSections.forEach(s => observer.observe(s));

// ─── CARRUSEL DE GALERÍA ─────────────────────────────
const track  = document.querySelector(".carousel-track");
const dots   = document.querySelectorAll(".dot");
let current  = 0;
let carouselTimer;

function goToSlide(idx) {
    current = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));
}

function nextSlide() {
    const total = track ? track.children.length : 0;
    goToSlide((current + 1) % total);
}

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        clearInterval(carouselTimer);
        goToSlide(parseInt(dot.dataset.idx));
        carouselTimer = setInterval(nextSlide, 3500);
    });
});

// Swipe en móvil
if (track) {
    let startX = 0;

    track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            clearInterval(carouselTimer);
            const total = track.children.length;
            if (diff > 0) goToSlide((current + 1) % total);
            else          goToSlide((current - 1 + total) % total);
            carouselTimer = setInterval(nextSlide, 3500);
        }
    }, { passive: true });
}

carouselTimer = setInterval(nextSlide, 3500);