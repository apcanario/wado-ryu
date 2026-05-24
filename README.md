# Wado-Ryū Handbook

A comprehensive Wado-Ryū karate training reference, built as a single, self-contained web app for the students and instructors of **AWIKP** — Associação Wado Internacional Karate-do Portugal.

**Live site:** https://apcanario.github.io/wado-ryu/

> *"This is a labour of love. For the art of Wado Ryu. And for the people who helped nurture that love from day 1 until now."*

---

## What it is

A bilingual (English / Portuguese) field manual for the AWIKP curriculum and a wider Wado-Ryū knowledge base. It bundles, in a single offline-capable HTML file:

- **468 exercises** across 12 categories — Kihon, Keri Waza, Kata work, Sport Kumite, Strength & Mobility, Playful Kumite & Games, and more.
- **Kata library** — Pinan series and the advanced kata (Naihanchi, Kushanku, Seishan, Chinto, Bassai, Jion, Jitte, Niseishi, Rohai, Wanshu), each with embedded photo sequences and embusen diagrams.
- **Kumite forms** — Sanbon Kumite, Ohyo Kumite, and Kihon Kumite 1–10 with full photo breakdowns.
- **Weapons defence** — Tanto Dori, Idori, Tachi Dori, and Funakoshi's nine Nage-Waza throws.
- **Sport Kumite** — 88 drills, 5 sessions, footwork / arms / kicks / tactics, all WKF-aligned.
- **WKF Kumite Competition Rules** — 2026 edition summaries (Articles 5, 7–12) with referee gesture illustrations.
- **Strength & Mobility** — 13 movement patterns × 3 exercises each, 10 body zones × 3 mobility exercises each, plus the RAMP-framework warmup library.
- **Japanese glossary** — ~250 terms organised by domain (stances, tsuki, uchi, geri, uke, kumite, etiquette, counting, ranks).
- **History & lineage** — Ōtsuka, Suzuki, Wicks, Gonçalves, and the WIKF / AWIKP story.
- **AWIKP exam syllabus** — full Kyu (8th → 1st) and Dan grade requirements.

Everything is bilingual. Switch language at any time with the in-app toggle; all content, labels, and metadata flip.

---

## Why it exists

AWIKP students and instructors needed one trustworthy reference that pulls together what's normally scattered across PDFs, DVDs, websites, dojo notes, and oral tradition. The goal was a single document that:

1. Respects the lineage and doesn't sanitise the chain of teachers.
2. Works on any phone, in any dojo, with no install and no data connection once loaded.
3. Lives in two languages from the start, so Portuguese students aren't reading machine-translated English.
4. Stays editable and forkable by anyone in the community — no proprietary CMS, no database, no build pipeline.

---

## Lineage

> **Hironori Ōtsuka** (Founder of Wado-Ryū)
> → **Tatsuo Suzuki** (8th Dan Hanshi, WIKF Founder — *"our grandfather in karate"*)
> → **Jon Wicks** (WIKF World Chief Instructor) **and** **Joaquim Gonçalves** (7th Dan, AWIKP Technical Director)

Wicks and Gonçalves are both direct students of Suzuki — peers, not sequential. Suzuki spread Wado-Ryū across Europe from 1963 and founded the WIKF in 1989 to protect Master Ōtsuka's authentic teachings.

---

## How it was built

The handbook was developed iteratively across 64 numbered versions (v7 → v64), pair-programmed between **Pedro Canário** (project owner, AWIKP karateka) and **Claude** (Anthropic), one phase at a time. Each phase landed a concrete chunk — a kata batch, a kumite form, a redesign, a translation pass — and then the version bumped. The full plan and the prompts that drove it live in [`docs/PLAN.md`](docs/PLAN.md) and [`docs/PROMPTS.md`](docs/PROMPTS.md).

### Tech, in one breath

- **Single HTML file** (~10 MB) — no build step, no bundler, no server. Open it in a browser.
- **React 18** via CDN (`esm.sh`), JSX compiled in-browser by Babel Standalone. Chosen so the file stays human-editable forever, with no toolchain rot.
- **All images base64-embedded** as JPEGs inside JS data structures (`KATA_IMAGES`, `KUMITE_FORMS`, `WEAPONS_DATA`, etc.) — the site works fully offline once loaded.
- **Hash-based router** with browser back-button support, swipe-from-edge back gesture, and `popstate` plumbing so every navigation path is reversible.
- **Bilingual at runtime** — a single `LANG` flag toggles between English and Portuguese; every component reads `EX_PT`, `LABELS_PT`, `_PT`-suffixed data when active.
- **Brutalist dark design** — zero border-radius, animated contour-line background, giant AWIKP bird-logo watermark, DM Sans + Space Mono. Mobile-first, 44px minimum touch targets.
- **Hosted on GitHub Pages** straight from `main` — `index.html` at the repo root is the entire deployment.

### How edits actually work

Because the file is enormous and full of base64 blobs, editors never read the full HTML into context. Every change is a targeted, scripted string search/replace against named anchors (e.g. find `const KUMITE_FORMS = ` → splice in new entry → bump version footer). The workflow rules are written down in [`docs/WAY_OF_WORKING.md`](docs/WAY_OF_WORKING.md) and [`CLAUDE.md`](CLAUDE.md).

---

## Repository layout

