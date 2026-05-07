# Maya Scott Author Website - Local Setup Guide

## Prerequisites

- **Node.js 20+** - [Download here](https://nodejs.org/)
- **MySQL** (local or TiDB Cloud) - [TiDB Cloud Free Tier](https://tidbcloud.com/)
- **npm** (comes with Node.js)

## Step-by-Step Setup

### 1. Clone/Copy the Project

```bash
# Copy the project folder to your local machine
cd /path/to/maya-scott-author
```

### 2. Install Dependencies

```bash
npm install
```

This installs all frontend (React, Tailwind, shadcn/ui, Framer Motion) and backend (tRPC, Hono, Drizzle ORM, MySQL2) dependencies.

### 3. Database Setup

You need a **MySQL-compatible database**. Two options:

#### Option A: TiDB Cloud (Recommended - Free Tier)

1. Sign up at [tidbcloud.com](https://tidbcloud.com/) (free tier available)
2. Create a cluster
3. Go to **Connect** and copy the connection string
4. The URL format is:
   ```
   mysql://username:password@host:4000/database?ssl={"rejectUnauthorized":true}
   ```

#### Option B: Local MySQL

1. Install MySQL 8.0+ locally
2. Create a database:
   ```sql
   CREATE DATABASE maya_scott_db;
   ```
3. Your connection URL will be:
   ```
   mysql://root:password@localhost:3306/maya_scott_db
   ```

### 4. Configure Environment Variables

Create or open the `.env` file in the project root and ensure it contains:

```env
# Database
DATABASE_URL=mysql://your-username:your-password@your-host:port/database?ssl={"rejectUnauthorized":true}

# OAuth (for authentication - pre-configured)
VITE_OAUTH_AUTH_URL=...
VITE_APP_ID=...
OAUTH_AUTH_URL=...
OAUTH_API_URL=...
APP_SECRET=...
OWNER_UNION_ID=...
```

**Important:** Replace `DATABASE_URL` with your actual MySQL connection string. The OAuth credentials are pre-configured and should work out of the box.

### 5. Push Database Schema

```bash
npm run db:push
```

This creates all tables (users, contacts, messages, subscribers) in your database.

### 6. Start Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

The dev server runs both frontend (Vite HMR) and backend (tRPC API + OAuth) simultaneously.

### 7. Access Admin Dashboard

1. Visit **http://localhost:3000/login** and sign in
2. The **first user to log in** is automatically assigned the `admin` role (controlled by `OWNER_UNION_ID`)
3. Navigate to **http://localhost:3000/admin** to access the dashboard

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run check` | Type-check all TypeScript files |
| `npm run format` | Format code with Prettier |
| `npm run db:push` | Sync database schema (development) |
| `npm run db:generate` | Generate migration SQL file |
| `npm run db:migrate` | Apply pending migrations |

---

## Project Structure

```
maya-scott-author/
├── src/                          # Frontend code
│   ├── sections/                 # Homepage sections
│   │   ├── Header.tsx            # Navigation bar
│   │   ├── Hero.tsx              # Landing hero
│   │   ├── BookCarousel.tsx      # Books carousel
│   │   ├── PreorderSection.tsx   # Preorder area
│   │   ├── Newsletter.tsx        # Newsletter signup
│   │   ├── Reviews.tsx           # Testimonials
│   │   ├── CharacterArt.tsx      # Character gallery
│   │   └── Footer.tsx            # Site footer
│   ├── pages/                    # Route pages
│   │   ├── Home.tsx              # Homepage
│   │   ├── BooksPage.tsx         # Book listing
│   │   ├── AboutPage.tsx         # Author bio
│   │   ├── ContactPage.tsx       # Contact form
│   │   ├── CommunityPage.tsx     # Message board
│   │   ├── AdminDashboard.tsx    # Admin panel
│   │   ├── Login.tsx             # OAuth login
│   │   └── NotFound.tsx          # 404 page
│   ├── data/                     # Static content
│   │   └── books.ts              # Books, series, reviews data
│   ├── hooks/
│   │   └── useAuth.ts            # Auth state hook
│   ├── providers/
│   │   └── trpc.tsx              # tRPC client provider
│   ├── components/ui/            # shadcn/ui components
│   ├── App.tsx                   # Route definitions
│   ├── main.tsx                  # App entry point
│   └── index.css                 # Global styles
├── api/                          # Backend code
│   ├── router.ts                 # tRPC router registry
│   ├── middleware.ts             # Auth procedures (public/authed/admin)
│   ├── auth-router.ts            # Auth endpoints
│   ├── contact-router.ts         # Contact form API
│   ├── message-router.ts         # Message board API
│   ├── newsletter-router.ts      # Newsletter API
│   ├── admin-router.ts           # Admin-only API
│   ├── boot.ts                   # Hono server entry
│   ├── context.ts                # Request context
│   └── queries/connection.ts     # DB connection
├── db/
│   ├── schema.ts                 # Database tables
│   └── relations.ts              # Table relations
├── contracts/                    # Shared types
├── public/assets/                # Static images
│   ├── books/                    # Book covers
│   ├── characters/               # Character art
│   ├── hero/                     # Hero backgrounds
│   └── about/                    # Author photo
├── .env                          # Environment variables
├── drizzle.config.ts             # Drizzle ORM config
├── vite.config.ts                # Vite config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

---

## Customizing Content

### Adding/Editing Books

Edit `src/data/books.ts` to add or modify:
- Books and their details
- Series information
- Reader testimonials
- Character artwork

After editing, the changes will reflect immediately in dev mode.

### Adding New Images

Place images in the `public/assets/` folder (e.g., `public/assets/books/new-book.jpg`) and reference them with `/assets/books/new-book.jpg`.

### Changing Colors/Theme

The romantic color palette is defined in `src/index.css` using CSS custom properties. Key colors:
- Primary accent: `#C97B84` (dusty rose)
- Gold accent: `#D4A574` (warm gold)
- Background: `#FDF8F5` (warm cream)
- Dark: `#2D3142` (deep navy)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `PORT 3000 in use` | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| `Database connection refused` | Check `DATABASE_URL` in `.env` matches your DB |
| `db:push fails` | Verify MySQL is running and credentials are correct |
| `OAuth callback fails` | Ensure you're accessing via `http://localhost:3000` |
| `Type errors` | Run `npm run check` to see specific errors |
| `Admin access denied` | Log in with the account that matches `OWNER_UNION_ID` |

---

## Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

The production build outputs to `dist/` with:
- `dist/public/` - Static frontend assets
- `dist/boot.js` - Backend server bundle

For Vercel/Netlify deployment, deploy the `dist/public/` folder as a static site and run the backend separately, or use a platform that supports full-stack Node.js apps.
