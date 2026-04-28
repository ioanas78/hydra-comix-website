# SEO Plan — HydraComix Website

## Context
The HydraComix static site (`hydra-comix-website/`) currently has basic meta titles and descriptions but is missing all technical SEO infrastructure and keyword-targeted content. The goal is to make it rank well for: **children comic book, comic books, kids comic book, kids books, children books, present idea for children, gift ideas for children, present idea/gift ideas for boys, present idea/gift ideas for girls**.

The site has no canonical URLs, no Open Graph tags, no structured data, no robots.txt, and no sitemap.xml. Book descriptions are all "coming soon." The gift/present angle does not appear anywhere in the content.

Domain is TBD — we'll use `https://ioanas78.github.io/hydra-comix-website` as the base URL (update to custom domain later when decided).

---

## Files to Modify

| File | Change type |
|------|-------------|
| `index.html` | Title, meta desc, canonical, OG tags, JSON-LD, hero content, gift section |
| `golden-era.html` | Title, meta desc, canonical, OG tags, JSON-LD (Book + VideoObject), image alts |
| `about.html` | Title, meta desc, canonical, OG tags, JSON-LD (Person), H2 structure |
| `translations/en.json` | Hero subtitle, book descriptions, gift section strings |
| `robots.txt` | **Create new** |
| `sitemap.xml` | **Create new** |

---

## Step-by-Step Implementation

### Step 1 — `robots.txt` (new file)
```
User-agent: *
Allow: /
Sitemap: https://ioanas78.github.io/hydra-comix-website/sitemap.xml
```

### Step 2 — `sitemap.xml` (new file)
Three `<url>` entries for `index.html`, `golden-era.html`, `about.html`.
- Priority: index=1.0, golden-era=0.8, about=0.6
- changefreq: monthly
- lastmod: 2026-04-28

### Step 3 — `index.html` head rewrites
- **Title**: `HydraComix — Comic Books for Kids | Gift Ideas for Children, Boys & Girls`
- **Meta description**: `HydraComix offers fun comic books for kids by young author David Alexandru. Country Balls series — a perfect gift idea for children, boys and girls aged 8–17.`
- **Canonical**: `<link rel="canonical" href="https://ioanas78.github.io/hydra-comix-website/">`
- **Open Graph** (7 tags):
  - og:type = website
  - og:site_name = HydraComix
  - og:title = same as title tag
  - og:description = same as meta description
  - og:url = canonical URL
  - og:image = `front covers/CountryBalls Golden Era - front cover.png` (absolute URL)
  - og:image:alt = "Country Balls Golden Era — children comic book by HydraComix"
- **Twitter Card** (2 tags): twitter:card=summary_large_image, twitter:title
- **JSON-LD** — two blocks:
  1. `Organization` schema: name=HydraComix, url, sameAs=GitHub repo URL
  2. `ItemList` schema: ListItem for each of the 5 books with name, url (Amazon link), image

### Step 4 — `index.html` body content changes
- **Hero subtitle** (`data-i18n="hero.subtitle"`): stays as i18n key — update the key value in `en.json`
- **Add "Perfect Gift" callout section** between hero and books grid:
  - H2: "The Perfect Gift for Young Readers"
  - Short paragraph mentioning: gift idea for children, boys and girls, kids books, ages 8–17
  - Uses `data-i18n` keys so it's translatable
- **Book descriptions**: Replace "Description coming soon..." with real keyword-rich descriptions for each title (added to `en.json`)

### Step 5 — `golden-era.html` head rewrites
- **Title**: `Country Balls Golden Era — Kids Comic Book | HydraComix`
- **Meta description**: `Country Balls Golden Era is the ultimate children's comic book — 15 chapters of adventure. A brilliant gift idea for boys and girls who love comics.`
- **Canonical**: `.../golden-era.html`
- **Open Graph**: same pattern as index, og:type=book, point og:image to the book cover PNG
- **JSON-LD** — two blocks:
  1. `Book` schema: name, author (David Alexandru), numberOfPages, genre=Comics, audience=Children, publisher=HydraComix, image
  2. `VideoObject` schema for the trailer: name, description, thumbnailUrl (poster image), contentUrl (mp4 path)
- **Image alt text**: Replace generic "Page 1"…"Page 15" with "Country Balls Golden Era — Chapter 1 preview, kids comic book" pattern

### Step 6 — `about.html` head rewrites
- **Title**: `About David Alexandru — Author of HydraComix Children's Comic Books`
- **Meta description**: `Meet David Alexandru, the young creator of the Country Balls children's comic book series — a unique gift idea for kids who love adventure and humour.`
- **Canonical**: `.../about.html`
- **Open Graph**: og:type=profile, og:title, og:description
- **JSON-LD** — `Person` schema: name=David Alexandru, jobTitle=Comic Book Author, worksFor=HydraComix, description (mentioning children's books)
- **Add H2 headings** inside the about prose to break it into scannable sections:
  - "The Country Balls Story"
  - "Why Kids Love It"
  - "A Gift Kids Actually Want"  ← weaves in gift keywords naturally

### Step 7 — `translations/en.json` updates
- `hero.subtitle`: `"Children's comic books — written by a kid, for kids"`
- Add `hero.giftTitle`: `"The Perfect Gift for Young Readers"`
- Add `hero.giftText`: `"Looking for a gift idea for children? Country Balls comic books are a hit with boys and girls aged 8–17 — fun, colourful, and made by a kid who loves comics just like them."`
- Add per-book descriptions under a `books.descriptions` object (one per title), each ~25 words, naturally including "kids comic book" or "children's book"
- Add `about.whyKidsTitle`, `about.whyKidsText`, `about.giftTitle`, `about.giftText` for the new H2 sections

---

## Keyword Coverage Map

| Keyword | Where it appears after changes |
|---------|-------------------------------|
| children comic book | All 3 page titles, meta descriptions, JSON-LD, book descriptions |
| comic books | index.html title, H2, book descriptions, footer tagline |
| kids comic book | golden-era title, meta desc, chapter alt texts, book descriptions |
| kids books / children books | index meta desc, gift callout, about page H2 |
| gift ideas for children | index meta desc, gift callout section, about.html meta desc |
| present idea for children | Synonym used in gift callout body text |
| gift ideas for boys | golden-era meta desc, gift callout (boys and girls phrasing) |
| present idea for boys | Synonym in about page "A Gift Kids Actually Want" section |
| gift ideas for girls | index meta desc, gift callout section |
| present idea for girls | Synonym in about page gift section |

---

## Verification
1. Open `python -m http.server 8080` from the project folder
2. Visit `http://localhost:8080` — check title bar, inspect `<head>` in DevTools, confirm OG tags and JSON-LD blocks are valid
3. Paste the golden-era URL into [https://validator.schema.org](https://validator.schema.org) to validate Book + VideoObject JSON-LD
4. Paste any page URL into [https://opengraph.xyz](https://opengraph.xyz) to preview social card rendering
5. Check `robots.txt` at `http://localhost:8080/robots.txt` and `sitemap.xml` at `http://localhost:8080/sitemap.xml`
6. Run a Lighthouse SEO audit in Chrome DevTools (target score ≥ 90)
