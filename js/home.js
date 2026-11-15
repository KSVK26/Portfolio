/* ==========================================================================
   Home Page — Dynamic rendering of Proof, Areas of Work, Featured Work,
   and Contact sections.
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
          <div class="stat-number">${s.number}</div>
          ${s.label ? `<div class="stat-label">${s.label}</div>` : ""}
          <p style="font-size:0.88rem;color:var(--text-secondary);margin-top:0.4rem;line-height:1.5;">${s.description}</p>
        </div>`
      )
      .join("");
  }

  function renderAreasOfWork(container, data) {
    if (!container || !data || !data.items) return;
    container.innerHTML = data.items
      .map(
        (item) => {
          const footer = (item.role || item.period)
            ? `<div class="card-footer">
            <span>${escapeHtml(item.role || "")}</span>
            <span>${escapeHtml(item.period || "")}</span>
          </div>`
            : "";
          return `
        <div class="card">
          <div class="card-body">
            <span class="card-tag">${escapeHtml(item.category || "")}</span>
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <p class="card-desc">${escapeHtml(item.description)}</p>
          </div>
          ${footer}
        </div>`;
        }
      )
      .join("");

    const viewAll = document.createElement("a");
    viewAll.href = "work.html";
    viewAll.className = "view-all-link";
    viewAll.textContent = "Explore all work →";
    container.parentElement.appendChild(viewAll);
  }

  function renderSelectedWork(container, data) {
    if (!container || !data || !data.items) return;
    // Hand-picked highlights, newest first.
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
        <div class="card">
          <div class="card-media">
            ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />` : `<div class="card-media-placeholder">${escapeHtml(item.category || "")}</div>`}
          </div>
          <div class="card-body">
            <span class="card-tag">${escapeHtml(item.category || "")}</span>
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <p class="card-desc">${escapeHtml(item.description)}</p>
          </div>
          <div class="card-footer">
            <span>${escapeHtml(item.org || item.year || "")}</span>
            <span>${escapeHtml(item.year || "")}</span>
          </div>
        </div>`
      )
      .join("");

    if (data.items.length > 4) {
      const viewAll = document.createElement("a");
      viewAll.href = "work.html";
      viewAll.className = "view-all-link";
      viewAll.textContent = `Explore all work →`;
      container.parentElement.appendChild(viewAll);
    }
  }

  function renderContact(container) {
    if (!container) return;
    const channels = [
      {
        title: "Email",
        desc: "Direct inquiry & collaboration",
        link: "mailto:ksvk26@gmail.com",
        label: "ksvk26@gmail.com"
      },
      {
        title: "LinkedIn",
        desc: "Professional background & networking",
        link: "https://www.linkedin.com/in/k-s-vasanth-karthik-7264842b0/",
        label: "K S Vasanth Karthik"
      },
      {
        title: "Instagram",
        desc: "Event updates & creative work",
        link: "https://www.instagram.com/ksvk_26",
        label: "@ksvk_26"
      }
    ];

    container.innerHTML = channels
      .map(
        (c) => `
        <div class="card" style="max-width:320px;">
          <div class="card-body">
            <h3 class="card-title">${c.title}</h3>
            <p class="card-desc">${c.desc}</p>
          </div>
          <div class="card-footer">
            <a href="${c.link}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-blue);font-weight:600;">${c.label} →</a>
          </div>
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
    const [stats, areas, projects] = await Promise.all([
      loadJSON("content/stats.json"),
      loadJSON("content/areas.json"),
      loadJSON("content/projects.json")
    ]);

    renderStats(document.getElementById("stats-grid"), stats);
    renderAreasOfWork(document.getElementById("areas-grid"), areas);
    renderSelectedWork(document.getElementById("selected-work-grid"), projects);
    renderContact(document.getElementById("contact-options"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();