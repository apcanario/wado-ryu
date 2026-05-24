# PROMPTS.md — Phase 7

> Phases 0–6 DONE. Phase 7 starts from the latest version after Phase 6.

---

## PROMPT 7A — Design Foundation + Content Fixes

Working directory contains: latest karate-handbook HTML, logo_peito_-_pa_ssaro.svg.

Write and run a Python script that surgically edits the HTML:

### 1. SITE RENAME
Replace ALL "Karate Handbook" with "Wado Ryu Handbook" — title, TopBar, footers, NavDrawer. Count first, assert, replace.

### 2. BORDER RADIUS ZERO
Find-replace ALL borderRadius / border-radius values (12px, 14px, 8px, 6px, 50%, etc.) with 0. Cards, buttons, inputs, tags, avatars, pills — everything rectangular. No exceptions. This is a brutalist geometric design choice.

### 3. MAX WIDTH 1200px
Replace maxWidth:700 (or similar narrow caps) with 1200. Desktop uses the space with grids.

### 4. ANIMATED TOPO BACKGROUND
Add a `position:fixed; z-index:0` SVG/CSS layer behind all content. Thin contour lines like a topographical map, opacity 0.03–0.05, animated with CSS `@keyframes` (slow drift/rotation, 60s+ cycle). Dots at line intersections. Organic curves, not geometric grids. Works in both dark and light themes (adjust line color per theme). `will-change:transform` for GPU. Simpler on mobile via `@media (max-width:768px)`.

### 5. GIANT BIRD LOGO BACKGROUND
Embed the bird SVG as a HUGE background element — only the right half visible, positioned on the right edge of the page, at 3–4% opacity. Fixed position. Creates a dramatic watermark effect. Scales with viewport. Theme-aware fill (light lines on dark bg, dark lines on light bg).

### 6. SVG LOGO + NAVBAR
Embed `logo_peito_-_pa_ssaro.svg` as inline React component. Bird body `fill:var(--logo-body)`, red circle always `#FF1943`.
- **TopBar**: Logo (~28px) + "WADO RYU HANDBOOK" = **clickable home link** (left). Theme toggle ☀️/🌙 + ☰ hamburger (right). **Remove 🏠 home emoji entirely.**
- **Hero header on homepage**: Logo at **50% larger than current** (if current is ~48px, make it ~72px or bigger). Prominent, commanding.

### 7. BACK LINK ON EVERY SUBPAGE
In `PageShell` (or equivalent subpage wrapper), add `← Back` text link below the title/subtitle. Accent-colored text, not a button. Calls in-app back function. Shows on all subpages, not on home.

### 8. ENTRY ANIMATIONS
Add `@keyframes fadeSlideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }` — 200ms ease-out. Apply to page content on route change. Staggered card reveals with incremental `animation-delay`.

### 9. CARD HOVER
`transform:translateY(-2px)` + `border-color:var(--border-active)`, 150ms transition. No scale — translate only (cleaner with zero radius).

### 10. FULL WIKF SYLLABUS ACCESS
- NavDrawer: add "Full WIKF Syllabus" under Reference section → existing `syllabus` route.
- ExamListView: add "View Complete WIKF Syllabus" link (top or bottom) → `syllabus` route.

### 11. HISTORY FIXES (AWIKP = source of truth)
- WIKF founding: 1991 → **1989**
- Verify Suzuki succession narrative (modestly refused, proposed Jiro Ōtsuka)
- Verify Ōtsuka dates (dojo opened 1934, named Wado-Ryū 1939)

### 12. CREDITS UPDATE (CreditsView)
Update/add these tiles:

**AWIKP tile** (update existing): "AWIKP — Associação Wado Internacional Karate-do Portugal. Founded on 15 February 1996 in Braga, AWIKP was established through the vision and drive of nine founders: Sensei Ricardo Sobral, Sensei João Silva, Sensei Pedro Roby, Sensei Vicente Quintas, Sensei Elisabete Silva, Manuel Gonçalves, Eurico Vasques, Maria do Sameiro Nogueira, and Sensei Joaquim Gonçalves. Over thirty years, the association's mission has extended beyond producing karate practitioners — it aims to develop people of character, guided by the values of their Masters: respect, courtesy, honour, humility, self-control, courage, perseverance, and loyalty. These principles apply inside and outside the dojo equally. AWIKP operates across three pillars: traditional karate (Wado-Ryū, Shotokan, Gojū-Ryū, Shūkōkai, and Shitō-Ryū), competition, and recreational practice. Its instructors — described by the association as the true guardians of AWIKP — have placed it at the forefront of Portuguese and international karate."

**Pedro Gomes tile** (new): "Pedro Gomes — Performance Coach, NKS (Núcleo Karate Sangalhos). Sport kumite drills, session design, strength & conditioning content. 3rd Dan AWIKP. Coach/Founder NKS, competition coaching (National Champion-level athletes), youth training specialist, Coordinator Sunlive Karate Academy, Grau 1 Treinador de Desporto (Karate), 'O Treinador de Competição — Desafios e Leis' (FNKP)."

**Training Partners tile** (new): "Rodrigo Pereira, Vasco Teixeira, Guilherme Gonçalves, Leonor Gonçalves — Training Partners, Friends, and karatekas who everyday try to improve themselves and their passion for the art in its different forms. Their passion deeply influenced the creation of this project."

**Cornerstones tile** (new): "Joaquim Gonçalves, Elisabete Silva, Pedro Roby, Vicente Quintas — Cornerstones, stalwarts of what Wado Ryu is, was and will continue to be as martial art and as a way of creating better human beings."

### 13. Bump version.

Do NOT read the full HTML into context. Surgically edit.

---

## PROMPT 7B — Layout Overhaul + Exam Polish

Working directory contains: latest karate-handbook HTML.

Write and run a Python script:

### 1. DESKTOP GRIDS FOR ALL LIST VIEWS
Update these views to use responsive CSS grid on desktop (>768px). 2–4 columns. No single-column lists on desktop. Use the 1200px width. Single column on mobile. All cards rectangular (radius 0).

Views to update:
- **CategoryView** — exercise cards in 2-3 col grid
- **WeaponsView** — technique cards in 2 col grid (with collapsible section headers)
- **KihonView** — section cards in 2-3 col grid
- **KumiteFormsView** — form cards in 2 col grid
- **KataListView** — kata cards in 2-3 col grid
- **GlossaryView** — term groups in 2-3 col grid
- **ExamListView** — grade cards in 2-3 col grid (see below)

### 2. EXAM SYLLABUS VISUAL OVERHAUL
ExamListView is NOT just a list anymore:
- **Hero**: "Exam Syllabus" title, subtitle, ← Back link.
- **Belt journey**: Desktop: horizontal progression bar (colored segments from white to black). Mobile: vertical timeline with colored rectangular blocks connected by thin line.
- **Grade cards in grid**: 2-3 columns on desktop. Each card: bold belt-color top bar (full-width, 6px), grade name, belt color name, time requirement, key requirements summary. Rectangular.
- **Kyu grades**: 7th (yellow) through 1st (brown). Staggered fadeSlideUp animation.
- **Dan grades**: Separate section, elevated styling, theme-aware.
- **Full Syllabus link**: Prominent tile → existing `syllabus` route.

### 3. Bump version.

Do NOT read the full HTML into context. Surgically edit.

---

## PROMPT 7C — WKF Competition Rules

Working directory contains: latest karate-handbook HTML, WKF_2026_Kumite_Competition_Rules.pdf.

Write and run a Python script:

### 1. EXTRACT GESTURE ILLUSTRATIONS
Rasterize WKF PDF pages 50–55 using PyMuPDF at 200 DPI. Crop individual referee gesture figures. These are line drawings for: SHOBU HAJIME, MOTO NO ICHI, YAME, YUKO, WAZA ARI, IPPON, SENSHU, TORIMASEN, TSUZUKETE, WAKARETE, PASSIVITY, HARD CONTACT, THROWS, EXAGGERATING INJURY, FEIGNING INJURY, JOGAI, MUBOBI, AVOIDING COMBAT, PUSHING, GRABBING, CHUI 1-3, HANSOKU CHUI, FUKUSHIN SHUGO, KIKEN, HANTEI, HANSOKU, SHIKKAKU, HIKIWAKE, KACHI, VIDEO REVIEW, MIENAI, flag signals (SITTING, YUKO, WAZA ARI, IPPON). Save to WKF-Images/, max 400px wide, JPEG quality 72.

### 2. SUMMARIZE RULES ARTICLES
Create digestible, athlete-friendly summaries as JS data objects:

**Article 5 — Duration of Bout**: Senior/U21 3min, Cadet/Junior 2min, U14 1.5min. Time starts on HAJIME, stops on YAME. 15-second warning buzzer. Rest between bouts = bout duration (5min if changing belt color).

**Article 7 — Starting, Suspending & Ending**: SHOBU HAJIME starts bout. YAME stops. Score announcement procedure. 8-point lead = bout over. Time-up = highest points wins. Tied = HANTEI (panel vote, Referee breaks tie). All 14 reasons Referee calls YAME (opponent out of area, adjust equipment, contravention, injury, seize without technique, fall without follow-up, clinch, chest-to-chest, wrestling, two+ judges signal score, foul, KANSA request, Coach video review, any other reason).

**Article 8 — Scoring**: YUKO (1pt) = TSUKI (punch) or UCHI (strike). WAZA-ARI (2pt) = chudan kick. IPPON (3pt) = jodan kick or technique on downed opponent (except HIZA GAMAE). Six scoring criteria: good form, sporting attitude, vigorous application, awareness, timing, correct distance. Contact rules: JODAN skin touch only — 5cm kicks / 2cm hands seniors, 10cm / 5cm cadets. CHUDAN controlled impact allowed. Invalid if: after YAME, after WAKARETE, outside area, followed by foul, turns back, executed after own violation.

**Article 9 — Prohibited Behaviour**: All 17 items: excessive contact, attacks to limbs/groin/joints, open-hand face attacks, techniques after WAKARETE, dangerous throws, feigning injury, JOGAI, MUBOBI, avoiding combat, passivity, clinching/wrestling/pushing, two-hand grabbing (except catching kick), one-hand grab without immediate technique, uncontrolled attacks, head/knee/elbow attacks, kicking downed opponent, talking/goading/discourtesy.

**Article 10 — Warnings & Penalties**: Informal: TSUZUKETE (encourage activity), WAKARETE (break clinch). Official: CHUI (warning, up to 3). HANSOKU CHUI (disqualification warning). HANSOKU (bout disqualification). SHIKKAKU (tournament disqualification). Throwing rules: pivot below hip, hold throughout, no over-shoulder, no sacrifice throws. Grabbing: one hand only for throw/technique, two hands only to catch kicking leg. MUBOBI: self-endangerment. Passivity: not in first/last 15sec. Avoiding combat in last 15sec = minimum HANSOKU CHUI + lose SENSHU.

**Article 11 — Injuries**: Referee calls doctor immediately. 3-minute treatment time. 10-second rule: athlete flat on floor, doesn't regain feet in 10 seconds = withdrawn from ALL kumite in tournament. Doctor authorizes continuation. Win by injury disqualification: can continue with doctor permission, withdrawn after second such win.

**Article 12 — Criteria for Decision**: Win by: 8-point lead, most points at time-up, SENSHU (first unopposed score), HANTEI vote. Tied resolution: most IPPON → most WAZA-ARI → HANTEI. SENSHU forfeited if avoiding combat in last 15sec. Round-robin: 3pts win, 1pt scoring draw. Tiebreaker cascade (9 criteria). Team: most bout wins → most points → extra bout.

**Appendix 1 — Terminology**: All referee commands table with descriptions.

**Appendix 3 — Categories & Weight Divisions**: Full table (Senior, U21, Junior, Cadet, U14 — male and female with all weight classes).

### 3. BUILD DATA + VIEWS
- `const WKF_RULES = [...]` — each article as `{id, title, sections:[{heading, text}]}`
- `const WKF_TERMINOLOGY = [...]` — referee commands
- `const WKF_CATEGORIES = [...]` — weight divisions
- `const WKF_IMAGES = {...}` — gesture illustrations (base64)
- `WkfRulesView` — list of rule article cards
- `WkfRuleDetailView` — individual article with sections
- `WkfGesturesView` — gesture illustrations in responsive grid (3-4 col desktop, 2 col mobile) with labels
- Routes: `wkfRules`, `wkfRuleDetail`, `wkfGestures`

### 4. WIRE UP
- Sport Kumite hub: "WKF Rules" tile → `wkfRules`
- Sport Kumite hub: "Referee Signals" tile → `wkfGestures`
- NavDrawer: "WKF Competition Rules" under Competition section
- Cross-link WKF terminology with Japanese Glossary where terms overlap
- Credit: "WKF Kumite Competition Rules, Version 2026.01, World Karate Federation"

