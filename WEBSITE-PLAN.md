# HydraComix Website Plan

## What this website is

Business showcase and Amazon sales funnel for HydraComix — comic books written and designed by David Alexandru (ages 10–11, UK). No on-site e-commerce; all purchases go through Amazon UK. Live at **https://www.hydra-comix.com** (GitHub Pages, custom domain via CNAME).

---

## Visual Design

**Colour palette:**
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

**Style:** Dark comic-book theme. Halftone dot background (CSS radial-gradient). Bold gold/red card borders. Hover animations with slight tilt. Red starburst clip-path decorations. Sticky gold-bordered navbar with hamburger menu (mobile).

---

## File Structure

```
hydra-comix-website/
├── index.html                          ← Home: hero, gift callout, series intro, books grid, FAQ, footer
├── golden-era.html                     ← Country Balls Golden Era: hero, video trailer, chapter gallery
├── about.html                          ← Author bio with Amazon Author Central link
├── styles.css                          ← Shared stylesheet (~750 lines)
├── i18n.js                             ← Language-switching engine
├── robots.txt                          ← Allows all crawlers, points to sitemap
├── sitemap.xml                         ← 3 pages + image sitemap entries
├── CNAME                               ← Custom domain: www.hydra-comix.com
├── HydraComix-logo.jpg                 ← Legacy logo (root)
├── translations/
│   └── en.json                         ← 38 translation keys (fr/de/ro scaffolded, not yet added)
├── assets/
│   └── images/
│       ├── hydracomix-logo.jpg         ← Logo used in navbar
│       ├── social/
│       │   └── hydracomix-og.jpg       ← Open Graph / Twitter Card image (1200×630)
│       ├── covers/                     ← 6 book cover JPGs (including large hero variant)
│       │   ├── country-balls-cover.jpg
│       │   ├── country-balls-return-cover.jpg
│       │   ├── country-balls-heroes-cover.jpg
│       │   ├── country-balls-golden-era-cover.jpg
│       │   ├── country-balls-golden-era-cover-large.jpg
│       │   └── country-balls-mania-cover.jpg
│       └── previews/                   ← 15 chapter preview JPGs for golden-era.html
│           └── country-balls-golden-era-chapter-[01-15].jpg
├── CountryBallsGoldenEra/              ← Original large assets (not restructured)
│   ├── Country_Balls__Golden_Era_(brief1).mp4   ← 16 MB video trailer
│   ├── CountryBallsGoldenEra-[1-15].png         ← Original chapter PNGs
│   ├── CountryBalls Golden Era - codex.pptx
│   └── CountryBallsGoldenEra-Interior.pdf       ← 135 MB — excluded via .gitignore
├── front covers/                       ← Original cover PNGs (legacy, not used by HTML)
├── amazon-books-links.txt              ← Reference: Amazon UK ASINs and links
├── about-the-author.txt                ← Source copy for about.html
├── all-about-country-balls.txt         ← EMPTY — content not yet written
├── todo.md                             ← Outstanding action items
├── SEO-plan.md                         ← SEO implementation log
├── WEBSITE-PLAN.md                     ← This file
└── CLAUDE.md                           ← Claude Code project instructions
```

---

## Pages

### index.html — Home

- **Sticky navbar**: logo + nav links (Books, Golden Era, About) + language dropdown
- **Hero**: large book cover (Golden Era) + H1 title + subtitle + two CTA buttons (See All Books, Golden Era)
- **Gift callout section**: H2 "The Perfect Gift for Young Readers" — keyword-rich paragraph targeting gift/present search terms
- **Series intro**: paragraph describing the Country Balls series with visible SEO keywords (funny, boys and girls, ages 8–17, Amazon worldwide)
- **Books grid**: 5 cards — Country Balls, Return, Heroes, Golden Era (featured), Mania
  - Each card: cover image | title | real description | Amazon UK buy button
- **FAQ section**: 3 questions — age range, where to buy (lists 8 Amazon storefronts), who writes HydraComix
- **Footer**: tagline + copyright

**SEO (head):**
- Title: *HydraComix — Funny Comic Books for Boys & Girls | Ages 8–17 | Available on Amazon*
- Canonical: `https://www.hydra-comix.com/`
- Open Graph + Twitter Card tags
- JSON-LD: `Organization`, `ItemList` (5 books), `FAQPage`

