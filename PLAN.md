# Karate Handbook — Build Plan

> **Version mapping note:** Two interludes have shifted phase→version targets. The
> browser back-button fix shipped as v15 (Priority 0, +1), and v19 was spent completing
> the kihon-5 & kihon-10 photo grids found on image-only pages (74,75,81) after 2C/2D
> already shipped (another +1). Done so far: 2B→v16, 2C→v17, 2D→v18, kihon img fix→v19,
> 3A Tanto Dori→v20, 3B Idori+Tachi Dori→v21, 3C Nage-Waza→v22.
> Remaining targets: 4A→v23, 4B→v24, 4C→v25, 5→v26.

## Current State (v57)

> **Latest file:** `karate-handbook-v60.html`. Phase 12 (v58–v60) CSS consolidation + WCAG compliance track complete. Phases 6–9 from earlier roadmap diverged from this restructuring track.

### What's Built
- ✅ 468-exercise library across 12 categories
- ✅ Three-tier home (Main Training / Strength & Mobility / Supporting Exercises)
- ✅ WIKF Wado-Ryu Syllabus (lineage, principles, kihon, kumite forms, kata, grading)
- ✅ Exam Syllabus (8 kyu grades + 5 dan grades with requirements)
- ✅ Kyu exam kihon and renraku waza translated to English
- ✅ Hamburger nav drawer + swipe-back
- ✅ Dark theme design system (DM Sans + Space Mono)
- ✅ Sport Kumite drills (21)
- ✅ Wado-Ryu specific drills (26)
- ✅ Full app architecture with routes for all sections (Phase 0, v9)
- ✅ Kihon Reference with images — 8 sections, 108 techniques, 14 illustrations (Phase 1A, v10)
- ✅ Kata Library — Pinan series with photo sequences (Phase 1B, v11)
- ✅ Kata Library — Advanced kata: Kūshankū, Naihanchi, Seishān, Chintō, Jihon (Phase 1C, v12)
- ✅ Kata Library — Advanced Batch 2: Jitte, Bassai, Niseishi, Rōhai, Wanshū (Phase 1D, v13)
- ✅ Sanbon Kumite — 12 forms with photo sequences + attacker/defender text (Phase 2A, v14)
- ✅ Browser/hardware back-button navigation via History API (Priority 0, v15)
- ✅ Ohyo Kumite — 8 forms with photo sequences + attacker/defender text (Phase 2B, v16)
- ✅ Kihon Kumite 1–10 — attacker/defender text + photo sequences, all 10 forms (Phase 2C/2D, v17/v18; kihon-5 & kihon-10 images added in v19)
- ✅ Tanto Dori 1–10 — desc + attacker/defender text + photo grids; new WEAPONS_IMAGES object + upgraded WeaponDetailView (Phase 3A, v20)
- ✅ Idori 1–5 & Tachi Dori 1–5 — desc + attacker/defender text + photo grids (Phase 3B, v21)
- ✅ Nage-Waza — 9 throws with attacker/defender text + historical Funakoshi illustrations (Phase 3C, v22)
- ✅ History & Lineage — enriched Ōtsuka/Suzuki/WIKF/AWIKP text + Ōtsuka & Suzuki portraits; new HISTORY_IMAGES object (Phase 4A, v23)
- ✅ Principles & Philosophy — filled Kata no Rokugensoku (6) and Kumite no Gogensoku (5) stubs from the English PDF (Phase 4B, v24)
- ✅ Japanese Glossary — searchable, 202 terms across 14 categories; GLOSSARY data + GlossaryView modelled on CategoryView (Phase 4C, v25)
- ✅ Polish — Credits & Acknowledgements page; exam-syllabus cross-links to detail pages; placeholder cleanup; Wado-Ryū macron consistency (Phase 5, v26)
- ✅ Kumite Drills Library — 80 bilingual WKF drills, category/level/format filters, dropdown + multi-column grid (Phase 10, v48 + v52)
- ✅ Sport Kumite page restructured — Kumite Drills Library tile replaces three old drill tiles (Phase 10, v49)
- ✅ Strength Library (39 exercises / 13 patterns), Mobility Library (30 exercises / 10 zones), Warmup Library (RAMP, 30 options) (Phase 10, v50)
- ✅ Strength & Mobility hub page — replaces old Exercise Library; Supporting Exercises section killed (Phase 10, v51)
- ✅ Filter dropdown + responsive multi-column grid across all library pages (Phase 10, v52)

### What's Missing
- ❌ WIKF organisation and Joaquim Gonçalves/AWIKP portraits

### What's Pending (Phase 13)
- 🔲 Replace kumite drills data (80→88 drills) + levels UI for new multi-level drills
- 🔲 Add 5 kumite sessions to Session Library
- 🔲 Homepage restructure: Wado-Ryū Syllabus section (+ Weapons tile), Physical Conditioning section
- 🔲 Homepage hero upgrade (bigger logo, pulsing glow, gradient divider)
- 🔲 Strength & Mobility page hero + 2×2 grid
- 🔲 Sport Kumite page hero + grid

