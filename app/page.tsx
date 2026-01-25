import { HeroSection } from "@/components/hero-section";
import { CategorySection } from "@/components/category-section";
import { BestSellersClient as BestSellersSection } from "@/components/best-sellers-section";
import { BloomBotTeaser } from "@/components/bloom-bot-teaser";
import { ResourcesPreview } from "@/components/resources-preview";
import { NewsletterSection } from "@/components/newsletter-section";
import { ValuePropsSection } from "@/components/value-props-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <BestSellersSection />
      <BloomBotTeaser />
      <ResourcesPreview />
      <NewsletterSection />
      <ValuePropsSection />
    </>
  );
}