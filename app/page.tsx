"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import moon from "@/public/moon-pic.png";
import { Button } from "@/components/ui/stateful-button";
import { subscribeToEarlyAccess } from "@/actions/newsletter";

const DATE = "2025-10-27T17:00:00+05:30"; // Target date for countdown (5 pm IST, 1st Sep 2025)

interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function Home() {
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
        const response = await subscribeToEarlyAccess({ email: email.trim().toLowerCase() });
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

  const [countdown, setCountdown] = useState<CountdownState>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [prevCountdown, setPrevCountdown] = useState<CountdownState>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Target date: August 1, 2025
  const targetDate = new Date(DATE).getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const newCountdown = {
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        };

        setCountdown((prevCount) => {
          setPrevCountdown(prevCount);
          return newCountdown;
        });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    return () => clearInterval(interval);
  }, [targetDate]);

  const FlipCard = ({ current, previous, label }: { current: string; previous: string; label: string }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="flex gap-1">
          {current.split("").map((digit, digitIndex) => {
            const prevDigit = previous.split("")[digitIndex] || "0";
            const hasChanged = digit !== prevDigit;

            return (
              <div key={digitIndex} className="relative w-8 h-12 sm:w-14 sm:h-18 rounded-3xl overflow-hidden shadow-lg" style={{ perspective: "1000px" }}>
                {/* Static background card - shows when no animation */}
                {!hasChanged && <div className="absolute inset-0 bg-[#1a1a1a] border border-[#333] rounded-3xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl">{digit}</div>}

                {/* Animated flip when digit changes */}
                <AnimatePresence>
                  {hasChanged && (
                    <>
                      {/* Previous digit card - flips out */}
                      <motion.div
                        key={`prev-${prevDigit}-${digitIndex}-${Date.now()}`}
                        className="absolute inset-0 bg-[#1a1a1a] border border-[#333] rounded-3xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl"
                        style={{
                          transformOrigin: "center",
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                        }}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: -180 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}>
                        {prevDigit}
                      </motion.div>

                      {/* New digit card - flips in */}
                      <motion.div
                        key={`new-${digit}-${digitIndex}-${Date.now()}`}
                        className="absolute inset-0 bg-primary border border-[#333] rounded-3xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl"
                        style={{
                          transformOrigin: "center",
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                        }}
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}>
                        {digit}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <span className="mt-3 text-xs tracking-widest text-gray-300 uppercase">{label}</span>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#010609] text-white px-2 py-6 lg:px-4 lg:py-12">
      {/* Navbar */}
      <nav className="flex justify-center">
        <div className="w-full max-w-7xl h-12 md:h-20 bg-[#0a0c0d]/80 border border-[#333] rounded-full flex items-center justify-between px-2 md:px-4 backdrop-blur-lg">
          <h1 className="text-primary text-xl md:text-4xl font-audiowide md:ml-4">Woohl</h1>
          <div className="md:flex hidden items-center space-x-12 text-xs md:text-lg font-medium">
            <a href="https://sell.woohl.com/schedule?utm_source=coming_soon&utm_medium=badge&utm_campaign=seller_onboarding" target="_blank" rel="noopener noreferrer" aria-label="Redirect to seller onboarding page">
              <button className="text-white hover:text-primary transition text-medium duration-300">Request a Demo</button>
            </a>
            <a href="https://sell.woohl.com/?utm_source=coming_soon&utm_medium=badge&utm_campaign=seller_onboarding" target="_blank" rel="noopener noreferrer" aria-label="Redirect to seller onboarding page">
              <button className="border border-primary px-8 py-3 rounded-full hover:bg-primary hover:text-black transition font-medium duration-300">Sell on Woohl</button>
            </a>
          </div>

          <a
            href="https://sell.woohl.com/schedule?utm_source=coming_soon&utm_medium=badge&utm_campaign=seller_onboarding"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Redirect to seller onboarding page"
            className="flex items-center justify-center md:hidden">
            <button className="text-xs text-white hover:text-primary transition font-semibold duration-300">Request a Demo</button>
          </a>
          <a
            href="https://sell.woohl.com/?utm_source=coming_soon&utm_medium=badge&utm_campaign=seller_onboarding"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Redirect to seller onboarding page"
            className="flex items-center justify-center md:hidden">
            <button className="text-xs border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-black transition font-semibold duration-300">Sell on Woohl</button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center -mt-10 lg:mt-2">
        {/* Moon Image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Image src={moon} alt="Moon" width={641} height={336} className="w-[641px] h-[336px] object-contain" priority />
        </motion.div>

        {/* Heading: One Line */}
        <motion.h1
          className="-mt-10 lg:mt-2 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold max-w-5xl leading-normal tracking-wider text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}>
          A new era for Indian startups begins with <span className="text-primary font-audiowide">Woohl</span>
        </motion.h1>

        {/* Countdown with Flip Animation */}
        <motion.div className="mt-4 flex gap-4 sm:gap-9 lg:mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
          <FlipCard current={countdown.days} previous={prevCountdown.days} label="DAYS" />
          <FlipCard current={countdown.hours} previous={prevCountdown.hours} label="HOURS" />
          <FlipCard current={countdown.minutes} previous={prevCountdown.minutes} label="MINUTES" />
          <FlipCard current={countdown.seconds} previous={prevCountdown.seconds} label="SECONDS" />
        </motion.div>

        {/* Subheading */}
        <motion.p className="mt-6 lg:mt-8 text-gray-50 text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}>
          Launching soon
        </motion.p>

        {/* Email Input & CTA */}
        <motion.div className="flex flex-col sm:flex-row mt-6 gap-3 items-center w-full max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-center w-full">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email here...."
              className="bg-[#1a1a1a] text-white px-4 py-3 rounded-full focus:outline-none placeholder-gray-400 w-full sm:w-[80%] border border-[#333] focus:border-primary transition"
              required
              disabled={isLoading || isSubmitted}
            />
            <Button type="submit" disabled={isLoading || isSubmitted || !email.trim()} isLoading={isLoading} className="h-14 w-full lg:w-60">
              {isLoading ? "Joining..." : isSubmitted ? "Welcome aboard!" : "Join the Waitlist"}
            </Button>
          </form>
        </motion.div>

        {/* Success Message */}
        {isSubmitted && (
          <motion.p className="mt-4 text-green-400 text-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            You&apos;re on the list! We&apos;ll notify you when we launch.
          </motion.p>
        )}
      </section>
    </main>
  );
}
