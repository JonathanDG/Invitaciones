// HERO IMAGES

const hero = document.getElementById("hero");

const heroImages = [
    "images/1.jpeg",
    "images/2.jpeg",
    "images/3.jpeg"
];

let heroIndex = 0;

function changeHeroImage() {

    hero.style.backgroundImage =
        `url(${heroImages[heroIndex]})`;

    heroIndex =
        (heroIndex + 1) % heroImages.length;
}

changeHeroImage();

setInterval(changeHeroImage, 300000);

// COUNTDOWN

const eventDate =
    new Date("July 24, 2026 18:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const diff = eventDate - now;

    const days =
        Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor((diff / (1000 * 60 * 60)) % 24);

    const minutes =
        Math.floor((diff / (1000 * 60)) % 60);

    const seconds =
        Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerHTML =
        days;

    document.getElementById("hours").innerHTML =
        hours;

    document.getElementById("minutes").innerHTML =
        minutes;

    document.getElementById("seconds").innerHTML =
        seconds;
}

setInterval(updateCountdown, 1000);

updateCountdown();

// FADE SECTIONS

const sections =
    document.querySelectorAll(".section");

const observer =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");
            }

        });

    }, {
        threshold: 0.15
    });

sections.forEach(section => {

    observer.observe(section);

});

// MUSIC




// BACK TO TOP

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"
    });

});

// =========================
// WELCOME MODAL + MUSIC
// =========================

const welcomeModal =
    document.getElementById("welcomeModal");

const startExperience =
    document.getElementById("startExperience");

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");

let playing = false;

startExperience.addEventListener("click", () => {

    // reproducir música

    music.play();

    playing = true;

    // cambiar icono

    musicBtn.innerHTML =
        '<i class="bi bi-volume-up-fill"></i>';

    // ocultar modal

    welcomeModal.classList.add("hide");

});

musicBtn.addEventListener("click", () => {

    if (playing) {

        music.pause();

        musicBtn.innerHTML =
            '<i class="bi bi-volume-mute-fill"></i>';

    } else {

        music.play();

        musicBtn.innerHTML =
            '<i class="bi bi-volume-up-fill"></i>';
    }

    playing = !playing;
});