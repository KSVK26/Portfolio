# KSVK Portfolio --- Refinement Brief for Claude Code

**Website:** https://ksvk.netlify.app/\
**Owner:** K. S. Vasanth Karthik (KSVK)

## 1. First inspect the existing site

Inspect the repository, framework, routes, components, styling, fonts,
assets and current content before editing. Briefly report the current
structure and proposed changes, then implement them. This is a
refinement pass, not a complete redesign. Preserve the existing
editorial/minimal identity and reuse components where possible.

## 2. Updated positioning --- important

For the current public portfolio, do **not** foreground technology or
software development. There are no deployed technical projects ready to
showcase. These can be added later when they are deployed and
presentable.

Focus the public portfolio on: - Esports and tournament operations -
Event management and coordination - Creative work, design and branding -
Community and campaign work - Leadership, collaboration and execution

Do not position Vasanth as a software developer in the hero, About
introduction, homepage categories or featured work.

Temporarily hide these projects from all public-facing listings: -
Crisis Connect - HOK Stats Platform - explorX

Do not delete their source files, assets or project records. Keep them
available for a future update. Do not replace them with invented
projects or technical placeholders.

## 3. Homepage --- simplify and remove repetition

Use this structure: 1. Hero 2. `00 — Proof` 3. `01 — Current Work` (or
`01 — Areas of Work` if there are not enough confirmed active
initiatives) 4. `02 — Selected Work` 5. `03 — About` 6. Contact

Use sequential numbering. Do not skip section numbers.

### Hero copy

**K S VASANTH KARTHIK**

# I turn ideas into things that work.

I'm Vasanth --- working across esports operations, event management,
creative projects and communities. I enjoy bringing people together,
figuring out the details and turning ideas into experiences that work.

**ESPORTS OPERATIONS · EVENTS · CREATIVE WORK**

Primary CTA: `Explore my work`\
Secondary CTA: `A little about me`

Keep the hero concise. Do not repeat the full About biography here.

### `00 — PROOF`

**Heading:** Things I've been part of.

The previous draft mentioned `15+` tournaments managed and `10,000+`
players and teams coordinated. Confirm both figures and exactly what
they count before displaying them. If unverified, remove the numbers and
use qualitative proof points. Do not invent years of experience,
attendance, reach or impact statistics.

Keep metrics on the homepage only. Do not repeat them on About or every
project card.

### `01 — CURRENT WORK`

Only show genuinely active work, such as current CLT/Claxon
responsibilities or current esports/event/creative initiatives, if still
active and confirmed. If there are not enough confirmed active
initiatives, rename this to `01 — AREAS OF WORK` and show the
disciplines instead. Do not invent activity to fill the section.

### `02 — SELECTED WORK`

Feature a small selection of real projects and contributions: - CODM
Competitive Esports - Claxon Tournaments - SJ60 hololive production
Special Day - Code Carnage 2.0 - GLXY Awards (confirm edition and exact
contribution) - Selected esports design and creative work

Only include projects with genuine contributions and, ideally, visual
evidence.

Each card should show project name, concise description, category,
owner's role/contribution, verified year, status if relevant, and a
detail/external link if available. Avoid repeating long descriptions
from detail pages.

### `03 — ABOUT`

Use a short preview:

> I'm Vasanth --- a Computer Science student at SJBIT and someone who
> found his way into esports operations, event management, creative work
> and community building. I enjoy working behind the scenes, bringing
> people together and taking responsibility for making things happen.

CTA: `Read my story`

Do not foreground unfinished technical projects.

### Contact

**Heading:** Have something worth building?

> I'm always interested in interesting projects, collaborations and
> conversations with people who enjoy making things happen.

Use actual email and social URLs already present in the repository.
Never invent contact details.

## 4. Work archive

Change the page title from **Tournaments & Operations** to:

# Selected Work

Introduction:

> A collection of projects, events and initiatives I've been part of
> across esports, operations, creative work and communities.

Update filters to: - All - Esports - Operations - Creative - Community

Remove Technology/Development from the current public-facing filter UI.
Retain working search. Search should match project title, description,
categories, tags and role/contribution. Search and filters must work
together.

Keep the interface understated and editorial --- no dashboard-like
controls, oversized colourful pills or excessive decoration.

Use the existing central project data structure if one exists. A project
can belong to multiple categories. Hide technical project records from
public results without deleting them.

## 5. About page

The About page should explain the person and progression, not repeat the
homepage or Work archive.

Suggested structure: 1. Personal introduction 2. How I got into esports
3. Operations, events and working with people 4. Creative work and
communication 5. Working philosophy 6. Education and current interests
7. Timeline

Suggested introduction:

# A little curiosity goes a long way.

I'm Vasanth Karthik, a Computer Science student at SJBIT and someone
whose interests have taken him across esports, event operations,
creative work and community building.

I don't particularly enjoy staying in one lane.

What connects these different experiences is the process of making
things happen: understanding what needs to be done, working with people,
figuring out the details and seeing an idea through.

Keep these three existing philosophy principles, if present:

**Clarity prevents chaos.**\
Good planning and communication make execution easier.

**Empathy in enforcement.**\
People matter just as much as the process. Accountability works best
when paired with understanding.

**Ship, observe, refine.**\
Ideas become valuable when they're put into practice, evaluated and
improved.

Keep explanations concise. Remove: - Any statement describing the
portfolio as a course project. - Repeated homepage metrics. - Repeated
project descriptions that belong in Work. - Claims about technical
projects that are not publicly ready.

