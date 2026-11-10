/* ==========================================================================
   Contact Page — renders the connection options on the contact page
   ========================================================================== */

(function () {
  "use strict";

  function renderContact(container) {
    if (!container) return;
    const options = [
      {
        title: "Build or collaborate",
        desc: "Starting something new together.",
        link: "mailto:ksvk26@gmail.com",
      },
      {
        title: "Speaking or workshops",
        desc: "I run talks and hands-on sessions.",
        link: "mailto:ksvk26@gmail.com",
      },
      {
        title: "Design or strategy work",
        desc: "From research to positioning.",
        link: "mailto:ksvk26@gmail.com",
      },
    ];
    const elsewhere = [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/k-s-vasanth-karthik-a2825b234/", desc: "Professional updates and experience." },
      { name: "GitHub", url: "https://github.com/KSVK26", desc: "Projects, experiments and code." },
      { name: "Instagram", url: "https://www.instagram.com/ksvk_26/", desc: "Personal and creative work." },
      { name: "Email", url: "mailto:ksvk26@gmail.com", desc: "For professional enquiries and collaborations." },
    ];

    const optionsHtml = options
      .map(
        (o) => `
        <a href="${o.link}" class="card" style="max-width:320px;text-decoration:none;color:inherit;">
          <div class="card-body">
            <h3 class="card-title">${o.title}</h3>
            <p class="card-desc">${o.desc}</p>
          </div>
          <div class="card-footer">
            <span style="color:var(--accent-blue);font-weight:600;">Get in touch →</span>
          </div>
        </a>`
      )
      .join("");

    const elsewhereHtml = `
      <div style="grid-column:1/-1;margin-top:2.5rem;">
        <span class="section-tag" style="margin-bottom:0.5rem;">Find me elsewhere</span>
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

    container.innerHTML = optionsHtml + elsewhereHtml;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderContact(document.getElementById("contact-options"));
  });
})();