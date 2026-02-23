"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Sun, Leaf, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tools = [
  {
    icon: Bot,
    title: "Bloom Bot AI",
    description: "Get instant answers and care plans for your plants",
    color: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  {
    icon: Sun,
    title: "Sun Mapper",
    description: "Visualize sunlight patterns on your property",
    color: "bg-orange-500/20",
    iconColor: "text-orange-500",
  },
  {
    icon: Leaf,
    title: "Green Impact",
    description: "Calculate your garden's carbon footprint",
    color: "bg-green-600/20",
    iconColor: "text-green-600",
  },
  {
    icon: FlaskConical,
    title: "More Coming",
    description: "New tools are always in development",
    color: "bg-primary/20",
    iconColor: "text-primary",
  },
];

export function BloomBotTeaser() {
  return (
    <section className="bg-garden-dark py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5">
              <FlaskConical className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Smart Gardening Tools
              </span>
            </div>

            <h2 className="font-serif text-3xl font-bold text-garden-dark-foreground sm:text-4xl lg:text-5xl">
              Garden Lab
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-garden-dark-foreground/80">
              Stop guessing. Our suite of digital tools helps you plan with
              precision, diagnose problems instantly, and track your garden's
              impact on the planet.
            </p>

            <Button size="lg" className="mt-8" asChild>
              <Link href="/garden-lab">Enter Garden Lab</Link>
            </Button>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="rounded-xl bg-garden-dark-foreground/5 p-6 backdrop-blur"
              >
                <div
                  className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-lg",
                    tool.color
                  )}
                >
                  <tool.icon className={cn("h-6 w-6", tool.iconColor)} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-garden-dark-foreground">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm text-garden-dark-foreground/70">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
