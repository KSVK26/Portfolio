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
        .then((res) => {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.text();
        })
        .then((html) => {
          el.outerHTML = html.trim();
        })
        .catch((err) => {
          console.warn("Failed to load include: " + path, err);
          return { failed: true, path: path };
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
      if (label) label.textContent = dark ? "Night Ed." : "Day Ed.";
      themeToggle.setAttribute("aria-label", dark ? "Switch to Day Edition" : "Switch to Night Edition");
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
    if (!modal) return;

    // Recover from a stale or partially cached shared include.
    if (!document.getElementById("modalClose")) {
      const panel = modal.querySelector(".modal-panel");
      if (!panel) return;
      panel.innerHTML = `
        <div class="modal-bar">
          <span class="modal-eyebrow" id="modalEyebrow">Project</span>
          <button class="modal-close" id="modalClose" aria-label="Close project details">Close</button>
        </div>
        <h2 class="modal-title" id="modalTitle"></h2>
        <dl class="modal-meta">
          <dt>Discipline</dt>
          <dd id="modalDiscipline"></dd>
          <dt>Context</dt>
          <dd id="modalContext"></dd>
        </dl>
        <section class="modal-section">
          <h3 class="modal-section-title">Overview</h3>
          <p class="modal-body-text" id="modalSummary"></p>
        </section>
        <section class="modal-section" id="modalExecutionSection" style="display: none;">
          <h3 class="modal-section-title">Execution</h3>
          <ul class="modal-execution" id="modalExecution"></ul>
        </section>
        <section class="modal-section" id="modalOutcomeSection" style="display: none;">
          <h3 class="modal-section-title">Outcome</h3>
          <div class="modal-outcome">
            <p class="modal-outcome-label">Result</p>
            <p class="modal-outcome-text" id="modalOutcome"></p>
          </div>
        </section>`;
    }

    const closeBtn = document.getElementById("modalClose");
    if (!closeBtn) return;

    let lastFocusedElement = null;

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
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
      lastFocusedElement = document.activeElement;
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
      closeBtn.focus();
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
      document.dispatchEvent(new CustomEvent("portfolio:includes-ready"));
    });
  });
})();