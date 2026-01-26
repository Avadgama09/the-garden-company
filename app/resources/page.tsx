// app/resources/page.tsx
import { getAllPillars } from '@/lib/resources';
import ResourcesClient from './ResourcesClient';

export const metadata = {
  title: 'Resources | The Garden Company',
  description: 'Explore our comprehensive gardening guides, tutorials, and expert advice.',
};

export default function ResourcesPage() {
  // Server-side: Read MDX pillar files from filesystem
  const pillars = getAllPillars();

  return <ResourcesClient pillars={pillars} />;
}
