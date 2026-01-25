// components/category-section.tsx

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
};

export function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const { getCategories } = await import("@/lib/products");
        const data = await getCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setCategories([]);
      }
    }
    loadCategories();
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.offsetWidth || 300;
    const scrollAmount = direction === "left" ? -cardWidth - 16 : cardWidth + 16;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Find the perfect plants and tools for your space
            </p>
          </div>

          <div className="hidden gap-2 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-10 w-10 rounded-full"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-10 w-10 rounded-full"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative block h-72 w-70 shrink-0 snap-start overflow-hidden rounded-xl bg-muted sm:h-80 sm:w-[320px]"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-serif text-2xl font-semibold text-white">
                  {category.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/80">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground md:hidden">
          Swipe to see more →
        </p>
      </div>
    </section>
  );
}