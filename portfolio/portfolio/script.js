// =========================
// Constants & DOM Elements
// =========================
const toggle = document.getElementById("toggle");
const btn = toggle; // same as toggle
const fx = document.querySelector(".theme-process");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".links a");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const MOBILE_BREAKPOINT = 900;
const THEME_KEY = "preferred-theme";

// =========================
// Helper Functions
// =========================
const closeMenu = () => {
    if (!nav) return;
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
};

const applyTheme = (theme) => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);

    const icon = toggle ? toggle.querySelector("i") : null;
    if (!icon) return;

    icon.classList.remove("rotate");
    if (theme === "light") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
};

// =========================
// Initialize Theme
// =========================
if (toggle) {
    const storedTheme = localStorage.getItem(THEME_KEY);
    const initialTheme = storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(initialTheme);
}

// =========================
// Mobile Menu
// =========================
if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        document.body.classList.toggle("menu-open", isOpen);
    });
}

if (navLinks.length && nav) {
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
        closeMenu();
    }
});

// =========================
// Theme Toggle Animation
// =========================
if (toggle) {
    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        btn.style.pointerEvents = "none";

        fx.classList.remove("run");
        void fx.offsetWidth; // trigger reflow
        fx.classList.add("run");

        const icon = toggle.querySelector("i");
        if (icon) {
            void icon.offsetWidth; // trigger reflow
            icon.classList.add("rotate");
        }
    });
}

fx.addEventListener("animationend", (e) => {
    if (e.animationName === "expand") {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";

        applyTheme(newTheme);
        localStorage.setItem("preferred-theme", newTheme);
    }

    if (e.animationName === "submerge") {
        btn.style.pointerEvents = "auto";
    }
});

// =========================
// Modal Gallery
// =========================
let images = [];
let index = 0;

document.querySelectorAll(".view").forEach(btn => {
    btn.addEventListener("click", () => {
        modalTitle.textContent = btn.dataset.title;
        images = JSON.parse(btn.dataset.images);
        index = 0;
        modalImage.src = images[index];
        modal.classList.add("active");
    });
});

document.querySelector(".modal-close").onclick = () => {
    modal.classList.remove("active");
};

const fadeToImage = (newIndex) => {
    modalImage.style.opacity = "0";

    setTimeout(() => {
        index = newIndex;
        modalImage.src = images[index];
        modalImage.style.opacity = "1";
    }, 200);
};

document.querySelector(".next").onclick = () => {
    fadeToImage((index + 1) % images.length);
};

document.querySelector(".prev").onclick = () => {
    fadeToImage((index - 1 + images.length) % images.length);
};

modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
});
