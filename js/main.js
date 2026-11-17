/* ==========================================================================
   Main Utilities — Global header/footer injection, mobile navigation, theme
   ========================================================================== */

(function () {
  "use strict";

  /* Include external HTML fragments (header/footer) into [data-include] placeholders.
   Works when the site is served over HTTP (localhost, Netlify). */
  function loadIncludes() {
    const placeholders = document.querySelectorAll("[data-include]");
    const promises = Array.from(placeholders).map((el) => {
      const path = el.getAttribute("data-include");
      return fetch(path)
        .then((res) => res.text())
        .then((html) => {
          el.outerHTML = html.trim();
        })
        .catch((err) => {
          console.warn("Failed to load include: " + path, err);
        });
    });
    return Promise.all(promises);
  }

  /* Active navigation link highlighting based on current page */
  function highlightActiveLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  }

  /* Theme toggle — persists to localStorage, respects prefers-color-scheme */
  function initTheme() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;

    if (isDark) document.documentElement.classList.add("dark");
    updateThemeLabel(isDark);

    themeToggle.addEventListener("click", function () {
      const willBeDark = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", willBeDark);
      localStorage.setItem("theme", willBeDark ? "dark" : "light");
      updateThemeLabel(willBeDark);
    });

    function updateThemeLabel(dark) {
      const label = themeToggle.querySelector(".theme-label");
      if (label) label.textContent = dark ? "Night" : "Day";
    }
  }

  /* Mobile navigation drawer toggle */
  function initMobileNav() {
    const menuToggle = document.getElementById("menuToggle");
    const closeDrawer = document.getElementById("closeDrawer");
    const overlay = document.getElementById("mobileOverlay");
    const drawer = document.getElementById("mobileDrawer");

    if (!menuToggle || !drawer) return;

    function openDrawer() {
      drawer.classList.add("open");
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      menuToggle.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
      overlay.setAttribute("aria-hidden", "false");
    }

    function closeDrawerFn() {
      drawer.classList.remove("open");
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      menuToggle.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      overlay.setAttribute("aria-hidden", "true");
    }

    menuToggle.addEventListener("click", openDrawer);
    if (closeDrawer) closeDrawer.addEventListener("click", closeDrawerFn);
    overlay.addEventListener("click", closeDrawerFn);

    // Close drawer when a nav link is clicked
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", closeDrawerFn);
    });

    // Close drawer on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawerFn();
    });
  }

  /* Project Modal — Dossier Drawer */
  function initProjectModal() {
    const modal = document.getElementById("projectModal");
    const closeBtn = document.getElementById("modalClose");
    if (!modal || !closeBtn) return;

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });

    // Expose open function globally
    window.openProjectModal = function (project) {
      // Set eyebrow
      const eyebrow = document.getElementById("modalEyebrow");
      if (eyebrow) eyebrow.textContent = project.discipline || "Project";

      // Set title
      const title = document.getElementById("modalTitle");
      if (title) title.textContent = project.title || "Untitled";

      // Set meta
      const discipline = document.getElementById("modalDiscipline");
      if (discipline) discipline.textContent = project.discipline || "—";

      const context = document.getElementById("modalContext");
      if (context) context.textContent = project.context || "—";

      // Set summary
      const summary = document.getElementById("modalSummary");
      if (summary) summary.textContent = project.summary || project.description || "—";

      // Execution
      const execSection = document.getElementById("modalExecutionSection");
      const execList = document.getElementById("modalExecution");
      if (execList && project.execution && project.execution.length) {
        execSection.style.display = "block";
        execList.innerHTML = project.execution
          .map((item) => `<li><span class="bullet">•</span>${item}</li>`)
          .join("");
      } else if (execSection) {
        execSection.style.display = "none";
      }

      // Outcome
      const outcomeSection = document.getElementById("modalOutcomeSection");
      const outcomeText = document.getElementById("modalOutcome");
      if (outcomeText && project.outcome) {
        outcomeSection.style.display = "block";
        outcomeText.textContent = project.outcome;
      } else if (outcomeSection) {
        outcomeSection.style.display = "none";
      }

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
  }

  /* Public API */
  window.PortfolioApp = {
    loadIncludes: loadIncludes,
    highlightActiveLink: highlightActiveLink,
    initMobileNav: initMobileNav,
    initTheme: initTheme,
    initProjectModal: initProjectModal,
  };

  /* Boot sequence: load fragments, then wire up navigation */
  document.addEventListener("DOMContentLoaded", function () {
    loadIncludes().then(function () {
      highlightActiveLink();
      initMobileNav();
      initTheme();
      initProjectModal();
    });
  });
})();