import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpacePoint UAE | Aerospace & Edge AI',
  description: 'Interactive portfolio detailing aerospace engineering, embedded systems, and machine learning work at SpacePoint UAE.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
