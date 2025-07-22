import "./globals.css";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import type { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat-alt",
});

export const metadata: Metadata = {
  title: "Woohl",
  description: "Coming soon landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${montserratAlternates.variable}`}>
      <body className="bg-black text-white font-[var(--font-montserrat-alt)]">
        {children}
      </body>
    </html>
  );
}
