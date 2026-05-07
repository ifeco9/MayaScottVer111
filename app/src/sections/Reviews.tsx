import { useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/books";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 sm:py-28 bg-[hsl(210,50%,99%)] relative overflow-hidden">
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
            Reader Spotlight
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0F1729] mt-3 mb-4">
            What Readers Are Saying
          </h2>
          <p className="font-body text-[hsl(220,10%,45%)] max-w-xl mx-auto">
            Sample reviews are shown here while live verified reviews are being rolled out.
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((review) => (
                <div
                  key={review.id}
                  className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="h-full bg-gradient-to-br from-white to-[hsl(210,50%,96%)] rounded-2xl p-6 border border-[hsl(210,30%,90%)]/50 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-[hsl(190,45%,42%)]/20 mb-3" />

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-[hsl(195,65%,68%)] text-[hsl(195,65%,68%)]"
                              : "text-[hsl(210,30%,90%)]"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-[hsl(220,10%,45%)] font-body text-sm leading-relaxed mb-5">
                      "{review.text}"
                    </p>

                    {/* Reviewer */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[hsl(210,30%,90%)]/50">
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-[hsl(190,45%,42%)] to-[hsl(195,55%,35%)]">
                        <AvatarFallback className="text-white text-sm font-semibold">
                          {review.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#0F1729] text-sm">{review.name}</p>
                        <p className="text-xs text-[hsl(220,10%,55%)]">Reviewed {review.book}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-white shadow-md border border-[hsl(210,30%,90%)] flex items-center justify-center text-[hsl(220,10%,45%)] hover:text-[hsl(190,45%,42%)] hover:border-[hsl(190,45%,42%)]/30 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-white shadow-md border border-[hsl(210,30%,90%)] flex items-center justify-center text-[hsl(220,10%,45%)] hover:text-[hsl(190,45%,42%)] hover:border-[hsl(190,45%,42%)]/30 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
