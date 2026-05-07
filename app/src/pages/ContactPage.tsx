import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Instagram, Facebook, Twitter, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", handle: "@mayascottauthor" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com", handle: "MayaScottAuthor" },
  { icon: Twitter, label: "Twitter", href: "https://x.com", handle: "@MayaScottBooks" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const sendMessage = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      sendMessage.mutate(form);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F8F0EB] to-[#FDF8F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2D3142] mb-4">
                Get in Touch
              </h1>
              <p className="font-body text-[#5A5450]">
                Have a question, want to say hi, or interested in collaborating? I'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DDD4]/50 shadow-sm">
                <h2 className="font-display text-2xl font-semibold text-[#2D3142] mb-2">
                  Send a Message
                </h2>
                <p className="text-sm text-[#8B7B6B] mb-6">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#C97B84]/10 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-[#C97B84]" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#2D3142] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-[#5A5450]">
                      Thank you for reaching out. I'll respond to your message soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#2D3142]">
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Jane Doe"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          className="h-11 rounded-xl border-[#E8DDD4] focus:border-[#C97B84] focus:ring-[#C97B84]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#2D3142]">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                          className="h-11 rounded-xl border-[#E8DDD4] focus:border-[#C97B84] focus:ring-[#C97B84]/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[#2D3142]">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="h-11 rounded-xl border-[#E8DDD4] focus:border-[#C97B84] focus:ring-[#C97B84]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#2D3142]">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        rows={5}
                        className="rounded-xl border-[#E8DDD4] focus:border-[#C97B84] focus:ring-[#C97B84]/20 resize-none"
                      />
                    </div>
                    {sendMessage.isError && (
                      <div className="flex items-center gap-2 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        Something went wrong. Please try again.
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={sendMessage.isPending}
                      className="w-full h-12 bg-gradient-to-r from-[#C97B84] to-[#A85D65] hover:from-[#B86A73] hover:to-[#97545C] text-white rounded-full font-semibold shadow-md"
                    >
                      {sendMessage.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Community CTA */}
              <div className="bg-gradient-to-br from-[#C97B84] to-[#A85D65] rounded-2xl p-6 text-white">
                <MessageSquare className="w-8 h-8 mb-3 opacity-80" />
                <h3 className="font-display text-xl font-semibold mb-2">
                  Join the Community
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  Connect with fellow readers, share your thoughts, and be part of our book-loving community.
                </p>
                <Link to="/community">
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 rounded-full"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Visit Message Board
                  </Button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-6 border border-[#E8DDD4]/50 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-[#2D3142] mb-4">
                  Follow Me
                </h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F0EB] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#C97B84]/10 flex items-center justify-center group-hover:bg-[#C97B84]/20 transition-colors">
                        <social.icon className="w-4 h-4 text-[#C97B84]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#2D3142]">{social.label}</p>
                        <p className="text-xs text-[#8B7B6B]">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl p-6 border border-[#E8DDD4]/50 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-[#2D3142] mb-4">
                  Quick Answers
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-[#2D3142] mb-1">How often do you release new books?</p>
                    <p className="text-[#8B7B6B]">I typically publish 3-4 books per year across my series.</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#2D3142] mb-1">Do you offer signed copies?</p>
                    <p className="text-[#8B7B6B]">Yes! Sign up for my newsletter to be notified when they're available.</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#2D3142] mb-1">Can I request an ARC?</p>
                    <p className="text-[#8B7B6B]">ARC requests are open to newsletter subscribers before each launch.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
