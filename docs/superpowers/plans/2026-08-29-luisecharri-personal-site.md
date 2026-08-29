# Luis Echarri Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a 5-page static credibility site for Luis Echarri, positioned as "Growth Strategist," live at `luisecharri.pages.dev`.

**Architecture:** Static HTML/CSS/JS, no framework, no build step. Shared nav/footer injected via JS with a `<noscript>` fallback (same pattern as `copperbuilds/js/nav.js`). One CSS token system (`Modern Slate`) drives every page. Copy is produced live during execution via the three-layer copy framework, not pre-written in this plan.

**Tech Stack:** HTML5, CSS3 (custom properties, no preprocessor), vanilla JS, Vale (style/brand gate), Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-08-29-luisecharri-personal-site-design.md`

## Global Constraints

- Static HTML/CSS/JS only — no framework, no build step (spec: Stack & Hosting)
- Palette is locked: ink `#2A2F33`, accent `#B85C3E` (≤20% of composition, CTAs/emphasis only), background `#F4F3F0` — no dark mode, no palette switcher (spec: Visual Identity, Out of Scope)
- No fabricated stats or metrics anywhere — facts only, or omit (spec: Home, Work)
- No photo in the hero — text-led — until a real photo is supplied (spec: Home)
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

## Task 1: Content Brief — Gather Real Inputs

**Files:**
- Create: `luisecharri/content-brief.md`

**Interfaces:**
- Produces: the facts every later copy task (Tasks 6–10) pulls from — positioning, ventures, contact method, work-sample links, bio facts. No later task may invent a fact not present here.

- [ ] **Step 1: Write the known facts into the brief**

```markdown
# Content Brief — Luis Echarri Personal Site

## Known facts
- Name: Luis Echarri
- Positioning: Growth Strategist
- Ventures (delivery channels, not separate portfolios):
  - CopperBuilds — web agency (https://copperbuilds.com/)
  - GHL Automation — CRM/automation systems for trades & home services
  - SMM — social media management for clients
- Work samples confirmed live: CopperBuilds (https://copperbuilds.com/)
- No photo supplied yet — hero is text-led
- No quantified metrics available yet (Ahrefs data pull deferred) — Work page uses process/methodology, not stats

## Open questions — ASK THE USER, do not assume
1. Contact method for the Contact page: reuse the CopperBuilds contact (luis.copperbuilds@gmail.com / +63 977 329 3969) or a different personal email/number?
2. Bio facts for the About page: background, years in SEO/growth work, how you got into it, anything you want surfaced (do not invent — leave blank if unanswered and flag to the user before Task 7)
3. Any additional live work samples beyond CopperBuilds (a luisghl.com site, an SMM client site) to link on the Work page?
4. Social links to include (LinkedIn, Facebook, etc.) — which ones are current and OK to publish?
```

- [ ] **Step 2: Ask the user the 4 open questions directly in chat, record real answers into the file (never invent an answer)**

- [ ] **Step 3: Verify the brief has no unanswered required field**

