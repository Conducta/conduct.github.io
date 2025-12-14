const toggle = document.getElementById("toggle");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".links a");
const MOBILE_BREAKPOINT = 900;
const THEME_KEY = "preferred-theme";

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



// initialize theme from storage
if (toggle) {
    const storedTheme = localStorage.getItem(THEME_KEY);
    const initialTheme = storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(initialTheme);
}

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        document.body.classList.toggle("menu-open", isOpen);
    });
}

if (navLinks.length && nav) {
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
        closeMenu();
    }
});

if (toggle) {
    toggle.addEventListener("click", (e) => {
        e.preventDefault();

        // disable button
        btn.style.pointerEvents = "none";

        // start the effect
        fx.classList.remove("run");
        void fx.offsetWidth;
        fx.classList.add("run");

        // rotate icon visually but NO theme changes yet
        const icon = toggle.querySelector("i");
        if (icon) {
            void icon.offsetWidth;
            icon.classList.add("rotate");
        }
    });
}


const btn = document.getElementById("toggle");
const fx = document.querySelector(".theme-process");

btn.addEventListener("click", () => {
    btn.style.pointerEvents = "none";
    fx.classList.remove("run");
    void fx.offsetWidth;
    fx.classList.add("run");
});

fx.addEventListener("animationend", (e) => {
    if (e.animationName === "expand") {
        // switch theme here
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";

        applyTheme(newTheme);
        localStorage.setItem("preferred-theme", newTheme);
    }

    // and only after EVERYTHING is done, re-enable button
    if (e.animationName === "submerge") {
        btn.style.pointerEvents = "auto";
    }
});
