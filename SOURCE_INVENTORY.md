# SOURCE_INVENTORY.md — Sophie Klose Counselling Site

Inventory of the existing site (www.sophieklose.com / local copy `sophiekloserepo-main/`) as the source of truth for **structure, content, and visual design**. This file is a persistent reference for later phases — read at the start of every session.

Last updated: 2026-05-04
Source basis: local static HTML/CSS/JS in `sophiekloserepo-main/` plus a spot-check of the live site.

---

## 1. Page list

7 pages, all top-level `.html` files in the repo root, all sharing the same nav and footer.

| URL (current) | File | `<title>` | Purpose |
|---|---|---|---|
| `/` | `index.html` | Flourishing Psychology & Wellbeing — Sophie Klose | Homepage: hero, specialisms overview, approach, languages, testimonial, CTA. |
| `/why-counselling` | `why-counselling.html` | Why Counselling — Sophie Klose | Service deep-dive across the three specialisms; "How it works" 3-step process. |
| `/about` | `about.html` | About Me — Sophie Klose | Practitioner bio, credentials, approach, ethics, bilingual practice; values cards. |
| `/webinars` | `webinars.html` | Webinars — Sophie Klose | Catalogue of 4 upcoming webinars in the "Reclaiming Our Humanity" series; "How it works" steps. |
| `/book-club` | `book-club.html` | Book Club — Sophie Klose | Monthly book club intro, themes, and current featured book (currently *The Stoic Challenge*). |
| `/resources` | `resources.html` | Resources — Sophie Klose | Curated reading/listening lists in 5 themed groups (~35 cards). |
| `/contact` | `contact.html` | Contact & Book — Sophie Klose | Contact details, booking form (Netlify Forms), FAQ. |

Title tag pattern: `{Page Title} — Sophie Klose`. Each page has a unique `<meta name="description">`.

There is also a `submission-success` view referenced indirectly via `data-netlify="true"` (Netlify default success page) — no dedicated HTML file currently.

## 2. Navigation structure

### Header nav (identical on every page)
Logo (text): "Sophie Klose, Psychological Counsellor (MA)" with sub-line "Flourishing Psychology & Wellbeing", links to `/`.

Links, in order: Home · Why Counselling · About Me · Webinars · Book Club · Resources · **Book Now** (CTA-styled, links to `/contact`).

Mobile: hamburger toggles a full-screen overlay with the same 7 links.

### Footer (identical on every page; 4 columns + bottom row)
- **Brand column:** "Sophie Klose" / "Flourishing Psychology & Wellbeing — Bilingual counselling in Zurich and online." / `contact@sophieklose.com`.
- **Navigation:** Home, Why Counselling, About Me, Resources, Webinars (note: Book Club is in this list only on `book-club.html`; missing from other pages — likely an oversight in the source).
- **Specialisms:** Life Transitions, ADHD & Neurodiversity, Tech-Wellbeing — all three deep-link to `/why-counselling`.
- **Contact:** Book a Session (`/contact`), Send an Email (`mailto:contact@sophieklose.com`).
- **Footer bottom:** "© 2025 Sophie Klose · Flourishing Psychology & Wellbeing" + "SGfB · ACA · BACP Member".

No sidebar nav, no breadcrumbs.

## 3. Section catalog

Section blocks observed across pages, deduplicated. Names below are working names for the rebuild — the actual model names land in ARCHITECTURE_MAP.md.

