"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Sun, Leaf, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const tools = [
  {
    id: "bloom-bot",
    title: "Bloom Bot AI",
    subtitle: "The Expert",
    description:
      "Instant answers for your specific plants. Diagnose issues, get care schedules, and stop guessing.",
    icon: Bot,
    gradient: "from-emerald-600 to-green-700",  // Darker greens
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    href: "/garden-lab/bloom-bot-ai",
    cta: "Chat with Bloom Bot",
    status: "Live",
    statusVariant: "default" as const,
  },
  {
    id: "sun-mapper",
    title: "Sun Mapper",
    subtitle: "The Planner",
    description:
      "Simulate sun shadows on your property. Visualize light patterns to pick the perfect spot for every plant.",
    icon: Sun,
    gradient: "from-orange-500 to-amber-600",  // Richer orange
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    href: "/garden-lab/sun-mapper",
    cta: "Launch Mapper",
    status: "Beta",
    statusVariant: "secondary" as const,
  },
  {
    id: "green-impact",
    title: "Green Impact",
    subtitle: "The Conscience",
    description:
      "Calculate your garden's carbon footprint. See how much CO2 you offset and track your eco-contribution.",
    icon: Leaf,
    gradient: "from-teal-600 to-emerald-700",  // Deeper teal
    iconBg: "bg-green-600/10",
    iconColor: "text-green-600",
    href: "/garden-lab/green-impact",
    cta: "Calculate Impact",
    status: "Coming Soon",
    statusVariant: "outline" as const,
  },
];

export default function GardenLabPage() {
  return (
    <TooltipProvider>
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden bg-garden-dark py-20 lg:py-28">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-liniear-to-br from-primary/5 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Garden Lab v1.0
              </Badge>

              <h1 className="font-serif text-4xl font-bold text-garden-dark-foreground sm:text-5xl lg:text-6xl">
  Tools for the{" "}
  <span className="italic text-primary">
    Modern Gardener
  </span>
</h1>

              <p className="mt-6 text-lg leading-relaxed text-garden-dark-foreground/80 md:text-xl">
                We built a suite of digital tools to take the guesswork out of
                gardening. Plan with precision, grow with confidence.
              </p>

              <Separator className="mx-auto mt-10 max-w-xs bg-garden-dark-foreground/20" />
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                    {/* Gradient Header */}
                    <div
                      className={`bg-liniear-to-br ${tool.gradient} p-6`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <tool.icon className="h-7 w-7 text-white" />
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant={tool.statusVariant}
                              className="cursor-default border-white/30 bg-white/90 text-gray-800 shadow-sm backdrop-blur-sm hover:bg-white"
                              >

                              {tool.status}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {tool.status === "Live"
                                ? "Ready to use!"
                                : tool.status === "Beta"
                                ? "In testing, try it out"
                                : "Launching soon"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardDescription className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {tool.subtitle}
                      </CardDescription>
                      <CardTitle className="font-serif text-2xl">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <p className="text-muted-foreground">
                        {tool.description}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-2">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Link href={tool.href}>
                          {tool.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                Have a tool idea?
              </h2>
              <p className="mt-3 text-muted-foreground">
                We're always building new ways to help you garden smarter. Let
                us know what you'd like to see next.
              </p>
              <Button variant="secondary" className="mt-6" asChild>
                <Link href="/contact">Share Your Idea</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </TooltipProvider>
  );
}
