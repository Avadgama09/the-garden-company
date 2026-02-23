import { notFound } from 'next/navigation';
import {
  getAllPillars,
  getSubtopicsForPillar,
  getArticlesBySubtopic,
  getArticleContent,
  getPillarContent,
  getSubtopicContent,
} from '@/lib/resources';
import {
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateFAQSchema,
} from '@/lib/schema-generators';
import JsonLd from '@/components/JsonLd';
import ArticlePageClient from './ArticlePageClient';

const SITE_URL = 'https://thegardencompany.in';

interface PageProps {
  params: Promise<{ pillar: string; subtopic: string; article: string }>;
}

export async function generateStaticParams() {
  const pillars = getAllPillars();
  const params: { pillar: string; subtopic: string; article: string }[] = [];
  for (const pillar of pillars) {
    const subtopics = getSubtopicsForPillar(pillar.slug);
    for (const subtopic of subtopics) {
      const articles = getArticlesBySubtopic(pillar.slug, subtopic.slug);
      for (const article of articles) {
        params.push({ pillar: pillar.slug, subtopic: subtopic.slug, article: article.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { pillar, subtopic, article } = await params;
  const articleData = getArticleContent(pillar, subtopic, article);
  if (!articleData) return { title: 'Not Found' };

  const pageUrl = `${SITE_URL}/resources/${pillar}/${subtopic}/${article}`;
  const fm = articleData.frontmatter;

  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: fm.title,
      description: fm.description,
      url: pageUrl,
      type: 'article',
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt || fm.publishedAt,
      authors: [fm.author],
      images: [
        {
          url: fm.image || '/og-default.jpg',
          width: 1200,
          height: 630,
          alt: fm.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fm.title,
      description: fm.description,
      images: [fm.image || '/og-default.jpg'],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { pillar, subtopic, article } = await params;
  const articleData = getArticleContent(pillar, subtopic, article);
  if (!articleData) notFound();

  const pillarData = getPillarContent(pillar);
  const subtopicData = getSubtopicContent(pillar, subtopic);
  const pageUrl = `${SITE_URL}/resources/${pillar}/${subtopic}/${article}`;
  const fm = articleData.frontmatter;

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Resources', url: `${SITE_URL}/resources` },
      { name: pillarData?.frontmatter.title ?? pillar, url: `${SITE_URL}/resources/${pillar}` },
      { name: subtopicData?.frontmatter.title ?? subtopic, url: `${SITE_URL}/resources/${pillar}/${subtopic}` },
      { name: fm.title, url: pageUrl },
    ]),
    generateArticleSchema({
      title: fm.title,
      description: fm.description,
      url: pageUrl,
      image: fm.image,
      publishedAt: fm.publishedAt,
      updatedAt: fm.updatedAt,
      author: fm.author,
    }),
    ...(fm.faqs?.length ? [generateFAQSchema(fm.faqs!)] : []),
  ].filter(Boolean) as object[];

  return (
    <>
      <JsonLd data={schemas} />
      <ArticlePageClient
        frontmatter={fm}
        content={articleData.content}
        pillarSlug={pillar}
        subtopicSlug={subtopic}
      />
    </>
  );
}
