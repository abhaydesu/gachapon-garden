// src/app/layout.tsx
import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ 
  subsets: ["latin"],
  variable: "--font-fredoka", // Matches CSS var
  display: "swap",
});

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: "--font-nunito", // Matches CSS var
  display: "swap",
});

export const metadata: Metadata = {
  title: "Day 11",
  description: "A special puzzle for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`press-start-2p-regular antialiased`}>
        {children}
      </body>
    </html>
  );
}