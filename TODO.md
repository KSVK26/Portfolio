# Portfolio Fix TODO

Based on comprehensive ponytail audit — 18 findings across 3 severity levels.

---

## Section Tags Across Pages

| Page | Current Section Tags |
|------|---------------------|
| **index.html** (Home) | `00 — Proof`, `01 — Areas of Work`, `02 — Building Now`, `03 — Featured Work` |
| **about.html** | `00 — About`, `01 — Skills`, `02 — Education`, `03 — Experience`, `04 — Philosophy` |
| **work.html** | `02 — Work` *(should be `00 — Work` or `01 — Work`)* |
| **contact.html** | Uses `00 — Contact` in `.contact-eyebrow` (not `.section-tag`) |
| **now.html** | Custom inline markup with `02` / `NOW` (not `.section-tag`) |

---

## 🔴 Must Fix (5) — Security, Data Loss, Broken Functionality

### 1. XSS in `escapeHtml` — Incomplete Escaping
**Files:** `js/work.js:17`, `js/search.js:18`, `js/generate.js:15`, `js/contact-form.js:8`, `js/home.js` (inline), `js/about-timeline.js:8`, +1 more
- **Issue:** Only escapes `<`, `>`, `&`, `"`, `'`. Misses `/` and attribute contexts.
- **Risk:** Malicious content in `projects.json` or search input executes script.
- **Fix:** Create shared `js/utils/escape.js` with proper `escapeHtml` + `escapeAttr`. Replace all 7 copies.
- **Priority:** **FIRST** — enables all other fixes.
- **Status:** ✅ Shared utility created at `js/utils/escape.js`

### 2. Contact Form Posts to Wrong Endpoint
**File:** `contact.html:59` (form action) vs `js/contact-form.js:37` (fetch URL)
- **Issue:** `<form action="contact.html" ...>` but JS posts to `"contact.html"` — actually aligned now, but Netlify needs the form in the response HTML.
- **Risk:** Netlify Forms may not capture submissions; emails not sent.
- **Fix:** Verify form action and fetch URL both point to a page containing the form markup.

### 3. Modal Recovery Rebuilds from Hardcoded HTML String
**File:** `js/main.js:178-200` (`ensureModal()`)
- **Issue:** 40-line hardcoded modal HTML duplicates `components/header.html`.
- **Risk:** Drift — modal changes in component don't reflect in fallback.
- **Fix:** **Delete `ensureModal()` entirely.** Modal always present via header include. Fail loud if missing.

### 4. No Error Boundaries for Failed Data Loads
**Files:** `js/data-loader.js`, `js/home.js`, `js/work.js`, `js/timeline.js`
- **Issue:** All `fetch()` calls lack `catch`/fallback UI.
- **Risk:** Silent blank sections if JSON 404s (deploy race, CDN hiccup).
- **Fix:** Wrap each `loadData()` in try/catch; render "Content unavailable — please refresh" in target container.

