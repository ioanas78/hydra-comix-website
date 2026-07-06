# How to Add a New Book to the Website

Step-by-step checklist for adding a book to the HydraComix site, based on the process used to add
the *Colour the World: A Countryball Adventure* colouring book (July 2026). Follow in order.

## 0. Collect these inputs first
- **Display title** (confirm exact wording/spelling — site uses **British spelling**, e.g. "Colour", "colouring").
- **Front cover** — a PNG/JPG, usually dropped into `front covers/` (any size; may be RGBA with transparency).
- **Amazon URL** → extract the **ASIN** (the `B0...` code). Use the clean canonical link only:
  `https://www.amazon.co.uk/dp/<ASIN>/` (strip all `?ref=...` / tracking query params).
- **Short description** (1–2 sentences). Britishise spelling to match the site voice.
- **Desired position** in the books grid (e.g. "first", "last").
- Is it a comic or a different type (e.g. colouring book)? Affects the JSON-LD `genre`.

## 1. Make the cover image  ⚠️ most error-prone step
The book grid cards are a **strict 3:4 frame** (`.book-cover { aspect-ratio: 3/4 }`) with
`object-fit: cover` (see `styles.css`). That means:

- **Produce the JPG at exactly 3:4 → `450 × 600`.** Do **not** use 424×600 (that is 0.707, not 0.75,
  and `object-fit: cover` will crop the top and bottom of a full-bleed cover).
- If the source art's ratio isn't exactly 3:4, fit the **whole** artwork (no stretching) and fill the
  thin side margins by **edge-replication** (extend the existing edge pixels) so there are no visible
  bars and nothing is cropped.
- Flatten any transparency, JPEG **quality ~85**, target **< 100 KB**.
- Save to: `assets/images/covers/<kebab-title>-cover.jpg`
  (naming convention: lowercase, hyphenated, `-cover.jpg`, e.g. `country-balls-coloring-book-cover.jpg`).

**Tooling:** no ImageMagick/Pillow on this machine — use **PowerShell + System.Drawing** (built in).
Reusable script (edit `$src`, `$dst`):

```powershell
Add-Type -AssemblyName System.Drawing
$src = "c:\DanaOracle\Tech-Claude\hydra-comix-website\front covers\<SOURCE>.png"
$dst = "c:\DanaOracle\Tech-Claude\hydra-comix-website\assets\images\covers\<kebab-title>-cover.jpg"
$art = New-Object System.Drawing.Bitmap $src
$cw = 450; $ch = 600                                   # 3:4 canvas
$bmp = New-Object System.Drawing.Bitmap $cw, $ch
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode='HighQuality'; $g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'
$artW = [int][math]::Round($art.Width * ($ch / $art.Height))
$x = [int][math]::Floor(($cw - $artW) / 2)
$g.DrawImage($art,(New-Object System.Drawing.Rectangle $x,0,$artW,$ch),(New-Object System.Drawing.Rectangle 0,0,$art.Width,$art.Height),[System.Drawing.GraphicsUnit]::Pixel)
# edge-replicate the side margins so they blend invisibly
$g.DrawImage($art,(New-Object System.Drawing.Rectangle 0,0,($x+1),$ch),(New-Object System.Drawing.Rectangle 0,0,1,$art.Height),[System.Drawing.GraphicsUnit]::Pixel)
$rx=$x+$artW
$g.DrawImage($art,(New-Object System.Drawing.Rectangle ($rx-1),0,($cw-$rx+1),$ch),(New-Object System.Drawing.Rectangle ($art.Width-1),0,1,$art.Height),[System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()|?{$_.MimeType -eq 'image/jpeg'}
$pp=New-Object System.Drawing.Imaging.EncoderParameters 1
$pp.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]85)
$bmp.Save($dst,$codec,$pp); $bmp.Dispose(); $art.Dispose()
```

> If the source is already ~3:4 with safe margins you can just resize to 450×600; the edge-replicate
> lines are harmless either way.

