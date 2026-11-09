# Portfolio Website Specification & Design Document

**Date:** 2026-11-09  
**Target Audience:** General public, recruiters, academic evaluators for Web Programming course.  
**Reference Site:** [aritroroy.com](https://aritroroy.com/)  

---

## 1. Executive Summary

This project is a multi-page, editorial portfolio website designed for high visual polish, complete content flexibility via an integrated Git-backed CMS (Decap CMS), and clear explainability for a Web Programming course. Every section of the site is driven by structured data (JSON/Markdown) rather than hardcoded text, allowing effortless updates.

---

## 2. Page Structure & Navigation

The website consists of 11 distinct pages, connected by a sticky top header with an editorial compass-mark logo and location tag:

1. **Home (`/index.html`)**
   - Hero header with conversational introduction & primary CTAs
   - **00 Proof**: 4-card statistics grid (events, sidequests, students, countries)
   - **02 Building Now**: Tagged active roles/projects (Community, Venture, Experiment)
   - **03 Field Notes**: Latest 3 writing posts with format tag and read times
   - **04 Worlds (Portfolio Hubs)**: Sub-discipline categories (Gaming, Photography, Film, Web Dev, Design Strategy, etc.)
   - **Career Timeline**: Horizontal stream mapping milestones from 2018 to present
   - **Contact**: Collaboration categories + direct contact links

2. **About (`/about.html`)**
   - Comprehensive bio, personal philosophy, photo gallery, and background narrative

3. **Work & Projects (`/work.html`)**
   - Filterable showcase of projects by category (Venture, Experiment, Web, Design, Sidequest)
   - Real-time client-side tag filtering & search

4. **Portfolios (`/portfolio.html`)**
   - Discipline hubs ("Worlds") leading to specialized sub-pages or project collections

5. **Blogs & Notes (`/writing.html`)**
   - Article archive with real-time filtering by topic and type (Essay, Reflection, Build Log)

6. **Now (`/now.html`)**
   - Current focus page detailing active projects, readings, and current goals

7. **Ways of Working (`/ways-of-working.html`)**
   - Collaboration style, principles, tools, and operational philosophy

8. **CV (`/cv.html`)**
   - Interactive, searchable career history & skill taxonomy

9. **Press (`/press.html`)**
   - Talks, media features, awards, and public appearances

10. **Search (`/search.html`)**
    - Instant client-side full-text search across work, writing, and pages

11. **Admin Panel (`/admin/index.html`)**
    - Decap CMS web interface for adding/updating content without touching code

---

## 3. Tech Stack

- **Frontend Core:** HTML5, CSS3 (Custom Properties, Flexbox, CSS Grid), Vanilla ES6+ JavaScript
- **Content Engine:** Decap CMS (Git-backed CMS writing to `/content/` as JSON/Markdown)
- **CMS Auth:** Netlify Identity (free tier)
- **Search Engine:** Fuse.js (lightweight fuzzy search)
- **Deployment:** Netlify (free starter tier with custom domain support)

---

## 4. Visual Design System

- **Background:** `#faf8f5` (Warm off-white editorial paper texture feeling)
- **Primary Text:** `#1a1a1a` (Deep editorial charcoal)
- **Accent Blue:** `#2f5fd6` (Vibrant electric blue for links, active states, and highlights)
- **Muted Gray:** `#b4b2b5` (Structural dividers, secondary metadata, borders)
- **Typography:** System Sans-Serif (`system-ui`, `-apple-system`, `Inter`, sans-serif) with high visual hierarchy
- **Section Numbering:** Numbered section prefixes (`00`, `02`, `03`, `04`) as key editorial design elements
