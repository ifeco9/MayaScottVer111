import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Community", href: "/community" },
  { label: "Library", href: "/library" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  const handleNavClick = (href: string) => {
    if (isHome && href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[hsl(210,50%,99%)]/95 backdrop-blur-md shadow-sm border-b border-[hsl(210,30%,90%)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[hsl(190,45%,42%)] to-[hsl(195,55%,35%)] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="font-display text-white text-lg sm:text-xl font-bold tracking-tight">
                    MS
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[hsl(195,65%,68%)] rounded-full border-2 border-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl font-semibold text-[#0F1729] tracking-wide">
                  Maya Scott
                </span>
                <span className="block text-[10px] font-body uppercase tracking-[0.2em] text-[hsl(220,10%,55%)] -mt-1">
                  Romance Author
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-[hsl(190,45%,42%)] bg-[hsl(190,45%,42%)]/10"
                        : "text-[hsl(220,10%,45%)] hover:text-[hsl(190,45%,42%)] hover:bg-[hsl(190,45%,42%)]/5"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(190,45%,42%)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/contact">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-gradient-to-r from-[hsl(190,45%,42%)] to-[hsl(195,55%,35%)] hover:from-[hsl(190,50%,38%)] hover:to-[hsl(195,60%,32%)] text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Heart className="w-3.5 h-3.5 mr-1.5" />
                  Newsletter
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[hsl(220,10%,45%)] hover:bg-[hsl(190,45%,42%)]/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-20 left-4 right-4 bg-[hsl(210,50%,99%)] rounded-2xl shadow-xl border border-[hsl(210,30%,90%)] p-6"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const isActive =
                    link.href === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          isActive
                            ? "text-[hsl(190,45%,42%)] bg-[hsl(190,45%,42%)]/10"
                            : "text-[hsl(220,10%,45%)] hover:text-[hsl(190,45%,42%)] hover:bg-[hsl(190,45%,42%)]/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="pt-4 mt-2 border-t border-[hsl(210,30%,90%)]">
                  <Link to="/contact" className="block">
                    <Button className="w-full bg-gradient-to-r from-[hsl(190,45%,42%)] to-[hsl(195,55%,35%)] hover:from-[hsl(190,50%,38%)] hover:to-[hsl(195,60%,32%)] text-white rounded-full shadow-md">
                      <Heart className="w-4 h-4 mr-2" />
                      Join Newsletter
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
