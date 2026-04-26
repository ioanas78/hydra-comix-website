# HydraComix Website Plan

## What this website is

Business showcase and Amazon sales funnel for HydraComix — comic books written and designed by David Alexandru (age 10-11, UK). No on-site e-commerce; all purchases go through Amazon.

## Visual Design

**Color palette** (derived from HydraComix logo + book covers):
| Token | Value | Usage |
|---|---|---|
| `--bg-dark` | `#1a1008` | Page background |
| `--bg-card` | `#221408` | Card backgrounds |
| `--accent-red` | `#cc2200` | Starburst badges, borders, buttons |
| `--accent-gold` | `#f5a623` | Nav border, card borders, glow |
| `--accent-orange` | `#ff6b1a` | Highlights, gradients |
| `--text-gold` | `#ffd700` | Headings |
| `--text-body` | `#f0e6d3` | Body text |

**Typography:** `Bangers` (Google Fonts) for headings, `Nunito` for body text.

**Style:** Dark comic-book theme. Halftone dot background pattern (CSS only). Bold card borders. Hover animations with slight tilt. Red starburst clip-path decorations. Sticky gold-bordered navbar.

## File Structure

```
claudecode_prjs/hydra-comix-website/
├── index.html              ← Main page: hero + 5 books grid
├── about.html              ← About the Author page
├── golden-era.html         ← Country Balls Golden Era dedicated page
├── styles.css              ← Shared stylesheet (all 3 pages)
├── i18n.js                 ← Language switching engine
├── translations/
│   └── en.json             ← English strings (scaffold for future languages)
└── WEBSITE-PLAN.md         ← This file
```

## Pages

### index.html — Home
- Sticky navbar: logo + nav links + language dropdown
- Hero banner: animated logo, "HydraComix" title, starburst badges, CTA button
- Books grid: 5 cards in order (Country Balls, Return, Heroes, Golden Era, Mania)
  - Each card: cover image | title | description placeholder | Amazon buy button
- Footer

### about.html — About the Author
- Author bio from `about-the-author.txt`
- Portrait placeholder (✏️ emoji) with gold circular border
- Styled text box with comic-quote callout

### golden-era.html — Country Balls Golden Era
- Hero: book cover + title + starburst badges + Amazon buy button
- Video section: `Country_Balls__Golden_Era_(brief1).mp4` with native controls
- Chapter gallery: all 15 `CountryBallsGoldenEra-N.png` images in a responsive grid
- Second Amazon buy button at the bottom

## Language Support (i18n)

Architecture: `data-i18n="key"` attributes on all translatable elements. `i18n.js` fetches the active language's JSON file and applies translations on load and on language switch. Language preference is saved to `localStorage`.

**Current languages:** English (active), French/German/Romanian (dropdown shows as "coming soon")

**To add a language:**
1. Create `translations/<code>.json` (copy `en.json` as template)
2. Add entry to `LANGUAGES` object in `i18n.js`
3. Add `<div class="lang-option" data-lang="<code>">` in each page's navbar

## Amazon Links

All links are live and wired into the buttons:

| Book | Amazon UK |
|---|---|
| Country Balls | `/dp/B0DRYSM7GJ/` |
| Country Balls Return | `/dp/B0DSSZMV83/` |
| Country Balls Heroes | `/dp/B0DWKBCD7X/` |
| Country Balls Golden Era | `/dp/B0DZVQ4DCX/` |
| Country Balls Mania | `/dp/B0GJPTJBG5/` |

## Placeholders to Fill In Later

- Book descriptions: edit the `<p class="book-desc">` paragraph in each book card in `index.html`
- Author portrait: replace the ✏️ div in `about.html` with an `<img>` tag

## How to Open the Website

Just open `index.html` directly in any browser — no server or build step needed.
For the video to load, open via a local server (e.g. `python -m http.server 8080`) or VS Code Live Server, as some browsers block local video from `file://` URLs.
