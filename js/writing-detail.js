/* ==========================================================================
   Writing Detail Page — Renders a single article by slug from writing.json.
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

  function renderDetail(container, post) {
    if (!container || !post) {
      container.innerHTML = `
        <div class="card" style="text-align:center;max-width:600px;margin:2rem auto;">
          <h3 class="card-title">Article not found</h3>
          <p class="card-desc">The requested article could not be found.</p>
          <a href="writing.html" class="btn-secondary" style="margin-top:1rem;display:inline-block;">← Back to Writing</a>
        </div>`;
      return;
    }

    container.innerHTML = `
      <article class="detail-article">
        <header class="detail-header">
          <div class="detail-meta">
            <span class="detail-tag">${escapeHtml(post.format)}</span>
            <h1 class="detail-title">${escapeHtml(post.title)}</h1>
            <div class="detail-byline">
              <span class="detail-date">${escapeHtml(post.date || "")}</span>
              ${post.readTime ? `<span class="detail-readtime">${escapeHtml(post.readTime)}</span>` : ""}
            </div>
            ${post.topic ? `
              <div class="detail-tags">
                <span class="detail-tag-item">${escapeHtml(post.topic)}</span>
              </div>
            ` : ""}
          </div>
        </header>
        <div class="detail-body">
          ${post.body ? markdownToHtml(post.body) : `<p>${escapeHtml(post.excerpt)}</p>`}
        </div>
        <footer class="detail-footer">
          <a href="writing.html" class="btn-secondary">← Back to all articles</a>
        </footer>
      </article>`;
  }

  async function init() {
    const container = document.getElementById("writing-detail-content");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("id") || params.get("slug");

    if (!slug) {
      renderDetail(container, null);
      return;
    }

    try {
      const data = await DataLoader.getWriting();
      const post = data.items.find(p => p.slug === slug);
      renderDetail(container, post || null);
    } catch (err) {
      console.error("Failed to load article detail:", err);
      renderDetail(container, null);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();