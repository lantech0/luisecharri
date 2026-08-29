# DESIGN.md — Luis Echarri Personal Site

## Style Direction: "Confident Navy" (switched from "Modern Slate" 2026-08-29 — user preference)
Editorial-minimal structure carried over (large confident typography,
one asymmetric visual moment, generous whitespace, no symmetric card grids),
structured after jennseo.com (nav/hero/stats/services/case-studies/contact flow).
Checked against `anti-ai-design`: no neon, no gradient text/fills, no glow,
single accent used sparingly. Navy ink (trust/stability) + muted brass accent
(growth signal, not gold/neon) on warm off-white.

## Color
| Token | Hex | Meaning |
|---|---|---|
| `--ink` | `#1C2A3A` | deep navy — trust/stability, primary text |
| `--accent` | `#B8853A` | muted brass — decorative/non-text emphasis only (fails WCAG AA as text or text-bearing background at this weight; use `--accent-text` for those), ≤20% of composition |
| `--accent-text` | `#856024` | darker brass — accent color for text and text-bearing button backgrounds (`.eyebrow`, `.btn-primary`); 5.36:1 against `--bg`, passes WCAG AA |
| `--accent-on-dark` | `#C99752` | lighter brass — accent text on `--ink` backgrounds only (e.g. dark card eyebrows); 5.57:1 against `--ink`, passes WCAG AA |
| `--bg` | `#FAF8F4` | warm off-white — never pure white |
| `--soft` | `#EFEBDF` | tinted surface for stat bars / soft cards |
| `--rule` | `rgba(28,42,58,.35)` | hairline borders/dividers — visible as an intentional line, not just decorative |
| `--shadow` | `rgba(28,42,58,.12)` | ink-tinted shadow, never cold black |

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
- **Fixed 2026-08-29 (user flagged the site as reading "empty"/"sparse"):**
  content-heavy sections (card grids, experience lists) use the full container
  width or close to it (`.skills-grid` full width, About's Experience list
  capped at 820px, Services' card row uncapped) — never squeeze substantial
  content into the 640px prose column. Prose-only sections (hero intro,
  Education) use 720px, wide enough to avoid feeling cramped without hurting
  readability. Home's hero is a two-column `.hero-grid` (text + a real
  `.hero-panel` of career facts, not decorative filler) instead of a single
  narrow column with empty space beside it — since there's no photo yet, real
  content does the job of filling the frame.

## Components
- `.btn-primary` — accent background, bg-colored text
- `.btn-ghost` — 1.5px ink-rule border, transparent background
- `.card` — 1px `--rule` border, no shadow at rest
- Focus states mandatory: `outline: 2px solid var(--accent); outline-offset: 3px`
