import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 22nd Birthday, Chululu! 💖",
  description: "22 magical surprises for the most special person in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