| Section block | Used on | Description |
|---|---|---|
| **Site Header / Nav** | all | Fixed top, blurred bg, scroll-shadow, mobile overlay menu. |
| **Site Footer** | all | 4-col with brand + 3 link groups + legal/credentials bottom row. |
| **Hero (split image/text)** | index | 2-col grid: eyebrow + h1 + subtitle + 2 buttons; right side image with overlay. |
| **Page Hero (centered)** | why-counselling, about, webinars, book-club, resources, contact | Centered eyebrow + h1 + intro paragraph; no image. Pads to clear fixed nav. |
| **Credentials strip** | index | Single-line ✓-prefixed credential row. |
| **3-up icon cards (specialisms / values / process)** | index, about, why-counselling, webinars | Section label + title + 3 cards (icon/emoji + h3 + body). On webinars used as 3-step "How it works" with numbered steps. |
| **Two-column rich text + image** | why-counselling, contact (FAQ uses two-col without image) | Left text/prose, right image (or right column more text). |
| **Three deep-dive specialism rows** | why-counselling | Repeated 2-col blocks (icon+title left, prose+bulleted "Areas include" list right), separated by 1px hairlines. |
| **Approach (offset image + prose + blockquote)** | index | 2-col with image left, prose + pull-quote + secondary CTA right. |
| **About layout (photo + credentials box, prose right)** | about | 2-col: left = photo with credentials box overlay below, right = long prose with H2 sub-headings, blockquote, list, CTA. |
| **Languages strip** | index | Centered banner "Counselling in French & English" with sub-line. |
| **Testimonial (centered blockquote)** | index | Section label + large pull-quote + cite. |
| **Webinar card grid** | webinars | 4 cards: badge + icon + h3 + description + duration + button ("Coming Soon"). |
| **Resource card grid (5 themed groups)** | resources | Each group = section label + h2 + grid of cards (tag pill + h3 + description + outbound link). |
| **Book Club intro prose + theme pills** | book-club | Long prose + decorative leaf divider + 5 theme pills (Psychology / Neuroscience / Neurodiversity / Parenting / Philosophy). |
| **Book Club featured book** | book-club | 2-col: left = stylised CSS book cover linking to retailer (image overlaid), right = title/author/tagline/description/source link. |
| **Contact details list** | contact | Section label + h2 + 5 detail blocks (Email, Location, Online Sessions, Session Fees, Languages), separated by hairlines. |
| **Contact form** | contact | Netlify Form with hidden honeypot; fields: name, email, language (select), format (select), message (textarea). |
| **FAQ (two-column Q/A)** | contact | Section label + h2 + 2 columns of H2-styled questions + answers. |
| **Inline section-label divider note** | book-club ("A Note") | Centered "Welcome and enjoy!" mini-section. |
| **Dark CTA banner** | index, why-counselling, webinars, book-club, resources | Charcoal or deep-sage background, centered title + body + primary button. |

**Reusable candidates** (most likely to become first-class section types in the rebuild):
- Hero (split) and Page Hero (centered) — two variants of one model.
- 3-up Card Grid (icon + title + body), parameterised for both decorative emoji/icons and step numbers.
- Two-column text+image (with optional image side).
- Dark CTA banner.
- Card Grid generic (driving Webinar cards, Resource cards — shape is similar enough to share, with category-specific extras).
- Quote / Testimonial.
- Long-form prose (Book Club intro, About prose, FAQ columns).

## 4. Design tokens

Source: `style.css` (`:root` custom properties + observed sizing/spacing).

### Colors
| Token | Hex | Used for |
|---|---|---|
| `--cream` | `#F7F4EF` | Section bg accent |
| `--warm-white` | `#FDFBF8` | Page bg |
| `--sage` | `#8A9E8C` | Hover accent, dark-section accent |
| `--deep-sage` | `#4A6B4D` | Primary brand (buttons, em headings, dark CTA bg) |
| `--clay` | `#C4956A` | Eyebrow labels, accent rule, link underline |
| `--clay-light` | `#E8D5C0` | Surface accent (credentials box bg) |
| `--charcoal` | `#2C2C2C` | Primary text, dark CTA bg |
| `--mid-grey` | `#6B6B6B` | Secondary text |
| `--light-grey` | `#E8E4DE` | Hairlines, borders |

Dark-on-light primary buttons use `--deep-sage`; secondary buttons are uppercase text with a `--clay` underline.

### Typography
- **Display / serif:** Cormorant Garamond — weights 300, 400, 500, 600 (also italics 300/400). Used for h1/h2/h3, blockquotes, the nav logo wordmark, book club covers/taglines.
- **Body / sans:** Jost — weights 300, 400, 500. Body weight is 300; line-height 1.7.
- **Loaded from:** Google Fonts CDN via `@import url('…fonts.googleapis.com/css2?family=Cormorant+Garamond:…&family=Jost:…')` at the top of `style.css`.

Notable sizes:
- Hero title: `clamp(2.8rem, 5vw, 4.5rem)`
- Section title: `clamp(2rem, 4vw, 3.2rem)`
- Eyebrow / section-label: ~0.7–0.72rem, uppercase, letter-spacing ~0.18–0.22em.
- Body: 0.95–1rem.

### Spacing & layout
- Section vertical padding: ~5–6rem desktop (collapses to 5rem at ≤1024px).
- Nav height: ~80px (hero `padding-top:80px`).
- Page hero pads ~12rem top to clear nav.
- Content typography max-width: `.prose { max-width: 72ch }`.
- Common grid gap: 1.5–4rem depending on context.

### Borders, radii, shadows
- **Border-radius:** 2px globally (very rectilinear; see buttons, cards, images, credential box).
- **Pills (book club themes):** 999px.
- **Border style:** 1px solid `--light-grey` for hairlines; 1px solid `--clay-light` for the credentials box; 2px solid `--clay` left-border on blockquotes.
- **Shadows:** Used sparingly. Book club cover uses `0 30px 60px -30px rgba(44,44,44,0.5)`.

