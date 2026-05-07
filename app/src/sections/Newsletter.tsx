import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Heart, Gift, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/providers/trpc";

const perks = [
  { icon: Gift, text: "Exclusive bonus scenes and deleted chapters" },
  { icon: Sparkles, text: "Early access to new releases and cover reveals" },
  { icon: Heart, text: "Behind-the-scenes content and character Q&As" },
  { icon: Mail, text: "Weekly curated book recommendations" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      subscribe.mutate({ email: email.trim() });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[hsl(210,50%,96%)] to-[hsl(210,50%,99%)] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(190,45%,42%)]/20 to-transparent" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-[hsl(190,45%,42%)]/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-[hsl(195,65%,68%)]/5 rounded-full blur-[60px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(190,45%,42%)]/10 rounded-full mb-4">
            <Mail className="w-4 h-4 text-[hsl(190,45%,42%)]" />
            <span className="text-sm font-medium text-[hsl(190,45%,42%)]">Reader Newsletter</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0F1729] mb-4">
            Get Exclusive Bonus Content
          </h2>
          <p className="font-body text-[hsl(220,10%,45%)] max-w-xl mx-auto">
            Subscribe to my newsletter and be the first to know about new releases, bonus scenes,
            and special giveaways reserved just for my readers.
          </p>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10"
        >
          {perks.map((perk, i) => (
            <motion.div
              key={perk.text}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/60 border border-[hsl(210,30%,90%)]/50"
            >
              <div className="w-9 h-9 rounded-full bg-[hsl(190,45%,42%)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <perk.icon className="w-4 h-4 text-[hsl(190,45%,42%)]" />
              </div>
              <p className="text-sm text-[hsl(220,10%,45%)] font-body">{perk.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-[hsl(190,45%,42%)]/10 to-[hsl(195,65%,68%)]/10 border border-[hsl(190,45%,42%)]/20"
            >
              <div className="w-14 h-14 rounded-full bg-[hsl(190,45%,42%)]/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-[hsl(190,45%,42%)]" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#0F1729] mb-2">
                Welcome to the Family!
              </h3>
              <p className="text-[hsl(220,10%,45%)] text-sm">
                Check your inbox for a confirmation email and your free bonus content.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 rounded-full border-[hsl(210,30%,90%)] bg-white px-5 text-base focus:border-[hsl(190,45%,42%)] focus:ring-[hsl(190,45%,42%)]/20"
              />
              <Button
                type="submit"
                size="lg"
                disabled={subscribe.isPending}
                className="h-12 bg-gradient-to-r from-[hsl(190,45%,42%)] to-[hsl(195,55%,35%)] hover:from-[hsl(190,50%,38%)] hover:to-[hsl(195,60%,32%)] text-white rounded-full px-8 font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {subscribe.isPending ? (
                  "Subscribing..."
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          )}
          <p className="text-xs text-[hsl(220,10%,55%)] text-center mt-4">
            No spam, ever. Unsubscribe anytime. Your privacy is respected.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
