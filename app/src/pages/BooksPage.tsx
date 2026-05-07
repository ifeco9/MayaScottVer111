import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { books, series, type Book } from "@/data/books";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import { Link, useSearchParams } from "react-router";
import { trpc } from "@/providers/trpc";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";

type FilterType = "all" | "hockey" | "suspense" | "contemporary";

export default function BooksPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const reviewsQuery = trpc.review.listByBook.useQuery(
    { bookSlug: selectedBook?.id || "" },
    { enabled: !!selectedBook },
  );
  const createReview = trpc.review.create.useMutation({
    onSuccess: () => {
      setReviewText("");
      reviewsQuery.refetch();
    },
  });

  useEffect(() => {
    const seriesFromQuery = searchParams.get("series");
    if (seriesFromQuery && series.some((s) => s.id === seriesFromQuery)) {
      setSelectedSeries(seriesFromQuery);
    }
  }, [searchParams]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.series.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "hockey"
        ? book.genre === "Hockey Romance"
        : filter === "suspense"
        ? book.genre === "Romantic Suspense"
        : filter === "contemporary"
        ? book.genre === "Contemporary Romance"
        : true;
    const matchesSeries = selectedSeries
      ? series.find((s) => s.id === selectedSeries)?.readOrder.includes(book.id)
      : true;
    return matchesSearch && matchesFilter && matchesSeries;
  });

  const filters: { label: string; value: FilterType }[] = [
    { label: "All Books", value: "all" },
    { label: "Hockey Romance", value: "hockey" },
    { label: "Romantic Suspense", value: "suspense" },
    { label: "Contemporary", value: "contemporary" },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F8F0EB] to-[#FDF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D3142] mb-4">
                Complete Book List
              </h1>
              <p className="font-body text-[#5A5450] max-w-xl mx-auto">
                Browse all books by Maya Scott. Click any cover to read more and find buy links.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Series Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <p className="text-sm font-medium text-[#8B7B6B] mb-3">Filter by Series</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedSeries(null);
                  setSearchParams({});
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedSeries
                    ? "bg-[#C97B84] text-white shadow-md"
                    : "bg-white text-[#5A5450] border border-[#E8DDD4] hover:border-[#C97B84]/30"
                }`}
              >
                All Series
              </button>
              {series.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    const next = s.id === selectedSeries ? null : s.id;
                    setSelectedSeries(next);
                    if (next) {
                      setSearchParams({ series: next });
                    } else {
                      setSearchParams({});
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSeries === s.id
                      ? "bg-[#C97B84] text-white shadow-md"
                      : "bg-white text-[#5A5450] border border-[#E8DDD4] hover:border-[#C97B84]/30"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7B6B]" />
              <Input
                placeholder="Search books or series..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-11 rounded-full border-[#E8DDD4] bg-white focus:border-[#C97B84] focus:ring-[#C97B84]/20"
              />
            </div>
            <div className="flex gap-2">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === f.value
                      ? "bg-[#2D3142] text-white"
                      : "bg-white text-[#5A5450] border border-[#E8DDD4] hover:border-[#C97B84]/30"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedBook(book)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[2/3] overflow-hidden bg-[#E8DDD4]">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  {book.status === "preorder" && (
                    <div className="absolute top-2 left-2 bg-[#D4A574] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      PREORDER
                    </div>
                  )}
                </div>
                <div className="mt-3 px-1">
                  <h3 className="font-display text-base font-semibold text-[#2D3142] group-hover:text-[#C97B84] transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#8B7B6B] mt-0.5">
                    {book.series} #{book.seriesOrder}
                  </p>
                  {book.rating > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3 h-3 fill-[#D4A574] text-[#D4A574]" />
                      <span className="text-xs text-[#5A5450]">{book.rating}</span>
                      <span className="text-xs text-[#8B7B6B]">
                        ({book.reviewCount.toLocaleString()})
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#8B7B6B] font-body">
                No books found matching your criteria.
              </p>
            </div>
          )}

          {/* Reading Order Section */}
          {!selectedSeries && !search && filter === "all" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20"
            >
              <h2 className="font-display text-3xl font-bold text-[#2D3142] mb-8 text-center">
                Reading Order by Series
              </h2>
              <div className="space-y-10">
                {series.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DDD4]/50 shadow-sm"
                  >
                    <div className="mb-5">
                      <h3 className="font-display text-2xl font-semibold text-[#2D3142]">
                        {s.name}
                      </h3>
                      <p className="text-sm text-[#8B7B6B] mt-1">
                        {s.genre} · {s.bookCount} books
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {s.readOrder.map((bookId, idx) => {
                        const book = books.find((b) => b.id === bookId);
                        if (!book) return null;
                        return (
                          <div
                            key={book.id}
                            onClick={() => setSelectedBook(book)}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <div className="relative">
                              <img
                                src={book.cover}
                                alt={book.title}
                                className="w-16 h-24 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                              />
                              <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#C97B84] text-white text-xs font-bold flex items-center justify-center">
                                {idx + 1}
                              </div>
                            </div>
                            <div>
                              <p className="font-display text-sm font-semibold text-[#2D3142] group-hover:text-[#C97B84] transition-colors">
                                {book.title}
                              </p>
                              <p className="text-xs text-[#8B7B6B]">
                                {book.status === "preorder" ? "Coming Soon" : "Available Now"}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />

      {/* Book Detail Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FDF8F5] border-[#E8DDD4]">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-[#2D3142]">
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
                    className="w-fit border-[#C97B84]/30 text-[#C97B84] mb-3"
                  >
                    {selectedBook.series} #{selectedBook.seriesOrder}
                  </Badge>
                  <p className="text-sm text-[#8B7B6B] mb-1">{selectedBook.genre}</p>
                  {selectedBook.rating > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(selectedBook.rating)
                                ? "fill-[#D4A574] text-[#D4A574]"
                                : "text-[#E8DDD4]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-[#5A5450]">
                        {selectedBook.rating} ({selectedBook.reviewCount.toLocaleString()} reviews)
                      </span>
                    </div>
                  )}
                  <p className="text-[#5A5450] font-body text-sm leading-relaxed mb-4">
                    {selectedBook.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedBook.tropes.map((trope) => (
                      <span
                        key={trope}
                        className="text-xs bg-[#C97B84]/10 text-[#C97B84] px-3 py-1 rounded-full"
                      >
                        {trope}
                      </span>
                    ))}
                  </div>
                  {selectedBook.pageCount > 0 && (
                    <p className="text-xs text-[#8B7B6B] mb-4">
                      {selectedBook.pageCount} pages · Published{" "}
                      {new Date(selectedBook.publishedDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <div className="mt-auto space-y-2">
                    <p className="text-xs font-medium text-[#8B7B6B] uppercase tracking-wider mb-2">
                      Buy Now
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBook.buyLinks.amazon && (
                        <Button size="sm" asChild className="bg-[#C97B84] hover:bg-[#B86A73] text-white rounded-full">
                          <Link to={selectedBook.buyLinks.amazon}>
                          <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                          Amazon
                          </Link>
                        </Button>
                      )}
                      {selectedBook.buyLinks.apple && (
                        <Button size="sm" variant="outline" asChild className="border-[#C97B84]/30 text-[#C97B84] hover:bg-[#C97B84]/10 rounded-full">
                          <Link to={selectedBook.buyLinks.apple}>
                          Apple Books
                          </Link>
                        </Button>
                      )}
                      {selectedBook.buyLinks.kobo && (
                        <Button size="sm" variant="outline" asChild className="border-[#C97B84]/30 text-[#C97B84] hover:bg-[#C97B84]/10 rounded-full">
                          <Link to={selectedBook.buyLinks.kobo}>
                          Kobo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-xs font-medium uppercase tracking-wider mb-2 text-muted-foreground">
                      Reader Reviews
                    </p>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {(reviewsQuery.data || []).map((review) => (
                        <div key={review.id} className="rounded-lg border border-border p-2 text-xs">
                          <p className="font-semibold">{"★".repeat(review.rating)}</p>
                          <p className="text-muted-foreground mt-1">{review.content}</p>
                        </div>
                      ))}
                      {reviewsQuery.data?.length === 0 && (
                        <p className="text-xs text-muted-foreground">No published reviews yet.</p>
                      )}
                    </div>
                    {user ? (
                      <form
                        className="mt-3 space-y-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          createReview.mutate({
                            bookSlug: selectedBook.id,
                            bookTitle: selectedBook.title,
                            rating: reviewRating,
                            content: reviewText,
                          });
                        }}
                      >
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="h-8 text-xs"
                        />
                        <Textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Leave your review..."
                          rows={2}
                          className="text-xs"
                        />
                        <Button size="sm" type="submit" disabled={createReview.isPending || reviewText.length < 10}>
                          Submit Review
                        </Button>
                      </form>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-2">Sign in to leave a review.</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
