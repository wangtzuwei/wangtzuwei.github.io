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

const chessRatings = document.querySelector("[data-chess-ratings]");

if (chessRatings) {
  const ratingNodes = Array.from(
    chessRatings.querySelectorAll("[data-chess-rating]"),
  );
  const chessStatus = document.querySelector("[data-chess-status]");
  const chessController = new AbortController();
  const chessTimeout = window.setTimeout(() => chessController.abort(), 4500);

  fetch("https://api.chess.com/pub/player/tzuweiw/stats", {
    headers: { Accept: "application/json" },
    signal: chessController.signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Chess.com ratings unavailable");
      }
      return response.json();
    })
    .then((stats) => {
      let visibleRatings = 0;

      ratingNodes.forEach((node) => {
        const rating = stats[node.dataset.chessRating]?.last?.rating;

        if (Number.isFinite(rating)) {
          node.textContent = rating.toLocaleString("en-US");
          visibleRatings += 1;
        } else {
          node.textContent = "--";
          node.parentElement.classList.add("is-unavailable");
        }
      });

      if (chessStatus) {
        chessStatus.textContent = visibleRatings
          ? "Live public Chess.com ratings."
          : "Current ratings are linked on the profile.";
      }
    })
    .catch(() => {
      chessRatings.hidden = true;
      if (chessStatus) {
        chessStatus.textContent = "Current ratings are linked on the profile.";
      }
    })
    .finally(() => {
      window.clearTimeout(chessTimeout);
    });
}
