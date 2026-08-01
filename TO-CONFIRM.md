# Details to confirm with the client

These facts are not yet verified. Every one appears in the site as an obvious
`[... TO CONFIRM]` placeholder so nothing false is published. Search the codebase
for `TO CONFIRM` to find every spot, or edit the values in
`src/content/site/settings.json` (most live there in one place).

## Contact and location
- [ ] Exact clinic street address in Khyber Bazar (currently "Pak Medical Center, Khyber Bazar")
- [ ] Google Maps pin / embed URL and a shareable directions link
- [ ] Landmark-based directions ("near Kabuli Gate, opposite ...") for the Contact page
- [ ] Direct clinic phone number
- [ ] WhatsApp number (may differ from the phone number)
- [ ] Email address
- [ ] Map latitude / longitude (placeholder is Peshawar city centre)

## Fees and registration
- [ ] Consultation fee (or confirm we simply say "discussed openly")
- [ ] PMDC registration number (for the About page and trust)

## Credentials and dates
- [ ] Year of graduation (MBBS)
- [ ] Fellowship institution and year (Vascular Surgery)
- [ ] Any dates for the About-page career timeline

## Media
- [ ] Official photography of Dr. Sajjad (hero, about) — currently a branded placeholder panel
- [ ] Clinic photos (exterior, waiting area, consultation room) for the gallery and Google Business Profile
- [ ] Patient-education video links (YouTube / Facebook) for the About page
- [ ] Open Graph / social share image (`public/og/default.png`) — currently referenced but not yet designed

## Profiles (for schema `sameAs` and footer)
- [ ] Marham profile URL
- [ ] Oladoc profile URL
- [ ] Facebook page URL
- [ ] Any other listing (Google Business Profile, Instagram)

## Content sign-off
- [ ] Confirm the patient stories in `src/content/cases/` are real, consented, and de-identified.
      The seeded story is illustrative and must be replaced or explicitly approved before launch.
- [ ] Confirm the review figures (5.0 / 5, 110+ reviews, 100% satisfaction, ~4 min wait,
      ~14 min consultation) are current, since these drive the AggregateRating schema.

## Contact page (`/contact`)
- [ ] The appointment form composes the enquiry into a WhatsApp message and lets the patient
      press send. The site is static, so nothing is posted to a server and no enquiry is
      stored. Confirm this is what the client wants, or supply a form endpoint / inbox if
      they would rather receive enquiries by email.
- [ ] Who monitors the WhatsApp number, and what reply time should the page promise? The page
      currently says "during clinic hours".
- [ ] The page hero reuses the operating theatre photo. A photo of the clinic entrance or
      reception would suit a contact page better.
- [ ] Confirm the short emergency note in the booking section should stay. The equivalent
      callout was removed from the homepage at the client's request.

## Launch steps (do these at domain cutover, not before)
- [ ] `public/robots.txt` is currently `Disallow: /` so the temporary Vercel URL stays out
      of Google. Switch it to `Allow: /` when the custom domain goes live.
- [ ] Confirm the production domain and point DNS at Vercel. `site` in `astro.config.mjs`
      and `SITE_URL` in `src/lib/schema.ts` are both already set to
      `https://drsajjadyousafzai.com` and must match whatever is registered.
- [ ] Submit `sitemap-index.xml` in Google Search Console once the domain is live.
