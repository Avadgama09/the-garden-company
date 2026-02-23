// app/resources/page.tsx
import { getAllPillars, getAllArticles } from '@/lib/resources';
import ResourcesClient from './ResourcesClient';

export const metadata = {
  title: 'Resources | The Garden Company',
  description: 'Explore our comprehensive gardening guides, tutorials, and expert advice.',
};

export default function ResourcesPage() {
  const pillars = getAllPillars();
  const articles = getAllArticles();

  return <ResourcesClient pillars={pillars} articles={articles} />;
}
