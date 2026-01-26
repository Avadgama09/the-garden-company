// app/resources/ResourcesClient.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Play, Lightbulb, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resources } from '@/data/resources';
import { ResourceCard } from '@/components/resource-card';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import Loading from './loading';
import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen } from 'lucide-react';

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

interface ResourcesClientProps {
  pillars: PillarData[];
}

// ============================================
// CONSTANTS
// ============================================

const tabs = [
  { id: 'all', label: 'All', icon: null },
  { id: 'article', label: 'Articles', icon: FileText },
  { id: 'video', label: 'Videos', icon: Play },
  { id: 'tip', label: 'Quick Tips', icon: Lightbulb },
];

const categories = [
  'All',
  'Indoor',
  'Outdoor',
  'Succulents',
  'Care Tips',
  'Seasonal',
];

// ============================================
// PILLAR CARD COMPONENT (for MDX pillars)
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
            <h3 className="text-xl font-semibold text-white mb-1">
              {pillar.title}
            </h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <BookOpen className="h-4 w-4" />
              <span>{pillar.articleCount} articles</span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {pillar.description}
          </p>
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
          <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
            <span>Explore</span>
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ============================================
// MAIN CLIENT COMPONENT
// ============================================

export default function ResourcesClient({ pillars }: ResourcesClientProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 🔹 Non-pillar content from data/resources.ts (shown in grid below)
  const contentResources = resources.filter(
    (r) => !r.tags.includes('Pillar')
  );

  const filteredResources = useMemo(() => {
    return contentResources.filter((resource) => {
      if (activeTab !== 'all' && resource.type !== activeTab) return false;
      if (
        selectedCategory !== 'All' &&
        resource.category !== selectedCategory
      )
        return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          resource.title.toLowerCase().includes(q) ||
          resource.excerpt.toLowerCase().includes(q) ||
          resource.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [activeTab, selectedCategory, searchQuery, contentResources]);

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
                placeholder="Search articles, videos, tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10"
              />
            </div>
          </div>
        </section>

        {/* MAIN PILLARS CAROUSEL – FROM MDX FILES */}
        <section className="bg-garden-dark py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-10 font-serif text-2xl font-bold text-garden-dark-foreground">
              Start with the Fundamentals
            </h2>

            {pillars.length > 0 ? (
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {pillars.map((pillar) => (
                    <CarouselItem
                      key={pillar.slug}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
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

        {/* FILTERS + BLOG GRID (ALWAYS PRESENT) */}
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4">
            {/* Tabs */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    size="sm"
                    variant={activeTab === tab.id ? 'default' : 'outline'}
                    onClick={() => setActiveTab(tab.id)}
                    className="gap-2"
                  >
                    {tab.icon && <tab.icon className="h-4 w-4" />}
                    {tab.label}
                  </Button>
                ))}
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'rounded-full px-3 py-1 text-sm font-medium transition-colors',
                      selectedCategory === category
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {filteredResources.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  No resources found
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                    setSelectedCategory('All');
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
