'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { SubtopicData, ArticleData } from '@/lib/resources';
import FaqSection from '@/components/FaqSection';



// ============================================
// MDX COMPONENTS (same as PillarPageClient)
// ============================================

const mdxComponents = {
  Image: ({ src, alt }: { src: string; alt: string }) => (
    <figure className="my-8">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
      </div>
      {alt && <figcaption className="text-center text-sm text-muted-foreground mt-2">{alt}</figcaption>}
    </figure>
  ),
  YouTube: ({ id, title }: { id: string; title?: string }) => (
    <div className="my-8 aspect-video rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  ),
  h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-4xl font-bold font-serif mt-8 mb-4">{children}</h1>,
  h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-bold font-serif mt-10 mb-4 pb-2 border-b">{children}</h2>,
  h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-semibold font-serif mt-8 mb-3">{children}</h3>,
  h4: ({ children }: { children: React.ReactNode }) => <h4 className="text-xl font-semibold mt-6 mb-2">{children}</h4>,
  p: ({ children }: { children: React.ReactNode }) => <p className="my-4 leading-7 text-foreground/90">{children}</p>,
  ul: ({ children }: { children: React.ReactNode }) => <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>,
  ol: ({ children }: { children: React.ReactNode }) => <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>,
  li: ({ children }: { children: React.ReactNode }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }: { children: React.ReactNode }) => <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">{children}</blockquote>,
  code: ({ children }: { children: React.ReactNode }) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
  pre: ({ children }: { children: React.ReactNode }) => <pre className="my-6 p-4 bg-muted rounded-lg overflow-x-auto">{children}</pre>,
  table: ({ children }: { children: React.ReactNode }) => <div className="my-6 overflow-x-auto"><table className="w-full border-collapse border border-border">{children}</table></div>,
  th: ({ children }: { children: React.ReactNode }) => <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">{children}</th>,
  td: ({ children }: { children: React.ReactNode }) => <td className="border border-border px-4 py-2">{children}</td>,
  hr: () => <hr className="my-8 border-border" />,
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => <Link href={href || '#'} className="text-primary underline hover:no-underline">{children}</Link>,
  strong: ({ children }: { children: React.ReactNode }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
};

// ============================================
// ARTICLES SIDEBAR
// ============================================

function ArticlesSidebar({
  articles,
  pillarSlug,
  subtopicSlug,
}: {
  articles: ArticleData[];
  pillarSlug: string;
  subtopicSlug: string;
}) {
  const preview = articles.slice(0, 6);
  const viewAllUrl = `/resources?pillar=${pillarSlug}&subtopic=${subtopicSlug}`;

  if (articles.length === 0) return null;

  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="sticky top-24">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Articles in this topic</h3>
          </div>
          <nav className="space-y-1 mb-4">
            {preview.map((article) => (
              <Link
                key={article.slug}
                href={article.href}
                className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
              >
                <span className="font-medium line-clamp-2">{article.title}</span>
                {article.readTime && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          {articles.length > 6 && (
            <Link href={viewAllUrl}>
              <Button variant="outline" size="sm" className="w-full gap-2">
                View all {articles.length} articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </Card>
      </div>
    </aside>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

interface SubtopicPageClientProps {
  frontmatter: SubtopicData ;
  content: string;
  articles: ArticleData[];
  pillarSlug: string;
}

export default function SubtopicPageClient({
  frontmatter,
  content,
  articles,
  pillarSlug,
}: SubtopicPageClientProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function compileMdx() {
      try {
        const serialized = await serialize(content, { parseFrontmatter: false });
        setMdxSource(serialized);
      } catch (error) {
        console.error('Error compiling MDX:', error);
      } finally {
        setIsLoading(false);
      }
    }
    compileMdx();
  }, [content]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-linear-to-b from-garden-sage/30 to-background">
        <div className="container mx-auto px-4">
          <Link
            href={`/resources/${pillarSlug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {pillarSlug.replace(/-/g, ' ')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            {frontmatter.title}
          </h1>
          {frontmatter.description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {frontmatter.description}
            </p>
          )}
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <article className="flex-1 max-w-3xl mx-auto lg:mx-0 prose-custom">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-full" />
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                </div>
              ) : mdxSource ? (
  <>
    <MDXRemote {...mdxSource} components={mdxComponents} />
    <FaqSection items={frontmatter.faqs} limit={6} />
  </>
) : (

                <p className="text-muted-foreground">Failed to load content.</p>
              )}
            </article>
            <div className="hidden lg:block">
              <ArticlesSidebar
                articles={articles}
                pillarSlug={pillarSlug}
                subtopicSlug={frontmatter.slug}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
