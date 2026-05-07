import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { books, type Book } from "@/data/books";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

function BookCard({
  book,
  onSelect,
}: {
  book: Book;
  onSelect: (book: Book) => void;
}) {
  const isPreorder = book.status === "preorder";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={() => onSelect(book)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
        {/* Book Cover */}
        <div className="aspect-[2/3] overflow-hidden bg-[hsl(210,30%,90%)]">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729]/90 via-[#0F1729]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
          <p className="text-white/90 text-sm font-body line-clamp-3 mb-3">
            {book.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {book.tropes.slice(0, 2).map((trope) => (
              <span
                key={trope}
                className="text-[10px] uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full"
              >
                {trope}
              </span>
            ))}
          </div>
          <Button
            size="sm"
            className="w-full bg-white text-[#0F1729] hover:bg-white/90 rounded-full text-xs font-semibold"
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
            View Details
          </Button>
        </div>

        {/* Status badge */}
        {isPreorder && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-[hsl(195,55%,35%)] to-[hsl(195,60%,55%)] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Preorder
          </div>
        )}
      </div>

      {/* Book info below cover */}
      <div className="mt-4 px-1">
        <h3 className="font-display text-lg font-semibold text-[#0F1729] group-hover:text-[hsl(190,45%,42%)] transition-colors line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-[hsl(220,10%,55%)] font-body mt-0.5">
          {book.series} #{book.seriesOrder}
        </p>
        <div className="flex items-center gap-2 mt-2">
          {book.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[hsl(195,55%,35%)] text-[hsl(195,55%,35%)]" />
              <span className="text-sm font-medium text-[hsl(220,10%,45%)]">{book.rating}</span>
            </div>
          )}
          <span className="text-xs text-[hsl(220,10%,55%)]">{book.genre}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BookCarousel() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const publishedBooks = books.filter((b) => b.status === "published");

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[hsl(210,50%,99%)] to-[hsl(210,50%,96%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-[hsl(190,45%,42%)] uppercase tracking-[0.2em]">
            The Collection
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0F1729] mt-3 mb-4">
            Published Books
          </h2>
          <p className="font-body text-[hsl(220,10%,45%)] max-w-xl mx-auto">
            From the ice rink to the shadows of suspense — find your next favorite read.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6" style={{ marginLeft: "-1px" }}>
              {publishedBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex-none w-[200px] sm:w-[240px] md:w-[260px]"
                >
                  <BookCard book={book} onSelect={setSelectedBook} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollPrev}
            className={`absolute left-0 top-1/3 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-[hsl(210,30%,90%)] flex items-center justify-center text-[hsl(220,10%,45%)] hover:text-[hsl(190,45%,42%)] hover:border-[hsl(190,45%,42%)]/30 transition-all ${
              !canScrollPrev ? "opacity-50" : ""
            }`}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className={`absolute right-0 top-1/3 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-[hsl(210,30%,90%)] flex items-center justify-center text-[hsl(220,10%,45%)] hover:text-[hsl(190,45%,42%)] hover:border-[hsl(190,45%,42%)]/30 transition-all ${
              !canScrollNext ? "opacity-50" : ""
            }`}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Book Detail Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[hsl(210,50%,99%)] border-[hsl(210,30%,90%)]">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-[#0F1729]">
                  {selectedBook.title}
                </DialogTitle>
              </DialogHeader>
              <div className="grid sm:grid-cols-2 gap-6 mt-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={selectedBook.cover}
                    alt={selectedBook.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <Badge
                    variant="outline"
                    className="w-fit border-[hsl(190,45%,42%)]/30 text-[hsl(190,45%,42%)] mb-3"
                  >
                    {selectedBook.series} #{selectedBook.seriesOrder}
                  </Badge>
                  <p className="text-sm text-[hsl(220,10%,55%)] mb-1">{selectedBook.genre}</p>
                  {selectedBook.rating > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(selectedBook.rating)
                                ? "fill-[hsl(195,55%,35%)] text-[hsl(195,55%,35%)]"
                                : "text-[hsl(210,30%,90%)]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-[hsl(220,10%,45%)]">
                        {selectedBook.rating} ({selectedBook.reviewCount.toLocaleString()} reviews)
                      </span>
                    </div>
                  )}
                  <p className="text-[hsl(220,10%,45%)] font-body text-sm leading-relaxed mb-4">
                    {selectedBook.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedBook.tropes.map((trope) => (
                      <span
                        key={trope}
                        className="text-xs bg-[hsl(190,45%,42%)]/10 text-[hsl(190,45%,42%)] px-3 py-1 rounded-full"
                      >
                        {trope}
                      </span>
                    ))}
                  </div>
                  {selectedBook.pageCount > 0 && (
                    <p className="text-xs text-[hsl(220,10%,55%)] mb-4">
                      {selectedBook.pageCount} pages · Published{" "}
                      {new Date(selectedBook.publishedDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <div className="mt-auto space-y-2">
                    <p className="text-xs font-medium text-[hsl(220,10%,55%)] uppercase tracking-wider mb-2">
                      Buy Now
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBook.buyLinks.amazon && (
                        <Button size="sm" asChild className="bg-[hsl(190,45%,42%)] hover:bg-[hsl(190,50%,38%)] text-white rounded-full">
                          <Link to={selectedBook.buyLinks.amazon}>
                          Amazon
                          </Link>
                        </Button>
                      )}
                      {selectedBook.buyLinks.apple && (
                        <Button size="sm" variant="outline" asChild className="border-[hsl(190,45%,42%)]/30 text-[hsl(190,45%,42%)] hover:bg-[hsl(190,45%,42%)]/10 rounded-full">
                          <Link to={selectedBook.buyLinks.apple}>
                          Apple Books
                          </Link>
                        </Button>
                      )}
                      {selectedBook.buyLinks.kobo && (
                        <Button size="sm" variant="outline" asChild className="border-[hsl(190,45%,42%)]/30 text-[hsl(190,45%,42%)] hover:bg-[hsl(190,45%,42%)]/10 rounded-full">
                          <Link to={selectedBook.buyLinks.kobo}>
                          Kobo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
