"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Leaf,
  ArrowLeft,
  TreeDeciduous,
  Recycle,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: TreeDeciduous,
    title: "CO2 Offset Calculator",
    description:
      "Calculate how much carbon dioxide your plants absorb based on species, size, and quantity.",
  },
  {
    icon: Recycle,
    title: "Composting Tracker",
    description:
      "Log your composting habits and see how much waste you're diverting from landfills.",
  },
  {
    icon: TrendingUp,
    title: "Impact Dashboard",
    description:
      "Track your environmental contribution over time with beautiful visualizations and milestones.",
  },
];

const roadmapItems = [
  {
    title: "Garden Size Calculator",
    description: "Input your garden dimensions for accurate carbon estimates",
    status: "In Development",
  },
  {
    title: "Equivalency Metrics",
    description: "See your impact in relatable terms: km driven, flights offset, etc.",
    status: "Coming Soon",
  },
  {
    title: "Community Leaderboards",
    description: "Compare your green impact with other gardeners in your area",
    status: "Planned",
  },
];

export default function GreenImpactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-garden-dark py-20 lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
            alt="Forest canopy"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-garden-dark via-garden-dark/90 to-garden-dark" />
        </div>

        {/* Decorative glow */}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2">
              <Leaf className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">
                Carbon Footprint Calculator
              </span>
              <span className="rounded-full bg-emerald-500/30 px-2 py-0.5 text-xs font-medium text-emerald-400">
                Coming Soon
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold text-garden-dark-foreground sm:text-5xl lg:text-6xl">
              Measure Your <span className="text-emerald-400">Green Impact</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-garden-dark-foreground/80">
              Your garden does more than look beautiful—it helps the planet.
              Calculate your carbon offset, track your composting, and see the
              real environmental difference you're making.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Zap className="h-4 w-4" />
                Coming Soon
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-garden-dark-foreground/30 bg-transparent text-garden-dark-foreground hover:bg-garden-dark-foreground/10 hover:text-garden-dark-foreground"
              >
                <Link href="/garden-lab">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Garden Lab
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              What Green Impact Will Do
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tools to quantify and celebrate your environmental contribution
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                  <feature.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="bg-garden-sage/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Development Roadmap
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Features we're building for Green Impact
            </p>
          </motion.div>

          <div className="space-y-4">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Leaf className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-lg font-semibold text-card-foreground">
                      {item.title}
                    </h3>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
