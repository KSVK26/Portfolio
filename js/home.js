/* ==========================================================================
   Home Page — Dynamic rendering of Proof, Areas of Work, Featured Work,
   and Contact sections using Editorial Design System.
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

  function renderStats(container, data) {
    if (!container || !data || !data.stats) return;
    container.innerHTML = data.stats
      .map(
        (s) => `
        <div class="stat-card">
          <div class="stat-number">${escapeHtml(s.number)}</div>
          ${s.label ? `<div class="stat-label">${escapeHtml(s.label)}</div>` : ""}
          <p class="stat-desc">${escapeHtml(s.description)}</p>
        </div>`
      )
      .join("");
  }

  function renderAreasOfWork(container, data) {
    if (!container || !data || !data.items) return;

    container.innerHTML = data.items
      .map((item, i) => {
        const open = i === 0 ? "true" : "false";
        const icon = i === 0 ? "[ − ]" : "[ + ]";
        const numClass = i === 0 ? "accordion-number" : "accordion-number accordion-number-muted";
        const deliverables = Array.isArray(item.deliverables) ? item.deliverables : [];
        return `
        <div class="accordion-item" data-open="${open}">
          <button type="button" class="accordion-trigger" aria-expanded="${open}">
            <div class="accordion-trigger-row">
              <span class="${numClass}">01.${i + 1}</span>
              <h3 class="accordion-title">${escapeHtml(item.title)}</h3>
            </div>
            <span class="accordion-icon">${icon}</span>
          </button>
          <div class="accordion-content">
            <div class="accordion-inner">
              <div class="accordion-body">
                <p class="accordion-description">${escapeHtml(item.description)}</p>
                <div class="accordion-deliverables">
                  <div class="accordion-deliverables-label">Key Deliverables</div>
                  <ul class="accordion-deliverables-list">
                    ${deliverables.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      })
      .join("");

    // Accordion toggle behaviour
    container.querySelectorAll(".accordion-item").forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      const icon = item.querySelector(".accordion-icon");
      trigger.addEventListener("click", () => {
        const isOpen = item.getAttribute("data-open") === "true";
        item.setAttribute("data-open", String(!isOpen));
        trigger.setAttribute("aria-expanded", String(!isOpen));
        icon.textContent = !isOpen ? "[ − ]" : "[ + ]";
      });
    });

    const viewAll = document.createElement("a");
    viewAll.href = "work.html";
    viewAll.className = "btn-editorial btn-secondary-editorial";
    viewAll.style.fontSize = "0.875rem";
    viewAll.textContent = "View all →";
    const wrap = document.createElement("p");
    wrap.style.cssText = "margin-top: 1.5rem; text-align: center;";
    wrap.appendChild(viewAll);
    container.parentElement.appendChild(wrap);
  }

  function renderSelectedWork(container, data) {
    if (!container || !data || !data.items) return;
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const sortKey = (p) => {
      const rt = (p.readTime || "").trim();
      const m = rt.match(/^([A-Za-z]+)\s+(\d{4})$/);
      if (m) {
        const mi = MONTHS.indexOf(m[1]);
        return mi >= 0 ? parseInt(m[2]) * 12 + mi : parseInt(m[2]) * 12;
      }
      return parseInt(p.year) * 12 || 0;
    };
    const items = data.items
      .filter((p) => p.featured)
      .sort((a, b) => sortKey(b) - sortKey(a))
      .slice(0, 5);
    container.innerHTML = items
      .map(
        (item) => `
        <div class="card-editorial" data-title="${escapeHtml(item.title)}" data-category="${escapeHtml(item.category || "")}">
          <div class="card-media">
            ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />` : `<div class="card-media-placeholder">${escapeHtml(item.category || "")}</div>`}
          </div>
          <div class="card-body">
            <span class="card-tag">${escapeHtml(item.category || "")}</span>
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <p class="card-desc">${escapeHtml(item.description)}</p>
            <div class="card-footer">
              <span>${escapeHtml(item.org || item.year || "")}</span>
              <span>${escapeHtml(item.year || "")}</span>
            </div>
          </div>
        </div>`
      )
      .join("");

    // Attach click handlers for modal on featured cards
    container.querySelectorAll(".card-editorial").forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", function () {
        const title = card.getAttribute("data-title");
        const category = card.getAttribute("data-category");
        const project = data.items.find((p) => p.title === title && p.category === category);
        if (project && window.openProjectModal) {
          const modalProject = {
            ...project,
            discipline: project.category || "Esports",
            context: project.org || "—",
            summary: project.description || "—",
            execution: [
              `Role: ${project.role || "Operations"}`,
              `Organization: ${project.org || "—"}`,
              `Timeline: ${project.readTime || project.year || "—"}`,
              `Scope: Tournament administration, bracket management, live operations`,
            ],
            outcome: `Delivered ${project.description?.toLowerCase().replace(/^\w/, c => c.toUpperCase()) || "successful tournament operations"} across ${project.tags?.join(", ") || "multiple domains"}.`,
          };
          window.openProjectModal(modalProject);
        }
      });
    });

    if (data.items.length > 4) {
      const viewAll = document.createElement("a");
      viewAll.href = "work.html";
      viewAll.className = "btn-editorial btn-secondary-editorial";
      viewAll.style.fontSize = "0.875rem";
      viewAll.textContent = "View all →";
      const wrap = document.createElement("p");
      wrap.style.cssText = "margin-top: 1.5rem; text-align: center;";
      wrap.appendChild(viewAll);
      container.parentElement.appendChild(wrap);
    }
  }

  function renderNowCards(container, data) {
    if (!container || !data || !data.items) return;
    // Show only the first 3 items (most recent/active)
    const items = data.items.slice(0, 3);

    container.innerHTML = items
      .map((p) => `
        <div class="card-editorial" data-title="${escapeHtml(p.title)}" data-category="${escapeHtml(p.category || "")}">
          <div class="card-media">
            ${p.image ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" />` : `<div class="card-media-placeholder">${escapeHtml(p.category || "")}</div>`}
          </div>
          <div class="card-body">
            <span class="card-tag">${escapeHtml(p.category || "")}</span>
            <h3 class="card-title">${escapeHtml(p.title)}</h3>
            <p class="card-desc">${escapeHtml(p.description)}</p>
            <div class="card-footer">
              <span>${escapeHtml(p.role || "")}</span>
              <span>${escapeHtml(p.period || "")}</span>
            </div>
          </div>
        </div>`)
      .join("");

    // Attach click handlers for modal drawer (shared with main.js)
    container.querySelectorAll(".card-editorial").forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", function () {
        const title = card.getAttribute("data-title");
        const category = card.getAttribute("data-category");
        const item = items.find((p) => p.title === title && p.category === category);
        if (item && window.openProjectModal) {
          window.openProjectModal({
            title: item.title,
            discipline: item.category || "—",
            context: item.role || "—",
            summary: item.description || "—",
            execution: item.period ? [`Timeline: ${item.period}`] : [],
            outcome: "",
          });
        }
      });
    });
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
    const [stats, areas, projects, now] = await Promise.all([
      loadJSON("content/stats.json"),
      loadJSON("content/areas.json"),
      loadJSON("content/projects.json"),
      loadJSON("content/now.json")
    ]);

    renderStats(document.getElementById("stats-grid"), stats);
    renderNowCards(document.getElementById("now-grid"), now);
    renderAreasOfWork(document.getElementById("areas-grid"), areas);
    renderSelectedWork(document.getElementById("selected-work-grid"), projects);
  }

  document.addEventListener("DOMContentLoaded", init);
})();