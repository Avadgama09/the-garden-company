// app/resources/[slug]/PillarPageClient.tsx
'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FaqSection, { FaqItem } from '@/components/FaqSection';


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
  faqs?: FaqItem[];
}

interface SubtopicData {
  slug: string;
  pillarSlug: string;
  title: string;
  description: string;
  href: string;
}

interface PillarPageClientProps {
  frontmatter: PillarData;
  content: string;
  subtopics: SubtopicData[];
}

// ============================================
// AI BRAND LOGOS (SVG)
// ============================================

const PerplexityLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M22.2819 9.8211a.5685.5685 0 0 0-.0063-.0645c-.0063-.0212-.0109-.0431-.02-.0635a.5435.5435 0 0 0-.0492-.0935.5546.5546 0 0 0-.0272-.0398.5568.5568 0 0 0-.0471-.0516.4923.4923 0 0 0-.0643-.0588l-.0063-.0044L17.5 6.2424V2.476a.4765.4765 0 0 0-.1553-.3518.4826.4826 0 0 0-.3618-.1246l-.0212.0015L12 2.4761 7.0383 2l-.0212-.0015a.4826.4826 0 0 0-.3618.1246.4765.4765 0 0 0-.1553.3518v3.7664l-4.5615 3.196-.0063.0044a.4923.4923 0 0 0-.0643.0588.5765.5765 0 0 0-.0471.0516.5435.5435 0 0 0-.0272.0398.5763.5763 0 0 0-.0493.0935c-.009.0204-.0136.0423-.02.0635a.5765.5765 0 0 0-.0062.0645.654.654 0 0 0-.0063.0584v8.1207c0 .0204.0054.0394.0071.0593a.5765.5765 0 0 0 .0163.0787.4527.4527 0 0 0 .0218.0541.5765.5765 0 0 0 .0399.0776.378.378 0 0 0 .0281.0403.5765.5765 0 0 0 .0679.0737l.0054.0054 4.5765 3.9469v3.5265a.476.476 0 0 0 .2SEP.4189.4797.4797 0 0 0 .2905.0972.4835.4835 0 0 0 .1824-.0358l4.4794-1.8326 4.4794 1.8326a.4835.4835 0 0 0 .1824.0358.4795.4795 0 0 0 .2905-.0972.476.476 0 0 0 .2063-.4189v-3.5265l4.5765-3.9469.0054-.0054a.5765.5765 0 0 0 .0679-.0737.378.378 0 0 0 .0281-.0403.5765.5765 0 0 0 .0399-.0776.4527.4527 0 0 0 .0218-.0541.5765.5765 0 0 0 .0163-.0787c.0018-.0199.0071-.039.0071-.0593V9.8795a.654.654 0 0 0-.0063-.0584zM12 3.4545l3.9157.3878L12 7.0756 8.0843 3.8423 12 3.4545zm-4.5765 1.1474l3.6215 2.8344-3.6215 3.0857V4.6019zm0 7.4356l3.1106-2.6505v5.4648l-3.1106-1.2734v-1.541zm3.6215 7.4935-3.0449-1.2458v-2.5711l3.0449 1.2458v2.5711zm.479-4.1088L8.0843 13.33v-1.4853l3.4397 2.9325v.7459zm.4765.0001v-.7459l3.4397-2.9325V13.33l-3.4397 1.4853zm.479 4.1087v-2.5711l3.0449-1.2458v2.5711l-3.0449 1.2458zm3.5239-5.9198-3.1106 1.2734v-5.4648l3.1106 2.6505v1.541zm0-3.0615-3.6215-3.0857 3.6215-2.8344v5.9201zm1.9305 5.0335-3.1006-2.6732 3.5906-3.0593v4.191l-.49.5415zm.49-6.3692l-4.0815 3.4773-4.0815-3.4773 4.0815-3.1954 4.0815 3.1954zm-8.653 4.2377-3.1006 2.6732-.49-.5415v-4.191l3.5906 3.0593z"/>
  </svg>
);

const ChatGPTLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const GeminiLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 0C5.352 0 0 5.352 0 12s5.352 12 12 12 12-5.352 12-12S18.648 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6-9.6-4.32-9.6-9.6 4.32-9.6 9.6-9.6zm0 1.2c-1.68 0-3.24.48-4.56 1.32.24.12.48.36.6.6l3.36 5.76c.24.36.24.84 0 1.2l-3.36 5.76c-.12.24-.36.48-.6.6 1.32.84 2.88 1.32 4.56 1.32 4.68 0 8.4-3.72 8.4-8.4S16.68 3.6 12 3.6zm-5.4 3.12c-.6 0-1.08.48-1.08 1.08 0 .24.12.48.24.72l3.36 5.76c.12.24.12.48 0 .72l-3.36 5.76c-.12.24-.24.48-.24.72 0 .6.48 1.08 1.08 1.08.36 0 .72-.24.96-.6l3.36-5.76c.24-.36.24-.84 0-1.2l-3.36-5.76c-.24-.36-.6-.52-.96-.52z"/>
  </svg>
);

const CopilotLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

// ============================================
// AI TOOLS CONFIG
// ============================================

interface AITool {
  name: string;
  logo: React.FC;
  getUrl: (title: string, url: string) => string;
  bgColor: string;
  hoverBgColor: string;
  textColor: string;
}

