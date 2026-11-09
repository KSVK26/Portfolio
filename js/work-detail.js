/* ==========================================================================
   Work Detail Page — Renders a single project by slug from projects.json.
   ========================================================================== */

(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, """);
  }

  function markdownToHtml(md) {
    if (!md) return "";
    return md
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/^\- (.*$)/gim, "<li>$1</li>")
      .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(.*$)/gim, "<p>$1</p>")
      .replace(/<p><\/p>/g, "")
      .replace(/<p><h([1-3])>/g, "<h$1>")
      .replace(/<\/h([1-3])><\/p>/g, "</h$1>")
      .replace(/<p><ul>/g, "<ul>")
      .replace(/<\/ul><\/p>/g, "</ul>")
      .replace(/<p><li>/g, "<li>")
      .replace(/<\/li><\/p>/g, "</li>");
  }

  function renderDetail(container, project) {
    if (!container || !project) {
      container.innerHTML = `
        <div class="card" style="text-align:center;max-width:600px;margin:2rem auto;">
          <h3 class="card-title">Project not found</h3>
          <p class="card-desc">The requested project could not be found.</p>
          <a href="work.html" class="btn-secondary" style="margin-top:1rem;display:inline-block;">← Back to Work</a>
        </div>`;
      return;
    }

    const imageHtml = project.image
      ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="detail-image" />`
      : `<div class="detail-image-placeholder">${escapeHtml(project.category)}</div>`;

    container.innerHTML = `
      <article class="detail-article">
        <header class="detail-header">
          ${imageHtml}
          <div class="detail-meta">
            <span class="detail-tag">${escapeHtml(project.category)}</span>
            <h1 class="detail-title">${escapeHtml(project.title)}</h1>
            <div class="detail-byline">
              <span class="detail-year">${escapeHtml(project.year || "")}</span>
              ${project.readTime ? `<span class="detail-readtime">${escapeHtml(project.readTime)}</span>` : ""}
            </div>
            ${project.tags && project.tags.length ? `
              <div class="detail-tags">
                ${project.tags.map(t => `<span class="detail-tag-item">${escapeHtml(t)}</span>`).join("")}
              </div>
            ` : ""}
          </div>
        </header>
        <div class="detail-body">
          ${project.body ? markdownToHtml(project.body) : `<p>${escapeHtml(project.description)}</p>`}
        </div>
        <footer class="detail-footer">
          <a href="work.html" class="btn-secondary">← Back to all projects</a>
        </footer>
      </article>`;
  }

  async function init() {
    const container = document.getElementById("detail-content");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("id") || params.get("slug");

    if (!slug) {
      renderDetail(container, null);
      return;
    }

    try {
      const data = await DataLoader.getProjects();
      const project = data.items.find(p => p.slug === slug);
      renderDetail(container, project || null);
    } catch (err) {
      console.error("Failed to load project detail:", err);
      renderDetail(container, null);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();