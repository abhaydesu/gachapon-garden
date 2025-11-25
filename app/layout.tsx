import type { Metadata } from "next";
import "./globals.css";

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