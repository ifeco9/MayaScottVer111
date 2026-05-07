import { useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Loader2, ShoppingCart } from "lucide-react";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import { books } from "@/data/books";
import { Button } from "@/components/ui/button";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";

const DEFAULT_PRICE_CENTS = 799;

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const bookSlug = params.get("book") || "";
  const paymentState = params.get("payment");
  const orderId = Number(params.get("orderId") || "0");

  const book = useMemo(() => books.find((item) => item.id === bookSlug), [bookSlug]);
  const displayPriceCents = DEFAULT_PRICE_CENTS;

  const createCheckout = trpc.payment.createCheckout.useMutation({
    onSuccess: (result) => {
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      }
    },
  });
  const markMockPaid = trpc.payment.markMockPaid.useMutation({
    onSuccess: () => {
      navigate("/library?purchase=success");
    },
  });

  const handleCheckout = () => {
    if (!book) return;
    if (!user) {
      navigate("/login");
      return;
    }
    createCheckout.mutate({
      bookSlug: book.id,
      title: book.title,
      coverUrl: `${window.location.origin}${book.cover}`,
      priceCents: displayPriceCents,
      successPath: "/checkout",
      cancelPath: "/checkout",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (paymentState === "success" && orderId > 0 && !markMockPaid.isSuccess) {
    markMockPaid.mutate({ orderId });
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-display mb-3">Book not found</h1>
          <p className="text-muted-foreground mb-6">Select a title from the catalog to continue checkout.</p>
          <Button asChild>
            <Link to="/books">Back to Books</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16 max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-xl overflow-hidden border bg-card">
            <img src={book.cover} alt={book.title} className="w-full aspect-[2/3] object-cover" />
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h1 className="text-3xl font-display mb-2">{book.title}</h1>
            <p className="text-sm text-muted-foreground mb-4">{book.series} #{book.seriesOrder}</p>
            <p className="text-sm mb-6">{book.description}</p>
            <div className="flex items-center justify-between border-t pt-4 mb-6">
              <span className="text-sm text-muted-foreground">One-time purchase</span>
              <span className="text-xl font-semibold">${(displayPriceCents / 100).toFixed(2)}</span>
            </div>

            {paymentState === "cancelled" && (
              <p className="text-sm text-amber-600 mb-3">Checkout was cancelled. You can retry anytime.</p>
            )}

            <Button
              onClick={handleCheckout}
              className="w-full"
              size="lg"
              disabled={createCheckout.isPending}
            >
              {createCheckout.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4 mr-2" />
              )}
              Continue to Secure Checkout
            </Button>
            {!user && <p className="text-xs text-muted-foreground mt-3">You will be asked to sign in first.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
