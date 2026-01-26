// app/resources/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPillars, getPillarContent } from '@/lib/resources';
import PillarPageClient from './PillarPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all pillars
export async function generateStaticParams() {
  const pillars = getAllPillars();
  return pillars.map((pillar) => ({
    slug: pillar.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const pillarData = getPillarContent(slug);

  if (!pillarData) {
    return { title: 'Not Found' };
  }

  return {
    title: `${pillarData.frontmatter.title} | The Garden Company`,
    description: pillarData.frontmatter.description,
  };
}

// Main page component
export default async function PillarPage({ params }: PageProps) {
  const { slug } = await params;
  const pillarData = getPillarContent(slug);

  if (!pillarData) {
    notFound();
  }

  return (
    <PillarPageClient
      frontmatter={pillarData.frontmatter}
      content={pillarData.content}
    />
  );
}
