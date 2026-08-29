# Luis Echarri Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a 5-page static job-application portfolio site for Luis Antonio Echarri Jr, positioned as "SEO Specialist," live at `luisecharri.pages.dev`. Real purpose: applications to hiring agencies — see spec's 2026-08-29 Purpose revision.

**Architecture:** Static HTML/CSS/JS, no framework, no build step. Shared nav/footer injected via JS with a `<noscript>` fallback (same pattern as `copperbuilds/js/nav.js`). One CSS token system (`Modern Slate`) drives every page. Copy is produced live during execution via the three-layer copy framework, not pre-written in this plan.

**Tech Stack:** HTML5, CSS3 (custom properties, no preprocessor), vanilla JS, Vale (style/brand gate), Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-08-29-luisecharri-personal-site-design.md`

## Global Constraints

- Static HTML/CSS/JS only — no framework, no build step (spec: Stack & Hosting)
- Palette is locked: ink `#2A2F33`, accent `#B85C3E` (≤20% of composition, CTAs/emphasis only), background `#F4F3F0` — no dark mode, no palette switcher (spec: Visual Identity, Out of Scope)
- No fabricated stats or metrics anywhere — every fact traces to `job-hunter/profile/profile.md` or the spec's confirmed Contact block (spec: Home, Work, Success Criteria)
- No photo in the hero — text-led — until a real photo is supplied (spec: Home)
- **Zero mentions of CopperBuilds, GHL Automation, or SMM as ventures Luis runs — anywhere, on any page** (spec: Purpose, Out of Scope, Success Criteria). This is the single most important constraint in this revision — verify with grep before marking any page done.
- Work page ships with no sample-work cards — structure/process content only, samples deferred (spec: Content, Out of Scope)
- 5 pages only: Home, About, Services, Work, Contact — shared nav/footer with noscript fallback (spec: Content, Success Criteria)
- Every page must pass `/vale-check` before being marked done (spec: Build Process)
- Security headers (`_headers`) mandatory at build time, verified live via `curl -sI` (spec: Success Criteria)
- This is not a CopperBuilds client — skip `/copperbuilds-seo`, no client registry entry (spec: Build Process)

---

## File Structure

```
luisecharri/
├── DESIGN.md              # token system + typography, source of truth
├── content-brief.md        # gathered real facts + open questions answered by user
├── css/
│   └── style.css           # tokens + shared component styles (nav, footer, buttons, cards)
├── js/
│   ├── nav.js               # shared nav, JS-injected
│   └── footer.js            # shared footer, JS-injected
├── index.html               # Home
├── about.html
├── services.html
├── work.html
├── contact.html
└── _headers                 # Cloudflare security headers
```

Each HTML page owns only its `<main>` content — nav/footer are shared via `js/nav.js` / `js/footer.js` plus a static `<noscript>` fallback, so there is exactly one place to change site-wide navigation.

---

## Task 1: Content Brief — Extract Real Facts from the Resume

**Files:**
- Create: `luisecharri/content-brief.md`
- Read (source, do not modify): `job-hunter/profile/profile.md` (path relative to `LantechAI/` root — from the worktree this is `../../../job-hunter/profile/profile.md`)

**Interfaces:**
- Produces: the facts every later copy task (Tasks 7–11) pulls from — positioning, bio, skills, contact. No later task may invent a fact not present here. All open questions from the original brief were resolved by Luis directly in chat on 2026-08-29 — nothing left to ask.

- [ ] **Step 1: Read `job-hunter/profile/profile.md` in full**

- [ ] **Step 2: Write content-brief.md, transcribing only what's in profile.md plus the confirmed contact block below — no invented facts, no rounding/embellishing**

