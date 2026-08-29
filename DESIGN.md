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
| `--accent` | `#B85C3E` | muted rust — decorative/non-text emphasis only (fails WCAG AA as text or text-bearing background; use `--accent-text` for those), ≤20% of composition |
| `--accent-text` | `#A24F35` | darker rust — accent color for text and text-bearing button backgrounds (`.eyebrow`, `.btn-primary`); 5.11:1 against `--bg`, passes WCAG AA |
| `--bg` | `#F4F3F0` | cool-neutral off-white — never pure white |
| `--soft` | `#EAE8E4` | tinted surface for stat bars / soft cards |
| `--rule` | `rgba(42,47,51,.35)` | hairline borders/dividers — visible as an intentional line, not just decorative |
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
