import { motion } from "framer-motion";
import { Clock, CalendarDays, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { books } from "@/data/books";
import { Link } from "react-router";

export default function PreorderSection() {
  const preorderBooks = books.filter((b) => b.status === "preorder" || b.status === "coming-soon");

  if (preorderBooks.length === 0) return null;

  const book = preorderBooks[0];

  return (
    <section className="py-20 sm:py-28 bg-[#2D3142] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#C97B84] rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4A574] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Book Cover */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C97B84]/30 to-[#D4A574]/30 rounded-2xl transform rotate-3 scale-105" />
              <img
                src={book.cover}
                alt={book.title}
                className="relative w-64 sm:w-72 md:w-80 rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#D4A574] to-[#C9975B] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                Coming Soon
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-[#D4A574]" />
              <span className="text-sm font-medium text-[#D4A574] uppercase tracking-[0.15em]">
                New Release
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
              {book.title}
            </h2>
            <p className="text-[#A0A0B0] text-lg mb-2">
              {book.series} #{book.seriesOrder}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-[#D4A574]">
                <CalendarDays className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {book.releaseDate
                    ? new Date(book.releaseDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Coming 2025"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#A0A0B0]">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{book.genre}</span>
              </div>
            </div>

            <p className="text-[#C0C0D0] font-body leading-relaxed mb-6 max-w-lg">
              {book.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {book.tropes.map((trope) => (
                <span
                  key={trope}
                  className="text-xs bg-white/10 text-[#C0C0D0] px-3 py-1.5 rounded-full border border-white/10"
                >
                  {trope}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#C97B84] to-[#A85D65] hover:from-[#B86A73] hover:to-[#97545C] text-white rounded-full px-8 shadow-lg"
              >
                <Link to={book.buyLinks.amazon || `/checkout?book=${book.id}`}>
                  <Bell className="w-4 h-4 mr-2" />
                  Preorder Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 rounded-full px-8"
              >
                <Link to="/books">Read Excerpt</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
