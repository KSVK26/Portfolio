# KSVK Portfolio --- Content & Implementation Brief

**Owner:** K. S. Vasanth Karthik (KSVK)\
**Website:** https://ksvk.netlify.app/\
**Purpose:** Give Claude Code a clear, actionable brief to improve the
existing portfolio and replace placeholder content.

------------------------------------------------------------------------

## 1. Instructions for Claude Code

First inspect the existing repository and website implementation before
changing anything.

1.  Identify the framework, routing, styling system, component
    structure, assets, and current page sections.
2.  Preserve the existing visual identity and useful components. Do not
    rebuild the site from scratch unless the current implementation
    makes that necessary.
3.  The intended direction is **multidisciplinary + editorial +
    minimal + premium**.
4.  Make the portfolio responsive, accessible, fast, and easy to
    maintain.
5.  Use the content in this document as the source of truth, but do not
    invent dates, metrics, employers, awards, URLs, client names, or
    outcomes.
6.  Where a fact is marked **VERIFY**, keep it out of public-facing copy
    until confirmed. Use a clear TODO in code or ask for confirmation.
7.  Do not fabricate screenshots or use unrelated stock images as if
    they are project deliverables. Use existing project assets where
    available; otherwise use tasteful neutral placeholders that are
    clearly replaceable.
8.  Before implementation, provide a short summary of the current site
    structure and the changes you plan to make. Then implement the
    changes.
9.  Keep the site's existing numbered editorial structure where
    practical (for example: `00 — Proof`, `02 — Building Now`,
    `03 — Field Notes`, `04 — Worlds`).
10. Do not add fake testimonials, client logos, inflated statistics,
    fake project outcomes, or generic claims such as "expert in
    everything".

### Core positioning

**Name:** K. S. Vasanth Karthik\
**Short name:** Vasanth\
**Handle:** KSVK\
**Location:** Bengaluru, India\
**Education:** Computer Science Engineering, Data Science
specialisation, SJBIT\
**Positioning:** Multidisciplinary builder working across esports
operations, technology, and creative work.

**Primary headline:**

> I turn ideas into things that work.

**Supporting description:**

> I'm Vasanth --- a multidisciplinary builder working across esports,
> technology and creative projects. From managing competitive
> tournaments and coordinating teams to developing digital products and
> creating visual experiences, I enjoy taking ideas from concept to
> execution.

**Discipline line:**

> Esports Operations · Technology · Creative Work

The portfolio must communicate one coherent identity. Do not make the
owner appear to be three unrelated professionals. The connecting thread
is taking responsibility for turning ideas into working outcomes.

------------------------------------------------------------------------

## 2. Audience and design direction

### Target audience

A balanced professional portfolio for: - Recruiters and companies -
Esports organisations and tournament operators - Developers and
potential collaborators - Potential freelance clients - College and
academic communities

### Visual direction

-   Editorial, minimal, premium
-   Strong typography and clear hierarchy
-   Restrained accent colour
-   Generous but intentional whitespace
-   Subtle transitions and hover states
-   Consistent spacing, grid, and image treatment
-   Avoid excessive gradients, neon effects, decorative cards, and
    unnecessary animations
-   Mobile-first responsive behaviour

The site should feel like a curated personal archive, not a generic
student résumé template.

------------------------------------------------------------------------

## 3. Recommended site structure

Retain the existing navigation and numbered section approach where
possible.

### Main navigation

-   Home
-   Work
-   About
-   Timeline
-   Contact

Field Notes can be a homepage section initially; make it a separate
route only if the existing site architecture supports it cleanly or
there is enough published content.

### Homepage section order

1.  Hero
2.  `00 — Proof`
3.  `01 — Building Now`
4.  `02 — Field Notes`
5.  `03 — Worlds` / selected work categories
6.  About preview
7.  Contact

If the current site uses different numbering, preserve its existing
convention consistently rather than forcing these exact numbers.

------------------------------------------------------------------------

## 4. Homepage copy

### Hero

**K S VASANTH KARTHIK**

