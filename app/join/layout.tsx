import type { Metadata } from "next";
import { CustomerHeader } from "@/components/customer/header";

export const metadata: Metadata = {
  title: "Join Early Access | Woohl",
  description:
    "Join the Woohl waitlist for early access to discover emerging Indian brands across fashion, beauty, home, and lifestyle.",
};

export default function JoinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CustomerHeader />
      {children}
    </>
  );
}
