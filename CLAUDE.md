# CLAUDE.md — Karate Handbook Build Instructions

## What This Is

A comprehensive Wado-Ryu karate training reference for AWIKP (Associação Wado Internacional Karate-do Portugal) dojos. Built as a single HTML file. First in English, later translated to Portuguese.

## The Rules That Cannot Be Broken

1. **NEVER read the full HTML file into your context.** The file is 500KB+ with base64-encoded images. It will blow your context window. Every edit must be a Python script using targeted string search/replace.

2. **Clean up after yourself.** Every Python script, every temporary file, every rasterized page image, every intermediate crop — delete it at the end of the script. The working directory must contain ONLY the permanent files listed below. Nothing else survives. See `WAY_OF_WORKING.md` for the cleanup pattern.

3. **When PDF content conflicts with existing HTML content, STOP.** Flag the conflict to Pedro. Do not reconcile.

4. **Archive every shipped version.** Before overwriting `index.html` with a new version, copy the current file to `archive/html-versions/karate-handbook-v{current}.html`. The archive preserves every shipped version. Never delete from `archive/html-versions/`.

---

## Directory Structure

```
index.html                                  # THE deliverable (served by GitHub Pages)
CLAUDE.md                                   # This file
README.md                                   # Repo homepage
.gitignore

data/                                       # JSON libraries (embedded into index.html at build time)
docs/                                       # Plans, prompts, blueprints
  PLAN.md                                   # Build plan with phase status
  PROMPTS.md                                # Prompts for remaining phases
  WAY_OF_WORKING.md                         # Workflow reference
  start-here.html                           # Build tracker
  karate-app-blueprint-v3.html              # Sport Kumite drill/session data source

sources/                                    # Source materials — never modified
  WIKFhandboek.PDF                          # Source PDF (images)
  WIKFhandboek__1_-english-translation.PDF  # Source text
  WKF_2026_Kumite_Competition_Rules.pdf     # WKF 2026 rules for Phase 7
  logo_peito_-_pa_ssaro.svg                 # AWIKP bird logo (black body + #FF1943 red)

images/                                     # Extracted source images (already embedded in HTML)
  kata/                                     # Kata photos & diagrams
  kumite/                                   # Sanbon, Ohyo, Kihon Kumite photos
  weapons/                                  # Tanto Dori, Idori, Tachi Dori, Nage-Waza photos

archive/                                    # Historical / legacy files
  html-versions/                            # Shipped handbook versions (karate-handbook-v{N}.html)
    prototypes/                             # Earliest HTML prototypes
  data/                                     # Old JSON exports, UI concepts
  misc/                                     # Old diagrams, tracker, duplicate assets
```

**Cleanup rule still applies:** After every prompt, no temporary files (scripts, rasterized pages, crops, `__pycache__/`) should remain in the root. Between a Phase A (image extraction) and Phase B (integration) prompt, named JPEGs may stay temporarily in the root — Phase B encodes them into the HTML and then deletes them.

---

## File Roles

| File | Use For | Images? |
|------|---------|---------|
| `sources/WIKFhandboek.PDF` | Rasterize with `pdftoppm` for image extraction | ✅ Yes — the ONLY image source |
| `sources/WIKFhandboek__1_-english-translation.PDF` | Read for technique descriptions and text | ❌ No — plain text despite .PDF extension. NEVER rasterize |
| `index.html` | The output (root, served by Pages). Surgical Python edits only. Prior versions live in `archive/html-versions/` | N/A — base64 images in JS objects |
| `sources/logo_peito_-_pa_ssaro.svg` | Inline SVG logo. Bird fill switches by theme; red circle #FF1943 constant | N/A |
| `docs/karate-app-blueprint-v3.html` | Sport Kumite drills (30) and sessions (3) data source | N/A |
| `sources/WKF_2026_Kumite_Competition_Rules.pdf` | WKF 2026 kumite rules — gesture illustrations pp.50-55 | ✅ Images |

## Content Authority

- **Primary source**: The existing HTML content
- **History source of truth**: AWIKP website (wadoryu-portugal.com). WIKF founded 1989 (not 1991).
- **WKF Rules source**: `sources/WKF_2026_Kumite_Competition_Rules.pdf` (Version 2026.01)
- **Image source**: `sources/WIKFhandboek.PDF` only
- **Text enrichment**: `sources/WIKFhandboek__1_-english-translation.PDF`

## Lineage — Non-Negotiable

