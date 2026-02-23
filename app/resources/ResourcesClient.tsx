'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, BookOpen, ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import Loading from './loading';
import type { PillarData, ArticleData } from '@/lib/resources';

// ============================================
// CONSTANTS
// ============================================

const ARTICLES_PER_PAGE = 24;

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

// ============================================
// PILLAR CARD
// ============================================

function PillarCard({ pillar }: { pillar: PillarData }) {
  return (
    <Link href={`/resources/${pillar.slug}`}>
      <Card className="group h-full overflow-hidden border-0 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={pillar.image}
            alt={pillar.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-semibold text-white mb-1">{pillar.title}</h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <BookOpen className="h-4 w-4" />
              <span>{pillar.articleCount} articles</span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{pillar.description}</p>
          {pillar.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {pillar.topics.slice(0, 3).map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {pillar.topics.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{pillar.topics.length - 3} more
                </Badge>
              )}
            </div>
          )}
          <div className="flex items-center text-primary text-sm font-medium">
            <span>Explore</span>
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ============================================
// ARTICLE CARD
// ============================================

function ArticleCard({ article }: { article: ArticleData }) {
  return (
    <Link
      href={article.href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className="bg-background/90 text-foreground text-xs">
            {article.difficulty}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted-foreground mb-2 capitalize">
          {article.pillarSlug.replace(/-/g, ' ')} → {article.subtopicSlug.replace(/-/g, ' ')}
        </p>
        <h3 className="font-serif text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {article.description}
        </p>
        {article.readTime && (
          <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </div>
        )}
      </div>
    </Link>
  );
}

// ============================================
// PAGINATION
// ============================================

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
          className="w-9"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// ============================================
// MAIN CLIENT COMPONENT
// ============================================

interface ResourcesClientProps {
  pillars: PillarData[];
  articles: ArticleData[];
}

export default function ResourcesClient({ pillars, articles }: ResourcesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedPillar, setSelectedPillar] = useState(searchParams.get('pillar') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || 'All');
  const [currentPage, setCurrentPage] = useState(1);

  // Build pillar filter options from real data
  const pillarOptions = useMemo(() => {
    const names = pillars.map((p) => ({ slug: p.slug, title: p.title }));
    return [{ slug: 'All', title: 'All Topics' }, ...names];
  }, [pillars]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    setCurrentPage(1);
    return articles.filter((article) => {
      if (selectedPillar !== 'All' && article.pillarSlug !== selectedPillar) return false;
      if (selectedDifficulty !== 'All' && article.difficulty !== selectedDifficulty) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          article.title.toLowerCase().includes(q) ||
          article.description.toLowerCase().includes(q) ||
          article.pillarSlug.includes(q) ||
          article.subtopicSlug.includes(q)
        );
      }
      return true;
    });
  }, [articles, selectedPillar, selectedDifficulty, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Suspense fallback={<Loading />}>
      <>
        {/* Hero */}
        <section className="bg-garden-sage/50 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl font-bold sm:text-5xl"
            >
              Gardening Resources
            </motion.h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Guides, pillars, and practical knowledge for home gardeners.
            </p>
            <div className="mx-auto mt-8 max-w-md relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 pl-10"
              />
            </div>
          </div>
        </section>

        {/* Pillars Carousel */}
        <section className="bg-garden-dark py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-10 font-serif text-2xl font-bold text-garden-dark-foreground">
              Start with the Fundamentals
            </h2>
            {pillars.length > 0 ? (
              <Carousel opts={{ align: 'start', loop: true }} className="w-full">
                <CarouselContent className="-ml-4">
                  {pillars.map((pillar) => (
                    <CarouselItem key={pillar.slug} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <PillarCard pillar={pillar} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-4" />
                <CarouselNext className="hidden md:flex -right-4" />
              </Carousel>
            ) : (
              <p className="text-muted-foreground">No pillars found.</p>
            )}
          </div>
        </section>

        {/* Articles Grid with Filters */}
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4">

            {/* Filters */}
            <div className="mb-8 flex flex-col gap-4">

              {/* Pillar filter */}
              <div className="flex flex-wrap gap-2">
                {pillarOptions.map((option) => (
                  <button
                    key={option.slug}
                    onClick={() => {
                      setSelectedPillar(option.slug);
                      setCurrentPage(1);
                    }}
                    className={cn(
                      'rounded-full px-4 py-1.5 text-sm font-medium transition-colors border',
                      selectedPillar === option.slug
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground'
                    )}
                  >
                    {option.title}
                  </button>
                ))}
              </div>

              {/* Difficulty filter */}
              <div className="flex flex-wrap gap-2">
                {difficulties.map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setSelectedDifficulty(level);
                      setCurrentPage(1);
                    }}
                    className={cn(
                      'rounded-full px-3 py-1 text-sm font-medium transition-colors',
                      selectedDifficulty === level
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            </p>

            {/* Grid */}
            {paginatedArticles.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedArticles.map((article) => (
                    <ArticleCard key={article.href} article={article} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="font-serif text-xl font-semibold">No articles found</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPillar('All');
                    setSelectedDifficulty('All');
                    setCurrentPage(1);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </>
    </Suspense>
  );
}
