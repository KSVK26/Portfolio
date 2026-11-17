/* ==========================================================================
   Work & Projects — Editorial filter pills + live text search + dossier rows
   ========================================================================== */

(function () {
  "use strict";

  const grid = document.getElementById("projects-grid");
  const filterBar = document.getElementById("filter-bar");
  const searchInput = document.getElementById("search-input");
  let allProjects = [];
  let activeFilter = "all";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, "&quot;");
  }

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Parse "Mon Year" (or "Year") into a sortable numeric key, newest first.
  function sortKey(p) {
    const rt = (p.readTime || "").trim();
    const m = rt.match(/^([A-Za-z]+)\s+(\d{4})$/);
    if (m) {
      const mi = MONTHS.indexOf(m[1]);
      return mi >= 0 ? parseInt(m[2]) * 12 + mi : parseInt(m[2]) * 12;
    }
    return parseInt(p.year) * 12 || 0;
  }

  function sortByDate(projects) {
    return projects.slice().sort((a, b) => sortKey(b) - sortKey(a));
  }

  function renderDossiers(projects) {
    if (!grid) return;
    if (!projects.length) {
      grid.innerHTML = `<p style="grid-column:1/-1;color:var(--text-muted);padding:2rem;text-align:center;">No projects match your filters.</p>`;
      return;
    }

    grid.innerHTML = `
      <div class="dossier-table">
        <div class="dossier-header">
          <span>No.</span>
          <span>Initiative</span>
          <span>Dossier</span>
          <span>Discipline</span>
          <span>Context</span>
          <span>Inspect</span>
        </div>
        ${projects
          .map(
            (p, i) => `
          <div class="dossier-row" data-title="${escapeHtml(p.title)}" data-category="${escapeHtml(p.category || "")}">
            <span class="dossier-number">${String(i + 1).padStart(2, "0")}</span>
            <span class="dossier-title">${escapeHtml(p.title)}</span>
            <span class="dossier-summary">${escapeHtml(p.description)}</span>
            <span class="dossier-discipline">${escapeHtml(p.category || "—")}</span>
            <span class="dossier-context">${escapeHtml(p.org || "—")}</span>
            <span class="dossier-action">Open →</span>
          </div>`
          )
          .join("")}
      </div>
    `;

    // Attach click handlers for modal
    grid.querySelectorAll(".dossier-row").forEach((row) => {
      row.style.cursor = "pointer";
      row.addEventListener("click", function () {
        const title = row.getAttribute("data-title");
        const category = row.getAttribute("data-category");
        const project = allProjects.find((p) => p.title === title && p.category === category);
        if (project && window.openProjectModal) {
          const modalProject = {
            ...project,
            discipline: project.category || "Esports",
            context: project.org || "—",
            summary: project.description || "—",
            execution: [
              `Role: ${project.role || "Operations"}`,
              `Organization: ${project.org || "—"}`,
              `Timeline: ${project.readTime || project.year || "—"}`,
              `Scope: Tournament administration, bracket management, live operations`,
            ],
            outcome: `Delivered ${project.description?.toLowerCase().replace(/^\w/, c => c.toUpperCase()) || "successful tournament operations"} across ${project.tags?.join(", ") || "multiple domains"}.`,
          };
          window.openProjectModal(modalProject);
        }
      });
    });
  }

  function applyFilters() {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const filtered = allProjects.filter((p) => {
      const matchesCategory =
        activeFilter === "all" ||
        (p.category || "").toLowerCase() === activeFilter.toLowerCase();
      if (!matchesCategory) return false;
      if (!query) return true;
      const haystack = [
        p.title,
        p.description,
        p.category,
        p.role,
        p.org,
        ...(p.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
    renderDossiers(sortByDate(filtered));
  }

  function initFilterBar() {
    if (!filterBar) return;
    filterBar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      applyFilters();
    });
  }

  function initSearch() {
    if (!searchInput) return;
    let debounce;
    searchInput.addEventListener("input", function () {
      clearTimeout(debounce);
      debounce = setTimeout(applyFilters, 150);
    });
  }

  async function init() {
    allProjects = await DataLoader.getProjects();
    renderDossiers(sortByDate(allProjects));
    initFilterBar();
    initSearch();
  }

  document.addEventListener("DOMContentLoaded", init);
})();