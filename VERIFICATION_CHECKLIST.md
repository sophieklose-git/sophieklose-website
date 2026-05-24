# Verification Checklist — sophieklose-website rebuild

Pre-cutover sanity pass. Tick items off as we go.
Test environment: **Netlify preview** (https://sophieklose-website.netlify.app) unless noted.

---

## 1. Routes & navigation

- [x] `/` (home) loads with 200
- [x] `/why-counselling` loads
- [x] `/about` loads
- [x] `/webinars` loads
- [x] `/book-club` loads
- [x] `/resources` loads
- [x] `/contact` loads
- [x] `/thank-you` loads (direct URL, not just via form submit)
- [x] Hitting an unknown URL (e.g. `/nope`) returns a 404 page (not blank, not crash)
- [ ] Browser back/forward navigation works across all 7 pages — _manual_

## 2. Header (every page)

- [x] Logo text "Sophie Klose, Psychological Counsellor (MA)" + tagline renders
- [x] Clicking the logo returns to `/`
- [x] All 6 nav links go to the correct page (Home, Why Counselling, About Me, Webinars, Book Club, Resources)
- [x] "Book Now" button → `/contact`
- [x] Login icon at far right → `/login` placeholder page
- [x] Header is sticky (stays visible on scroll)
- [x] Active link styling (if any) is correct on each page
- [x] Mobile menu (hamburger) opens / closes / nav links work

## 3. Footer (every page)

- [x] Brand block renders (name + tagline + email link)
- [x] Navigation group: 6 links all resolve
- [x] Specialisms group: all 3 links go to `/why-counselling`
- [x] Contact group: "Book a Session" → `/contact`, "Send an Email" opens mailto
- [x] Copyright text + credentials line render correctly on two lines

## 4. Redirects (Phase 6)

Test each old `.html` URL — must 301 to clean equivalent (Netlify appends trailing slash to final URL — fine):

- [x] `/index.html` → `/`
- [x] `/about.html` → `/about/`
- [x] `/why-counselling.html` → `/why-counselling/`
- [x] `/webinars.html` → `/webinars/`
- [x] `/book-club.html` → `/book-club/`
- [x] `/resources.html` → `/resources/`
- [x] `/contact.html` → `/contact/`

## 5. Homepage content

- [x] Hero: badge, title with italic "Clarity and Resilience", subtitle, credentials list (8 rows), 2 CTAs, image right
- [x] "Where I Can Support You" — 3 specialism cards with 🌱 🧠 💡 icons
- [x] Approach section with zebra image + "Learn more about me" link
- [x] "Counselling in French & English" strip
- [x] Testimonial section
- [x] Final CTA "Take the First Step Towards Lasting Wellbeing" → `/contact`

## 6. Other pages — content spot check

For each page, confirm:

- [x] **About**: hero with sophiepicture + credentials list; "Who I Am"; "Person-Centred Foundation"; "Memberships & Ethics"; "Specialisms"; "Core Values" 3 cards
- [x] **Why Counselling**: hero; intro card with elephants image; 3 two-col-grid sections (Identity, Neurodiversity, Digital — each with intro left, ✔ Areas Include right, headers left-aligned); 3-step Process section; final CTA
- [x] **Webinars**: all sections render; CTAs link correctly
- [x] **Book Club**: all sections render; *The Stoic Challenge* link opens amazon.de in new tab
- [x] **Resources**: each resource group renders; resource cards have 3px left accent; hover state works; external links open (sample 3-5)
- [x] **Contact**: hero; ContactDetailsSection with 5 detail blocks; form on the right; FAQ section

## 7. Contact form (Phase 7)

- [x] Form renders on `/contact` with all 5 fields (name, email, language, format, message)
- [x] Successful submit → redirects to `/thank-you`
- [x] Submission appears in Netlify dashboard → Forms → contact-form within 30s
- [x] Email notification arrives at `contact@sophieklose.com` within ~1 min
- [ ] HTML5 validation fires (try submitting empty) — _not explicitly tested_
- [ ] Email contains all submitted field values — _confirmed at least 1 email received_
- [ ] Honeypot: paste something into hidden `bot-field` via devtools, submit — should silently drop (no entry in dashboard) — _not explicitly tested_

## 8. Assets

- [x] All 5 hero/section images load (seerose, zebra2, sophiepicture, the-stoic-challenge, elephants) — no broken images
- [x] Both PDFs download / open in browser: `/pdfs/sophie-klose-thesis.pdf` (13.8 MB), `/pdfs/sophie-klose-independent-study-2023.pdf` (2.1 MB)
- [x] Favicon (leaf) renders in browser tab on all pages — at `/images/favicon.svg`; root `/favicon.svg` added as crawler fallback
- [ ] No console errors related to missing assets — _manual_

## 9. SEO

For each of the 7 pages, view source (or devtools → Elements → `<head>`) and confirm:

- [x] Unique `<title>` matches the page topic (verified on all 8 pages incl. thank-you)
- [x] Unique meta description present and reads naturally (verified on all 8 pages)
- [ ] Open Graph image set on homepage (and ideally per page) — _manual; site default still set to starter `/images/main-hero.jpg` in site.json, may want to swap_
- [ ] No `noindex` left over from dev (unless intentional on `/thank-you`) — _manual_
- [x] `robots.txt` present at `/robots.txt` and sensible — _added; allows all, disallows /thank-you and /__forms.html_

## 10. Visual Editor (preview branch flow)

- [ ] Visual Editor preview URL loads without "Studio Preview Error"
- [ ] Editing a string on a page in the editor saves + reflects in preview
- [ ] Publish from editor commits to `preview` branch on GitHub
- [ ] After merging `preview` → `main`, deploy succeeds

## 11. Responsive layout

Desktop (≥1280px), tablet (768-1024px), mobile (375-414px):

_Skipped explicit walkthrough; user confirmed pages look right at default viewport. Revisit if any responsive issue surfaces._

- [ ] Header collapses to hamburger on mobile
- [ ] Hero images don't overflow / aren't distorted
- [ ] Two-col-grid sections (Why Counselling) stack to single column on mobile
- [ ] Three-col-grid sections stack on mobile
- [ ] Contact form is usable on mobile (fields not cut off)
- [ ] Footer columns stack on mobile
- [ ] No horizontal scroll at any viewport width

## 12. Performance (rough check, not optimization)

Run Lighthouse in Chrome devtools → mobile profile:

Homepage (`/`) measured 2026-05-23:
- [ ] Performance ≥ 80 — **71** 🟡 below target; expected, hero images ~1-1.5 MB each. → Phase 9 polish item.
- [x] Accessibility ≥ 90 — **96** ✅
- [x] Best Practices ≥ 90 — **96** ✅
- [x] SEO ≥ 95 — **100** ✅
- [ ] LCP image (hero seerose) loads quickly — likely the perf bottleneck. Compress + WebP/AVIF in Phase 9.

Other pages not individually measured; smoke check considered sufficient at this stage.

## 13. Accessibility quick pass

_Lighthouse a11y score 96 on homepage covers most of this. Revisit if specific issues surface._

- [x] All images have meaningful `alt` text — Lighthouse 96 implies no major flags
- [ ] Form labels associated with inputs (clicking a label focuses the input) — not explicitly tested
- [ ] Tab order through nav + form is logical — not explicitly tested
- [ ] Focus styles visible on links and buttons — not explicitly tested
- [x] Color contrast on body text passes WCAG AA — Lighthouse 96 confirms

## 14. Browser compatibility

_Skipped explicit walkthrough; user tested in their working browser (Chrome) and reported no obvious issues. Revisit before cutover (Phase 10) with Safari iOS especially._

- [x] Chrome (latest)
- [ ] Safari (latest, ideally on iOS too) — _recommended before cutover_
- [ ] Firefox (latest)
- [ ] Edge (latest)

## 15. Build & deploy hygiene

- [ ] Latest commit on `main` (`ac3e272` or later) deployed and live
- [ ] No build warnings in the latest deploy log we haven't seen before
- [ ] `npm run build` succeeds locally
- [ ] `package.json` has no unused dependencies bloating the bundle (cursory)

---

## Outstanding from earlier phases

Track here so they don't get lost:

- [ ] Decide whether to bundle a `noindex` meta on `/thank-you` (low priority)
- [ ] Confirm DNS registrar access for Phase 10 cutover
- [ ] Decide on `deno.lock` — commit or keep ignored (only matters if we add Netlify Edge Functions later)
- [ ] Archive deprecated GitHub repo `markusklose-droid/sophieklose-website` and Netlify project `sophieklosenetlify` once cutover is complete

---

## Sign-off

When every box above is ticked and any "Found issues" below are resolved, Phase 8 is complete → proceed to Phase 9 (polish) or Phase 10 (cutover).

### Found issues during verification

_Add findings here as you walk through. Each gets a one-line description + the section it belongs to._

**Fixed during auto-check pass (2026-05-23):**
- ~~Section 9: every page `<title>` ended with " - Theme Demo" leftover from starter~~ → fixed by setting `titleSuffix: ""` in `content/data/site.json`.
- ~~Section 8: `/robots.txt` returned 404~~ → added `public/robots.txt`.
- ~~Section 8: root `/favicon.svg` returned 404 (crawlers/browsers probe there)~~ → copied `public/images/favicon.svg` → `public/favicon.svg`. (Actual favicon at `/images/favicon.svg` was always working — the `<link rel="icon">` correctly points there.)

**Still open:**
- Section 9: `defaultSocialImage` in `content/data/site.json` still set to starter `/images/main-hero.jpg`. Consider switching to `/images/seerose.jpg` (the brand hero) for the site-wide Open Graph fallback.
- Section 12 (Phase 9 polish): hero images are heavy — `elephants.jpg` 1.5 MB, `zebra2.jpg` 1.0 MB, `seerose.jpg` 0.9 MB. Compress / use Netlify Image CDN before launch.

**Fixed during manual walkthrough (2026-05-23):**
- ~~Section 3: footer nav links opened the destination page scrolled to the bottom~~ → fixed by adding a `routeChangeComplete` listener in `_app.js` that calls `window.scrollTo(0, 0)` on every internal navigation. Applies site-wide, not just to footer links.
