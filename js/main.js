/* ==========================================================================
   Main Utilities — Global header/footer injection and mobile navigation
   ========================================================================== */

(function () {
  "use strict";

  /* Include external HTML fragments (header/footer) into [data-include] placeholders.
   Works when the site is served over HTTP (localhost, Netlify). */
  function loadIncludes() {
    const placeholders = document.querySelectorAll("[data-include]");
    const promises = Array.from(placeholders).map((el) => {
      const path = el.getAttribute("data-include");
      return fetch(path)
        .then((res) => res.text())
        .then((html) => {
          el.outerHTML = html.trim();
        })
        .catch((err) => {
          console.warn("Failed to load include: " + path, err);
        });
    });
    return Promise.all(promises);
  }

  /* Active navigation link highlighting based on current page */
  function highlightActiveLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  }

  /* Mobile navigation drawer toggle */
  function initMobileNav() {
    const menuToggle = document.getElementById("menuToggle");
    const closeDrawer = document.getElementById("closeDrawer");
    const overlay = document.getElementById("mobileOverlay");
    const drawer = document.getElementById("mobileDrawer");

    if (!menuToggle || !drawer) return;

    function openDrawer() {
      drawer.classList.add("open");
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeDrawerFn() {
      drawer.classList.remove("open");
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    menuToggle.addEventListener("click", openDrawer);
    if (closeDrawer) closeDrawer.addEventListener("click", closeDrawerFn);
    overlay.addEventListener("click", closeDrawerFn);

    // Close drawer when a nav link is clicked
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", closeDrawerFn);
    });

    // Close drawer on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawerFn();
    });
  }

  /* Public API */
  window.PortfolioApp = {
    loadIncludes: loadIncludes,
    highlightActiveLink: highlightActiveLink,
    initMobileNav: initMobileNav,
  };

  /* Boot sequence: load fragments, then wire up navigation */
  document.addEventListener("DOMContentLoaded", function () {
    loadIncludes().then(function () {
      highlightActiveLink();
      initMobileNav();
    });
  });
})();