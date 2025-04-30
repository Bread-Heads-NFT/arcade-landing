'use client';

import { WalletProviderWrapper } from "@/components/WalletProvider";
import { UmiProvider } from "@/components/UmiProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <WalletProviderWrapper>
          <UmiProvider>
            {children}
          </UmiProvider>
        </WalletProviderWrapper>
      </body>
    </html>
  );
}
