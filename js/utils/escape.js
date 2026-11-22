/* ==========================================================================
   Shared Escape Utilities — Single source of truth for HTML/attribute escaping.
   Import via: <script src="js/utils/escape.js"></script>
   ========================================================================== */

(function () {
  "use strict";

  /**
   * Escape string for safe HTML text content.
   * Escapes: & < > " '
   * Use for: textContent, innerHTML text nodes, data-* attributes.
   */
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, """)
      .replace(/'/g, "'");
  }

  /**
   * Escape string for safe HTML attribute values (double-quoted).
   * Escapes: & < > "
   * Use for: href, src, alt, title, value, etc. inside double-quoted attributes.
   */
  function escapeAttr(str) {
    return String(str || "")
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, """);
  }

  // Expose globally
  window.EscapeUtils = {
    escapeHtml: escapeHtml,
    escapeAttr: escapeAttr,
  };
})();