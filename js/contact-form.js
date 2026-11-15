/* ==========================================================================
   Contact Form — inline submission feedback for the Netlify contact form
   ========================================================================== */

(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function init() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const original = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.textContent = "Sending…";
        submitBtn.disabled = true;
      }

      const data = new FormData(form);

      // Post to the same page so Netlify sees the form in the response
      // HTML and registers the submission. Posting to "/" would return
      // index.html, which has no form, and the submission would be dropped.
      // Let fetch set the Content-Type from the FormData body (multipart with
      // boundary). Overriding it manually breaks the body Netlify receives.
      fetch("contact.html", {
        method: "POST",
        body: data,
      })
        .then(function () {
          form.innerHTML = `
            <div style="text-align:center;padding:1rem 0;">
              <span class="section-tag" style="margin-bottom:1rem;">Received</span>
              <h3 class="section-title" style="font-size:1.8rem;margin-bottom:1rem;">Message sent successfully.</h3>
              <p class="card-desc" style="max-width:460px;margin:0 auto 1.5rem;">
                Thanks for reaching out! I've received your message and will get back to you as soon as possible.
              </p>
              <a href="index.html" class="btn-primary">Back to home →</a>
            </div>`;
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.textContent = original;
            submitBtn.disabled = false;
          }
        });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();