### Responsive breakpoints
- `1024px` — main desktop→tablet (hero collapses to single column, nav links → hamburger, two-col grids stack, footer goes 2-col).
- `600px` — small mobile (footer goes 1-col, hero title scales down, footer-bottom stacks).

### Motion
- `.fade-in` initial state `opacity:0; translateY(24px)`, transitions to visible via IntersectionObserver in `main.js`.
- Nav adds `.scrolled` class beyond 30px scroll for a thinner padding + hairline border.
- Buttons translateY(-1px) on hover.

## 5. Assets

All in `sophiekloserepo-main/` repo root (no `public/`-style folder). To migrate: copy into `public/` and reference by path.

### Images
| File | Used on | Notes |
|---|---|---|
| `seerose.JPG` | index hero | "Peaceful natural setting." Eager-loaded. |
| `zebra2.JPG` | index approach | Decorative; styled at 80% within frame. |
| `zebra.jpg` | (unused in HTML) | Possibly orphaned. |
| `sophiepicture.jpg` | about | Practitioner portrait. |
| `Sophie2.JPG` | (unused in HTML) | Possibly alternate. |
| `elephants.jpg` | why-counselling | "Calm counselling space" decorative. |
| `BookClubPicture.jpeg` | (unused in HTML) | Possibly orphaned. |
| `TheStoicChallange.png` | book-club | (Note: filename is misspelled "Challange"; HTML references `TheStoicCHallange.png` with mixed case — verify case sensitivity on Netlify.) |
| `Window.JPG` | (unused in HTML) | Possibly orphaned. |
| `sunlit-office.JPG` | (unused in HTML) | Possibly orphaned. |

**Action item for Phase 1:** confirm with user which orphaned images are intentional reserves vs. delete-on-migration.

### Documents (linked externally as well as bundled)
| File | Linked from |
|---|---|
| `SophieKloseThesis.pdf` | resources (linked via `https://sophieklose-git.github.io/...` external URL — not relative path) |
| `SophieKloseIndependentstudy2023.pdf` | resources (same external host) |

These PDFs are referenced from a different GitHub Pages host. We should self-host them in `public/` and update the links — flagged for ARCHITECTURE_MAP.md.

### Favicon / logo
- Favicon is an inline SVG data URI containing the 🌿 emoji (`<text font-size='90'>🌿</text>`) — no PNG/SVG file.
- No image logo file; the brand is rendered as text in the nav (`Cormorant Garamond` "Sophie Klose, Psychological Counsellor (MA)").

**Action item:** confirm whether a real favicon/logo SVG should be designed for the rebuild, or keep the emoji approach.

## 6. Dynamic behaviors

Static HTML site with one form and one Netlify-platform handler.

### Contact form (`contact.html`)
- Standard Netlify Form: `name="contact"`, `method="POST"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`.
- Hidden inputs: `form-name=contact`, `bot-field` (honeypot), `subject="New message from %{formName}"`.
- Visible fields: `name` (text, required), `email` (email, required), `language` (select: English / French), `format` (select: In-person Zurich / Online / Unsure), `message` (textarea, optional).
- AJAX submission handled in `main.js`: posts urlencoded to `/`, swaps button label to "Sending…", on success shows `form-status--success` toast and resets form; on error shows `form-status--error` and asks user to email directly.

### Netlify Function: `submission-created.mts` (Mailgun email forwarder)
- Triggered by Netlify Forms `submission-created` event.
- Filters for `payload.form_name === "contact"`.
- Reads env vars `MAILGUN_API_KEY` and `MAILGUN_DOMAIN`.
- Sends formatted HTML + plain-text email to `contact@sophieklose.com` via Mailgun REST API; sets `h:Reply-To` to submitter's email; timezone formatted for Europe/Zurich.
- On missing env vars or Mailgun failure, logs and returns 500.

**Required Netlify env vars (Phase 7 setup):**
- `MAILGUN_API_KEY` (secret)
- `MAILGUN_DOMAIN` (e.g. `mg.sophieklose.com` or similar — confirm exact domain with user)

### Other JS in `main.js`
- Sticky nav scroll-shadow toggle.
- Hamburger / mobile menu open & close, link-click closes menu.
- IntersectionObserver-based `.fade-in` reveal.
- "Active nav link" highlighting based on `window.location.pathname`.

