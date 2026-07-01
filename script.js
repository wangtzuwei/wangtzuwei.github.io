const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));

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
    themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
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
