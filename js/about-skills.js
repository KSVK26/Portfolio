/**
 * About Page — Skills Renderer
 * Loads skills from content/skills.json and renders categorized skill cards
 */
(function () {
  'use strict';

  const LEVEL_CLASSES = {
    expert: 'skill-level--expert',
    advanced: 'skill-level--advanced',
    intermediate: 'skill-level--intermediate',
    learning: 'skill-level--learning'
  };

  function renderSkillLevel(level) {
    const cls = LEVEL_CLASSES[level.toLowerCase()] || '';
    return `<span class="skill-level ${cls}">${level}</span>`;
  }

  function renderSkillCategory(category, index) {
    const skillsHtml = category.skills.map(skill => `
      <div class="skill-item">
        <span class="skill-name">${skill.name}</span>
        <div class="skill-meta">
          ${renderSkillLevel(skill.level)}
          <span class="skill-years">${skill.years} yr${skill.years > 1 ? 's' : ''}</span>
        </div>
      </div>
    `).join('');

    const descHtml = category.description
      ? `<p class="skill-category-desc">${category.description}</p>`
      : '';

    return `
      <div class="skill-category" data-type="${category.type}">
        <div class="skill-category-header">
          <span class="skill-category-number">${String(index + 1).padStart(2, '0')}</span>
          <h3 class="skill-category-title">${category.name}</h3>
        </div>
        ${descHtml}
        <div class="skill-list">${skillsHtml}</div>
      </div>
    `;
  }

  async function loadSkills() {
    try {
      const res = await fetch('content/skills.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error('Skills load error:', e);
      return { categories: [] };
    }
  }

  async function init() {
    const container = document.getElementById('skills-grid');
    if (!container) return;

    const data = await loadSkills();
    container.innerHTML = data.categories.map(renderSkillCategory).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();