import { motion } from "framer-motion";
import { BookOpen, Heart, MapPin, Coffee, Pen, Award } from "lucide-react";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const authorHighlights = [
  { icon: Coffee, label: "Writing Fuel", value: "Coffee + Playlists" },
  { icon: BookOpen, label: "Genres", value: "Romance + Suspense" },
  { icon: Heart, label: "Story Promise", value: "Emotion-First" },
  { icon: Pen, label: "Craft Focus", value: "Character-Driven" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F8F0EB] to-[#FDF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Author Photo */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C97B84]/20 to-[#D4A574]/20 rounded-3xl transform rotate-2 scale-105" />
                  <img
                    src="/assets/about/author.jpg"
                    alt="Maya Scott"
                    className="relative w-72 sm:w-80 rounded-3xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-[#E8DDD4]">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#D4A574]" />
                      <div>
                        <p className="text-xs text-[#8B7B6B]">USA Today</p>
                        <p className="text-sm font-semibold text-[#2D3142]">Bestselling Author</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="text-sm font-medium text-[#C97B84] uppercase tracking-[0.2em]">
                  About The Author
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2D3142] mt-3 mb-6">
                  Hi, I'm Maya
                </h1>
                <div className="space-y-4 font-body text-[#5A5450] leading-relaxed">
                  <p>
                    I'm a romance author who believes in the power of love stories — the kind that make
                    you laugh, cry, and stay up way too late turning pages. By day, I juggle writing
                    with being a mom to two kids and a very demanding golden retriever. By night, I
                    create worlds where hockey players fall hard, detectives find love in the darkest
                    places, and small towns hold the biggest hearts.
                  </p>
                  <p>
                    My Chicago Knights hockey romance series was born from my obsession with the sport
                    (and yes, the players' jawlines). The Shadow Protectors romantic suspense series
                    lets me combine my love of mystery with red-hot chemistry. And Willow Creek? That's
                    my love letter to small-town life and second chances.
                  </p>
                  <p>
                    When I'm not writing, you'll find me binge-reading other authors' books, searching
                    for the perfect latte, or planning my next travel adventure. I currently live in
                    Chicago with my family, and yes — I've been to every hockey game I can get tickets
                    for.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-6 text-sm text-[#8B7B6B]">
                  <MapPin className="w-4 h-4" />
                  <span>Chicago, Illinois</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Author Highlights */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {authorHighlights.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#FDF8F5] to-[#F8F0EB] border border-[#E8DDD4]/50"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C97B84]/10 flex items-center justify-center mx-auto mb-3">
                    <fact.icon className="w-5 h-5 text-[#C97B84]" />
                  </div>
                  <p className="font-display text-2xl font-bold text-[#2D3142]">{fact.value}</p>
                  <p className="text-xs text-[#8B7B6B] mt-1">{fact.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-b from-[#FDF8F5] to-[#F8F0EB]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl font-bold text-[#2D3142] mb-4">
                Let's Connect
              </h2>
              <p className="text-[#5A5450] mb-8">
                I love hearing from readers! Whether you want to chat about books, share theories,
                or just say hi — my inbox is always open.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#C97B84] to-[#A85D65] hover:from-[#B86A73] hover:to-[#97545C] text-white rounded-full px-8 shadow-md"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Get in Touch
                  </Button>
                </Link>
                <Link to="/books">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#C97B84]/30 text-[#C97B84] hover:bg-[#C97B84]/10 rounded-full px-8"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse My Books
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
