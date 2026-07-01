const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));

const iconPaths = {
  "award": '<circle cx="12" cy="8" r="5"></circle><path d="m8.5 12.5-1.4 7 4.9-2.9 4.9 2.9-1.4-7"></path>',
  "brain": '<path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-1.3 5.5A3.1 3.1 0 0 0 6 18v1a3 3 0 0 0 5 2.2"></path><path d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 1.3 5.5A3.1 3.1 0 0 1 18 18v1a3 3 0 0 1-5 2.2"></path><path d="M12 4v16"></path>',
  "calendar": '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18"></path>',
  "chart": '<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="m8 15 3-4 3 2 4-6"></path>',
  "code": '<path d="m9 18-6-6 6-6"></path><path d="m15 6 6 6-6 6"></path>',
  "database": '<ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path>',
  "download": '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>',
  "edit": '<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>',
  "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path><path d="M8 13h8"></path><path d="M8 17h6"></path>',
  "flask": '<path d="M10 2v6L4.7 18.2A2.7 2.7 0 0 0 7.1 22h9.8a2.7 2.7 0 0 0 2.4-3.8L14 8V2"></path><path d="M8 2h8"></path><path d="M6.8 17h10.4"></path>',
  "globe": '<circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 0 20"></path><path d="M12 2a15.3 15.3 0 0 0 0 20"></path>',
  "graduation": '<path d="m22 10-10-5-10 5 10 5 10-5Z"></path><path d="M6 12v5c3.5 2 8.5 2 12 0v-5"></path><path d="M22 10v6"></path>',
  "home": '<path d="m3 10 9-7 9 7"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path>',
  "lightbulb": '<path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.9.7-1.5 1.7-1.5 2.5h-4c0-.8-.6-1.8-1.5-2.5Z"></path>',
  "linkedin": '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',
  "mail": '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path>',
  "map-pin": '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle>',
  "medal": '<path d="m7 2 5 7 5-7"></path><path d="M12 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"></path><path d="m12 13 1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L9 15.3l2-.3Z"></path>',
  "microscope": '<path d="M6 18h8"></path><path d="M3 22h18"></path><path d="M14 22a7 7 0 0 0-7-7"></path><path d="m9 14 6-6"></path><path d="m15 8 3-3"></path><path d="m12 6 6 6"></path>',
  "plane": '<path d="M22 2 11 13"></path><path d="m22 2-7 20-4-9-9-4Z"></path>',
  "presentation": '<rect x="3" y="4" width="18" height="12" rx="1"></rect><path d="M12 16v5"></path><path d="m8 21 4-5 4 5"></path>',
  "sparkles": '<path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z"></path><path d="M19 3v4"></path><path d="M21 5h-4"></path><path d="M5 17v3"></path><path d="M6.5 18.5h-3"></path>',
  "trophy": '<path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"></path><path d="M5 5H3v2a4 4 0 0 0 4 4"></path><path d="M19 5h2v2a4 4 0 0 1-4 4"></path>',
  "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.9"></path><path d="M16 3.1a4 4 0 0 1 0 7.8"></path>',
  "zap": '<path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z"></path>',
};

document.querySelectorAll("[data-icon]").forEach((element) => {
  const icon = iconPaths[element.dataset.icon];
  if (!icon) return;
  element.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icon}</svg>`;
});

const storedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
  }
}

setTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
}

const currentPage = location.pathname.split("/").pop() || "index.html";
navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  link.classList.toggle("is-active", href === currentPage);
});
