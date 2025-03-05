import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Bread Heads Arcade | Powered by $CRUMBS",
  description: "Welcome to the Bread Heads Arcade - Your retro gaming destination in the world of NFTs",
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
  themeColor: '#ff00ff', // Neon pink theme color
  manifest: '/manifest.json',
  openGraph: {
    title: 'Bread Heads Arcade | Powered by $CRUMBS',
    description: 'Your Gateway to Retro Gaming Excellence in the world of NFTs',
    url: 'https://arcade.breadheads.io',
    siteName: 'Bread Heads Arcade',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bread Heads Arcade',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bread Heads Arcade | Powered by $CRUMBS',
    description: 'Your Gateway to Retro Gaming Excellence in the world of NFTs',
    images: ['/twitter-image.png'],
    creator: '@BreadHeadsNFT',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${vt323.variable}`}>
      <body className="bg-black text-white min-h-screen">{children}</body>
    </html>
  );
}
