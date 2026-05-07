import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useRef, useEffect } from "react";

/* Ice Crystal Particles */
function IceParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 3 === 0
              ? "linear-gradient(135deg, hsl(340 55% 80%), hsl(340 55% 90%))"
              : p.id % 3 === 1
              ? "linear-gradient(135deg, hsl(195 65% 75%), hsl(190 50% 85%))"
              : "linear-gradient(135deg, hsl(0 0% 100%), hsl(210 50% 95%))",
            boxShadow: `0 0 ${p.size * 2}px ${p.id % 3 === 0 ? "hsl(340 55% 80% / 0.4)" : p.id % 3 === 1 ? "hsl(195 65% 75% / 0.4)" : "hsl(0 0% 100% / 0.5)"}`,
          }}
          animate={{
            y: [0, -40 - Math.random() * 60, 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            scale: [1, 1.3, 0.7, 1],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity * 0.5, p.opacity],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* 3D Floating Book Card */
function FloatingBookCard({
  src,
  alt,
  side,
}: {
  src: string;
  alt: string;
  side: "left" | "right";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      rotateY.set(((e.clientX - centerX) / rect.width) * 15);
      rotateX.set(-((e.clientY - centerY) / rect.height) * 15);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      className={`absolute hidden xl:block ${side === "left" ? "left-[6%] top-[22%]" : "right-[6%] top-[18%]"} perspective-1000 z-10`}
      initial={{ opacity: 0, y: 40, rotateY: side === "left" ? -20 : 20 }}
      animate={{ opacity: 1, y: 0, rotateY: side === "left" ? -8 : 8 }}
      transition={{ duration: 1, delay: 0.6 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative group">
        {/* Glow behind */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[hsl(190,45%,42%)]/20 to-[hsl(340,55%,80%)]/20 blur-2xl transform scale-110 group-hover:scale-125 transition-transform duration-700" />
        {/* Card */}
        <div className="relative w-36 h-52 sm:w-44 sm:h-64 rounded-xl overflow-hidden shadow-2xl border border-white/40 backdrop-blur-sm bg-white/10">
          <img src={src} alt={alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729]/40 to-transparent" />
        </div>
        {/* Reflection */}
        <div
          className="absolute top-full left-0 right-0 h-12 rounded-b-xl opacity-20 blur-sm"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
            transform: "scaleY(-1) translateY(-4px)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);

  return (
    <section ref={sectionRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Layered gradient background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Deep navy base */}
        <div className="absolute inset-0 bg-[#0A1628]" />
        {/* Ice blue radial glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[hsl(195,65%,55%)]/10 blur-[120px]" />
        {/* Soft pink radial glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[hsl(340,55%,75%)]/8 blur-[100px]" />
        {/* Center white frost */}
        <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-white/5 blur-[80px]" />
        {/* Subtle grid lines like ice rink */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(195,65%,55%) 1px, transparent 1px), linear-gradient(90deg, hsl(195,65%,55%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Ice particles */}
      <IceParticles />

      {/* 3D Floating Book Cards */}
      <FloatingBookCard
        src="/assets/books/ice-breaker.jpg"
        alt="Ice Breaker Cover"
        side="left"
      />
      <FloatingBookCard
        src="/assets/books/power-play.jpg"
        alt="Power Play Cover"
        side="right"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-[hsl(195,65%,55%)]/25 rounded-full text-sm font-medium text-[hsl(195,65%,75%)] tracking-wide backdrop-blur-md shadow-lg shadow-[hsl(195,65%,55%)]/5">
            <Sparkles className="w-4 h-4" />
            Launch Special — 2 Books, One Unbeatable Price
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-4 leading-[1.1] tracking-tight"
        >
          Where the Ice
          <span className="block mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(195,65%,75%)] via-[hsl(340,55%,85%)] to-[hsl(195,65%,75%)] text-shadow-glow">
              Meets the Heart
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-body text-lg sm:text-xl text-[hsl(210,30%,75%)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The Chicago Knights series — where NHL stars fall harder off the ice than on it.
          Two books. One starter pack. Your new obsession begins here.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/books">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[hsl(190,45%,42%)] to-[hsl(195,55%,35%)] hover:from-[hsl(190,50%,38%)] hover:to-[hsl(195,60%,32%)] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-[hsl(190,45%,42%)]/25 hover:shadow-xl hover:shadow-[hsl(190,45%,42%)]/35 transition-all duration-300 group border border-white/10"
            >
              <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Get The Starter Pack
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/books">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/15 text-white hover:bg-white/8 hover:border-white/25 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 group backdrop-blur-sm bg-white/5"
            >
              <Flame className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Read Excerpt Free
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: "4.75★", label: "Average Rating" },
            { value: "710+", label: "Pages of Romance" },
            { value: "$12.99", label: "Starter Pack" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/8 backdrop-blur-sm"
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="font-display text-xl sm:text-2xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[hsl(210,30%,65%)] uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade to white for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(210,50%,99%)] to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/25 flex justify-center pt-2"
        >
          <div className="w-1 h-1 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
