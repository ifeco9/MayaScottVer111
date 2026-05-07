import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, User } from "lucide-react";
import { characters } from "@/data/books";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CharacterArt() {
  const [selectedCharacter, setSelectedCharacter] = useState<(typeof characters)[0] | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[hsl(210,50%,99%)] to-[hsl(210,50%,96%)] relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(190,45%,42%)]/20 to-transparent" />

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
            Meet The Characters
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0F1729] mt-3 mb-4">
            Character Art Gallery
          </h2>
          <p className="font-body text-[hsl(220,10%,45%)] max-w-xl mx-auto">
            See the characters from your favorite books come to life through exclusive commissioned artwork.
          </p>
        </motion.div>

        {/* Character Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedCharacter(character)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                {/* Character Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729]/90 via-[#0F1729]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <h3 className="font-display text-xl font-semibold text-white mb-1">
                    {character.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{character.book}</span>
                  </div>
                </div>

                {/* Name tag always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0F1729]/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {character.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Coming soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-[hsl(210,30%,90%)] flex flex-col items-center justify-center p-6 text-center bg-white/50">
              <div className="w-14 h-14 rounded-full bg-[hsl(190,45%,42%)]/10 flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-[hsl(190,45%,42%)]" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#0F1729] mb-2">
                More Characters Coming
              </h3>
              <p className="text-sm text-[hsl(220,10%,55%)]">
                New character artwork is added regularly. Subscribe to be notified!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Character Detail Dialog */}
      <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
        <DialogContent className="max-w-lg bg-[hsl(210,50%,99%)] border-[hsl(210,30%,90%)]">
          {selectedCharacter && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-[#0F1729]">
                  {selectedCharacter.name}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="rounded-xl overflow-hidden shadow-lg mb-4">
                  <img
                    src={selectedCharacter.image}
                    alt={selectedCharacter.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-[hsl(190,45%,42%)]" />
                  <span className="text-sm font-medium text-[hsl(190,45%,42%)]">
                    {selectedCharacter.book}
                  </span>
                </div>
                <p className="text-[hsl(220,10%,45%)] font-body text-sm leading-relaxed">
                  {selectedCharacter.description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
