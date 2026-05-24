# WAY_OF_WORKING.md — Surgical Edit Patterns & Cleanup

This document contains the operational patterns for editing the karate handbook HTML. Read `CLAUDE.md` first for the project overview and rules.

---

## Script Structure Template

Every Python script follows this skeleton. No exceptions.

```python
#!/usr/bin/env python3
"""
Phase {X}{A/B} — {Description}
Karate Handbook v{N-1} → v{N}
"""

import os
import sys
import glob
import base64
import re
# import subprocess  # for pdftoppm
# from PIL import Image  # for image processing

# ──────────────────────────────────────────────
# CONFIGURATION
# ──────────────────────────────────────────────
CURRENT_VERSION = 64  # the version currently in index.html
NEW_VERSION = 65
INDEX_HTML = 'index.html'
ARCHIVE_HTML = f'archive/html-versions/karate-handbook-v{CURRENT_VERSION}.html'
SCRIPT_PATH = os.path.abspath(__file__)

# List of temporary files this script creates (for cleanup)
TEMP_FILES = []
# List of extracted JPEGs to delete after integration
INTEGRATED_JPEGS = []

# ──────────────────────────────────────────────
# MAIN WORK
# ──────────────────────────────────────────────

def main():
    # ... all the actual work ...
    pass

# ──────────────────────────────────────────────
# CLEANUP — runs even if main() fails
# ──────────────────────────────────────────────

def cleanup():
    """Remove all temporary files. Only permanent project files survive."""

    # 1. Delete rasterized page images
    for pattern in ['page-*.ppm', 'page-*.png', 'page-*.jpg',
                    'temp_*', 'tmp_*', '*.pyc']:
        for f in glob.glob(pattern):
            try:
                os.remove(f)
            except OSError:
                pass

    # 2. Delete __pycache__ if it appeared
    if os.path.isdir('__pycache__'):
        import shutil
        shutil.rmtree('__pycache__', ignore_errors=True)

    # 3. Delete explicitly tracked temp files
    for f in TEMP_FILES:
        if os.path.exists(f):
            try:
                os.remove(f)
            except OSError:
                pass

    # 4. Delete integrated JPEGs (Phase B only)
    for f in INTEGRATED_JPEGS:
        if os.path.exists(f):
            try:
                os.remove(f)
            except OSError:
                pass

    # 5. (The previous index.html version is preserved under
    #    archive/html-versions/karate-handbook-v{CURRENT_VERSION}.html —
    #    that copy is made BEFORE any edits, in main(), and is never deleted.)

    # 6. Delete this script itself — ALWAYS LAST
    try:
        os.remove(SCRIPT_PATH)
        print(f"  Deleted script {os.path.basename(SCRIPT_PATH)}")
    except OSError:
        pass

    print("  ✓ Cleanup complete")


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f"\n✗ ERROR: {e}", file=sys.stderr)
        # Still clean up temp files even on failure
        raise
    finally:
        cleanup()
```

---

## Surgical HTML Edit Patterns

### Pattern 1: Find-and-Replace a Specific Entry by ID

Use when updating a single item in a JS data array (e.g. changing a kata description).

```python
def update_entry_by_id(html_content, entry_id, old_desc, new_desc):
    """Replace a specific field value for an entry found by its id."""
    # Find the entry by its unique id
    marker = f'id:"{entry_id}"'
    pos = html_content.find(marker)
    if pos == -1:
        raise ValueError(f"Entry '{entry_id}' not found in HTML")

    # Find the desc field near this position (within 500 chars)
    search_region = html_content[pos:pos+500]
    old_fragment = f'desc:"{old_desc}"'
    if old_fragment not in search_region:
        # Try with escaped quotes or single quotes
        raise ValueError(f"desc field not found near '{entry_id}'")

    new_fragment = f'desc:"{new_desc}"'
    # Replace only the first occurrence after the id marker
    before = html_content[:pos]
    after = html_content[pos:].replace(old_fragment, new_fragment, 1)
    return before + after
```

### Pattern 2: Inject Base64 Image into an Images Object

