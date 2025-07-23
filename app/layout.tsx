import { audiowide, montserrat, montserratAlternates } from "./fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Woohl | India's Next Big eCommerce Experience",
  description: "Discover a smarter way to shop online. Woohl is launching soon - bringing exclusive deals, trusted sellers, and a new kind of shopping experience to India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${montserratAlternates.variable} ${audiowide.variable} antialiased`}>
      <body className="bg-[#010609] text-white font-montserrat-alt">{children}</body>
    </html>
  );
}
