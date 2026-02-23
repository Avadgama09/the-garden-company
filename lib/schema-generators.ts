import type { FaqItem } from './resources';

const SITE_URL = 'https://thegardencompany.in';
const SITE_NAME = 'The Garden Company';
const DEFAULT_OG = `${SITE_URL}/og-default.jpg`;
const LOGO_URL = `${SITE_URL}/apple-icon.png`;

// ============================================
// ORGANIZATION + WEBSITE (site-wide, in layout)
// ============================================

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    sameAs: [],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/resources?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ============================================
// BREADCRUMBS (all 3 levels)
// ============================================

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// COLLECTION PAGE (pillar + subtopic)
// ============================================

export function generateCollectionPageSchema({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
    image: image ? `${SITE_URL}${image}` : DEFAULT_OG,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// ============================================
// ARTICLE / BLOG POST (article level)
// ============================================

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  publishedAt,
  updatedAt,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image: image ? `${SITE_URL}${image}` : DEFAULT_OG,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

// ============================================
// FAQ PAGE (all 3 levels, when FAQs exist)
// ============================================

export function generateFAQSchema(faqs: FaqItem[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