### 5. BASE64 ENCODE
Encode all WKF-Images/*.jpg into WKF_IMAGES. Delete source JPEGs after encoding.

### 6. Bump version.

Do NOT read the full HTML into context. Surgically edit.

---

## PROMPT 7D — Global Polish

Working directory contains: latest karate-handbook HTML.

Write and run a Python script for final Phase 7 polish:

### AUDITS
1. **Zero border-radius audit** — grep for ALL remaining borderRadius/border-radius > 0. Replace with 0. Includes: card radius, button radius, input radius, tag/pill radius, avatar circles (squares now), progress bars.
2. **Topo background audit** — verify animated contour lines render in both themes, don't impair readability, perform on mobile.
3. **Giant bird logo audit** — verify the half-bird watermark on the right side renders correctly, correct opacity, theme-aware.
4. **Back link audit** — verify every subpage has `← Back` below title. Not on homepage.
5. **Desktop grid audit** — verify ALL list views use 2-4 column grids on desktop. No single-column lists: Weapons, Kihon, Kata, Kumite Forms, Categories, Glossary, Exam Syllabus, WKF Rules.
6. **Home emoji audit** — verify 🏠 is completely gone. Logo+title is the only home link.

### POLISH
7. **NavDrawer** — frosted glass. Organized: Reference (Exam Syllabus, Full WIKF Syllabus, History, Principles, Glossary, Credits), Technique (Kihon, Kata, Kumite Forms, Weapons), Competition (Sport Kumite, WKF Rules), Supporting (exercise categories). Search at top.
8. **Typography** — all headings DM Sans 700, all mono labels Space Mono. No orphaned font stacks.
9. **Spacing** — mobile: 1rem padding, 0.5rem gaps. Desktop: 2rem padding, 0.75rem gaps.
10. **Footer** — consistent everywhere. Version, "AWIKP · Wado-Ryū · WIKF", year.
11. **Animation refinement** — verify fadeSlideUp on route changes, staggered card reveals, hover effects working cleanly.

### 12. Bump to final Phase 7 version.

Do NOT read the full HTML into context. Surgically edit.



---

## PROMPT 8A — Language Toggle + Translation Framework

Working directory contains: latest karate-handbook HTML.

Write and run a Python script:

### 1. LANGUAGE TOGGLE
Add a PT/EN toggle next to the theme toggle in TopBar. Use flag emojis or small flag icons (🇬🇧/🇵🇹). Store preference in `localStorage`. Default: EN.

### 2. FRAMEWORK
Add a global `LANG` variable ("en" or "pt"). Create a `t(key)` helper that looks up the current language. All UI chrome (labels, titles, buttons, section names) goes through `t()`.

For content data (EX, KATA, KUMITE_FORMS, etc.): create parallel `_PT` constants. When LANG=pt, the app reads from the PT version. When LANG=en, it reads from the original. This keeps the original data untouched.

### 3. UI STRINGS
Create `const UI = { en: {...}, pt: {...} }` for all interface text: nav labels, section titles, filter labels, button text, footer, "Back", "Search", etc. Portugal Portuguese throughout. Japanese terms stay as-is.

### 4. DESIGN REFINEMENTS
- **Bird background**: full viewport height. The SVG bird occupies 100vh, right-aligned, only right portion visible, 3-4% opacity, fixed position. Not cropped small — it should feel massive and immersive.
- **Topo lines**: make them truly dynamic and moving. Not a static SVG that drifts — use lightweight JS (requestAnimationFrame or CSS with multiple animated layers at different speeds) to create living, breathing contour lines. Parallax-like depth. Still subtle (0.03-0.05 opacity) but alive.

### 5. Bump version.

---

## PROMPT 8B — Translate Exercise Library (468 exercises)

Working directory contains: latest karate-handbook HTML.

Write and run a Python script:

### 1. TRANSLATE BY CATEGORY
For each of the 12 exercise categories in `EX`, create a parallel `EX_PT` object with all exercise descriptions translated to Portugal Portuguese.

Work category by category (targeted read of each category's array, translate, write PT version):
1. Coordination & Balance (56)
2. Flexibility & Mobility (55)
3. Speed, Agility & Plyometrics (56)
4. Pillar Prep & Activation (26)
5. Calisthenics & Bodyweight (48)
6. Strength & Power (80)
7. Kihon & Fundamentals (37)
8. Keri Waza — Kicks (22)
9. Playful Kumite & Games (22)
10. Programmes & Assessment (19)
11. Sport Kumite (21)
12. Wado-Ryu Drills (26)

Rules:
- Japanese technique names untouched (mae geri, mawashi geri, gyaku-tsuki, etc.)
- Portugal Portuguese (treino not treinamento, exercício not exercicio)
- Coaching language natural, not literal translation
- Same technical precision as English

### 2. WIRE
Update CategoryView / exercise rendering to read from `EX_PT` when `LANG === "pt"`.

### 3. Bump version.

---

## PROMPT 8C — Translate Reference + Knowledge Content

Working directory contains: latest karate-handbook HTML.

Write and run a Python script:

### 1. REFERENCE CONTENT — create PT parallels:
- `KATA_PT` — 15 kata descriptions
- `KIHON_SECTIONS_PT` — section names and descriptions
- `KUMITE_FORMS_PT` — desc/attacker/defender for sanbon (12), ohyo (8), kihon kumite (10)
- `WEAPONS_DATA_PT` — desc/attacker/defender for tanto dori (10), idori (5), tachi dori (5), nage-waza (9)

### 2. KNOWLEDGE CONTENT — create PT parallels:
- `HISTORY_PAGES_PT` — Ōtsuka, Suzuki, WIKF, AWIKP content
- `PRINCIPLES_PAGES_PT` — Dojo Kun, principles, etc.
- `KYU_EXAMS_PT` / `DAN_EXAMS_PT` — exam requirements
- `GLOSSARY_PT` — Portuguese definitions (Japanese + Portuguese instead of Japanese + English)
- Credits tile text

### 3. WIRE all detail views to switch based on LANG.

### 4. Bump version.

---

## ⚠️ BEFORE 8D — State of the App After 8C (read this first)

Phase 8C and a follow-up polish pass changed the translation framework and the home/nav. The current deliverable is **`karate-handbook-v38.html`** (v37 is gone). 8D MUST follow the patterns below or it will silently break the app.

**Translation framework (what already exists):**
- `LANG` global ("en" | "pt"), `t(key)` → keyed `UI` dictionary (8A) for generic chrome.
- `tL(englishString)` → `LABELS_PT` map (8C) for nav/tile/category **labels**, keyed by the English string itself (no invented keys). Category names double as `EX` lookup keys, so `tL()` only translates the *display* — never change the key.
- **Default language is now `pt`** (the `LANG` initializer falls back to `'pt'`, not `'en'`). A stored `localStorage['wrh-lang']` still wins.
- The language toggle shows **text "EN" / "PT"** (no flag emojis).
- Data pattern: `_PT` parallel constant inserted immediately after the original, read via `(LANG==='pt'&&typeof X_PT!=='undefined'?X_PT:X)`. Original EN data is never mutated.

**`_PT` parallels that ALREADY EXIST (do not recreate):** `EX_PT` (8B); `KIHON_SECTIONS_PT`, `KUMITE_FORMS_PT`, `WEAPONS_DATA_PT`, `HISTORY_PAGES_PT`, `PRINCIPLES_PAGES_PT`, `EXAMS_PT`, `GLOSSARY_PT`, and the injected globals `HISTORY_C_PT`, `PRINCIPLES_C_PT`, `CREDITS_C_PT` (8C).
**Still NOT translated → 8D's job:** `SYL` (syllabus markdown → `SYL_PT`), `WKF_RULES`, `WKF_TERMINOLOGY`, `WKF_CATEGORIES`.

**CRITICAL gotchas (each one already bit us once):**
1. **`useMemo` must include `LANG` in its dependency array** whenever it derives language-dependent data. We had a bug where list views (Glossary/Category/Search) cached EN content and the in-app toggle changed only titles, not content. Any WKF view 8D adds that memoizes `WKF_RULES`/categories/filtered lists MUST list `LANG` in deps.
2. **Don't add a wrapping `)` when converting an inline `const C={...}` to a ternary.** `const C=(cond)?X_PT:{...};` is already balanced — an extra `)` is a syntax error that blanks the whole app.
3. **In-browser Babel fails silently.** A JSX/JS syntax error leaves `#root` empty with **no console error**. After editing, verify by running `Babel.transform(<the text/babel script text>, {presets:['react']})` in a try/catch — that surfaces the real line/column. The 10 MB file also takes a few seconds to mount.
4. **Never translate structural/lookup fields.** Keep `id`, `grade`, group keys, `series`, `num`, `color`, `icon`, category names, and any field used in `.find()`/`.includes()`/`groupKey` identical across EN and PT. For `WKF_RULES` translate `title` + `sections[].heading`/`.text` but keep `id`; for `WKF_TERMINOLOGY` translate descriptions but keep the romaji commands; for `WKF_CATEGORIES` check whether a label is also used as a key before translating it.

**Known intentional English remnants (for the bilingual audit — these are pending chrome, not "leaks" to chase unless you choose to finish them):**
- The "All" filter chip in Glossary/Category views.
- Category *descriptions* in the Library view (`getCatMeta` descs) — names are translated, descs are not.
- The entire **Sport Kumite** content block (`SK_DRILLS`, `SK_SESSIONS`, `SK_RI`, etc.) is untranslated and is **not in any phase's current scope** — flag it to Pedro rather than silently absorbing it into 8D.
- A pre-existing JSX-text rendering quirk where a few literal `ū` / `›` escapes show as raw text (e.g. the Kihon intro paragraph). Pre-existing, unrelated to translation — leave unless asked.

**Verification:** serve with `py -m http.server` + the preview tools; default load should be PT with the toggle reading "PT"; toggling must switch **content** (not just titles) live in both directions; confirm `Babel.transform` is clean.

**Version:** current footer says "Wado Ryu Handbook v38 — May 2026" in several places; 8D bumps **v38 → v39** (replace all occurrences) and deletes v38 after v39 is confirmed.

---

## PROMPT 8D — Translate Syllabus + WKF Rules + Final Audit

Working directory contains: latest karate-handbook HTML.

Write and run a Python script:

### 1. WIKF SYLLABUS
Create `const SYL_PT` — full Portugal Portuguese translation of the WIKF syllabus markdown. Largest text block. Preserve Japanese terms, lineage names, technical vocabulary.

### 2. WKF RULES
Create PT versions of `WKF_RULES` article summaries, `WKF_TERMINOLOGY` descriptions, `WKF_CATEGORIES` labels.

### 3. BILINGUAL AUDIT
- Toggle to PT: verify every view renders Portuguese, no English leaking through
- Toggle to EN: verify everything still works, no Portuguese appearing
- Check all data structures have PT parallels
- Verify flag toggle persists across sessions (localStorage)

### 4. Bump version.

---

## PROMPT 9 — Kata + Kumite Video Embeds

Working directory contains: latest karate-handbook HTML.

Write and run a Python script:

### 1. KATA VIDEOS — Charlie Fairhead (primary)
Source: @charliefairhead5393 — WIKF European & World Kata Champion.
Verify all 15 kata have videos on his channel:
Pinan Nidan, Pinan Shodan, Pinan Sandan, Pinan Yodan, Pinan Godan, Kūshankū (✅ Vm9pxU15JY0), Naihanchi, Seishān, Chintō, Bassai, Rōhai, Wanshū, Niseishi, Jitte, Jihon.
For any gaps, find alternative WIKF-lineage YouTube sources.

### 2. KATA VIDEOS — Suzuki Sensei (secondary/duplicates)
Check these playlists for Suzuki Sensei performing kata. When found, add as a SECOND video on the same kata detail page (below Charlie Fairhead's). Label: "Suzuki Sensei":

- Playlist `PLVwhCzVMvTX9nKFEwj5ao4Oi_rMFt_GZg` — Suzuki Budo Attitude DVD (may contain kata segments)
- Playlist `PL_-bML0UP7MMdhGU8P8o4FFOsFkGwcx8o` — may contain kata or mae geri kumite

### 3. KUMITE FORM VIDEOS — Suzuki Sensei
Map individual playlist videos to the corresponding kumite forms in the app:

**Ohyo Kumite 1-8** (individual clips):
Playlist `PLZgIWvawAg3ROI8zbZAqaVsZjEnU3bJq_` — Suzuki Sensei Ohyo Kumite 1-8

**Ohyo Kumite** (full DVD):
Playlist `PLVwhCzVMvTX9nKFEwj5ao4Oi_rMFt_GZg` — Suzuki Sensei Ohyo Kumite (Budo Attitude DVD, 30min)

**Kihon Kumite**:
Playlist `PLCCc31NptHCW-lXFarFAAObRoC_zY5bfv` — Suzuki Sensei Kihon Kumite (starts with #10, check for 1-10)

**Sanbon Kumite**:
Playlist `PL_-bML0UP7MPo-mGacF86uIAHhmtRS_Ja` — Sanbon Kumite

**Mae Geri Kumite**:
Playlist `PL_-bML0UP7MMdhGU8P8o4FFOsFkGwcx8o` — Front Kick / Mae Geri Kumite

For each playlist, enumerate all videos and map to the matching form in the app data.

### 4. EMBED IMPLEMENTATION
In `KataDetailView` and `KumiteFormDetailView`, add responsive YouTube embeds below the photo sequence. Use lazy-loaded iframes:
```html
<iframe src="https://www.youtube.com/embed/{VIDEO_ID}" 
  loading="lazy" allowfullscreen
  style="width:100%; aspect-ratio:16/9; border:0;">
</iframe>
```
Multiple videos per page supported (primary + Suzuki duplicate for kata, individual clip for kumite).

### 5. DATA
- KATA array: add `videos: [{id:"VIDEO_ID", label:"Charlie Fairhead"}, {id:"ID2", label:"Suzuki Sensei"}]`
- KUMITE_FORMS: add `video: "VIDEO_ID"` to each form entry
- Render only when video data exists

### 6. CREDITS
Add: "Charlie Fairhead — WIKF European & World Kata Champion. Kata demonstrations."
Add: "Tatsuo Suzuki Sensei — 8th Dan, WIKF Chief Instructor. Kumite form and kata demonstrations (Budo Attitude DVD)."

### 7. Bump version.


---

# PROMPTS.md — Phase 10 (v48–v55)

> **Restructuring, cleanup, and UI refactor phase.** v48–v52 shipped (current file: `karate-handbook-v52.html`). v53–v55 pending.

> **Working directory must always contain:**
> - `karate-handbook-v{N}.html` (latest version)
> - `kumite-drills-library-bilingual.json`
> - `strength-mobility-library-bilingual.json`
> - `karate-warmup.json`

> **Critical rules for every prompt:**
> - NEVER read the full HTML file into context — it's too large (500KB+ with base64 images)
> - Always write a Python script that does targeted string search/replace on the file
> - Bump version number in both filename and the footer string inside the HTML
> - Flag any conflicts — do not reconcile

---

## v48 — Embed Kumite Drills JSON + Build Library Page ✅ SHIPPED

```
## PROMPT 1/4 — v48: Embed kumite drills JSON and build Kumite Drills Library page

**TARGET FILE**: `index.html`
**VERSION**: Bump to v48 in filename (`karate-handbook-v48.html`) and footer.

**Do NOT read the full HTML into your context. Write a Python script that uses targeted string search/replace.**

### STEP 1: Embed the kumite drills JSON
Read `kumite-drills-library-bilingual.json` and embed it as a JS constant `const KUMITE_DRILLS = <JSON>;` right after the existing `const EX_PT = {...};` block. Find the exact line where EX_PT ends (the `};` followed by a newline) and insert after it.

### STEP 2: Build the KumiteDrillsLibrary component
Create a new React component `KumiteDrillsLibrary` that:

1. **Data**: Reads from `KUMITE_DRILLS.drills` (80 drills), `KUMITE_DRILLS.categories` (5), `KUMITE_DRILLS.levels` (3), `KUMITE_DRILLS.formats` (2)
2. **Filter bar** (sticky below the page header, horizontal scroll):
   - Category pills: All | Attack (Sen) | Defence (Tai Sabaki) | Counter (Go no Sen) | Anticipation | Positional — use the colors from categories[].color
   - Level pills: All | Beginner | Intermediate | Advanced — use colors from levels{}.color
   - Format pills: All | Solo | Partnered
   - Each pill shows the count of matching drills
3. **Drill cards**: Show filtered drills as expandable cards. Default state = collapsed (name + Japanese term + scoring value + level/format badges). Tap to expand → full description, key points, common error, variations, duration/reps, equipment, WKF tactical note. Use LANG to switch en/pt for all bilingual fields.
4. **Tags**: Show tags as small pills below the drill name (use LANG for en/pt tags). Make tags tappable to filter.
5. **Empty state**: If filters produce 0 results, show a "No drills match" message.

### STEP 3: Wire the route
Add a new route `kumiteDrills` → `#/sport-kumite/drills`. Wire it in `viewToHash`, `hashToView`, and the `renderRoute`/view-switch logic. The KumiteDrillsLibrary receives `onMenu`, `onHome` props and uses PageShell.

### DESIGN:
- Follow the existing design system exactly (colors, fonts, card style, border-radius, touch targets)
- Filter pills: 36px height, 12px horizontal padding, 0.8rem font, border-radius 18px, background #1e1e24 default, category color when active
- Drill cards: standard card style (#131316 bg, #1e1e24 border, 12px border-radius), 4px left border in category color
- Expanded content: 0.85rem secondary text, key points as a compact list
- All text bilingual using the LANG variable and tL() where appropriate

### DO NOT:
- Touch the Sport Kumite page yet (that's Prompt 2)
- Touch the Exercise Library or home (that's Prompts 3-4)
- Remove any existing code
```

---

## v49 — Restructure Sport Kumite Page ✅ SHIPPED

```
## PROMPT 2/4 — v49: Restructure Sport Kumite page

**TARGET FILE**: `karate-handbook-v48.html`
**VERSION**: Bump to v49 in filename (`karate-handbook-v49.html`) and footer.

**Do NOT read the full HTML into your context. Write a Python script that uses targeted string search/replace.**

### Changes to the Sport Kumite page (the SportKumite component):

1. **REMOVE** the "Sport Kumite Drills" SectionTile (the one with onClick navigating to category "Sport Kumite")
2. **REMOVE** the "Wado-Ryū Drills" SectionTile
3. **REMOVE** the "Strength & Flexibility" SectionTile (the one linking to category "Flexibility & Mobility")
4. **ADD** a new tile: "Kumite Drills Library" — icon 🥊, color #FF1943, description "80 bilingual drills · 5 categories · 3 levels" (PT: "80 exercícios bilingues · 5 categorias · 3 níveis"), onClick navigates to {type:"kumiteDrills"}
5. **Keep** Session Library, Referee Signals, WKF Rules tiles exactly as they are
6. Update the page subtitle/intro text to reflect the new content (remove references to "Sport Kumite Drills" as a separate section)

### DO NOT:
- Touch the Exercise Library, home page, or any other pages
- Remove the EX["Sport Kumite"] or EX_PT["Sport Kumite"] data (it stays in the file, just not linked from this page anymore)
```

---

## v50 — Embed Strength-Mobility + Warmup JSONs + Build Library Pages ✅ SHIPPED

```
## PROMPT 3/4 — v50: Embed strength-mobility + warmup JSONs and build library pages

**TARGET FILE**: `karate-handbook-v49.html`
**VERSION**: Bump to v50 in filename (`karate-handbook-v50.html`) and footer.

**Do NOT read the full HTML into your context. Write a Python script that uses targeted string search/replace.**

### STEP 1: Embed the data
Read `strength-mobility-library-bilingual.json` and `karate-warmup.json`. Embed as `const STRENGTH_MOBILITY = <JSON>;` and `const WARMUP_DATA = <JSON>;` right after the KUMITE_DRILLS constant.

### STEP 2: Build StrengthLibrary component
- Data source: `STRENGTH_MOBILITY.strength` (13 movement patterns, each with 3 exercises)
- Filter bar: Level pills (All | Foundation | Performance | Competition) + Pattern dropdown/pills (13 patterns, horizontal scroll)
- Cards: Collapsed = name + level badge + equipment + sets/reps. Expanded = full description, cues, common error, progression note, contraindications, masters note, min age, readiness criteria
- Show pattern name and karate_relevance as a section header when grouped by pattern
- All bilingual via LANG

### STEP 3: Build MobilityLibrary component
- Data source: `STRENGTH_MOBILITY.flexibility` (10 body zones, each with 3 exercises)
- Filter bar: Level pills (All | Foundation | Performance | Competition) + Zone pills (10 zones, horizontal scroll)
- Cards: Collapsed = name + level badge + equipment + hold/reps. Expanded = full description, cues, common error, contraindications, masters note, min age
- Show zone name and karate_relevance as section header when grouped by zone
- Include `STRENGTH_MOBILITY.injury_hotspots` as a collapsible reference section at the top or bottom
- All bilingual via LANG

### STEP 4: Build WarmupLibrary component
- Data source: `WARMUP_DATA`
- Structure: Show the 3 RAMP phases (Raise, Activate & Mobilise, Potentiate) as sections
- Each phase shows its slots, each slot shows its 2-3 options as expandable cards
- Cards: Collapsed = option name + slot duration. Expanded = full description, coaching cues, age note
- No filters needed — this is a structured flow
- Show the RAMP framework description at the top
- All bilingual via LANG

### STEP 5: Wire the routes
- `strengthLibrary` → `#/strength-mobility/strength`
- `mobilityLibrary` → `#/strength-mobility/mobility`
- `warmupLibrary` → `#/strength-mobility/warmup`
- Wire all in viewToHash, hashToView, and the view switch

### DESIGN: Same as Prompt 1. Level badge colors: Foundation=#2a9d8f, Performance=#f4a261, Competition=#ff6b6b.
```

---

## v51 — Restructure Home + Kill Exercise Library + Kill Supporting ✅ SHIPPED

```
## PROMPT 4/4 — v51: Restructure home and replace Exercise Library with new Strength & Mobility page

**TARGET FILE**: `karate-handbook-v50.html`
**VERSION**: Bump to v51 in filename (`karate-handbook-v51.html`) and footer.

**Do NOT read the full HTML into your context. Write a Python script that uses targeted string search/replace.**

### STEP 1: Build the new StrengthMobilityPage (replaces Exercise Library)
Create a new component `StrengthMobilityPage` with 4 tiles:
1. **Strength** — icon 💪, color #ff6b6b, desc "39 exercises · 13 movement patterns · 3 levels" (PT: "39 exercícios · 13 padrões de movimento · 3 níveis"), onClick → {type:"strengthLibrary"}
2. **Mobility** — icon 🧘, color #e9c46a, desc "30 exercises · 10 body zones · 3 levels" (PT: "30 exercícios · 10 zonas corporais · 3 níveis"), onClick → {type:"mobilityLibrary"}
3. **Karate Specific Exercises** — icon 🔴, color #457b9d, desc "26 Wado-Ryū specific drills" (PT: "26 exercícios específicos de Wado-Ryū"), onClick → {type:"category",name:"Wado-Ryū Drills"} (reuses the existing category page which already works)
4. **Warm-Up** — icon 🔥, color #2a9d8f, desc "RAMP framework · 10 slots · 30 options" (PT: "Estrutura RAMP · 10 estações · 30 opções"), onClick → {type:"warmupLibrary"}

Use PageShell with title "Strength & Mobility" (PT: "Força e Mobilidade"), accent teal.

### STEP 2: Update home page — kill the old structure
In the HOME_SECTIONS array (the `[{id:"main",...}, {id:"strength",...}, {id:"support",...}]`):
- Change the `strength` section: label stays "Strength & Mobility", but its tile onClick should navigate to `{type:"strengthMobility"}` (the new page), NOT to exerciseLibrary. Remove the 6-category `cats` array. Make it a single tile pointing to the new page.
- **DELETE the entire `support` section** (`{id:"support", label:"Supporting Exercises", ...}`). The three categories it linked to (Kihon & Fundamentals, Keri Waza — Kicks, Playful Kumite & Games) are dead. Remove the section from the array entirely so the home page shows only two sections: Main Training and Strength & Mobility.
- Keep `main` section as it is.

### STEP 3: Wire the route
- `strengthMobility` → `#/strength-mobility` → renders StrengthMobilityPage
- The old `exerciseLibrary` route should redirect to `strengthMobility` (in case any deep links exist)

### STEP 4: Clean up
- Remove the old ExerciseLibrary component (the one rendering CM categories as tiles)
- Remove the `CM` constant (the 11-category tile definitions) — it's no longer used
- Update the drawer menu: rename "Exercise Library" to "Strength & Mobility", point it to the new route
- Remove any drawer buttons for Exercise Library or Sport Kumite that are now redundant (users navigate from home tiles)
- From the EX and EX_PT data objects, **delete** these three keys and their contents: `"Kihon & Fundamentals"`, `"Keri Waza — Kicks"`, `"Playful Kumite & Games"`. Nothing links to them anymore. Keep all other EX/EX_PT keys.

### STEP 5: Translation updates
Add to the translation object:
- "Karate Specific Exercises": "Exercícios Específicos de Karaté"
- "Warm-Up": "Aquecimento"
- "Kumite Drills Library": "Biblioteca de Exercícios de Kumite"
- "Strength": "Força"
- "Mobility": "Mobilidade"

### DO NOT:
- Remove the EX/EX_PT keys for categories that are still referenced (Wado-Ryū Drills, Coordination & Balance, Flexibility & Mobility, Strength & Power, Speed Agility & Plyometrics, Pillar Prep & Activation, Calisthenics & Bodyweight)
- Remove the old category view component — it still renders individual categories
```

---

## v52 — Filter Dropdown + Multi-Column Grid ✅ SHIPPED

```
## PROMPT 5 — v52: Kumite Drills Library UI refinement — filter dropdown + multi-column grid

**TARGET FILE**: `karate-handbook-v51.html`
**VERSION**: Bump to v52 in filename (`karate-handbook-v52.html`) and footer.

**Do NOT read the full HTML into your context. Write a Python script that uses targeted string search/replace.**

### CHANGE 1: Collapse filters behind a toggle button

Replace the three always-visible filter pill rows with a single filter button + collapsible dropdown panel:

1. **Filter button**: Sits below the subtitle. Shows a funnel icon (or 🔍) + "Filters" label + active filter count badge (e.g. "Filters (2)" when 2 non-All filters are active). Styled as a pill: #1e1e24 background, #f0eeeb text, 40px height, border-radius 20px. When any filter is active, the badge uses the red accent (#ff6b6b).
2. **Dropdown panel**: Toggled by tapping the filter button. Slides down with a smooth transition (max-height animation, 200ms). Contains the three filter rows (Category, Level, Format) stacked vertically with a subtle label ("Category", "Level", "Format") above each row. Same pill styling as before.
3. **Active filter summary**: When the dropdown is closed AND filters are active, show a single line of active filter names as small pills below the button so the user can see what's applied without re-opening. Each pill has an × to clear that individual filter back to All.
4. **"Clear all" link**: Inside the dropdown, bottom-right, clears all filters back to All.

### CHANGE 2: Multi-column drill card grid

Replace the single-column card list with a responsive grid:

- **Mobile (< 600px)**: 1 column (unchanged)
- **Tablet / medium (600px–1024px)**: 2 columns
- **Desktop (> 1024px)**: 3 columns
- Use CSS grid: `display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;`
- Cards should have equal height per row (align-items: stretch) but the expanded card should span full width of its column, NOT break the grid
- When a card is expanded, it's fine for it to be taller than its row neighbors

### CHANGE 3: Apply the same pattern to ALL new library pages

Apply the same two changes (filter dropdown + multi-column grid) to these components if they exist:
- **StrengthLibrary** — filter button with Level + Pattern filters, 2-3 column card grid
- **MobilityLibrary** — filter button with Level + Zone filters, 2-3 column card grid
- **WarmupLibrary** — no filters needed so skip the filter button, but DO apply the multi-column grid to the option cards within each slot (2 columns on tablet+, 3 on desktop)

If any of these components don't exist yet (because Prompts 3-4 haven't run), skip them — just do KumiteDrillsLibrary.

### DESIGN:
- Filter button: same card background (#1e1e24), white text, 40px height, border-radius 20px, subtle border (#2a2a32)
- Dropdown: #131316 background, #1e1e24 border, 12px border-radius, 16px padding, appears below the button
- Row labels: 0.75rem, uppercase, letter-spacing 0.05em, color var(--text-dim)
- Active filter summary pills: 28px height, 0.75rem font, #1e1e24 background, category color left border, × button on the right
- Grid gap: 12px
- Maintain all existing card styling, just change the layout container

### DO NOT:
- Change the card content or expand/collapse behavior
- Change the filter logic itself — just the visual presentation
- Touch any pages other than the library pages listed above
```

---

## v53 — Code Cleanup + Shared Component Consolidation ✅ SHIPPED

```
## v53: Code cleanup and shared component consolidation

**TARGET FILE**: `karate-handbook-v52.html`
**VERSION**: Bump to v53 in filename (`karate-handbook-v53.html`) and footer.

**Do NOT read the full HTML into your context. Write a Python script that uses targeted string search/replace.** The file is 500KB+ with base64 images. Your script should use Python string `.find()`, `.replace()`, slicing, or regex to locate and modify specific sections, then write the result to the new filename.

### APP ARCHITECTURE (read this — you have no prior context)

This is a **single-file React app**. Everything lives inside one HTML file:
- A `<style>` tag contains all CSS
- A `<script type="text/babel">` tag contains all React components, data, and logic
- `ReactDOM.render(<App />, ...)` at the bottom boots the app
- Babel standalone transpiles JSX in-browser

**Routing**: The app uses hash-based routing with a `view` state object (e.g. `{type:"home"}`, `{type:"sportKumite"}`, `{type:"kumiteDrills"}`). Two functions convert between view objects and URL hashes:
- `viewToHash(view)` — returns a hash string like `#/sport-kumite/drills`
- `hashToView(hash)` — parses a hash string back into a view object
- The main `App` component has a view-switch: a series of `{view.type==="X" && <Component />}` conditionals that render the active page

**Page wrapper**: Every page uses `<PageShell title="..." subtitle="..." accent="..." onMenu={onMenu} onHome={onHome}>` which renders the sticky navbar, title area, and content slot.

**Translation**: A `LANG` variable is either `'en'` or `'pt'`. The `tL("key")` function looks up a translation string. Bilingual JSON data uses `{en: "...", pt: "..."}` objects — components read `field[LANG]` or `field.en`/`field.pt`.

**Data constants** (all defined at the top of the script):
- `EX` / `EX_PT` — legacy exercise objects keyed by category name (e.g. `EX["Wado-Ryū Drills"]`), each containing arrays of `{name, desc, chapter, group}` objects
- `KUMITE_DRILLS` — structured kumite drills JSON with `.drills[]`, `.categories[]`, `.levels{}`, `.formats{}`
- `STRENGTH_MOBILITY` — structured strength/mobility JSON with `.strength[]` (13 patterns) and `.flexibility[]` (10 zones)
- `WARMUP_DATA` — structured warmup JSON with `.phases[]` containing `.slots[]` with `.options[]`
- `CM` — 11-element array of category tile definitions (may already be deleted in v51)

**Key components** (defined as `function ComponentName({props}) { ... }`):
- `Home` — renders the home page with section tiles
- `SportKumite` — sport kumite hub page
- `KumiteDrillsLibrary` — 80-drill filterable library (added v48)
- `StrengthLibrary` — 39-exercise strength library (added v50)
- `MobilityLibrary` — 30-exercise mobility library (added v50)
- `WarmupLibrary` — RAMP warmup viewer (added v50)
- `StrengthMobilityPage` — hub page with 4 tiles linking to the libraries above (added v51)
- `CategoryView` — generic category page that renders exercises from EX/EX_PT by category name
- `SectionTile`, `HomeTile` — reusable tile components
- `PageShell` — page wrapper with navbar

**Navigation drawer**: A slide-in menu from the left (hamburger icon in navbar) with links to main sections.

### STEP 1: Kill dead data
From the EX and EX_PT data objects, DELETE these keys and all their contents — nothing links to them anymore:
- "Coordination & Balance"
- "Flexibility & Mobility"
- "Strength & Power"
- "Speed, Agility & Plyometrics"
- "Pillar Prep & Activation"
- "Calisthenics & Bodyweight"

Also delete if still present (should have been removed in v51):
- "Kihon & Fundamentals"
- "Keri Waza — Kicks"
- "Playful Kumite & Games"

KEEP these EX/EX_PT keys — they are still referenced:
- "Sport Kumite" (referenced by CategoryView)
- "Wado-Ryū Drills" (linked from Karate Specific Exercises tile via CategoryView)

**Verification**: Before deleting each key, search the ENTIRE file for that exact string to confirm no `onClick`, route, or tile references it. If a reference exists, do NOT delete — flag it for Pedro.

### STEP 2: Remove dead components and constants
Search for and remove if present:
- `const CM = [` ... `];` — the old 11-category tile array
- `function ExerciseLibrary(` ... the entire component function — the old Exercise Library page
- Any component function that is defined (`function Foo(`) but never rendered (no `<Foo` or `Foo(` call anywhere else in the file)

### STEP 3: Consolidate shared UI primitives
Identify the repeated card/filter/badge patterns across KumiteDrillsLibrary, StrengthLibrary, MobilityLibrary, and WarmupLibrary. Extract into shared components placed BEFORE the library components in the file:

1. **ExpandableCard** — collapse/expand card. Props: `title`, `subtitle`, `badges` (array of {label, color}), `tags` (array of strings), `children` (expanded content), `accentColor`, `isExpanded`, `onToggle`. Handles the chevron rotation, max-height transition, and card styling.
2. **FilterBar** — the filter dropdown toggle + pill rows + active summary + clear-all. Props: `filterGroups` (array of {label, options[], activeValue, onChange}), shows count badge when non-default filters active.
3. **LevelBadge** — filled-background level pill. Props: `level` (string), maps to color (foundation=#2a9d8f, performance=#f4a261, competition=#ff6b6b, beginner=#2a9d8f, intermediate=#f4a261, advanced=#ff6b6b).
4. **LibraryGrid** — responsive CSS grid wrapper. Props: `children`, renders with `display:grid; grid-template-columns:repeat(auto-fill, minmax(340px,1fr)); gap:12px`.

After extracting, refactor each library component to USE these shared primitives instead of its own inline implementation. The rendered output should look identical — this is a code structure change, not a visual change.

### STEP 4: Clean up orphaned translations
In the translation object (search for the large object containing `"Exercise Library":"Biblioteca de Exercícios"` etc.):
- Remove entries for pages/labels that no longer exist in the UI
- Verify every `tL("...")` call in the file has a matching key

### STEP 5: Clean up orphaned routes
In `viewToHash` and `hashToView`:
- Remove any route for `exerciseLibrary` (or verify it redirects to `strengthMobility`)
- Remove routes for any deleted category views
- Verify every remaining route has BOTH a hash mapping AND a component that renders for it in the view-switch

### STEP 6: Audit the drawer menu
Find the drawer/menu component (search for `hamburger` or `drawer` or `onMenu`). It should contain exactly these navigation items:
- Home
- Sport Kumite
- Strength & Mobility
- WIKF Syllabus
- Exam Syllabus

Remove any items pointing to deleted sections. Verify each item's onClick navigates to the correct view type.

### DO NOT:
- Change any visual styling (that's v54)
- Change the content or structure of any page that works correctly
- Touch the WIKF Syllabus, Exam Syllabus, Kata, Kihon Reference, or Kumite Forms sections
- Remove any base64 image data
```

---

## v54 — Responsive Breakpoints + Elevated Component Design ✅ SHIPPED
> v54 delivered responsive breakpoints + elevated design on ExpandableCard/filter panels only (6 of 59 surfaces). 53 other surfaces untouched. Fixed in v56.

```
## v54: Responsive breakpoints + elevated component design

**TARGET FILE**: `karate-handbook-v53.html`
**VERSION**: Bump to v54 in filename (`karate-handbook-v54.html`) and footer.

**Do NOT read the full HTML into your context. Write a Python script that uses targeted string search/replace.** The file is 500KB+ with base64 images. Your script should use Python string `.find()`, `.replace()`, slicing, or regex to locate and modify specific sections, then write the result to the new filename.

### APP ARCHITECTURE (read this — you have no prior context)

This is a **single-file React app**. Everything lives inside one HTML file:
- A `<style>` tag contains all CSS
- A `<script type="text/babel">` tag contains all React components, data, and logic
- Components use inline `style={{}}` objects (React style), NOT CSS classes — most styling is in the JSX
- Some global styles (body, animations, scrollbar) are in the `<style>` tag

**Key structural facts for this prompt**:
- The main content container currently has a `max-width: 700px` (or `maxWidth:"700px"` in JSX). This must be replaced.
- Cards and tiles use `background: "#131316"` and `border: "1px solid #1e1e24"` as inline styles. These are the targets for the gradient/shadow upgrade.
- Badges use `border: "1px solid {color}"` with `background: "transparent"`. These need to become filled.
- Most components have zero CSS transitions — interactive elements change state instantly with no animation.
- The topographic background animation is in the `<style>` tag as a CSS `@keyframes` animation. Its `animation-duration` is the target for the speed fix.
- The home page hero has a 120px dove/rising-sun SVG or base64 image.
- `PageShell` renders the sticky navbar (frosted glass: `#0e0e10ee` + `backdrop-filter: blur(12px)`) and the page title area.

**Shared components from v53** (if consolidation happened):
- `ExpandableCard` — used by all library pages
- `FilterBar` — filter dropdown with pills
- `LevelBadge` — level indicator pill
- `LibraryGrid` — responsive grid wrapper

If these shared components exist, styling changes to them propagate to all library pages automatically. If they don't exist (v53 didn't consolidate), you'll need to apply changes to each library component individually.

**Design system colors** (DO NOT change these values, just use them more expressively):
- Page bg: #0a0a0c | Surface: #131316 | Border: #1e1e24 | Border active: #2a2a32
- Text: #f0eeeb | Secondary: #c0bfbb | Muted: #b0aead | Dim: #666
- Red: #ff6b6b | Orange: #f4a261 | Teal: #2a9d8f | Blue: #457b9d | Purple: #9b5de5 | Gold: #e9c46a

**Fonts**: `'DM Sans', system-ui, sans-serif` (body) and `'Space Mono', monospace` (mono). Loaded via Google Fonts `<link>` in the `<head>`.

### PART A: Responsive Foundation

1. **Kill the 700px max-width** on the main content container. Search for `700` near `max-width` or `maxWidth` in both the `<style>` tag and inline JSX styles. Replace with a responsive container:
   - Mobile (< 480px): width 95%, padding 0 12px
   - Small (480–768px): width 92%, padding 0 16px
   - Tablet (768–1024px): width 90%, max-width 960px, padding 0 24px
   - Desktop (1024px+): width 88%, max-width 1400px, padding 0 32px
   - All centered with margin: 0 auto

   Implement this as a CSS class (`.responsive-container`) in the `<style>` tag with media queries, then apply that class to the main content wrapper in the JSX.

2. **Add CSS media query breakpoints** to the `<style>` tag:
   - @media (min-width: 480px) { }
   - @media (min-width: 768px) { }
   - @media (min-width: 1024px) { }

3. **Home page grid**: Home tiles should flow into 2-column grid at 600px+ and 3-column at 1024px+. Find the Home component and update the tile container.

4. **Library grids**: Verify `LibraryGrid` (or the inline grid on each library page) uses `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))`.

5. **Prose pages** (Syllabus, Kata details, Kihon Reference): Add `max-width: 800px; margin: 0 auto` to their content containers for comfortable reading width on desktop.

### PART B: Elevated Component Design

1. **Cards and tiles — gradient surfaces, not flat backgrounds**:
   - Search for all `"#131316"` or `#131316` background values
   - Replace with: `"linear-gradient(170deg, #151518 0%, #111114 100%)"`
   - Add to each card/tile: `boxShadow: "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)"`
   - Where a card has an accent color prop, add a positioned pseudo-element or inner div with `radial-gradient(circle at top right, {accentColor}06 0%, transparent 60%)` for a faint color wash
   - **REMOVE all `borderLeft: "3px solid"` and `borderLeft: "4px solid"` accent lines.** These are the "Claude UI" giveaway. Replace the accent identification with: an icon container (40x40px, borderRadius 10px, background `linear-gradient(135deg, {accentColor}18, {accentColor}08)`) wrapping the tile/card icon.

2. **Badges — filled, not bordered**:
   - Search for badge-style elements that have `border: "1px solid` + `background: "transparent"` or no background
   - Replace with: `background: "{color}15"` (15 = hex ~8% opacity), `color: "{color}"`, `border: "none"`, `fontWeight: 600`

3. **Tags — quieter**:
   - Search for tag pill elements (typically in cards, with `fontFamily: "'Space Mono'"` and small font size)
   - Replace styling with: `background: "rgba(255,255,255,0.03)"`, `border: "none"`, `borderRadius: "4px"`, `padding: "2px 7px"`, `fontSize: "0.65rem"`, `color: "#666"`, `fontWeight: 500`, `fontFamily: "'DM Sans', sans-serif"`

4. **Typography — aggressive hierarchy**:
   - Page titles (inside PageShell or page header areas): `fontSize: "2rem"`, `fontWeight: 800`, `letterSpacing: "-0.02em"`, add gradient text: `background: "linear-gradient(135deg, #f0eeeb, #c0bfbb)"`, `WebkitBackgroundClip: "text"`, `WebkitTextFillColor: "transparent"`
   - Add section labels ABOVE page titles where they don't exist: small uppercase breadcrumb (e.g. "SPORT KUMITE" above "Kumite Drills") — `fontSize: "0.65rem"`, `fontWeight: 700`, `letterSpacing: "0.15em"`, `textTransform: "uppercase"`, `fontFamily: "'Space Mono', monospace"`, color = page accent
   - Card titles: `fontWeight: 700`, `letterSpacing: "-0.01em"`
   - Body/description text: `fontWeight: 400`, `color: "#b0aead"`, `lineHeight: 1.65`

5. **Micro-animations on all interactive elements**:
   - Add `transition: "all 0.15s ease"` to every button, card, tile, and pill style object
   - Cards/tiles: add an onMouseDown/onTouchStart handler that briefly applies `transform: "scale(0.97)"` (or do it via CSS `:active` in the style tag)
   - ExpandableCard chevron: `transition: "transform 0.2s ease"`, rotates 180deg when expanded
   - Expanded content: `transition: "max-height 0.25s ease, opacity 0.2s ease"`
   - If using shared components from v53, add transitions there. If not, add to each component individually.

6. **Topographic background — speed and density fix**:
   - Find the `@keyframes` animation for the topographic/background pattern in the `<style>` tag
   - Change the `animation-duration` to `18s` (from whatever it currently is — likely 60s+)
   - If the background-size controls the topo pattern density, reduce it (e.g. from `400px` to `250px`) to make the lines tighter
   - Add a matching subtle topographic pattern at 2-3% opacity as a `backgroundImage` on the home page hero tiles and the library page header areas. Use the same SVG data URI as the body background but at lower opacity.

7. **Section dividers** (between content groups):
   - Replace any `<hr>` or `borderBottom: "1px solid #1e1e24"` dividers with: `background: "linear-gradient(90deg, transparent, #2a2a32, transparent)"`, `height: "1px"`, `border: "none"`

8. **Tile icon containers**:
   - Where tiles show an emoji icon, wrap it in a container: 40x40px, borderRadius 10px, background `linear-gradient(135deg, {accentColor}18, {accentColor}08)`, centered

### PART C: Home Page Hero

Find the Home component's hero section (contains the 120px dove logo):
- Apply gradient text treatment to the "KARATE HANDBOOK" title: weight 800, tracking -0.02em, `background: linear-gradient(135deg, #f0eeeb, #c0bfbb)`, `WebkitBackgroundClip: text`
- Add a faint radial glow behind the logo: a positioned div with `background: radial-gradient(ellipse, rgba(255,107,107,0.05) 0%, transparent 60%)`, ~300px wide, centered on the logo
- The subtitle/tagline below: apply section-label style (small, uppercase, Space Mono, muted color)

### DO NOT:
- Change data, content, or page structure
- Change routing, navigation logic, or component hierarchy
- Change the hex values of the color palette — keep all existing colors, use them more expressively
- Add any new fonts beyond DM Sans and Space Mono
- Apply glassmorphism / frosted-glass effects to content cards (only the navbar uses backdrop-filter)
- Touch any base64 image data
```

---

## v55 — Final Cleanup + Polish Pass ✅ SHIPPED

```
## v55: Final cleanup and polish pass

**TARGET FILE**: `karate-handbook-v54.html`
**VERSION**: Bump to v55 in filename (`karate-handbook-v55.html`) and footer.

**Do NOT read the full HTML into your context. Write a Python script that uses targeted string search/replace.** The file is 500KB+ with base64 images. Your script should use Python string `.find()`, `.replace()`, slicing, or regex to locate and modify specific sections, then write the result to the new filename.

### APP ARCHITECTURE (read this — you have no prior context)

This is a **single-file React app** inside one HTML file. `<style>` tag for CSS, `<script type="text/babel">` for all React components/data/logic. Components use inline `style={{}}` objects. Hash-based routing with `viewToHash`/`hashToView` and a view-switch in the App component. Translations via `tL("key")` with `LANG` variable ('en' or 'pt'). Bilingual JSON data uses `{en:"...", pt:"..."}` — components read `field[LANG]`.

**What v54 changed** (so you know what to audit):
- Replaced flat `#131316` backgrounds with `linear-gradient(170deg, #151518, #111114)`
- Replaced bordered badges with filled-background badges (`{color}15` opacity fills)
- Removed `border-left` accent lines from cards
- Added CSS transitions (0.15s) to interactive elements
- Added gradient text treatment to page titles
- Changed topographic animation speed to ~18s
- Replaced 700px max-width with responsive container (breakpoints at 480/768/1024px)
- Added icon containers with accent-colored gradient backgrounds

### STEP 1: Visual consistency audit
Write a Python script that searches the entire HTML for inconsistencies from v54:

1. Find ALL remaining `border-left: 3px solid` or `border-left: 4px solid` or `borderLeft:"3px solid` or `borderLeft:"4px solid` — list line numbers and surrounding context. These should be zero.
2. Find ALL remaining `background:"#131316"` or `background: #131316` without `gradient` nearby — list them. These should all be gradients now.
3. Find ALL remaining `max-width:700` or `maxWidth:"700` or `maxWidth:700` or `max-width: 700px` — list them. Should be zero.
4. Find ALL remaining `border:"1px solid` on badge/pill elements that also have `background:"transparent"` or no background — list them. Badges should have filled backgrounds.
5. Find ALL `font-family` values containing `Inter` or `Roboto` or `Arial` — should be zero.
6. Find ALL card/tile style objects missing `transition` — interactive elements should have `transition: "all 0.15s ease"` or similar.

For each inconsistency found: apply the v54 fix. Output a summary of what was found and fixed.

### STEP 2: Dead code removal
Search for:
1. Component functions defined with `function` that are never referenced elsewhere (never appear as `<ComponentName` or in the view-switch). List them. Remove confirmed dead ones.
2. `const` declarations at the top level that are never referenced anywhere after their declaration. List them. Remove confirmed dead ones.
3. Translation keys in the translation object that don't match any `tL("...")` call in the file. List them. Remove confirmed dead ones.
4. Blocks of commented-out code (lines starting with `//` or wrapped in `/* */`) longer than 3 lines. Remove them.

Be conservative: if uncertain whether something is referenced (e.g. referenced via dynamic string construction), keep it and flag it.

### STEP 3: Mobile touch-target audit
Search for all elements with `onClick` handlers and check their sizing:
1. Any `height` or `minHeight` less than 44 on a tappable element — fix to 44px minimum
2. Any `padding` less than "8px" on a standalone tappable element — increase
3. Any `fontSize` less than "0.7rem" on a tappable text element — verify it has adequate padding to compensate

Fix any violations.

### STEP 4: Language toggle verification
Search for all components that render data from `KUMITE_DRILLS`, `STRENGTH_MOBILITY`, or `WARMUP_DATA` and verify they access bilingual fields correctly:
1. Every `name` field should be accessed as `name[LANG]` or `name.en`/`name.pt` with LANG switch — NOT as a bare `name` string
2. Every `description` field same pattern
3. Every `tags` field: `tags[LANG]` or `tags.en`/`tags.pt`
4. Search for any hardcoded English strings in the new library components (strings like "Beginner", "Solo Drill", "Key Points", "Common Error", "Filters", "Clear all") — these should go through `tL()` or have an inline `LANG==='pt'?...:...` ternary

List any missing translations. Add PT translations for any untranslated UI strings:
- "Filters" → "Filtros"
- "Clear all" → "Limpar tudo"
- "No drills match" → "Nenhum exercício corresponde"
- "Key Points" → "Pontos-Chave"
- "Common Error" → "Erro Comum"
- "Variations" → "Variações"
- "Equipment" → "Equipamento"
- "Duration" → "Duração"
- "Foundation" → "Base"
- "Performance" → "Desempenho"
- "Competition" → "Competição"
- "Solo Drill" → "Exercício Individual"
- "Partnered Drill" → "Exercício a Pares"
- "All" → "Todos"
- "drills" → "exercícios"
- "exercises" → "exercícios"
- "patterns" → "padrões"
- "zones" → "zonas"
- "levels" → "níveis"
- "phases" → "fases"
- "slots" → "estações"
- "options" → "opções"

### STEP 5: Performance check
1. Calculate total file size in KB
2. Count number of base64 image strings (search for `data:image`)
3. Check if any component renders ALL exercises/drills at once without virtualization — if a library renders 80 cards simultaneously with full expanded content in the DOM, note it (acceptable for now, but flag if over 200 items)
4. List the 5 largest `const` declarations by character count

### STEP 6: Footer update
Find the footer text (search for the version string like `v54` or `Karate Handbook v`). Update to:
`Karate Handbook v55 · AWIKP · Built with 🥋`
Ensure it appears correctly in both EN and PT modes.

### DO NOT:
- Change any styling decisions made in v54
- Change the responsive breakpoints
- Change the component structure from v53
- Add any new features or content
- Touch any base64 image data
```