Use when adding a new image to `KATA_IMAGES`, `KIHON_IMAGES`, etc.

```python
def inject_image(html_content, object_name, image_key, base64_data):
    """Add a new key-value pair to a JS object like KATA_IMAGES."""
    # Find the object declaration
    marker = f'const {object_name}={{'
    # Also try with spaces
    if marker not in html_content:
        marker = f'const {object_name} = {{'
    if marker not in html_content:
        raise ValueError(f"Object '{object_name}' not found")

    pos = html_content.find(marker)
    insert_pos = pos + len(marker)

    # Create the new entry (prepend to object)
    new_entry = f'\n"{image_key}":"data:image/jpeg;base64,{base64_data}",\n'

    return html_content[:insert_pos] + new_entry + html_content[insert_pos:]
```

### Pattern 3: Replace a Block of Content by Surrounding Markers

Use when replacing larger content sections (e.g. a component's content object).

```python
def replace_between_markers(html_content, start_marker, end_marker, new_content):
    """Replace everything between two unique string markers."""
    start = html_content.find(start_marker)
    if start == -1:
        raise ValueError(f"Start marker not found: {start_marker[:60]}...")
    end = html_content.find(end_marker, start + len(start_marker))
    if end == -1:
        raise ValueError(f"End marker not found: {end_marker[:60]}...")

    return (html_content[:start + len(start_marker)]
            + new_content
            + html_content[end:])
```

### Pattern 4: Version Bump

The deliverable is always `index.html` at the repo root. Before any edits, snapshot the current `index.html` to `archive/html-versions/karate-handbook-v{current}.html`. Then edit `index.html` in place and bump the footer string.

```python
import os
import shutil

def archive_and_bump(current_version, new_version):
    archive_path = f'archive/html-versions/karate-handbook-v{current_version}.html'

    # 1. Snapshot current index.html into the archive (idempotent — overwrites
    #    if the archive entry already exists, which is fine when contents match).
    os.makedirs('archive/html-versions', exist_ok=True)
    shutil.copy2('index.html', archive_path)
    print(f"  ✓ Archived index.html → {archive_path}")

    # 2. Edit index.html in place: bump every footer occurrence.
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace(
        f'Wado-Ryū Handbook v{current_version}',
        f'Wado-Ryū Handbook v{new_version}'
    )

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✓ index.html now at v{new_version}")
```

---

## Image Extraction Pattern (Phase A)

```python
import subprocess
from PIL import Image

def extract_images(pdf_path, pages, output_prefix, dpi=200):
    """Rasterize specific pages and return list of output files."""
    outputs = []
    for page in pages:
        out_prefix = f'page-{page}'
        subprocess.run([
            'pdftoppm', '-jpeg', '-r', str(dpi),
            '-f', str(page), '-l', str(page),
            pdf_path, out_prefix
        ], check=True)

        # pdftoppm creates page-{N}-{page}.jpg
        # Find the actual output file
        matches = glob.glob(f'{out_prefix}*.jpg')
        if not matches:
            matches = glob.glob(f'{out_prefix}*.ppm')
        if matches:
            outputs.append(matches[0])
            TEMP_FILES.append(matches[0])  # Mark for cleanup

    return outputs


def crop_and_optimize(input_path, output_path, crop_box=None, max_width=750, quality=72):
    """Crop, resize, and optimize an image."""
    img = Image.open(input_path)

    if crop_box:
        img = img.crop(crop_box)  # (left, top, right, bottom)

    # Resize if wider than max
    if img.width > max_width:
        ratio = max_width / img.width
        img = img.resize((max_width, int(img.height * ratio)), Image.LANCZOS)

    img.save(output_path, 'JPEG', quality=quality, optimize=True)
    print(f"  ✓ Saved {output_path} ({os.path.getsize(output_path)//1024}KB)")
    return output_path
```

---

## Reading the English Translation PDF

Despite the `.PDF` extension, `sources/WIKFhandboek__1_-english-translation.PDF` is machine-translated text. Read it as text:

```python
def read_english_pdf(filepath):
    """Extract text from the English translation PDF."""
    import subprocess
    result = subprocess.run(
        ['pdftotext', '-layout', filepath, '-'],
        capture_output=True, text=True
    )
    return result.stdout


def extract_section(full_text, start_keyword, end_keyword):
    """Extract text between two keywords."""
    start = full_text.find(start_keyword)
    if start == -1:
        return None
    end = full_text.find(end_keyword, start + len(start_keyword))
    if end == -1:
        return full_text[start:]
    return full_text[start:end]
```

---

## Pre-Flight Checklist

Before running any script, verify:

1. ☐ Latest HTML version exists in working directory
2. ☐ Both source PDFs present
3. ☐ `poppler-utils` installed (`which pdftoppm`)
4. ☐ `Pillow` installed (`python3 -c "from PIL import Image"`)
5. ☐ No leftover temp files from a previous failed run

---

## Post-Flight Checklist

After every script completes:

1. ☐ `index.html` at repo root has the new content + bumped version footer
2. ☐ `archive/html-versions/karate-handbook-v{previous}.html` exists (the snapshot of what `index.html` was before the bump)
3. ☐ No `.py` scripts remain
4. ☐ No `page-*`, `temp_*`, `tmp_*` files remain
5. ☐ No `__pycache__/` directory
6. ☐ No intermediate image files (unless between Phase A and B)
7. ☐ Working directory root matches the permanent file list in CLAUDE.md
8. ☐ Pedro tests on S25 Ultra before proceeding

---

## Handling Errors

If a script fails partway through:

- Temp files are still cleaned up (the `finally` block in the template handles this)
- The archive copy (`archive/html-versions/karate-handbook-v{previous}.html`) is the rollback point — restore by copying it back over `index.html`
- Fix the issue and re-run. The script should be idempotent where possible.
- If `index.html` was partially written, `cp archive/html-versions/karate-handbook-v{previous}.html index.html` to roll back, then re-run.

---

## Conflict Handling

When the English PDF text contradicts what's already in the HTML:

```
⚠ CONFLICT DETECTED
  Section: Kihon Kumite 3
  HTML says: "Illustrates: Uraken to chest and Ippon-ken to knee simultaneously"
  PDF says: "Demonstrates: Uraken to chest and Ippon-ken to thigh simultaneously"
  → NOT RECONCILED. Pedro must decide.
```

Print conflicts to stdout. Do NOT modify the conflicting HTML content. Continue with other changes.


---

## Phase 7 Patterns

### Windows Environment
- Use `py` (not `python3`). `pdftoppm` unavailable — use PyMuPDF (`import fitz`).
- `pdftotext` IS available. Console is cp1252 — never print Unicode directly.
- PyMuPDF, Pillow, numpy are pip-installed.

### CSS Variable Color Migration
When replacing hardcoded hex with CSS variables in React inline styles, use string values:
```python
COLOR_MAP = {
    '#0a0a0c': 'var(--bg)', '#131316': 'var(--bg-card)',
    '#1e1e24': 'var(--border)', '#ff6b6b': 'var(--accent-red)',
    # etc.
}
# In style objects: {background:'var(--bg-card)'}
# WARNING: color+"18" pattern breaks with variables — use --accent-*-faint vars
```

### Border Radius Zero
```python
import re
# Kill all border-radius in CSS and inline styles
html = re.sub(r'border-radius:\s*\d+px', 'border-radius:0', html)
html = re.sub(r'borderRadius:\s*\d+', 'borderRadius:0', html)
html = re.sub(r'borderRadius:"?\d+px"?', 'borderRadius:0', html)
html = re.sub(r'borderRadius:"50%"', 'borderRadius:0', html)
```

### Component Replacement
```python
def replace_component(html, name, new_code):
    start = html.find(f'function {name}(')
    end = html.find('\nfunction ', start + 1)
    return html[:start] + new_code + '\n' + html[end+1:]
```

### Version Bump (Phase 7+: "Wado-Ryū Handbook")
```python
content = content.replace(
    f'Wado-Ryū Handbook v{old}',
    f'Wado-Ryū Handbook v{new}'
)
```
(Always edit `index.html` in place after archiving — see Pattern 4 above.)