```
.
├── index.html                 The deliverable. GitHub Pages serves this.
├── CLAUDE.md                  Build instructions for AI-assisted editing
├── README.md                  You are here
├── .gitignore
│
├── data/                      Source-of-truth JSON libraries (embedded into index.html at build time)
│   ├── karate-warmup.json                          RAMP warmup framework
│   ├── kumite-drills-library-bilingual.json        Sport kumite drills (v1)
│   ├── kumite-drills-library-v1.2-bilingual.json   Sport kumite drills (v1.2, 88 drills)
│   ├── sport-kumite-sessions-v2.json               5 sport kumite sessions
│   └── strength-mobility-library-bilingual.json    Strength + mobility libraries
│
├── docs/                      Plans, prompts, blueprints, build tracker
│   ├── PLAN.md                Phase-by-phase build plan with status
│   ├── PROMPTS.md             The prompts used to build each phase
│   ├── WAY_OF_WORKING.md      Workflow rules (cleanup, no-full-reads, etc.)
│   ├── start-here.html        Visual build tracker
│   └── karate-app-blueprint-v3.html
│
├── sources/                   Primary source materials — never modified
│   ├── WIKFhandboek.PDF                              Image source (WIKF Belgium Handbook)
│   ├── WIKFhandboek__1_-english-translation.PDF     Text source
│   ├── WKF_2026_Kumite_Competition_Rules.pdf
│   └── logo_peito_-_pa_ssaro.svg                    AWIKP bird logo
│
├── images/                    Extracted source photos (already embedded as base64 in index.html)
│   ├── kata/                  Pinan + advanced kata diagrams
│   ├── kumite/                Sanbon, Ohyo, Kihon Kumite sequences
│   └── weapons/               Tanto Dori, Idori, Tachi Dori, Nage-Waza
│
└── archive/                   Historical / legacy files
    ├── html-versions/         Old handbook versions v7–v64
    │   └── prototypes/        Earliest concept HTML
    ├── data/                  Old JSON exports and UI concepts
    └── misc/                  Old diagrams, trackers, duplicate assets
```

The active deliverable is `index.html` at the root. Everything else exists either to source content into it (`data/`, `sources/`, `images/`) or to preserve the project's history and reasoning (`docs/`, `archive/`).

---

## Running it locally

There is no build step. Either:

```bash
# Option 1 — open directly
open index.html         # macOS
xdg-open index.html     # Linux
start index.html        # Windows
```

```bash
# Option 2 — serve over HTTP (recommended; some browsers restrict file:// fetches)
python3 -m http.server 8000
# then visit http://localhost:8000
```

That's it. The page loads React + Babel from a CDN on first run, then caches; subsequent loads are offline-capable.

---

## Acknowledgements

This project stands on the work of many. The full credits page is inside the app (`#/credits`), but the heart of it:

**Cornerstones** — *Joaquim Gonçalves · Elisabete Silva · Pedro Roby · Vicente Quintas.*
Stalwarts of what Wado-Ryū is, was, and will continue to be — as a martial art and as a way of creating better human beings.

**Training partners** — *Rodrigo Pereira · Vasco Teixeira · Guilherme Gonçalves · Leonor Gonçalves.*
Karatekas who every day try to improve themselves and their passion for the art. Their passion deeply influenced this project.

**Sport kumite & strength** — *Pedro Gomes*, Performance Coach and founder of **NKS (Núcleo Karate Sangalhos)**, 3rd Dan AWIKP, Grau 1 Treinador de Desporto, Coordinator of the Sunlive Karate Academy, author of *O Treinador de Competição — Desafios e Leis* (FNKP). The sport-kumite drills, session design, and strength & conditioning content are his.

**Content sources**

| Source | Used for |
|---|---|
| **WIKF Belgium Handbook** — Stan Weckx, 2020 | Technique descriptions and most illustrations: kihon, kumite forms, weapons-defence sequences |
| **wadokarate.hu** — Rostas Bros. Pictures | Pinan series and advanced kata photo sequences |
| **Gichin Funakoshi — *Karate-dō Kyōhan*** | Historical illustrations of the nine Nage-Waza, the Lost Throws of Funakoshi |
| **AWIKP** | Association history, syllabus, lineage |
| **WIKF Dan Grade Syllabus** 2024–2026 | Dan-grade examination requirements |
| **WKF Kumite Competition Rules** v2026.01 | Articles 5 + 7–12 summaries, referee gestures and flag signals |
| **Charlie Fairhead** — WIKF European & World Kata Champion | Kata demonstrations |
| **Tatsuo Suzuki Sensei** — *Budo Attitude* DVD | Kumite form and kata demonstrations |
| **Hiroji Fukazawa Sensei** | Jion kata demonstration |

**About AWIKP**
Associação Wado Internacional Karate-do Portugal — founded on **15 February 1996 in Braga** by Sensei Ricardo Sobral, Sensei João Silva, Sensei Pedro Roby, Sensei Vicente Quintas, Sensei Elisabete Silva, Manuel Gonçalves, Eurico Vasques, Maria do Sameiro Nogueira, and Sensei Joaquim Gonçalves. Over thirty years, the association's mission has extended beyond producing karate practitioners — it aims to develop people of character, guided by the values of their Masters: respect, courtesy, honour, humility, self-control, courage, perseverance, and loyalty.

AWIKP operates across three pillars: traditional karate (Wado-Ryū, Shotokan, Gojū-Ryū, Shūkōkai, Shitō-Ryū), competition, and recreational practice. Website: [wadoryu-portugal.com](https://wadoryu-portugal.com).

**Project**
Created and curated by **Pedro Canário**, built collaboratively with **Claude** (Anthropic) across 64 iterative versions.

---

## Use and licence

This handbook is reproduced for **educational, non-commercial use by AWIKP dojo students and the wider Wado-Ryū community**, with thanks to the original authors, photographers, and instructors named above. If you are one of the source rightsholders and would like a credit corrected or content removed, please open an issue.

Contributions, corrections, and translations from fellow karatekas are very welcome.

*Osu.*
