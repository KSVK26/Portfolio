/* ==========================================================================
   Home Page — Dynamic rendering of stats, building-now, writing, worlds,
   timeline, and contact sections from JSON data.
   ========================================================================== */

(function () {
  "use strict";

  function renderStats(container, data) {
    if (!container || !data) return;
    container.innerHTML = data.stats
      .map(
        (s) => `
        <div class="stat-card">
          <div class="stat-number">${s.number}</div>
          <div class="stat-label">${s.label}</div>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.4rem;">${s.description}</p>
        </div>`
      )
      .join("");
  }

  function renderBuildingNow(container, data) {
    if (!container || !data) return;
    container.innerHTML = data.items
      .map(
        (item) => `
        <div class="card">
          <div>
            <span class="card-tag">${item.category}</span>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.description}</p>
          </div>
          <div class="card-footer">
            <span>${item.role}</span>
            <span>${item.period}</span>
          </div>
        </div>`
      )
      .join("");
  }

  function renderWriting(container, data) {
    if (!container || !data) return;
    const items = data.items.slice(0, 3);
    container.innerHTML = items
      .map(
        (item) => `
        <div class="card">
          <div>
            <span class="card-tag">${item.format}</span>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.excerpt}</p>
          </div>
          <div class="card-footer">
            <span>${item.date}</span>
            <span>${item.readTime}</span>
          </div>
        </div>`
      )
      .join("");
  }

  function renderWorlds(container) {
    if (!container) return;
    const worlds = [
      { title: "Gaming & Esports", link: "portfolio.html", tag: "arcade" },
      { title: "Modelling", link: "portfolio.html", tag: "model" },
      { title: "Photography", link: "portfolio.html", tag: "photo" },
      { title: "Film & TV", link: "portfolio.html", tag: "film" },
      { title: "Web Development", link: "work.html", tag: "web" },
      { title: "Design Strategy", link: "work.html", tag: "design" },
    ];
    container.innerHTML = worlds
      .map(
        (w) => `
        <div class="card">
          <div>
            <span class="card-tag">${w.tag}</span>
            <h3 class="card-title">${w.title}</h3>
            <p class="card-desc">A dedicated world keeping its own archive and stories.</p>
          </div>
          <div class="card-footer">
            <a href="${w.link}">Explore →</a>
          </div>
        </div>`
      )
      .join("");
  }

  function renderTimeline(container, data) {
    if (!container || !data) return;
    container.innerHTML = data.items
      .map(
        (item) => `
        <div class="timeline-node">
          <div class="timeline-date">${item.year}</div>
          <div class="timeline-title">${item.title}</div>
          <div class="timeline-subtitle">${item.subtitle}</div>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.4rem;">${item.description}</p>
        </div>`
      )
      .join("");
  }

  function renderContact(container) {
    if (!container) return;
    const options = [
      { title: "Build or collaborate", desc: "Starting something new together." },
      { title: "Speaking or workshops", desc: "I run talks and hands-on sessions." },
      { title: "Design or strategy work", desc: "From research to positioning." },
    ];
    container.innerHTML = options
      .map(
        (o) => `
        <div class="card" style="max-width:320px;">
          <h3 class="card-title">${o.title}</h3>
          <p class="card-desc">${o.desc}</p>
          <a href="mailto:hello@example.com" class="card-footer" style="color:var(--accent-blue);">hello@example.com</a>
        </div>`
      )
      .join("");
  }

  /* Fallback content when JSON files are missing */
  function getFallbackData() {
    return {
      stats: { stats: [{ number: "—", label: "Loading…", description: "" }] },
      buildingNow: { items: [] },
      writing: { items: [] },
      timeline: { items: [] },
    };
  }

  async function loadJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (err) {
      console.warn("Failed to load " + path + ", using fallback.", err);
      return null;
    }
  }

  async function init() {
    const fallback = getFallbackData();
    const [stats, buildingNow, writing, timeline] = await Promise.all([
      loadJSON("content/stats.json"),
      loadJSON("content/building-now.json"),
      loadJSON("content/writing.json"),
      loadJSON("content/timeline.json"),
    ]);

    renderStats(document.getElementById("stats-grid"), stats || fallback.stats);
    renderBuildingNow(document.getElementById("building-now-grid"), buildingNow || fallback.buildingNow);
    renderWriting(document.getElementById("writing-grid"), writing || fallback.writing);
    renderWorlds(document.getElementById("worlds-grid"));
    renderTimeline(document.getElementById("timeline-stream"), timeline || fallback.timeline);
    renderContact(document.getElementById("contact-options"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();