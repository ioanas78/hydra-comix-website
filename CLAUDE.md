# CLAUDE.md — HydraComix Website

## What this project is

A static website for **HydraComix** — a children's comic book series by David Alexandru (ages 8–17). Five books in the *Country Balls* series, sold exclusively on Amazon UK. No backend, no build step.

Live URL: https://www.hydra-comix.com
GitHub: https://github.com/ioanas78/hydra-comix-website

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
├── index.html              # Home: sticky nav, hero, 5-book grid, gift callout, footer
├── golden-era.html         # Country Balls Golden Era: hero, video trailer, 15-chapter gallery
├── about.html              # Author bio, comic quote callout
├── styles.css              # Shared dark comic-book stylesheet (~750 lines)
├── i18n.js                 # Language-switching engine
├── robots.txt / sitemap.xml
├── HydraComix-logo.jpg
├── translations/
│   └── en.json             # 38 translation keys (fr/de/ro scaffolded but not yet added)
├── front covers/           # 5 PNG book covers
│   ├── CountryBalls - front cover.png
│   ├── CountryBalls Return - front cover.png
│   ├── CountryBalls Heroes - front cover.png
│   ├── CountryBalls Golden Era - front cover.png
│   └── CountryBalls Mania - front cover.png
└── CountryBallsGoldenEra/  # Golden Era assets (222 MB total)
    ├── Country_Balls__Golden_Era_(brief1).mp4   # 16 MB video trailer
    ├── CountryBalls Golden Era - codex.pptx     # 31 MB
    ├── CountryBallsGoldenEra-Interior.pdf       # 135 MB — excluded from git
    └── CountryBallsGoldenEra-[1-15].png         # 15 chapter images
```

Planning docs: `WEBSITE-PLAN.md` (design spec), `SEO-plan.md` (SEO strategy).

## Design system

**Colors** (defined in `styles.css`):
- Background: `#1a1008` (dark brown)
- Gold accent: `#ffd700`, `#f5a623`
- Red accent: `#cc2200`
- Card borders use gold/red throughout

**Typography:**
- Headings: *Bangers* (Google Fonts, bold comic style)
- Body: *Nunito*

**Key CSS patterns:**
- Halftone background via CSS radial-gradient
- Starburst clip-paths on callout elements
- Sticky navbar with hamburger menu for mobile
- Responsive book grid

## i18n system

`i18n.js` is a lightweight translation engine:
- HTML elements carry `data-i18n="key"` attributes
- Language JSON files live in `translations/` (only `en.json` is complete)
- User preference is persisted to `localStorage`
- Language dropdown rendered as ARIA listbox

**To add a language:** create `translations/<code>.json` with the same 38 keys as `en.json`, then register the language in the `LANGUAGES` map in `i18n.js`.

## SEO implementation

All three pages include:
- Open Graph and Twitter Card meta tags
- JSON-LD structured data (`Organization` + `ItemList` on index, `Person` on about)
- Canonical URLs pointing to the GitHub Pages domain

## Book series — Amazon UK links

| Title | ASIN |
|---|---|
| Country Balls | B0DRYSM7GJ |
| Country Balls Return | B0DSSZMV83 |
| Country Balls Heroes | B0DWKBCD7X |
| Country Balls Golden Era | B0DZVQ4DCX |
| Country Balls Mania | B0GJPTJBG5 |

Links follow the pattern: `https://www.amazon.co.uk/dp/<ASIN>`

## Known placeholders / open tasks

- Author portrait in `about.html` uses an emoji placeholder — needs a real image
- `all-about-country-balls.txt` is empty — content not yet written
- French, German, and Romanian translations are scaffolded but JSON files don't exist yet
- Book description copy in `index.html` may still be placeholder text

## Git notes

`CountryBallsGoldenEra-Interior.pdf` (135 MB) is excluded via `.gitignore` — do not attempt to stage or commit it.

Large binary assets (PNGs, mp4, pptx) are tracked in git; keep additions to this folder minimal.