# I turn ideas into things that work.

I'm Vasanth --- a multidisciplinary builder working across esports,
technology and creative projects.

From managing competitive tournaments and coordinating teams to
developing digital products and creating visual experiences, I enjoy
taking ideas from concept to execution.

**Esports Operations · Technology · Creative Work**

Primary CTA: `Explore my work`\
Secondary CTA: `A little about me`

Optional small metadata: - Bengaluru, India - Computer Science
Engineering --- Data Science - KSVK

### `00 — PROOF`

**Heading:** Things I've been part of.

Use verified metrics only. The previous draft mentioned: - `15+`
tournaments managed - `10,000+` players and teams coordinated

**VERIFY BOTH METRICS BEFORE DISPLAYING.** Confirm what counts as a
tournament, whether the number refers to unique players/teams or total
participation, and the evidence behind the figures. If unverified,
replace the numbers with qualitative proof points, such as: - Tournament
operations and administration - Event coordination and execution -
Technical and creative projects - Cross-functional collaboration

Do not invent a years-of-experience metric.

### `01 — BUILDING NOW`

**Heading:** A few things keeping me busy.

#### Crisis Connect

A rapid crisis-response platform developed as a team project for the
Google Solutions Challenge 2026, focused on connecting people who need
assistance with response teams.

**Role:** DevOps & QA Lead\
**Status:** In development / confirm current status\
**Focus:** Development workflows, Git/GitHub collaboration, environment
setup, integration coordination, and quality assurance.

#### HOK Stats Platform

A planned reusable esports statistics platform for tournament
organisers, beginning with Honor of Kings.

**Status:** Planning / architecture\
**Focus:** Product planning, database architecture, and defining a
practical MVP.

Planned features: - Player profiles and performance statistics - Match
MVP - Head-to-head comparisons - Team comparisons - Top performers -
Tournament awards

Do not describe planned features as already implemented.

#### explorX

A 2.5D science-fiction exploration game being developed using Godot.

The story follows Rix, a space traveller journeying across unfamiliar
planets to reach his grandfather.

**Status:** In development / experimental\
**Focus:** Game concept, world-building, environment design, map
planning, gameplay progression, and asset direction.

Do not claim a finished game or published release.

### `02 — FIELD NOTES`

**Heading:** Thoughts from the process.

**Description:**

Ideas, observations and lessons from working with people, organising
events, building projects and figuring things out along the way.

Suggested article ideas (do not create full articles unless
requested): - The Work Behind the Tournament - Coordination Isn't
Leadership - When the Plan Falls Apart - Building With a Small Team -
Ideas Are Cheap. Execution Isn't. - Being Interested in Too Many Things

If no articles exist yet, show a restrained "Coming soon" state or omit
the section. Do not create fake article dates or pretend drafts are
published.

### `03 — WORLDS`

**Heading:** Different interests. One workspace.

#### Esports & Operations

Behind-the-scenes work that makes competitive gaming happen.

#### Technology & Development

Applications, systems and experiments built to solve problems.

#### Design & Creative

Visual identities, digital campaigns and creative execution.

#### Community & Events

Bringing people together and making experiences happen.

Each category should link to a filtered Work archive view if filtering
exists or can be added simply.

### About preview

**Heading:** Not particularly interested in doing just one thing.

I'm a Computer Science student specialising in Data Science at SJBIT,
Bengaluru.

I've found myself working across different spaces --- competitive
esports, event operations, technology, design and community building.

What connects them is the process of making things happen: understanding
a problem, working with people, figuring out the details and seeing an
idea through.

I'm interested in the work that happens between having an idea and
making it real.

CTA: `Read my story`

### Contact preview

**Heading:** Have something worth building?

I'm always interested in interesting projects, collaborations and
conversations with people who enjoy making things happen.

CTA: `Get in touch`

------------------------------------------------------------------------

## 5. Work archive

### Page introduction

# Selected Work

A collection of things I've worked on.

A mix of competitive esports, event operations, technology, design and
community initiatives.

