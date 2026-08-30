# HANDOFF — Luis Echarri Personal Site (2026-08-30)

Read this first before doing anything else on this project.

## Where the work lives
- **Live site: https://portfolio.luisecharri.workers.dev** (deployed 2026-08-30,
  commit `88ff14c`)
- Repo: `github.com/lantech0/luisecharri`
- Local: `C:\Users\User\LantechAI\luisecharri` (bare checkout on `main`)
- `site-build` has been merged into `main` and both are pushed to GitHub.
  `site-build` worktree at `C:\Users\User\LantechAI\luisecharri\.worktrees\site-build`
  still exists but `main` is now the current/deployed state — check `main` first.
- Full plan/spec/ledger: `docs/superpowers/plans/2026-08-29-luisecharri-personal-site.md`,
  `docs/superpowers/specs/2026-08-29-luisecharri-personal-site-design.md`,
  `.superpowers/sdd/2026-08-29-luisecharri-personal-site/progress.md` (the ledger —
  read this for the full decision history, it's extensive)

## What this site is
A job-application portfolio site for Luis Antonio Echarri Jr, positioned as
"SEO Specialist," for applying to hiring agencies. **Not** a freelance/consulting
pitch — CopperBuilds already covers that angle, so this site stays employee-only.
Explicit, hard rule: **zero mentions of CopperBuilds/GHL/SMM anywhere** — a
hiring agency seeing active side ventures reads as a flight-risk signal.

## Source of truth for facts
`content-brief.md` (repo root, not in `public/`) — every claim on every page
must trace back to this file (either the real resume at
`job-hunter/profile/profile.md`, or a self-reported skill Luis explicitly
confirmed in chat on 2026-08-30). No invented facts, ever — this has been
enforced mechanically (grep checks, reviewer fact-audits) all the way through.

## File structure (important — don't get this wrong again)
- `public/` — the ONLY folder that gets deployed. 5 HTML pages, `css/`, `js/`,
  `_headers`, `wrangler.toml`, `robots.txt`, `sitemap.xml`, the resume PDF.
- Everything else (`content-brief.md`, `DESIGN.md`, `serve.mjs`, `docs/`,
  `.vale.ini`) stays at repo root, outside what Cloudflare serves.
- This split exists because the first deploy attempt leaked `content-brief.md`
  (including the literal "why we're hiding CopperBuilds" reasoning) and the
  entire `docs/` tree publicly — see ledger for the full story.

## Current design
"Confident Navy" palette: ink `#1C2A3A`, accent `#B8853A` / `#856024` (text-safe
variant) / `#C99752` (on-dark variant), bg `#FAF8F4`, soft `#EFEBDF`. All
contrast values WCAG-AA verified (computed with Python, not guessed). Tokens
live in `public/css/style.css` `:root` and are documented in `DESIGN.md`.

Structural reference: **jennseo.com** — user wants our structure/density to
match or beat hers, on our own palette (not her dark bg — that was tried and
explicitly reverted; "it's not about the color" per user).

## What's actually built right now (2026-08-30, latest commit `4848857`)
- **Home (`index.html`)** — most developed page. Has: badge
  ("Actively Seeking New Opportunities"), bold headline with an accent-highlighted
  phrase ("An SEO Hire Who *Finds What's Broken*—and Fixes It" — persuasive,
  reader-benefit framing, not just a job title), hero stat panel (floating-shadow
  card, real facts), 3 skill-teaser cards, a "Why Hire Me" 6-reason section, a
  "Tools & Tech" pill-tag showcase.
- **About** — headline reframed around the diagnose-then-fix throughline
  (Convergys → SEO), bio tightened, real Experience list (Salience, BIG Catch
  Digital, Convergys, full bullets) + Education, now ends on a "Get in Touch"
  CTA matching Services/Work. Given the same persuasive-copy pass as Home
  (commit `4848857`, 2026-08-30).
- **Services** — headline reframed ("Full-Package SEO—Not Just One Slice of
  It"), every one of the 5 secondary skill cards now has a one-line
  reader-benefit subtitle (previously bare bullet lists), closing CTA has a
  benefit line above the button. Facts/bullets unchanged, only headline +
  subtitle copy added.
- **Work** — headline reframed ("The Same Four Steps, Every Time"), intro
  tightened, closing CTA has a benefit line above the button. Still no
  sample-work cards (deferred — Luis hasn't provided real samples).
- **Contact** — headline reframed around immediate availability ("Ready to
  Start—No Notice Period", ties to Home's Reason #06 fact, differently
  worded to avoid cross-page repetition) + email/phone/LinkedIn links (all
  confirmed real values) + resume PDF download link. Home address was found
  in the resume PDF and redacted via true PDF redaction (not just visual)
  before it shipped.

## Explicitly NOT done yet / open items for next session
1. ~~About, Services, Work, Contact persuasive-copy pass~~ — **done 2026-08-30
   (commit `4848857`)**. All 4 pages now match Home's "sell, don't just list"
   bar: reframed headlines with an accent-highlighted phrase, benefit-driven
   card subtitles on Services, tightened intros, CTA reinforcement lines.
   Verified: Vale 0 errors, venture-mention grep 0 matches across all pages,
   every new claim traced to `content-brief.md`, visually confirmed via
   Playwright screenshots on all 4 pages (Playwright MCP working again this
   session — claude-in-chrome still not connecting).
2. ~~No live deploy~~ — **done 2026-08-30.** `site-build` merged into `main`
   (`63adbe8`), pushed, and deployed via `npx wrangler deploy` from
   `luisecharri/public/`. **User decision (2026-08-30): staying on the free
   `*.workers.dev` URL permanently — no custom domain purchase.** The worker
   was renamed from `luisecharri` to `portfolio` (wrangler.toml `name` field)
   to fix the awkward double-name `luisecharri.luisecharri.workers.dev` —
   live URL is now `portfolio.luisecharri.workers.dev`. The old `luisecharri`
   worker was deleted (`wrangler delete --name luisecharri`) to avoid a stale
   duplicate deployment. All stale `luisecharri.pages.dev` references in
   `og:url` tags, `robots.txt`, and `sitemap.xml` (leftover from before the
   Pages→Workers switch, never actually correct) were also fixed to point at
   the live `portfolio.luisecharri.workers.dev` domain — verified 0 survivors
   via grep, and confirmed live via curl post-deploy.

   Note for next session: Cloudflare Workers deploys need `CLOUDFLARE_ACCOUNT_ID`
   set explicitly (`6336df30945f27f218a22ce77b5a9fc5` for the `luisecharri`
   account, distinct from the `Lantech` agency account) since the login has
   access to more than one account and `wrangler deploy` can't pick one
   non-interactively. `wrangler login` (interactive/browser) was already done
   this session — should still be valid, no need to redo unless it expires.
3. ~~`site-build` branch not merged to `main`~~ — **done 2026-08-30.** Merged
   and pushed (`63adbe8`), then two follow-up commits directly on `main`
   (`98d6acf` worker rename, `88ff14c` domain reference fixes). `site-build`
   worktree can be removed next session if no longer needed — nothing is
   pending on it.
4. Deferred minors from the final review (non-blocking, listed in the ledger):
   `.btn-ghost` border contrast slightly under WCAG 1.4.11 for UI boundaries,
   no `rel="canonical"` tags, no `og:image`, favicon data-URI has unencoded
   characters, `isActive()` doesn't special-case bare `.html` URLs.
5. Work samples still deferred — Luis hasn't provided real ones yet.
6. **Searchmetrics is now defunct as a standalone product** (acquired by
   Conductor, Feb 2023 — no longer sold separately). It's still listed as a
   real tool across About/Services/Work/Home (Tools & Tech), since it's true
   past work history at Salience. Luis's call 2026-08-30: **leave it as-is
   for now** — real historical fact, not urgent — but he flagged wanting to
   revisit this later. Options on the table when he does: leave as-is,
   relabel to "Conductor (formerly Searchmetrics)", or remove it.

## Key user preferences learned this session
- Wants the site's persuasive quality to beat jennseo.com's, using only real
  facts — no fabricated stats/testimonials/case studies, ever.
- Reacted strongly negative to: sparse/empty layout, flat resume-paraphrase
  copy, a palette he didn't ask for. Reacted well to: bold highlighted
  headlines, itemized skill breakdowns, real floating/dynamic visual elements.
- Wants confirmation before big direction changes — several redesigns this
  session happened without enough upfront alignment and caused real
  frustration. Ask before another large structural pivot.
- Full memory files were written for durable lessons: see
  `feedback_cloudflare_pages_not_workers.md` in the memory folder.

## To resume tomorrow
1. `cd C:\Users\User\LantechAI\luisecharri` (main, not the site-build worktree —
   everything is merged now)
2. Read this file, then the ledger at
   `.superpowers/sdd/2026-08-29-luisecharri-personal-site/progress.md` for full
   decision history if needed.
3. `node serve.mjs` to preview locally at `http://localhost:3000/`, or just
   check the live site at https://portfolio.luisecharri.workers.dev.
4. Everything in "Explicitly NOT done yet" above is resolved except #4
   (deferred minors), #5 (work samples), and #6 (Searchmetrics relabel
   decision) — pick one of those up, or ask Luis what's next. He said he
   wants to keep improving the site generally, no specific next task locked
   in yet.
