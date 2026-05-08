import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.purecreativitypro.com';
const SITE_NAME = 'PureCreativity';
const DEFAULT_IMAGE = 'https://www.purecreativitypro.com/og-image.png';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_IMAGE,
  jsonLd,
}) => {
  const fullTitle = path === '/' ? `${SITE_NAME} — The Convergence Hub` : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  // Build JSON-LD array — always include Organization on homepage
  const structuredData = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / Meta */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

// --- Reusable JSON-LD Schemas ---

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PureCreativity',
  url: SITE_URL,
  description: 'The Convergence Hub — Tech, Music, Media, and Business solutions for entrepreneurs and side hustlers.',
  sameAs: [
    'https://www.youtube.com/@purecreativitypro',
    'https://www.instagram.com/purecreativitypro',
    'https://www.tiktok.com/@purecreativitypro',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PureCreativity',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const createServiceSchema = (
  name: string,
  description: string,
  url: string,
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: {
    '@type': 'Organization',
    name: 'PureCreativity',
  },
  url: `${SITE_URL}${url}`,
});

export const createFAQSchema = (
  faqs: { question: string; answer: string }[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export default SEOHead;
