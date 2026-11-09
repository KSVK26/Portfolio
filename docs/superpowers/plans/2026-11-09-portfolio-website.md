# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional, editorial, multipage portfolio website (modeled after aritroroy.com) featuring a stats grid, filterable work/projects, a horizontal career timeline, category hubs, client-side search, and a free Git-backed CMS (Decap CMS) for non-hardcoded content management.

**Architecture:** A static multi-page HTML/CSS/JS application with a centralized data-loading system (`data-loader.js`). Content is stored as plain JSON files under `/content/` and managed visually via Decap CMS hosted on Netlify with zero backend server overhead.

**Tech Stack:** HTML5, CSS3 (CSS Custom Properties, Flexbox, CSS Grid), Vanilla ES6+ JavaScript, Decap CMS, Fuse.js (Fuzzy search), Netlify Identity.

**Spec:** `docs/superpowers/specs/2026-11-09-portfolio-website-design.md`

## Global Constraints

- **Language Scope:** Standard HTML5, CSS3, ES6+ JavaScript (no framework build step required so it can be easily presented for course evaluation).
- **Color Palette:** Background `#faf8f5`, Text `#1a1a1a`, Accent Blue `#2f5fd6`, Muted `#b4b2b5`.
- **Responsive Layout:** Must render cleanly across mobile (320px+), tablet, and desktop viewports without horizontal scroll bleed.
- **Content Separation:** No hardcoded project/writing data in HTML; all items load dynamically from `/content/*.json`.
- **Admin Access:** Decap CMS interface available at `/admin/index.html`.

## Review Focus

- **Data Robustness:** Missing, malformed, or empty JSON content files must display fallback placeholders without throwing unhandled JS exceptions.
- **Filtering Performance:** Category and tag filter operations on Work and Writing pages must execute instantly without full page reloads.
- **Navigation Usability:** Sticky header remains accessible during scroll; mobile menu drawer toggles seamlessly.
- **Timeline Interaction:** Horizontal career timeline scrolls smoothly and adapts to variable content lengths.
- **Search Accuracy:** Full-text search accurately indexes title, tags, and descriptions across all content categories.

---

### Task 1: Core Design System & Navigation Layout

**Files:**
- Create: `css/styles.css`
- Create: `js/main.js`
- Create: `index.html` (scaffold frame)
- Create: `components/header.html`
- Create: `components/footer.html`

**Interfaces:**
- Consumes: Standard DOM API
- Produces: `renderHeader()`, `renderFooter()`, `initMobileNav()`, CSS custom variables (`--bg-color`, `--text-color`, `--accent-blue`, `--muted-gray`)

- [ ] **Step 1: Create global CSS with design tokens and reset**

Define custom properties `#faf8f5`, `#1a1a1a`, `#2f5fd6`, `#b4b2b5`, responsive typography, sticky header layout, and mobile drawer styles in `css/styles.css`.

- [ ] **Step 2: Implement header and footer component generator in `js/main.js`**

Implement reusable functions to insert the sticky navigation bar (logo, links, location tag, mobile menu toggle) and dual-column footer into any page.

- [ ] **Step 3: Test navigation responsiveness**

Open `index.html` in browser or local server and verify sticky header, active link state, mobile menu toggle, and dark/light color palette rendering.

- [ ] **Step 4: Commit**

```bash
git add css/styles.css js/main.js index.html components/
git commit -m "feat: setup core design system and responsive navigation components"
```

---

### Task 2: Content Data Architecture & Decap CMS Configuration

**Files:**
- Create: `content/stats.json`
- Create: `content/building-now.json`
- Create: `content/projects.json`
- Create: `content/writing.json`
- Create: `content/timeline.json`
- Create: `admin/config.yml`
- Create: `admin/index.html`

**Interfaces:**
- Consumes: Decap CMS CDN scripts (`decap-cms.js`)
- Produces: Valid JSON schema structure for site content and admin publishing interface

- [ ] **Step 1: Write JSON schemas and initial sample content**

Create structured JSON content files with sample data for stats, building-now roles, filterable projects, field notes/articles, and timeline events.

- [ ] **Step 2: Configure Decap CMS schema in `admin/config.yml`**

Define Decap CMS collection configurations pointing to `content/*.json` so non-technical users can add/update records via `/admin/`.

- [ ] **Step 3: Create `admin/index.html` panel entrypoint**

Include Decap CMS script tag and Netlify Identity widget.

- [ ] **Step 4: Verify JSON validity and admin file structure**

Run JSON linting / syntax validation on content files.

- [ ] **Step 5: Commit**

```bash
git add content/ admin/
git commit -m "feat: establish JSON content schemas and Decap CMS admin configuration"
```

---

### Task 3: Dynamic Data Loader Utility

**Files:**
- Create: `js/data-loader.js`

**Interfaces:**
- Consumes: `/content/*.json` files via `fetch()`
- Produces: `DataLoader.getStats()`, `DataLoader.getBuildingNow()`, `DataLoader.getProjects()`, `DataLoader.getWriting()`, `DataLoader.getTimeline()`

- [ ] **Step 1: Implement `js/data-loader.js` with caching and error handling**

Write standard ES6 asynchronous fetch wrapper functions that load JSON data, handle missing files gracefully with fallback objects, and expose clean getter methods.

- [ ] **Step 2: Write browser-executable test check for data loading**

Verify loading of all content collections in browser developer tools console.

- [ ] **Step 3: Commit**

```bash
git add js/data-loader.js
git commit -m "feat: add client-side asynchronous data loader with fallback handling"
```

---

### Task 4: Home Page Layout & Components

**Files:**
- Modify: `index.html`
- Create: `js/home.js`

