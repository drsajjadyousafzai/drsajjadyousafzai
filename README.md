# Dr. Sajjad Yousafzai — Vascular Surgeon, Peshawar

Production website for a consultant vascular surgeon in Peshawar, built with **Astro**.
Static output, islands architecture, no framework runtime shipped. The audience is
patients and their families, so the whole site is written at roughly a grade-7 reading
level in calm, plain English.

> **Status:** Homepage (`/`) is built. About, Services, Cases and Contact routes are
> planned next (their nav links exist and will 404 until built).

## Local setup

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run preview  # preview the production build
```

Node 18+ is required (developed on Node 24).

## Design system

One source of truth for all tokens lives in `src/styles/global.css`:

| Token | Hex | Role |
|-------|-----|------|
| `--ink` | `#071A2F` | Deep venous navy: dark sections, headlines |
| `--blue` | `#0F4C81` | Primary structure and links |
| `--blue-soft` | `#E8F0F8` | Section washes and surfaces |
| `--artery` | `#C8102E` | Arterial red: primary action + motion only |
| `--paper` | `#F8FAFC` | Page base |
| `--slate` | `#48586C` | Body text (WCAG AA on paper) |

- **Type:** Jost, self-hosted via `@fontsource/jost` (woff2, `font-display: swap`).
- **Signature element:** `src/components/VesselSpine.astro` — a continuous SVG vessel
  running the page as a living spine. Its red pulse doubles as the scroll-progress
  indicator. Fully static under `prefers-reduced-motion`.
- **Icons:** custom, hand-authored, on one geometric grid in `src/components/Icon.astro`.
  No third-party icon set.
- **Motion:** all interactivity is deferred (bundled `<script>` modules) so it never
  blocks first paint or LCP. Reveals and counters degrade to a complete static page with
  JS disabled or reduced motion on. GSAP is a dependency for future scroll-pinned
  sequences and must be lazy-loaded only inside the island that needs it.

## Content model

All real content is Astro **content collections** (`src/content.config.ts`), typed and
validated at build with Zod. No CMS is wired up. Files live in `src/content/`:

| Collection | Location | Shape |
|-----------|----------|-------|
| `siteSettings` | `site/settings.json` | NAP, phones, hours, fee, socials, map |
| `doctor` | `doctor/profile.json` | bio, qualifications, timeline, quote, stats |
| `services` | `services/*.md` | one file per service (patient-facing) |
| `conditions` | `conditions/*.md` | symptom-led entries linked to a service |
| `cases` | `cases/*.md` | patient stories, optional gated image flag |
| `testimonials` | `testimonials/testimonials.json` | quotes with rating + source |
| `faqs` | `faqs/faqs.json` | question / answer / category |

### Add a service

Create `src/content/services/<slug>.md` with the frontmatter fields from the `services`
schema (`title`, `medicalTerm`, `order`, `iconKey`, `summary`, `insideBody`, `signs`,
`treatment`, `recovery`, `faqs`, `seoTitle`, `seoDescription`). It appears automatically
in the homepage condition grid, the footer, and (once built) the Services page.

`iconKey` must match a name in `Icon.astro` (`vein`, `microscope`, `clot`, `artery`,
`foot`, `fistula`, `aneurysm`, `keyhole`).

### Add a patient story

Create `src/content/cases/<slug>.md` per the `cases` schema. **Only publish real,
consented, de-identified stories.** Clinical photos must stay behind the click-to-reveal
gate (`hasGatedImage: true`) and never appear in thumbnails or OG images.

### Recommendation: split services into their own pages later

Services are already modelled as one collection entry per service. The Services page
currently renders them as anchored sections (`/services#<slug>`). To rank for more
queries, add `src/pages/services/[slug].astro` using `getStaticPaths()` over the same
collection. **No content rewrite or rebuild of the model is needed** — the data is
already per-service.

### Swapping to a headless CMS later

Because every template reads from the content collections, the JSON/markdown loaders can
be swapped for a headless CMS loader (Storyblok, Sanity, etc.) with **no change to the
page templates**. Not built now, on purpose.

## SEO

- One `<h1>` per page, unique `<title>` (<60 chars) and meta description (<155 chars).
- JSON-LD via `src/lib/schema.ts`: `Physician` + `MedicalBusiness`, `Person`,
  `MedicalProcedure` per service, `FAQPage`, `BreadcrumbList`. `AggregateRating` is only
  emitted where real reviews are shown on the page.
- `@astrojs/sitemap` generates `sitemap-index.xml`; `robots.txt` is in `public/`.
- `hreflang="en-PK"`. The Urdu term شریانوں کے ماہر سرجن appears in the footer.
- Content is server-rendered static HTML — verify with JS disabled.
- **Set the production domain** in `astro.config.mjs` (`site:`) and in `src/lib/schema.ts`
  (`SITE_URL`) before launch.

## Off-site work the client must do (on-page SEO alone will not win the map pack)

1. Claim and fully complete the **Google Business Profile** with the exact same NAP as the
   site footer and schema. Add photos, list every service, post regularly.
2. Actively collect **Google reviews** from happy patients.
3. Keep **Marham, Oladoc and Facebook** profiles consistent (same name, address, phone).
4. Build **local citations** in Pakistani directories.
5. Register the site in **Google Search Console** and submit the sitemap.

## Forms and deployment (planned with the Contact page)

- Contact form: 4 fields max, honeypot + basic rate limiting, server-side validation,
  email notification, and a WhatsApp deep link as the primary conversion path.
- Recommended host: **Vercel or Netlify** with the matching Astro adapter for the form
  API route. Enable preview deployments. Document env vars when the form is added.
- Track calls, WhatsApp clicks and form submissions as conversions with privacy-friendly
  analytics.

See `TO-CONFIRM.md` for the list of facts still needed from the client.
