export interface Resource {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  type: "article" | "video" | "tip";
  category: string;
  tags: string[];
  image: string;
  videoUrl?: string;
  readTime?: string;
  publishedAt: string;
  featured?: boolean;
}

export const resources: Resource[] = [
  {
    id: "1",
    slug: "beginners-guide-indoor-plants",
    title: "The Complete Beginner's Guide to Indoor Plants",
    excerpt:
      "Everything you need to know to start your indoor garden journey, from choosing the right plants to understanding basic care requirements.",
    type: "article",
    category: "Indoor",
    tags: ["Beginner", "Indoor", "Care Guide"],
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80",
    readTime: "8 min read",
    publishedAt: "2024-01-15",
    featured: true,
  },
  {
    id: "2",
    slug: "watering-mistakes-to-avoid",
    title: "7 Common Watering Mistakes and How to Avoid Them",
    excerpt:
      "Overwatering is the number one killer of houseplants. Learn the signs, symptoms, and solutions to keep your plants thriving.",
    type: "article",
    category: "Care Tips",
    tags: ["Beginner", "Watering", "Care Guide"],
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
    readTime: "5 min read",
    publishedAt: "2024-01-10",
    featured: true,
  },
  {
    id: "3",
    slug: "balcony-garden-setup",
    title: "How to Set Up Your Balcony Garden",
    excerpt:
      "Transform your balcony into a lush green retreat with our step-by-step video guide covering container selection, plant choices, and layout tips.",
    type: "video",
    category: "Outdoor",
    tags: ["Balcony", "Outdoor", "Setup"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    videoUrl: "https://youtube.com/watch?v=example",
    publishedAt: "2024-01-05",
    featured: true,
  },
  {
    id: "4",
    slug: "monstera-care-guide",
    title: "Monstera Care: Everything You Need to Know",
    excerpt:
      "A deep dive into caring for the iconic Monstera Deliciosa, including light requirements, watering schedule, and propagation tips.",
    type: "article",
    category: "Indoor",
    tags: ["Monstera", "Indoor", "Care Guide"],
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
    readTime: "10 min read",
    publishedAt: "2024-01-01",
  },
  {
    id: "5",
    slug: "succulent-propagation",
    title: "Propagating Succulents: A Visual Guide",
    excerpt:
      "Learn how to multiply your succulent collection for free using leaf and stem cuttings with our detailed video tutorial.",
    type: "video",
    category: "Succulents",
    tags: ["Succulents", "Propagation", "DIY"],
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&q=80",
    videoUrl: "https://youtube.com/watch?v=example2",
    publishedAt: "2023-12-20",
  },
  {
    id: "6",
    slug: "seasonal-plant-care-summer",
    title: "Summer Plant Care Checklist",
    excerpt:
      "Beat the heat! Essential tips to keep your plants healthy during the hot summer months, from adjusting watering to protecting from direct sun.",
    type: "article",
    category: "Seasonal",
    tags: ["Seasonal", "Summer", "Care Tips"],
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    readTime: "6 min read",
    publishedAt: "2023-12-15",
  },
  {
    id: "7",
    slug: "quick-tip-yellowing-leaves",
    title: "Quick Tip: What Yellow Leaves Mean",
    excerpt:
      "Yellow leaves can indicate several issues. Here's a quick guide to diagnose and fix the problem.",
    type: "tip",
    category: "Care Tips",
    tags: ["Quick Tip", "Troubleshooting"],
    image:
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80",
    readTime: "2 min read",
    publishedAt: "2023-12-10",
  },
  {
    id: "8",
    slug: "repotting-101",
    title: "Repotting 101: When and How to Repot Your Plants",
    excerpt:
      "Signs your plant needs repotting and a step-by-step guide to do it without stressing your green friends.",
    type: "article",
    category: "Care Tips",
    tags: ["Repotting", "Care Guide", "How-to"],
    image:
      "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&q=80",
    readTime: "7 min read",
    publishedAt: "2023-12-05",
  },
];

export const getResourceBySlug = (slug: string): Resource | undefined => {
  return resources.find((r) => r.slug === slug);
};

export const getFeaturedResources = (): Resource[] => {
  return resources.filter((r) => r.featured);
};

export const getResourcesByType = (type: Resource["type"]): Resource[] => {
  return resources.filter((r) => r.type === type);
};
