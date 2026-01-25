"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedResources } from "@/data/resources";
import { ResourceCard } from "@/components/resource-card";

export function ResourcesPreview() {
  const featuredResources = getFeaturedResources();

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Learn & Grow
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Expert guides, tips, and videos to help you succeed
            </p>
          </div>
          <Button variant="outline" asChild className="group bg-transparent">
            <Link href="/resources">
              See All Resources
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ResourceCard resource={resource} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