### Structured data (SEO)
- `index.html` includes a `<script type="application/ld+json">` block describing the practice as a `MedicalBusiness` (name, alt name, URL, address Zürich/CH, geo 47.3769/8.5417, OfferCatalog of services, sameAs LinkedIn / Psychology Today).
- No JSON-LD on other pages.

### `llms.txt`
- Present at repo root — descriptive markdown for LLM crawlers, lists core services and links.

## 7. External integrations & embeds

Spot-checked the live site (via WebFetch); only externals visible are those already in the static export.

| Integration | Purpose | Where | Notes |
|---|---|---|---|
| Google Fonts CDN | Cormorant Garamond + Jost | `style.css` `@import` | Decision in Phase 3: keep CDN or self-host with `next/font`. |
| `unpkg.com/@stackbit/annotator` | Visual Editor in-page annotations | `index.html` only | Stackbit's editor helper script. The rebuild handles this natively — drop. |
| `https://sophieklose-git.github.io/sophiekloserepo/...PDF` | Hosting for two academic PDFs | resources.html links | Self-host in `public/` after migration. |
| Mailgun REST API | Outbound contact-form email | `submission-created.mts` | Retain. Env vars listed above. |
| Schema.org JSON-LD | SEO structured data | index.html | Make editable via `content/data/site.json` so locality/services aren't hardcoded. |

**Not present (confirmed absent in source):** Google Analytics, Plausible, Facebook Pixel, chat widgets, video embeds, iframes, payment processors, calendaring/booking embeds (Calendly etc.), social-media embeds.

**Hidden-content sweep:** No tooltips, modals, accordions, or expand/collapse sections. The mobile-menu overlay is the only hidden-by-default UI; FAQ on the contact page is fully visible (not collapsible).

## 8. SEO & meta

- Per-page unique `<title>` and `<meta name="description">`.
- All pages use the same emoji-SVG favicon.
- `lang="en"` on every `<html>`.
- No Open Graph, no Twitter cards, no canonical tags, no `sitemap.xml`, no `robots.txt` in repo (`robots.txt` IS listed in the source dir — but contents not yet inspected; flagged below).
- JSON-LD only on `/`.

**Action item Phase 9:** add OG/Twitter meta, sitemap, canonical URLs (low-effort SEO wins).

## 9. Existing Netlify / build config

- `netlify.toml` is a near-empty scaffold: `publish = "."`, no redirects, no headers, no plugins, no build command (static publish). Functions directory points at `/opt/build/repo/netlify/functions` but that folder isn't present in the snapshot — function may live at the repo root (`submission-created.mts`).
- A `stackbit.config.ts` exists in the source but is the old html-based Stackbit config from a previous Visual Editor experiment; the rebuild's `stackbit.config.ts` will be authored fresh in Phase 4.

## 10. Decisions resolved with user (2026-05-04)

| # | Topic | Decision |
|---|---|---|
| 1 | Netlify project | Fresh project for the rebuild; old project keeps serving live site until Phase 10 DNS swap. |
| 2 | Mailgun | Reuse existing `MAILGUN_API_KEY` (paste into new project's env vars in Phase 7). Domain value still pending — check Mailgun → Sending → Domains. |
| 3 | Logo / favicon | Keep text-only wordmark in the nav. Design a proper favicon SVG in Phase 3 (replaces the inline 🌿 emoji). |
| 4 | Orphan images | Drop all five at migration: `zebra.jpg`, `Sophie2.JPG`, `BookClubPicture.jpeg`, `Window.JPG`, `sunlit-office.JPG`. |
| 5 | Webinars | "Coming Soon" cards stay. Build proper editable `Webinar` content model so cards aren't hard-coded JSX; real purchase flow is post-v1. |
| 6 | Book Club | Single "current book" content field. No archive of past selections in v1. |
| 7 | Booking | Keep contact-form-as-booking. No Calendly / Cal.com / Acuity in v1. |
| 8 | Languages | English-only site. Bilingual messaging stays as a service descriptor. No `/fr/` routes in v1. |
| 9 | robots.txt | Port with corrected `Sitemap:` URL in Phase 6. Real sitemap generation in Phase 9. |
| 10 | Repo | Fresh GitHub repo, clean start. Old repo archived but readable. |

## 11. Unknowns — still needs user input

- [ ] **DNS registrar / control**: who holds the `sophieklose.com` domain login? Needed for the cutover step in Phase 10.
- [ ] **Mailgun domain value**: exact `MAILGUN_DOMAIN` string from Mailgun → Sending → Domains (e.g. `mg.sophieklose.com`). Needed in Phase 7.
- [ ] **Self-hosted PDFs**: confirm the two thesis PDFs in `sophiekloserepo-main/` are the canonical versions to bundle in `public/`.
