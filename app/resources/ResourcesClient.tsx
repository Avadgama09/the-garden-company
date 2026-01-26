"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Play, Lightbulb, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/resource-card";
import { TopicCard } from "@/components/topic-card";
import { cn } from "@/lib/utils";
import Loading from "./loading";
import { resources } from "@/data/resources";

type Pillar = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
};

export default function ResourcesClient({ pillars }: { pillars: Pillar[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      if (activeTab !== "all" && resource.type !== activeTab) return false;
      if (selectedCategory !== "All" && resource.category !== selectedCategory)
        return false;
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

  return (
    <>
      {/* Featured Pillars */}
      {!searchQuery && activeTab === "all" && (
        <section className="bg-garden-dark py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-serif text-2xl font-bold text-garden-dark-foreground">
              Start With the Basics
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TopicCard {...pillar} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content (UNCHANGED UI) */}
      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tabs + Filters */}
          {/* (this block is unchanged from your original file) */}

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All", icon: null },
                { id: "article", label: "Articles", icon: FileText },
                { id: "video", label: "Videos", icon: Play },
                { id: "tip", label: "Quick Tips", icon: Lightbulb },
              ].map((tab) => (
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

            <div className="flex flex-wrap gap-2">
              {["All", "Indoor", "Outdoor", "Succulents", "Care Tips", "Seasonal"].map(
                (category) => (
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
                )
              )}
            </div>
          </div>

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
        </div>
      </section>
    </>
  );
}