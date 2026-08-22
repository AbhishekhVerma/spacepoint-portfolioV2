# SpacePoint Aerospace Portfolio

A highly interactive, brutalist, scroll-driven portfolio website designed for an aerospace engineering and machine learning profile. 

Built with **Next.js (App Router)**, **React**, **Tailwind CSS**, and **GSAP ScrollTrigger**, and powered by a **Headless JSON CMS** backed by **Supabase (PostgreSQL)** and **Prisma**.

## Features

- **Brutalist UI**: Deep black backgrounds (`#0a0a0a`), stark typography, sharp edges (no border radius), and high-contrast telemetry accents.
- **Dynamic Headless CMS**: Built-in `/dashboard` protected by NextAuth for updating site content (text, gallery images, telemetry metrics) in real-time.
- **GSAP ScrollTrigger Animations**:
  - Massive zoom-through hero typography
  - Pinned horizontal scrolling for hardware constraint deep-dives
  - Mesh network SVG stroke animations
  - Vertical 3D parallax effects combined with fade-and-scale SVG transitions
  - Staggered masonry gallery reveals
- **Responsive Design**: Fluid typography (`vw`) and Tailwind breakpoints ensure the layout holds up on mobile and desktop viewports.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & ScrollTrigger plugin
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## Local Development

To run the development server locally, you will need to set up your `.env` file first.

1. **Environment Variables**: Create a `.env` file in the root directory:
```env
# Supabase PostgreSQL connection string (Transaction pooler for local development)
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres?pgbouncer=true"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-1234"
NEXTAUTH_URL="http://localhost:3000"
```

2. **Install and Run**:
```bash
# Install dependencies
npm install

# Push the Prisma schema to your database (Make sure you use your IPv4 pooler connection locally)
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Start the local server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The CMS Dashboard

You can edit the content on the portfolio by visiting `/dashboard`. 
The system features a "Smart Seed" NextAuth provider. If you log in with a password for the very first time on a fresh database, it will automatically register your account and seed the initial portfolio content.

The dashboard uses a JSON content structure mapped to a single database column, mimicking a true headless CMS architecture.

## Deployment to Vercel

This project is configured out-of-the-box for Vercel. 

1. Ensure your `.env` variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`) are configured in your Vercel project settings. Set `NEXTAUTH_URL` to your Vercel production URL.
2. The `package.json` includes `"postinstall": "prisma generate"` to ensure the Prisma client builds correctly during Vercel's deployment phase.
3. Push your code, and Vercel will handle the rest. Remember to run `npx prisma db push` manually from your local machine to update the Supabase schema if you make any database changes, as Vercel does not automatically push schema migrations.