const aiTools: AITool[] = [
  {
    name: 'Perplexity',
    logo: PerplexityLogo,
    getUrl: (title, url) => 
      `https://www.perplexity.ai/?q=${encodeURIComponent(`Summarise and explain this gardening article: "${title}" - ${url}`)}`,
    bgColor: 'bg-[#1a1a2e]',
    hoverBgColor: 'hover:bg-[#2a2a4e]',
    textColor: 'text-white',
  },
  {
    name: 'ChatGPT',
    logo: ChatGPTLogo,
    getUrl: (title, url) => 
      `https://chat.openai.com/?q=${encodeURIComponent(`Summarise and explain this gardening article: "${title}" - ${url}`)}`,
    bgColor: 'bg-[#10a37f]',
    hoverBgColor: 'hover:bg-[#0d8a6a]',
    textColor: 'text-white',
  },
  {
    name: 'Gemini',
    logo: GeminiLogo,
    getUrl: (title, url) => 
      `https://gemini.google.com/app?q=${encodeURIComponent(`Summarise and explain this gardening article: "${title}" - ${url}`)}`,
    bgColor: 'bg-[#4285f4]',
    hoverBgColor: 'hover:bg-[#3367d6]',
    textColor: 'text-white',
  },
  {
    name: 'Copilot',
    logo: CopilotLogo,
    getUrl: (title, url) => 
      `https://copilot.microsoft.com/?q=${encodeURIComponent(`Summarise and explain this gardening article: "${title}" - ${url}`)}`,
    bgColor: 'bg-[#7c3aed]',
    hoverBgColor: 'hover:bg-[#6d28d9]',
    textColor: 'text-white',
  },
];

// ============================================
// AI DISCUSSION COMPONENT
// ============================================

function AIDiscussSection({ title, slug }: { title: string; slug: string }) {
  const articleUrl = `https://thegardencompany.in/resources/${slug}`;

  return (
    <section className="py-6 border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto lg:max-w-none">
          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Discuss this article with AI</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Open this article in your favourite AI assistant for a summary, Q&A, or deeper discussion.
            </p>
            <div className="flex flex-wrap gap-3">
              {aiTools.map((tool) => {
                const Logo = tool.logo;
                return (
                  <a
                    key={tool.name}
                    href={tool.getUrl(title, articleUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg ${tool.bgColor} ${tool.hoverBgColor} ${tool.textColor} transition-colors text-sm font-medium`}
                  >
                    <Logo />
                    {tool.name}
                  </a>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
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
// SIDEBAR COMPONENT
// ============================================

function SubtopicsSidebar({ subtopics, pillarTitle }: { subtopics: SubtopicData[]; pillarTitle: string }) {
  if (subtopics.length === 0) return null;

  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="sticky top-24">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">In this guide</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Explore {subtopics.length} topics in {pillarTitle}
          </p>
          <nav className="space-y-1">
            {subtopics.map((subtopic) => (
              <Link
                key={subtopic.slug}
                href={subtopic.href}
                className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
              >
                <span className="font-medium">{subtopic.title}</span>
                {subtopic.description && (
                  <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {subtopic.description}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </Card>
      </div>
    </aside>
  );
}

// ============================================
// MOBILE SUBTOPICS ACCORDION
// ============================================

function MobileSubtopics({ subtopics, pillarTitle }: { subtopics: SubtopicData[]; pillarTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (subtopics.length === 0) return null;

  return (
    <div className="lg:hidden mb-8">
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          View {subtopics.length} subtopics
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <Card className="mt-2 p-4">
          <p className="text-sm text-muted-foreground mb-3">
            Topics in {pillarTitle}
          </p>
          <nav className="space-y-1">
            {subtopics.map((subtopic) => (
              <Link
                key={subtopic.slug}
                href={subtopic.href}
                className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
              >
                <span className="font-medium">{subtopic.title}</span>
                {subtopic.description && (
                  <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {subtopic.description}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </Card>
      )}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function PillarPageClient({ frontmatter, content, subtopics }: PillarPageClientProps) {
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
      {/* Hero Section - UNCHANGED */}
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

      {/* AI Discussion Section - NEW */}
      <AIDiscussSection title={frontmatter.title} slug={frontmatter.slug} />

      {/* Content Section with Sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Mobile Subtopics Accordion */}
          <div className="max-w-3xl mx-auto lg:max-w-none">
            <MobileSubtopics subtopics={subtopics} pillarTitle={frontmatter.title} />
          </div>

          {/* Desktop Layout: Article + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Article - same max-width as before on desktop */}
            <article className="flex-1 max-w-3xl mx-auto lg:mx-0 prose-custom">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-full" />
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-muted rounded animate-pulse w-full" />
                </div>
              ) : mdxSource ? (
  <>
    <MDXRemote {...mdxSource} components={mdxComponents} />
    <FaqSection items={frontmatter.faqs} limit={8} />
  </>
) : (
                <p className="text-muted-foreground">Failed to load content.</p>
              )}
            </article>

            {/* Desktop Sidebar - hidden on mobile */}
            <div className="hidden lg:block">
              <SubtopicsSidebar subtopics={subtopics} pillarTitle={frontmatter.title} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}