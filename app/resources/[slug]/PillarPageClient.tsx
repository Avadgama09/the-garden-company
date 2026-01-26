// app/resources/[slug]/PillarPageClient.tsx
'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface PillarData {
  slug: string;
  title: string;
  description: string;
  image: string;
  articleCount: number;
  topics: string[];
}

interface PillarPageClientProps {
  frontmatter: PillarData;
  content: string;
}

// ============================================
// CUSTOM MDX COMPONENTS
// ============================================

const mdxComponents = {
  // Custom Image component
  Image: ({ src, alt }: { src: string; alt: string }) => (
    <figure className="my-8">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {alt && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Custom YouTube embed
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

  // Styled headings
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold font-serif mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold font-serif mt-10 mb-4 pb-2 border-b">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-semibold font-serif mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-xl font-semibold mt-6 mb-2">{children}</h4>
  ),

  // Paragraphs
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 leading-7 text-foreground/90">{children}</p>
  ),

  // Lists
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-7">{children}</li>
  ),

  // Blockquote
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="my-6 p-4 bg-muted rounded-lg overflow-x-auto">{children}</pre>
  ),

  // Table
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-border">{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-border px-4 py-2">{children}</td>
  ),

  // Horizontal rule
  hr: () => <hr className="my-8 border-border" />,

  // Links
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <Link href={href || '#'} className="text-primary underline hover:no-underline">
      {children}
    </Link>
  ),

  // Strong and emphasis
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function PillarPageClient({ frontmatter, content }: PillarPageClientProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function compileMdx() {
      try {
        const serialized = await serialize(content, {
          parseFrontmatter: false,
        });
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
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-linear-to-b from-garden-sage/30 to-background">
        <div className="container mx-auto px-4">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            {frontmatter.description}
          </p>

          {frontmatter.topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.topics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose-custom">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted rounded animate-pulse w-full" />
                <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                <div className="h-4 bg-muted rounded animate-pulse w-full" />
              </div>
            ) : mdxSource ? (
              <MDXRemote {...mdxSource} components={mdxComponents} />
            ) : (
              <p className="text-muted-foreground">Failed to load content.</p>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
