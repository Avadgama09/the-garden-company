// app/contact/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | The Garden Company',
  description: 'Get in touch with The Garden Company for gardening questions, orders, and support.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Contact Us
          </h1>

          <p className="text-muted-foreground mb-8">
            Have a question about gardening, an order, or our products? 
            Reach out and we’ll get back to you as soon as we can.
          </p>

          <div className="space-y-4 text-sm md:text-base">
            <p>
              <span className="font-semibold">Email:</span>{' '}
              <a href="mailto:hello@thegardencompany.in" className="text-primary underline">
                hello@thegardencompany.in
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{' '}
              <a href="tel:+91 9769888344" className="text-primary underline">
                +91-9769888344
              </a>
            </p>
            <p>
              <span className="font-semibold">Address:</span>{' '}
              Mumbai, Maharashtra, India
            </p>
          </div>

          {/* Placeholder for future form */}
          <div className="mt-10 rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground">
              A contact form will come here in the next phase. For now, please use email or phone.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
