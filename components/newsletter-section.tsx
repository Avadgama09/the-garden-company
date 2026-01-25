"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden bg-garden-sage/50 py-20">
      {/* Decorative plant images */}
      <div className="absolute left-0 top-0 h-32 w-32 opacity-20 lg:h-48 lg:w-48">
        <Image
          src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="absolute bottom-0 right-0 h-32 w-32 opacity-20 lg:h-48 lg:w-48">
        <Image
          src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Get a <span className="text-primary">FREE</span> Plant Care Guide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our newsletter and receive our comprehensive plant care starter
            guide, plus weekly tips and exclusive offers.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-medium text-foreground">
                Thank you for subscribing!
              </p>
              <p className="text-muted-foreground">
                Check your email for your free plant care guide.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <div className="relative flex-1 sm:max-w-sm">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-10"
                />
              </div>
              <Button type="submit" size="lg" className="h-12">
                Subscribe
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            By subscribing, you agree to our Privacy Policy. Unsubscribe
            anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
