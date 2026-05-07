import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Check, Zap, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { packageDeal, books } from "@/data/books";
import { useRef } from "react";

export default function PackageDeal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-12, -6]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [12, 6]);
  const yLeft = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const yRight = useTransform(scrollYProgress, [0, 1], [40, -20]);

  const dealBooks = packageDeal.books
    .map((id) => books.find((b) => b.id === id))
    .filter(Boolean) as typeof books;
  const features = [
    "2 full-length hockey romances (710+ pages)",
    "Instant digital download on all devices",
    "Exclusive bonus chapter: Behind the Scenes",
    "Save $4.99 vs. buying separately",
    "Free bookmark pack with purchase",
  ];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210,50%,99%)] via-[hsl(210,50%,97%)] to-[hsl(210,50%,99%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(195,65%,68%)]/6 blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(340,55%,90%)]/60 border border-[hsl(340,55%,80%)]/40 rounded-full text-sm font-medium text-[hsl(340,55%,45%)] tracking-wide">
            <Gift className="w-4 h-4" />
            {packageDeal.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F1729] mt-5 mb-4 leading-tight">
            {packageDeal.title}
          </h2>
          <p className="font-body text-lg text-[hsl(220,10%,45%)] max-w-xl mx-auto">
            {packageDeal.subtitle}
          </p>
        </motion.div>

        {/* Book showcase with 3D tilt */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">
          <div className="flex-1 flex justify-center items-center gap-6 perspective-1000">
            {dealBooks.map((book, i) => (
              <motion.div
                key={book.id}
                className="relative group"
                style={{
                  rotateY: i === 0 ? rotateLeft : rotateRight,
                  y: i === 0 ? yLeft : yRight,
                }}
              >
                <div className="relative w-40 sm:w-48 md:w-56 rounded-xl overflow-hidden shadow-2xl shadow-[hsl(220,45%,11%)]/15 border border-white/50">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729]/30 to-transparent" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg border border-[hsl(210,30%,90%)]">
                  <span className="text-xs font-semibold text-[#0F1729]">
                    Book {book.seriesOrder}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Deal details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 max-w-md"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-[hsl(210,30%,90%)] shadow-xl shadow-[hsl(220,45%,11%)]/5">
              <p className="text-[hsl(220,10%,45%)] font-body leading-relaxed mb-6">
                {packageDeal.description}
              </p>

              <div className="space-y-3 mb-8">
                {features.map((feat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[hsl(190,45%,42%)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[hsl(190,45%,42%)]" />
                    </div>
                    <span className="text-sm text-[hsl(220,10%,35%)]">{feat}</span>
                  </motion.div>
                ))}
              </div>

              {/* Price block */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display text-4xl font-bold text-[#0F1729]">
                  ${(packageDeal.priceCents / 100).toFixed(2)}
                </span>
                <span className="text-lg text-[hsl(220,10%,55%)] line-through">
                  ${(packageDeal.originalPriceCents / 100).toFixed(2)}
                </span>
                <span className="px-2.5 py-1 bg-[hsl(340,55%,90%)] text-[hsl(340,55%,45%)] text-xs font-semibold rounded-full">
                  {packageDeal.savings}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[hsl(195,65%,55%)] text-[hsl(195,65%,55%)]" />
                ))}
                <span className="text-sm text-[hsl(220,10%,45%)] ml-1">
                  4,981+ readers love this bundle
                </span>
              </div>

              <Link to="/checkout?bundle=starter-pack">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-[hsl(190,45%,42%)] to-[hsl(195,55%,35%)] hover:from-[hsl(190,50%,38%)] hover:to-[hsl(195,60%,32%)] text-white rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-[hsl(190,45%,42%)]/20 hover:shadow-xl transition-all duration-300 group"
                >
                  <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Get The Starter Pack
                </Button>
              </Link>
              <p className="text-center text-xs text-[hsl(220,10%,55%)] mt-3">
                Instant download. Read on any device. 30-day money-back guarantee.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
