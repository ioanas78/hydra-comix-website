# CLAUDE.md — HydraComix Website

## What this project is

A static website for **HydraComix** — a children's comic book series by David Alexandru (ages 8–17). Five books in the *Country Balls* series, sold on Amazon UK. No backend, no build step.

Live URL: https://www.hydra-comix.com
GitHub: https://github.com/ioanas78/hydra-comix-website
Amazon Author Central: https://www.amazon.co.uk/stores/David-Alexandru/author/B0F5HLY1M5

## Running locally

Open `index.html` directly in a browser for most work. For video playback, use a local server (browsers block `<video>` on `file://`):

```bash
cd "c:\Dana Oracle\Tech-MCP\claudecode_prjs\hydra-comix-website"
python -m http.server 8080
# then open http://localhost:8080
```

## File structure

```
hydra-comix-website/
├── index.html              # Home: hero, gift callout, series intro, books grid, FAQ, footer
├── golden-era.html         # Country Balls Golden Era: hero, video trailer, 15-chapter gallery
├── about.html              # Author bio + Author Central link
├── styles.css              # Shared dark comic-book stylesheet (~750 lines)
├── i18n.js                 # Language-switching engine
├── robots.txt              # Allows all crawlers; sitemap pointer
├── sitemap.xml             # 3 pages + image entries; domain: hydra-comix.com
├── CNAME                   # Custom domain: www.hydra-comix.com
├── HydraComix-logo.jpg     # Legacy root logo (not used by HTML pages)
├── translations/
│   └── en.json             # 38 translation keys (fr/de/ro scaffolded but not yet added)
├── assets/
│   └── images/
│       ├── hydracomix-logo.jpg                          # Navbar logo
│       ├── social/hydracomix-og.jpg                     # OG/Twitter Card image (1200×630)
│       ├── covers/                                      # 6 book cover JPGs
│       └── previews/country-balls-golden-era-chapter-[01-15].jpg
├── CountryBallsGoldenEra/  # Original large assets
│   ├── Country_Balls__Golden_Era_(brief1).mp4           # 16 MB video trailer
│   ├── CountryBalls Golden Era - codex.pptx             # 31 MB
│   ├── CountryBallsGoldenEra-Interior.pdf               # 135 MB — excluded from git
│   └── CountryBallsGoldenEra-[1-15].png                # Original chapter PNGs
├── front covers/           # Original cover PNGs (legacy, not referenced by HTML)
├── amazon-books-links.txt  # Reference: Amazon UK ASINs and links
├── about-the-author.txt    # Source copy for about.html
├── all-about-country-balls.txt  # EMPTY — content not yet written
├── todo.md                 # Outstanding action items
├── SEO-plan.md             # SEO implementation log
└── WEBSITE-PLAN.md         # Full design and structure spec
```

## Design system

**Colours** (defined in `styles.css`):
- Background: `#1a1008` (dark brown)
- Gold accent: `#ffd700`, `#f5a623`
- Red accent: `#cc2200`
- Card borders use gold/red throughout

**Typography:** *Bangers* (Google Fonts) for headings, *Nunito* for body.

**Key CSS patterns:**
- Halftone background via CSS radial-gradient
- Starburst clip-paths on callout elements
- Sticky navbar with hamburger menu for mobile
- Responsive book grid

## i18n system

`i18n.js` fetches `translations/<code>.json` and applies strings to elements carrying `data-i18n="key"` attributes. Language preference persisted to `localStorage`. Dropdown is an ARIA listbox.

**To add a language:** create `translations/<code>.json` with the same 38 keys as `en.json`, register in the `LANGUAGES` map in `i18n.js`, and remove `disabled`/`coming-soon` from the matching navbar `<button>` in each page.

## SEO implementation

All three pages include:
- Canonical URLs pointing to `https://www.hydra-comix.com`
- Open Graph and Twitter Card meta tags
- JSON-LD structured data:
  - `index.html`: `Organization`, `ItemList` (5 books), `FAQPage`
  - `golden-era.html`: `Book`, `VideoObject`, `BreadcrumbList`
  - `about.html`: `Person` (with `sameAs` → Author Central), `BreadcrumbList`
- `robots.txt` and `sitemap.xml` live at the domain root
- Google Search Console: site submitted, sitemap submitted

## Book series — Amazon UK links

All buy buttons use `https://www.amazon.co.uk/dp/<ASIN>` (primary audience is UK).

| Title | ASIN |
|---|---|
| Country Balls | B0DRYSM7GJ |
| Country Balls Return | B0DSSZMV83 |
| Country Balls Heroes | B0DWKBCD7X |
| Country Balls Golden Era | B0DZVQ4DCX |
| Country Balls Mania | B0GJPTJBG5 |

## Known placeholders / open tasks

See `todo.md` for the full action list. Summary:
- Author portrait in `about.html` uses an emoji placeholder — needs a real image
- `all-about-country-balls.txt` is empty — content not yet written
- French, German, and Romanian translation JSON files don't exist yet

## Git notes

- `CountryBallsGoldenEra-Interior.pdf` (135 MB) is excluded via `.gitignore` — do not stage or commit it
- `.claude/` tooling folder and `*.zip` files are also excluded via `.gitignore`
- Large binary assets (PNGs, mp4, pptx) are tracked in git; keep additions minimal
