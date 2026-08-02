import type { CollectionEntry } from 'astro:content';

type Site = CollectionEntry<'siteSettings'>['data'];
const SITE_URL = 'https://drsajjadyousafzai.com';

const postalAddress = (site: Site) => ({
  '@type': 'PostalAddress',
  streetAddress: site.addressLine,
  addressLocality: site.addressLocality,
  addressRegion: site.addressRegion,
  postalCode: site.postalCode,
  addressCountry: site.country,
});

const specialties = [
  'Vascular Surgery', 'Varicose Vein Treatment', 'Varicocele Surgery',
  'Diabetic Foot Care', 'Angioplasty', 'General Surgery', 'Laparoscopic Surgery',
];

/** Physician + MedicalBusiness combined entity for the clinic. */
export function physicianSchema(site: Site, aggregate?: { rating: number; count: number }) {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Physician', 'MedicalBusiness'],
    '@id': `${SITE_URL}/#physician`,
    name: 'Dr. Sajjad Yousafzai, Vascular Surgeon',
    url: SITE_URL,
    telephone: site.phone,
    email: site.email,
    priceRange: 'PKR',
    medicalSpecialty: specialties,
    address: postalAddress(site),
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: ['Peshawar', 'Mardan', 'Charsadda', 'Nowshera', 'Swat', 'Swabi', 'Kohat', 'Bajaur', 'Khyber Pakhtunkhwa'],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '15:00', closes: '20:00',
    }],
    sameAs: site.socials.map((s) => s.url).filter((u) => !u.includes('CONFIRM')),
  };
  if (aggregate) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregate.rating,
      reviewCount: aggregate.count,
      bestRating: 5, worstRating: 1,
    };
  }
  return node;
}

export function personSchema(site: Site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Dr. Sajjad Yousafzai',
    jobTitle: 'Consultant Vascular, General and Laparoscopic Surgeon',
    worksFor: { '@type': 'Hospital', name: 'Lady Reading Hospital MTI, Peshawar' },
    url: `${SITE_URL}/about`,
    address: postalAddress(site),
    medicalSpecialty: 'Vascular Surgery',
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function procedureSchema(service: { title: string; medicalTerm: string; summary: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.medicalTerm,
    alternateName: service.title,
    description: service.summary,
    url: `${SITE_URL}/services/${service.slug}`,
    performer: { '@id': `${SITE_URL}/#physician` },
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}