## 6. Timeline

Remove the standalone Timeline section from the homepage. Keep the
detailed timeline on About if it adds useful context.

Use verified dates only. Timeline strands can cover education, esports,
tournament operations, event coordination, creative work, leadership and
community involvement. Do not invent start dates or imply continuous
employment where there were separate projects or volunteer
contributions.

On mobile, make the timeline vertical and easy to scan.

## 7. Field Notes

If there are no published articles, remove Field Notes from the homepage
for now. Do not create fake article cards, placeholder publication dates
or empty "Latest Writing" content.

Possible future topics (ideas only, not published articles): - The Work
Behind the Tournament - Coordination Isn't Leadership - When the Plan
Falls Apart - Ideas Are Cheap. Execution Isn't. - Being Interested in
Too Many Things

## 8. Typography refinement --- high priority

The current subtitle and body text typography does not feel right.
Improve it deliberately rather than simply increasing font size.

### Inspect first

Identify the current font families for headings, subtitles and body
copy; font weights and available files; sizes; line heights; letter
spacing; paragraph widths; and responsive behaviour at desktop, tablet
and mobile.

Do not choose a new font blindly. Inspect the existing design and font
assets first.

### Desired personality

Editorial, refined, contemporary and readable. Supporting text should
feel intentional and polished, distinct from headings, comfortable for
longer paragraphs, and consistent across pages.

Use no more than two complementary font families unless the existing
design has a strong reason to use more.

Possible sans-serif directions to evaluate (not mandatory): Inter,
Manrope, DM Sans, IBM Plex Sans, Plus Jakarta Sans, or General Sans if
already available/licensed. Choose one that pairs well with the existing
heading typeface. Do not load all of them.

### Suggested starting hierarchy

  Element                   Desktop     Mobile
  ---------------------- ---------- ----------
  Hero supporting text     18--21px   16--18px
  Section subtitle         16--18px   15--17px
  Body text                16--18px   15--16px
  Project description      14--16px   14--15px
  Metadata / labels        11--13px   11--12px

Adjust after inspecting the existing design. Suggested line heights: -
Body: 1.6--1.75 - Subtitles: 1.45--1.6 - Project descriptions: 1.5--1.65

Use neutral or slightly adjusted tracking for normal text. Reserve
modest positive tracking for uppercase metadata. Avoid widely spaced
body copy, excessively thin body weights, tiny low-contrast subtitles,
overly wide paragraphs, and using the same size/weight for subtitles and
body text.

Pay particular attention to: - Hero supporting paragraph - Section
descriptions below numbered headings - About paragraphs - Project card
descriptions - Project detail text - Timeline descriptions - Contact
supporting text

Set sensible maximum text widths, consistent paragraph spacing, and
responsive line lengths.

Create reusable typography tokens in the existing styling system (CSS
variables or current token convention). Define font family, size,
weight, line height and letter spacing. Ensure fonts load efficiently
and do not cause layout shifts. Preserve the current heading character;
improve the supporting text system around it rather than changing the
entire visual identity.

## 9. Visual polish and UX

-   Keep the editorial/minimal direction.
-   Use consistent section spacing.
-   Standardise project-card image ratios.
-   Prefer real event photos, graphics and deliverables over generic
    stock images.
-   Keep hover and scroll interactions subtle.
-   Avoid excessive animation.
-   Make navigation and active-page states clear.
-   Ensure navigation, filters, search and buttons work.
-   Make layouts responsive and check mobile overflow.
-   Use semantic HTML, accessible focus states and adequate contrast.
-   Respect `prefers-reduced-motion`.
-   Optimise images and avoid unnecessary dependencies.

## 10. Content integrity rules

-   Do not invent metrics, awards, dates, testimonials, clients,
    outcomes or responsibilities.
-   Do not inflate the owner's role in team projects.
-   Distinguish employment, volunteer work, event roles and project
    contributions accurately.
-   Do not present planned/unfinished work as completed.
-   Do not delete technical project source material; only hide it from
    the current public-facing portfolio.
-   Do not add empty sections merely to make the homepage longer.
-   Do not add the deferred Aritro-style Worlds/category archive
    architecture.
-   Do not redesign the entire website unnecessarily.

## 11. Final checklist

### Content

-   [ ] Hide technical projects from public homepage and Work archive.
-   [ ] Preserve their source material and assets for later.
-   [ ] Remove redundant homepage/About copy.
-   [ ] Remove the course-project description.
-   [ ] Remove Field Notes if no real articles are published.
-   [ ] Move timeline to About.
-   [ ] Update Work title and filters.
-   [ ] Only show genuinely active work in Current Work.

### Typography

-   [ ] Inspect existing fonts and typography styles.
-   [ ] Improve subtitle/body font pairing.
-   [ ] Establish reusable typography tokens.
-   [ ] Improve paragraph width, line height and spacing.
-   [ ] Check contrast and readability.
-   [ ] Test desktop, tablet and mobile.

### Quality

-   [ ] Test navigation, links, filters and search.
-   [ ] Check responsive layouts.
-   [ ] Check image loading and layout shifts.
-   [ ] Run existing lint/build/test commands.
-   [ ] Summarise changed files and facts requiring confirmation.

**End goal:** A focused, polished portfolio presenting Vasanth's real
experience in esports operations, events, creative work and communities.
Technical projects can return once deployed and ready to demonstrate.
