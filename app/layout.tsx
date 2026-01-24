import type { Metadata } from "next";
import { Audiowide, Inter } from "next/font/google";
import { CustomerHeader } from "@/components/customer/header";
import { CustomerFooter } from "@/components/customer/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-audiowide",
});

export const metadata: Metadata = {
  title: "Woohl | Discover Emerging Indian Brands",
  description: "Join the waitlist for early access to Woohl - a curated marketplace for discovering new and upcoming Indian brands across fashion, beauty, home, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${audiowide.variable} antialiased`}>
        <CustomerHeader />
        {children}
        <CustomerFooter />
      </body>
    </html>
  );
}
