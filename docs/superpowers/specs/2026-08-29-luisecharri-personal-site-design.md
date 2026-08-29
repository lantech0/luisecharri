# Luis Echarri Personal Site — Design Spec

## Purpose
**Revised 2026-08-29 (major pivot — read before touching any page):** this site's real purpose is job applications to SEO/marketing agencies for Luis Antonio Echarri Jr, positioned as **SEO Specialist**. It is a resume-backed portfolio site, not a freelance/agency-owner brand site.

**Ventures are explicitly excluded** — CopperBuilds, GHL Automation, and SMM management do NOT appear anywhere on this site as businesses Luis runs. Reasoning (Luis's own call, recorded here so it isn't re-litigated mid-build): showing active side ventures to a hiring agency reads as a flight-risk/conflict-of-interest signal ("will he leave once he has enough of his own clients?") that no amount of copy framing fully removes. The safest, honest choice is to leave them off entirely rather than manage the risk with wording.

All content is grounded in the verified resume/profile at `job-hunter/profile/profile.md` (source: `Luis-Echarri-Resume.pdf`) — 7+ years SEO experience (2019–present), roles at Salience and BIG Catch Digital, technical support background at Convergys, real tool list, real education. No invented facts, no invented metrics.

Work samples are deferred — Luis will provide real sample work in a follow-up session. The Work page ships with structure only (no CopperBuilds portfolio, no placeholder cards) until then.

Phase 2 (future, out of scope here) adds lead-gen content (blog/SEO) if/when this shifts back toward a consulting-brand site.

## Stack & Hosting
- Static HTML/CSS/JS — no framework, no build step (matches CopperBuilds' approach)
- Repo: `github.com/lantech0/luisecharri` (created, cloned locally to `LantechAI/luisecharri/`)
- Hosting: Cloudflare Pages, free tier, connected to the GitHub repo
- Domain: `luisecharri.pages.dev` (no custom domain purchase for now)
- Deploy: `git push origin main` from `luisecharri/` — Cloudflare auto-deploys, same pattern as CopperBuilds

## Visual Identity
Distinct from CopperBuilds — own palette and typography, not the copper/green wordmark system (which is locked to the CopperBuilds brand). Same quality bar and professional tone, but its own `DESIGN.md` as source of truth, built via the `frontend-design` skill.

**Style direction: "Modern Slate"** (checked against the `anti-ai-design` skill — no neon, no gradient text/fills, no glow, single accent):
- Ink: `#2A2F33` (charcoal-slate — focus/clarity)
- Accent: `#B85C3E` (muted rust — used sparingly, CTAs/emphasis only, ≤20% of composition)
- Background: `#F4F3F0` (cool-neutral off-white — never pure white)
- Shadows: warm-tinted ink (`rgba(42,47,51,...)`), never cold black
- Reference: styled editorial-minimal like haleygdavidson.com (large confident typography, one asymmetric visual moment, generous whitespace, no symmetric card grids), structured like jennseo.com (nav/hero/stats/services/case-studies/contact page flow)
- Palette lives in CSS custom properties in `DESIGN.md`/`css/style.css` — swappable later without a rebuild

## Structural Reference
Page structure and per-page layout are modeled on jennseo.com (nav + CTA button, photo hero with floating stat-card overlays, stats bar, "What I Do" services section, case studies, contact) — but **not** its dark/gold visual style. Our own `DESIGN.md` palette and typography apply throughout; jennseo.com is a layout/IA reference only.

## Content — Multi-Page (5 pages, mirrors jennseo.com's nav)
Shared nav + footer across all pages, injected via `js/nav.js` / `js/footer.js` with a `<noscript>` static fallback — same proven mechanism CopperBuilds uses (`copperbuilds/js/nav.js`), just this site's own visual style.

1. **Home** (`index.html`) — hero (positioning headline "SEO Specialist", CTA; text-led, no photo — none supplied yet, add later if provided), stats/credibility bar using real resume facts only (e.g. "7+ years SEO experience", employer names, tool count — no invented numbers), condensed teasers into the other pages
2. **About** (`about.html`) — bio from `job-hunter/profile/profile.md`'s Professional Summary, real work-experience timeline (Salience, BIG Catch Digital, Convergys), education
3. **Services** (`services.html`) — core SEO/research skill set from the resume's Skills & Tools section (technical audits, on-page SEO, lead research, WordPress builds) — no venture/business language anywhere
4. **Work** (`work.html`) — deferred. Structure only for now (e.g. a "How I Work" process/methodology section); no sample-work cards until Luis provides real samples in a follow-up session. Never substitute CopperBuilds or any venture as a stand-in.
5. **Contact** (`contact.html`) — email `valuisantonioecharrijr@gmail.com`, phone `+63 977 329 3969`, LinkedIn `https://www.linkedin.com/in/luisecharri/` (all confirmed 2026-08-29)

## Build Process (reuses CopperBuilds workflow)
- `frontend-design` skill invoked before any frontend code, every session
- Three-layer copy framework: manual SEO seed (name + "SEO Specialist" + target-role keywords from `profile.md`) → marketing copy via `/impeccable craft` → `/vale-check` mechanical gate
- Skip `/copperbuilds-seo` — that tool is built around `client.env` + DataForSEO for CopperBuilds client builds; overkill for one personal page
- No CMS, no client registry entry (this isn't a CopperBuilds client)

## Out of Scope (this spec)
- Blog / lead-gen content pipeline (phase 2)
- Custom domain purchase
- Any mention of CopperBuilds, GHL Automation, or SMM management as ventures Luis runs (explicit exclusion — see Purpose)
- Work-sample cards on the Work page (deferred until Luis provides real samples)
- Dark mode toggle (locked to one identity — Modern Slate, light — for phase 1; low-cost add-on later since tokens are already variable-based)
- Palette switcher for visitors (considered, rejected — fragments brand identity; Modern Slate previewed and locked via [artifact](https://claude.ai/code/artifact/cb24a026-e9e7-4dc0-95b6-0546de7abe78))

## Success Criteria
- 5 responsive HTML pages (Home, About, Services, Work, Contact) live at `luisecharri.pages.dev`, sharing one nav/footer
- Security headers (`_headers` file: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) live on production, verified via `curl -sI`
- Noscript nav fallback present on every page (JS-injected nav has a static fallback)
- Passes `/vale-check` and CopperBuilds-equivalent QA (broken links, mobile rendering, Core Web Vitals sanity)
- Zero mentions of CopperBuilds, GHL Automation, or SMM as ventures Luis runs anywhere on the site — grepped and confirmed, not just eyeballed
- Every fact on the site traces back to `job-hunter/profile/profile.md` or this spec's confirmed Contact block — nothing invented
- Structure allows a `/blog` addition later without a rebuild
