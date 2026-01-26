// lib/resources.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Pillar = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  publishedAt?: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content/resources");

export function getPillars(): Pillar[] {
  if (!fs.existsSync(CONTENT_ROOT)) return [];

  const folders = fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((dir) => dir.isDirectory());

  return folders.map((folder) => {
    const indexPath = path.join(
      CONTENT_ROOT,
      folder.name,
      "_index.mdx"
    );

    if (!fs.existsSync(indexPath)) {
      throw new Error(
        `Missing _index.mdx for pillar: ${folder.name}`
      );
    }

    const file = fs.readFileSync(indexPath, "utf-8");
    const { data } = matter(file);

    return {
      id: folder.name,
      slug: folder.name,
      title: data.title,
      description: data.description,
      image: data.image,
      publishedAt: data.publishedAt,
    };
  });
}
