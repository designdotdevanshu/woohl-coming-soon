"use client";

import React, { JSX, useState } from "react";
import { motion } from "motion/react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Highlight } from "@/components/ui/hero-highlight";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { subscribeToEarlyAccess } from "@/actions/newsletter";

export default function BackgroundBeamsDemo(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    if (email.trim()) {
      try {
        const response = await subscribeToEarlyAccess({ email });
        if (response.success) {
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            setEmail("");
          }, 10000);
        } else {
          console.error("Subscription failed:", response.message);
        }
      } catch (error) {
        console.error("Error during subscription:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-svh w-full bg-neutral-950 flex flex-col items-center lg:justify-center antialiased">
      <div className="max-md:mt-16 flex flex-col justify-center items-center max-w-7xl mx-auto p-4">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 mx-auto mb-6 flex justify-center">
          <a href="https://sell.woohl.com/?utm_source=coming_soon&utm_medium=badge&utm_campaign=seller_onboarding" target="_blank" rel="noopener noreferrer" aria-label="Redirect to seller onboarding page">
            <div className="inline-flex cursor-pointer items-center rounded-full border border-rose-500 bg-rose-500/10 px-3 py-1 text-sm backdrop-blur-sm transition hover:bg-rose-500/20 hover:shadow-md">
              <span className="mr-2 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">Sell on Woohl</span>
              <span className="text-rose-300">Reach buyers across India</span>
              <ChevronRight className="ml-1 h-4 w-4 text-rose-300" />
            </div>
          </a>
        </motion.div>

        {/* Heading */}
        <h1 className="relative z-10 text-5xl md:text-6xl lg:text-9xl font-extrabold bg-gradient-to-r from-rose-500 via-orange-400 to-rose-400 text-transparent bg-clip-text mb-6 text-center drop-shadow-md">Coming Soon</h1>

        <p className="text-rose-500 w-fit text-center text-sm uppercase tracking-wide mb-2">
          <Highlight className="text-rose-500 p-1.5 w-fit text-center text-sm uppercase font-medium tracking-wide">Early access = early surprises</Highlight>
        </p>

        {/* Subheading */}
        <p className="text-gray-300 max-w-xl mx-auto mb-8 text-center text-lg">Get early access to the next-gen e-commerce platform, and enjoy exclusive launch perks made just for you.</p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full items-center justify-center gap-4">
          {!isSubmitted && (
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={isSubmitted || isLoading}
              placeholder="Enter your best email"
              aria-label="Email address"
              className="relative z-10 bg-white/10 text-white px-4 py-2 rounded-md w-full md:w-96 outline-none placeholder-gray-400 disabled:bg-gray-700 disabled:cursor-not-allowed transition duration-300 shadow-md hover:shadow-lg focus:shadow-rose-500/40 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
            />
          )}
          <button
            type="submit"
            disabled={isSubmitted || isLoading}
            aria-label="Submit your email to be notified"
            className={cn(
              "relative z-10 bg-rose-500 hover:bg-rose-600 w-full cursor-pointer hover:shadow-rose-500/50 shadow-lg text-white transition-transform hover:scale-105 active:scale-95 px-4 py-2 rounded-md font-semibold duration-300 disabled:bg-rose-500 disabled:cursor-not-allowed",
              isSubmitted ? "lg:w-60 bg-rose-600 hover:bg-rose-700" : "lg:w-40 bg-rose-500 hover:bg-rose-600",
            )}>
            {/* {isSubmitted ? "You're on the list! 🎉" : "Notify Me"} */}
            {isLoading ? (
              <span className="flex justify-center items-center gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-300">.</span>
              </span>
            ) : isSubmitted ? (
              "You're on the list! 🎉"
            ) : (
              "Notify Me"
            )}
          </button>
        </form>

        {/* Success message */}
        {isSubmitted && (
          <p className="text-rose-400 text-center text-md font-medium mt-2 relative z-10 animate-pulse" aria-live="polite">
            🎉 Thanks! You&apos;re in for something amazing.
          </p>
        )}
      </div>

      <BackgroundBeams />
    </div>
  );
}
