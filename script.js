document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const yearElement = document.getElementById("year");

    // Footer year
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Default: follow the device theme (dark / light)
    let savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    // If the user already chose a theme with the button, use that
    try {
        savedTheme = localStorage.getItem("portfolio-theme") || savedTheme;
    } catch (error) {
        // keep device theme
    }

    function applyTheme(theme) {
        const isDark = theme === "dark";

        document.body.classList.toggle("dark-theme", isDark);

        if (themeToggle) {
            themeToggle.textContent = isDark ? "☀️" : "🌙";

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light theme" : "Switch to dark theme"
            );

            themeToggle.setAttribute("aria-pressed", String(isDark));
        }
    }

    // Apply theme when page opens
    applyTheme(savedTheme);

    // Theme button: exactly one click listener
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const isDark = document.body.classList.contains("dark-theme");
            const nextTheme = isDark ? "light" : "dark";

            applyTheme(nextTheme);

            try {
                localStorage.setItem("portfolio-theme", nextTheme);
            } catch (error) {
                // Theme still works if storage is unavailable
            }
        });
    }
});