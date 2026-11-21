/**
 * About Page — Education Renderer
 * Loads education from content/education.json and renders education cards
 */
(function () {
  'use strict';

  const STATUS_CLASSES = {
    current: 'education-status--current',
    completed: 'education-status--completed'
  };

  function renderStatus(status) {
    const cls = STATUS_CLASSES[status.toLowerCase()] || '';
    return `<span class="education-status ${cls}">${status}</span>`;
  }

  function renderEducationItem(item) {
    const highlightsHtml = item.highlights.map(h => `<li>${h}</li>`).join('');

    return `
      <div class="education-card">
        <div class="education-header">
          <h3 class="education-degree">${item.degree}</h3>
          <p class="education-institution">${item.institution}</p>
          <div class="education-meta">
            <span>${item.period}</span>
            ${renderStatus(item.status)}
          </div>
        </div>
        <ul class="education-highlights">${highlightsHtml}</ul>
      </div>
    `;
  }

  async function loadEducation() {
    try {
      const res = await fetch('content/education.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error('Education load error:', e);
      return { items: [] };
    }
  }

  async function init() {
    const container = document.getElementById('education-cards');
    if (!container) return;

    const data = await loadEducation();
    container.innerHTML = data.items.map(renderEducationItem).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();