### What's Pending (Phase 7 — deferred)
- 🔲 Brutalist design overhaul (zero radius, 1200px, topo bg, bird watermark, animations)
- 🔲 Site rename to "Wado Ryu Handbook"
- 🔲 AWIKP history/credits updates
- 🔲 WKF Competition Rules section (articles, gesture illustrations, terminology)
- 🔲 Desktop grid layouts for all list views
- 🔲 Exam Syllabus visual overhaul — no source image exists in the PDF (only remaining image gap in the whole app)

---

## Workflow — Claude Code

**Why Claude Code:** The HTML file is too large (10MB+ with base64 images) for claude.ai's context window. Claude Code can write and execute Python scripts that surgically edit the file without loading it all into context.

### ⛔ MANDATORY CONSTRAINTS FOR EVERY PROMPT

1. **Do NOT read the full HTML into your context.** The file is 10MB+. If you try to `cat` it, `view` it, or load it into a variable in your context, you will truncate and corrupt it. You will ONLY interact with this file through a Python script.
2. **Write a single Python script** that uses `open(SRC).read()` into a Python variable (Python can handle 10MB strings — your context window cannot), performs all edits via `.find()`, `.replace()`, slicing, or `re.sub()`, then writes the result to the new filename.
3. **Do NOT use multiple scripts** or split into steps that read/write the file multiple times. One script, one read, all edits in memory, one write.
4. **Do NOT use `cat`, `head`, `tail`, `view`, or `grep` on the HTML** to preview before scripting. The patterns are specified exactly in each prompt.
5. **Do NOT assume structure** — always search for exact strings. If a search target returns 0 hits, print a warning and skip that step. Do not guess or fabricate replacement targets.
6. **Preserve ALL base64 image data** — never match patterns inside `data:image` strings.
7. **After writing the output file**, print a verification report: file size, count of key patterns, and any warnings. If the output file is smaller than 95% of the input file, print an ERROR and exit — something went wrong.
8. **Script must delete itself** when done (`os.remove(__file__)` in a finally block). Delete the old version HTML only after confirming the new file exists and passes the size check.

### Prerequisites
- `poppler-utils` installed (provides `pdftoppm` for PDF rasterization)
- `Pillow` Python library (`pip install Pillow`)
- Working directory containing: `karate-handbook-v{N}.html`, `WIKFhandboek.PDF`, `WIKFhandboek__1_-english-translation.PDF`

### Prompt Pattern
Each phase is one Claude Code prompt producing one Python script:

1. Claude Code reads the prompt (from PROMPTS.md)
2. Claude Code writes a single Python script
3. The script reads the HTML into a Python string, performs all edits, writes the new version
4. The script prints a verification report
5. Pedro tests on S25 Ultra
6. Move to next prompt

### After Each Phase
- Test the new HTML on S25 Ultra
- Copy the new versioned HTML back to the working directory
- Move to the next phase

---

## Files in This Project

| File | Purpose |
|------|---------|
| `karate-handbook-v12.html` | Current working version |
| `WIKFhandboek.PDF` | Original Dutch PDF (221 pages) — **rasterize this for images** |
| `WIKFhandboek__1_-english-translation.PDF` | Machine-translated English text — **use for descriptions** (plain text despite .PDF extension, no images) |
| `PROMPTS.md` | Claude Code prompts for every remaining phase |
| `PLAN.md` | This file |
| `tracker.html` | Interactive build tracker |

---

## Phase Status

### Phase 0 — Architecture ✅ DONE (v9)
Restructured app with all sections and routes. Placeholder pages. Nav drawer.

### Phase 1A — Kihon Reference ✅ DONE (v10)
8 sections, 108 techniques, 14 illustrations from PDF pages 25-34.

### Phase 1B — Kata: Pinan Series ✅ DONE (v11)
Pinan Nidan, Shodan, Sandan, Yondan, Godan. Photo sequences from PDF pages 125-134.

### Phase 1C — Kata: Advanced Batch 1 ✅ DONE (v12)
Kūshankū, Naihanchi, Seishān, Chintō, Jihon. Photo sequences from PDF pages 135-139.

### Phase 1D — Kata: Advanced Batch 2 ✅ DONE (v13)
Jitte (diagram, p140), Bassai (photo + diagram, p141-142), Niseishi (photo, p143), Rōhai (photo, p144), Wanshū (photo, p145).

### Phase 2A — Sanbon Kumite ✅ DONE (v14)
12 forms from PDF pages 48-59: Chudan Uchi/Soto Uke, Maegeri Uke 1-6, Jodan Uke 1-4. Photo sequences + attacker/defender text. Added `KUMITE_IMAGES` object (keyed by item id) and upgraded `KumiteFormDetailView` to render attacker/defender blocks + photo. Images in `Kumite-Images/`.

