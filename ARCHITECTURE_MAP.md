# ARCHITECTURE_MAP.md — Sophie Klose Counselling Site rebuild

Translates `SOURCE_INVENTORY.md` into the target Content Ops Starter / Next.js / Visual Editor architecture. Persistent reference for later phases — read at the start of every session.

**Scope of approval:** the user reviews and approves this map before Phase 2 (Bootstrap). Changes after approval are expensive.

Last updated: 2026-05-05

---

## 1. Page types (page models in `stackbit.config.ts`)

The site is small and structurally homogeneous — every page is a stack of sections — so we only need **one** page model.

| Model | Purpose | Source pages mapped to it |
|---|---|---|
| `Page` | A generic landing-style page composed of an ordered `sections` array. | `/`, `/about`, `/why-counselling`, `/webinars`, `/book-club`, `/resources`, `/contact` (all 7 pages) |

Field shape (draft):

```
Page {
  type: "page"
  filePath: "content/pages/{slug}.json"
  fields: [
    title:        string  // <title> tag
    slug:         string  // URL slug; "" for the homepage
    metaDescription: string  // <meta name="description">
    ogImage:      image (optional)  // social share image
    sections:     list of section models (see §2)
    showInNav:    boolean (default true)  // toggles auto-inclusion in derived nav lists; the actual header.json controls order
  ]
}
```

**Why one model, not several:** the Content Ops Starter ships separate `PostLayout` / `PostFeedLayout` types for blog use cases, but we don't have a blog. Keeping a single `Page` model means every page is editable the same way and we don't carry dead complexity.

If we later add per-post archive pages (e.g. a Book Club archive in v2), we'll add a second model then — not now.

## 2. Section types (section models)

Deduplicated from the SOURCE_INVENTORY §3 catalog. Every section type a page uses must be declared here so the Visual Editor can render an edit form. Field lists are drafts — exact names land when we wire them up in Phase 4.

Where the Content Ops Starter ships an equivalent (most of these have rough analogues), we'll **adapt** rather than build from scratch. Phase 4 starts by checking each one and deciding keep / rename / extend.

### Hero / page openers

#### `HeroSplitSection`
Used on: homepage only. Two-column hero with image on one side and headline copy on the other.
Fields: `eyebrow` (string), `title` (markdown — supports `<em>` accents), `subtitle` (string), `actions` (list of `Button`: label, url, style=primary|secondary), `image` (image), `imagePosition` (left|right, default right).

#### `PageHeroSection`
Used on: `/about`, `/why-counselling`, `/webinars`, `/book-club`, `/resources`, `/contact`. Centered eyebrow + h1 + intro paragraph. No image.
Fields: `eyebrow` (string), `title` (markdown), `intro` (string).

### Body sections

#### `IconCardGridSection`
Used on: homepage specialisms, About values, Why Counselling "How it works" steps, Webinars "How it works" steps. A 3-up (or N-up) grid of cards, each with an icon/emoji or step number, a short heading, and a body paragraph.
Fields: `eyebrow` (string, optional), `title` (markdown, optional), `cards` (list of `IconCard`), `columns` (number, default 3), `background` (default|cream).
`IconCard`: `icon` (string — emoji or step number), `iconStyle` (emoji|number|image), `title` (string), `body` (string).

#### `TextImageSection`
Used on: Why Counselling "What to Expect", homepage Approach (with the offset image + pull-quote variant). Two-column block with prose on one side and an image on the other; supports an optional pull-quote and CTA inside the prose column.
Fields: `eyebrow` (string), `title` (markdown), `body` (markdown), `pullQuote` (string, optional), `cta` (Button, optional), `image` (image), `imagePosition` (left|right), `background` (default|cream).

#### `DetailRowsSection`
Used on: Why Counselling deep-dive specialisms (3 stacked 2-col rows separated by hairlines). A list section where each row has icon + title on the left and prose + bullet list on the right.
Fields: `eyebrow` (string, optional), `title` (markdown, optional), `rows` (list of `DetailRow`), `background` (default|cream).
`DetailRow`: `icon` (string), `title` (markdown), `body` (markdown), `bulletsHeading` (string, e.g. "Areas include:"), `bullets` (list of strings).

#### `AboutLayoutSection`
Used on: About page only. Bespoke 2-column layout with portrait + credentials box on the left and long-form prose with embedded sub-headings on the right, plus a closing CTA.
Fields: `image` (image), `imageAlt` (string), `credentialsHeading` (string, default "Professional Credentials"), `credentials` (list of strings), `eyebrow` (string), `title` (markdown), `body` (markdown — supports `<h2>` etc. via prose styling), `cta` (Button, optional).

