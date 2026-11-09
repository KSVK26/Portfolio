/* ==========================================================================
   CV — Render searchable timeline from JSON data.
   ========================================================================== */

(function () {
  "use strict";

  const stream = document.getElementById("cv-timeline");
  const searchInput = document.getElementById("cv-search");
  let allEvents = [];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderEvents(events) {
    if (!stream) return;
    if (!events.length) {
      stream.innerHTML = `<div style="color:var(--muted-gray);padding:2rem;">No timeline entries match your search.</div>`;
      return;
    }
    stream.innerHTML = events
      .map(
        (e) => `
        <div class="timeline-node">
          <div class="timeline-date">${escapeHtml(e.year)}</div>
          <div class="timeline-title">${escapeHtml(e.title)}</div>
          <div class="timeline-subtitle">${escapeHtml(e.subtitle)}</div>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.4rem;">${escapeHtml(e.description)}</p>
        </div>`
      )
      .join("");
  }

  function applySearch() {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    if (!query) {
      renderEvents(allEvents);
      return;
    }
    const filtered = allEvents.filter((e) =>
      [e.title, e.subtitle, e.description, e.year]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
    renderEvents(filtered);
  }

  async function init() {
    allEvents = await DataLoader.getTimeline();
    renderEvents(allEvents);
    if (searchInput) {
      let debounce;
      searchInput.addEventListener("input", function () {
        clearTimeout(debounce);
        debounce = setTimeout(applySearch, 150);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();