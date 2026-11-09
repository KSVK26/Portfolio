/* ==========================================================================
   Writing & Field Notes — Topic/format filtering with date sorting.
   ========================================================================== */

(function () {
  "use strict";

  const grid = document.getElementById("writing-grid");
  const filterBar = document.getElementById("writing-filter-bar");
  let allPosts = [];
  let activeFilter = "all";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderCards(posts) {
    if (!grid) return;
    if (!posts.length) {
      grid.innerHTML = `<p style="grid-column:1/-1;color:var(--muted-gray);padding:2rem;">No posts match your filters.</p>`;
      return;
    }

    grid.innerHTML = posts
      .map(
        (p) => `
        <div class="card" data-format="${(p.format || "").toLowerCase().replace(" ", "-")}">
          <div>
            <span class="card-tag">${escapeHtml(p.format || "")}</span>
            <h3 class="card-title">${escapeHtml(p.title)}</h3>
            <p class="card-desc">${escapeHtml(p.excerpt)}</p>
          </div>
          <div class="card-footer">
            <span>${escapeHtml(p.date || "")}</span>
            <span>${escapeHtml(p.readTime || "")}</span>
          </div>
        </div>`
      )
      .join("");
  }

  function applyFilters() {
    const filtered = allPosts.filter((p) => {
      const format = (p.format || "").toLowerCase().replace(" ", "-");
      return activeFilter === "all" || format === activeFilter;
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

  async function init() {
    allPosts = await DataLoader.getWriting();
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderCards(allPosts);
    initFilterBar();
  }

  document.addEventListener("DOMContentLoaded", init);
})();