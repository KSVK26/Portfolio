/* ==========================================================================
   Contact Page — renders the "Find me elsewhere" links section (Editorial).
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
      <div class="social-links" style="margin-top: 1.5rem;">
        ${elsewhere
          .map(
            (e) => `
            <a href="${e.url}" class="social-link" target="_blank" rel="noopener">
              ${e.name}
            </a>`
          )
          .join("")}
      </div>`;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderContact(document.getElementById("contact-options"));
  });
})();