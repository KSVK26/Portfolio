/* ==========================================================================
   Global Search — Full-text indexing across all content collections.
   ========================================================================== */

(function () {
  "use strict";

  const input = document.getElementById("global-search-input");
  const grid = document.getElementById("search-results-grid");
  const status = document.getElementById("search-status");

  let searchIndex = [];

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  async function buildIndex() {
    const [projects, timeline, now] = await Promise.all([
      DataLoader.getProjects(),
      DataLoader.getTimeline(),
      DataLoader.getNow(),
    ]);

    searchIndex = [
      ...projects.map((p) => ({
        type: "Project",
        title: p.title,
        desc: p.description,
        tags: p.tags || [],
        url: "work.html",
      })),
      ...timeline.map((t) => ({
        type: "Timeline",
        title: t.title,
        desc: t.subtitle + " — " + t.description,
        tags: [t.year],
        url: "about.html",
      })),
      ...now.map((b) => ({
        type: "Building Now",
        title: b.title,
        desc: b.role + " — " + b.description,
        tags: [b.category],
        url: "now.html",
      })),
    ];
  }

  function renderResults(results, query) {
    if (!grid) return;
    if (!query) {
      if (status) status.textContent = "Type something to search.";
      grid.innerHTML = "";
      return;
    }

    if (!results.length) {
      if (status) status.textContent = `No results found for "${escapeHtml(query)}".`;
      grid.innerHTML = "";
      return;
    }

    if (status) status.textContent = `Found ${results.length} result(s) for "${escapeHtml(query)}":`;

    grid.innerHTML = results
      .map(
        (item) => `
        <div class="card">
          <div class="card-media">
            <div class="card-media-placeholder">${escapeHtml(item.type)}</div>
          </div>
          <div class="card-body">
            <span class="card-tag">${escapeHtml(item.type)}</span>
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <p class="card-desc">${escapeHtml(item.desc)}</p>
          </div>
          <div class="card-footer">
            <a href="${item.url}" style="color:var(--accent-blue);">View in ${item.type} →</a>
          </div>
        </div>`
      )
      .join("");
  }

  function performSearch(query) {
    query = query.trim().toLowerCase();
    if (!query) {
      renderResults([], "");
      return;
    }

    const filtered = searchIndex.filter((item) => {
      const haystack = [item.title, item.desc, ...(item.tags || [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });

    renderResults(filtered, query);
  }

  async function init() {
    await buildIndex();

    // Read initial query parameter from URL if present (?q=keyword)
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get("q");
    if (initialQuery && input) {
      input.value = initialQuery;
      performSearch(initialQuery);
    }

    if (input) {
      let debounce;
      input.addEventListener("input", function () {
        clearTimeout(debounce);
        debounce = setTimeout(() => performSearch(input.value), 150);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();