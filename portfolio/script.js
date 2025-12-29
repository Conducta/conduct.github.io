// =========================
// Constants & DOM Elements
// =========================
const toggle = document.getElementById("toggle");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".links a");
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
// Theme Initialization
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
// Theme Toggle
// =========================
if (toggle) {
    toggle.addEventListener("click", (e) => {
        e.preventDefault();

        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";

        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);

        const icon = toggle.querySelector("i");
        if (icon) {
            void icon.offsetWidth; // force reflow to restart rotation
            icon.classList.add("rotate");
        }
    });
}
