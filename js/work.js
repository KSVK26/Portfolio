/* ==========================================================================
   Work & Projects — Category pill filtering + live text search.
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
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderCards(projects) {
    if (!grid) return;
    if (!projects.length) {
      grid.innerHTML = `<p style="grid-column:1/-1;color:var(--muted-gray);padding:2rem;">No projects match your filters.</p>`;
      return;
    }

    grid.innerHTML = projects
      .map(
        (p) => `
        <a href="work-detail.html?id=${escapeHtml(p.slug || "")}" class="card card-horizontal" data-tags="${(p.tags || []).join(",")}" data-category="${p.category || ""}" style="text-decoration:none;color:inherit;">
          <div class="card-media">
            ${p.image ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" />` : `<div class="card-media-placeholder">${escapeHtml(p.category || "")}</div>`}
          </div>
          <div class="card-body">
            <span class="card-tag">${escapeHtml(p.category || "")}</span>
            <h3 class="card-title">${escapeHtml(p.title)}</h3>
            <p class="card-desc">${escapeHtml(p.description)}</p>
          </div>
          <div class="card-footer">
            <span>${escapeHtml(p.year || "")}</span>
            <span>${escapeHtml(p.readTime || "")}</span>
          </div>
        </a>`
      )
      .join("");
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
        ...(p.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
    renderCards(filtered);
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
    renderCards(allProjects);
    initFilterBar();
    initSearch();
  }

  document.addEventListener("DOMContentLoaded", init);
})();