## 2. Edit `index.html` (three places)
1. **Visible books grid** (`<div class="books-grid">`): add an `<article class="book-card">` at the
   requested position. Copy an existing card as a template — keep the same Amazon `<svg>` path and the
   `data-i18n="books.buyButton"` span. Set:
   - `<img src="assets/images/covers/<kebab-title>-cover.jpg" ... width="450" height="600" ...>`
     (the `width`/`height` must match the real JPG pixels).
   - `alt="<Title> ... cover by David Alexandru"`, `<h3 class="book-title">`, `<p class="book-desc">`,
     and the button `href="https://www.amazon.co.uk/dp/<ASIN>/"`.
   - Renumber the `<!-- Book N: ... -->` comments so they stay sequential.
2. **JSON-LD `ItemList`** (the `<script type="application/ld+json">` with `"@type": "ItemList"`):
   add a `ListItem`. Renumber `"position"` values so they run 1..N with no gaps/dupes — easiest to
   **renumber existing items bottom-up first** (5→6, 4→5, ...) then insert the new one. Fields:
   `name`, `author` (David Alexandru), `genre` (e.g. `Children's Comic Book` or `Children's Coloring Book`),
   `inLanguage` `en`, `audience` Children, `url` + `offers.url` = the Amazon `/dp/<ASIN>/` link,
   `image` = the full `https://www.hydra-comix.com/assets/images/covers/<kebab-title>-cover.jpg`.
3. **Book counter**: bump `<span class="books-count">N BOOKS</span>`.

## 3. Edit `sitemap.xml`
Add an `<image:image>` entry under the homepage `<url>` block:
```xml
<image:image>
  <image:loc>https://www.hydra-comix.com/assets/images/covers/<kebab-title>-cover.jpg</image:loc>
  <image:title><Title> cover</image:title>
</image:image>
```

## 4. Update docs `CLAUDE.md`
- Add a row to the **Book series — Amazon UK links** table: `| <Title> | <ASIN> |`.
- Bump any counts ("Five books…", "`ItemList` (N books)").

## 5. Do NOT touch
- `translations/en.json` — book titles/descriptions are **hard-coded inline** in `index.html`, not i18n keys.
- `styles.css`, `golden-era.html`, `about.html`, the OG image — unless the task specifically needs them.

## 6. Validate
Check every JSON-LD block still parses and positions are sequential:
```bash
python - <<'PY'
import re, json
html = open('index.html', encoding='utf-8').read()
for i,b in enumerate(re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S),1):
    d = json.loads(b)  # raises if invalid
    if d.get('@type')=='ItemList':
        items=d['itemListElement']; print('ItemList positions', [x['position'] for x in items])
    print('block',i,'OK',d.get('@type'))
PY
```

## 7. Preview in browser
```bash
cd "c:/DanaOracle/Tech-Claude/hydra-comix-website"
python -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/index.html#books
```
**Hard-refresh (Ctrl+F5)** — reused image filenames get cached, so a normal reload can show the old image.

## 8. Commit & push (after the user approves the preview)
The folder is a proper git clone of `github.com/ioanas78/hydra-comix-website` (credentials cached for
`ioanas78`). From the repo folder:
```bash
git add -A
git commit -m "Add <Title> to the books grid"
git push        # updates the live site via GitHub Pages
```

## Quick reference
| Thing | Value |
|---|---|
| Cover output folder | `assets/images/covers/` |
| Cover size / ratio | **450 × 600** (3:4), JPEG q~85, < 100 KB |
| Naming | `<kebab-title>-cover.jpg` |
| Amazon link form | `https://www.amazon.co.uk/dp/<ASIN>/` (no tracking params) |
| Files edited | `index.html` (grid + JSON-LD + counter), `sitemap.xml`, `CLAUDE.md`, new cover JPG |
| Spelling | British (colour, colouring, travellers) |
