import { defineCollection, reference, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const siteSettings = defineCollection({
  loader: file('src/content/site/settings.json'),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    phone: z.string(),
    phoneDisplay: z.string(),
    whatsapp: z.string(),
    whatsappDisplay: z.string(),
    email: z.string(),
    addressLine: z.string(),
    addressLocality: z.string(),
    addressRegion: z.string(),
    postalCode: z.string(),
    country: z.string(),
    landmark: z.string(),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    mapEmbed: z.string(),
    mapDirections: z.string(),
    clinicHours: z.string(),
    onlineHours: z.string(),
    consultationFee: z.string(),
    socials: z.array(z.object({ label: z.string(), url: z.string() })),
    defaultOgImage: z.string(),
  }),
});

const doctor = defineCollection({
  loader: file('src/content/doctor/profile.json'),
  schema: z.object({
    name: z.string(),
    shortDescription: z.string(),
    hospital: z.string(),
    hospitalNote: z.string(),
    bio: z.array(z.string()),
    quote: z.string(),
    qualifications: z.array(z.object({ short: z.string(), plain: z.string() })),
    timeline: z.array(z.object({ year: z.string(), title: z.string(), detail: z.string() })),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/services' }),
  schema: z.object({
    title: z.string(),          // patient-facing problem title
    medicalTerm: z.string(),    // the term in brackets
    order: z.number(),
    iconKey: z.string(),
    summary: z.string(),
    insideBody: z.string(),     // what is happening inside your body
    signs: z.array(z.string()),
    treatment: z.string(),
    recovery: z.array(z.string()),
    faqs: z.array(faqItem),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

const conditions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/conditions' }),
  schema: z.object({
    symptom: z.string(),
    service: reference('services'),
    detail: z.string(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/cases' }),
  schema: z.object({
    title: z.string(),
    service: reference('services'),
    from: z.string(),          // patient's town
    cameInWith: z.string(),
    whatWasFound: z.string(),
    whatWasDone: z.string(),
    outcome: z.string(),
    backToNormal: z.string(),
    consent: z.boolean().default(true),
    hasGatedImage: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  loader: file('src/content/testimonials/testimonials.json'),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    procedure: z.string(),
    source: z.string(),
    date: z.string(),
    rating: z.number().min(1).max(5),
    byDoctor: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  loader: file('src/content/faqs/faqs.json'),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
  }),
});

const patientStories = defineCollection({
  loader: file('src/content/patient-stories/patient-stories.json'),
  schema: z.object({
    video: z.string(),
    poster: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { siteSettings, doctor, services, conditions, cases, testimonials, faqs, patientStories };
