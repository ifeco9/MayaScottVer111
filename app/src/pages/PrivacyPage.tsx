import Header from "@/sections/Header";
import Footer from "@/sections/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            We collect account, purchase, and support information to operate this site, deliver purchased
            digital books, and provide customer support.
          </p>
          <p>
            Payment processing is handled by Stripe. We do not store full card numbers on our servers.
          </p>
          <p>
            You can request account data access or deletion by contacting support through the contact page.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
