import { notFound } from 'next/navigation';
import {
  getAllPillars,
  getSubtopicsForPillar,
  getSubtopicContent,
  getArticlesBySubtopic,
  getPillarContent,
} from '@/lib/resources';
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateFAQSchema,
} from '@/lib/schema-generators';
import JsonLd from '@/components/JsonLd';
import SubtopicPageClient from './SubtopicPageClient';

const SITE_URL = 'https://thegardencompany.in';

interface PageProps {
  params: Promise<{ pillar: string; subtopic: string }>;
}

export async function generateStaticParams() {
  const pillars = getAllPillars();
  const params: { pillar: string; subtopic: string }[] = [];
  for (const pillar of pillars) {
    const subtopics = getSubtopicsForPillar(pillar.slug);
    for (const subtopic of subtopics) {
      params.push({ pillar: pillar.slug, subtopic: subtopic.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { pillar, subtopic } = await params;
  const subtopicData = getSubtopicContent(pillar, subtopic);
  if (!subtopicData) return { title: 'Not Found' };

  const pageUrl = `${SITE_URL}/resources/${pillar}/${subtopic}`;

  return {
    title: subtopicData.frontmatter.title,
    description: subtopicData.frontmatter.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: subtopicData.frontmatter.title,
      description: subtopicData.frontmatter.description,
      url: pageUrl,
      type: 'website',
      images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: subtopicData.frontmatter.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: subtopicData.frontmatter.title,
      description: subtopicData.frontmatter.description,
      images: ['/og-default.jpg'],
    },
  };
}

export default async function SubtopicPage({ params }: PageProps) {
  const { pillar, subtopic } = await params;
  const subtopicData = getSubtopicContent(pillar, subtopic);
  if (!subtopicData) notFound();

  const articles = getArticlesBySubtopic(pillar, subtopic);
  const pillarData = getPillarContent(pillar);
  const pageUrl = `${SITE_URL}/resources/${pillar}/${subtopic}`;

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Resources', url: `${SITE_URL}/resources` },
      { name: pillarData?.frontmatter.title ?? pillar, url: `${SITE_URL}/resources/${pillar}` },
      { name: subtopicData.frontmatter.title, url: pageUrl },
    ]),
    generateCollectionPageSchema({
      title: subtopicData.frontmatter.title,
      description: subtopicData.frontmatter.description,
      url: pageUrl,
    }),
    ...(subtopicData.frontmatter.faqs?.length
      ? [generateFAQSchema(subtopicData.frontmatter.faqs!)]
      : []),
  ].filter(Boolean) as object[];

  return (
    <>
      <JsonLd data={schemas} />
      <SubtopicPageClient
        frontmatter={subtopicData.frontmatter}
        content={subtopicData.content}
        articles={articles}
        pillarSlug={pillar}
      />
    </>
  );
}
