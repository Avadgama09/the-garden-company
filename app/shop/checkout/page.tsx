"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/data/cart";

export default function CheckoutPage() {
  const { items, subtotal, shipping, total } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (items.length === 0) {
    return (
      <section className="bg-background py-20">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Your cart is empty
          </h1>
          <p className="mt-4 text-muted-foreground">
            Add some plants to your cart before checking out.
          </p>
          <Button className="mt-8" asChild>
            <Link href="/shop">Browse Shop</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-garden-sage/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav>
            <Link
              href="/shop/cart"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 font-serif text-3xl font-bold text-foreground"
          >
            Checkout
          </motion.h1>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Contact Information
                  </h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Shipping Address
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street address, apartment, etc."
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Payment Method
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Choose your preferred payment method to complete the order.
                  </p>

                  {/* Payment Integration Placeholders */}
                  <div className="mt-4 space-y-3">
                    {/* Razorpay Button Placeholder */}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start gap-3 border-2 py-6 bg-transparent"
                      onClick={() => {
                        // TODO: Integrate Razorpay SDK via server action
                        // See: https://razorpay.com/docs/payments/server-integration/nodejs/
                        alert(
                          "Razorpay integration coming soon! This is a demo checkout."
                        );
                      }}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Pay with Razorpay</span>
                    </Button>

                    {/* CCAvenue Button Placeholder */}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start gap-3 border-2 py-6 bg-transparent"
                      onClick={() => {
                        // TODO: Integrate CCAvenue
                        // Redirect to CCAvenue payment page with encrypted request
                        alert(
                          "CCAvenue integration coming soon! This is a demo checkout."
                        );
                      }}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Pay with CCAvenue</span>
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h2 className="font-serif text-xl font-semibold text-card-foreground">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="mt-6 max-h-64 space-y-4 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.product.price)} x {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-card-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-3 border-t border-border pt-6">
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
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-lg font-semibold text-card-foreground">
                      Total
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Secure Checkout
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    Free Shipping on Rs.999+
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