### Phase 2B — Ohyo Kumite (PDF pages 60-67)
Ohyo Kumite 1-8. Note taisabaki principles.

### Phase 2C — Kihon Kumite 1-5 ✅ DONE (v17, images completed v19)
Forms 1-5. Photo grids: 1-4 on pages 69-72 (above their tables); gohonme (5) has its photo sequence on pages 74-75 (two grids "5" and "5'", image-only pages — page 73 holds only the gohonme table text). The two grids are combined into one stacked image. Taisabaki labels from source: Kaishin (1), Soremi (4), Hikimi (5). Forms 2,3 have no labelled taisabaki.

### Phase 2D — Kihon Kumite 6-10 ✅ DONE (v18, images completed v19)
Forms 6-10. Photo grids: 6-9 on pages 76-79; jipponme (10) has its photo grid on page 81 (image-only page — page 80 holds only the jipponme table text). Taisabaki label from source: Chinshin (8). Forms 6,7,9,10 have no labelled taisabaki.

**Page-map lesson:** the English *text* PDF leaves pages 74, 75, 81 blank, so they looked empty — but the Dutch image PDF has full photo grids there. Always check the image PDF directly for image-only pages, don't infer "text-only" from the translation.

### Phase 3A — Tanto Dori 1-10 ✅ DONE (v20)
22 pages (82-103). Each technique's photo grid is on the ODD page AFTER its table page (pp.83,85,87,89/91,93,95,97,99,101,103). Tanto 4 (yonhonme) has TWO variation grids (pp.89+91) stacked vertically into one image. Created `WEAPONS_IMAGES` object (after `KUMITE_IMAGES`) and upgraded `WeaponDetailView` once to render desc + attacker/defender + photo (mirrors `KumiteFormDetailView`). tanto-dori items now carry desc/attacker/defender. Images in `Weapons-Images/`.

### Phase 3B — Idori 1-5 & Tachi Dori 1-5 ✅ DONE (v21)
Seated defence (Idori, from seiza) and sword defence (Tachi Dori, vs bokken). Each photo grid is on the ODD page AFTER its table page: Idori pp.105,107,109,111,113; Tachi pp.115,117,119,121,123. All single-page grids (no stacking). idori-1..5 and tachi-1..5 items carry desc/attacker/defender; image keys inserted into WEAPONS_IMAGES. Images in `Weapons-Images/`.

