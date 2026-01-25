"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Play, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getResourceBySlug, resources } from "@/data/resources";
import { ResourceCard } from "@/components/resource-card";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = use(params);
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const relatedResources = resources
    .filter(
      (r) =>
        r.id !== resource.id &&
        (r.category === resource.category ||
          r.tags.some((tag) => resource.tags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-garden-sage/50 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6">
            <Link
              href="/resources"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="secondary">
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Badge>
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {resource.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {resource.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {resource.readTime}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(resource.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                {resource.category}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Featured Image / Video */}
            <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-muted">
              <Image
                src={resource.image || "/placeholder.svg"}
                alt={resource.title}
                fill
                className="object-cover"
                priority
              />
              {resource.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                  <Button
                    size="lg"
                    className="h-20 w-20 rounded-full"
                    onClick={() => {
                      // In production, this would open a video player
                      alert(
                        "Video player would open here. This is a demo resource."
                      );
                    }}
                  >
                    <Play className="ml-1 h-8 w-8" />
                    <span className="sr-only">Play video</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none text-foreground prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
              <p className="lead text-xl leading-relaxed">{resource.excerpt}</p>

              <h2>Introduction</h2>
              <p>
                Welcome to our comprehensive guide on {resource.title.toLowerCase()}. 
                Whether you are a complete beginner or looking to expand your knowledge, 
                this resource will provide you with actionable insights and practical tips.
              </p>

              <h2>Key Takeaways</h2>
              <ul>
                <li>
                  Understanding the basics is crucial for long-term success with
                  your plants.
                </li>
                <li>
                  Consistency in care routines makes a significant difference in
                  plant health.
                </li>
                <li>
                  Do not be afraid to experiment and learn from your mistakes -
                  every gardener has killed a plant or two!
                </li>
                <li>
                  Use resources like Bloom Bot for personalised advice specific
                  to your situation.
                </li>
              </ul>

              <h2>Getting Started</h2>
              <p>
                The first step in your journey is understanding your environment.
                Consider factors like natural light availability, humidity levels,
                and temperature fluctuations in your space. These factors will
                help determine which plants will thrive in your home.
              </p>

              <h2>Common Mistakes to Avoid</h2>
              <p>
                Many new plant parents make similar mistakes. Overwatering is the
                most common cause of plant death. Always check the soil moisture
                before watering and remember that most plants prefer to dry out
                slightly between waterings.
              </p>

              <h2>Next Steps</h2>
              <p>
                Now that you have learned the basics, explore our shop for
                beginner-friendly plants and kits. Do not forget to check out
                Bloom Bot for personalised care advice!
              </p>
            </article>

            {/* CTA */}
            <div className="mt-12 rounded-xl bg-muted/50 p-8 text-center">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Ready to put this into practice?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Browse our curated collection of plants or get personalised
                advice from Bloom Bot.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/shop">Browse Shop</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/bloom-bot">Ask Bloom Bot</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              Related Resources
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedResources.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ResourceCard resource={related} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
