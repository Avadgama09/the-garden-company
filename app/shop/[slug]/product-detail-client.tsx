"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Sun, Droplets, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/data/cart";
import { useCart } from "@/components/cart-provider";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      {/* Image */}
      <Link
        href={`/shop/${product.url_handle}`}
        className="relative aspect-square overflow-hidden bg-muted"
      >
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.original_price && (
          <Badge className="absolute left-3 top-3 bg-destructive text-destructive-foreground">
            Sale
          </Badge>
        )}
        {product.best_seller && !product.original_price && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            Best Seller
          </Badge>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/shop/${product.url_handle}`}>
          <h3 className="font-serif text-lg font-semibold text-card-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {product.short_description}
        </p>

        {/* Quick Info */}
        {featured && (
          <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Sun className="h-3 w-3" />
              {product.light}
            </span>
            <span className="flex items-center gap-1">
              <Droplets className="h-3 w-3" />
              {product.water}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="h-3 w-3" />
              {product.difficulty}
            </span>
          </div>
        )}

        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
