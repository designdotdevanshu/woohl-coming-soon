"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Why Woohl", href: "/#why-woohl" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "FAQs", href: "/#faq" },
];

export const JoinEarlyAccessButton = ({ className }: { className?: string }) => (
  <div className={cn("hidden items-center space-x-4 lg:flex", className)}>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href="/join"
        className="inline-flex items-center space-x-2 rounded-full bg-primary px-6 py-2.5 font-medium text-white transition-all duration-200 hover:shadow-lg"
      >
        <span>Join Early Access</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  </div>
);

export function CustomerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  return (
    <motion.header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="bg-primary bg-clip-text text-4xl font-audiowide text-transparent">
                Woohl
              </h1>
            </Link>
          </motion.div>

          <nav className="hidden items-center space-x-8 lg:flex">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 font-medium text-foreground transition-colors duration-200 hover:text-primary"
                >
                  <span>{item.name}</span>
                </Link>
              </div>
            ))}
          </nav>

          <JoinEarlyAccessButton />

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-accent lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border/40 lg:hidden"
            >
              <nav className="flex flex-col space-y-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-lg px-4 py-2 font-medium text-foreground transition-colors duration-200 hover:bg-accent hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/join"
                  className="mx-4 flex items-center justify-center space-x-2 rounded-full bg-primary px-6 py-2.5 font-medium text-white transition-all duration-200 hover:shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Join Early Access</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