Not everything here is the same kind of work. Some projects involved
leading operations, others involved coordinating teams, creating
campaigns or building technical solutions.

What they share is the experience of taking responsibility and
contributing to something beyond an idea.

### Filters

Use these categories: - All - Esports & Tournament Operations - Event
Operations & Management - Technology & Development - Design & Creative -
Community & Marketing

Use concise card metadata: - Project name - Category - Year (only if
verified) - Role / contribution - Status: Completed, Ongoing, Planning,
or Experimental

Do not make all projects visually equal. Feature the strongest case
studies first and keep smaller contributions in a secondary archive.

### Project content

#### CODM Competitive Esports

**Category:** Esports & Tournament Operations\
**Status:** Ongoing / historical body of work; verify current
involvement

Working across the Call of Duty: Mobile competitive ecosystem, with
involvement in tournament administration, competitive formats, match
coordination and community operations.

Potential contribution areas: - Tournament and league administration -
Qualifier and playoff format planning - Team and player coordination -
Match operations and competitive workflows - Community communication and
tournament promotion

Only list activities that accurately describe the owner's direct
contribution. Add specific tournament names, dates, formats, and
outcomes only after verification.

#### Claxon Tournaments

**Category:** Event Operations & Management\
**Role:** Operations Executive at CLT\
**Status:** Verify current role/status

Working in tournament and event operations, contributing to campaign
execution and coordination across stakeholders.

Potential contribution areas: - Operational coordination - Event and
campaign execution - Content calendar coordination - Merchandise and
ticket promotion workflows - Cross-team communication

Use the official organisation name and exact role title consistently. Do
not invent employment dates or claim sole ownership of team outcomes.

#### SJ60 hololive production Special Day

**Category:** Event Operations / Community & Marketing\
**Status:** Event campaign work; confirm dates and exact involvement

An event initiative involving hololive production, with campaign and
merchandise communications.

Potential contribution areas: - Social media content coordination -
Publishing schedules and campaign planning - Merchandise pre-order
communications - Ticket promotion and deadline updates - Coordination of
event-related information

Use the exact event name: **SJ60 hololive production Special Day**.

#### Code Carnage 2.0

**Category:** Event Operations & Management\
**Role:** Coordinator (confirm exact title)\
**Status:** Completed / verify

A hackathon initiative where the owner contributed to planning and
on-ground execution.

Potential contribution areas: - Event coordination - Volunteer
management - Participant and team coordination - Operational
problem-solving - On-ground execution

Do not imply sole event ownership.

#### Crisis Connect --- Rapid Crisis Response

**Category:** Technology & Development\
**Role:** DevOps & QA Lead\
**Status:** In development; verify current status

A team project developed for the Google Solutions Challenge 2026,
focused on improving the connection between people requiring assistance
and response teams.

Known contribution areas: - Development environment and workflow setup -
Git and GitHub collaboration - Branching and pull-request workflows -
Development environment troubleshooting - Quality assurance and
integration coordination

The project used a team of four. Do not claim sole development or
ownership of the entire application.

#### HOK Stats Platform

**Category:** Technology & Development / Esports\
**Role:** Product planning and database architecture\
**Status:** Planning / architecture

A proposed statistics and tournament-management platform for Honor of
Kings esports.

The concept focuses on making tournament statistics easier to collect,
organise and present.

Planned features: - Player profiles and performance statistics - Match
MVP selection - Head-to-head player comparisons - Team comparisons - Top
performers - Tournament awards

Be explicit that this is a planned product unless implementation has
progressed.

#### explorX --- Explore-X

**Category:** Technology & Development / Creative\
**Role:** Game concept, design and development\
**Status:** Experimental / in development

An experimental 2.5D exploration game being developed using Godot.

The game follows Rix, a space traveller journeying across unfamiliar
planets to reach his grandfather.

Known creative work: - Game concept and world-building - Environment and
map design - Character and asset planning - Gameplay and progression
ideas - Visual direction and asset creation

