// 🎞️ CAMBIO DE PORTADA CADA 5 MINUTOS
const hero = document.getElementById("hero");

const images = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg"
];

let index = 0;

function changeHero() {
    hero.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
}

setInterval(changeHero, 300000); // 5 minutos
changeHero();


// ⏳ COUNTDOWN
const countdown = document.getElementById("countdown");
const eventDate = new Date("July 24, 2026 18:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = eventDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdown.innerHTML = `${d}d | ${h}h | ${m}m | ${s}s`;
}, 1000);


// 🧠 CAMBIO DE FONDO AL SCROLL
window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const half = document.body.scrollHeight / 2;

    if (scroll > half*.68) {
        document.body.style.backgroundImage = "url('images/6.jpeg')";
    } else {
        document.body.style.backgroundImage = "url('images/1.jpeg')";
    }

    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
});

// 🌫️ Fade in al hacer scroll
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);
});

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

// Intento de autoplay (requiere interacción en muchos navegadores)
window.addEventListener("click", () => {
    if (!isPlaying) {
        music.play();
        isPlaying = true;
    }
}, { once: true });

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

// 🔝 BOTÓN VOLVER ARRIBA

const backToTop = document.getElementById("backToTop");

// Mostrar botón después de cierto scroll
window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

// Scroll suave hacia arriba
backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});