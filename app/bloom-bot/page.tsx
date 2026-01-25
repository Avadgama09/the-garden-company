"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  Calendar,
  Bug,
  ShoppingCart,
  Leaf,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const sampleConversation: Message[] = [
  {
    id: 1,
    text: "Hi! I'm Bloom Bot, your AI gardening companion. How can I help you today?",
    sender: "bot",
  },
  {
    id: 2,
    text: "How often should I water my snake plant?",
    sender: "user",
  },
  {
    id: 3,
    text: "Great question! Snake plants are drought-tolerant and prefer to dry out between waterings. Water every 2-3 weeks in summer and once a month in winter. Always check if the top 2-3 inches of soil are dry before watering. Overwatering is the most common cause of snake plant problems!",
    sender: "bot",
  },
  {
    id: 4,
    text: "My balcony gets about 4 hours of morning sun. What plants would work?",
    sender: "user",
  },
  {
    id: 5,
    text: "4 hours of morning sun is perfect for many plants! I'd recommend: 1) Peace Lily - thrives in partial shade, 2) Pothos - versatile and low-maintenance, 3) Spider Plant - loves indirect light, 4) Herbs like mint and coriander. Would you like me to suggest some products from our shop?",
    sender: "bot",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Personalised Care Plans",
    description:
      "Get custom watering schedules, fertilising tips, and care routines tailored to your specific plants and home environment.",
  },
  {
    icon: Calendar,
    title: "Smart Reminders",
    description:
      "Never forget to water your plants again with intelligent reminders based on plant type, season, and your local weather.",
  },
  {
    icon: Bug,
    title: "Pest & Disease Diagnosis",
    description:
      "Describe symptoms or share photos, and Bloom Bot will help identify issues and suggest organic solutions.",
  },
  {
    icon: ShoppingCart,
    title: "Product Recommendations",
    description:
      "Get personalised plant and tool suggestions based on your space, experience level, and aesthetic preferences.",
  },
];

const roadmapItems = [
  {
    title: "Plant Photo Analysis",
    description: "Upload photos for instant plant identification and health assessment",
    status: "Coming Soon",
  },
  {
    title: "Shop Integration",
    description: "Direct links to recommended products with one-click add to cart",
    status: "Coming Soon",
  },
  {
    title: "User Accounts",
    description: "Save your plant collection and get personalised long-term care tracking",
    status: "In Development",
  },
];

export default function BloomBotPage() {
  const [messages, setMessages] = useState<Message[]>(sampleConversation);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "Thanks for your question! Bloom Bot is currently in demo mode. In the full version, I'll provide detailed, personalised advice for all your gardening questions. Stay tuned!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-garden-dark py-20 lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1920&q=80"
            alt="Plants background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-garden-dark via-garden-dark/90 to-garden-dark" />
        </div>

        {/* Decorative glow */}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Assistant
              </span>
              <span className="rounded-full bg-primary/30 px-2 py-0.5 text-xs font-medium text-primary">
                Beta
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold text-garden-dark-foreground sm:text-5xl lg:text-6xl">
              Meet <span className="text-primary">Bloom Bot</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-garden-dark-foreground/80">
              Your AI-powered gardening companion that helps you grow healthier,
              happier plants. Get instant answers, personalised care advice, and
              expert troubleshooting.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#chat">
                <Button size="lg" className="gap-2">
                  <Zap className="h-4 w-4" />
                  Try Bloom Bot
                </Button>
              </a>
              <a href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-garden-dark-foreground/30 text-garden-dark-foreground hover:bg-garden-dark-foreground/10 hover:text-garden-dark-foreground bg-transparent"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat Demo Section */}
      <section id="chat" className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Try Bloom Bot
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ask any gardening question and get instant expert advice
            </p>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
          >
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">
                  Bloom Bot
                </h3>
                <p className="text-xs text-muted-foreground">
                  Online - Ready to help
                </p>
              </div>
              <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Demo Mode
              </span>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-card-foreground"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="mb-1 flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-primary">
                            Bloom Bot
                          </span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-3"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about plant care, watering, pests..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-garden-sage/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              What Bloom Bot Can Do
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful AI features to help you succeed with your plants
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
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
      <section className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              What is Next
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Exciting features coming to Bloom Bot
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
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
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