Do not imply the game is complete or commercially released.

#### GLXY Awards

**Category:** Design & Creative / Esports\
**Status:** Verify year and exact contribution

An esports awards initiative focused on recognising achievements and
contributions within the competitive gaming community.

Potential contribution areas: - Branding and visual communication -
Promotional creative work - Event-related content

**VERIFY:** Previous notes mention GLXY Awards 2025 and also older GLXY
Awards work. Confirm whether these are separate editions/projects and
describe the owner's exact contribution to each. Do not merge them into
one misleading case study.

#### Additional creative work

Use a flexible gallery for: - Esports visual communication - Tournament
announcements - Event promotional graphics - Social media campaign
assets - Personal creative experiments

Do not imply every visual was client work. Label personal experiments
accordingly.

------------------------------------------------------------------------

## 6. Individual project case-study template

Use this structure for detailed project pages. Only populate facts that
are known.

# \[Project Name\]

**Category:** \[Category\]\
**Role:** \[Exact role\]\
**Period:** \[Verified dates\]\
**Status:** \[Completed / Ongoing / Planning / Experimental\]

### Overview

What the project is, who it serves, and why it exists.

### The challenge

What problem, constraint, or need the project addressed.

### My role

Clearly explain what the owner was personally responsible for. Separate
individual work from team output.

### What I worked on

Specific tasks, decisions, deliverables, and responsibilities.

### Outcome

Only measurable, evidenced outcomes. If no verified outcome is
available, describe the current status and what was learned instead.

### Tools and methods

Only tools actually used on this project.

### Gallery

Use real screenshots, graphics, event photos, diagrams, or other
relevant assets. Add descriptive alt text.

------------------------------------------------------------------------

## 7. About page

# About

## A little curiosity goes a long way.

I'm Vasanth Karthik, a Computer Science student, esports operations
professional and multidisciplinary creator based in Bengaluru, India.

I don't particularly enjoy staying in one lane.

My interests have taken me from competitive gaming communities to
tournament operations, event management, software projects, graphic
design and digital campaigns. Each has taught me something different,
and more importantly, given me a different way to approach problems.

### The esports side

Competitive gaming was one of my earliest entry points into working with
communities and organised competition.

Over time, I moved beyond simply following the games. I became involved
in tournament administration, competitive formats, match coordination,
team communication and the operational work that keeps events running.

I've worked with tournament organisers, players, volunteers and creative
teams. I've experienced the pressure of deadlines, unexpected problems
and situations where someone has to step in and make a decision.

It's where I learned that good execution is rarely accidental.

### The technology side

I'm pursuing Computer Science Engineering with a specialisation in Data
Science at SJBIT.

I'm interested in building useful digital products, understanding how
systems work and solving problems through technology.

My projects have taken me into web applications, database planning,
data-driven platforms, DevOps workflows and game development.

I enjoy the process of taking an abstract problem and turning it into
something people can actually use.

### The creative side

I've also spent time working on visual communication, branding and
digital content.

From esports graphics and tournament promotions to event campaigns and
social media content, I've learned to appreciate the importance of how
something is presented.

Good design isn't just about making something look attractive. It's
about communicating the right thing to the right people.

### How I approach things

**Clarity over confusion.**\
A good plan makes execution easier. I value clear communication, defined
responsibilities and systems that people can actually follow.

**People are part of the process.**\
Projects don't happen in isolation. Good collaboration requires
listening, accountability and understanding the people involved.

**Execution over empty ideas.**\
Ideas are easy to talk about. I find more value in testing them,
building them, learning from what doesn't work and improving the result.

**Stay curious.**\
I'm still learning, experimenting and finding new things worth pursuing.
I don't think that should stop.

### Outside the work

I'm interested in gaming, visual storytelling, digital media, music and
exploring new ideas.

I enjoy documenting experiences, creating things and occasionally
getting carried away with a project because I think it could be better.

That's probably not changing anytime soon.

### Current snapshot

