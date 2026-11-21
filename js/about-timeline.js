/**
 * About Page — Vertical Line Timeline Renderer
 * Loads timeline from content/timeline.json and renders editorial vertical line timeline
 */
(function () {
  'use strict';

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, '"');
  }

  function renderTimelineNode(item) {
    return `
      <div class="timeline-node">
        <div class="timeline-date">${escapeHtml(item.year)}</div>
        <div class="timeline-title">${escapeHtml(item.title)}</div>
        <div class="timeline-subtitle">${escapeHtml(item.subtitle)}</div>
        <p class="timeline-desc">${escapeHtml(item.description)}</p>
      </div>`;
  }

  async function loadTimeline() {
    try {
      const res = await fetch('content/timeline.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error('Timeline load error:', e);
      return { items: [] };
    }
  }

  async function init() {
    const container = document.getElementById('timeline-cards');
    if (!container) return;

    const data = await loadTimeline();
    // Use the vertical line timeline styles from the main timeline page
    container.innerHTML = `
      <div class="timeline-container">
        <div class="timeline-stream">
          ${data.items.map(renderTimelineNode).join('')}
        </div>
      </div>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