#### `BannerStripSection`
Used on: homepage credentials strip, homepage languages strip ("Counselling in French & English"). One-line emphasis band, optionally with a heading + sub-line.
Fields: `variant` (creditsList|titleStrip), `items` (list of strings, used when variant=creditsList; rendered with ✓ prefix), `title` (markdown, used when variant=titleStrip), `subtitle` (string, used when variant=titleStrip), `background` (cream|sage|charcoal|none).

#### `TestimonialSection`
Used on: homepage. Centered pull-quote + cite line.
Fields: `eyebrow` (string, default "Client Reflections"), `quote` (markdown), `cite` (string).

#### `DarkCtaSection`
Used on: homepage, why-counselling, webinars, book-club, resources. Charcoal- or deep-sage-background banner with centered title + body + a primary button.
Fields: `eyebrow` (string, optional), `title` (markdown), `body` (string), `cta` (Button), `background` (charcoal|deepSage).

#### `ProseSection`
Used on: Book Club intro (long-form text with a decorative divider and theme pills), and as a fallback for any future text-only block.
Fields: `eyebrow` (string, optional), `title` (markdown, optional), `body` (markdown), `themePills` (list of strings, optional — renders pill row), `background` (default|cream), `centered` (boolean, default false).

### Page-specific sections

#### `WebinarGridSection`
Used on: `/webinars`. Lists `Webinar` content entries (see §3) in a card grid.
Fields: `eyebrow` (string), `title` (markdown), `webinars` (list — reference to `Webinar` model), `defaultButtonLabel` (string, default "Coming Soon"), `defaultButtonUrl` (string, default `/contact`).

#### `ResourceGroupSection`
Used on: `/resources` (the page composes 5 of these — one per theme group). A heading plus a card grid of resources. Each `Resource` is its own model so the list can be edited as content (see §3).
Fields: `eyebrow` (string), `title` (markdown), `resources` (list — reference to `Resource` model), `background` (default|cream).