Run: `grep -c "^-" content-brief.md` — confirm every open question has a corresponding answer written below it (append an "## Answers" section under Step 2's edits).
Expected: 4 answers present, zero blanks.

- [ ] **Step 4: Commit**

```bash
cd luisecharri
git add content-brief.md
git commit -m "docs: content brief with real facts for site copy"
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

Open `index.html` (once it exists in Task 6) in a browser and confirm computed `background-color` of `body` is `rgb(244, 243, 240)` via devtools — deferred to Task 11 cross-page QA since no HTML page exists yet at this step. For now, verify the file is syntactically valid:

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

Run: `cd luisecharri && node serve.mjs &` then `curl -sI http://localhost:3000/` (once `index.html` exists in Task 6 — for now confirm the process starts without error and kill it)
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
    return page === href.replace(/^\//, '') + '.html';
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

**SEO seed** (Layer 1 — establish before writing copy): primary target `Luis Echarri — Growth Strategist`; secondary `SEO growth strategy consultant`. H1 and first paragraph must contain or directly support this seed.

- [ ] **Step 1: Write the HTML skeleton with real structure (nav/footer includes, noscript fallback, section scaffolding)**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Luis Echarri — Growth Strategist</title>
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
    <span class="eyebrow">Growth Strategist</span>
    <h1><!-- COPY: headline, must contain SEO seed --></h1>
    <p><!-- COPY: 2-3 sentence subhead, references CopperBuilds/GHL/SMM as delivery channels per content-brief.md --></p>
    <div style="display:flex;gap:.85rem;flex-wrap:wrap;">
      <a class="btn btn-primary" href="/work">See the Work</a>
      <a class="btn btn-ghost" href="/contact">Get in Touch</a>
    </div>
  </section>

  <section class="container" style="display:flex;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);background:var(--soft);padding:0;margin:2rem auto 0;">
    <div style="flex:1;padding:1.25rem 1.5rem;border-right:1px solid var(--rule);">
      <strong>CopperBuilds</strong><br><!-- COPY: one line, from content-brief.md -->
    </div>
    <div style="flex:1;padding:1.25rem 1.5rem;border-right:1px solid var(--rule);">
      <strong>GHL Automation</strong><br><!-- COPY: one line, from content-brief.md -->
    </div>
    <div style="flex:1;padding:1.25rem 1.5rem;">
      <strong>SMM</strong><br><!-- COPY: one line, from content-brief.md -->
    </div>
  </section>

  <section class="container" style="padding:3rem 0;">
    <h2><!-- COPY: "What I Do" section heading --></h2>
    <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:1.25rem;">
      <div class="card" style="background:var(--ink);color:var(--bg);border-color:var(--ink);">
        <span class="eyebrow" style="color:var(--accent);">What I Do</span>
        <h3><!-- COPY: SEO & Growth Strategy --></h3>
        <p style="opacity:.85;"><!-- COPY: 1-2 sentences --></p>
      </div>
      <div class="card">
        <span class="eyebrow">Delivery</span>
        <h3><!-- COPY: Web Systems --></h3>
        <p><!-- COPY: 1-2 sentences, references CopperBuilds --></p>
      </div>
      <div class="card">
        <span class="eyebrow">Delivery</span>
        <h3><!-- COPY: Automation --></h3>
        <p><!-- COPY: 1-2 sentences, references GHL --></p>
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

- [ ] **Step 2: Run `/impeccable craft` to draft every `<!-- COPY: ... -->` block, using `content-brief.md` facts and the SEO seed above — no invented facts, no invented stats. Replace each comment with the drafted copy in place.**

- [ ] **Step 3: Verify no COPY placeholders remain**

Run: `grep -c "COPY:" index.html`
Expected: `0`

- [ ] **Step 4: Run the Vale gate**

Run: `vale --config=.vale.ini index.html`
Expected: 0 errors (warnings judged case-by-case per the vale-check skill — fix genuine issues, document any left as false positives)

- [ ] **Step 5: Fix any Vale errors and re-run Step 4 until it passes**

- [ ] **Step 6: Visual check in the browser**

Run: `node serve.mjs` (background), then load `http://localhost:3000/` — confirm nav renders, hero reads correctly, no `--rule`/`--accent` literal strings visible (a sign the CSS didn't load), all 3 service cards render without a symmetric-grid collapse (the lead card should look visually heavier than the other two).

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
- Consumes: same as Task 7, plus bio facts from `content-brief.md` Open Question 2 (must be answered before this task starts — if still blank, stop and ask the user before writing bio copy)

**SEO seed:** primary target `About Luis Echarri`; supports the same "Growth Strategist" positioning as Home.

- [ ] **Step 1: Write the HTML skeleton (same `<head>`/nav/footer boilerplate as Task 7's index.html, only `<title>`, meta description, and `<main>` differ)**

```html
<!-- <head> identical to index.html except: -->
<title>About — Luis Echarri</title>
<meta name="description" content="<!-- COPY: 1-sentence meta description -->">

<!-- nav/noscript identical to index.html -->

<main>
  <section class="container" style="padding:4rem 0 3rem;max-width:640px;">
    <span class="eyebrow">About</span>
    <h1><!-- COPY: e.g. "Luis Echarri" or a bio-led headline --></h1>
    <p><!-- COPY: paragraph 1, bio from content-brief.md Open Question 2 --></p>
    <p><!-- COPY: paragraph 2, how he got into growth/SEO work --></p>
  </section>

  <section class="container" style="padding:0 0 3rem;max-width:640px;">
    <h2><!-- COPY: e.g. "What I Run" --></h2>
    <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:1rem;">
      <li class="card"><strong>CopperBuilds</strong> — <!-- COPY: one line --></li>
      <li class="card"><strong>GHL Automation</strong> — <!-- COPY: one line --></li>
      <li class="card"><strong>SMM</strong> — <!-- COPY: one line --></li>
    </ul>
  </section>
</main>

<!-- footer identical to index.html -->
```

- [ ] **Step 2: Run `/impeccable craft` for every `<!-- COPY: ... -->` block using `content-brief.md` facts. If Open Question 2 is still unanswered, stop this task and ask the user for the bio facts before proceeding — do not invent biographical details.**

- [ ] **Step 3: Verify no placeholders remain**

Run: `grep -c "COPY:" about.html`
Expected: `0`

- [ ] **Step 4: Run the Vale gate, fix errors, re-run until it passes**

Run: `vale --config=.vale.ini about.html`
Expected: 0 errors

- [ ] **Step 5: Visual check via `node serve.mjs` → `http://localhost:3000/about`**

- [ ] **Step 6: Commit**

```bash
cd luisecharri
git add about.html
git commit -m "feat: add About page, Vale-gated"
```

---

## Task 9: Services Page (services.html)

**Files:**
- Create: `luisecharri/services.html`

**Interfaces:**
- Consumes: same as Task 7

**SEO seed:** primary target `SEO & Growth Strategy Services`.

- [ ] **Step 1: Write the HTML skeleton**

```html
<!-- <head> identical pattern to index.html: -->
<title>Services — Luis Echarri, Growth Strategist</title>
<meta name="description" content="<!-- COPY -->">

<!-- nav/noscript identical -->

<main>
  <section class="container" style="padding:4rem 0 3rem;max-width:640px;">
    <span class="eyebrow">What I Do</span>
    <h1><!-- COPY: headline, must contain "SEO & Growth Strategy" --></h1>
    <p><!-- COPY: 2-3 sentence intro --></p>
  </section>

  <section class="container" style="padding:0 0 3rem;display:flex;flex-direction:column;gap:1.5rem;">
    <div class="card">
      <h2><!-- COPY: SEO & Growth Strategy --></h2>
      <p><!-- COPY: what this covers, process --></p>
    </div>
    <div class="card" style="margin-left:2.5rem;">
      <span class="eyebrow">Delivered via CopperBuilds</span>
      <h2><!-- COPY: Web Systems --></h2>
      <p><!-- COPY: what this covers --></p>
    </div>
    <div class="card" style="margin-left:2.5rem;">
      <span class="eyebrow">Delivered via GHL Automation</span>
      <h2><!-- COPY: Automation & CRM --></h2>
      <p><!-- COPY: what this covers --></p>
    </div>
  </section>

  <section class="container" style="padding:0 0 3rem;max-width:640px;">
    <a class="btn btn-primary" href="/contact"><!-- COPY: CTA label --></a>
  </section>
</main>

<!-- footer identical -->
```

(The staggered `margin-left` on the two delivery-channel cards is the required asymmetric moment — SEO & Growth Strategy stays full-width as the lead service, the two delivery channels visually nest under it.)

- [ ] **Step 2: Run `/impeccable craft` for every `<!-- COPY: ... -->` block using `content-brief.md` facts**

- [ ] **Step 3: Verify no placeholders remain**

Run: `grep -c "COPY:" services.html`
Expected: `0`

- [ ] **Step 4: Run the Vale gate, fix errors, re-run until it passes**

Run: `vale --config=.vale.ini services.html`
Expected: 0 errors

- [ ] **Step 5: Visual check via `node serve.mjs` → `http://localhost:3000/services`**

- [ ] **Step 6: Commit**

```bash
cd luisecharri
git add services.html
git commit -m "feat: add Services page, Vale-gated"
```

---

## Task 10: Work Page (work.html)

**Files:**
- Create: `luisecharri/work.html`

**Interfaces:**
- Consumes: same as Task 7, plus confirmed live work-sample links from `content-brief.md` Open Question 3

**SEO seed:** primary target `Luis Echarri — Work & Case Studies`.

- [ ] **Step 1: Write the HTML skeleton**

```html
<!-- <head> identical pattern -->
<title>Work — Luis Echarri</title>
<meta name="description" content="<!-- COPY -->">

<!-- nav/noscript identical -->

<main>
  <section class="container" style="padding:4rem 0 3rem;max-width:640px;">
    <span class="eyebrow">Work</span>
    <h1><!-- COPY: headline --></h1>
    <p><!-- COPY: 2-3 sentences, honest framing — no invented metrics, links speak for themselves --></p>
  </section>

  <section class="container" style="padding:0 0 3rem;display:flex;flex-direction:column;gap:1.5rem;">
    <!-- one .card per confirmed live link from content-brief.md Open Question 3 -->
    <a class="card" href="https://copperbuilds.com/" target="_blank" rel="noopener" style="text-decoration:none;display:block;">
      <span class="eyebrow">CopperBuilds</span>
      <h2><!-- COPY: what this venture is, one line --></h2>
      <p><!-- COPY: 1-2 sentences on the work --></p>
    </a>
    <!-- repeat card block per additional confirmed link; if none confirmed beyond CopperBuilds, this is the only card -->
  </section>

  <section class="container" style="padding:0 0 3rem;max-width:640px;">
    <h2><!-- COPY: "How I Work" --></h2>
    <p><!-- COPY: process/methodology paragraph — substitutes for quantified case-study proof per spec --></p>
  </section>
</main>

<!-- footer identical -->
```

- [ ] **Step 2: Run `/impeccable craft` for every `<!-- COPY: ... -->` block. Only include work-sample cards for links confirmed live in `content-brief.md` — never link an unconfirmed or dead URL.**

- [ ] **Step 3: Verify no placeholders remain and every linked URL is one confirmed in content-brief.md**

Run: `grep -c "COPY:" work.html` → expect `0`
Run: `grep -o 'href="https://[^"]*"' work.html` → manually cross-check each URL against `content-brief.md`'s confirmed list

- [ ] **Step 4: Run the Vale gate, fix errors, re-run until it passes**

Run: `vale --config=.vale.ini work.html`
Expected: 0 errors

- [ ] **Step 5: Visual check via `node serve.mjs` → `http://localhost:3000/work`, click through every external link to confirm it loads (not a 404)**

- [ ] **Step 6: Commit**

```bash
cd luisecharri
git add work.html
git commit -m "feat: add Work page, Vale-gated"
```

---

## Task 11: Contact Page (contact.html)

**Files:**
- Create: `luisecharri/contact.html`

**Interfaces:**
- Consumes: same as Task 7, plus the contact method confirmed in `content-brief.md` Open Question 1

- [ ] **Step 1: Write the HTML skeleton — a direct `mailto:`/`tel:` CTA, no third-party form service. (A form handler like Web3Forms needs a signup + API key that don't exist yet — that's real scope, not this phase; a working direct-contact link beats a broken or blocked form.)**

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
      <a class="btn btn-primary" href="mailto:<!-- EMAIL from content-brief.md Open Question 1 -->" style="width:fit-content;">Email Me</a>
      <!-- if a phone number was confirmed in Open Question 1: -->
      <a class="btn btn-ghost" href="tel:<!-- PHONE -->" style="width:fit-content;">Call / WhatsApp</a>
    </div>
  </section>
</main>

<!-- footer identical -->
```

- [ ] **Step 2: Run `/impeccable craft` for every `<!-- COPY: ... -->` block. Insert the exact email/phone confirmed in `content-brief.md` Open Question 1 — never a placeholder or an unconfirmed value.**

- [ ] **Step 3: Verify no placeholders remain and the contact link matches content-brief.md exactly**

Run: `grep -c "COPY:" contact.html` → expect `0`
Run: `grep "mailto:" contact.html` → confirm it matches the confirmed email exactly, no typos

- [ ] **Step 4: Run the Vale gate, fix errors, re-run until it passes**

Run: `vale --config=.vale.ini contact.html`
Expected: 0 errors

- [ ] **Step 5: Visual check via `node serve.mjs` → `http://localhost:3000/contact`**

- [ ] **Step 6: Commit**

```bash
cd luisecharri
git add contact.html
git commit -m "feat: add Contact page, Vale-gated"
```

---

## Task 12: Cross-Page QA, Deploy, Verify Production

**Files:**
- Modify: none (verification-only task)

**Interfaces:**
- Consumes: all 5 pages (Tasks 7–11), `_headers` (Task 6), the Cloudflare Pages project already connected to `lantech0/luisecharri` (created during brainstorming, previously failed because the repo was empty)

- [ ] **Step 1: Verify noscript fallback present on every page**

Run: `for f in index about services work contact; do echo "$f: $(grep -c noscript $f.html)"; done` (or the PowerShell equivalent `foreach`)
Expected: every page reports `2` (one opening context, one closing tag counted by `-c` on the literal string — adjust to `grep -c "<noscript>"` if the count looks off) — the key check is non-zero on every page

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

- [ ] **Step 9: Report the live URL and any deferred items (dark mode, blog, custom domain, additional work samples) explicitly to the user — do not silently omit them**

---

## Execution Notes

- Tasks 1–6 have no user-facing content and can run in one sitting.
- Task 1 (content brief) blocks Tasks 7–11 — every copy-writing step depends on real answers, not invented ones. If the user hasn't answered the open questions by the time Task 7 starts, stop and ask before drafting any copy.
- Tasks 7–11 are independent of each other except for shared nav/footer (Task 5) and tokens (Task 2) — they can be done in any order, though Home (Task 7) first gives the clearest sense of whether the design system reads well before repeating the pattern 4 more times.

