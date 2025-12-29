// =========================
// Smooth Scroll Enhancement
// =========================
document.documentElement.style.scrollBehavior = 'smooth';

// Add smooth scrolling for better UX with easing
let isScrolling = false;
let ticking = false;

// Smooth scroll function with easing
const smoothScroll = (target, duration = 800) => {
    const navHeight = 100; // navbar + padding height offset
    const start = window.pageYOffset;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    const distance = targetTop - start;
    let startTime = null;

    const easeInOutCubic = (t) => 
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            isScrolling = false;
        }
    };

    requestAnimationFrame(animation);
};

// Apply smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            smoothScroll(target, 800);
        }
    });
});

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
    if (menuToggle) {
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
};

const applyTheme = (theme) => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);

    const icon = toggle ? toggle.querySelector("i") : null;
    if (!icon) return;
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

// Theme toggle click handler with animation sequence
if (toggle) {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';

        const icon = toggle.querySelector('i');

        // disable further clicks
        toggle.style.pointerEvents = 'none';

        // start icon spin
        if (icon) icon.classList.add('rotate');

        // start full-screen box animation
        if (fx) fx.classList.add('run');

        // When the box fills the screen, swap theme behind the scenes
        const themeSwapDelay = 800; // ms — occurs while box is visible
        setTimeout(() => {
            applyTheme(next);
            try { localStorage.setItem(THEME_KEY, next); } catch (err) {}
        }, themeSwapDelay);

        // Cleanup after the animation finishes and re-enable clicks
        const cleanupDelay = 1600; // matches CSS total animation span
        setTimeout(() => {
            if (fx) fx.classList.remove('run');
            if (icon) icon.classList.remove('rotate');
            toggle.style.pointerEvents = '';
        }, cleanupDelay);
    });
}

// Contact Form handled by HTML (Formspree). Modal close behavior is defined later.


// =========================
// Hamburger Menu Toggle
// =========================
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
        } else {
            nav.classList.add('is-open');
            document.body.classList.add('menu-open');
            menuToggle.classList.add('is-active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    });
}

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
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

// Close project modal when X button is clicked
if (modal) {
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove("active");
        });
    }
}

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

// =========================
// Profile modal (pyramid) handlers
// =========================
const profileModal = document.getElementById('profileModal');
const profileClose = document.querySelector('.profile-modal-close');
const profileArrowBtn = document.querySelector('.profile-arrow');

if (profileArrowBtn && profileModal) {
    profileArrowBtn.addEventListener('click', () => {
        profileModal.classList.add('active');
    });
}

if (profileClose && profileModal) {
    profileClose.addEventListener('click', () => {
        profileModal.classList.remove('active');
    });
}

if (profileModal) {
    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) profileModal.classList.remove('active');
    });
}

// =========================
// Smooth Scroll - View More Button
// =========================
const viewMoreBtn = document.querySelector('.more');

if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
        const homeModal = document.getElementById('homeModal');
        if (homeModal) homeModal.classList.add('active');
    });
}

// Home modal close handler
const homeModal = document.getElementById('homeModal');
const homeModalClose = document.querySelector('.home-modal-close');
if (homeModalClose) {
    homeModalClose.addEventListener('click', () => {
        if (homeModal) homeModal.classList.remove('active');
    });
}
if (homeModal) {
    homeModal.addEventListener('click', (e) => {
        if (e.target === homeModal) homeModal.classList.remove('active');
    });
}

// =========================
// Contact Form (Formspree)
// =========================
// Submission is handled by Formspree via the form's HTML action POST.
// Keep only simple modal close behavior here (no submit interception).
const thankYouModal = document.getElementById('thankYouModal');
const thankYouBtn = document.querySelector('.simple-modal-btn');

if (thankYouBtn) {
    thankYouBtn.addEventListener('click', () => {
        if (thankYouModal) thankYouModal.classList.remove('active');
    });
}

if (thankYouModal) {
    thankYouModal.addEventListener('click', (e) => {
        if (e.target === thankYouModal) thankYouModal.classList.remove('active');
    });
}

// AJAX submit to Formspree to avoid redirect and show the thank-you modal
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        const url = contactForm.action;
        const formData = new FormData(contactForm);

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (res.ok) {
                if (thankYouModal) thankYouModal.classList.add('active');
                contactForm.reset();
            } else {
                let errMsg = 'Submission failed. Please try again.';
                try {
                    const data = await res.json();
                    if (data && data.error) errMsg = data.error;
                } catch (err) {}
                alert(errMsg);
            }
        } catch (err) {
            alert('Network error. Please check your connection and try again.');
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// =========================
// Scroll Reveal Animations - Child Elements
// =========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Apply to child elements within sections (not entire sections)
const childElements = document.querySelectorAll(
    '.about-left, .about-right, ' +
    '.skill-container, ' +
    '.project, ' +
    '.art-1, .art-2, .art-3, ' +
    '.contact-form'
);

childElements.forEach(element => {
    element.classList.add('scroll-reveal-child');
    scrollObserver.observe(element);
});

// Footer elements slide in
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

const leftContact = document.querySelector('.left-contact');
const sources = document.querySelector('.sources');

if (leftContact) {
    footerObserver.observe(leftContact);
}
if (sources) {
    footerObserver.observe(sources);
}
