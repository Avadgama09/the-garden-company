import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sun,
  Droplets,
  Gauge,
  ShoppingBag,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductByHandle, getRelatedProducts, Product } from "@/lib/products";
import { formatPrice } from "@/data/cart";
import { ProductCard } from "@/components/product-card";
import ProductDetailClient from "./product-detail-client";

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductByHandle(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.id,
    4
  );

  return (
    <>
      <section className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link
              href="/shop"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square overflow-hidden rounded-2xl bg-muted"
            >
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.original_price && (
                <Badge className="absolute left-4 top-4 bg-destructive text-destructive-foreground">
                  Sale
                </Badge>
              )}
              {product.best_seller && !product.original_price && (
                <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                  Best Seller
                </Badge>
              )}
            </motion.div>

            <ProductDetailClient product={product} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              You May Also Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}