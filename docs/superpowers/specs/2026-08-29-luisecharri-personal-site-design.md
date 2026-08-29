# Luis Echarri Personal Site — Design Spec

## Purpose
A personal credibility site for Luis, positioned as **Growth Strategist**. Phase 1 (this spec) is a multi-page credibility site (mirroring jennseo.com's page structure). Phase 2 (future, out of scope here) adds lead-gen content (blog/SEO) once phase 1 is live.

## Stack & Hosting
- Static HTML/CSS/JS — no framework, no build step (matches CopperBuilds' approach)
- Repo: `github.com/lantech0/luisecharri` (created, cloned locally to `LantechAI/luisecharri/`)
- Hosting: Cloudflare Pages, free tier, connected to the GitHub repo
- Domain: `luisecharri.pages.dev` (no custom domain purchase for now)
- Deploy: `git push origin main` from `luisecharri/` — Cloudflare auto-deploys, same pattern as CopperBuilds

## Visual Identity
Distinct from CopperBuilds — own palette and typography, not the copper/green wordmark system (which is locked to the CopperBuilds brand). Same quality bar and professional tone, but its own `DESIGN.md` as source of truth, built via the `frontend-design` skill.

## Structural Reference
Page structure and per-page layout are modeled on jennseo.com (nav + CTA button, photo hero with floating stat-card overlays, stats bar, "What I Do" services section, case studies, contact) — but **not** its dark/gold visual style. Our own `DESIGN.md` palette and typography apply throughout; jennseo.com is a layout/IA reference only.

## Content — Multi-Page (5 pages, mirrors jennseo.com's nav)
Shared nav + footer across all pages, injected via `js/nav.js` / `js/footer.js` with a `<noscript>` static fallback — same proven mechanism CopperBuilds uses (`copperbuilds/js/nav.js`), just this site's own visual style.

1. **Home** (`index.html`) — hero (positioning headline "Growth Strategist", photo, CTA), stats/credibility bar (non-fabricated facts only — years active, ventures run; no invented metrics), condensed teasers into the other pages
2. **About** (`about.html`) — bio, who Luis is, what he does
3. **Services** (`services.html`) — "What I Do": SEO + growth strategy; CopperBuilds/GHL automation/SMM management mentioned as delivery channels, not separate portfolio sections
4. **Work** (`work.html`) — links to live sites Luis has built/worked on (e.g. CopperBuilds), styled like a case-studies section. No quantified metrics in this phase — real numbers aren't verified yet. (Future: swap in real Ahrefs data once pulled and verified.) Includes a "How I Work" process/methodology block substituting for case-study proof.
5. **Contact** (`contact.html`) — contact form/CTA

## Build Process (reuses CopperBuilds workflow)
- `frontend-design` skill invoked before any frontend code, every session
- Three-layer copy framework: manual SEO seed (name + "Growth Strategist" + positioning keywords) → marketing copy via `/impeccable craft` → `/vale-check` mechanical gate
- Skip `/copperbuilds-seo` — that tool is built around `client.env` + DataForSEO for CopperBuilds client builds; overkill for one personal page
- No CMS, no client registry entry (this isn't a CopperBuilds client)

## Out of Scope (this spec)
- Blog / lead-gen content pipeline (phase 2)
- Custom domain purchase
- Quantified case-study metrics (Ahrefs data pull deferred)

## Success Criteria
- 5 responsive HTML pages (Home, About, Services, Work, Contact) live at `luisecharri.pages.dev`, sharing one nav/footer
- Security headers (`_headers` file: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) live on production, verified via `curl -sI`
- Noscript nav fallback present on every page (JS-injected nav has a static fallback)
- Passes `/vale-check` and CopperBuilds-equivalent QA (broken links, mobile rendering, Core Web Vitals sanity)
- Structure allows a `/blog` addition later without a rebuild
