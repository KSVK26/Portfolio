/* ==========================================================================
   Now — Render "Building Now" active roles from JSON data.
   ========================================================================== */

(function () {
  "use strict";

  const grid = document.getElementById("now-grid");
  if (!grid) return;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderCards(items) {
    if (!items.length) {
      grid.innerHTML = `<p style="grid-column:1/-1;color:var(--muted-gray);padding:2rem;">Nothing to report yet — check back soon.</p>`;
      return;
    }
    grid.innerHTML = items
      .map(
        (p) => `
        <div class="card">
          <div class="card-media">
            ${p.image ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" />` : `<div class="card-media-placeholder">${escapeHtml(p.category || "")}</div>`}
          </div>
          <div class="card-body">
            <span class="card-tag">${escapeHtml(p.category || "")}</span>
            <h3 class="card-title">${escapeHtml(p.title)}</h3>
            <p class="card-desc">${escapeHtml(p.description)}</p>
          </div>
          <div class="card-footer">
            <span>${escapeHtml(p.role || "")}</span>
            <span>${escapeHtml(p.period || "")}</span>
          </div>
        </div>`
      )
      .join("");
  }

  async function init() {
    const items = await DataLoader.getNow();
    renderCards(items);
  }

  document.addEventListener("DOMContentLoaded", init);
})();