---

### golden-era.html — Country Balls Golden Era

- **Hero**: book cover + title + tagline + Amazon UK buy button
- **Video section**: MP4 trailer (`CountryBallsGoldenEra/Country_Balls__Golden_Era_(brief1).mp4`) with native `<video>` controls
- **Chapter gallery**: 15 chapter preview images in responsive grid (from `assets/images/previews/`)
- **Second Amazon buy button** at the bottom

**SEO (head):**
- Title: *Country Balls Golden Era — Funny Comic Book for Kids Ages 8–17 | HydraComix*
- Canonical: `https://www.hydra-comix.com/golden-era.html`
- Open Graph + Twitter Card tags
- JSON-LD: `Book`, `VideoObject`, `BreadcrumbList`

---

### about.html — About the Author

- **Three H2 sections**: The Country Balls Story | Why Kids Love It | A Gift Kids Actually Want
- **Author bio**: David Alexandru, primary school boy, UK — wrote first book aged 10, Mania aged 11
- **Two CTA buttons**: "See the Books" (→ index.html#books) | "View on Amazon" (→ Author Central)
- Portrait placeholder still in place (emoji) — real photo not yet added

**SEO (head):**
- Title: *About David Alexandru — Author of HydraComix Children's Comic Books*
- Canonical: `https://www.hydra-comix.com/about.html`
- Open Graph + Twitter Card tags
- JSON-LD: `Person` (with `sameAs` → Amazon Author Central), `BreadcrumbList`

---

## Amazon Links

All buy buttons link to `amazon.co.uk` (primary audience is UK).

| Book | ASIN | Amazon UK |
|---|---|---|
| Country Balls | B0DRYSM7GJ | `https://www.amazon.co.uk/dp/B0DRYSM7GJ/` |
| Country Balls Return | B0DSSZMV83 | `https://www.amazon.co.uk/dp/B0DSSZMV83/` |
| Country Balls Heroes | B0DWKBCD7X | `https://www.amazon.co.uk/dp/B0DWKBCD7X/` |
| Country Balls Golden Era | B0DZVQ4DCX | `https://www.amazon.co.uk/dp/B0DZVQ4DCX/` |
| Country Balls Mania | B0GJPTJBG5 | `https://www.amazon.co.uk/dp/B0GJPTJBG5/` |

Amazon Author Central: `https://www.amazon.co.uk/stores/David-Alexandru/author/B0F5HLY1M5`

---

## SEO Infrastructure

| Item | Status |
|---|---|
| `robots.txt` | Live — allows all crawlers, points to sitemap |
| `sitemap.xml` | Live — 3 pages + image entries, domain: hydra-comix.com |
| Canonical URLs | All 3 pages — `https://www.hydra-comix.com/...` |
| Open Graph tags | All 3 pages |
| Twitter Card tags | All 3 pages |
| JSON-LD structured data | All 3 pages (Organization, Book, Person, FAQ, Video, Breadcrumbs) |
| Google Search Console | Submitted — verify ownership + sitemap pending |

---

## Language Support (i18n)

`i18n.js` fetches `translations/<code>.json` and applies strings to elements with `data-i18n="key"` attributes. Language preference saved to `localStorage`.

**Status:** English complete (38 keys). French, German, Romanian shown as "coming soon" in dropdown — JSON files not yet created.

**To add a language:**
1. Create `translations/<code>.json` (copy `en.json` as template, translate all 38 keys)
2. Add entry to `LANGUAGES` map in `i18n.js`
3. Remove `disabled` / `coming-soon` class from the matching `<button>` in each page's navbar

---

## How to Run Locally

Open `index.html` directly in a browser for most work. For video playback use a local server:

```bash
cd "c:\Dana Oracle\Tech-MCP\claudecode_prjs\hydra-comix-website"
python -m http.server 8080
# then open http://localhost:8080
```

---

## Known Placeholders / Still To Do

See `todo.md` for the full action list. Summary:
- Author portrait on `about.html` is still an emoji placeholder
- `all-about-country-balls.txt` is empty — content not yet written
- French, German, Romanian translations not yet created
