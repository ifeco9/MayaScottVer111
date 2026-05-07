import { Link } from "react-router";
import { Instagram, Facebook, Twitter, BookOpen, Mail, ExternalLink } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "All Books", href: "/books" },
    { label: "About Maya", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Community", href: "/community" },
  ],
  series: [
    { label: "Chicago Knights", href: "/books?series=chicago-knights" },
    { label: "Coming Soon", href: "/books" },
  ],
  connect: [
    { label: "Newsletter", href: "/contact" },
    { label: "Books", href: "/books", external: false },
    { label: "Community Reviews", href: "/community", external: false },
    { label: "Contact", href: "/contact", external: false },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://x.com", label: "Twitter" },
  { icon: BookOpen, href: "/books", label: "Books" },
  { icon: Mail, href: "mailto:hello@mayascottbooks.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F1729] text-white/80 relative overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,45%,42%)]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(190,45%,42%)] to-[hsl(195,55%,35%)] flex items-center justify-center shadow-md">
                <span className="font-display text-white text-lg font-bold">MS</span>
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-white tracking-wide">
                  Maya Scott
                </span>
                <span className="block text-[10px] font-body uppercase tracking-[0.2em] text-white/50 -mt-1">
                  Romance Author
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Writing steamy hockey romances and heart-pounding romantic suspense that keeps you reading past midnight.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[hsl(190,45%,42%)] flex items-center justify-center transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-[hsl(190,45%,42%)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Series Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white mb-5">
              Series
            </h3>
            <ul className="space-y-3">
              {footerLinks.series.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-[hsl(190,45%,42%)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white mb-5">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-[hsl(190,45%,42%)] transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-[hsl(190,45%,42%)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Maya Scott. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
