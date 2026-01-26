// app/resources/page.tsx

"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Play, Lightbulb, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resources } from "@/data/resources";
import { ResourceCard } from "@/components/resource-card";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const tabs = [
  { id: "all", label: "All", icon: null },
  { id: "article", label: "Articles", icon: FileText },
  { id: "video", label: "Videos", icon: Play },
  { id: "tip", label: "Quick Tips", icon: Lightbulb },
];

const categories = [
  "All",
  "Indoor",
  "Outdoor",
  "Succulents",
  "Care Tips",
  "Seasonal",
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Pillars (shown in carousel)
  const pillarResources = resources.filter((r) => r.tags.includes("Pillar"));

  // 🔹 Non-pillar content (shown in grid below)
  const contentResources = resources.filter((r) => !r.tags.includes("Pillar"));

  const filteredResources = useMemo(() => {
    return contentResources.filter((resource) => {
      if (activeTab !== "all" && resource.type !== activeTab) return false;
      if (selectedCategory !== "All" && resource.category !== selectedCategory)
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

            <div className="relative mx-auto mt-8 max-w-md">
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

        {/* MAIN PILLARS – CAROUSEL */}
        <section className="bg-garden-dark py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-garden-dark-foreground md:text-3xl">
                  Start with the Fundamentals
                </h2>
                <p className="mt-2 text-sm text-garden-dark-foreground/70 md:text-base">
                  Deep-dive guides covering everything you need to know
                </p>
              </div>
            </div>

            {/* Carousel */}
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {pillarResources.map((pillar) => (
                  <CarouselItem
                    key={pillar.id}
                    className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <ResourceCard resource={pillar} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation arrows - hidden on mobile, shown on md+ */}
              <CarouselPrevious className="hidden md:flex -left-4 bg-white/90 hover:bg-white border-garden-dark-foreground/20" />
              <CarouselNext className="hidden md:flex -right-4 bg-white/90 hover:bg-white border-garden-dark-foreground/20" />
            </Carousel>

            {/* Mobile swipe hint */}
            <p className="mt-4 text-center text-xs text-garden-dark-foreground/60 md:hidden">
              Swipe to see more →
            </p>
          </div>
        </section>

        {/* FILTERS + BLOG GRID */}
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4">
            {/* Tabs */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    size="sm"
                    variant={activeTab === tab.id ? "default" : "outline"}
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
                      "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                      selectedCategory === category
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {filteredResources.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredResources.length} resources
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </>
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
                    setSearchQuery("");
                    setActiveTab("all");
                    setSelectedCategory("All");
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
