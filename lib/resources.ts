// lib/resources.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


// ============================================
// TYPE DEFINITIONS
// ============================================

export type FaqItem = { q: string; a: string }; // ← ADDED

export interface PillarData {
  slug: string;
  title: string;
  description: string;
  image: string;
  articleCount: number;
  topics: string[];
  faqs?: FaqItem[]; // ← ADDED
}


export interface SubtopicData {
  slug: string;
  pillarSlug: string;
  title: string;
  description: string;
  href: string;
  faqs?: FaqItem[]; // ← ADDED
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
// MAIN EXPORT FUNCTIONS
// ============================================


export function getAllPillars(): PillarData[] {
  const contentDir = path.join(process.cwd(), 'content', 'resources');


  console.log('📁 Content directory:', contentDir);
  console.log('📁 Current working directory:', process.cwd());


  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory does not exist!');
    return [];
  }


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
        // Note: faqs not needed in listing cards, only in full content load
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
      faqs: Array.isArray(data.faqs) ? data.faqs : [], // ← ADDED
    };


    return { frontmatter, content };
  } catch (error) {
    console.error(`Error reading pillar content for ${slug}:`, error);
    return null;
  }
}


// ============================================
// SUBTOPICS FUNCTION
// ============================================


export function getSubtopicsForPillar(pillarSlug: string): SubtopicData[] {
  const contentDir = path.join(process.cwd(), 'content', 'resources');
  const pillarPath = path.join(contentDir, pillarSlug);


  if (!fs.existsSync(pillarPath)) {
    console.log(`⚠️ Pillar path not found: ${pillarPath}`);
    return [];
  }


  const subtopics: SubtopicData[] = [];


  try {
    const items = fs.readdirSync(pillarPath, { withFileTypes: true });
    const subfolders = items.filter((item) => item.isDirectory());


    for (const folder of subfolders) {
      const subtopicSlug = folder.name;
      const subtopicPath = path.join(pillarPath, subtopicSlug);


      let indexPath = path.join(subtopicPath, 'index.mdx');
      if (!fs.existsSync(indexPath)) {
        indexPath = path.join(subtopicPath, '_index.mdx');
      }


      if (!fs.existsSync(indexPath)) {
        subtopics.push({
          slug: subtopicSlug,
          pillarSlug,
          title: slugToTitle(subtopicSlug),
          description: '',
          href: `/resources/${pillarSlug}/${subtopicSlug}`,
          // faqs omitted intentionally — not needed in listing sidebar
        });
        continue;
      }


      try {
        const fileContents = fs.readFileSync(indexPath, 'utf8');
        const { data } = matter(fileContents);


        subtopics.push({
          slug: subtopicSlug,
          pillarSlug,
          title: data.title || slugToTitle(subtopicSlug),
          description: data.description || '',
          href: `/resources/${pillarSlug}/${subtopicSlug}`,
          // faqs omitted intentionally — not needed in listing sidebar
        });
      } catch (err) {
        console.error(`❌ Error reading subtopic ${subtopicSlug}:`, err);
        subtopics.push({
          slug: subtopicSlug,
          pillarSlug,
          title: slugToTitle(subtopicSlug),
          description: '',
          href: `/resources/${pillarSlug}/${subtopicSlug}`,
        });
      }
    }
  } catch (err) {
    console.error(`❌ Error reading subtopics for ${pillarSlug}:`, err);
  }


  console.log(`📂 Found ${subtopics.length} subtopics for ${pillarSlug}`);
  return subtopics;
}


// ============================================
// ARTICLE TYPE
// ============================================


export interface ArticleData {
  slug: string;
  pillarSlug: string;
  subtopicSlug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  difficulty: string;
  readTime?: string;
  href: string;
  faqs?: FaqItem[]; // ← ADDED
}


// ============================================
// ARTICLE HELPER
// ============================================


function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}


// ============================================
// GET ALL ARTICLES
// ============================================


