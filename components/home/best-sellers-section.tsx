// components/best-sellers-section.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRelatedProducts } from "@/lib/products";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  imageUrl: string;
};

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "fallback-1",
    name: "Urban Balcony Starter Kit",
    slug: "urban-balcony-starter-kit",
    category: "Starter kits",
    price: 1499,
    imageUrl: "/images/demo/balcony-kit.jpg",
  },
  {
    id: "fallback-2",
    name: "Low-Maintenance Indoor Trio",
    slug: "low-maintenance-indoor-trio",
    category: "Indoor plants",
    price: 1899,
    imageUrl: "/images/demo/indoor-trio.jpg",
  },
  {
    id: "fallback-3",
    name: "Terrace Bloom Bundle",
    slug: "terrace-bloom-bundle",
    category: "Flowering plants",
    price: 2199,
    imageUrl: "/images/demo/terrace-bloom.jpg",
  },
];

export async function BestSellersSection() {
  let products: Product[] = [];

  try {
    const data = await getFeaturedProducts(4);
    products = (data || []) as Product[];
  } catch {
    products = FALLBACK_PRODUCTS;
  }

  if (!products || products.length === 0) {
    products = FALLBACK_PRODUCTS;
  }

  return (
    <section className="bg-emerald-50/60 border-y border-emerald-100 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Bestsellers
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950 md:text-3xl">
              Mumbai&apos;s favourite plants this month
            </h2>
            <p className="mt-1 text-sm text-emerald-900/70 md:text-base">
              Curated from thousands of orders across balconies, terraces, and indoor corners.
            </p>
          </div>
          <div className="hidden md:block">
            <Button asChild variant="outline" className="border-emerald-300 text-emerald-900 hover:bg-emerald-100">
              <Link href="/shop">View all plants</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group h-full overflow-hidden border-emerald-100 bg-white/80 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <Link href={`/shop/${product.slug}`}>
                <div className="relative aspect-4/5 w-full overflow-hidden bg-emerald-50">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linier-to-t from-emerald-950/40 via-transparent" />
                </div>
                <CardContent className="space-y-2 px-3 pb-3 pt-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-600">
                    {product.category}
                  </p>
                  <h3 className="line-clamp-2 text-sm font-semibold text-emerald-950">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-800">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[11px] text-emerald-900/70">
                    Great for Mumbai{"'"}s heat and humidity, with support from our Garden Coach.
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Button asChild variant="outline" className="border-emerald-300 text-emerald-900 hover:bg-emerald-100">
            <Link href="/shop">Browse all plants</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}