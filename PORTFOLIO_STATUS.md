# Portfolio Status — Done / Left / Suggested Fixes

## ✅ Done (committed `57837f0`)

- Homepage structure per brief: Hero → 00 Proof → 01 Areas of Work → 02 Selected Work → 03 About preview → Contact.
- Hero copy matches brief verbatim.
- Work archive renamed to "Selected Work"; filters All/Esports/Operations/Creative/Community; search matches title/description/category/role/org/tags.
- About page has full §5 structure (intro → esports origins → ops/events → creative → 3 philosophy principles → education → timeline).
- Typography tokens exist in `css/styles.css` (`--type-body-size`, `--type-body-line`, `--type-subtitle-size`, `--type-subtitle-line`, `--type-meta-size`, `--type-text-max`).
- Header/footer Timeline links removed.
- Technical projects (Crisis Connect, HOK Stats, explorX) don't exist in the repo — nothing to hide or delete.

## 🔄 In flight (uncommitted, working tree)

| File | Change |
|------|--------|
| `js/timeline.js` | Restored to committed horizontal version |
| `content/timeline.json` | Restored to committed version (7 items, 2020–2026) |
| `css/styles.css` | Restored to committed horizontal version + mobile breakpoint |
| `content/stats.json` | `number` values changed from qualitative phrases to `"—"` placeholders |
| `js/home.js` | Removed inline `font-size` overrides on `.stat-number` |
| `components/footer.html` | LinkedIn URL fixed to `7264842b0` |
| `js/contact.js` | LinkedIn URL fixed to `7264842b0` |
| `content/writing.json` | Removed unverified metrics (15+ tournaments, 10,000+ players, 2,500+ teams, 6+ organizers) from all 3 article bodies |
| `work.html` | Search placeholder "Search tournaments by…" → "Search projects by…" |
| `cv.html` | "Download PDF" `href="#"` → `href="cv.pdf"` |
| `contact.html` | Removed "technology" from body copy |
| `about.html` | `06 — Timeline` → `06 — Places & Roles` |
| `timeline.html` | `00 — Timeline / The Timeline` → `00 — Places & Roles / Places & Roles` |

## ⏳ Left — decisions only you can make

1. **Field Notes (`writing.json`) stays or goes?** §7 says remove if no published articles. There are 3 real articles, so the trigger doesn't fire. LEFT.md flagged it as your call.
2. **Orgs/timeline structure.** You floated: separate page for projects/events/orgs, or merge orgs into the timeline, or timeline-only-for-main-arcs. The overlapping-orgs problem (being in multiple orgs at the same time, with months) is real and unsolved.
3. **`portfolio.html` ("Worlds") and `press.html` are filler.** Worlds lists Modelling, Photography, Film/TV, Web Development; press has 3 hardcoded cards (London Design Week 2025, EIA Portugal 2024, New Delhi workshop 2024). None backed by repo content. Recommend removing or marking "coming soon."

## 🔧 Suggested fixes / improvements

**High impact, low effort**

1. **Every project card shows a gradient placeholder — zero real images.** All 10 entries in `projects.json` have `"image": ""`. This is the single biggest visual gap. §9 wants real photos/graphics.
2. **`00 — Proof` looks like a metrics dashboard but contains no metrics.** Now uses `"—"` placeholders. Either give it real verified numbers or restructure as proof points without the fake-number chrome.
3. **Hero photo is the brand logo.** `index.html` uses `ksvk-black.png` (same file as favicon + brand logo). `ksvk.png` (266KB colour original) is the actual photo.
4. **`css/styles.css` has a dead first `.card` block** (lines ~290–339) entirely overridden by the second `.card` block (~342–428). It also contains a latent typo: `border-top: 1px solid var(--border-col)` — `--border-col` doesn't exist (should be `--border-color`).
5. **Inline `style=` attributes defeat the typography tokens** in `index.html` (hero h1, hero subtitle, About preview) and `js/home.js` (stat cards, areas cards).

**Copy/SEO consistency**

6. **"technology" still appears in meta descriptions** on `work.html`, `timeline.html`, `writing.html`, `cv.html`, `now.html`, `search.html`, `portfolio.html`, `press.html`, `ways-of-working.html`, `contact.html`. Brief says don't foreground tech. (Most now fixed; verify remaining.)
7. **Degree named inconsistently**: about.html says "Computer Science student at SJBIT", timeline.json says "Computer Science Engineering… Data Science", about §05 says "Computer Science – Data Science". Pick one.
8. **`js/cv.js` renders the timeline flat** (no year grouping) while `timeline.js` renders it grouped — same data, two different renderings.

**Content integrity (brief §10)**

9. **The three Field Notes articles carry the exact unverified metrics the brief removed from the homepage.** `writing.json` bodies said "15+ tournaments and 10,000+ players managed across 6+ major organizers" (rulebooks), "10,000+ players, 2,500+ teams" (lobbies), "Fifteen tournaments. Six major organizers. Ten thousand players." (lessons). Now removed from all three.