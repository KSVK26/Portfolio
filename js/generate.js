/* ==========================================================================
   Content Generator (page) — builds ready-to-paste JSON entries for the
   content/*.json files. Fill the form, copy the output, paste into the file.
   ========================================================================== */

(function () {
  "use strict";

  const TEMPLATES = {
    project: {
      target: "content/projects.json",
      fields: [
        { key: "title", label: "Title", placeholder: "Project Title" },
        { key: "category", label: "Category", placeholder: "Esports", select: ["Esports", "Operations", "Creative", "Community"] },
        { key: "org", label: "Organisation", placeholder: "Organisation Name" },
        { key: "image", label: "Image path", placeholder: "images/my-project.png (leave blank for none)" },
        { key: "tags", label: "Tags", placeholder: "esports, operations (comma separated)" },
        { key: "description", label: "Description", placeholder: "One-line summary of what you did.", textarea: true },
        { key: "body", label: "Body", placeholder: "Longer description. Markdown OK.", textarea: true },
        { key: "year", label: "Year", placeholder: "2024" },
        { key: "readTime", label: "Read time", placeholder: "Jan 2024" },
      ],
    },
    timeline: {
      target: "content/timeline.json",
      fields: [
        { key: "year", label: "Year", placeholder: "2024" },
        { key: "month", label: "Month", placeholder: "Jan (or leave blank)" },
        { key: "title", label: "Title", placeholder: "Role — Organisation" },
        { key: "subtitle", label: "Subtitle", placeholder: "Organisation Name" },
        { key: "description", label: "Description", placeholder: "What you did, in one or two sentences.", textarea: true },
      ],
    },
    writing: {
      target: "content/writing.json",
      fields: [
        { key: "title", label: "Title", placeholder: "Article Title" },
        { key: "slug", label: "Slug", placeholder: "article-slug" },
        { key: "format", label: "Format", placeholder: "Essay", select: ["Essay", "Reflection", "Build Log"] },
        { key: "topic", label: "Topic", placeholder: "esports", select: ["esports", "operations", "reflections"] },
        { key: "date", label: "Date", placeholder: "2026-01-01" },
        { key: "readTime", label: "Read time", placeholder: "5 min" },
        { key: "excerpt", label: "Excerpt", placeholder: "One-line summary.", textarea: true },
        { key: "body", label: "Body", placeholder: "# Heading\n\nArticle body in Markdown.", textarea: true },
      ],
    },
  };

  const typeSelect = document.getElementById("gen-type");
  const fieldsRoot = document.getElementById("gen-fields");
  const output = document.getElementById("gen-output");
  const targetFile = document.getElementById("gen-target-file");
  const copyBtn = document.getElementById("gen-copy");
  const resetBtn = document.getElementById("gen-reset");

  let currentType = "project";

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function fieldInput(f) {
    if (f.select) {
      return `<select id="gen-${f.key}">
        ${f.select.map((o) => `<option value="${o}">${o}</option>`).join("")}
      </select>`;
    }
    if (f.textarea) {
      return `<textarea id="gen-${f.key}" placeholder="${escapeHtml(f.placeholder)}" rows="3"></textarea>`;
    }
    return `<input id="gen-${f.key}" type="text" placeholder="${escapeHtml(f.placeholder)}" />`;
  }

  function renderFields() {
    const def = TEMPLATES[currentType];
    targetFile.textContent = def.target;
    fieldsRoot.innerHTML = def.fields
      .map(
        (f) => `
        <div class="gen-field">
          <label for="gen-${f.key}">${escapeHtml(f.label)}</label>
          ${fieldInput(f)}
        </div>`
      )
      .join("");
  }

  function readValue(f) {
    const el = document.getElementById("gen-" + f.key);
    if (!el) return "";
    let v = el.value;
    if (f.key === "tags") {
      v = v.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return v;
  }

  function buildObject() {
    const def = TEMPLATES[currentType];
    const obj = {};
    def.fields.forEach((f) => {
      const v = readValue(f);
      if (v === "" || (Array.isArray(v) && !v.length)) return;
      obj[f.key] = v;
    });
    return obj;
  }

  function updateOutput() {
    const obj = buildObject();
    output.textContent = JSON.stringify(obj, null, 2);
  }

  function init() {
    if (!typeSelect || !fieldsRoot) return;
    typeSelect.addEventListener("change", function () {
      currentType = typeSelect.value;
      renderFields();
      updateOutput();
    });
    renderFields();
    fieldsRoot.addEventListener("input", updateOutput);
    fieldsRoot.addEventListener("change", updateOutput);

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        const text = output.textContent;
        if (!text) return;
        function fallback() {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(ta);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(
            function () {
              const old = copyBtn.textContent;
              copyBtn.textContent = "Copied!";
              setTimeout(function () { copyBtn.textContent = old; }, 1400);
            },
            fallback
          );
        } else {
          fallback();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        fieldsRoot.querySelectorAll("input, textarea, select").forEach((el) => {
          el.value = "";
        });
        updateOutput();
      });
    }

    updateOutput();
  }

  document.addEventListener("DOMContentLoaded", init);
})();