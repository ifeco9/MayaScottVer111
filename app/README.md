# Maya Scott Author Website

Full-stack website for author branding, book discovery, community engagement, and admin content management.

## Tech Stack

- React + TypeScript + Vite
- Hono + tRPC
- Drizzle ORM + MySQL
- Tailwind CSS + Radix UI components

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and fill required values.

3. Push the database schema:

```bash
npm run db:push
```

4. Start the development server:

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checks
- `npm run test` - Run tests
- `npm run db:push` - Sync schema to database
