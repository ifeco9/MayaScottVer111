import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import { trpc } from "@/providers/trpc";

const categories = ["All", "General", "Book Discussion", "Theories", "Fan Art", "Recommendations"];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newPost, setNewPost] = useState({
    name: "",
    email: "",
    content: "",
    category: "General",
  });
  const [showForm, setShowForm] = useState(false);

  const postsQuery = trpc.message.list.useQuery();
  const createPost = trpc.message.create.useMutation({
    onSuccess: () => {
      setNewPost({ name: "", email: "", content: "", category: "General" });
      setShowForm(false);
      postsQuery.refetch();
    },
  });

  const posts = postsQuery.data || [];

  const filteredPosts =
    selectedCategory === "All" ? posts : posts.filter((p) => p.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.name && newPost.email && newPost.content) {
      createPost.mutate({
        ...newPost,
      });
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8F0EB] to-[#FDF8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C97B84]/10 rounded-full mb-4">
                <MessageSquare className="w-4 h-4 text-[#C97B84]" />
                <span className="text-sm font-medium text-[#C97B84]">Reader Community</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2D3142] mb-4">
                Message Board
              </h1>
              <p className="font-body text-[#5A5450] max-w-xl mx-auto">
                A place for readers to connect, share thoughts about the books, discuss theories, and make friends.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* New Post Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            {!showForm ? (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full h-14 bg-white border-2 border-dashed border-[#C97B84]/30 text-[#C97B84] hover:bg-[#C97B84]/5 hover:border-[#C97B84]/50 rounded-2xl font-medium transition-all"
              >
                <Send className="w-4 h-4 mr-2" />
                Write a new post...
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-white rounded-2xl p-6 border border-[#E8DDD4]/50 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-[#2D3142] mb-4">
                  New Post
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your name"
                      value={newPost.name}
                      onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
                      required
                      className="h-11 rounded-xl border-[#E8DDD4] focus:border-[#C97B84]"
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={newPost.email}
                      onChange={(e) => setNewPost({ ...newPost, email: e.target.value })}
                      required
                      className="h-11 rounded-xl border-[#E8DDD4] focus:border-[#C97B84]"
                    />
                  </div>
                  <Input
                    placeholder="Category (e.g. Book Discussion)"
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value || "General" })}
                    className="h-11 rounded-xl border-[#E8DDD4] focus:border-[#C97B84]"
                  />
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    required
                    rows={4}
                    className="rounded-xl border-[#E8DDD4] focus:border-[#C97B84] resize-none"
                  />
                  <div className="flex gap-3 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="rounded-full border-[#E8DDD4]"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createPost.isPending}
                      className="bg-gradient-to-r from-[#C97B84] to-[#A85D65] hover:from-[#B86A73] hover:to-[#97545C] text-white rounded-full px-6"
                    >
                      {createPost.isPending ? "Posting..." : "Post"}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#2D3142] text-white"
                    : "bg-white text-[#5A5450] border border-[#E8DDD4] hover:border-[#C97B84]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Posts */}
          <div className="space-y-4">
            {postsQuery.isLoading ? (
              <div className="text-center py-12">
                <p className="text-[#8B7B6B]">Loading posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-2xl border border-[#E8DDD4]/50"
              >
                <MessageSquare className="w-12 h-12 text-[#E8DDD4] mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-[#2D3142] mb-2">
                  No posts yet
                </h3>
                <p className="text-sm text-[#8B7B6B] mb-4">
                  Be the first to start a conversation!
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-[#C97B84] to-[#A85D65] text-white rounded-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Write First Post
                </Button>
              </motion.div>
            ) : (
              filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DDD4]/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-[#C97B84] to-[#A85D65] flex-shrink-0">
                      <AvatarFallback className="text-white text-sm font-semibold">
                        {post.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-[#2D3142] text-sm">{post.name}</span>
                        <span className="text-[#8B7B6B] text-xs">·</span>
                        <span className="text-[#8B7B6B] text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <p className="text-[#5A5450] font-body text-sm leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1.5 text-xs text-[#8B7B6B] hover:text-[#C97B84] transition-colors">
                          <Heart className="w-3.5 h-3.5" />
                          <span>Like</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
