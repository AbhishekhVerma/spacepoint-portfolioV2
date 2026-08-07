# SpacePoint Aerospace Portfolio

A highly interactive, brutalist, scroll-driven portfolio website designed for an aerospace engineering and machine learning profile. 

Built with **Next.js (App Router)**, **React**, **Tailwind CSS**, and **GSAP ScrollTrigger**.

## Features

- **Brutalist UI**: Deep black backgrounds (`#0a0a0a`), stark typography, sharp edges (no border radius), and high-contrast telemetry accents.
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
- **Deployment**: Optimized for Vercel

## Local Development

To run the development server locally:

```bash
# Install dependencies
npm install

# Start the local server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

This project is configured out-of-the-box for Vercel. 

1. Push this code to a GitHub, GitLab, or Bitbucket repository.
2. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
3. Vercel will automatically detect the Next.js framework, install the dependencies, build the project, and deploy it.

## Customization

- **Global Styles & Variables**: Check `src/app/globals.css` for the brutalist color palette and base CSS resets.
- **Images**: All static assets should be placed in the `/public/img/` directory. 
- **Font Spacing**: Adjust Tailwind `tracking-*` classes within the components if you switch to a custom loaded font in `src/app/layout.tsx`.
