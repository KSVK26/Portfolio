/* ==========================================================================
   Portfolio Worlds — Render sub-discipline worlds grid.
   ========================================================================== */

(function () {
  "use strict";

  const grid = document.getElementById("worlds-grid");
  if (!grid) return;

  const worlds = [
    { title: "Gaming & Esports", tag: "arcade", desc: "Competitive gaming, community, and the culture around it." },
    { title: "Modelling", tag: "model", desc: "Fashion, runway, and the visual storytelling of the body." },
    { title: "Photography", tag: "photo", desc: "Still frames, long walks, and the patience of waiting for light." },
    { title: "Film & TV", tag: "film", desc: "Moving image — from shorts to festival runs." },
    { title: "Web Development", tag: "web", desc: "Shipped sites, components, and the craft of building on the web." },
    { title: "Design Strategy", tag: "design", desc: "Research, positioning, and the strategy behind the work." },
  ];

  grid.innerHTML = worlds
    .map(
      (w) => `
      <div class="card">
        <div>
          <span class="card-tag">${w.tag}</span>
          <h3 class="card-title">${w.title}</h3>
          <p class="card-desc">${w.desc}</p>
        </div>
        <div class="card-footer">
          <a href="work.html">Explore →</a>
        </div>
      </div>`
    )
    .join("");
})();