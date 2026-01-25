"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Play, Lightbulb, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resources } from "@/data/resources";
import { ResourceCard } from "@/components/resource-card";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

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
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Filter by type
      if (activeTab !== "all" && resource.type !== activeTab) {
        return false;
      }
      // Filter by category
      if (
        selectedCategory !== "All" &&
        resource.category !== selectedCategory
      ) {
        return false;
      }
      // Filter by search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          resource.title.toLowerCase().includes(query) ||
          resource.excerpt.toLowerCase().includes(query) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [activeTab, selectedCategory, searchQuery]);

  const featuredVideos = resources.filter((r) => r.type === "video").slice(0, 2);

  return (
    <Suspense fallback={<Loading />}>
      <>
        {/* Hero Section */}
        <section className="bg-garden-sage/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
                Guides, Tips & Videos
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Everything you need to grow your dream garden. Expert advice,
                step-by-step guides, and video tutorials for gardeners of all
                levels.
              </p>

              {/* Search */}
              <div className="mx-auto mt-8 max-w-md">
                <div className="relative">
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
            </motion.div>
          </div>
        </section>

        {/* Featured Videos */}
        {!searchQuery && activeTab === "all" && (
          <section className="bg-garden-dark py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mb-8 font-serif text-2xl font-bold text-garden-dark-foreground">
                  Featured Videos
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {featuredVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ResourceCard resource={video} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    size="sm"
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
                <p className="mb-6 text-sm text-muted-foreground">
                  Showing {filteredResources.length} resources
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <ResourceCard resource={resource} />
                    </motion.div>
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