```markdown
# Content Brief — Luis Echarri Personal Site (SEO Specialist portfolio)

## Positioning
SEO Specialist (matches target roles in profile.md: SEO Specialist / SEO Auditor /
Technical SEO Analyst, Internet/Lead Researcher, On-Page SEO Analyst)

## Professional summary (from profile.md, use near-verbatim)
SEO specialist and internet researcher with 7+ years of continuous experience
(2019–present) auditing websites, resolving on-page SEO issues, and researching
business decision-makers for outreach and lead generation. Background in
technical customer support with a track record of problem resolution and
clear communication.

## Work experience (real, chronological — most recent first)
1. SEO Auditor / Internet Researcher — Salience (Apr 2022 – Aug 2026, most
   recent past role — phrase as past, not current: last day 2026-08-28)
   - Full end-to-end technical/on-page/competitive audits using Ahrefs,
     Screaming Frog, Siteliner, BuzzSumo, Link Research Tools, Searchmetrics,
     Google Analytics, PageSpeed Insights, Google Trends
   - Delivered audit reports via Dropbox/Google Drive; managed deadlines in
     Asana, coordinated via Slack
   - Identified decision-makers via LinkedIn Sales Navigator, validated
     contact data with Skrapp/Excel, delivered upload-ready lead lists
2. SEO Specialist (On-Page) — BIG Catch Digital (Jan 2019 – Mar 2022)
   - Audited/resolved duplicate, missing, truncated title tags and meta
     descriptions; fixed missing/duplicate H1 tags
   - Built and optimized local citations; optimized Google Business Profile
     listings for local/map-pack visibility
3. Tier 2 Technical Support — Convergys (Time Warner Cable) (Oct 2012 – Dec 2016)
   - Diagnosed connectivity issues, scheduled dispatches, updated CRM records
   - Identified upsell opportunities during support calls

## Skills & tools (real, from profile.md)
- SEO & Analytics: Screaming Frog, Siteliner, BuzzSumo, Searchmetrics, Link
  Research Tools, Ahrefs, Google Analytics, Google Trends, PageSpeed Insights
- Website Development: WordPress — builds and launches full sites from scratch
- Lead Research: LinkedIn Sales Navigator, Skrapp, Excel data validation
- Content & Design: Canva, Adobe Premiere Pro, social media profile optimization

## Education
- BS Information Technology — Northern Negros State College of Science & Technology (2007–2011)
- BS Secondary Education — La Carlota City College (2018–2019)

## Contact (confirmed by Luis 2026-08-29 — use exactly)
- Email: valuisantonioecharrijr@gmail.com
- Phone: +63 977 329 3969
- LinkedIn: https://www.linkedin.com/in/luisecharri/

## Explicit exclusions — DO NOT mention anywhere on the site
- CopperBuilds, GHL Automation, SMM management, or any other venture Luis
  runs. Ruled out 2026-08-29: reads as a flight-risk/conflict-of-interest
  signal to a hiring agency. This applies to every page, not just Work.

## Work samples
None yet — deferred. Luis will provide real sample work in a follow-up
session. Task 10 (Work page) ships with process/methodology content only,
no sample cards, no substitute content standing in for real samples.

## Photo
None supplied — hero and every page stay text-led.
```

- [ ] **Step 3: Verify every fact in content-brief.md traces to profile.md or the confirmed contact block — no invention**

Run: `grep -c "CopperBuilds\|GHL\|SMM" content-brief.md`
Expected: `1` (only the one line under "Explicit exclusions" naming them as excluded — if any other line mentions them, that's a leak, fix it)

- [ ] **Step 4: Commit**

```bash
cd luisecharri
git add content-brief.md
git commit -m "docs: content brief extracted from verified resume (profile.md)"
```

---

## Task 2: Design Tokens — DESIGN.md + css/style.css

**Files:**
- Create: `luisecharri/DESIGN.md`
- Create: `luisecharri/css/style.css`

**Interfaces:**
- Consumes: locked palette from spec (`#2A2F33` / `#B85C3E` / `#F4F3F0`)
- Produces: CSS custom properties (`--ink`, `--accent`, `--bg`, `--soft`, `--rule`, `--shadow`) and shared classes (`.container`, `.btn`, `.btn-primary`, `.btn-ghost`, `.card`) every page (Tasks 6–10) and both JS components (Task 4) consume by name.

- [ ] **Step 0: Invoke the `frontend-design` skill before writing any frontend code (mandatory per spec's Build Process — every session, no exceptions)**

- [ ] **Step 1: Write DESIGN.md**

```markdown
# DESIGN.md — Luis Echarri Personal Site

## Style Direction: "Modern Slate"
Editorial-minimal, styled after haleygdavidson.com (large confident typography,
one asymmetric visual moment, generous whitespace, no symmetric card grids),
structured after jennseo.com (nav/hero/stats/services/case-studies/contact flow).
Checked against `anti-ai-design`: no neon, no gradient text/fills, no glow,
single accent used sparingly.

## Color
| Token | Hex | Meaning |
|---|---|---|
| `--ink` | `#2A2F33` | charcoal-slate — focus/clarity, primary text |
| `--accent` | `#B85C3E` | muted rust — CTAs/emphasis only, ≤20% of composition |
| `--bg` | `#F4F3F0` | cool-neutral off-white — never pure white |
| `--soft` | `#EAE8E4` | tinted surface for stat bars / soft cards |
| `--rule` | `rgba(42,47,51,.16)` | hairline borders/dividers |
| `--shadow` | `rgba(42,47,51,.12)` | warm-tinted shadow, never cold black |

## Typography
- Display/headings: **Fraunces** (Google Fonts, opsz axis) — characterful serif,
  distinct from AI-default sans (Inter/Space Grotesk/Poppins rejected per anti-ai-design)
- Body/UI: **IBM Plex Sans** — human, readable, not overused
- Labels/captions/eyebrows: **IBM Plex Mono**, uppercase, letter-spacing .06em
- Fallback stacks: `Georgia, 'Times New Roman', serif` / `'Segoe UI', system-ui, sans-serif` / `'SFMono-Regular', Consolas, monospace`

## Layout
- Max content width: 1080px, centered
- One asymmetric element per page (an offset rule line, an unevenly-weighted
  card row) — no perfectly symmetric card grids
- Shadows appear only on hover/interaction, never at rest

## Components
- `.btn-primary` — accent background, bg-colored text
- `.btn-ghost` — 1.5px ink-rule border, transparent background
- `.card` — 1px `--rule` border, no shadow at rest
- Focus states mandatory: `outline: 2px solid var(--accent); outline-offset: 3px`
```

- [ ] **Step 2: Write css/style.css**

```css
:root{
  --ink:#2A2F33;
  --accent:#B85C3E;
  --bg:#F4F3F0;
  --soft:#EAE8E4;
  --rule:rgba(42,47,51,.16);
  --shadow:rgba(42,47,51,.12);
  --container:1080px;
}

*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  margin:0;
  background:var(--bg);
  color:var(--ink);
  font-family:"IBM Plex Sans",'Segoe UI',system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;
  line-height:1.5;
}
h1,h2,h3{
  font-family:"Fraunces",Georgia,'Times New Roman',serif;
  font-weight:500;
  line-height:1.1;
  margin:0 0 1rem;
  text-wrap:balance;
}
p{margin:0 0 1rem;max-width:65ch;}
a{color:var(--ink);}

.container{max-width:var(--container);margin:0 auto;padding:0 1.5rem;}

.eyebrow{
  font-family:"IBM Plex Mono",'SFMono-Regular',Consolas,monospace;
  font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;
  color:var(--accent);margin:0 0 .75rem;display:block;
}

.btn{
  display:inline-block;font-size:.9375rem;font-weight:600;
  padding:.75rem 1.4rem;border-radius:7px;text-decoration:none;
  transition:background .15s ease, border-color .15s ease, color .15s ease;
}
.btn-primary{background:var(--accent);color:var(--bg);border:1.5px solid var(--accent);}
.btn-primary:hover{background:#A24F35;border-color:#A24F35;}
.btn-ghost{border:1.5px solid var(--rule);color:var(--ink);}
.btn-ghost:hover{border-color:var(--ink);}
.btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}

.card{
  border:1px solid var(--rule);border-radius:10px;padding:1.5rem;
  background:var(--bg);transition:box-shadow .15s ease;
}
.card:hover{box-shadow:0 4px 14px var(--shadow);}

a:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}

