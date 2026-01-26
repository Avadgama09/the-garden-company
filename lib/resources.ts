// lib/resources.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface PillarData {
  slug: string;
  title: string;
  description: string;
  image: string;
  articleCount: number;
  topics: string[];
}

// ============================================
// IMAGE MAPPING
// ============================================

const pillarImages: Record<string, string> = {
  'gardening-basics': '/images/resources/gardening-basics.jpg',
  'plants': '/images/resources/plants.jpg',
  'seeds': '/images/resources/seeds.jpg',
  'fruits-and-vegetables': '/images/resources/fruits-vegetables.jpg',
  'flowers-and-foliage': '/images/resources/flowers-foliage.jpg',
  'plant-problems': '/images/resources/plant-problems.jpg',
  'controlled-environment-farming': '/images/resources/controlled-environment.jpg',
};

const DEFAULT_PILLAR_IMAGE = '/images/resources/default-pillar.jpg';

// ============================================
// HELPER FUNCTIONS
// ============================================

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function countArticlesInPillar(pillarPath: string): number {
  try {
    const items = fs.readdirSync(pillarPath, { withFileTypes: true });
    return items.filter((item) => item.isDirectory()).length;
  } catch {
    return 0;
  }
}

function getTopicsFromPillar(pillarPath: string): string[] {
  try {
    const items = fs.readdirSync(pillarPath, { withFileTypes: true });
    return items
      .filter((item) => item.isDirectory())
      .map((item) => slugToTitle(item.name))
      .slice(0, 5);
  } catch {
    return [];
  }
}

// ============================================
// MAIN EXPORT FUNCTION
// ============================================

export function getAllPillars(): PillarData[] {
  const contentDir = path.join(process.cwd(), 'content', 'resources');

  console.log('📁 Content directory:', contentDir);
  console.log('📁 Current working directory:', process.cwd());

  // Check if content directory exists
  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory does not exist!');
    return [];
  }

  // Get all subdirectories
  let pillarDirs: string[] = [];
  try {
    pillarDirs = fs
      .readdirSync(contentDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (err) {
    console.error('❌ Error reading content directory:', err);
    return [];
  }

  console.log('📂 Found pillar directories:', pillarDirs);

  const pillars: PillarData[] = [];

  for (const slug of pillarDirs) {
    const pillarPath = path.join(contentDir, slug);
    
    // Try both index.mdx and _index.mdx
    let indexPath = path.join(pillarPath, 'index.mdx');
    if (!fs.existsSync(indexPath)) {
      indexPath = path.join(pillarPath, '_index.mdx');
    }

    console.log(`🔍 Checking for: ${indexPath}`);

    if (!fs.existsSync(indexPath)) {
      console.log(`⚠️ No index.mdx found in: ${slug}`);
      continue;
    }

    try {
      const fileContents = fs.readFileSync(indexPath, 'utf8');
      console.log(`📄 Read file for ${slug}, length: ${fileContents.length}`);

      const { data } = matter(fileContents);
      console.log(`✅ Parsed frontmatter for ${slug}:`, JSON.stringify(data, null, 2));

      const pillar: PillarData = {
        slug,
        title: data.title || data.pillar || slugToTitle(slug),
        description: data.description || `Learn about ${slugToTitle(slug)}`,
        image: data.image || pillarImages[slug] || DEFAULT_PILLAR_IMAGE,
        articleCount: countArticlesInPillar(pillarPath),
        topics: Array.isArray(data.topics) ? data.topics : getTopicsFromPillar(pillarPath),
      };

      pillars.push(pillar);
      console.log(`✅ Added pillar: ${pillar.title}`);
    } catch (error) {
      console.error(`❌ Error processing ${slug}:`, error);
    }
  }

  console.log('📋 Total pillars returned:', pillars.length);
  return pillars;
}

export function getPillarBySlug(slug: string): PillarData | null {
  const pillars = getAllPillars();
  return pillars.find((p) => p.slug === slug) || null;
}

export function getPillarContent(slug: string): { frontmatter: PillarData; content: string } | null {
  const contentDir = path.join(process.cwd(), 'content', 'resources');
  const pillarPath = path.join(contentDir, slug);
  const indexPath = path.join(pillarPath, 'index.mdx');

  if (!fs.existsSync(indexPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(indexPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter: PillarData = {
      slug,
      title: data.title || slugToTitle(slug),
      description: data.description || '',
      image: data.image || pillarImages[slug] || DEFAULT_PILLAR_IMAGE,
      articleCount: countArticlesInPillar(pillarPath),
      topics: Array.isArray(data.topics) ? data.topics : [],
    };

    return { frontmatter, content };
  } catch (error) {
    console.error(`Error reading pillar content for ${slug}:`, error);
    return null;
  }
}