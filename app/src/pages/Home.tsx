import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import BookCarousel from "@/sections/BookCarousel";
import PackageDeal from "@/sections/PackageDeal";
import Newsletter from "@/sections/Newsletter";
import Reviews from "@/sections/Reviews";
import CharacterArt from "@/sections/CharacterArt";
import Footer from "@/sections/Footer";

const storyBeats = [
  { title: "Lace Up", subtitle: "Meet the Chicago Knights" },
  { title: "Hit the Ice", subtitle: "Two books, one unforgettable series" },
  { title: "Feel the Burn", subtitle: "Romance that keeps you up all night" },
  { title: "Join the Team", subtitle: "Subscribe for new releases & exclusives" },
];

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });
  const orbY = useTransform(smoothProgress, [0, 1], ["0%", "22%"]);
  const orbX = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);
  const orbBottomY = useTransform(smoothProgress, [0, 1], ["0%", "-12%"]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[hsl(210,50%,99%)] relative overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(190,45%,42%)] via-[hsl(195,65%,68%)] to-[hsl(190,45%,42%)] origin-left z-[60]"
        style={{ scaleX: smoothProgress }}
      />
      <motion.div
        className="pointer-events-none fixed -top-24 -right-24 w-72 h-72 rounded-full bg-[hsl(195,65%,68%)]/8 blur-3xl z-0"
        style={{ y: orbY, x: orbX }}
      />
      <motion.div
        className="pointer-events-none fixed bottom-10 -left-20 w-64 h-64 rounded-full bg-[hsl(340,55%,80%)]/6 blur-3xl z-0"
        style={{ y: orbBottomY }}
      />
      <Header />
      <main className="relative z-10">
        <Hero />

        {/* Story beats - ice themed */}
        <section className="py-10 sm:py-14 bg-[hsl(210,50%,99%)]/95">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {storyBeats.map((beat, idx) => (
                <motion.div
                  key={beat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ rotateX: -3, rotateY: 3, y: -4, scale: 1.02 }}
                  className="rounded-2xl border border-[hsl(210,30%,90%)] bg-white/70 p-5 shadow-sm backdrop-blur-sm cursor-default"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[hsl(190,45%,42%)] mb-1.5 font-medium">
                    Period {idx + 1}
                  </p>
                  <h3 className="font-display text-lg text-[#0F1729] font-semibold">{beat.title}</h3>
                  <p className="text-sm text-[hsl(220,10%,45%)] mt-1">{beat.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <BookCarousel />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <PackageDeal />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Reviews />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <CharacterArt />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Newsletter />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