**Interfaces:**
- Consumes: `DataLoader` API from Task 3
- Produces: Rendered Hero section, 00 Proof Grid, 02 Building Now cards, 03 Field Notes list, 04 Worlds hubs grid, Horizontal Timeline, and Contact block

- [ ] **Step 1: Build home page HTML structure in `index.html`**

Set up semantic HTML sections (`#hero`, `#stats`, `#building-now`, `#writing`, `#worlds`, `#timeline`, `#contact`) with numbered header styling.

- [ ] **Step 2: Implement dynamic rendering logic in `js/home.js`**

Fetch data via `DataLoader` and dynamically construct HTML cards for statistics, active roles, writing highlights, portfolio sub-worlds, and horizontal career timeline stream.

- [ ] **Step 3: Verify home page rendering and layout**

Ensure all sections load data cleanly, numbers format correctly, and the timeline scrolls horizontally on touch/mouse.

- [ ] **Step 4: Commit**

```bash
git add index.html js/home.js
git commit -m "feat: assemble complete editorial home page with dynamic data rendering"
```

---

### Task 5: Work & Projects Page with Real-Time Filtering

**Files:**
- Create: `work.html`
- Create: `js/work.js`

**Interfaces:**
- Consumes: `DataLoader.getProjects()`
- Produces: Interactive filter bar (All, Venture, Experiment, Web, Design, Sidequest), search input, and responsive project cards grid

- [ ] **Step 1: Create `work.html` page template**

Build header banner, filter button bar container, search text input, and project grid container.

- [ ] **Step 2: Implement category filtering and live search in `js/work.js`**

Write filter function that listens to button clicks and keyup events on search input to toggle card visibility smoothly.

- [ ] **Step 3: Test filtering and search interactions**

Verify clicking filter pills isolates matching project cards and text search narrows results immediately.

- [ ] **Step 4: Commit**

```bash
git add work.html js/work.js
git commit -m "feat: implement filterable work & projects page with real-time tag search"
```

---

### Task 6: Writing & Field Notes Page with Topic Filters

**Files:**
- Create: `writing.html`
- Create: `js/writing.js`

**Interfaces:**
- Consumes: `DataLoader.getWriting()`
- Produces: Article listing sorted by date, topic filter tags, format badges (Essay, Reflection, Log), and read-time indicators

- [ ] **Step 1: Create `writing.html` template and `js/writing.js` rendering logic**

Build writing repository UI with category filters and article summary rows.

- [ ] **Step 2: Verify filtering and layout on writing page**

Test selecting different article format filters (Essay, Build Log, Reflection).

- [ ] **Step 3: Commit**

```bash
git add writing.html js/writing.js
git commit -m "feat: create field notes & writing archive page with topic filtering"
```

---

### Task 7: Additional Multipage Views (About, Portfolios Hub, Now, Ways of Working, CV, Press)

**Files:**
- Create: `about.html`
- Create: `portfolio.html`
- Create: `now.html`
- Create: `ways-of-working.html`
- Create: `cv.html`
- Create: `press.html`
- Create: `js/cv.js`

**Interfaces:**
- Consumes: `DataLoader` API and JSON data files
- Produces: Full multi-page experience corresponding to reference site navigation

- [ ] **Step 1: Build `about.html`, `portfolio.html`, `now.html`, `ways-of-working.html`, `press.html`**

Construct editorial layouts for bio narrative, discipline hubs, current focus items, collaboration principles, and press mentions.

- [ ] **Step 2: Build `cv.html` with interactive timeline view**

Render searchable career history, skills taxonomy, and downloadable PDF action link.

- [ ] **Step 3: Verify page links across all subpages**

Click through header/footer navigation on all 10 site pages to ensure zero broken routes.

- [ ] **Step 4: Commit**

```bash
git add about.html portfolio.html now.html ways-of-working.html cv.html press.html js/cv.js
git commit -m "feat: complete all subpage layouts and cross-linking"
```

---

### Task 8: Global Search Integration

**Files:**
- Create: `search.html`
- Create: `js/search.js`

**Interfaces:**
- Consumes: Fuse.js library (CDN) + all JSON content collections
- Produces: Full-text search page with query parameter URL support (`/search.html?q=query`) and highlighted search result matches

- [ ] **Step 1: Create `search.html` and search index builder in `js/search.js`**

Combine projects, writing, CV, and pages into a single Fuse.js index.

- [ ] **Step 2: Implement search results renderer with match highlighting**

Render query input, live search count, and grouped result cards.

- [ ] **Step 3: Test global search across all content types**

Search for keywords from different sections and confirm accurate result grouping.

- [ ] **Step 4: Commit**

```bash
git add search.html js/search.js
git commit -m "feat: integrate full-text client-side search across all site content"
```

---

### Task 9: Netlify Deployment Configuration & Admin Setup Guide

**Files:**
- Create: `netlify.toml`
- Create: `README.md` (updated project documentation)

**Interfaces:**
- Consumes: Netlify build configuration schema
- Produces: Production deployment configuration and user documentation for Decap CMS management

- [ ] **Step 1: Configure `netlify.toml` redirects and headers**

Setup SPA routing fallbacks for CMS admin path and standard HTTP cache headers.

- [ ] **Step 2: Write comprehensive project documentation in `README.md`**

Document tech stack architecture, local execution instructions, Netlify Identity setup steps, Decap CMS usage guide, and course presentation notes.

- [ ] **Step 3: Final verification pass**

Validate complete site locally and check git repository status.

- [ ] **Step 4: Commit**

```bash
git add netlify.toml README.md
git commit -m "docs: finalize deployment configuration and admin user documentation"
```