- Hironori Ōtsuka (Founder) → Tatsuo Suzuki (8th Dan Hanshi, WIKF Founder) → Jon Wicks (World Chief Instructor) AND Joaquim Gonçalves (7th Dan, AWIKP Technical Director)
- Wicks and Gonçalves are BOTH direct students of Suzuki. **Peers, not sequential.**
- Wicks is World Chief Instructor. That's the story. Nothing more about how that came to be.

## Language Rules

- Clean, technically accurate English for karate students
- Japanese terminology preserved with English translations
- No machine-translated Dutch or Portuguese in the output
- Proper nouns as-is (AWIKP, Associação, diacritics)

---

## Prerequisites

- `poppler-utils` (provides `pdftoppm`)
- Python 3 with `Pillow` (`pip install Pillow`)
- `index.html` in working directory (latest version is always the root file)

## How Phases Work

1. **Prompt A — Image Extraction**: Rasterize → crop → optimize → save named JPEGs → delete rasterized pages and script.
2. **Prompt B — Integration**: Base64-encode JPEGs → patch HTML data → extract text from English PDF → bump version → delete JPEGs, old HTML, and script.

Text-only phases (4C, 5) use a single prompt.

---

## Image Processing Rules

- Source: `sources/WIKFhandboek.PDF` only
- Rasterize: `pdftoppm` at 200 DPI
- Crop with Python/Pillow
- Optimize: max 750px wide, JPEG quality 72
- Encode as `data:image/jpeg;base64,...` for embedding
- Credit: WIKF Belgium Handbook
- **Delete all intermediate images when done**

---

## Design System — Phase 7 Updates

### Key Design Changes (Phase 7)
- **BORDER RADIUS: ZERO everywhere** — brutalist rectangular design, no rounded corners
- **Max content width: 1200px** — replaces old 700px cap
- **Animated topo background** — truly dynamic moving contour lines (requestAnimationFrame or multi-layer CSS at different speeds), 0.03-0.05 opacity. Living, breathing, not just a static SVG that drifts
- **Giant bird logo watermark** — bird SVG at **full viewport height (100vh)**, right-aligned, only right portion visible, 3-4% opacity, fixed position. Massive, immersive.
- **Hero logo 50% bigger** — commanding presence on homepage
- **Navbar**: Logo + "WADO RYU HANDBOOK" = home link. No home emoji.
- **← Back link** on every subpage below title/subtitle
- **Entry animations**: fadeSlideUp (200ms), staggered card reveals
- **Card hover**: translateY(-2px) + border-color shift
- **Site name**: WADO RYU HANDBOOK (was "Karate Handbook")

## Design System

### Fonts
- Body: `'DM Sans', system-ui, sans-serif`
- Mono: `'Space Mono', monospace`
- Base: 16px

### Colors — Backgrounds
| Token | Hex |
|-------|-----|
| Page bg | `#0a0a0c` |
| Card/surface | `#131316` |
| Card border | `#1e1e24` |
| Border active | `#2a2a32` |
| Code block bg | `#111114` |
| Table header bg | `#111114` |
| Selection | `rgba(255,107,107,0.25)` |

### Colors — Text
| Token | Hex |
|-------|-----|
| Primary | `#f0eeeb` |
| Secondary | `#c0bfbb` |
| Muted | `#b0aead` |
| Dim | `#666666` |
| Ghost | `#555555` |
| Subtle | `#44444d` |
| Faint | `#3a3a42` |
| Floor | `#33333b` |

### Colors — Accents
| Name | Hex |
|------|-----|
| Red (primary) | `#ff6b6b` |
| Orange | `#f4a261` |
| Teal | `#2a9d8f` |
| Blue | `#457b9d` |
| Purple | `#9b5de5` |
| Gold | `#e9c46a` |

### Belt Colors (AWIKP)
| Grade | Belt | Hex |
|-------|------|-----|
| 8th Kyu | Yellow | `#e9c46a` |
| 7th Kyu | Orange | `#f4a261` |
| 6th Kyu | Green | `#2a9d8f` |
| 5th Kyu | Blue | `#457b9d` |
| 4th Kyu | Red | `#ff6b6b` |
| 3rd–1st Kyu | Brown | `#a0522d` |
| Dan | White/Black | `#f0eeeb` |

### Design Rules
1. This palette and these fonts only. No Inter, Roboto, Arial, or system-only stacks.
2. Dark theme by default.
3. Red is default primary accent. Pick contextually from the six.
4. Monospace = Space Mono.
5. Min touch target: 44px. Mobile-first. Max content width: 700px.
6. Cards: `#131316` bg, `#1e1e24` border, 12–14px radius, 4px left accent border.
7. Top bars: sticky, frosted glass (`#0e0e10ee` + `backdrop-filter: blur(12px)`).
8. No grey/graphite as dominant accent.

