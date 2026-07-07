const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Close the mobile menu after choosing a section link.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", targetId);
    }

    if (navLinks && menuToggle) {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("click", (event) => {
  if (!navLinks || !menuToggle || !navLinks.classList.contains("is-open")) {
    return;
  }

  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks && menuToggle) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 10);
});
