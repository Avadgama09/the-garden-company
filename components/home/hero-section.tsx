"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-garden-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1920&q=80"
          alt="Lush indoor plants"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-garden-dark via-garden-dark/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary"
          >
            Welcome to The Garden Company
          </motion.span>

          <h1 className="font-serif text-4xl font-bold leading-tight text-garden-dark-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-balance">Grow Beautiful</span>
            <br />
            <span className="text-primary">Home Gardens</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-garden-dark-foreground/80">
            Quality plants, tools, and step-by-step guides for every home.
            Transform your space into a lush green sanctuary with our curated
            collection.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild className="group">
              <Link href="/shop">
                Shop Plants & Kits
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-garden-dark-foreground/30 text-garden-dark-foreground hover:bg-garden-dark-foreground/10 hover:text-garden-dark-foreground bg-transparent"
            >
              <Link href="/resources">Explore Resources</Link>
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex gap-8"
          >
            {[
              { value: "100+", label: "Plant Varieties" },
              { value: "50+", label: "Care Guides" },
              { value: "10k+", label: "Happy Gardens" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-garden-dark-foreground/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