#### `BookClubFeatureSection`
Used on: `/book-club`. Renders the single "current book" featured card (cover image link + title/author/tagline/description/source URL). Per Phase 0 decision (#6) there is **no archive**; this section shows one book.
Fields: `eyebrow` (string, default "This Month"), `title` (markdown), `book` (object: `coverImage`, `coverAlt`, `bookTitle`, `author`, `tagline`, `description` (markdown), `sourceLabel`, `sourceUrl`).

#### `ContactDetailsSection`
Used on: `/contact`. Stacked detail items separated by hairlines (Email, Location, Online, Fees, Languages).
Fields: `eyebrow` (string), `title` (markdown), `details` (list of `DetailItem`).
`DetailItem`: `heading` (string), `body` (markdown — supports the `<a href="mailto:">` pattern).

#### `ContactFormSection`
Used on: `/contact`. The Netlify Form. Fields are content-configurable so labels and option lists can be edited without code.
Fields: `heading` (string, default "Send a Message"), `formName` (string, default "contact"), `submitLabel` (string, default "Send Message"), `successMessage` (string), `errorMessage` (string), `privacyNote` (string), `fields` (list of `FormField`).
`FormField`: `name` (string), `type` (text|email|select|textarea), `label` (string), `placeholder` (string), `required` (boolean), `options` (list of `{label, value}` — used when type=select), `optionalNoteLabel` (string).

#### `FaqSection`
Used on: `/contact`. Two-column FAQ list.
Fields: `eyebrow` (string, default "Frequently Asked"), `title` (markdown), `items` (list of `{question, answer}`), `background` (default|cream).

### Section-model summary

15 section models total: 3 page-opener / 7 body / 5 page-specific. Most have direct Content Ops Starter analogues; expect Phase 4 to be adapt-not-author for the majority.

## 3. Standalone content models (referenced by sections)

These are not sections themselves — they are content entries that section models reference. Modeling them this way means the user can edit a webinar or a resource once and have it appear wherever it's referenced.

#### `Webinar`
File path: `content/webinars/{slug}.json` (4 entries to start).
Fields: `slug` (string), `seriesBadge` (string, default "Webinar Series: Reclaiming Our Humanity"), `icon` (string, default "🎥"), `title` (string), `description` (string), `duration` (string, default "TBA"), `buttonLabel` (string, default "Coming Soon"), `buttonUrl` (string, default `/contact`), `purchaseUrl` (string, optional — for future Stripe/etc; unused in v1), `published` (boolean).

#### `Resource`
File path: `content/resources/{slug}.json` (~35 entries to start).
Fields: `slug` (string), `tag` (enum: Book | Podcast | Research | Resource | Digital Literacy | …), `title` (string — supports the "— Author" suffix), `description` (string), `linkLabel` (string, default "Learn more →"), `linkUrl` (string), `group` (string — one of "Caring for Adolescents & Young Adults" | "Parenting in a Digital World" | "Neurodiversity & ADHD" | "Insights from Neuroscience" | "Other Helpful Resources"). The `ResourceGroupSection` filters resources by group.

**Alternative considered:** inline the resources directly inside each `ResourceGroupSection` instead of a separate model. Rejected because (a) the user is more likely to add/move/edit individual resources than reorganise whole groups; (b) the same resource might one day appear on multiple pages (e.g. a future "tech-wellbeing" landing page); (c) editing 35 entries in a flat editable list is cleaner than nested forms.

## 4. Reusable / global data

Files under `content/data/`. Not pages, not sections — site-wide content that header/footer/`<head>` read from.

#### `content/data/header.json` — bound to a `Header` data model
Fields: `logoText` (string, default "Sophie Klose, Psychological Counsellor (MA)"), `logoTagline` (string, default "Flourishing Psychology & Wellbeing"), `navItems` (list of `{label, url, style}` — `style` is default | cta), `mobileMenuItems` (list of `{label, url}` — defaults to copying `navItems` minus the CTA styling).

#### `content/data/footer.json` — bound to a `Footer` data model
Fields: `brand` (object: `name`, `tagline`, `email`), `linkGroups` (list of `{heading, links: [{label, url}]}` — three groups: Navigation / Specialisms / Contact), `legalLine` (string, default "© 2025 Sophie Klose · Flourishing Psychology & Wellbeing"), `credentialsLine` (string, default "SGfB · ACA · BACP Member").

**Note:** the source has an inconsistency where the Book Club link only appears in the footer Navigation group on `book-club.html`. The rebuild fixes this — the canonical `footer.json` includes Book Club globally.

#### `content/data/site.json` — bound to a `SiteConfig` data model
Fields: `siteName` (string, default "Flourishing Psychology & Wellbeing — Sophie Klose"), `siteUrl` (string, default `https://sophieklose.com`), `defaultOgImage` (image, optional), `favicon` (image — set in Phase 3 with the new SVG mark), `contactEmail` (string, default `contact@sophieklose.com`), `schemaOrg` (object: structured-data fields for the JSON-LD block — `businessName`, `addressLocality`, `addressCountry`, `latitude`, `longitude`, `services` list, `sameAs` list). Per Phase 0 gotcha, third-party embed IDs go here too — but in v1 there are none.

## 5. Routing — source URL → target URL

Default policy: preserve URLs exactly to keep SEO. The source uses `.html` suffixes; the target drops them per Next.js convention, so we add 301 redirects for the legacy paths.

| Source URL (current live) | Target URL (rebuild) | Page model | Notes |
|---|---|---|---|
| `/` | `/` | Page | Homepage. |
| `/index.html` | `/` | (redirect) | 301 → `/`. |
| `/about.html` | `/about` | Page | |
| `/why-counselling.html` | `/why-counselling` | Page | |
| `/webinars.html` | `/webinars` | Page | |
| `/book-club.html` | `/book-club` | Page | |
| `/resources.html` | `/resources` | Page | |
| `/contact.html` | `/contact` | Page | |

**Redirects to add to `netlify.toml` in Phase 6:**

```
[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301

[[redirects]]
  from = "/about.html"
  to = "/about"
  status = 301

# …same shape for the remaining 5 .html paths
```

No URL slugs change intentionally. `Book Now` CTAs continue to land at `/contact` (which keeps the contact-form-as-booking flow per Phase 0 decision #7).

## 6. Out of scope for v1 (do not build)

Per Phase 0 decisions and the brief's explicit instructions. Listed here so future-Claude doesn't drift back into them.

- **French / `/fr/` localisation** (decision #8). Bilingual messaging stays in English copy as a service descriptor.
- **Webinar purchase / checkout flow** (#5). Cards stay "Coming Soon"; `Webinar.purchaseUrl` is reserved for v2.
- **Calendar / booking integrations** (#7). No Calendly, Cal.com, Acuity, etc.
- **Book Club archive / past selections** (#6). Single "current book" only.
- **Logo redesign** (#3). Text wordmark stays; only a new favicon SVG is in scope (Phase 3).
- **Carrying over old git history** (#10). Fresh repo.
- **Five orphaned images** (#4): `zebra.jpg`, `Sophie2.JPG`, `BookClubPicture.jpeg`, `Window.JPG`, `sunlit-office.JPG`. Drop at migration.
- **Stackbit annotator script** (`unpkg.com/@stackbit/annotator`) and the existing `data-sb-object-id="...html:Page"` markers in the source HTML. The Visual Editor handles annotations natively in the rebuild.
- **Existing `stackbit.config.ts` in `sophiekloserepo-main/`** — that's the old `html`-based Stackbit config from a previous experiment. The rebuild authors a fresh one in Phase 4.
- **Existing `submission-success` page** — none exists; we'll either lean on Netlify's default success page or add a custom `/contact/thanks` page if the user wants one. (Flagged as a small Phase 7 decision, not v1-blocking.)
- **Sentry / Analytics / SEO polish (OG meta, sitemap.xml, structured data on inner pages)** — deferred to Phase 9.

## 7. Open items still needed before Phase 2

- Mailgun domain string (Phase 7 input only — not blocking Phase 2).
- DNS registrar control / login (Phase 10 input only — not blocking Phase 2).
- Confirm the two thesis PDFs in `sophiekloserepo-main/` are the canonical versions to bundle in `public/` (Phase 5 input).

---

## 8. Phase 4 implementation strategy (added 2026-05-05)

After inspecting the Content Ops Starter we discovered the starter is more capable than §2 assumed: two starter models (`GenericSection` and `FeaturedItemsSection`) collapse most of our 15 model list. Rather than authoring 15 bespoke models, we **reuse two starter workhorses with configuration variants**, extend two existing models, and add one bespoke model + one standalone content model.

### 8.1 Final model inventory for Phase 4

| Built as | Used for our models from §2 |
|---|---|
| **`GenericSection` (reuse, no changes)** | HeroSplitSection, PageHeroSection, TextImageSection, DarkCtaSection, ProseSection, BannerStripSection, TestimonialSection, BookClubFeatureSection, ContactFormSection (with FormBlock media) |
| **`FeaturedItemsSection` (reuse; possibly extend `FeaturedItem` with explicit `icon` field)** | IconCardGridSection (`variant: three-col-grid`), DetailRowsSection (`variant: big-list`), ResourceGroupSection (`variant: three-col-grid`, one section per group), WebinarsSection (4 inline FeaturedItems on the webinars page; per Phase 4 decision (C), no standalone `Webinar` model), FaqSection (`variant: two-col-grid`, flat layout per Phase 4 decision (B) — toggle/accordion is a Phase 9 candidate) |
| **`Footer` (extend)** | Footer requires 3 link groups (Navigation / Specialisms / Contact); starter ships only 2 (`primaryLinks` / `secondaryLinks`). Replace with `linkGroups: list of FooterLinksGroup`. |
| **`Header` (reuse, content-only changes)** | Header — already supports text title + nav links + variant; configure via `header.json`. |
| **`ContactDetailsSection` (new bespoke model — per Phase 4 decision (A))** | Contact details list (Email / Location / Online / Fees / Languages — 5 detail items each with heading + body markdown). Lightweight model (~30 min); only used on `/contact`. |
| **`Resource` (new standalone content model)** | ~35 entries in `content/resources/{slug}.json` referenced by `ResourceGroupSection`. |
| **`AboutLayoutSection`** | **Decided late.** Either extend `GenericSection` with an optional `sideContent` slot for the credentials sidebar, or render the credentials box inline in markdown. Defer until Phase 5 when the about page is migrated. |

### 8.2 Phase 4 build sequence

1. **Phase 4.1 — Cleanup commit: delete unused starter blog/post infrastructure.** Models: `PostLayout`, `PostFeedLayout`, `PostFeedSection`, `PagedPostsSection`, `RecentPostsSection`, `FeaturedPostsSection`, `PricingPlan`, `PricingSection`, `Person`, `FeaturedPeopleSection`. Components: matching `src/components/sections/` and `src/components/layouts/` directories. Content: `content/pages/blog/`, `content/pages/careers.md`, `content/pages/pricing.md`, the six `content/data/personN.json` files. Update `PageLayout.ts` `sections` allowlist + `components-registry.ts` mapping. Single commit. Likely fixes the deferred Phase 2.6 Visual Editor preview iframe error (root cause was `PostFeedLayout.file is required` warning).
   - **Keep for now** (cheap to leave, possibly useful): `CarouselSection`, `ImageGallerySection`, `DividerSection`.
2. **Phase 4.2 — Extend `Footer` model + wire `header.json` and `footer.json` content.** Migrate the wordmark, 7 nav links, 4-column footer with 3 link groups, copyright + credentials line.
3. **Phase 4.3 — Update `PageLayout.ts` sections allowlist** to remove deleted section types (covered in 4.1 if combined).
4. **Phase 4.4 — Verify `FeaturedItem` renders emoji icons cleanly.** If the source's 🌱/🧠/💡 don't size right via `tagline`, extend `FeaturedItem` with an explicit `icon: string` field.
5. **Phase 4.5 — Standalone `Resource` content model + `ResourceGroupSection` filter.** Adds the model definition; doesn't yet populate the 35 entries (that's Phase 5).
6. **Phase 4.6 — Bespoke `ContactDetailsSection` model + component.** ~30 min build.
7. **Phase 4.7 — Cleanup commit + verify Visual Editor preview now renders.** Single commit, push to main and preview.

`AboutLayoutSection` decision deferred to Phase 5 per §8.1.
