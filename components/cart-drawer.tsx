"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart-provider";
import { formatPrice } from "@/data/cart";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    total,
    isOpen,
    setIsOpen,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-xl font-semibold">Your Cart</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-lg font-medium">Your cart is empty</p>
              <p className="mb-6 text-sm text-muted-foreground">
                Add some plants to get started!
              </p>
              <Button onClick={() => setIsOpen(false)} asChild>
                <Link href="/shop">Browse Shop</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-4 rounded-lg border border-border p-3"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">{item.product.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm font-semibold text-primary">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                <Link href="/shop/checkout">Checkout</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link href="/shop/cart">View Cart</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
