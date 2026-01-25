"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Leaf,
  Heart,
  Users,
  ArrowRight,
  CheckCircle,
  Recycle,
  Package,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const howItWorks = [
  {
    step: "01",
    title: "Choose Your Plants",
    description:
      "Browse our curated collection of plants and kits suited to your space, light conditions, and experience level.",
    icon: Leaf,
  },
  {
    step: "02",
    title: "Follow Our Guides",
    description:
      "Each order comes with detailed care instructions and access to our comprehensive resource library.",
    icon: CheckCircle,
  },
  {
    step: "03",
    title: "Get Ongoing Support",
    description:
      "Use Bloom Bot for personalised advice or reach out to our team whenever you need help.",
    icon: Heart,
  },
];

const values = [
  {
    icon: Sprout,
    title: "Quality First",
    description:
      "Every plant is carefully selected and inspected before shipping to ensure it arrives healthy and thriving.",
  },
  {
    icon: Users,
    title: "Beginner Friendly",
    description:
      "We believe everyone can grow plants. Our guides and tools make plant care accessible for all skill levels.",
  },
  {
    icon: Recycle,
    title: "Sustainable Practices",
    description:
      "We use eco-friendly packaging and source from nurseries that prioritise sustainable growing methods.",
  },
  {
    icon: Package,
    title: "Careful Packaging",
    description:
      "Our plants are packaged with care using protective materials to ensure safe delivery to your door.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-garden-dark py-20 lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80"
            alt="Beautiful garden"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-garden-dark via-garden-dark/80 to-garden-dark/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-serif text-4xl font-bold text-garden-dark-foreground sm:text-5xl lg:text-6xl">
              Our Story
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-garden-dark-foreground/80">
              We started The Garden Company with a simple mission: to help
              everyone grow beautiful home gardens, regardless of their
              experience level or living space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Our Mission
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Making Plant Parenthood Simple
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We believe that caring for plants should be a joy, not a source
                of stress. That is why we have built The Garden Company around
                three core principles: quality products, expert guidance, and
                ongoing support.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Whether you are a complete beginner looking to bring your first
                plant home, or an experienced gardener expanding your
                collection, we are here to help you succeed. Our curated
                selection, detailed care guides, and AI-powered Bloom Bot ensure
                you always have the knowledge you need at your fingertips.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80"
                alt="Indoor plants in a bright room"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-garden-sage/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your plant journey in three simple steps
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-xl bg-card p-8 shadow-sm"
              >
                <span className="absolute -top-4 left-8 font-serif text-5xl font-bold text-primary/20">
                  {item.step}
                </span>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              What We Stand For
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our values guide everything we do
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-card-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-garden-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl font-bold text-garden-dark-foreground sm:text-4xl">
              Ready to Start Your Garden Journey?
            </h2>
            <p className="mt-4 text-lg text-garden-dark-foreground/80">
              Browse our collection of plants and kits, or chat with Bloom Bot
              to find the perfect plants for your space.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="group">
                <Link href="/shop">
                  Browse Shop
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-garden-dark-foreground/30 text-garden-dark-foreground hover:bg-garden-dark-foreground/10 hover:text-garden-dark-foreground bg-transparent"
              >
                <Link href="/bloom-bot">Talk to Bloom Bot</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
