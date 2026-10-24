const themeSelect = document.getElementById("themeSelect");
const typingText = document.getElementById("typingText");
const skillCards = document.querySelectorAll(".skill-card");
const skillDetail = document.getElementById("skillDetail");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const sections = Array.from(document.querySelectorAll("main .section"));
let currentSection = document.querySelector(".active-section") || sections[0];

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
    // The theme still works if storage is unavailable.
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

// Keep the title unchanged.
if (typingText) {
  typingText.textContent = "Aspiring Web Developer";
}

// Switch sections without scrolling the page.
function showSection(sectionId) {
  const targetSection = document.getElementById(sectionId);

  if (!targetSection || !targetSection.classList.contains("section")) {
    return;
  }

  sections.forEach((section) => {
    section.classList.remove("active-section", "section-slide-in");
  });

  targetSection.classList.add("active-section");
  void targetSection.offsetWidth;
  targetSection.classList.add("section-slide-in");

  currentSection = targetSection;

  // Close the mobile menu after navigation.
  if (navLinks && menuToggle) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }
}

// Next buttons switch the visible section; no scrollIntoView().
document.querySelectorAll(".section-next-btn[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    showSection(button.dataset.next);
  });
});

// Navbar, logo, hero buttons and footer links also switch sections
// without scrolling the page.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(sectionId);

    if (targetSection && targetSection.classList.contains("section")) {
      event.preventDefault();
      showSection(sectionId);
    }
  });
});

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

// Mobile navigation menu
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}

// Seven-colour cursor glow
const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
cursorGlow.setAttribute("aria-hidden", "true");
document.body.appendChild(cursorGlow);

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    document.body.classList.add("cursor-visible");
  });

  document.addEventListener("pointerleave", () => {
    document.body.classList.remove("cursor-visible", "cursor-hover");
  });

  document.querySelectorAll("a, button, select").forEach((element) => {
    element.addEventListener("pointerenter", () => {
      document.body.classList.add("cursor-hover");
    });

    element.addEventListener("pointerleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });
}