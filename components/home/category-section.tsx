"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Droplets, Gauge, ShoppingBag, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/data/cart";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="mb-4">
        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {product.category.replace("-", " ")}
        </span>
      </div>

      <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">
          {formatPrice(product.price)}
        </span>
        {product.original_price && (
          <span className="text-xl text-muted-foreground line-through">
            {formatPrice(product.original_price)}
          </span>
        )}
      </div>

      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <Sun className="mx-auto mb-2 h-6 w-6 text-primary" />
          <span className="text-xs text-muted-foreground">Light</span>
          <p className="mt-1 text-sm font-medium text-card-foreground">
            {product.light}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <Droplets className="mx-auto mb-2 h-6 w-6 text-primary" />
          <span className="text-xs text-muted-foreground">Water</span>
          <p className="mt-1 text-sm font-medium text-card-foreground">
            {product.water}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <Gauge className="mx-auto mb-2 h-6 w-6 text-primary" />
          <span className="text-xs text-muted-foreground">Difficulty</span>
          <p className="mt-1 text-sm font-medium text-card-foreground">
            {product.difficulty}
          </p>
        </div>
      </div>

      {product.includes && product.includes.length > 0 && (
        <div className="mt-8">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            What is Included
          </h3>
          <ul className="mt-4 space-y-2">
            {product.includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Check className="h-4 w-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.care_instructions && (
        <div className="mt-8 rounded-lg bg-muted/50 p-4">
          <h3 className="font-serif text-sm font-semibold text-foreground">
            Care Tip
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {product.care_instructions}
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button size="lg" className="flex-1" onClick={handleAddToCart}>
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart - {formatPrice(product.price * quantity)}
        </Button>
      </div>
    </motion.div>
  );
}