### Phase 3C — Nage-Waza ✅ DONE (v22)
The 9 "Lost Throws of Funakoshi" (Byōbu Daoshi, Koma Nage, Kubi Wa, Katawa Guruma, Tsubame Gaeshi, Yari Dama, Tani Otoshi, Ude Wa, Gyaku Tsuchi), pp.165-170. Layout differs from the photo grids: each throw has its own sepia historical illustration strip (from Funakoshi's Karatedo Kyohan) embedded inline with the text — detected as the large high-coverage bands (≥200px) per page (p165→#1, p166→#2/#3, p167→#4, p168→#5/#6, p169→#7/#8, p170→#9). Existing meaning desc kept; attacker/defender added to each nage item. Images in `Weapons-Images/`. All 9 illustrations found.

### Phase 4A — History & Lineage ✅ DONE (v23)
Ōtsuka, Suzuki, WIKF, Gonçalves/AWIKP. Enriched the four C entries from the English PDF (Ōtsuka: Yakusoku Kumite / Wado = way of peace / 1944 Chief Instructor / 1955 first All-Japan championships; Suzuki: Sokuto-Geri reputation, 1963–65 spread to America & Europe, IBA Doctorate). Created `HISTORY_IMAGES` object (keyed otsuka/suzuki) and replaced the placeholder card with a conditional portrait card (no-portrait pages render nothing). Portraits cropped from the Dutch image PDF: Ōtsuka p.16 (left, under "Lang verhaal"), Suzuki p.19 (left). **No portraits exist** for WIKF (organisation) or Gonçalves/AWIKP in pp.16-24 — text-only for those two. Portraits kept in `History-Images/`.

### Phase 4B — Principles & Philosophy ✅ DONE (v24)
Filled the two remaining stubs in PrincipleDetailView's C object: `kata-principles` (Kata no Rokugensoku — Six Principles of Kata, from English PDF p.124) and `kumite-principles` (Kumite no Gogensoku — Five Principles of Kumite, from English PDF p.146; **note: NOT pp.160-164** — those are the 15 Japanese Budo Principles, already in the `budo-principles` entry). The other principle entries (Dojo Kun, Three Principles, San Mi-Ittai, Taisabaki, timing, Shu Ha Ri, budo) were already complete and left untouched. Rokugensoku: 1 Ikita Kata, 2 spirit/conviction, 3 Chikara no Kyojaku, 4 Waza no Kankyu, 5 Kisoku no Donto, 6 Balance. Gogensoku: Ki wa Hayaku, Kokoro wa Shizuka, Mi wa Karuku, Me wa Akirakani, Waza wa Hageshiku. Text-only phase, no images.

### Phase 4C — Japanese Glossary ✅ DONE (v25)
Built `const GLOSSARY=[{cat,terms:[{jp,en}]}]` (202 terms, 14 categories: stances, punches, strikes, kicks, blocks, body/striking surfaces, kumite, training/kata, ranks/titles, zones/directions, commands/etiquette, counting, belt colours, budo/general) and replaced the GlossaryView stub with a searchable view modelled on CategoryView (🔍 toggle, filter input matching both jp & en, scrollable category chips, grouped list). Also removed the now-stale `badge` ("COMING SOON") from the glossary home tile. **Source note:** the English PDF glossary (pp.195-221) extracts as heavily scrambled multi-column tables, and Dutch "trap" (kick) was machine-mistranslated to "staircase"; rather than risk bad auto-paired entries the glossary was hand-curated from terms verified present in the source, with correct technical English. Text-only phase.

### Phase 5 — Polish ✅ DONE (v26)
Text-only phase, no new images. Changes:
- **Credits page** — new `CreditsView` + `credits` route, nav-drawer entry, and home ref-section tile, mirroring the History/Principles/Glossary pattern (accent `#f4a261`). Attributions: WIKF Belgium Handbook (Stan Weckx, 2020) — descriptions & most illustrations; wadokarate.hu / Rostas Bros. Pictures — kata photo sequences; Funakoshi *Karate-dō Kyōhan* — Nage-Waza illustrations; AWIKP — exam/grading syllabus; WIKF Dan Grade Syllabus 2024–2026. Closes with the lineage line (Wicks & Gonçalves as peers).
- **Cross-linking** — `ExamDetailView` now resolves numbered exam items to their detail pages, validated against the real data so no broken links: Tanto/Idori/Tachi Dori → `weaponDetail`; Ohyo & Kihon Kumite → `kumiteFormDetail`; Sanbon (Jodan Uke / Maegeri + number, and Chudan Soto/Uchi Uke) → sanbon forms. Kata linking (pre-existing) retained. Non-numbered items ("Any two", "All 8…", "+ Pinan chosen on day") are intentionally not linked.
- **Placeholder cleanup** — removed the kata "coming in Phase 1D" fallback, the kumite/weapon "Photo sequence coming soon" fallbacks, and the history/principle "Content coming in Phase 4A/4B" fallbacks; replaced with neutral notes. The dormant `PlaceholderBadge` (COMING SOON) component is no longer referenced by any tile.
- **Consistency** — standardised "Wado-Ryu" → "Wado-Ryū" (49 occurrences) for macron consistency.
- **Image-coverage audit** — every technique/detail section is fully illustrated EXCEPT the two History pages (WIKF Organization, Joaquim Gonçalves & AWIKP), which have no portrait in the source PDF.



### Phase 6 — Visual Redesign ✅ DONE
CSS custom properties, dark/light theme toggle, SVG logo integration, homepage redesign, Sport Kumite hub, exam syllabus polish, global polish pass.

### Phase 7 — Design Overhaul + WKF Rules 🔲

#### 7A — Design Foundation + Content Fixes
- Site rename: "Karate Handbook" → "Wado Ryu Handbook"
- Border-radius: 0 everywhere (brutalist rectangular)
- Max content width: 1200px (was 700px)
- Animated topographical contour-line background
- Giant bird logo watermark (right half, 3-4% opacity, fixed)
- Hero logo 50% bigger
- Logo + title = home link (no home emoji)
- ← Back link on every subpage
- Entry animations (fadeSlideUp) + card hover effects
- AWIKP history fixes (WIKF 1989, Suzuki succession, Ōtsuka dates)
- AWIKP founding: 15 Feb 1996 Braga, 9 founders
- Credits: Pedro Gomes, Training Partners, Cornerstones tiles
- Full WIKF Syllabus in NavDrawer + Exam page

#### 7B — Layout Overhaul + Exam Polish
- Desktop grids for ALL list views (2-4 columns, no single-column)
- Exam Syllabus: grid layout, belt progression visualization, not a list
- Collapsible section headers where appropriate

#### 7C — WKF Competition Rules
- Source: WKF_2026_Kumite_Competition_Rules.pdf (Version 2026.01)
- Summarize Articles 5, 7-12 (athlete-friendly, not legalese)
- Extract gesture illustrations from PDF pp.50-55 (~30 figures)
- Appendix 1: referee command terminology
- Appendix 3: weight categories (all age groups)
- Build WkfRulesView, WkfRuleDetailView, WkfGesturesView
- Wire into Sport Kumite hub + NavDrawer
- Credit: "WKF Kumite Competition Rules, Version 2026.01"

#### 7D — Global Polish
- Audits: zero-radius, topo bg, bird watermark, back links, grids, home emoji
- NavDrawer organization
- Typography + spacing consistency
- Footer consistency
- Animation refinement

### AWIKP History Reconciliation (Phase 7A)

| Item | Handbook | AWIKP (source of truth) | Action |
|------|----------|------------------------|--------|
| WIKF founding | 1991 | 1989 | Change to 1989 |
| Ōtsuka dojo | May vary | Opened 1934, named Wado-Ryū 1939 | Verify |
| Suzuki succession | Brief | Modestly refused, proposed Jiro | Enrich |
| AWIKP founding | Incomplete | 15 Feb 1996 Braga, 9 founders | Add |


### Phase 8 — Portuguese Translation (Bilingual) 🔲

Full Portugal Portuguese translation. Toggle via flag icons (🇬🇧/🇵🇹) next to theme toggle.

Approach: parallel `_PT` data constants. Toggle switches which constants the app reads. Original EN data untouched. Japanese terminology universal.

#### 8A — Language Toggle + Design Polish
- PT/EN flag toggle (next to theme toggle), localStorage
- `t()` helper + `UI_STRINGS` for all UI chrome
- Bird background: **full viewport height (100vh)**, right-aligned, massive
- Topo lines: **truly dynamic** (rAF or multi-layer CSS), alive not static

#### 8B — Translate Exercise Library
- `EX_PT` parallel for all 468 exercises across 12 categories
- Category-by-category, Portugal Portuguese, Japanese terms stay

#### 8C — Translate Reference + Knowledge
- PT parallels: KATA, KIHON_SECTIONS, KUMITE_FORMS, WEAPONS_DATA
- PT parallels: HISTORY_PAGES, PRINCIPLES_PAGES, KYU_EXAMS, DAN_EXAMS, GLOSSARY, Credits

#### 8D — Translate Syllabus + WKF Rules + Audit
- `SYL_PT` (full syllabus markdown)
- WKF_RULES, WKF_TERMINOLOGY, WKF_CATEGORIES in Portuguese
- Final bilingual audit: no leaks in either direction

### Phase 9 — Kata Video Embeds ✅ (v41)

#### 9 — Kata + Kumite Video Embeds
- **Kata (primary)**: Charlie Fairhead (@charliefairhead5393) — WIKF European & World Kata Champion
- **Kata (secondary)**: Suzuki Sensei duplicates where available from playlists
- **Kumite forms**: Suzuki Sensei playlists mapped to individual forms:
  - Ohyo Kumite 1-8: `PLZgIWvawAg3ROI8zbZAqaVsZjEnU3bJq_` (individual) + `PLVwhCzVMvTX9nKFEwj5ao4Oi_rMFt_GZg` (DVD)
  - Kihon Kumite: `PLCCc31NptHCW-lXFarFAAObRoC_zY5bfv` (starts #10)
  - Sanbon Kumite: `PL_-bML0UP7MPo-mGacF86uIAHhmtRS_Ja`
  - Mae Geri Kumite: `PL_-bML0UP7MMdhGU8P8o4FFOsFkGwcx8o`
- Responsive lazy-loaded YouTube iframes in KataDetailView + KumiteFormDetailView
- Credit: Fairhead + Suzuki Sensei

### Phase TBD — PWA + Android App 🔲
- manifest.json, service worker, app icons, offline caching
- Host + TWA APK wrapper — deferred

---

## PDF Page Map

**Image source:** Always `WIKFhandboek.PDF` (original Dutch). The English translation is text-only.

| Pages | Content | Images? | Phase |
|-------|---------|---------|-------|
| 1-7 | Cover, TOC | No | — |
| 8-14 | General, dojo, principles | No | 4B |
| 15 | Kanji explanation | Maybe | 4B |
| 16-24 | History (Ōtsuka, Suzuki) | ✅ Done (Ōtsuka p16, Suzuki p19 portraits; no WIKF/AWIKP portraits) | 4A |
| 25-35 | Kihon techniques | ✅ Done | 1A |
| 36-47 | Ippon Uke (KCAR-specific) | Tables | — |
| 48-59 | Sanbon Kumite | Some images | 2A |
| 60-67 | Ohyo Kumite 1-8 | ✅ Photo sequences | 2B |
| 69-81 | Kihon Kumite 1-10 | ✅ Done (5 on pp.74-75, 10 on p.81 — image-only pages) | 2C, 2D |
| 82-103 | Tanto Dori 1-10 | ✅ Done (grids on odd page after each table; 4 spans 89+91) | 3A |
| 104-113 | Idori 1-5 | ✅ Done (grids on odd page after each table) | 3B |
| 114-123 | Tachi Dori 1-5 | ✅ Done (grids on odd page after each table) | 3B |
| 124 | Kata principles (Rokugensoku) | No | ✅ 4B |
| 146 | Kumite principles (Gogensoku) | No | ✅ 4B |
| 125-134 | Pinan kata | ✅ Done | 1B |
| 135-139 | Advanced kata batch 1 | ✅ Done | 1C |
| 140-145 | Advanced kata batch 2 | ✅ Extracted | 1D |
| 146-159 | Exam conditions | No | — |
| 160-164 | Japanese Budo Principles (15) | No | ✅ (budo-principles entry) |
| 165-170 | Nage-Waza | ✅ Done (9 inline illustration strips; multiple throws per page) | 3C |
| 171-194 | 48 Okinawa techniques | Illustrations | — |
| 195-221 | Japanese glossary | No | ✅ 4C (hand-curated, 202 terms) |

---

## Phase 10 — Restructuring + Cleanup + UI Refactor (v48–v57) ✅ COMPLETE

> Completed. Full prompt text lives in `PROMPTS.md` under "Phase 10".

### Source data (must be in working directory)
- `kumite-drills-library-bilingual.json` — 80 drills, 5 categories, 3 levels, 2 formats
- `strength-mobility-library-bilingual.json` — 39 strength exercises (13 patterns) + 30 mobility exercises (10 zones)
- `karate-warmup.json` — RAMP framework, 10 slots, 30 options

### v48 — Kumite Drills Library ✅ DONE
Embedded `KUMITE_DRILLS` JSON. Built `KumiteDrillsLibrary` React component with category/level/format filter pills, expandable drill cards, bilingual (LANG) tags. Route: `kumiteDrills` → `#/sport-kumite/drills`.

### v49 — Sport Kumite Page Restructure ✅ DONE
Removed "Sport Kumite Drills", "Wado-Ryū Drills", "Strength & Flexibility" tiles from SportKumite. Added single "Kumite Drills Library" tile (🥊, #FF1943). Kept Session Library, Referee Signals, WKF Rules.

### v50 — Strength + Mobility + Warmup Libraries ✅ DONE
Embedded `STRENGTH_MOBILITY` and `WARMUP_DATA`. Built `StrengthLibrary` (Level + Pattern filters), `MobilityLibrary` (Level + Zone filters, plus collapsible `injury_hotspots`), `WarmupLibrary` (RAMP phase → slot → option expandable cards, no filters). Routes: `strengthLibrary`, `mobilityLibrary`, `warmupLibrary`. Level colors: Foundation `#2a9d8f`, Performance `#f4a261`, Competition `#ff6b6b`.

### v51 — Home Restructure + Kill Exercise Library ✅ DONE
Built `StrengthMobilityPage` hub (4 tiles → Strength, Mobility, Karate Specific Exercises, Warm-Up). HOME_SECTIONS: `strength` now points to `strengthMobility`; `support` section deleted entirely. Removed old `ExerciseLibrary` component + `CM` constant. Drawer renamed "Exercise Library" → "Strength & Mobility". EX/EX_PT keys "Kihon & Fundamentals", "Keri Waza — Kicks", "Playful Kumite & Games" deleted. PT translations added for new tile labels.

### v52 — Filter Dropdown + Multi-Column Grid ✅ DONE
Replaced always-visible filter pill rows with a single filter button + collapsible dropdown panel (with active-filter count badge and per-pill clear ×). Replaced single-column card list with responsive CSS grid (`auto-fill, minmax(300px, 1fr)`, gap 12px) across `KumiteDrillsLibrary`, `StrengthLibrary`, `MobilityLibrary`, and `WarmupLibrary` (option cards within slots).

### v53 — Code Cleanup + Shared Component Consolidation ✅ DONE (v53)
Deleted dead EX/EX_PT keys (Coordination & Balance, Flexibility & Mobility, Strength & Power, Speed/Agility/Plyometrics, Pillar Prep, Calisthenics — 6 each). Confirmed `CM` and `ExerciseLibrary` already absent (v51 cleanup). Removed unused `TIERS` const. Extracted shared primitives **before** library components: `LibraryGrid`, `LevelBadge`, `MetaBadge`, `FilterPill`, `FilterLabel`, `FilterToggle`, `FilterSummaryPill`, `ClearAllBtn`, `ExpandableCard`, `CardChevron`. Refactored KumiteDrillsLibrary, StrengthLibrary, MobilityLibrary to use them — duplicated `fBtn`/`sumPill`/`labelStyle`/`clearAll`/card-scaffolding consolidated. WarmupLibrary left intact (different padding). Removed 10 orphaned `LABELS_PT` translation keys. Drawer simplified to 5 items: Home, Sport Kumite, Strength & Mobility, WIKF Syllabus, Exam Syllabus. Routes verified clean. Verified live: all four library pages render and expand correctly.

### v54 — Responsive Breakpoints + Elevated Component Design ✅ DONE (v54)
v54 delivered responsive breakpoints + elevated design on ExpandableCard/filter panels only (6 of 59 surfaces). 53 other surfaces untouched. Fixed in v56.
**Part A — Responsive foundation:**
- Kill 700px max-width. Introduce `.responsive-container` CSS class with breakpoints at 480/768/1024px (mobile 95% / small 92% / tablet 90% max-960px / desktop 88% max-1400px).
- Home tiles: 2-col at 600px+, 3-col at 1024px+.
- Library grids: `auto-fill, minmax(340px, 1fr)`.
- Prose pages: `max-width: 800px` for reading width.

**Part B — Elevated design:**
- Replace flat `#131316` backgrounds with `linear-gradient(170deg, #151518, #111114)` + box shadow.
- **Remove all `borderLeft: "3px/4px solid"` accent lines** — replaced by accent-coloured icon containers (40×40, gradient bg).
- Badges → filled (`{color}15` bg, `{color}` text, no border, weight 600).
- Tags → quieter (`rgba(255,255,255,0.03)`, small, dim).
- Typography: page titles gradient-text (DM Sans 800, -0.02em), section-label breadcrumbs (Space Mono uppercase, 0.15em tracking), card titles weight 700.
- Micro-animations: `transition: all 0.15s ease` on all interactive elements; chevron rotation 0.2s; expanded content 0.25s max-height transition.
- Topo background: animation-duration 18s; background-size 250px.
- Section dividers: `linear-gradient(90deg, transparent, #2a2a32, transparent)` 1px.

**Part C — Home hero:**
- Gradient-text "KARATE HANDBOOK" title; radial-glow behind logo; subtitle in section-label style.

### v55 — Final Cleanup + Polish Pass ✅ DONE (v55)
- **Visual consistency audit** (zero `border-left`, zero flat `#131316`, zero `max-width: 700`, zero bordered+transparent badges, zero `Inter`/`Roboto`/`Arial` fonts, all interactive elements have `transition`).
- **Dead code removal** (unused components, top-level `const`s, orphaned translation keys, commented-out blocks >3 lines).
- **Mobile touch-target audit** (min 44px height, ≥8px padding, ≥0.7rem font on tappables).
- **i18n verification** — every `KUMITE_DRILLS` / `STRENGTH_MOBILITY` / `WARMUP_DATA` field accessed as `field[LANG]`; add PT translations for "Filters", "Clear all", "No drills match", "Key Points", "Common Error", "Variations", "Equipment", "Duration", "Foundation", "Performance", "Competition", "Solo Drill", "Partnered Drill", "All", "drills", "exercises", "patterns", "zones", "levels", "phases", "slots", "options".
- **Performance check** — file size, base64 image count, virtualization flag if >200 items, top-5 largest `const`s.
- **Footer** → `Karate Handbook v55 · AWIKP · Built with 🥋` (EN + PT).

### v56 — Design System Normalization + Icon System ✅ DONE (v56)

Full design audit found: 518 inline style objects, 35 font sizes, 53 padding values, 28 text colors (mixed vars/hex), 53 flat card surfaces. Created design token system + Material Icons.

### v57 — Partial cleanup ✅ DONE (v57)

Incremental fixes from v56. Homepage tile styling in progress but inconsistencies remain across all subpages.

---

## Phase 12 — CSS Consolidation + Visual Unification (v58–v60)

> Complete. Current file: `karate-handbook-v60.html`. Full prompt text lives in `PROMPTS.md` under "Phase 12".
> 
> **⛔ Before running any prompt: re-read the MANDATORY CONSTRAINTS in the Workflow section above. One script, one read, one write. No `cat`/`view`/`grep` on the HTML. No reading the file into context. Every prompt in PROMPTS.md repeats these constraints — follow them.**

### The Problem (v57 audit)

| Issue | Count | Detail |
|-------|-------|--------|
| Inline `style={{}}` objects | **510** | Massive duplication across every component |
| CSS class definitions | **65** | Most defined but unused (`.card` class = 0 usage) |
| Identical card style blob copy-pasted | **45** | Same 200-char inline string everywhere |
| `borderRadius:14` scattered | **83** | Should be one CSS class |
| Gradient background string duplicated | **59** | `linear-gradient(160deg, rgba(255,25,67,0.03)...)` |
| Font rendering issues | Multiple | Arial still renders in some places, DM Sans/Space Mono not enforced |

**Tile/card component taxonomy (should be 5 things):**
1. **NavTile** — tappable, navigates. Icon + title + desc. Gradient bg, optional topo overlay.
2. **ContentCard** — static container. Desc text, attacker/defender, photos, videos.
3. **ExpandableCard** — tappable header toggles body. Drills, sessions, accordions.
4. **Badge** — small inline label (LevelBadge, MetaBadge).
5. **FilterPill** — toggle button in filter panels.

**Tile gradient system (Phase 12B):**
- Gradient direction: top-left to bottom-right diagonal (NOT top-right radial)
- Main dual-color gradients: red↔aqua, red↔gold, aqua↔gold (6 combos with reverse)
- Secondary single-color gradients: red, aqua, gold
- Exam tiles: gradient tones of the belt color (e.g. yellow tile = light gold → deep amber)
- All gradients must pass WCAG 2.2 AA contrast in dark AND light mode
- Light mode may need adjusted gradient colors (not just opacity changes)
- Icons: larger than current (≥24px in tiles, ≥20px in lists), NOT same color as tile text

### v58 — CSS Class System + Inline Style Purge ✅ DONE

Scorched-earth on inline styles. Unified CSS classes (`.nav-tile`, `.content-card`, `.expand-card`, `.badge-level`, `.badge-meta`, `.filter-pill`). Font rendering audit — killed all Arial/system-only stacks.

### v59 — Component Unification + Gradient Application ✅ DONE

Merged `SectionTile`/`HomeTile` → single `NavTile`. Applied gradient combos across the app. Belt-color gradients on exam tiles. Icon sizing increase. Grid layouts.

### v60 — WCAG Audit + Light Mode + Final Polish ✅ DONE

WCAG 2.2 AA contrast audit on all text/bg pairs (dark + light mode). Fixes applied:
- Dark `--text-dim`: #4a4f54 → #5e6368 (2.24:1 → 3.06:1)
- Dark `--text-ghost`: #363b40 → #5a5f64 (1.72:1 → 3.02:1)
- Light `--text-dim`: #b0aba5 → #928d87 (2.18:1 → 3.15:1)
- All accent colors pass 3:1+ on faint backgrounds (badge contexts)
- Inline hex cleanup: zero hardcoded hex in inline styles (was 50+)
- Added CSS variables: `--belt-red`, `--belt-blue`, `--belt-brown`, `--code-bg`, `--neutral-gray`
- Replaced 26 ternary hex values with CSS variable references
- Removed 13x redundant inline boxShadow, 12x inline transition
- Zero Arial/Helvetica. DM Sans + Space Mono enforced everywhere
- Form element font reset verified
- Zero orphaned inline patterns (bg-card, borderLeft, HomeTile, SectionTile)
- Touch targets: .nav-tile padding 1.25rem, .content-card padding 1rem

---

## Phase 13 — Content + Layout Refresh (v61–v64)

> Starts from `karate-handbook-v60.html`. Full prompt text lives in `PROMPTS.md` under "Phase 13".
>
> **⛔ Before running any prompt: re-read the MANDATORY CONSTRAINTS in the Workflow section above. One script, one read, one write. No `cat`/`view`/`grep` on the HTML. No reading the file into context. Every prompt in PROMPTS.md repeats these constraints — follow them.**

### Source data (must be in working directory)
- `kumite-drills-library-v1_2-bilingual.json` — 88 drills (replaces existing 80), 5 categories, 3 levels, 2 formats. 8 new drills use `levels` array instead of `variations` string.
- `sport-kumite-sessions-v2.json` — 5 sessions (EN + PT), each with blocks/slots referencing drills by ref ID. Replaces any existing session data.

### v61 — Replace Kumite Drills Data + Levels UI
Replace entire `KUMITE_DRILLS` const + `categories` data with new v1.2 dataset (88 drills, up from 80). 8 new drills have a `levels` array (progressive difficulty tiers) instead of the legacy `variations` string. Update the drill card expanded view to render levels as a numbered progression when present, falling back to the existing variations paragraph for legacy drills. Update any hardcoded drill count labels.

### v62 — Sessions Data + Session Library Page
Add/replace `KUMITE_SESSIONS` const from `sport-kumite-sessions-v2.json` (5 sessions, EN + PT). Build or update `SessionLibraryView` to render sessions as expandable cards: collapsed shows title + param pills (level, duration, type, focus); expanded shows a timeline of blocks (slot label, time range, drill list with coaching notes and relative intensity). Each drill in a block shows name, duration, notes, RI tag. Wire route from Sport Kumite hub "Session Library" tile.

### v63 — Homepage Restructure + Hero Upgrade
Homepage section changes:
- Rename technique section label → "WADO-RYŪ SYLLABUS" (EN) / "SYLLABUS WADO-RYŪ" (PT)
- Move Weapons & Defence tile into that section (after Kumite Forms)
- Create new section "PHYSICAL CONDITIONING" (EN) / "CONDICIONAMENTO FÍSICO" (PT) below Sport Kumite
- Move Strength & Mobility tile into that section

Homepage hero upgrade:
- Logo: 80–96px (up from ~48–60px)
- Title: clamp(2.5rem, 5vw, 3.5rem), weight 800
- Subtitle: DM Sans (not Space Mono), slightly larger, readable tagline
- CSS pulsing glow animation on the red circle (2s ease-in-out, opacity 0.3→0.6)
- More vertical padding (5rem top, 4rem bottom)
- Gradient divider line below hero: `linear-gradient(90deg, transparent, var(--accent-red), transparent)`, 1px height

### v64 — Subpage Heroes + Grid Fixes
Strength & Mobility page:
- Hero section: page title + 2–3 line subtitle (injury prevention, athletic capacity, performance) + stat summary line (e.g. "69 exercises · 23 patterns · 10 body zones · 3 levels") + gradient divider
- 2×2 tile grid (Strength, Mobility, Karate Specific, Warm-Up) replacing current 3+1 layout

Sport Kumite page:
- Same hero treatment: title + subtitle (competition training focus) + stat summary + gradient divider
- Balanced tile grid below
