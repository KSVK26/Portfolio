/* ==========================================================================
   Now — Render "Building Now" active roles as an editorial dossier table,
   with a modal drawer on each row (same drawer as the Work page).
   ========================================================================== */

(function () {
  "use strict";

  const list = document.getElementById("now-dossier-list");
  if (!list) return;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, "&quot;");
  }

  function renderDossiers(items) {
    if (!items.length) {
      list.innerHTML = `<div style="padding:2rem;text-align:center;color:var(--text-muted);font-family:'JetBrains Mono',monospace;font-size:0.8rem;">Nothing to report yet — check back soon.</div>`;
      return;
    }

    list.innerHTML = items
      .map((p, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `
        <article
          class="dossier-row"
          data-now-title="${escapeHtml(p.title)}"
          data-now-category="${escapeHtml(p.category || "")}"
          tabindex="0"
          role="button"
          aria-label="Inspect dossier ${escapeHtml(p.title)}"
        >
          <div class="dossier-number">${n}</div>
          <div>
            <h3 class="dossier-title">${escapeHtml(p.title)}</h3>
            <p class="dossier-summary">${escapeHtml(p.description)}</p>
          </div>
          <div class="dossier-discipline">${escapeHtml(p.category || "—")}</div>
          <div class="dossier-context">${escapeHtml(p.role || "—")} · ${escapeHtml(p.period || "—")}</div>
          <div></div>
          <div class="dossier-action">Open ↗</div>
        </article>`;
      })
      .join("");

    // Click + keyboard → modal drawer (shared with main.js)
    list.querySelectorAll(".dossier-row").forEach((row) => {
      const open = () => {
        const title = row.getAttribute("data-now-title");
        const category = row.getAttribute("data-now-category");
        const item = items.find((p) => p.title === title && p.category === category);
        if (item && window.openProjectModal) {
          window.openProjectModal({
            title: item.title,
            discipline: item.category || "—",
            context: item.role || "—",
            summary: item.description || "—",
            execution: item.period
              ? [`Timeline: ${item.period}`]
              : [],
            outcome: "",
          });
        }
      };
      row.addEventListener("click", open);
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  async function init() {
    const items = await DataLoader.getNow();
    renderDossiers(items);
  }

  document.addEventListener("DOMContentLoaded", init);
})();