export function getAllArticles(): ArticleData[] {
  const contentDir = path.join(process.cwd(), 'content', 'resources');
  const articles: ArticleData[] = [];


  if (!fs.existsSync(contentDir)) return [];


  const pillarDirs = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);


  for (const pillarSlug of pillarDirs) {
    const pillarPath = path.join(contentDir, pillarSlug);


    const subtopicDirs = fs
      .readdirSync(pillarPath, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);


    for (const subtopicSlug of subtopicDirs) {
      const subtopicPath = path.join(pillarPath, subtopicSlug);


      const files = fs
        .readdirSync(subtopicPath)
        .filter((f) => f.endsWith('.mdx') && f !== '_index.mdx' && f !== 'index.mdx');


      for (const file of files) {
        const filePath = path.join(subtopicPath, file);
        try {
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContents);
          const articleSlug = file.replace('.mdx', '');


          articles.push({
            slug: articleSlug,
            pillarSlug,
            subtopicSlug,
            title: data.title || slugToTitle(articleSlug),
            description: data.description || '',
            image: data.image || DEFAULT_PILLAR_IMAGE,
            publishedAt: data.publishedAt || '',
            updatedAt: data.updatedAt || data.publishedAt || '',
            author: data.author || 'The Garden Company',
            difficulty: data.difficulty || 'Beginner',
            readTime: data.readTime || estimateReadTime(content),
            href: `/resources/${pillarSlug}/${subtopicSlug}/${articleSlug}`,
            // faqs omitted here — not needed in listing cards
          });
        } catch (err) {
          console.error(`Error reading article ${file}:`, err);
        }
      }
    }
  }


  return articles;
}


// ============================================
// GET ARTICLES BY SUBTOPIC
// ============================================


export function getArticlesBySubtopic(pillarSlug: string, subtopicSlug: string): ArticleData[] {
  return getAllArticles().filter(
    (a) => a.pillarSlug === pillarSlug && a.subtopicSlug === subtopicSlug
  );
}


// ============================================
// GET SINGLE ARTICLE CONTENT
// ============================================


export function getArticleContent(
  pillarSlug: string,
  subtopicSlug: string,
  articleSlug: string
): { frontmatter: ArticleData; content: string } | null {
  const filePath = path.join(
    process.cwd(),
    'content',
    'resources',
    pillarSlug,
    subtopicSlug,
    `${articleSlug}.mdx`
  );


  if (!fs.existsSync(filePath)) return null;


  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);


    return {
      frontmatter: {
        slug: articleSlug,
        pillarSlug,
        subtopicSlug,
        title: data.title || slugToTitle(articleSlug),
        description: data.description || '',
        image: data.image || DEFAULT_PILLAR_IMAGE,
        publishedAt: data.publishedAt || '',
        updatedAt: data.updatedAt || data.publishedAt || '',
        author: data.author || 'The Garden Company',
        difficulty: data.difficulty || 'Beginner',
        readTime: data.readTime || estimateReadTime(content),
        href: `/resources/${pillarSlug}/${subtopicSlug}/${articleSlug}`,
        faqs: Array.isArray(data.faqs) ? data.faqs : [], // ← ADDED
      },
      content,
    };
  } catch (err) {
    console.error(`Error reading article ${articleSlug}:`, err);
    return null;
  }
}


// ============================================
// GET SUBTOPIC CONTENT
// ============================================


export function getSubtopicContent(
  pillarSlug: string,
  subtopicSlug: string
): { frontmatter: SubtopicData; content: string } | null {
  const subtopicPath = path.join(
    process.cwd(),
    'content',
    'resources',
    pillarSlug,
    subtopicSlug
  );


  let indexPath = path.join(subtopicPath, 'index.mdx');
  if (!fs.existsSync(indexPath)) {
    indexPath = path.join(subtopicPath, '_index.mdx');
  }
  if (!fs.existsSync(indexPath)) return null;


  try {
    const fileContents = fs.readFileSync(indexPath, 'utf8');
    const { data, content } = matter(fileContents);


    return {
      frontmatter: {
        slug: subtopicSlug,
        pillarSlug,
        title: data.title || slugToTitle(subtopicSlug),
        description: data.description || '',
        href: `/resources/${pillarSlug}/${subtopicSlug}`,
        faqs: Array.isArray(data.faqs) ? data.faqs : [], // ← ADDED
      },
      content,
    };
  } catch (err) {
    console.error(`Error reading subtopic ${subtopicSlug}:`, err);
    return null;
  }
}
