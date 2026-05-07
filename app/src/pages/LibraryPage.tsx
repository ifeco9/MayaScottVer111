import { BookOpen, Download, ExternalLink } from "lucide-react";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";

export default function LibraryPage() {
  const { user, isLoading } = useAuth({ redirectOnUnauthenticated: true });
  const booksQuery = trpc.library.myBooks.useQuery(undefined, {
    enabled: !!user,
  });
  const accessMutation = trpc.library.getAccessUrl.useMutation();

  const handleOpen = async (bookId: number) => {
    const result = await accessMutation.mutateAsync({ bookId });
    if (result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer");
    }
  };

  if (isLoading || booksQuery.isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-muted-foreground">Loading your library...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl">My Library</h1>
          <p className="text-muted-foreground mt-2">Access your purchased books anytime.</p>
        </div>

        {!booksQuery.data || booksQuery.data.length === 0 ? (
          <div className="rounded-xl border bg-card p-8 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
            <h2 className="font-semibold mb-2">No books yet</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Purchase a title from the catalog and it will appear here.
            </p>
            <Button asChild>
              <a href="/books">Browse Books</a>
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {booksQuery.data.map((book) => (
              <div key={book.entitlementId} className="rounded-xl border bg-card overflow-hidden">
                <img
                  src={book.coverUrl || "/assets/hero/hero-bg.jpg"}
                  alt={book.title}
                  className="w-full aspect-[2/3] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-display text-xl mb-1">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Purchased {new Date(book.purchasedAt).toLocaleDateString("en-US")}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleOpen(book.bookId)}
                      disabled={accessMutation.isPending}
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Read
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpen(book.bookId)}
                      disabled={accessMutation.isPending}
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