---

## v56 — Design System Normalization + Icon System ⬜ PENDING

```
## v56: Design system audit, token normalization, and icon system

**TARGET FILE**: `karate-handbook-v55.html`
**VERSION**: Bump to v56 in filename (`karate-handbook-v56.html`) and footer.

**Do NOT read the full HTML into your context. Write a Python script that uses targeted string search/replace.** The file is 500KB+ with base64 images.

---

### THE PROBLEM

As of v54, the app has ~518 inline style objects across ~60 components, 35 different font sizes, 53 different padding values, 28 text colors (many hardcoded hex instead of CSS variables), and ~53 card surfaces all copy-pasting the same 3 inline properties instead of using a CSS class. v54 elevated only 6 surfaces (ExpandableCard + filter panels) to gradient+shadow; the other ~53 are still flat. v55 (polish pass) may have changed some of these counts — the script should audit first, then normalize. Typography is uniform — same weight, same size, no contrast. The app looks like a CSS template.

This prompt creates a design token system, CSS utility classes, normalizes the entire codebase to use them, and replaces all emoji icons with Material Symbols.

---

### STEP 0: PRE-AUDIT (run before any changes)

Before modifying anything, write a Python script that scans the file and prints:
1. Total `background:"var(--bg-card)"` count
2. Total `linear-gradient(170deg` count (existing elevated surfaces)
3. Total `boxShadow` count
4. Total unique `fontSize:"..."` values (list them with counts)
5. Total `fontWeight:600` count
6. Total hardcoded hex `color:"#` count (excluding inside `<style>` blocks)
7. Total emoji count (non-flag)

This establishes the ACTUAL baseline after v55. The counts below are from the v54 audit — v55 may have shifted them. Adjust your replacements accordingly.

---

### STEP 1: DESIGN TOKENS — Add CSS Custom Properties

Find the `:root{` block in the FIRST `<style>` tag. Add these tokens AFTER the existing color variables (after the `--accent-*-faint` lines):

```css
/* Typography scale */
--text-xs: 0.65rem;    /* labels, meta badges, technical data */
--text-sm: 0.75rem;    /* captions, badges, small UI */
--text-base: 0.85rem;  /* body text, descriptions, card content */
--text-md: 0.95rem;    /* content paragraphs, detail text */
--text-lg: 1.1rem;     /* card titles, section names */
--text-xl: 1.3rem;     /* section headers */
--text-2xl: 2rem;      /* page titles */
--text-3xl: 3rem;      /* hero display */

/* Spacing scale */
--sp-1: 0.15rem;  /* 2px — micro nudge */
--sp-2: 0.3rem;   /* 5px — tight */
--sp-3: 0.5rem;   /* 8px — small gap */
--sp-4: 0.75rem;  /* 12px — medium */
--sp-5: 1rem;     /* 16px — base */
--sp-6: 1.5rem;   /* 24px — section gap */
--sp-7: 2rem;     /* 32px — large section */

/* Surface */
--surface-bg: linear-gradient(170deg, #151518 0%, #111114 100%);
--surface-shadow: 0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02);
--surface-border: 1px solid var(--border);
```

Also add the light-theme overrides inside the existing `[data-theme="light"]{` block:
```css
--surface-bg: linear-gradient(170deg, #ffffff 0%, #f8f6f2 100%);
--surface-shadow: 0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5);
```

---

### STEP 2: CSS UTILITY CLASSES

Add these classes to the SECOND `<style>` block (the one with `.responsive-container`, `.tile`, etc.). Insert them AFTER the existing `.tile` rules:

```css
/* === Card surface — the ONE surface style for the whole app === */
.card {
  background: var(--surface-bg);
  border: var(--surface-border);
  border-radius: 0;
  box-shadow: var(--surface-shadow);
  transition: all 0.15s ease;
}
.card-interactive {
  cursor: pointer;
}
.card-interactive:active {
  transform: scale(0.98);
}
@media(hover:hover) {
  .card-interactive:hover {
    border-color: var(--border-active);
    transform: translateY(-2px);
  }
}

/* === Typography === */
.text-page-title {
  font-size: var(--text-2xl);
  font-weight: 800;
  letter-spacing: -0.02em;
  font-family: 'DM Sans', sans-serif;
  background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}
.text-section-label {
  font-family: 'Space Mono', monospace;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.text-card-title {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: var(--text-lg);
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.3;
}
.text-body {
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.65;
}
.text-meta {
  font-family: 'Space Mono', monospace;
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

/* === Filled badge (replaces bordered badges) === */
.badge {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 0;
  border: none;
  letter-spacing: 0.03em;
}

/* === Material Symbols sizing === */
.material-symbols-rounded {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
  display: inline-block;
}
.icon-sm { font-size: 18px; }
.icon-md { font-size: 20px; }
.icon-lg { font-size: 24px; }
```

---

### STEP 3: MATERIAL ICONS FONT

Find the existing Google Fonts `<link>` tag in the `<head>`:
```
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

Add a SECOND `<link>` tag immediately after it:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
```

---

### STEP 4: ICON HELPER + MAPPING

After the last data constant, before the first `function` component, insert:

```javascript
function MI({name, size, color, style}) {
  return React.createElement('span', {
    className: 'material-symbols-rounded' + (size === 18 ? ' icon-sm' : size === 24 ? ' icon-lg' : ' icon-md'),
    style: Object.assign({color: color || 'currentColor', flexShrink: 0}, style || {}),
  }, name);
}

const ICON_MAP = {
  fist: 'sports_martial_arts',
  boxing: 'sports_mma',
  combat: 'sports_martial_arts',
  shield: 'shield',
  target: 'my_location',
  dumbbell: 'fitness_center',
  stretch: 'self_improvement',
  flame: 'local_fire_department',
  exercise: 'exercise',
  book: 'menu_book',
  scroll: 'description',
  temple: 'account_balance',
  graduation: 'school',
  trophy: 'emoji_events',
  clipboard: 'assignment',
  search: 'search',
  globe: 'public',
  building: 'domain',
  translate: 'translate',
  books: 'library_books',
  foot: 'footprint',
  hand: 'pan_tool',
  leg: 'sprint',
  footprints: 'directions_walk',
  kneel: 'accessibility_new',
  yinyang: 'contrast',
  torii: 'temple_buddhist',
  wind: 'air',
  gi: 'dry_cleaning',
  sword: 'swords',
};
```

Note: `MI` is a lightweight wrapper. `ICON_MAP` exists so data constants can store semantic names (like `"shield"`) and rendering code resolves to the Material Symbol name (`"shield"` → `"shield"`; `"fist"` → `"sports_martial_arts"`).

---

### STEP 5: GLOBAL CARD SURFACE NORMALIZATION

This is the core refactor. Write a Python script that does these replacements IN ORDER:

#### 5A. Replace ALL inline card backgrounds with surface tokens

Search for:
```
background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:0
```
(53 occurrences — verify count before replacing)

Replace with:
```
background:"var(--surface-bg)",border:"var(--surface-border)",borderRadius:0,boxShadow:"var(--surface-shadow)",transition:"all 0.15s ease"
```

This uses the CSS custom properties defined in Step 1, so dark/light theme switching works automatically.

**Print the count of replacements. Expected: 51-53.** If fewer, search for variant patterns:
- `background:"var(--bg-card)",border:"1px solid #1e1e24"` (hardcoded border)
- `background:"var(--bg-card)"` without border (just add shadow+transition after it)

#### 5B. Fix the remaining flat `#131316` background

Search for `background:"#131316"` — replace with `background:"var(--surface-bg)",boxShadow:"var(--surface-shadow)"`.

#### 5C. Fix HomeTile

Find `function HomeTile`. In the outer `<button>`:
- Remove `tile-frost` from className: `"tile tile-frost "` → `"tile "`
- Add to inline style: `background:"var(--surface-bg)",boxShadow:"var(--surface-shadow)"`

After the `.tile-topo` div inside HomeTile, add the accent wash div:
```jsx
<div style={{position:"absolute",top:0,right:0,width:"60%",height:"60%",background:"radial-gradient(circle at top right, "+(color||"#ff6b6b")+"08 0%, transparent 70%)",pointerEvents:"none",zIndex:0}}/>
```

#### 5D. Fix SectionTile

Find `function SectionTile`. Its background is already `var(--bg-card)` so Step 5A should catch it. Verify. If not caught (different pattern), manually replace.

#### 5E. Fix ExpandableCard

`ExpandableCard` currently uses a HARDCODED gradient: `background:"linear-gradient(170deg, #151518 0%, #111114 100%)"`. Replace with `background:"var(--surface-bg)"` and replace its hardcoded boxShadow with `boxShadow:"var(--surface-shadow)"`. This way it matches the system and responds to theme changes.

#### 5F. Fix filter panel surfaces

Search for `linear-gradient(170deg, #151518 0%, #111114 100%)` in filter panels (KumiteDrillsLibrary, StrengthLibrary, MobilityLibrary, WarmupLibrary). Replace with `var(--surface-bg)`.

#### 5G. Kill `.tile-frost` CSS

In the second `<style>` block, find and remove:
- `.tile-frost{...}` and all its variants (`[data-theme="light"] .tile-frost`, `.tile-frost:hover`, etc.)

Update the `.tile` CSS rule to include the surface:
```css
.tile {
  background: var(--surface-bg);
  box-shadow: var(--surface-shadow);
  transition: border-color 0.15s, transform 0.15s, background 0.15s;
}
.tile:active { transform: scale(0.98); }
@media(hover:hover) {
  .tile:hover {
    border-color: var(--border-active);
    transform: translateY(-2px);
  }
}
```

---

### STEP 6: TYPOGRAPHY NORMALIZATION

#### 6A. Hardcoded color → CSS variable replacements

Search and replace across the ENTIRE file (these are text colors used in JSX style objects):

```
color:"#f0eeeb"        → color:"var(--text-primary)"       (11 occurrences)
color:"#b0aead"         → color:"var(--text-muted)"         (1 occurrence)
color:"#666666"         → color:"var(--text-dim)"           (6 occurrences)
color:"#555555"         → color:"var(--text-ghost)"         (6 occurrences)
color:"#9a9996"         → color:"var(--text-muted)"         (2 occurrences)
color:"#f4a261"         → color:"var(--accent-orange)"      (6 occurrences)
color:"#2a9d8f"         → color:"var(--accent-teal)"        (6 occurrences)
color:"#e9c46a"         → color:"var(--accent-gold)"        (2 occurrences)
color:"#457b9d"         → color:"var(--accent-blue)"        (2 occurrences)
color:"#9b5de5"         → color:"var(--accent-purple)"      (2 occurrences)
color:"#ff6b6b"         → color:"var(--accent-red)"         (2 occurrences)
color:"#a0522d"         → color:"var(--accent-brown)"       (6 — add --accent-brown:#a0522d to :root)
```

**Print the count for each replacement.** If any count doesn't match, investigate — some of these hex values may appear in non-color contexts (e.g., background, border). Only replace when the property is `color:`.

#### 6B. Font size consolidation

Reduce 35 font sizes to 8 by mapping nearby values to the scale:

```
fontSize:"0.55rem" → fontSize:"var(--text-xs)"    (0.65rem)
fontSize:"0.58rem" → fontSize:"var(--text-xs)"
fontSize:"0.6rem"  → fontSize:"var(--text-xs)"
fontSize:"0.62rem" → fontSize:"var(--text-xs)"
fontSize:"0.64rem" → fontSize:"var(--text-xs)"
fontSize:"0.65rem" → fontSize:"var(--text-xs)"
fontSize:"0.66rem" → fontSize:"var(--text-xs)"
fontSize:"0.68rem" → fontSize:"var(--text-xs)"

fontSize:"0.7rem"  → fontSize:"var(--text-sm)"    (0.75rem)
fontSize:"0.72rem" → fontSize:"var(--text-sm)"
fontSize:"0.74rem" → fontSize:"var(--text-sm)"
fontSize:"0.75rem" → fontSize:"var(--text-sm)"
fontSize:"0.76rem" → fontSize:"var(--text-sm)"
fontSize:"0.78rem" → fontSize:"var(--text-sm)"
fontSize:"0.8rem"  → fontSize:"var(--text-sm)"

fontSize:"0.82rem" → fontSize:"var(--text-base)"  (0.85rem)
fontSize:"0.84rem" → fontSize:"var(--text-base)"
fontSize:"0.85rem" → fontSize:"var(--text-base)"
fontSize:"0.88rem" → fontSize:"var(--text-base)"
fontSize:"0.9rem"  → fontSize:"var(--text-base)"
fontSize:"0.91rem" → fontSize:"var(--text-base)"
fontSize:"0.92rem" → fontSize:"var(--text-base)"

fontSize:"0.95rem" → fontSize:"var(--text-md)"    (0.95rem)
fontSize:"1rem"    → fontSize:"var(--text-md)"

fontSize:"1.05rem" → fontSize:"var(--text-lg)"    (1.1rem)
fontSize:"1.1rem"  → fontSize:"var(--text-lg)"

fontSize:"1.2rem"  → fontSize:"var(--text-xl)"    (1.3rem)
fontSize:"1.3rem"  → fontSize:"var(--text-xl)"
fontSize:"1.35rem" → fontSize:"var(--text-xl)"
fontSize:"1.4rem"  → fontSize:"var(--text-xl)"
fontSize:"1.5rem"  → fontSize:"var(--text-xl)"

fontSize:"1.6rem"  → fontSize:"var(--text-2xl)"   (2rem)
fontSize:"1.7rem"  → fontSize:"var(--text-2xl)"
fontSize:"2rem"    → fontSize:"var(--text-2xl)"

fontSize:"3rem"    → fontSize:"var(--text-3xl)"   (3rem)
```

**IMPORTANT**: Do NOT replace font sizes inside the `<style>` tags (CSS rules). Only replace inside `style={{...}}` JSX objects. The regex should match `fontSize:"VALUE"` (with the JSX camelCase property name).

#### 6C. Font weight cleanup

Kill `fontWeight:600` — merge to 700:
```
fontWeight:600 → fontWeight:700
```

This leaves 4 weights: 400 (body), 500 (medium), 700 (bold), 800 (display). Clean.

#### 6D. Font family normalization

Replace inconsistent font-family strings:
```
fontFamily:"'DM Sans',system-ui,sans-serif"  → fontFamily:"'DM Sans',sans-serif"
fontFamily:"'Space Mono',monospace"           → fontFamily:mono
```
The second one uses the existing `mono` variable (already used 123 times). The `'Space Mono',monospace` string only appears once.

#### 6E. Line-height consolidation

```
lineHeight:1.1  → lineHeight:1.2
lineHeight:1.2  → lineHeight:1.2
lineHeight:1.25 → lineHeight:1.3
lineHeight:1.3  → lineHeight:1.3
lineHeight:1.35 → lineHeight:1.4
lineHeight:1.4  → lineHeight:1.4
lineHeight:1.45 → lineHeight:1.5
lineHeight:1.5  → lineHeight:1.5
lineHeight:1.55 → lineHeight:1.6
lineHeight:1.6  → lineHeight:1.6
lineHeight:1.65 → lineHeight:1.6
lineHeight:1.7  → lineHeight:1.7
lineHeight:1.75 → lineHeight:1.7
lineHeight:2    → lineHeight:1.7
```

---

### STEP 7: EMOJI → MATERIAL ICONS

#### 7A. Replace HomeTile/StrengthMobilityPage icon props

These pass emoji as the `icon` prop. Replace with `MI` component calls:

In `Home` component:
```
icon="🎓"  → icon={MI({name:"school",size:20})}
icon="🏛️"  → icon={MI({name:"account_balance",size:20})}
icon="☯️"  → icon={MI({name:"contrast",size:20})}
icon="👊"  → icon={MI({name:"sports_martial_arts",size:20})}
icon="🥋"  → icon={MI({name:"dry_cleaning",size:20})}
icon="🤜"  → icon={MI({name:"sports_martial_arts",size:20})}
icon="🥊"  → icon={MI({name:"sports_mma",size:20})}
icon="🔪"  → icon={MI({name:"swords",size:20})}
icon="🔤"  → icon={MI({name:"translate",size:20})}
icon="📚"  → icon={MI({name:"library_books",size:20})}
icon="💪"  → icon={MI({name:"fitness_center",size:20})}
```

In `StrengthMobilityPage`:
```
icon="💪"  → icon={MI({name:"fitness_center",size:20})}
icon="🧘"  → icon={MI({name:"self_improvement",size:20})}
icon="🔴"  → icon={MI({name:"exercise",size:20})}
icon="🔥"  → icon={MI({name:"local_fire_department",size:20})}
```

In `SportKumiteHub` (SectionTile calls — search for emoji in that component):
```
Replace each emoji icon prop with the corresponding MI call.
```

Note: `MI()` returns a React element. `HomeTile` and `SectionTile` render `{icon}` inside a container — this works with React elements just like strings.

#### 7B. Replace icon strings in DATA constants

These store `icon:"EMOJI"` as string fields. Replace with Material Symbol names:

**KIHON_SECTIONS** (and KIHON_SECTIONS_PT if exists):
```
icon:"👊" → icon:"sports_martial_arts"
icon:"🎯" → icon:"my_location"
icon:"🦶" → icon:"footprint"
icon:"🤚" → icon:"pan_tool"
icon:"🦵" → icon:"sprint"
icon:"🛡️" → icon:"shield"
icon:"✋" → icon:"back_hand"
icon:"👣" → icon:"directions_walk"
```

**WEAPONS_DATA** (and WEAPONS_DATA_PT):
```
icon:"🔪" → icon:"swords"
icon:"🧎" → icon:"accessibility_new"
icon:"⚔️" → icon:"swords"
icon:"🤸" → icon:"sports_gymnastics"
```

**HISTORY_PAGES** (and HISTORY_PAGES_PT):
```
icon:"🏛️" → icon:"account_balance"
icon:"🌏" → icon:"public"
icon:"🏢" → icon:"domain"
icon:"🇵🇹" → icon:"public"
```

**PRINCIPLES_PAGES** (and PRINCIPLES_PAGES_PT):
```
icon:"📋" → icon:"assignment"
icon:"☯️" → icon:"contrast"
icon:"💨" → icon:"air"
icon:"🥊" → icon:"sports_mma"
icon:"📖" → icon:"menu_book"
icon:"⛩️" → icon:"temple_buddhist"
```

#### 7C. Update components that RENDER data constant icons

Components that read `.icon` from data and render it as text now receive Material Symbol names. Update these render patterns:

Wherever you find `<span style={{fontSize:"1.2rem"}}>{w.icon}</span>` or similar emoji-rendering spans, replace with:
```jsx
<MI name={w.icon} size={20}/>
```

Match the variable name used (`w.icon`, `section.icon`, `item.icon`, `page.icon`, `p.icon`, `cat.icon`).

**Key components to update:**
- `WeaponsView` — `{w.icon}` in weapon group headers
- `KihonView` — `{section.icon}` in kihon section headers
- `HistoryView` — `{page.icon}` in history tiles
- `PrinciplesView` — `{p.icon}` in principle tiles
- Any other component looping over data with an `icon` field

#### 7D. Nav drawer icons

Find emoji in the NavDrawer component and replace:
```
💪 → MI({name:"fitness_center",size:18})
📜 → MI({name:"description",size:18})
🎓 → MI({name:"school",size:18})
🥊 → MI({name:"sports_mma",size:18})
```
And any others.

#### 7E. Filter button

Replace 🔍 with `MI({name:"tune",size:16})` (use "tune" for filter, not "search" — it's a filter toggle, not a search box).

#### 7F. Theme toggle

Replace ☀️/🌙 with:
```
MI({name:"light_mode",size:18}) / MI({name:"dark_mode",size:18})
```

#### 7G. Footer

Remove 🥋 from footer. Plain text: `Wado-Ryū Handbook v56 · AWIKP`

#### 7H. Final emoji audit

Search for ALL remaining emoji characters. Only 🇬🇧 and 🇵🇹 (language toggle flags) should survive. Print any others with context.

---

### STEP 8: VERIFY

Print final counts:
1. `var(--surface-bg)` occurrences (expected: ~59, all card surfaces)
2. `var(--surface-shadow)` occurrences (expected: ~59)
3. `var(--bg-card)` in background properties (expected: 0)
4. `background:"#131316"` (expected: 0)
5. `linear-gradient(170deg, #151518` hardcoded (expected: 0 — all replaced with var)
6. `fontSize:` values — print unique list (expected: 8, all using var(--text-*))
7. `fontWeight:600` (expected: 0)
8. Remaining hardcoded hex `color:"#` values (list them — should be near-zero, only edge cases)
9. Remaining emoji (non-flag) (expected: 0)
10. `material-symbols-rounded` class usage count (expected: matches emoji replacement count)
11. File size in KB

### BUMP VERSION

Footer: `Wado-Ryū Handbook v56 · AWIKP` (EN and PT)

### DO NOT:
- Change data content (technique descriptions, translations)
- Change routing, navigation, or component hierarchy
- Touch any base64 image data
- Change colour palette hex values (only MOVE them from inline to CSS vars)
- Remove the topo SVG overlay inside HomeTile
- Change the ExpandableCard component logic (only normalize its styling to use tokens)
- Break the `<style>` CSS in the process — validate CSS syntax
```

---

## Phase 10 Summary

| Version | Phase | Status | Description |
|---|---|---|---|
| v48 | Content | ✅ Done | Embed Kumite Drills JSON + Build Library Page |
| v49 | Content | ✅ Done | Restructure Sport Kumite Page |
| v50 | Content | ✅ Done | Embed Strength-Mobility + Warmup JSONs + Build Library Pages |
| v51 | Content | ✅ Done | Restructure Home + Kill Exercise Library + Kill Supporting |
| v52 | Content | ✅ Done | Filter Dropdown + Multi-Column Grid |
| v53 | Cleanup | ✅ Done | Code Cleanup + Shared Component Consolidation |
| v54 | UI | ✅ Done | Responsive Breakpoints + Elevated Design (partial) |
| v55 | Polish | ✅ Done | Final Cleanup + Polish Pass |
| v56 | UI | ✅ Done | Design System Normalization + Icon System |
| v57 | UI | ✅ Done | Incremental fixes |

---

# Phase 12 — CSS Consolidation + Visual Unification

> Phase 12 starts from `karate-handbook-v57.html`. Three prompts: v58 (CSS classes), v59 (component unification + gradients), v60 (WCAG + light mode + polish).

---

## v58: CSS Class System + Inline Style Purge

```
## v58: CSS class system + inline style purge

**TARGET FILE**: `karate-handbook-v57.html`
**VERSION**: Bump to v58 in filename (`karate-handbook-v58.html`) and footer.

### ⛔ MANDATORY CONSTRAINTS — READ BEFORE DOING ANYTHING

1. **Do NOT read the full HTML into your context.** The file is 10MB+. If you try to `cat` it, `view` it, or load it into a variable in your context, you will truncate and corrupt it. You will ONLY interact with this file through a Python script.
2. **Write a single Python script** that uses `open(SRC).read()` into a Python variable (Python can handle 10MB strings — your context window cannot), performs all edits via `.find()`, `.replace()`, slicing, or `re.sub()`, then writes the result to the new filename.
3. **Do NOT use multiple scripts** or split into steps that read/write the file multiple times. One script, one read, all edits in memory, one write.
4. **Do NOT assume structure** — always search for exact strings. If a search target returns 0 hits, print a warning and skip that step. Do not guess or fabricate replacement targets.
5. **Preserve ALL base64 image data** — never match patterns inside `data:image` strings. When using regex, ensure your patterns cannot match across base64 content.
6. **After writing the output file**, print a verification report: file size, count of key patterns (listed in VERIFY section below), and any warnings. If the output file is smaller than 95% of the input file, print an ERROR and exit — something went wrong.
7. **Script must delete itself** when done (add `os.remove(__file__)` in a finally block). Delete the old version HTML only after confirming the new file exists and passes the size check.

### APP ARCHITECTURE (read this — you have no prior context)

This is a **single-file React app** inside one HTML file. `<style>` tag for CSS, `<script type="text/babel">` for all React components/data/logic. Components use inline `style={{}}` objects — **this is the problem**. Hash-based routing with `viewToHash`/`hashToView` and a view-switch in the App component. Translations via `tL("key")` with `LANG` variable ('en' or 'pt'). Bilingual JSON data uses `{en:"...", pt:"..."}` — components read `field[LANG]`.

**Current state of the CSS (the mess this prompt fixes):**
- 510 inline `style={{}}` objects across ~60 components
- 45 exact copies of the same card style blob: `background:"linear-gradient(160deg, rgba(255,25,67,0.03) 0%, #131316 40%, #111114 100%)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:14,boxShadow:"var(--surface-shadow)",transition:"all 0.15s ease"`
- 59 instances of the gradient background string duplicated
- 83 × `borderRadius:14` scattered as inline values
- `.card` CSS class defined but NEVER used by any component
- Arial still renders in some places — DM Sans / Space Mono not enforced everywhere

**Existing CSS token system (already defined in `:root`, keep these):**
- Typography: `--text-xs` through `--text-3xl` (8 levels)
- Spacing: `--sp-1` through `--sp-7`
- Surface: `--surface-bg`, `--surface-shadow`, `--surface-border`
- Colors: `--accent-red`, `--accent-aqua`, `--accent-orange`, `--accent-teal`, `--accent-gold`, `--accent-purple`, `--accent-blue`, `--accent-brown`
- Faint/glow variants: `--accent-red-faint`, `--accent-red-glow`, etc.
- Light theme overrides in `[data-theme="light"]`

**Existing CSS classes (defined but mostly unused):**
- `.tile` — has borderRadius, boxShadow, transition, :active, :hover. Used by HomeTile only.
- `.card` — has background, border, borderRadius, boxShadow, transition. Used by NOTHING.
- `.card-interactive` — cursor, :active, :hover. Used by NOTHING.
- `.text-page-title`, `.text-section-label`, `.text-card-title`, `.text-body`, `.text-meta` — typography classes. Used by NOTHING.
- `.badge` — inline-block, font styling. Used by NOTHING.

### STEP 1: FONT RENDERING AUDIT + FIX

Search the ENTIRE file for font-family declarations. Fix all issues:

1. Search for `Arial`, `Helvetica`, `Roboto`, `Inter` in any font-family value (both CSS and inline JSX). List every occurrence with line number and context.
2. Search for `font-family:` and `fontFamily:` declarations that use `system-ui` WITHOUT `'DM Sans'` preceding it. These will fall through to Arial on most systems.
3. Search for elements that have NO fontFamily set but render text (buttons, spans with onClick, input elements). These inherit from body which is fine IF body uses DM Sans — verify the body rule.
4. **Fix**: Every `fontFamily` in the file must be one of:
   - `"'DM Sans',sans-serif"` (body text — the `sans-serif` is a safe fallback that won't show Arial)
   - `mono` (the existing variable referencing `'Space Mono',monospace`)
   - `"'Material Symbols Rounded'"` (icon font — leave alone)
5. In the `<style>` tag, add `input, button, select, textarea { font-family: 'DM Sans', sans-serif; }` to prevent browser defaults.
6. Verify the `<link>` tag loads DM Sans with weights 400, 500, 700, 800 and Space Mono with 400, 700. If weight 800 is missing, add it (needed for `.text-page-title`).

Print: total font-family declarations found, how many fixed, any remaining non-conforming values.

### STEP 2: DEFINE TILE GRADIENT CSS CLASSES

Add these CSS classes to the `<style>` block. These define the **gradient system** for tiles across the app. All gradients run **top-left to bottom-right** (135deg or 160deg diagonal), NOT top-right radial.

**Dark mode (`:root`) — tile surface gradient classes:**

```css
/* === Tile gradient system === */
/* Single-color gradients (secondary) */
.tile-grad-red { background: linear-gradient(160deg, rgba(255,25,67,0.08) 0%, var(--surface-bg) 45%, var(--bg) 100%); }
.tile-grad-aqua { background: linear-gradient(160deg, rgba(0,212,232,0.08) 0%, var(--surface-bg) 45%, var(--bg) 100%); }
.tile-grad-gold { background: linear-gradient(160deg, rgba(233,196,106,0.08) 0%, var(--surface-bg) 45%, var(--bg) 100%); }

/* Dual-color gradients (primary) — top-left accent → bottom-right accent */
.tile-grad-red-aqua { background: linear-gradient(160deg, rgba(255,25,67,0.08) 0%, var(--surface-bg) 40%, rgba(0,212,232,0.06) 100%); }
.tile-grad-aqua-red { background: linear-gradient(160deg, rgba(0,212,232,0.08) 0%, var(--surface-bg) 40%, rgba(255,25,67,0.06) 100%); }
.tile-grad-red-gold { background: linear-gradient(160deg, rgba(255,25,67,0.08) 0%, var(--surface-bg) 40%, rgba(233,196,106,0.06) 100%); }
.tile-grad-gold-red { background: linear-gradient(160deg, rgba(233,196,106,0.08) 0%, var(--surface-bg) 40%, rgba(255,25,67,0.06) 100%); }
.tile-grad-aqua-gold { background: linear-gradient(160deg, rgba(0,212,232,0.08) 0%, var(--surface-bg) 40%, rgba(233,196,106,0.06) 100%); }
.tile-grad-gold-aqua { background: linear-gradient(160deg, rgba(233,196,106,0.08) 0%, var(--surface-bg) 40%, rgba(0,212,232,0.06) 100%); }

/* Belt-color exam tile gradients (mono-hue, two tones) */
.tile-belt-white { background: linear-gradient(160deg, rgba(240,238,235,0.10) 0%, var(--surface-bg) 50%, rgba(200,198,195,0.04) 100%); }
.tile-belt-yellow { background: linear-gradient(160deg, rgba(233,196,106,0.12) 0%, var(--surface-bg) 50%, rgba(200,160,60,0.05) 100%); }
.tile-belt-orange { background: linear-gradient(160deg, rgba(244,162,97,0.12) 0%, var(--surface-bg) 50%, rgba(210,130,60,0.05) 100%); }
.tile-belt-green { background: linear-gradient(160deg, rgba(42,157,143,0.12) 0%, var(--surface-bg) 50%, rgba(30,120,100,0.05) 100%); }
.tile-belt-blue { background: linear-gradient(160deg, rgba(69,123,157,0.12) 0%, var(--surface-bg) 50%, rgba(50,95,130,0.05) 100%); }
.tile-belt-red { background: linear-gradient(160deg, rgba(255,25,67,0.10) 0%, var(--surface-bg) 50%, rgba(180,20,50,0.05) 100%); }
.tile-belt-brown { background: linear-gradient(160deg, rgba(183,105,68,0.12) 0%, var(--surface-bg) 50%, rgba(140,80,50,0.05) 100%); }
.tile-belt-dan { background: linear-gradient(160deg, rgba(240,238,235,0.08) 0%, var(--surface-bg) 50%, rgba(30,30,35,0.10) 100%); }
```

**Light mode overrides** — add inside `[data-theme="light"]`:
```css
[data-theme="light"] .tile-grad-red { background: linear-gradient(160deg, rgba(196,18,48,0.06) 0%, var(--surface-bg) 45%, var(--bg) 100%); }
[data-theme="light"] .tile-grad-aqua { background: linear-gradient(160deg, rgba(11,117,128,0.06) 0%, var(--surface-bg) 45%, var(--bg) 100%); }
[data-theme="light"] .tile-grad-gold { background: linear-gradient(160deg, rgba(135,109,31,0.06) 0%, var(--surface-bg) 45%, var(--bg) 100%); }
[data-theme="light"] .tile-grad-red-aqua { background: linear-gradient(160deg, rgba(196,18,48,0.06) 0%, var(--surface-bg) 40%, rgba(11,117,128,0.04) 100%); }
[data-theme="light"] .tile-grad-aqua-red { background: linear-gradient(160deg, rgba(11,117,128,0.06) 0%, var(--surface-bg) 40%, rgba(196,18,48,0.04) 100%); }
[data-theme="light"] .tile-grad-red-gold { background: linear-gradient(160deg, rgba(196,18,48,0.06) 0%, var(--surface-bg) 40%, rgba(135,109,31,0.04) 100%); }
[data-theme="light"] .tile-grad-gold-red { background: linear-gradient(160deg, rgba(135,109,31,0.06) 0%, var(--surface-bg) 40%, rgba(196,18,48,0.04) 100%); }
[data-theme="light"] .tile-grad-aqua-gold { background: linear-gradient(160deg, rgba(11,117,128,0.06) 0%, var(--surface-bg) 40%, rgba(135,109,31,0.04) 100%); }
[data-theme="light"] .tile-grad-gold-aqua { background: linear-gradient(160deg, rgba(135,109,31,0.06) 0%, var(--surface-bg) 40%, rgba(11,117,128,0.04) 100%); }
/* Belt tiles in light mode — same pattern, lighter opacity */
[data-theme="light"] .tile-belt-white { background: linear-gradient(160deg, rgba(100,100,100,0.06) 0%, var(--surface-bg) 50%, rgba(60,60,60,0.03) 100%); }
[data-theme="light"] .tile-belt-yellow { background: linear-gradient(160deg, rgba(180,150,40,0.08) 0%, var(--surface-bg) 50%, rgba(150,120,20,0.03) 100%); }
[data-theme="light"] .tile-belt-orange { background: linear-gradient(160deg, rgba(200,130,60,0.08) 0%, var(--surface-bg) 50%, rgba(170,100,40,0.03) 100%); }
[data-theme="light"] .tile-belt-green { background: linear-gradient(160deg, rgba(30,120,100,0.08) 0%, var(--surface-bg) 50%, rgba(20,90,75,0.03) 100%); }
[data-theme="light"] .tile-belt-blue { background: linear-gradient(160deg, rgba(50,95,130,0.08) 0%, var(--surface-bg) 50%, rgba(35,70,100,0.03) 100%); }
[data-theme="light"] .tile-belt-red { background: linear-gradient(160deg, rgba(196,18,48,0.07) 0%, var(--surface-bg) 50%, rgba(150,15,35,0.03) 100%); }
[data-theme="light"] .tile-belt-brown { background: linear-gradient(160deg, rgba(140,80,50,0.08) 0%, var(--surface-bg) 50%, rgba(110,60,35,0.03) 100%); }
[data-theme="light"] .tile-belt-dan { background: linear-gradient(160deg, rgba(40,40,45,0.06) 0%, var(--surface-bg) 50%, rgba(200,200,200,0.04) 100%); }
```

**Shared tile base:**
```css
.nav-tile {
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--surface-shadow);
  transition: all 0.15s ease, transform 0.15s ease;
  padding: 1.25rem;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.nav-tile:active { transform: scale(0.98); }
@media(hover:hover) { .nav-tile:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05); transform: translateY(-2px); border-color: var(--border-active); } }

.nav-tile-big { padding: 1.5rem 1.4rem; }
.nav-tile-row { flex-direction: row; align-items: center; gap: 0.8rem; }
```

**Content card (static containers):**
```css
.content-card {
  background: linear-gradient(160deg, rgba(255,25,67,0.03) 0%, var(--surface-bg) 40%, var(--bg) 100%);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 14px;
  box-shadow: var(--surface-shadow);
  transition: all 0.15s ease;
  padding: 1rem;
}
[data-theme="light"] .content-card {
  background: linear-gradient(160deg, rgba(196,18,48,0.03) 0%, var(--surface-bg) 40%, var(--bg) 100%);
  border-color: rgba(0,0,0,0.06);
}
```

**Icon container (for tile icons — BIGGER than current):**
```css
.tile-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.4rem;
}
.tile-icon-big {
  width: 52px;
  height: 52px;
  font-size: 1.6rem;
}
.tile-icon-sm {
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
}
```

### STEP 3: REPLACE THE 45 IDENTICAL CARD BLOBS

Search for all occurrences of this exact pattern (the 45 copies):
```
background:"linear-gradient(160deg, rgba(255,25,67,0.03) 0%, #131316 40%, #111114 100%)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:14,boxShadow:"var(--surface-shadow)"
```

For each occurrence, determine whether it's a **tappable element** (has `onClick` or is a `<button>`) or a **static container** (`<div>` without onClick):

- **Static containers** (description blocks, photo wrappers, attacker/defender sections, content panels): Replace the inline style properties with `className="content-card"`. Keep other style properties (margin, padding overrides) inline but remove background, border, borderRadius, boxShadow, transition from the inline object.
- **Tappable elements** (list item buttons, navigation cards): DON'T replace yet — these become NavTiles in v59.

For static containers, the replacement pattern is:
```
BEFORE: <div style={{background:"linear-gradient(160deg, rgba(255,25,67,0.03) 0%, #131316 40%, #111114 100%)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:14,boxShadow:"var(--surface-shadow)",transition:"all 0.15s ease",padding:"1rem",marginTop:"0.5rem"}}>
AFTER:  <div className="content-card" style={{marginTop:"0.5rem"}}>
```

If the remaining inline style object would be empty `style={{}}`, remove the style attribute entirely.

Count and report: how many static containers converted, how many tappable elements deferred.

### STEP 4: REPLACE REMAINING INLINE CARD STYLES

After Step 3, search for any remaining inline `background:"linear-gradient(160deg` or `background:"var(--surface-bg)"` that should use a CSS class. Handle:

1. `background:"var(--bg-code)"` — leave as-is (code blocks are intentionally different)
2. Inputs with the gradient — add `className="content-card"`, keep input-specific styles
3. Any remaining `borderRadius:14` without a className — if the element already has a class that provides border-radius, remove the inline value. If not, add the appropriate class.

### STEP 5: VERIFY

Print final counts:
1. Remaining inline `background:"linear-gradient(160deg` (expected: only in tappable elements deferred for v59)
2. Remaining inline `borderRadius:14` (expected: significantly reduced)
3. `.content-card` class usage count (expected: ~30-40)
4. Font-family values — unique list (expected: only DM Sans, mono variable, Material Symbols)
5. Any `Arial` or `Helvetica` in font-family (expected: 0)
6. File size in KB

### BUMP VERSION

Footer: `Wado-Ryū Handbook v58 · AWIKP` (EN and PT)

### DO NOT:
- **Read the file into your context window** — only through a Python script's variable
- **Write multiple scripts** — one script, one read, one write
- **Use `cat`, `head`, `tail`, `view`, or `grep` on the HTML** to preview before scripting — you don't need to see it, the patterns are specified exactly above
- Change any tile gradient colors or directions (that's v59's gradient application)
- Change component hierarchy or routing
- Touch base64 image data
- Touch data content (technique descriptions, translations)
- Change the existing `:root` CSS variables — only ADD new classes
- Remove the topo SVG overlay from HomeTile
- Convert tappable elements to NavTile yet (that's v59)
```

---

## v59: Component Unification + Gradient Application

```
## v59: Component unification + gradient application

**TARGET FILE**: `karate-handbook-v58.html`
**VERSION**: Bump to v59 in filename (`karate-handbook-v59.html`) and footer.

### ⛔ MANDATORY CONSTRAINTS — READ BEFORE DOING ANYTHING

1. **Do NOT read the full HTML into your context.** The file is 10MB+. If you try to `cat` it, `view` it, or load it into a variable in your context, you will truncate and corrupt it. You will ONLY interact with this file through a Python script.
2. **Write a single Python script** that uses `open(SRC).read()` into a Python variable (Python can handle 10MB strings — your context window cannot), performs all edits via `.find()`, `.replace()`, slicing, or `re.sub()`, then writes the result to the new filename.
3. **Do NOT use multiple scripts** or split into steps that read/write the file multiple times. One script, one read, all edits in memory, one write.
4. **Do NOT assume structure** — always search for exact strings. If a search target returns 0 hits, print a warning and skip that step. Do not guess or fabricate replacement targets.
5. **Preserve ALL base64 image data** — never match patterns inside `data:image` strings.
6. **After writing the output file**, print a verification report: file size, count of key patterns (listed in VERIFY section below), and any warnings. If the output file is smaller than 95% of the input file, print an ERROR and exit — something went wrong.
7. **Script must delete itself** when done (add `os.remove(__file__)` in a finally block). Delete the old version HTML only after confirming the new file exists and passes the size check.
8. **When replacing function definitions** (HomeTile → NavTile), use brace-depth counting to find the exact function boundaries. Do NOT use regex to match the entire function — functions can be 1000+ chars. Find the start with regex, then count `{` and `}` to find the end.

### APP ARCHITECTURE (read this — you have no prior context)

Single-file React app. `<style>` + `<script type="text/babel">`. Hash routing. `LANG` variable for en/pt.

**What v58 changed:**
- Added CSS classes: `.nav-tile`, `.nav-tile-big`, `.nav-tile-row`, `.content-card`, `.tile-icon`, `.tile-icon-big`, `.tile-icon-sm`
- Added tile gradient classes: `.tile-grad-red`, `.tile-grad-aqua`, `.tile-grad-gold`, 6 dual-color combos, 8 belt-color classes
- Converted ~30-40 static content containers from inline styles to `.content-card` className
- Fixed all font-family declarations (DM Sans + Space Mono everywhere, zero Arial)
- Tappable tile elements still have inline styles — this prompt converts them

**Current tile components:**
- `HomeTile({icon, name, desc, color, onClick, big, className})` — used on home page. Has topo SVG overlay. Uses inline styles for background gradient, icon container, text.
- `SectionTile({icon, name, desc, color, onClick, badge})` — used on Sport Kumite subpage. Different structure from HomeTile (horizontal layout). Inline styles.
- Various inline-styled `<button>` elements across: KataListView, KumiteFormsView, KihonView, HistoryView, PrinciplesView, WeaponsView, GlossaryView, ExamListView, StrengthMobilityPage.

**Tile gradient assignment (FOLLOW THIS EXACTLY):**

HOME PAGE:
- "Exam Syllabus" (big) → `.tile-grad-gold`
- "History" → `.tile-grad-gold-aqua`
- "Principles" → `.tile-grad-aqua-gold`
- "Kihon" → `.tile-grad-gold-red`
- "Kata" → `.tile-grad-red-gold`
- "Kumite Forms" (span2) → `.tile-grad-gold`
- "SPORT KUMITE" (big) → `.tile-grad-red-aqua`
- "Weapons & Defence" (big) → `.tile-grad-aqua-red`
- "Glossary" → `.tile-grad-aqua`
- "Créditos" / "Credits" → `.tile-grad-red`
- "Strength & Mobility" (section tiles on S&M page) → `.tile-grad-aqua-gold`

SPORT KUMITE SUBPAGE (SectionTile instances):
- "Kumite Drills Library" → `.tile-grad-red`
- "Session Library" → `.tile-grad-red-aqua`
- "Referee Signals" → `.tile-grad-aqua-red`
- "WKF Rules" → `.tile-grad-aqua`

STRENGTH & MOBILITY SUBPAGE:
- "Strength" → `.tile-grad-red`
- "Mobility" → `.tile-grad-gold`
- "Karate Specific" → `.tile-grad-red-gold`
- "Warm-Up" → `.tile-grad-aqua`

LIST VIEWS (kata list, kumite forms list, kihon sections list, history list, principles list, weapons list, glossary groups):
- These are simpler navigational tiles. Use `.tile-grad-red` as default unless the page has a different accent:
  - Kata list items → `.tile-grad-gold-red`
  - Kumite forms items → `.tile-grad-red`
  - Kihon section items → `.tile-grad-red-gold`
  - History items → `.tile-grad-gold`
  - Principles items → `.tile-grad-aqua-gold`
  - Weapons group items → `.tile-grad-aqua`
  - Glossary category items → `.tile-grad-aqua`

EXAM TILES:
- Each kyu grade tile gets its belt color class:
  - 8th Kyu → `.tile-belt-yellow`
  - 7th Kyu → `.tile-belt-orange`
  - 6th Kyu → `.tile-belt-green`
  - 5th Kyu → `.tile-belt-blue`
  - 4th Kyu → `.tile-belt-red`
  - 3rd–1st Kyu → `.tile-belt-brown`
  - Dan grades → `.tile-belt-dan`

### STEP 1: MERGE SECTIONTILE INTO HOMETILE → NAVTILE

Delete the `SectionTile` component function. Create a unified `NavTile` component:

```jsx
function NavTile({icon, name, desc, color, onClick, big, className, gradClass, badge, row}) {
  return <button className={"nav-tile " + (big ? "nav-tile-big " : "") + (row ? "nav-tile-row " : "") + (gradClass || "tile-grad-red") + " " + (className || "")} onClick={onClick}>
    {/* topo SVG overlay only on big tiles */}
    {big && <div className="bgfx-topo tile-topo" style={{zIndex:0}} dangerouslySetInnerHTML={{__html:TOPO_SVG}}/>}
    <div style={{position:"relative",zIndex:1,display:"flex",alignItems:row?"row":"column",gap:row?"0.8rem":"0.4rem"}}>
      <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
        <span className={"tile-icon" + (big ? " tile-icon-big" : "")} style={{background:color ? color+"15" : "var(--accent-red-faint)", color: color || "var(--accent-red)"}}>{icon}</span>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:big?"var(--text-lg)":"var(--text-md)",color:"var(--text-primary)",lineHeight:1.2}}>{tL(name)}</span>
        {badge}
      </div>
      {desc && <span style={{fontSize:"var(--text-base)",color:"var(--text-secondary)",lineHeight:1.5}}>{desc}</span>}
    </div>
  </button>;
}
```

Update ALL call sites:
- `HomeTile` calls → `NavTile` calls with `gradClass` prop added
- `SectionTile` calls → `NavTile` calls with `row` prop and `gradClass` prop

### STEP 2: CONVERT ALL INLINE-STYLED LIST BUTTONS TO NAVTILE

For every list view that renders tappable `<button>` elements with the inline gradient blob, convert to NavTile:

**KataListView** — kata cards currently:
```jsx
<button style={{width:"100%",background:"linear-gradient(160deg,...)",border:...,borderRadius:14,...,padding:"1rem",cursor:"pointer",...}}>
```
Replace with:
```jsx
<NavTile gradClass="tile-grad-gold-red" icon={<MI name="dry_cleaning" size={20}/>} .../>
```
Or if the list uses a map with a number badge, use NavTile with `row` layout.

Apply the same pattern to: KumiteFormsView, KihonView, HistoryView, PrinciplesView, WeaponsView (both group headers and item buttons), GlossaryView, ExamListView.

For each view:
1. Find the `<button` or `<div` with `onClick` that uses the inline gradient blob
2. Replace with `<NavTile>` using the gradient assignment from the table above
3. Keep the same onClick, icon, name, and desc
4. For numbered items (kata, kumite forms, weapon items), use the number badge as the icon inside a `.tile-icon-sm` span

### STEP 3: ICON SIZING

Find all icon containers (the `<span>` wrapping `MI()` calls inside tiles). Current sizes:
- HomeTile big: 48×48 → change to 52×52 (use `.tile-icon-big`)
- HomeTile normal: 40×40 → change to 44×44 (use `.tile-icon`)
- List item icons: 24-32px → change to 32×32 (use `.tile-icon-sm`)
- Icon font size inside containers: increase by ~4px (e.g. `size:20` → `size:24` for big tiles, `size:18` → `size:20` for normal)

Search for all `MI({name:` calls and their container `<span>` elements. Update sizes.

### STEP 4: EQUAL TILE HEIGHTS

Find all grid containers that hold tiles (`.home-2`, `.home-tech`, `.lvgrid`, `.lvgrid3`, `.wpgrid`, `.wgrid`, `.lib-grid`). Add `align-items: stretch` to each CSS class definition. NavTile already has `height: 100%` via the `.nav-tile` class.

Verify: in the same grid row, tiles with more text don't make siblings shorter. All tiles in a row stretch to the tallest tile's height.

### STEP 5: EXAM TILE GRADIENT APPLICATION

Find the ExamListView component (renders kyu and dan grade cards). Each grade card should:
1. Use `NavTile` with the belt-color gradient class
2. The icon container background should use the belt color (e.g. `background: "#e9c46a22"` for yellow belt)
3. The grade number or name should be the icon text
4. The belt color swatch (if any top bar exists) should match

Map each grade to its belt class:
```
8th Kyu (Yellow)     → gradClass="tile-belt-yellow"
7th Kyu (Orange)     → gradClass="tile-belt-orange"
6th Kyu (Green)      → gradClass="tile-belt-green"
5th Kyu (Blue)       → gradClass="tile-belt-blue"
4th Kyu (Red)        → gradClass="tile-belt-red"
3rd Kyu (Brown)      → gradClass="tile-belt-brown"
2nd Kyu (Brown)      → gradClass="tile-belt-brown"
1st Kyu (Brown)      → gradClass="tile-belt-brown"
1st Dan – 5th Dan    → gradClass="tile-belt-dan"
```

### STEP 6: VERIFY

Print:
1. `NavTile` usage count (expected: all tappable tiles, ~60-80 instances)
2. `SectionTile` references (expected: 0 — deleted)
3. `HomeTile` references (expected: 0 — replaced by NavTile)
4. Remaining inline `background:"linear-gradient(160deg` on `<button>` elements (expected: 0)
5. Remaining inline `borderRadius:14` (expected: near zero — only edge cases)
6. `.tile-grad-*` class usage breakdown
7. `.tile-belt-*` class usage breakdown
8. `.tile-icon` / `.tile-icon-big` / `.tile-icon-sm` counts
9. File size in KB

### BUMP VERSION

Footer: `Wado-Ryū Handbook v59 · AWIKP` (EN and PT)

### DO NOT:
- **Read the file into your context window** — only through a Python script's variable
- **Write multiple scripts** — one script, one read, one write
- **Use `cat`, `head`, `tail`, `view`, or `grep` on the HTML** to preview before scripting — the patterns are specified exactly above
- Change gradient colors or opacities defined in v58 CSS classes
- Change data content, routing, or component hierarchy
- Touch base64 image data
- Remove topo SVG from big tiles
- Change the ExpandableCard component (library drill/exercise cards stay as-is)
- Change filter pills or library grid styling
```

---

## v60: WCAG Audit + Light Mode + Final Polish

```
## v60: WCAG audit + light mode + final polish

**TARGET FILE**: `karate-handbook-v59.html`
**VERSION**: Bump to v60 in filename (`karate-handbook-v60.html`) and footer.

### ⛔ MANDATORY CONSTRAINTS — READ BEFORE DOING ANYTHING

1. **Do NOT read the full HTML into your context.** The file is 10MB+. If you try to `cat` it, `view` it, or load it into a variable in your context, you will truncate and corrupt it. You will ONLY interact with this file through a Python script.
2. **Write a single Python script** that uses `open(SRC).read()` into a Python variable (Python can handle 10MB strings — your context window cannot), performs all edits via `.find()`, `.replace()`, slicing, or `re.sub()`, then writes the result to the new filename.
3. **Do NOT use multiple scripts** or split into steps that read/write the file multiple times. One script, one read, all edits in memory, one write.
4. **Do NOT assume structure** — always search for exact strings. If a search target returns 0 hits, print a warning and skip that step.
5. **Preserve ALL base64 image data** — never match patterns inside `data:image` strings.
6. **After writing the output file**, print a verification report: file size, count of key patterns (listed in VERIFY section below), and any warnings. If the output file is smaller than 95% of the input file, print an ERROR and exit.
7. **Script must delete itself** when done. Delete the old version HTML only after confirming the new file exists and passes the size check.
8. **WCAG contrast computation**: Use the exact WCAG 2.2 relative luminance formula. Do NOT approximate. The `relative_luminance` function must linearize sRGB channels (threshold 0.04045, gamma 2.4). Contrast ratio = `(L1 + 0.05) / (L2 + 0.05)` where L1 > L2. AA threshold: 4.5:1 normal text, 3.0:1 large text (≥18px or bold ≥14px).
9. **When fixing contrast failures**, make the MINIMUM adjustment needed to pass. Do not blow up the palette. Nudge by 5-8 units per channel per iteration until the ratio passes. Print old value, new value, old ratio, new ratio for every fix.

### APP ARCHITECTURE (read this — you have no prior context)

Single-file React app. `<style>` + `<script type="text/babel">`. Hash routing. `LANG` variable for en/pt. `data-theme="light"` attribute toggles light mode.

**What v58–v59 changed:**
- All inline card style blobs replaced with CSS classes (`.content-card`, `.nav-tile` + gradient modifiers)
- Unified `NavTile` component replaces HomeTile + SectionTile + all inline-styled list buttons
- Tile gradient system: 9 gradient classes + 8 belt-color classes, with dark/light variants
- Icon containers sized up (44px normal, 52px big, 32px small)
- Equal tile heights via align-items:stretch
- Font rendering: DM Sans + Space Mono everywhere, zero Arial

### STEP 1: DARK MODE CONTRAST AUDIT

Write a Python script that extracts every text-color / background-color pair used in the app and computes the WCAG 2.2 contrast ratio. Check against AA requirements (4.5:1 for normal text ≤18px, 3:1 for large text >18px or bold >14px).

**Known problem pairs to check:**
1. `--text-muted` (#797e83) on `--surface-bg` (#131316) → compute ratio. If <4.5:1, bump `--text-muted` lighter.
2. `--text-dim` (#4a4f54) on `--surface-bg` (#131316) → compute ratio. If <3:1, bump `--text-dim` lighter. (This is decorative/non-essential text — 3:1 is acceptable.)
3. `--text-ghost` (#363b40) on `--bg` (#0a0d0e) → compute ratio. This is intentionally very dim. If used for ANY readable text (not just decorative), it fails. Search for all uses of `--text-ghost` and verify each is purely decorative.
4. `color:"#666"` (used in some inline styles) on `--surface-bg` (#131316) → compute. #666 on #131316 = ~3.55:1, fails AA normal. Replace #666 with `var(--text-muted)` everywhere.
5. Badge text colors: verify each accent color (red #FF1943, aqua #00d4e8, gold #e9c46a, teal #2a9d8f, orange #f4a261) on their faint backgrounds (e.g. #FF194315 on #131316) meets 3:1 minimum.
6. Gradient tile text: verify `--text-primary` (#f0eeeb) remains readable on the gradient backgrounds (it should — the gradients are very subtle).

**For each failure:** adjust the token value in `:root`. Print the old value, new value, and new contrast ratio. Minimum adjustments — don't blow up the visual design, just nudge values enough to pass.

### STEP 2: LIGHT MODE CONTRAST AUDIT

Switch context to `[data-theme="light"]` values and repeat:

1. `--text-secondary` (#4a4a4a) on `--surface-bg` (#fafaf8) → compute.
2. `--text-muted` (#746f6a) on `--surface-bg` (#fafaf8) → compute.
3. `--text-dim` (#b0aba5) on `--surface-bg` (#fafaf8) → compute. If used for readable text, must pass 3:1.
4. Light-mode accent colors (`--accent-red` #c41230, `--accent-teal` #1e7a6f, `--accent-gold` #876d1f, `--accent-aqua` #0b7580) on `--surface-bg` (#fafaf8) → verify all pass 4.5:1 for text use.
5. Light-mode tile gradients: verify text remains readable on the lighter gradient backgrounds.
6. Light-mode badge text on badge backgrounds: accent colors on their faint fills.

**For each failure:** adjust the `[data-theme="light"]` token value. Document changes.

### STEP 3: INLINE COLOR CLEANUP

Search for ALL remaining hardcoded hex colors in inline styles (inside `style={{...}}`):
1. `color:"#666"` → replace with `color:"var(--text-muted)"`
2. `color:"#555"` → replace with `color:"var(--text-ghost)"`
3. `color:"#dddcd8"` → replace with `color:"var(--text-primary)"`
4. Any other `color:"#` values — list them with context. Replace with the nearest CSS variable.
5. Any `background:"#1e1e24"` → replace with `background:"var(--border)"` (it's the same value)

Expected: zero hardcoded hex colors in inline styles after this step (excluding base64 image data and the `<style>` tag itself).

### STEP 4: TOUCH TARGET AUDIT

Search for ALL elements with `onClick` handlers:
1. Check `height` or `minHeight` — must be ≥44px for standalone tappable elements
2. Check `padding` — must be ≥8px on all sides for tappable elements
3. Check font size on tappable text — must be ≥`var(--text-sm)` (0.75rem = 12px at 16px base)
4. NavTile already has min-height via padding — verify by checking `.nav-tile` CSS

Fix any violations. List fixes made.

### STEP 5: FONT RENDERING FINAL CHECK

Search the ENTIRE file one more time for:
1. `Arial` in any context (expected: 0)
2. `Helvetica` in any context (expected: 0)
3. `system-ui` without `'DM Sans'` (expected: 0)
4. `fontFamily` values that don't match `"'DM Sans',sans-serif"` or `mono` or Material Symbols (expected: 0)
5. `<input`, `<button`, `<select`, `<textarea` elements — verify the CSS reset from v58 applies (`input, button, select, textarea { font-family: 'DM Sans', sans-serif; }`)

### STEP 6: VISUAL CONSISTENCY FINAL AUDIT

Search for orphaned old patterns:
1. `background:"var(--bg-card)"` → should be 0 (replaced by surface classes)
2. `background:"#131316"` → should be 0 (replaced by gradient classes)
3. Inline `borderRadius:14` on elements that have a CSS class providing it → remove the inline value
4. Inline `boxShadow:"var(--surface-shadow)"` on elements that have `.content-card` or `.nav-tile` → remove inline
5. Inline `transition:"all 0.15s ease"` on elements that have a class providing it → remove inline
6. `borderLeft:"3px solid` or `borderLeft:"4px solid` → should be 0
7. Any `function HomeTile` or `function SectionTile` → should be 0 (replaced by NavTile in v59)

Remove all redundant inline styles that duplicate what their CSS class already provides.

### STEP 7: VERIFY

Print comprehensive final report:
1. WCAG contrast ratios for all 10 critical text/bg pairs (dark + light mode)
2. Hardcoded hex colors in inline styles (expected: 0)
3. Font rendering: Arial/Helvetica/system-ui-only count (expected: 0)
4. Touch target violations (expected: 0)
5. Orphaned inline styles duplicating CSS classes (expected: 0)
6. `border-left` accent lines (expected: 0)
7. Total inline `style={{}}` count (expected: significantly reduced from 510)
8. Total CSS class definitions (expected: increased from 65)
9. File size in KB

### BUMP VERSION

Footer: `Wado-Ryū Handbook v60 · AWIKP` (EN and PT)

### DO NOT:
- **Read the file into your context window** — only through a Python script's variable
- **Write multiple scripts** — one script, one read, one write
- **Use `cat`, `head`, `tail`, `view`, or `grep` on the HTML** to preview before scripting — the patterns are specified exactly above
- Change gradient colors or tile assignments from v59
- Change component hierarchy or routing
- Touch base64 image data
- Touch data content
- Change gradient opacities more than necessary for contrast compliance — minimum nudge to pass AA, nothing more
- Remove any CSS classes defined in v58 (even if seemingly unused — they may be used dynamically)
```

---

## Phase 12 Summary

| Version | Phase | Status | Description |
|---|---|---|---|
| v58 | CSS | ✅ Done | CSS Class System + Inline Style Purge + Font Fix |
| v59 | Components | ✅ Done | Component Unification + Gradient Application + Icon Sizing |
| v60 | Polish | ✅ Done | WCAG Audit + Light Mode + Final Polish |

---

## Phase 13 — Content + Layout Refresh (v61–v64)

> Source data files must be in the working directory alongside the HTML:
> - `kumite-drills-library-v1_2-bilingual.json` — 88 drills, replaces existing 80
> - `sport-kumite-sessions-v2.json` — 5 sessions (EN + PT)

---

### PROMPT 13A — Replace Kumite Drills Data + Levels UI → v61

**TARGET FILE**: `karate-handbook-v60.html`
**VERSION**: Bump to v61 in filename and footer.

⛔ MANDATORY: Do NOT read the HTML into context. Do NOT use cat/view/grep on the HTML. Write ONE Python script — one read, all edits in memory, one write. If output < 95% of input size, ERROR and exit.

Working directory contains: `karate-handbook-v60.html`, `kumite-drills-library-v1_2-bilingual.json`.

Write and run a single Python script:

#### STEP 1: READ NEW DATA
Load `kumite-drills-library-v1_2-bilingual.json`. Extract the `categories` array and `drills` array. This is the complete replacement dataset (88 drills across 5 categories).

#### STEP 2: REPLACE KUMITE_DRILLS CONST
Find the existing `const KUMITE_DRILLS` declaration in the HTML. It starts with `const KUMITE_DRILLS` and ends at the closing `];` (it's a large array). Replace the ENTIRE const (from `const KUMITE_DRILLS` through its closing `];`) with a new `const KUMITE_DRILLS` built from the JSON data.

Each drill object in the JS const must include all fields from the JSON: `id`, `name` (bilingual `{en,pt}`), `category`, `level`, `format`, `equipment`, `japanese`, `scoring_value`, `description` (bilingual), `coaching_cues` (bilingual array), `common_error` (bilingual), `dosage` (bilingual), `wkf_note` (bilingual). For the 80 legacy drills: include `variations` (bilingual string). For the 8 new drills (those with a `levels` key): include `levels` (array of `{level, description:{en,pt}}`), do NOT include `variations`.

Also find and replace the `const DRILL_CATEGORIES` (or however drill categories are stored — search for the category data that matches the 5 categories: attack, defence, counter, anticipation, positional). Replace with the new categories from JSON.

#### STEP 3: LEVELS UI IN DRILL CARD
Find the drill card expanded content rendering — this is where `variations` is displayed (search for `variations` in the JSX rendering, likely inside `KumiteDrillsLibrary` or the shared `ExpandableCard` content). Add a conditional: if the drill has `levels` array, render a numbered progression instead of the variations paragraph:

```
{d.levels ? (
  d.levels.map((lv, i) => (
    React.createElement('div', {key: i, style: {marginBottom: '0.75rem'}},
      React.createElement('div', {style: {fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--accent-aqua)', marginBottom: '0.25rem'}},
        (LANG === 'pt' ? 'Nível ' : 'Level ') + lv.level),
      React.createElement('div', {style: {fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6}},
        lv.description[LANG])
    )
  ))
) : d.variations ? (
  // existing variations rendering unchanged
) : null}
```

Search for the exact existing pattern before modifying. The levels rendering goes BEFORE the variations fallback.

#### STEP 4: UPDATE COUNTS
Search for any hardcoded "80" near "drills" text (e.g. "80 drills" in tile subtitles or labels). Replace with "88". Check both EN and PT strings.

#### STEP 5: VERIFY
Print:
- Total drills in new KUMITE_DRILLS const (expected: 88)
- Drills with levels array (expected: 8)
- Drills with variations string (expected: 80)
- Categories count (expected: 5)
- File size comparison (old vs new)
- Any search targets that returned 0 hits

#### BUMP VERSION
Footer: `Wado-Ryū Handbook v61 · AWIKP` (EN and PT)

CLEANUP (mandatory): Delete the script when done. Delete old HTML version after confirming new version exists and passes size check. Use try/finally.

---

### PROMPT 13B — Sessions Data + Session Library → v62

**TARGET FILE**: `karate-handbook-v61.html`
**VERSION**: Bump to v62 in filename and footer.

⛔ MANDATORY: Do NOT read the HTML into context. Do NOT use cat/view/grep on the HTML. Write ONE Python script — one read, all edits in memory, one write. If output < 95% of input size, ERROR and exit.

Working directory contains: `karate-handbook-v61.html`, `sport-kumite-sessions-v2.json`.

Write and run a single Python script:

#### STEP 1: READ SESSION DATA
Load `sport-kumite-sessions-v2.json`. It has `sessions_en` (5 sessions) and `sessions_pt` (5 sessions). Each session has: `id`, `title`, `params` (dict with Duration, Level, Type, Season, Focus, Size), `color`, `blocks` (array of `{slot, time, mins, drills:[{ref, name, mins, notes, ri}]}`).

#### STEP 2: ADD KUMITE_SESSIONS CONST
Build a `const KUMITE_SESSIONS` object that holds both languages:
```js
const KUMITE_SESSIONS = {
  en: [ /* sessions_en array */ ],
  pt: [ /* sessions_pt array */ ]
};
```
Insert this const AFTER `KUMITE_DRILLS` and BEFORE the first function/component definition.

#### STEP 3: BUILD SESSION LIBRARY VIEW
Find the existing `SessionLibrary` component (or session-related stub/placeholder — search for "Session" in component names and route definitions). Replace or build `SessionLibraryView`:

**Collapsed session card** shows:
- Session title (bold, `--text-primary`)
- Param pills: Level, Duration, Type, Focus — each as a small badge (existing `MetaBadge` or `.badge-meta` style)
- Color accent from session's `color` field

**Expanded session card** shows:
- Full params table (all 6 params as key:value pairs)
- Block timeline: each block is a row with:
  - Slot label (WARM-UP, MAIN, FINISHER, COOL-DOWN, REST, RECOVERY) — styled as a small uppercase label in `--accent-aqua` (or block-appropriate color: WARM-UP=gold, MAIN=red, FINISHER=orange, COOL-DOWN=teal, REST/RECOVERY=dim)
  - Time range (e.g. "0:00–0:12")
  - Duration in minutes
  - Drill list: each drill shows name, minutes, coaching notes (expandable or always visible), and RI (relative intensity) tag

Use `ExpandableCard` or the same expand/collapse pattern as the drill library. Session cards should use `.expand-card` class.

The view should be language-aware: `KUMITE_SESSIONS[LANG]` for data access, bilingual labels for "Duration", "Level", "Focus", etc.

#### STEP 4: VERIFY ROUTE WIRING
Search for the route that maps to the Session Library (likely triggered from the Sport Kumite hub's "Session Library" tile). Verify it points to the new `SessionLibraryView`. If the route exists but points to a stub, update it. If it doesn't exist, add it.

#### STEP 5: VERIFY
Print:
- Sessions in const (expected: 5 EN + 5 PT)
- Total blocks across all sessions
- Total drill refs across all sessions
- Route wiring confirmation
- File size comparison

#### BUMP VERSION
Footer: `Wado-Ryū Handbook v62 · AWIKP` (EN and PT)

CLEANUP (mandatory): Delete the script when done. Delete old HTML version after confirming new version exists and passes size check. Use try/finally.

---

### PROMPT 13C — Homepage Restructure + Hero Upgrade → v63

**TARGET FILE**: `karate-handbook-v62.html`
**VERSION**: Bump to v63 in filename and footer.

⛔ MANDATORY: Do NOT read the HTML into context. Do NOT use cat/view/grep on the HTML. Write ONE Python script — one read, all edits in memory, one write. If output < 95% of input size, ERROR and exit.

Working directory contains: `karate-handbook-v62.html`.

Write and run a single Python script:

#### STEP 1: HOMEPAGE SECTION RESTRUCTURE
The homepage is built from a `HOME_SECTIONS` array (or similar data structure — search for the section labels and tile assignments). Make these changes:

**1a. Rename technique section:**
Find the section that contains Kihon, Kata, Kumite Forms tiles. Its label is something like "TÉCNICA" (PT) / "TECHNIQUE" (EN). Change to:
- EN: "WADO-RYŪ SYLLABUS"
- PT: "SYLLABUS WADO-RYŪ"

**1b. Move Weapons & Defence tile:**
Find the Weapons & Defence tile (search for "Weapons", "Armas", "weapons" in tile data). Move it from its current section into the renamed Wado-Ryū Syllabus section, positioned AFTER the Kumite Forms tile.

**1c. Create Physical Conditioning section:**
Add a new section AFTER Sport Kumite with:
- EN label: "PHYSICAL CONDITIONING"
- PT label: "CONDICIONAMENTO FÍSICO"
- Accent: `var(--accent-teal)` (matching current Strength & Mobility accent)

**1d. Move Strength & Mobility tile:**
Find the Strength & Mobility tile and move it into the new Physical Conditioning section. Remove the old section container if it becomes empty.

Verify after restructure: count sections, count tiles per section, confirm no tiles are lost or duplicated.

#### STEP 2: HOMEPAGE HERO UPGRADE

**2a. Logo size:**
Find the hero logo size (search for the logo rendering in the homepage hero — look for `width`, `height`, or `size` props near the bird SVG in the hero area). Increase to 80–96px (from whatever it currently is, likely ~48–60px).

**2b. Title size:**
Find the hero title ("WADO-RYŪ HANDBOOK" / equivalent). Update its font-size to `clamp(2.5rem, 5vw, 3.5rem)` and font-weight to `800`. If it's using a CSS class, update the class. If inline, update the inline style.

**2c. Subtitle styling:**
Find the subtitle text below the title (the Portuguese subtitle visible in the screenshot: "Manual interativo de karate..."). Change its font-family from Space Mono to DM Sans (or `var(--font-body)`). Increase font-size slightly (to `var(--text-base)` or `1rem`). Color: `var(--text-secondary)`.

**2d. Pulsing glow animation:**
Add a CSS `@keyframes` animation for the red circle glow:
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255,25,67,0.3); }
  50% { box-shadow: 0 0 40px rgba(255,25,67,0.6); }
}
```
Apply this to the red circle element in the hero logo (search for `#FF1943` or the red circle fill in the hero SVG area). The animation property: `animation: pulse-glow 3s ease-in-out infinite`. If the red circle is an SVG element, apply via a CSS class targeting it or wrap it. Use `filter: drop-shadow()` if box-shadow doesn't work on SVG.

**2e. Hero padding:**
Increase hero vertical padding to `5rem` top, `4rem` bottom (or `padding: 5rem 0 4rem`).

**2f. Gradient divider:**
After the hero section and before the first section of tiles, insert a 1px horizontal divider:
```css
.hero-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-red), transparent);
  margin: 0 auto;
  max-width: 60%;
}
```
Add the divider element between the hero container and the first section.

#### STEP 3: VERIFY
Print:
- Homepage sections with tile counts (expected: Referência, Wado-Ryū Syllabus, Sport Kumite, Physical Conditioning)
- Hero logo size value
- Hero title font-size value
- pulse-glow animation found in CSS
- Gradient divider element found
- File size comparison

#### BUMP VERSION
Footer: `Wado-Ryū Handbook v63 · AWIKP` (EN and PT)

CLEANUP (mandatory): Delete the script when done. Delete old HTML version after confirming new version exists and passes size check. Use try/finally.

---

### PROMPT 13D — Subpage Heroes + Grid Fixes → v64

**TARGET FILE**: `karate-handbook-v63.html`
**VERSION**: Bump to v64 in filename and footer.

⛔ MANDATORY: Do NOT read the HTML into context. Do NOT use cat/view/grep on the HTML. Write ONE Python script — one read, all edits in memory, one write. If output < 95% of input size, ERROR and exit.

Working directory contains: `karate-handbook-v63.html`.

Write and run a single Python script:

#### STEP 1: STRENGTH & MOBILITY PAGE HERO + 2×2 GRID

Find the `StrengthMobilityPage` component (search for `StrengthMobility` or `strengthMobility` in function definitions).

**1a. Add hero section** at the top of the component's return, before the tile grid:
```jsx
// Hero
React.createElement('div', {className: 'subpage-hero'},
  React.createElement('h1', {className: 'text-page-title'},
    LANG === 'pt' ? 'Força & Mobilidade' : 'Strength & Mobility'),
  React.createElement('p', {className: 'subpage-hero-subtitle'},
    LANG === 'pt'
      ? 'Treino estruturado para prevenir lesões, desenvolver capacidade atlética e melhorar o desempenho no karate. Exercícios de força, mobilidade, movimento desportivo específico e preparação de aquecimento.'
      : 'Structured training to prevent injuries, build athletic capacity, and improve karate performance. Exercises for strength, mobility, sport-specific movement, and warm-up preparation.'),
  React.createElement('div', {className: 'subpage-hero-stats'},
    LANG === 'pt'
      ? '69 exercícios · 23 padrões · 10 zonas · 3 níveis'
      : '69 exercises · 23 patterns · 10 body zones · 3 levels'),
  React.createElement('div', {className: 'hero-divider'})
)
```

**1b. Fix tile grid to 2×2:**
Find the grid container that holds the 4 tiles (Strength, Mobility, Karate Specific, Warm-Up). Change its grid template from whatever produces the current 3+1 layout to:
```css
grid-template-columns: repeat(2, 1fr)
```
This forces a balanced 2×2 grid. On mobile (<600px), it should collapse to single column. If the grid is defined inline, update the inline style. If via CSS class, update the class.

#### STEP 2: SPORT KUMITE PAGE HERO

Find the `SportKumiteHub` component (search for `SportKumite` in function definitions).

**2a. Add hero section** at the top, same pattern:
```jsx
React.createElement('div', {className: 'subpage-hero'},
  React.createElement('h1', {className: 'text-page-title'},
    LANG === 'pt' ? 'Kumite Desportivo' : 'Sport Kumite'),
  React.createElement('p', {className: 'subpage-hero-subtitle'},
    LANG === 'pt'
      ? 'Exercícios de kumite WKF, sessões de treino estruturadas e recursos de competição para atletas e treinadores.'
      : 'WKF kumite drills, structured training sessions, and competition resources for athletes and coaches.'),
  React.createElement('div', {className: 'subpage-hero-stats'},
    LANG === 'pt'
      ? '88 exercícios · 5 sessões · 5 categorias · 3 níveis'
      : '88 drills · 5 sessions · 5 categories · 3 levels'),
  React.createElement('div', {className: 'hero-divider'})
)
```

**2b. Ensure tile grid is balanced** — if the Sport Kumite tiles are in an odd number, use `repeat(2, 1fr)` grid as well. Check current tile count and layout.

#### STEP 3: ADD CSS CLASSES FOR SUBPAGE HEROES

Add these CSS classes to the `<style>` block (after existing hero-related CSS):

```css
.subpage-hero {
  text-align: center;
  padding: 3rem 1rem 2rem;
}
.subpage-hero-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-base, 1rem);
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 600px;
  margin: 1rem auto 0;
}
.subpage-hero-stats {
  font-family: 'Space Mono', monospace;
  font-size: var(--text-xs, 0.75rem);
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-top: 1rem;
}
```

Also verify the `.hero-divider` class from 13C exists (it should — it was added in v63). If not, add it.

#### STEP 4: REMOVE BACK LINK DUPLICATION
The heroes replace the old `← Back` + bare title pattern at the top of these pages. Search for the existing back link and page title rendering in both `StrengthMobilityPage` and `SportKumiteHub`. Remove the old standalone title + back link, since the hero section now contains the title. Keep the back link functionality — add a `← Back` link inside the hero (below the divider or above the title), styled as before.

#### STEP 5: VERIFY
Print:
- StrengthMobilityPage: hero found, grid columns = `repeat(2, 1fr)`, tile count
- SportKumiteHub: hero found, grid layout, tile count
- `.subpage-hero` CSS class found
- `.hero-divider` CSS class found
- Back link rendering confirmed in both pages
- File size comparison

#### BUMP VERSION
Footer: `Wado-Ryū Handbook v64 · AWIKP` (EN and PT)

CLEANUP (mandatory): Delete the script when done. Delete old HTML version after confirming new version exists and passes size check. Use try/finally.

---

## Phase 13 Summary

| Version | Phase | Status | Description |
|---|---|---|---|
| v61 | Data | ⬜ Next | Replace kumite drills (80→88) + levels UI |
| v62 | Sessions | ⬜ Pending | 5 kumite sessions + Session Library page |
| v63 | Homepage | ⬜ Pending | Section restructure + hero upgrade |
| v64 | Subpages | ⬜ Pending | S&M + Sport Kumite hero sections + 2×2 grids |
