# Luis Echarri Personal Site — Design Spec

## Purpose
A personal credibility site for Luis, positioned as **Growth Strategist**. Phase 1 (this spec) is a single-page credibility site. Phase 2 (future, out of scope here) adds lead-gen content (blog/SEO) once phase 1 is live.

## Stack & Hosting
- Static HTML/CSS/JS — no framework, no build step (matches CopperBuilds' approach)
- Repo: `github.com/lantech0/luisecharri` (created, cloned locally to `LantechAI/luisecharri/`)
- Hosting: Cloudflare Pages, free tier, connected to the GitHub repo
- Domain: `luisecharri.pages.dev` (no custom domain purchase for now)
- Deploy: `git push origin main` from `luisecharri/` — Cloudflare auto-deploys, same pattern as CopperBuilds

## Visual Identity
Distinct from CopperBuilds — own palette and typography, not the copper/green wordmark system (which is locked to the CopperBuilds brand). Same quality bar and professional tone, but its own `DESIGN.md` as source of truth, built via the `frontend-design` skill.

## Content — Single Page
1. **Hero** — positioning headline: "Growth Strategist"
2. **About / bio** — who Luis is, what he does
3. **What I Do** — SEO + growth strategy; CopperBuilds/GHL automation/SMM management mentioned as delivery channels, not as separate portfolio sections
4. **Work Samples** — links to live sites Luis has built/worked on (e.g. CopperBuilds). No quantified metrics in this phase — real numbers aren't verified yet. (Future: swap in real Ahrefs data once pulled and verified.)
5. **How I Work** — short process/methodology section, substituting for case-study proof
6. **Contact CTA**

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
- Single responsive HTML page live at `luisecharri.pages.dev`
- Passes `/vale-check` and CopperBuilds-equivalent QA (broken links, mobile rendering, Core Web Vitals sanity)
- Structure allows a `/blog` addition later without a rebuild
