const themeSelect = document.getElementById("themeSelect");
const typingText = document.getElementById("typingText");
const skillCards = document.querySelectorAll(".skill-card");
const skillDetail = document.getElementById("skillDetail");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Theme selector
const validThemes = ["gold", "blue", "purple", "green", "dark"];

function applyTheme(theme) {
  if (!validThemes.includes(theme)) {
    theme = "gold";
  }

  document.body.dataset.theme = theme;

  if (themeSelect) {
    themeSelect.value = theme;
  }

  try {
    localStorage.setItem("habiPortfolioTheme", theme);
  } catch (error) {
    // Theme still works if browser storage is unavailable.
  }
}

let savedTheme = "gold";

try {
  const storedTheme = localStorage.getItem("habiPortfolioTheme");

  if (validThemes.includes(storedTheme)) {
    savedTheme = storedTheme;
  }
} catch (error) {
  // Use the default theme.
}

applyTheme(savedTheme);

if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    applyTheme(themeSelect.value);
  });
}

// Keep "Aspiring Web Developer" unchanged
if (typingText) {
  typingText.textContent = "Aspiring Web Developer";
}

// Interactive skills
skillCards.forEach((card) => {
  card.setAttribute("aria-pressed", "false");

  card.addEventListener("click", () => {
    const wasSelected = card.classList.contains("selected");

    skillCards.forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
    });

    if (wasSelected) {
      skillDetail.classList.remove("active");
      detailTitle.textContent = "Choose a skill";
      detailDescription.textContent =
        "Select a card to see what the skill is used for.";
      return;
    }

    card.classList.add("selected");
    card.setAttribute("aria-pressed", "true");

    detailTitle.textContent = card.dataset.skill;
    detailDescription.textContent = card.dataset.description;
    skillDetail.classList.add("active");
  });
});

// Mobile navigation
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}