"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Sparkles, Calendar, Bug, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "Personalised Care Plans",
    description: "Get custom watering and care schedules for your plants",
  },
  {
    icon: Calendar,
    title: "Smart Reminders",
    description: "Never forget to water your plants again",
  },
  {
    icon: Bug,
    title: "Pest Diagnosis",
    description: "Identify and solve plant health issues quickly",
  },
  {
    icon: ShoppingCart,
    title: "Product Suggestions",
    description: "Find the perfect plants for your space",
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
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Assistant
              </span>
            </div>

            <h2 className="font-serif text-3xl font-bold text-garden-dark-foreground sm:text-4xl lg:text-5xl">
              Meet Bloom Bot
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-garden-dark-foreground/80">
              Your AI-powered gardening companion that helps you grow healthier,
              happier plants. Get personalised advice, watering reminders, and
              expert troubleshooting whenever you need it.
            </p>

            <Button size="lg" className="mt-8" asChild>
              <Link href="/bloom-bot">Try Bloom Bot</Link>
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="rounded-xl bg-garden-dark-foreground/5 p-6 backdrop-blur"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-garden-dark-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-garden-dark-foreground/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
