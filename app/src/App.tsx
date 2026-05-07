import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import BooksPage from "./pages/BooksPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CommunityPage from "./pages/CommunityPage";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/CheckoutPage";
import LibraryPage from "./pages/LibraryPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
