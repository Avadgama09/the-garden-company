import { getAllProducts, getCategories } from "@/lib/products";
import ShopPageClient from "./shop-client";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <ShopPageClient initialProducts={products} categories={categories} />
  );
}