@media (max-width:640px){
  .container{padding:0 1.25rem;}
}
```

- [ ] **Step 3: Verify tokens load correctly**

Open `index.html` (once it exists in Task 7) in a browser and confirm computed `background-color` of `body` is `rgb(244, 243, 240)` via devtools — deferred to Task 12 cross-page QA since no HTML page exists yet at this step. For now, verify the file is syntactically valid:

Run: `node -e "require('fs').readFileSync('css/style.css','utf8')"` (just confirms the file reads without error; a linter is overkill for one stylesheet)
Expected: no output, exit code 0

- [ ] **Step 4: Commit**

```bash
cd luisecharri
git add DESIGN.md css/style.css
git commit -m "feat: add Modern Slate design tokens and shared stylesheet"
```

---

## Task 3: Local Preview Server

**Files:**
- Create: `luisecharri/serve.mjs`

**Interfaces:**
- Produces: `node serve.mjs` — local static server at `localhost:3000`, used by every later task's manual/browser verification steps

- [ ] **Step 1: Write a minimal static file server**

```javascript
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 3000;
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml' };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  if (!path.extname(p)) p += '.html';
  const file = path.join(process.cwd(), p);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
```

- [ ] **Step 2: Verify it serves**

Run: `cd luisecharri && node serve.mjs &` then `curl -sI http://localhost:3000/` (once `index.html` exists in Task 7 — for now confirm the process starts without error and kill it)
Expected: process starts, no crash; `Ctrl+C` / kill after confirming

- [ ] **Step 3: Commit**

```bash
cd luisecharri
git add serve.mjs
git commit -m "chore: add local static preview server"
```

---

## Task 4: Vale Config

**Files:**
- Create: `luisecharri/.vale.ini`

**Interfaces:**
- Consumes: nothing
- Produces: the `.vale.ini` config Tasks 6–10's copy-gate steps run against