**Based in:** Bengaluru, India\
**Education:** Computer Science Engineering --- Data Science, SJBIT\
**Interests:** Esports, technology, creative work, gaming and community
building\
**Open to:** Interesting projects, professional opportunities and
collaborations

------------------------------------------------------------------------

## 8. Timeline page

# The Timeline

## A work in progress.

A record of the experiences, responsibilities and projects that have
shaped what I do today.

Use a chronological timeline with verified dates only. The following is
a draft structure, not a confirmed career history:

-   **2021 --- Entering competitive gaming:** Developing an interest in
    competitive gaming and becoming increasingly involved in the esports
    ecosystem.
-   **2023 --- Expanding the creative side:** Esports-related creative
    and promotional initiatives; verify exact project and contribution.
-   **2024--2025 --- Tournament operations and community work:**
    Expanding involvement in tournament administration, competitive
    formats, match coordination and esports communities. Verify dates.
-   **2025--2026 --- Event coordination:** Code Carnage 2.0 and other
    event coordination responsibilities. Verify dates and title.
-   **2026 --- CLT:** Operations Executive role. Verify start date and
    current status.
-   **2026 --- Crisis Connect:** DevOps & QA Lead on a team project for
    Google Solutions Challenge 2026.
-   **2026 --- Independent building:** HOK Stats planning and explorX
    game development.

Do not publish uncertain dates. If exact dates cannot be confirmed, use
year ranges only when reliable or omit the date.

------------------------------------------------------------------------

## 9. Skills and capabilities

Organise skills into capability groups rather than presenting a wall of
logos.

### Operations & Management

-   Tournament administration
-   Event coordination
-   Team and volunteer coordination
-   Competitive format planning
-   Stakeholder communication
-   Campaign coordination

### Technology & Development

-   Python
-   Java
-   SQL
-   Web development
-   Database design
-   Git and GitHub
-   DevOps workflows
-   Godot

### Data & Problem Solving

-   Data analysis
-   Python Pandas
-   Statistical methods
-   Data visualisation
-   Database architecture
-   Quality assurance

### Creative & Communication

-   Graphic design
-   Adobe Photoshop
-   Branding and visual communication
-   Social media content
-   Digital campaign planning
-   Creative direction

**Important:** Treat these as draft skill categories. Show proficiency
honestly. Do not label the owner an expert in tools or technologies
without evidence. Technologies used in a project should be distinguished
from technologies currently being learned. Do not list Illustrator as a
skill unless proficiency is established.

------------------------------------------------------------------------

## 10. Field Notes / article ideas

Do not generate fabricated articles or dates. These are proposed topics
for future writing:

1.  **The Work Behind the Tournament** --- What players don't see behind
    competitive events.
2.  **Coordination Isn't Leadership** --- The difference between
    assigning tasks and taking ownership.
3.  **When the Plan Falls Apart** --- Handling unexpected situations
    during events.
4.  **Building With a Small Team** --- Lessons from Crisis Connect.
5.  **Ideas Are Cheap. Execution Isn't.** --- Why implementation matters
    more than planning.
6.  **Being Interested in Too Many Things** --- Finding a common thread
    between technology, esports and creativity.

If no articles are ready, show a minimal empty state or omit the section
until there is real content.

------------------------------------------------------------------------

## 11. Contact page

# Let's connect

## Have something interesting in mind?

Whether it's a project, a collaboration, an opportunity or simply an
interesting conversation, I'd be glad to hear from you.

I'm particularly interested in connecting with people working across
technology, esports, creative industries and community-driven
initiatives.

**Find me elsewhere**

-   LinkedIn --- Professional updates and experience.
-   GitHub --- Projects, experiments and code.
-   Instagram --- Personal and creative work.
-   Email --- For professional enquiries and collaborations.

**Based in Bengaluru, India.**

Currently open to interesting opportunities and collaborations.

> Good things usually start with a conversation.

Use actual profile URLs and email addresses from the repository or ask
the owner. Never invent contact details.

------------------------------------------------------------------------

## 12. Technical and UX requirements

### Responsive design