---

## App Architecture (v12)

### Navigation
- Sticky navbar: ☰ hamburger + 🏠 home + "KARATE HANDBOOK"
- Slide-in left drawer
- Swipe-from-left-edge = browser back (`useSwipeBack` hook)
- No in-app back button
- Browser/hardware back button works (v15): `go`/`navTo`/`home` call `window.history.pushState`; a `popstate` listener fires in-app `back()`; swipe calls `window.history.back()` so all back paths flow through `popstate`

### Three-Tier Home
1. **Main Training** (red) — Sport Kumite, Wado-Ryu Drills + WIKF Syllabus + Exam Syllabus
2. **Strength & Mobility** (teal) — Coordination, Flexibility, Speed/Agility, Pillar Prep, Calisthenics, Strength & Power
3. **Supporting Exercises** (purple) — Kihon & Fundamentals, Keri Waza, Playful Kumite & Games, Programmes & Assessment

### Key JS Data Structures
- `EX` — 468 exercises across 12 categories
- `KATA` / `KATA_IMAGES` — Kata list + base64 images
- `KUMITE_FORMS` — `.sanbon`, `.ohyo`, `.kihon` sub-objects
- `WEAPONS_DATA` — Tanto Dori, Idori, Tachi Dori, Nage-Waza arrays
- `KIHON_SECTIONS` / `KIHON_IMAGES` — Kihon reference
- `HISTORY_PAGES` / `PRINCIPLES_PAGES` — Content page metadata
- `KYU_EXAMS` / `DAN_EXAMS` — Exam syllabus

To modify: find the declaration by string search, then inject/replace entries. Never reconstruct full structures.

---

## Phase Status Summary

| Phase | Status | Version |
|-------|--------|---------|
| 0 Architecture | ✅ | v9 |
| 1A Kihon Reference | ✅ | v10 |
| 1B Kata: Pinan Series | ✅ | v11 |
| 1C Kata: Advanced Batch 1 | ✅ | v12 |
| 1D Kata: Advanced Batch 2 | ✅ | v13 |
| 2A Sanbon Kumite | ✅ | v14 |
| P0 Browser back-button fix | ✅ | v15 |
| 2B Ohyo Kumite | ✅ | v16 |
| 2C Kihon Kumite 1–5 | ✅ | v17 |
| 2D Kihon Kumite 6–10 | ✅ | v18 |
| 2C/2D Kihon-5 & 10 images | ✅ | v19 |
| 3A Tanto Dori 1–10 | ✅ | v20 |
| 3B Idori & Tachi Dori | ✅ | v21 |
| 3C Nage-Waza | ✅ | v22 |
| 4A History & Lineage | ✅ | v23 |
| 4B Principles & Philosophy | ✅ | v24 |
| 4C Japanese Glossary | ✅ | v25 |
| 5 Polish | ✅ | v26 |
| 6 Visual Redesign | ✅ | v27-v31 |
| 7A Design Foundation + Content | 🔲 | v32 |
| 7B Layout Overhaul + Exam Polish | 🔲 | v33 |
| 7C WKF Competition Rules | 🔲 | v34 |
| 7D Global Polish | 🔲 | v35 |
| 8A Language Toggle + Design Polish | 🔲 | v37 |
| 8B Translate Exercises | 🔲 | v38 |
| 8C Translate Reference + Knowledge | 🔲 | v39 |
| 8D Translate Syllabus + WKF + Audit | ✅ | v39 |
| 9 Kata + Kumite Video Embeds | ✅ | v41 |
| 12 CSS Consolidation + WCAG | ✅ | v58-v60 |
| TBD PWA + Android | 🔲 | TBD |

Full details in `PLAN.md`. Prompts in `PROMPTS.md`.

> **⚠️ Before starting 8D:** read the "⚠️ BEFORE 8D — State of the App After 8C" preamble at the top of the PROMPT 8D section in `PROMPTS.md`. It documents the translation framework (`tL()`/`LABELS_PT`, `_PT` data pattern, PT-as-default, EN/PT text toggle), the existing `_PT` constants, and four gotchas that will silently break the app if ignored (LANG in `useMemo` deps, no stray `)` on inline `const C` ternaries, silent in-browser Babel failures, never translate lookup/key fields).
