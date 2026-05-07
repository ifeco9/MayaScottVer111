import Header from "@/sections/Header";
import Footer from "@/sections/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl mb-6">Terms of Use</h1>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Purchased digital books are licensed for personal use and may not be redistributed or resold.
          </p>
          <p>
            Refund requests are evaluated case by case. Fraudulent or abusive activity may result in
            access revocation.
          </p>
          <p>
            By using this site, you agree to comply with local laws and platform community standards.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
