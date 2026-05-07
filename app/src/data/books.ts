export interface Book {
  id: string;
  title: string;
  series: string;
  seriesOrder: number;
  genre: string;
  cover: string;
  description: string;
  rating: number;
  reviewCount: number;
  tropes: string[];
  buyLinks: {
    amazon?: string;
    apple?: string;
    kobo?: string;
    google?: string;
  };
  publishedDate: string;
  pageCount: number;
  status: "published" | "preorder" | "coming-soon";
  releaseDate?: string;
}

export const books: Book[] = [
  {
    id: "ice-breaker",
    title: "Ice Breaker",
    series: "Chicago Knights",
    seriesOrder: 1,
    genre: "Hockey Romance",
    cover: "/assets/books/ice-breaker.jpg",
    description:
      "When injury sidelines NHL star Logan Carter, the last thing he expects is to fall for his sharp-tongued physical therapist. Olivia Bennett doesn't date hockey players — especially not the team's golden boy. But as late-night rehab sessions turn into something more, both of them discover that the heart doesn't play by the rules.",
    rating: 4.7,
    reviewCount: 2847,
    tropes: ["Grumpy/Sunshine", "Forced Proximity", "Sports Romance"],
    buyLinks: {
      amazon: "/checkout?book=ice-breaker",
      apple: "/checkout?book=ice-breaker",
      kobo: "/checkout?book=ice-breaker",
      google: "/checkout?book=ice-breaker",
    },
    publishedDate: "2024-01-15",
    pageCount: 342,
    status: "published",
  },
  {
    id: "power-play",
    title: "Power Play",
    series: "Chicago Knights",
    seriesOrder: 2,
    genre: "Hockey Romance",
    cover: "/assets/books/power-play.jpg",
    description:
      "Defenseman Jake Miller has a reputation for being untouchable on the ice — and unreachable off it. But when sports journalist Avery Thomas starts digging into his past for an exclusive profile, she uncovers the walls he's built around his heart. In a game where vulnerability is the ultimate risk, who will make the first move?",
    rating: 4.8,
    reviewCount: 2134,
    tropes: ["Enemies to Lovers", "Emotional Scars", "Sports Romance"],
    buyLinks: {
      amazon: "/checkout?book=power-play",
      apple: "/checkout?book=power-play",
      kobo: "/checkout?book=power-play",
    },
    publishedDate: "2024-04-22",
    pageCount: 368,
    status: "published",
  },
];

export const series = [
  {
    id: "chicago-knights",
    name: "Chicago Knights",
    genre: "Hockey Romance",
    description:
      "Steamy romance meets the ice rink in this addictive series about the players of the Chicago Knights NHL team. Book 1 follows injured star Logan Carter and his reluctant physical therapist. Book 2 dives into defenseman Jake Miller's walled-off heart.",
    bookCount: 2,
    readOrder: ["ice-breaker", "power-play"],
  },
];

export const packageDeal = {
  title: "Chicago Knights Starter Pack",
  subtitle: "Two books. One irresistible series. The perfect place to fall in love with hockey romance.",
  books: ["ice-breaker", "power-play"],
  priceCents: 1299,
  originalPriceCents: 1798,
  description:
    "Get both Ice Breaker and Power Play together and save 28%. Dive into the Chicago Knights world where hockey meets heart-stopping romance. Book 1 introduces you to the team. Book 2 makes you never want to leave.",
  badge: "Launch Special",
  savings: "Save $4.99",
};

export const comingSoonBooks = [
  {
    id: "between-the-lines",
    title: "Between the Lines",
    teaser: "Team captain Marcus Stone is next...",
    estimatedDate: "Late 2025",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    avatar: "S",
    rating: 5,
    text: "Maya Scott's hockey romances are absolutely addictive! Ice Breaker had me staying up until 3 AM. The chemistry between Logan and Olivia is off the charts. Already diving into Power Play next!",
    book: "Ice Breaker",
  },
  {
    id: 2,
    name: "Rachel B.",
    avatar: "R",
    rating: 5,
    text: "As a hockey fan AND romance reader, the Chicago Knights series is everything I never knew I needed. The sports details are authentic, and the romance is steamy. Power Play is chef's kiss!",
    book: "Power Play",
  },
  {
    id: 3,
    name: "Jessica L.",
    avatar: "J",
    rating: 5,
    text: "I bought both books as a bundle and read them back-to-back in one weekend. The Chicago Knights world is so immersive. Jake Miller in Power Play is my new book boyfriend forever.",
    book: "Chicago Knights Bundle",
  },
  {
    id: 4,
    name: "Amanda T.",
    avatar: "A",
    rating: 5,
    text: "Logan Carter in Ice Breaker is EVERYTHING. Grumpy NHL star meets sunshine PT? Sign me up. Maya Scott writes sports romance that actually feels authentic. Can't put these down!",
    book: "Ice Breaker",
  },
  {
    id: 5,
    name: "Megan K.",
    avatar: "M",
    rating: 5,
    text: "The enemies-to-lovers tension in Power Play is *chef's kiss*. Avery and Jake have the kind of chemistry that makes you forget to breathe. This starter pack is the best $12.99 I've ever spent.",
    book: "Power Play",
  },
  {
    id: 6,
    name: "Lauren D.",
    avatar: "L",
    rating: 5,
    text: "Devoured both books in two days. Maya Scott understands what romance readers want — strong heroines, complex heroes, and hockey details that don't feel like an afterthought. Obsessed!",
    book: "Chicago Knights Bundle",
  },
];

export const characters = [
  {
    id: 1,
    name: "Logan Carter",
    book: "Ice Breaker",
    description: "NHL star forward with a golden reputation and a heart of gold hiding beneath the spotlight. When injury sidelines him, he discovers the one woman who sees past the fame.",
    image: "/assets/characters/character1.jpg",
  },
  {
    id: 2,
    name: "Olivia Bennett",
    book: "Ice Breaker",
    description: "Sharp-witted physical therapist who swore she'd never date a hockey player. Her rule book didn't account for Logan Carter's stubborn charm.",
    image: "/assets/characters/character2.jpg",
  },
  {
    id: 3,
    name: "Jake Miller",
    book: "Power Play",
    description: "Chicago Knights defenseman with walls higher than the rink boards. Unreachable off the ice — until a journalist starts asking questions he can't deflect.",
    image: "/assets/characters/character3.jpg",
  },
  {
    id: 4,
    name: "Avery Thomas",
    book: "Power Play",
    description: "Sports journalist chasing the story of a lifetime. She didn't expect to uncover the man behind the mask — or her own heart along the way.",
    image: "/assets/characters/character4.jpg",
  },
];
