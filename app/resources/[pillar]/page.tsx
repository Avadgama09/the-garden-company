import { notFound } from 'next/navigation';
import { getAllPillars, getPillarContent, getSubtopicsForPillar } from '@/lib/resources';
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateFAQSchema,
} from '@/lib/schema-generators';
import JsonLd from '@/components/JsonLd';
import PillarPageClient from './PillarPageClient';

const SITE_URL = 'https://thegardencompany.in';

interface PageProps {
  params: Promise<{ pillar: string }>;
}

export async function generateStaticParams() {
  const pillars = getAllPillars();
  return pillars.map((pillar) => ({ pillar: pillar.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { pillar } = await params;
  const pillarData = getPillarContent(pillar);
  if (!pillarData) return { title: 'Not Found' };

  const pageUrl = `${SITE_URL}/resources/${pillar}`;

  return {
    title: pillarData.frontmatter.title,
    description: pillarData.frontmatter.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: pillarData.frontmatter.title,
      description: pillarData.frontmatter.description,
      url: pageUrl,
      type: 'website',
      images: [
        {
          url: pillarData.frontmatter.image || '/og-default.jpg',
          width: 1200,
          height: 630,
          alt: pillarData.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pillarData.frontmatter.title,
      description: pillarData.frontmatter.description,
      images: [pillarData.frontmatter.image || '/og-default.jpg'],
    },
  };
}

export default async function PillarPage({ params }: PageProps) {
  const { pillar } = await params;
  const pillarData = getPillarContent(pillar);
  if (!pillarData) notFound();

  const subtopics = getSubtopicsForPillar(pillar);
  const pageUrl = `${SITE_URL}/resources/${pillar}`;

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Resources', url: `${SITE_URL}/resources` },
      { name: pillarData.frontmatter.title, url: pageUrl },
    ]),
    generateCollectionPageSchema({
      title: pillarData.frontmatter.title,
      description: pillarData.frontmatter.description,
      url: pageUrl,
      image: pillarData.frontmatter.image,
    }),
    ...(pillarData.frontmatter.faqs?.length
      ? [generateFAQSchema(pillarData.frontmatter.faqs!)]
      : []),
  ].filter(Boolean) as object[];

  return (
    <>
      <JsonLd data={schemas} />
      <PillarPageClient
        frontmatter={pillarData.frontmatter}
        content={pillarData.content}
        subtopics={subtopics}
      />
    </>
  );
}
