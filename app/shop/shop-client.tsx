"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";
import type { Product, Category } from "@/lib/products";

const lightOptions = ["All", "Low", "Medium", "Bright Indirect", "Direct Sun"];
const difficultyOptions = ["All", "Easy", "Moderate", "Expert"];
const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under Rs.500", value: "0-500" },
  { label: "Rs.500 - Rs.1000", value: "500-1000" },
  { label: "Rs.1000 - Rs.2000", value: "1000-2000" },
  { label: "Over Rs.2000", value: "2000-99999" },
];

interface ShopPageClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ShopPageClient({
  initialProducts,
  categories,
}: ShopPageClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLight, setSelectedLight] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      if (selectedLight !== "All" && product.light !== selectedLight) {
        return false;
      }
      if (
        selectedDifficulty !== "All" &&
        product.difficulty !== selectedDifficulty
      ) {
        return false;
      }
      if (selectedPrice !== "all") {
        const [min, max] = selectedPrice.split("-").map(Number);
        if (product.price < min || product.price > max) {
          return false;
        }
      }
      return true;
    });
  }, [
    initialProducts,
    selectedCategory,
    selectedLight,
    selectedDifficulty,
    selectedPrice,
  ]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedLight("All");
    setSelectedDifficulty("All");
    setSelectedPrice("all");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedLight !== "All" ||
    selectedDifficulty !== "All" ||
    selectedPrice !== "all";

  return (
    <>
      {/* Hero */}
      <section className="bg-garden-sage/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl font-bold text-foreground">
              Shop Plants & Kits
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover our curated collection of plants, kits, and tools
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Mobile Filter Toggle */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Filters Sidebar */}
            <aside
              className={`${
                showFilters ? "block" : "hidden"
              } mb-8 lg:col-span-1 lg:block`}
            >
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-card-foreground">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    Category
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Light Filter */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    Light Requirement
                  </label>
                  <Select
                    value={selectedLight}
                    onValueChange={setSelectedLight}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select light" />
                    </SelectTrigger>
                    <SelectContent>
                      {lightOptions.map((light) => (
                        <SelectItem key={light} value={light}>
                          {light === "All" ? "All Light Levels" : light}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Filter */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    Difficulty
                  </label>
                  <Select
                    value={selectedDifficulty}
                    onValueChange={setSelectedDifficulty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyOptions.map((diff) => (
                        <SelectItem key={diff} value={diff}>
                          {diff === "All" ? "All Levels" : diff}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    Price Range
                  </label>
                  <Select
                    value={selectedPrice}
                    onValueChange={setSelectedPrice}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select price" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {hasActiveFilters && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Active filters:
                  </span>
                  {selectedCategory !== "all" && (
                    <FilterTag
                      label={
                        categories.find((c) => c.slug === selectedCategory)
                          ?.name || selectedCategory
                      }
                      onRemove={() => setSelectedCategory("all")}
                    />
                  )}
                  {selectedLight !== "All" && (
                    <FilterTag
                      label={selectedLight}
                      onRemove={() => setSelectedLight("All")}
                    />
                  )}
                  {selectedDifficulty !== "All" && (
                    <FilterTag
                      label={selectedDifficulty}
                      onRemove={() => setSelectedDifficulty("All")}
                    />
                  )}
                  {selectedPrice !== "all" && (
                    <FilterTag
                      label={
                        priceRanges.find((r) => r.value === selectedPrice)
                          ?.label || ""
                      }
                      onRemove={() => setSelectedPrice("all")}
                    />
                  )}
                </div>
              )}

              <div className="mb-6 hidden lg:block">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} featured />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
                  <Filter className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    No products found
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters to find what you are looking for.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 rounded-full p-0.5 hover:bg-primary/20"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}