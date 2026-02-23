import { supabase } from "@/lib/supabase/server";

export interface Product {
  id: string;
  url_handle: string;
  name: string;
  category: string;
  price: number;
  original_price?: number;
  description: string;
  short_description: string;
  image_url: string | null;
  images?: string[] | null;
  light: "Low" | "Medium" | "Bright Indirect" | "Direct Sun";
  water: "Low" | "Moderate" | "High";
  difficulty: "Easy" | "Moderate" | "Expert";
  featured: boolean;
  best_seller: boolean;
  includes?: string[] | null;
  care_instructions?: string | null;
  status: "draft" | "active" | "archived" | "out_of_stock";
  sku: string;
  stock_quantity: number;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    url_handle: row.url_handle,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    original_price: row.original_price ? Number(row.original_price) : undefined,
    description: row.description,
    short_description: row.short_description,
    image_url: row.image_url ?? null,
    images: row.images ?? null,
    light: row.light,
    water: row.water,
    difficulty: row.difficulty,
    featured: !!row.featured,
    best_seller: !!row.best_seller,
    includes: row.includes ?? null,
    care_instructions: row.care_instructions ?? null,
    status: row.status,
    sku: row.sku,
    stock_quantity: row.stock_quantity ?? 0,
    seo_title: row.seo_title ?? null,
    seo_description: row.seo_description ?? null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllProducts error", error);
    return [];
  }

  return (data ?? []).map(mapRowToProduct);
}

export async function getProductByHandle(
  slug: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("url_handle", slug)
    .eq("status", "active")
    .single();

  if (error) {
    console.error("getProductByHandle error", error);
    return null;
  }

  return data ? mapRowToProduct(data) : null;
}

export async function getRelatedProducts(
  category: string,
  excludeId: string,
  limit = 4
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("status", "active")
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getRelatedProducts error", error);
    return [];
  }

  return (data ?? []).map(mapRowToProduct);
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("status", "active");

  if (error) {
    console.error("getCategories error", error);
    return [];
  }

  const categoryNames: Record<string, string> = {
    "indoor-plants": "Indoor Plants",
    "outdoor-plants": "Outdoor Plants",
    succulents: "Succulents & Cacti",
    medicinal: "Medicinal Herbs",
    "fruit-plants": "Fruit Plants",
    seeds: "Seeds",
    herbs: "Herbs",
    tools: "Tools & Accessories",
    pots: "Pots & Planters",
    "soil-amendments": "Soil & Amendments",
    "plant-care": "Plant Care",
    kits: "Gardening Kits",
    bundles: "Bundles",
  };

  const categoryImages: Record<string, string> = {
    "indoor-plants": "/images/categories/stylish-indoor-plants-in-modern-pots.webp",
    "outdoor-plants": "/images/categories/urban-Indian-balcony-with-soft-natural-daylight.webp",
    succulents: "/images/categories/curated-cluster-of-succulents-and-small-cacti.webp",
    medicinal: "/images/categories/square-image-of-potted-medicinal-herbs.webp",
    "fruit-plants": "/images/categories/a-small-citrus-plant-with-a-few-visible-fruits.webp",
    seeds: "/images/categories/seeds-arranged-in-small-kraft-paper-packets.webp",
    herbs: "/images/categories/cluster-of-fresh-potted-kitchen-herbs.webp",
    tools: "/images/categories/essential-gardening-tools.webp",
    pots: "/images/categories/small-group-of-empty-pots-and-planters.webp",
    "soil-amendments": "/images/categories/rich-dark-potting-mix-on-a-surface.webp",
    "plant-care": "/images/categories/simple-plant-care-setup.webp",
    kits: "/images/categories/a-complete-gardening-kit-laid-out-neatly.webp",
    bundles: "/images/categories/small-curated-bundle-of-products.webp",
  };

  const defaultImage = "/images/categories/stylish-indoor-plants-in-modern-pots.webp";

  const map = new Map<string, Category>();

  for (const row of data ?? []) {
    const slug = row.category as string;
    if (!slug) continue;

    if (!map.has(slug)) {
      const name = categoryNames[slug] ?? slug.replace("-", " ");
      map.set(slug, {
        id: slug,
        name,
        slug,
        description: `Browse our ${name} collection`,
        image: categoryImages[slug] ?? defaultImage,
        productCount: 0,
      });
    }
    const cat = map.get(slug)!;
    cat.productCount += 1;
  }

  return Array.from(map.values());
}