### 5. Duplicate `escapeHtml` in 7 Files
**Files:** `js/work.js:17`, `js/search.js:18`, `js/generate.js:15`, `js/contact-form.js:8`, `js/home.js` (inline), `js/about-timeline.js:8`, `js/about-skills.js` (uses template literals without escaping)
- **Issue:** Copy-pasted function, two variants (one escapes `/`, one doesn't).
- **Risk:** Fixing XSS requires 7+ edits; inconsistent security.
- **Fix:** **Single shared utility** (see Fix #1). Deletes ~35 lines of duplication.
- **Status:** ✅ Shared utility created; `home.js` and `about-timeline.js` updated to use it.

---

## 🟡 Should Fix (8) — Duplication, Resilience, Maintainability

### 6. Card Rendering Logic Duplicated Across 4 Modules
**Files:** `js/home.js:120-180`, `js/work.js:60-120`, `js/search.js:40-80`, `js/generate.js` (preview)
- **Issue:** Near-identical HTML template strings for project cards.
- **Risk:** Design change = 4+ edits; high divergence risk.
- **Fix:** Single `renderProjectCard(project, options)` in shared module. Options: `showTags`, `showDescription`, `clickHandler`, `variant`.
- **Lean:** Deletes ~200 lines.

### 7. `data-include` Fetch Runs Every Page, No Caching
**File:** `js/main.js:15-35`
- **Issue:** `header.html` + `footer.html` fetched on every navigation.
- **Risk:** 2 extra HTTP requests; layout shift on slow connections.
- **Fix:** Add `Cache-Control: immutable, max-age=31536000` in `netlify.toml` for components. **Or** embed header/footer directly in HTML (simpler, faster, no JS dependency).

### 8. Font Loading Blocks Render — No `font-display: swap`
**Files:** All HTML pages (Google Fonts link, e.g., `index.html:20`)
- **Issue:** Default `font-display: block` hides text until fonts load.
- **Risk:** Lighthouse FCP/CLS penalty; invisible text on slow 3G.
- **Fix:** Add `&display=swap` to Google Fonts URL.

### 9. Search Index Rebuilds on Every Visit
**File:** `js/search.js:10-30`
- **Issue:** Fetches `projects.json`, builds index on every `search.html` load.
- **Risk:** Wasteful at scale (currently trivial at 300 projects).
- **Fix:** Cache built index in `sessionStorage` with version hash (etag/last-modified). Rebuild only on content change.

### 10. Accordion Logic Duplicated
**Files:** `about.html:171-181` (inline), `js/home.js` (Areas accordion renders accordion markup but no toggle handlers)
- **Issue:** Two implementations of same expand/collapse pattern.
- **Risk:** a11y fixes in one miss the other; behavior drift.
- **Fix:** Single `Accordion` class in `js/components/accordion.js`. Initialize via `data-accordion` attribute.
- **Lean:** Deletes ~50 lines, centralizes a11y.

### 11. `generate.html` References Missing `writing.json`
**File:** `js/generate.js:25`
- **Issue:** `loadData('content/writing.json')` — file doesn't exist.
- **Risk:** Generator silently fails for "Writing" category.
- **Fix:** Create `content/writing.json` with `{"items":[]}` **or** remove fetch + "Writing" option from type select.

### 12. `netlify.toml` Exposes Email in Plain Text
**File:** `netlify.toml:18`
- **Issue:** `email = "vasanthkarthik2004@gmail.com"` committed.
- **Risk:** Spam, scraping; email in public git history forever.
- **Fix:** Move to Netlify Dashboard → Forms → Notifications. Remove from `netlify.toml`.

### 13. Project Modal Enriches with Hardcoded Strings
**File:** `js/main.js:110-140`
- **Issue:** "Client", "Timeline", "Role", "Labels" hardcoded in JS.
- **Risk:** New fields in `projects.json` don't appear; content team blocked on dev.
- **Fix:** Define `fieldConfig` in `projects.json` (or separate `content/project-fields.json`): `{ key: "org", label: "Client", type: "text" }`. Modal renders dynamically.

---

## 🟢 Nice to Have (5) — Polish, DX, SEO

### 14. CSS Split by Layer
**File:** `css/styles.css:1-1641` (single 1641-line file)
- **Issue:** Variables, reset, typography, components, pages, responsive, print all mixed.
- **Fix:** Split into `variables.css`, `reset.css`, `typography.css`, `components.css`, `layout.css`, `pages.css`, `print.css`. Import via `@import` or concat at deploy.
- **Lean:** No runtime change; purely developer experience.

### 15. Paper Grain Overlay as Pseudo-element
**Files:** `css/styles.css:45-55`, all HTML files (e.g., `index.html:24`)
- **Issue:** Both `<div class="paper-grain">` in HTML **and** `body::before` in CSS.
- **Fix:** Remove HTML `<div>` from all 8 pages. Keep only CSS `body::before`.
- **Lean:** Deletes 8 lines across 8 files.

### 16. `loadIncludes` Uses `outerHTML` Replacement
**File:** `js/main.js:28`
- **Issue:** `placeholder.outerHTML = await response.text()` destroys placeholder.
- **Fix:** Use `innerHTML` or `replaceWith(...nodes)` after parsing to DocumentFragment. Keeps retry target.

### 17. `generate.js` Uses Deprecated `execCommand('copy')`
**File:** `js/generate.js:155`
- **Issue:** `document.execCommand('copy')` deprecated, removed in some browsers.
- **Fix:** Use `navigator.clipboard.writeText(text)` with fallback.

### 18. No `robots.txt` / `sitemap.xml`
**Location:** Repo root / `public/`
- **Issue:** Missing standard SEO files.
- **Fix:** Add `public/robots.txt` (allow all, point to sitemap) + `public/sitemap.xml` (list all 8 pages). Or use `@netlify/plugin-sitemap`.

---

## 📋 Suggested Implementation Order

| Order | Fix | Why First |
|-------|-----|-----------|
| 1 | **#1 + #5** Shared `escapeHtml` utility | Security-critical; enables safe rendering everywhere |
| 2 | **#3** Delete `ensureModal()` | Deletes 40 lines; eliminates drift risk |
| 3 | **#2** Fix contact form action | Quick win; restores form functionality |
| 4 | **#4** Add error boundaries | Resilience; prevents blank pages |
| 5 | **#6** Shared card renderer | Deletes 200 lines; single source of truth |
| 6 | **#10** Shared accordion component | Deletes 50 lines; centralizes a11y |
| 7 | **#7** Cache/embed header-footer | Performance; removes JS dependency for chrome |
| 8 | **#8** Add `font-display: swap` | Core Web Vitals; one-line fix |
| 9 | **#11** Fix missing `writing.json` | Unblocks generator |
| 10 | **#12** Remove email from `netlify.toml` | Privacy; 30-second fix |
| 11 | **#13** Dynamic modal field config | Content-team autonomy |
| 12 | **#9** Search index caching | Scale preparation |
| 13 | **#14** Split CSS by layer | DX improvement |
| 14 | **#15** Remove duplicate paper grain | Cleanup |
| 15 | **#16** Fix `outerHTML` → `innerHTML` | Resilience |
| 16 | **#17** Replace `execCommand` | Future-proof |
| 17 | **#18** Add `robots.txt` + `sitemap.xml` | SEO baseline |

---

## ✅ Progress Tracking

- [x] 1. Shared `escapeHtml` utility (`js/utils/escape.js`)
- [ ] 2. Delete `ensureModal()` in `js/main.js`
- [ ] 3. Fix contact form action/path alignment
- [ ] 4. Add try/catch + fallback UI to all data loads
- [x] 5. Remove duplicate `escapeHtml` copies (7 locations) — `home.js`, `about-timeline.js` done
- [ ] 6. Create `renderProjectCard()` shared module
- [ ] 7. Create `Accordion` component
- [ ] 8. Configure component caching in `netlify.toml` OR embed header/footer
- [ ] 9. Add `&display=swap` to Google Fonts URLs
- [ ] 10. Create `content/writing.json` or remove Writing option
- [ ] 11. Move email to Netlify Dashboard, remove from `netlify.toml`
- [ ] 12. Add `fieldConfig` to `projects.json` for dynamic modal
- [ ] 13. Implement search index `sessionStorage` caching
- [ ] 14. Split `css/styles.css` into layered files
- [ ] 15. Remove HTML paper-grain divs, keep CSS pseudo
- [ ] 16. Fix `loadIncludes` to use `innerHTML`/`replaceWith`
- [ ] 17. Replace `execCommand('copy')` with `navigator.clipboard.writeText()`
- [ ] 18. Add `public/robots.txt` and `public/sitemap.xml`

---

## 📝 Notes

- **Lean total:** ~300 lines deletable via #3, #5, #6, #10, #15
- **Zero new dependencies** — all fixes use platform APIs or existing patterns
- **No framework/framework migration needed** — vanilla JS architecture is sound for this scale
- **Risk areas not audited:** Image optimization (PNG→WebP/AVIF), accessibility beyond accordion/modal, JSON schema validation for content files

---

## 🔧 Section Numbering & Tagging — Decisions Needed

### Current State
- **Home:** 00, 01, 02, 03
- **About:** 00, 01, 02, 03, 04
- **Work:** 02 (inconsistent)
- **Contact:** 00 (wrong class)
- **Now:** Custom (no `.section-tag`)

### Options
1. **Per-page numbering** (each page starts at 00) — simpler, self-contained
2. **Global numbering** (sequential across site) — more complex, requires coordination

### Pending Fixes
- [ ] Fix work.html section tag (`02 — Work` → `01 — Work` or `00 — Work`)
- [ ] Fix contact.html to use `.section-tag` instead of `.contact-eyebrow`
- [ ] Fix now.html to use `.section-tag` with proper numbering
- [ ] Decide on global vs per-page numbering scheme
- [ ] Remove legacy editorial index file (`k_s_vasanth_karthik_portfolio_editorial_index.html`)