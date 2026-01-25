"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/data/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, shipping, total } =
    useCart();

  return (
    <>
      <section className="bg-garden-sage/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl font-bold text-foreground">
              Your Cart
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {items.length === 0
                ? "Your cart is empty"
                : `${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <ShoppingBag className="mb-6 h-16 w-16 text-muted-foreground" />
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Your cart is empty
              </h2>
              <p className="mt-2 text-muted-foreground">
                Looks like you have not added any plants yet. Start exploring
                our collection!
              </p>
              <Button className="mt-8" asChild>
                <Link href="/shop">
                  Browse Shop
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4 rounded-xl border border-border bg-card p-4 sm:gap-6 sm:p-6"
                    >
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-32"
                      >
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            href={`/shop/${item.product.slug}`}
                            className="font-serif text-lg font-semibold text-card-foreground transition-colors hover:text-primary"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.product.shortDescription}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-2 rounded-lg border border-border">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-foreground">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.product.id)}
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="sticky top-24 rounded-xl border border-border bg-card p-6"
                >
                  <h2 className="font-serif text-xl font-semibold text-card-foreground">
                    Order Summary
                  </h2>

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-card-foreground">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-card-foreground">
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders above Rs.999
                      </p>
                    )}
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-card-foreground">
                          Total
                        </span>
                        <span className="text-lg font-bold text-foreground">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="mt-6 w-full" size="lg" asChild>
                    <Link href="/shop/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="mt-4 text-center">
                    <Link
                      href="/shop"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