- [ ] **Step 1: Write .vale.ini (generic Google + proselint styles — no CopperBuilds-specific pricing/brand rules, since this isn't a CopperBuilds client)**

```ini
StylesPath = styles
MinAlertLevel = suggestion

Packages = Google, proselint

[*.html]
BasedOnStyles = Google, proselint
```

- [ ] **Step 2: Sync Vale packages**

Run: `cd luisecharri && vale sync`
Expected: `Google` and `proselint` packages download into `styles/` without error

- [ ] **Step 3: Verify Vale runs (even with no HTML yet, config should parse)**

Run: `vale --config=.vale.ini --version`
Expected: `vale version 3.x.x`, no config parse errors

- [ ] **Step 4: Commit**

```bash
cd luisecharri
git add .vale.ini .gitignore
git commit -m "chore: add Vale style gate config"
```

(Add `styles/` to `.gitignore` first — synced packages are regenerated by `vale sync`, not committed, matching CopperBuilds' pattern.)

---

## Task 5: Shared Nav + Footer (JS-injected, noscript fallback)

**Files:**
- Create: `luisecharri/js/nav.js`
- Create: `luisecharri/js/footer.js`

**Interfaces:**
- Consumes: `--ink`, `--accent`, `--bg`, `--rule` tokens from `css/style.css` (Task 2)
- Produces: `<script src="/js/nav.js" defer></script>` / `<script src="/js/footer.js" defer></script>` — the exact two script tags every page in Tasks 7–11 includes, each paired with a static `<noscript>` fallback of the same 5 links

- [ ] **Step 1: Write js/nav.js**

```javascript
(function () {
  var path = window.location.pathname;
  var page = path.split('/').pop() || '';

  function isActive(href) {
    if (href === '/') return page === '' || page === 'index.html';
    return page === href.replace(/^\//, '');
  }

  function link(href, label) {
    var active = isActive(href);
    var style = active
      ? 'color:var(--accent);font-weight:600;text-decoration:none;font-size:.9375rem;'
      : 'color:var(--ink);text-decoration:none;font-size:.9375rem;transition:color .15s;';
    var aria = active ? ' aria-current="page"' : '';
    return '<a href="' + href + '" style="' + style + '"' + aria + '>' + label + '</a>';
  }

  var navHTML = '<nav aria-label="Main navigation" style="position:sticky;top:0;z-index:50;background:var(--bg);border-bottom:1px solid var(--rule);">'
    + '<div class="container" style="display:flex;align-items:center;justify-content:space-between;height:64px;">'
      + '<a href="/" style="font-family:\'Fraunces\',Georgia,serif;font-weight:600;font-size:1.05rem;color:var(--ink);text-decoration:none;">Luis Echarri</a>'
      + '<div style="display:flex;align-items:center;gap:2rem;">'
        + link('/', 'Home')
        + link('/about', 'About')
        + link('/services', 'Services')
        + link('/work', 'Work')
        + '<a href="/contact" class="btn btn-primary">Get in Touch</a>'
      + '</div>'
    + '</div>'
  + '</nav>';

  document.currentScript.insertAdjacentHTML('afterend', navHTML);
})();
```

- [ ] **Step 2: Write js/footer.js**

```javascript
(function () {
  var footerHTML = '<footer style="border-top:1px solid var(--rule);padding:2.5rem 0;margin-top:4rem;">'
    + '<div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">'
      + '<span style="font-size:.875rem;color:var(--ink);opacity:.7;">&copy; ' + new Date().getFullYear() + ' Luis Echarri</span>'
      + '<div style="display:flex;gap:1.5rem;">'
        + '<a href="/about" style="font-size:.875rem;color:var(--ink);text-decoration:none;">About</a>'
        + '<a href="/work" style="font-size:.875rem;color:var(--ink);text-decoration:none;">Work</a>'
        + '<a href="/contact" style="font-size:.875rem;color:var(--ink);text-decoration:none;">Contact</a>'
      + '</div>'
    + '</div>'
  + '</footer>';

  document.currentScript.insertAdjacentHTML('afterend', footerHTML);
})();
```

- [ ] **Step 3: Verify both scripts are syntactically valid**

Run: `node --check js/nav.js && node --check js/footer.js`
Expected: no output, exit code 0 for both

- [ ] **Step 4: Commit**

```bash
cd luisecharri
git add js/nav.js js/footer.js
git commit -m "feat: add shared nav and footer (JS-injected)"
```

---

## Task 6: Security Headers

**Files:**
- Create: `luisecharri/_headers`

**Interfaces:**
- Consumes: nothing
- Produces: the live security headers Task 12's `curl -sI` gate checks against production

- [ ] **Step 1: Write _headers**

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

- [ ] **Step 2: Verify the file is well-formed (Cloudflare Pages `_headers` syntax — no validator exists locally, so check by eye against the syntax above)**

Run: `cat _headers` (or `type _headers` on Windows)
Expected: matches Step 1 exactly, no typos in header names

- [ ] **Step 3: Commit**

```bash
cd luisecharri
git add _headers
git commit -m "feat: add mandatory security headers for Cloudflare Pages"
```

---

## Task 7: Home Page (index.html)

**Files:**
- Create: `luisecharri/index.html`

**Interfaces:**
- Consumes: `css/style.css` tokens/classes (Task 2), `js/nav.js` / `js/footer.js` (Task 5), facts from `content-brief.md` (Task 1)
- Produces: the live `index.html` Task 12's link-check and QA gate verifies

**SEO seed** (Layer 1 — establish before writing copy): primary target `Luis Echarri — SEO Specialist`; secondary `SEO Auditor & Internet Researcher`. H1 and first paragraph must contain or directly support this seed. **No mention of CopperBuilds/GHL/SMM anywhere on this page — see Global Constraints.**

- [ ] **Step 1: Write the HTML skeleton with real structure (nav/footer includes, noscript fallback, section scaffolding)**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Luis Echarri — SEO Specialist</title>
<meta name="description" content="<!-- COPY: 1-sentence meta description, SEO seed + positioning, ~155 chars -->">
<link rel="stylesheet" href="/css/style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
</head>
<body>
<script src="/js/nav.js" defer></script>
<noscript>
<nav aria-label="Main navigation (no-JS fallback)" style="padding:1rem 1.5rem;border-bottom:1px solid #d8d5cf;">
  <a href="/" style="margin-right:1.25rem;">Home</a>
  <a href="/about" style="margin-right:1.25rem;">About</a>
  <a href="/services" style="margin-right:1.25rem;">Services</a>
  <a href="/work" style="margin-right:1.25rem;">Work</a>
  <a href="/contact">Contact</a>
</nav>
</noscript>

<main>
  <section class="container" style="padding:4rem 0 3rem;max-width:640px;">
    <span class="eyebrow">SEO Specialist</span>
    <h1><!-- COPY: headline, must contain SEO seed --></h1>
    <p><!-- COPY: 2-3 sentence subhead, from content-brief.md's Professional Summary — technical audits, on-page fixes, decision-maker research. No venture/business language. --></p>
    <div style="display:flex;gap:.85rem;flex-wrap:wrap;">
      <a class="btn btn-primary" href="/contact">Get in Touch</a>
      <a class="btn btn-ghost" href="/about">See My Experience</a>
    </div>
  </section>

  <section class="container" style="display:flex;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);background:var(--soft);padding:0;margin:2rem auto 0;">
    <div style="flex:1;padding:1.25rem 1.5rem;border-right:1px solid var(--rule);">
      <strong>7+ Years</strong><br><!-- COPY: one line, "SEO & Research Experience (2019–Present)" per content-brief.md -->
    </div>
    <div style="flex:1;padding:1.25rem 1.5rem;border-right:1px solid var(--rule);">
      <strong>Salience</strong><br><!-- COPY: one line, "SEO Auditor & Internet Researcher, 2022–2026" per content-brief.md -->
    </div>
    <div style="flex:1;padding:1.25rem 1.5rem;">
      <strong>BIG Catch Digital</strong><br><!-- COPY: one line, "On-Page SEO Specialist, 2019–2022" per content-brief.md -->
    </div>
  </section>

  <section class="container" style="padding:3rem 0;">
    <h2><!-- COPY: "What I Do" section heading --></h2>
    <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:1.25rem;">
      <div class="card" style="background:var(--ink);color:var(--bg);border-color:var(--ink);">
        <span class="eyebrow" style="color:var(--accent);">Core Skill</span>
        <h3><!-- COPY: Technical & On-Page SEO Audits --></h3>
        <p style="opacity:.85;"><!-- COPY: 1-2 sentences, tools from content-brief.md (Ahrefs, Screaming Frog, etc.) --></p>
      </div>
      <div class="card">
        <span class="eyebrow">Core Skill</span>
        <h3><!-- COPY: Lead & Decision-Maker Research --></h3>
        <p><!-- COPY: 1-2 sentences, LinkedIn Sales Navigator/Skrapp per content-brief.md --></p>
      </div>
      <div class="card">
        <span class="eyebrow">Core Skill</span>
        <h3><!-- COPY: WordPress Site Builds --></h3>
        <p><!-- COPY: 1-2 sentences, from content-brief.md's Skills & Tools --></p>
      </div>
    </div>
  </section>
</main>

<script src="/js/footer.js" defer></script>
<noscript>
<footer style="padding:2rem 1.5rem;border-top:1px solid #d8d5cf;">
  &copy; 2026 Luis Echarri — <a href="/contact">Contact</a>
</footer>
</noscript>
</body>
</html>
```

- [ ] **Step 2: Run `/impeccable craft` to draft every `<!-- COPY: ... -->` block, using `content-brief.md` facts and the SEO seed above — no invented facts, no invented stats, no mention of CopperBuilds/GHL/SMM. Replace each comment with the drafted copy in place.**

- [ ] **Step 3: Verify no COPY placeholders remain and no excluded-venture mentions leaked in**

Run: `grep -c "COPY:" index.html` → expect `0`
Run: `grep -ci "copperbuilds\|GHL\|SMM" index.html` → expect `0`

- [ ] **Step 4: Run the Vale gate**

Run: `vale --config=.vale.ini index.html`
Expected: 0 errors (warnings judged case-by-case per the vale-check skill — fix genuine issues, document any left as false positives)

- [ ] **Step 5: Fix any Vale errors and re-run Step 4 until it passes**

- [ ] **Step 6: Visual check in the browser**

Run: `node serve.mjs` (background), then load `http://localhost:3000/` — confirm nav renders, hero reads correctly, no `--rule`/`--accent` literal strings visible (a sign the CSS didn't load), all 3 skill cards render without a symmetric-grid collapse (the lead card should look visually heavier than the other two).

- [ ] **Step 7: Commit**

```bash
cd luisecharri
git add index.html
git commit -m "feat: add Home page with drafted copy, Vale-gated"
```

---

## Task 8: About Page (about.html)

**Files:**
- Create: `luisecharri/about.html`

**Interfaces:**
- Consumes: same as Task 7, plus the full work-experience/education facts in `content-brief.md` (already resolved — no open questions remain)

**SEO seed:** primary target `About Luis Echarri — SEO Specialist`. **No mention of CopperBuilds/GHL/SMM anywhere on this page.**

- [ ] **Step 1: Write the HTML skeleton (same `<head>`/nav/footer boilerplate as Task 7's index.html, only `<title>`, meta description, and `<main>` differ)**

```html
<!-- <head> identical to index.html except: -->
<title>About — Luis Echarri, SEO Specialist</title>
<meta name="description" content="<!-- COPY: 1-sentence meta description -->">

<!-- nav/noscript identical to index.html -->

<main>
  <section class="container" style="padding:4rem 0 3rem;max-width:640px;">
    <span class="eyebrow">About</span>
    <h1><!-- COPY: e.g. "About Luis" --></h1>
    <p><!-- COPY: paragraph 1, Professional Summary from content-brief.md, near-verbatim --></p>
    <p><!-- COPY: paragraph 2, career progression — Convergys technical support into SEO (BIG Catch Digital) into Salience --></p>
  </section>

  <section class="container" style="padding:0 0 3rem;max-width:640px;">
    <h2><!-- COPY: e.g. "Experience" --></h2>
    <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:1rem;">
      <li class="card"><strong>Salience</strong> — <!-- COPY: SEO Auditor / Internet Researcher, Apr 2022 – Aug 2026, 2-3 real bullets from content-brief.md --></li>
      <li class="card"><strong>BIG Catch Digital</strong> — <!-- COPY: SEO Specialist (On-Page), Jan 2019 – Mar 2022, 2-3 real bullets --></li>
      <li class="card"><strong>Convergys (Time Warner Cable)</strong> — <!-- COPY: Tier 2 Technical Support, Oct 2012 – Dec 2016, 1-2 real bullets --></li>
    </ul>
  </section>

  <section class="container" style="padding:0 0 3rem;max-width:640px;">
    <h2><!-- COPY: e.g. "Education" --></h2>
    <p><!-- COPY: both degrees from content-brief.md, one line each --></p>
  </section>
</main>

<!-- footer identical to index.html -->
```

- [ ] **Step 2: Run `/impeccable craft` for every `<!-- COPY: ... -->` block using `content-brief.md` facts only — real roles, real dates, real bullets, no invention.**

- [ ] **Step 3: Verify no placeholders remain and no excluded-venture mentions leaked in**

Run: `grep -c "COPY:" about.html` → expect `0`
Run: `grep -ci "copperbuilds\|GHL\|SMM" about.html` → expect `0`

- [ ] **Step 4: Run the Vale gate, fix errors, re-run until it passes**

Run: `vale --config=.vale.ini about.html`
Expected: 0 errors

- [ ] **Step 5: Visual check via `node serve.mjs` → `http://localhost:3000/about`**

- [ ] **Step 6: Commit**

```bash
cd luisecharri
git add about.html
git commit -m "feat: add About page with real experience timeline, Vale-gated"
```

---

## Task 9: Services Page (services.html)

**Files:**
- Create: `luisecharri/services.html`

**Interfaces:**
- Consumes: same as Task 7

**SEO seed:** primary target `SEO Specialist Skills & Services`. **No mention of CopperBuilds/GHL/SMM anywhere on this page — Skills & Tools content only, sourced from content-brief.md.**

- [ ] **Step 1: Write the HTML skeleton**

```html
<!-- <head> identical pattern to index.html: -->
<title>Services — Luis Echarri, SEO Specialist</title>
<meta name="description" content="<!-- COPY -->">

<!-- nav/noscript identical -->

<main>
  <section class="container" style="padding:4rem 0 3rem;max-width:640px;">
    <span class="eyebrow">What I Do</span>
    <h1><!-- COPY: headline, must contain "SEO" and a skill term --></h1>
    <p><!-- COPY: 2-3 sentence intro, grounded in content-brief.md's Skills & Tools --></p>
  </section>

  <section class="container" style="padding:0 0 3rem;display:flex;flex-direction:column;gap:1.5rem;">
    <div class="card">
      <span class="eyebrow">Core Skill</span>
      <h2><!-- COPY: Technical & On-Page SEO Audits --></h2>
      <p><!-- COPY: what this covers — Ahrefs, Screaming Frog, Siteliner, PageSpeed Insights, title/meta/H1 fixes, from content-brief.md --></p>
    </div>
    <div class="card" style="margin-left:2.5rem;">
      <span class="eyebrow">Core Skill</span>
      <h2><!-- COPY: Lead & Decision-Maker Research --></h2>
      <p><!-- COPY: LinkedIn Sales Navigator, Skrapp, Excel validation, from content-brief.md --></p>
    </div>
    <div class="card" style="margin-left:2.5rem;">
      <span class="eyebrow">Core Skill</span>
      <h2><!-- COPY: WordPress Site Builds --></h2>
      <p><!-- COPY: builds and launches full sites from scratch, from content-brief.md --></p>
    </div>
  </section>

  <section class="container" style="padding:0 0 3rem;max-width:640px;">
    <a class="btn btn-primary" href="/contact"><!-- COPY: CTA label --></a>
  </section>
</main>

<!-- footer identical -->
```

(The staggered `margin-left` on the two supporting-skill cards is the required asymmetric moment — Technical & On-Page SEO Audits stays full-width as the lead skill, the other two visually nest under it.)

- [ ] **Step 2: Run `/impeccable craft` for every `<!-- COPY: ... -->` block using `content-brief.md` facts**

- [ ] **Step 3: Verify no placeholders remain and no excluded-venture mentions leaked in**

Run: `grep -c "COPY:" services.html` → expect `0`
Run: `grep -ci "copperbuilds\|GHL\|SMM" services.html` → expect `0`

- [ ] **Step 4: Run the Vale gate, fix errors, re-run until it passes**

Run: `vale --config=.vale.ini services.html`
Expected: 0 errors

- [ ] **Step 5: Visual check via `node serve.mjs` → `http://localhost:3000/services`**

- [ ] **Step 6: Commit**

```bash
cd luisecharri
git add services.html
git commit -m "feat: add Services page (real skills from resume), Vale-gated"
```

---

## Task 10: Work Page (work.html)

**Files:**
- Create: `luisecharri/work.html`

**Interfaces:**
- Consumes: same as Task 7. **No work-sample links exist yet — content-brief.md confirms samples are deferred. Do not substitute CopperBuilds, GHL, SMM, or any placeholder card.**

**SEO seed:** primary target `Luis Echarri — SEO Process & Approach`.

- [ ] **Step 1: Write the HTML skeleton — process/methodology content only, no sample-work cards**

```html
<!-- <head> identical pattern -->
<title>Work — Luis Echarri, SEO Specialist</title>
<meta name="description" content="<!-- COPY -->">

<!-- nav/noscript identical -->

<main>
  <section class="container" style="padding:4rem 0 3rem;max-width:640px;">
    <span class="eyebrow">Work</span>
    <h1><!-- COPY: headline --></h1>
    <p><!-- COPY: 1 honest sentence — sample work is being gathered and will be added here; no fabricated content --></p>
  </section>

  <section class="container" style="padding:0 0 3rem;max-width:640px;">
    <h2><!-- COPY: "How I Approach an Audit" or similar --></h2>
    <p><!-- COPY: process paragraph grounded in real Salience/BIG Catch Digital bullets from content-brief.md — e.g. audit tools used, how findings become a report, how decision-makers get researched. Real process, not invented case studies. --></p>
  </section>

  <section class="container" style="padding:0 0 3rem;max-width:640px;">
    <a class="btn btn-primary" href="/contact"><!-- COPY: CTA label --></a>
  </section>
</main>

<!-- footer identical -->
```

- [ ] **Step 2: Run `/impeccable craft` for every `<!-- COPY: ... -->` block, grounded only in real experience bullets from `content-brief.md`. Confirm zero sample-work cards were added.**

- [ ] **Step 3: Verify no placeholders remain, no excluded-venture mentions, and no sample cards were added**

Run: `grep -c "COPY:" work.html` → expect `0`
Run: `grep -ci "copperbuilds\|GHL\|SMM" work.html` → expect `0`
Run: `grep -c 'class="card"' work.html` → expect `0` (no sample-work cards exist yet — if this is nonzero, a card was added that shouldn't exist)

- [ ] **Step 4: Run the Vale gate, fix errors, re-run until it passes**

Run: `vale --config=.vale.ini work.html`
Expected: 0 errors

- [ ] **Step 5: Visual check via `node serve.mjs` → `http://localhost:3000/work`**

- [ ] **Step 6: Commit**

```bash
cd luisecharri
git add work.html
git commit -m "feat: add Work page (process content, samples deferred), Vale-gated"
```

---

## Task 11: Contact Page (contact.html)

**Files:**
- Create: `luisecharri/contact.html`

**Interfaces:**
- Consumes: same as Task 7, plus the confirmed contact block in `content-brief.md`: email `valuisantonioecharrijr@gmail.com`, phone `+63 977 329 3969`, LinkedIn `https://www.linkedin.com/in/luisecharri/`

- [ ] **Step 1: Write the HTML skeleton — direct `mailto:`/`tel:`/LinkedIn CTAs, no third-party form service. (A form handler like Web3Forms needs a signup + API key that don't exist yet — that's real scope, not this phase; working direct-contact links beat a broken or blocked form.)**

```html
<!-- <head> identical pattern -->
<title>Contact — Luis Echarri</title>
<meta name="description" content="<!-- COPY -->">

<!-- nav/noscript identical -->

<main>
  <section class="container" style="padding:4rem 0 5rem;max-width:640px;">
    <span class="eyebrow">Contact</span>
    <h1><!-- COPY: headline --></h1>
    <p><!-- COPY: 1-2 sentences --></p>
    <div style="display:flex;flex-direction:column;gap:.75rem;margin-top:1.5rem;">
      <a class="btn btn-primary" href="mailto:valuisantonioecharrijr@gmail.com" style="width:fit-content;">Email Me</a>
      <a class="btn btn-ghost" href="tel:+639773293969" style="width:fit-content;">Call / WhatsApp</a>
      <a class="btn btn-ghost" href="https://www.linkedin.com/in/luisecharri/" target="_blank" rel="noopener" style="width:fit-content;">Connect on LinkedIn</a>
    </div>
  </section>
</main>

<!-- footer identical -->
```

- [ ] **Step 2: Run `/impeccable craft` for the headline and intro `<!-- COPY: ... -->` blocks only — the contact links above are already the exact confirmed values, do not alter them.**

- [ ] **Step 3: Verify no placeholders remain and every contact link matches content-brief.md exactly**

Run: `grep -c "COPY:" contact.html` → expect `0`
Run: `grep -c "mailto:valuisantonioecharrijr@gmail.com" contact.html` → expect `1`
Run: `grep -c "tel:+639773293969" contact.html` → expect `1`
Run: `grep -c "linkedin.com/in/luisecharri" contact.html` → expect `1`

- [ ] **Step 4: Run the Vale gate, fix errors, re-run until it passes**

Run: `vale --config=.vale.ini contact.html`
Expected: 0 errors

- [ ] **Step 5: Visual check via `node serve.mjs` → `http://localhost:3000/contact`**

- [ ] **Step 6: Commit**

```bash
cd luisecharri
git add contact.html
git commit -m "feat: add Contact page with confirmed real contact links, Vale-gated"
```

---

## Task 12: Cross-Page QA, Deploy, Verify Production

**Files:**
- Modify: none (verification-only task)

**Interfaces:**
- Consumes: all 5 pages (Tasks 7–11), `_headers` (Task 6), the Cloudflare Pages project already connected to `lantech0/luisecharri` (created during brainstorming, previously failed because the repo was empty)

- [ ] **Step 1: Verify noscript fallback present on every page**

Run: `for f in index about services work contact; do echo "$f: $(grep -c 'Main navigation (no-JS fallback)' $f.html)"; done` (or the PowerShell equivalent `foreach`)
Expected: every page reports `1` — confirms the specific nav noscript fallback (not just any `<noscript>` tag, since the footer has its own separate block too)

- [ ] **Step 2: Verify every internal nav link resolves (no 404s) using the local server**

Run: `node serve.mjs &` then for each of `/`, `/about`, `/services`, `/work`, `/contact`: `curl -s -o /dev/null -w "%{http_code} %{url}\n" http://localhost:3000$PATH`
Expected: `200` for all 5

- [ ] **Step 3: Mobile responsive check**

Use the browser tool: navigate to each of the 5 local pages, resize to a 375px-wide viewport, screenshot each. Confirm nav collapses sensibly (or remains usable — no horizontal scroll, no overlapping text) and the Services page's staggered cards don't break awkwardly at narrow width. Fix any CSS issues found and re-run Steps 1–2 if HTML/CSS changed.

- [ ] **Step 4: Push to GitHub**

```bash
cd luisecharri
git push origin main
```

- [ ] **Step 5: Confirm the Cloudflare Pages deploy succeeds**

In the Cloudflare dashboard, retry/redeploy the `luisecharri` project (or it may auto-trigger from the push). Since the repo now has real HTML/CSS/JS files, this should succeed where the earlier empty-repo attempt failed. If it still fails, read the build log and diagnose — do not retry blindly (per the "two failures = stop and isolate" rule, state a hypothesis before a third attempt).

- [ ] **Step 6: Verify security headers live on production**

Run: `curl -sI https://<the-deployed-url>/`
Expected: response includes `strict-transport-security`, `x-frame-options`, `x-content-type-options`, `referrer-policy` — not just present in `_headers`, actually served

- [ ] **Step 7: Verify all 5 pages are live**

Run: `for p in "" about services work contact; do curl -s -o /dev/null -w "%{http_code} /$p\n" https://<the-deployed-url>/$p; done`
Expected: `200` for all 5

- [ ] **Step 8: Final spec cross-check**

Go through the spec's "Success Criteria" section line by line and confirm each is met:
- [ ] 5 responsive pages live, sharing one nav/footer
- [ ] Security headers live (Step 6)
- [ ] Noscript fallback on every page (Step 1)
- [ ] Vale passed on every page (Tasks 7–11 Step 4 each)
- [ ] No fabricated stats anywhere — re-read every page's copy once more to confirm
- [ ] Zero mentions of CopperBuilds/GHL/SMM anywhere: `for f in index about services work contact; do echo "$f: $(grep -ci "copperbuilds\|GHL\|SMM" $f.html)"; done` — every page must report `0`
- [ ] No sample-work cards on the Work page: `grep -c 'class="card"' work.html` → `0`

- [ ] **Step 9: Report the live URL and any deferred items (dark mode, blog, custom domain, additional work samples) explicitly to the user — do not silently omit them**

---

## Execution Notes

- Tasks 1–6 have no user-facing content and can run in one sitting.
- Task 1 (content brief) blocks Tasks 7–11 — every fact traces to `job-hunter/profile/profile.md` or the confirmed contact block, both already resolved as of 2026-08-29. No further user Q&A is needed before starting Task 7.
- Tasks 7–11 are independent of each other except for shared nav/footer (Task 5) and tokens (Task 2) — they can be done in any order, though Home (Task 7) first gives the clearest sense of whether the design system reads well before repeating the pattern 4 more times.
- The single highest-risk regression across every task: a venture mention (CopperBuilds/GHL/SMM) leaking into copy, since 4 of the 5 pages were adapted from an earlier draft that centered on those ventures. Every task's grep check for this exists specifically to catch that regression — do not skip it.

