"use client";

import { motion } from "framer-motion";
import { Leaf, BookOpen, ShieldCheck, Truck } from "lucide-react";

const valueProps = [
  {
    icon: Leaf,
    title: "Curated Plants",
    description: "Hand-picked plants suited for Indian homes and climates",
  },
  {
    icon: BookOpen,
    title: "Care Guides Included",
    description: "Every order comes with detailed care instructions",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% secure checkout with multiple payment options",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    description: "Carefully packed and delivered to your doorstep",
  },
];

export function ValuePropsSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <prop.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-foreground">
                  {prop.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {prop.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
