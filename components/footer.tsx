import Link from "next/link";
import { Leaf, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  pages: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/garden-lab", label: "Garden Lab" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact Us" },
  ],
  shop: [
    { href: "/shop", label: "All Products" },
    { href: "/shop?category=indoor-plants", label: "Indoor Plants" },
    { href: "/shop?category=outdoor-plants", label: "Outdoor Plants" },
    { href: "/shop?category=succulents", label: "Succulents" },
    { href: "/shop?category=gardening-kits", label: "Gardening Kits" },
  ],
  social: [
    { href: "https://instagram.com", label: "Instagram", icon: Instagram },
    { href: "https://facebook.com", label: "Facebook", icon: Facebook },
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-garden-dark text-garden-dark-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold">
                The Garden Company
              </span>
            </Link>
            <p className="mt-4 text-sm text-garden-dark-foreground/70">
              Step-by-step plant guides for every home.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Pages</h3>
            <ul className="space-y-2">
              {footerLinks.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-garden-dark-foreground/70 transition-colors hover:text-garden-dark-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-garden-dark-foreground/70 transition-colors hover:text-garden-dark-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-garden-dark-foreground/10 text-garden-dark-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-garden-dark-foreground/10 pt-8 md:flex-row">
          <p className="text-sm text-garden-dark-foreground/70">
            &copy; {new Date().getFullYear()} The Garden Company. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-garden-dark-foreground/70 transition-colors hover:text-garden-dark-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-garden-dark-foreground/70 transition-colors hover:text-garden-dark-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