-   Ensure the homepage, navigation, project cards, filters, and contact
    section work on mobile, tablet, and desktop.
-   Avoid horizontal overflow.
-   Keep tap targets comfortably sized.
-   Test long project titles and metadata on narrow screens.

### Accessibility

-   Use semantic HTML landmarks and heading hierarchy.
-   Add meaningful alt text to informative images.
-   Ensure keyboard navigation and visible focus states.
-   Maintain adequate text/background contrast.
-   Respect `prefers-reduced-motion`.
-   Do not rely on colour alone to convey project status.

### Performance

-   Optimise and appropriately size images.
-   Use modern formats such as WebP/AVIF where supported.
-   Lazy-load below-the-fold images.
-   Avoid unnecessary animation libraries or heavy dependencies.
-   Keep layout shifts low by specifying image dimensions/aspect ratios.

### SEO and sharing

-   Add descriptive page titles and meta descriptions.
-   Add Open Graph and social sharing metadata.
-   Use canonical URLs where appropriate.
-   Ensure each project page has a meaningful title and description.
-   Add a favicon using the existing KSVK identity/monogram if
    available.

### Interaction

-   Navigation links must work.
-   Project filters must actually filter projects.
-   Buttons must lead somewhere meaningful.
-   Avoid decorative controls that do nothing.
-   Keep motion restrained and purposeful.

### Content integrity

-   Do not invent metrics, awards, testimonials, clients, dates, project
    outcomes, or responsibilities.
-   Do not present planned features as implemented.
-   Clearly distinguish individual contributions from team outcomes.
-   Do not present illustrative stock imagery as actual project work.
-   Do not claim the owner built an entire team project alone.
-   Remove any copy that describes the portfolio itself as a course
    project.

------------------------------------------------------------------------

## 13. Final implementation checklist

### Before coding

-   [ ] Inspect repository and current routes.
-   [ ] Identify current components and styling conventions.
-   [ ] Identify existing images, logos, project screenshots, and links.
-   [ ] Report current structure and proposed changes.

### Homepage

-   [ ] Replace placeholder hero copy.
-   [ ] Add verified proof points or qualitative alternatives.
-   [ ] Add current projects with accurate statuses.
-   [ ] Add work-category links.
-   [ ] Add About preview and contact CTA.

### Work

-   [ ] Implement category filters.
-   [ ] Add project cards with role and status.
-   [ ] Prioritise selected case studies.
-   [ ] Use real assets where available.
-   [ ] Build reusable project detail layout if appropriate.

### About and Timeline

-   [ ] Add About copy.
-   [ ] Add capability groups.
-   [ ] Add timeline only with verified dates.

### Final quality

-   [ ] Check mobile and desktop layouts.
-   [ ] Check all navigation and CTA links.
-   [ ] Check accessibility and contrast.
-   [ ] Check image loading and performance.
-   [ ] Check metadata and social previews.
-   [ ] Run the project's existing lint/build/test commands.
-   [ ] Summarise files changed and facts still requiring owner
    confirmation.

------------------------------------------------------------------------

## 14. Facts requiring confirmation before public launch

Keep a clear TODO list for these items:

1.  Are `15+ tournaments` and `10,000+ players and teams` accurate, and
    how are they counted?
2.  Exact start date of CODM esports involvement.
3.  Exact dates and contribution for each CODM organisation/tournament.
4.  Exact CLT title, start date, and current status.
5.  Exact Code Carnage 2.0 title, dates, and responsibilities.
6.  Whether GLXY Awards 2025 is distinct from earlier GLXY Awards work.
7.  Current status and publicly shareable screenshots for Crisis
    Connect.
8.  Current implementation status of HOK Stats.
9.  Current implementation status and available screenshots/build of
    explorX.
10. Actual LinkedIn, GitHub, Instagram and professional email URLs.

**End goal:** A cohesive, credible, editorial portfolio that
communicates Vasanth's multidisciplinary strengths through real work and
clear personal contributions --- without exaggeration or generic résumé
language.
