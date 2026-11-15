/* ==========================================================================
   Contact Page — renders the "Find me elsewhere" links section
   ========================================================================== */

(function () {
  "use strict";

  function renderContact(container) {
    if (!container) return;
    const elsewhere = [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/k-s-vasanth-karthik-7264842b0/", desc: "Professional background & networking." },
      { name: "GitHub", url: "https://github.com/KSVK26", desc: "Projects, experiments and code." },
      { name: "Instagram", url: "https://www.instagram.com/ksvk_26/", desc: "Event updates & creative work." },
      { name: "Email", url: "mailto:ksvk26@gmail.com", desc: "For direct inquiries and collaboration." },
    ];

    container.innerHTML = `
      <div style="margin-top: 1rem;">
        <span class="section-tag" style="margin-bottom:0.75rem;">Find me elsewhere</span>
        <div class="cards-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr));">
          ${elsewhere
            .map(
              (e) => `
              <a href="${e.url}" class="card" style="text-decoration:none;color:inherit;" target="_blank" rel="noopener">
                <div class="card-body">
                  <h3 class="card-title">${e.name}</h3>
                  <p class="card-desc">${e.desc}</p>
                </div>
                <div class="card-footer">
                  <span style="color:var(--accent-blue);font-weight:600;">Visit →</span>
                </div>
              </a>`
            )
            .join("")}
        </div>
      </div>`;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderContact(document.getElementById("contact-options"));
  });
})();