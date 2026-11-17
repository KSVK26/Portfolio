/* ==========================================================================
   Timeline Page — renders the full chronological timeline from content/timeline.json (Editorial)
   ========================================================================== */

(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderTimeline(container, data) {
    if (!container || !data) return;
    const items = data.items || [];
    if (items.length === 0) {
      container.innerHTML =
        '<p style="color:var(--text-muted);font-style:italic;">Timeline content is being prepared. Check back soon.</p>';
      return;
    }
    container.innerHTML = items
      .map(
        (item) => `
        <div class="timeline-node">
          <div class="timeline-date">${escapeHtml(item.year)}</div>
          <div class="timeline-title">${escapeHtml(item.title)}</div>
          <div class="timeline-subtitle">${escapeHtml(item.subtitle)}</div>
          <p class="timeline-desc">${escapeHtml(item.description)}</p>
        </div>`
      )
      .join("");
  }

  async function loadJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (err) {
      console.warn("Failed to load " + path, err);
      return null;
    }
  }

  async function init() {
    const data = await loadJSON("content/timeline.json");
    renderTimeline(document.getElementById("timeline-stream"), data);
  }

  document.addEventListener("DOMContentLoaded", init);
})();