/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://thegardencompany.in',
  generateRobotsTxt: false,
  generateIndexSitemap: true,
  exclude: ['/api/*', '/admin/*', '/checkout', '/cart'],

  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Homepage
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }

    // Resources hub
    if (path === '/resources') {
      priority = 0.9;
      changefreq = 'daily';
    }

    // Pillar pages — /resources/gardening-basics
    if (path.match(/^\/resources\/[^\/]+$/)) {
      priority = 0.9;
      changefreq = 'weekly';
    }

    // Subtopic pages — /resources/gardening-basics/watering-basics
    if (path.match(/^\/resources\/[^\/]+\/[^\/]+$/)) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    // Article pages — /resources/gardening-basics/watering-basics/how-to-water
    if (path.match(/^\/resources\/[^\/]+\/[^\/]+\/[^\/]+$/)) {
      priority = 0.7;
      changefreq = 'monthly';
    }

    // Shop pages
    if (path.startsWith('/shop/')) {
      priority = 0.8;
      changefreq = 'daily';
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  additionalPaths: async (config) => {
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');
    const result = [];

    try {
      const contentDir = path.join(process.cwd(), 'content', 'resources');

      if (!fs.existsSync(contentDir)) return result;

      const pillars = fs
        .readdirSync(contentDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

      for (const pillar of pillars) {
        // Pillar page
        result.push({
          loc: `/resources/${pillar}`,
          changefreq: 'weekly',
          priority: 0.9,
          lastmod: new Date().toISOString(),
        });

        const pillarPath = path.join(contentDir, pillar);
        const subtopics = fs
          .readdirSync(pillarPath, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name);

        for (const subtopic of subtopics) {
          // Subtopic page
          result.push({
            loc: `/resources/${pillar}/${subtopic}`,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
          });

          // Individual article pages
          const subtopicPath = path.join(pillarPath, subtopic);
          const files = fs
            .readdirSync(subtopicPath)
            .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx' && f !== '_index.mdx');

          for (const file of files) {
            const articleSlug = file.replace('.mdx', '');

            // Read publishedAt from frontmatter for accurate lastmod
            let lastmod = new Date().toISOString();
            try {
              const fileContents = fs.readFileSync(
                path.join(subtopicPath, file),
                'utf8'
              );
              const { data } = matter(fileContents);
              if (data.updatedAt) lastmod = new Date(data.updatedAt).toISOString();
              else if (data.publishedAt) lastmod = new Date(data.publishedAt).toISOString();
            } catch {}

            result.push({
              loc: `/resources/${pillar}/${subtopic}/${articleSlug}`,
              changefreq: 'monthly',
              priority: 0.7,
              lastmod,
            });
          }
        }
      }
    } catch (e) {
      console.warn('Sitemap generation warning:', e);
    }

    return result;
  },
};
