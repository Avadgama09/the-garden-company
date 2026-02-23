'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export type FaqItem = { q: string; a: string };

export default function FaqSection({
  items,
  limit,
}: {
  items?: FaqItem[];
  limit: number;
}) {
  const faqs = (items ?? []).slice(0, limit);
  if (faqs.length === 0) return null;

  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="font-serif text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`faq-${idx}`}>
            <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
            <AccordionContent>
              <div className="leading-7 text-foreground/90">{faq.a}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
