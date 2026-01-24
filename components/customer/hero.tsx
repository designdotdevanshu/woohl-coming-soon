"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

export const CustomerHeroSection = () => {
  const [spotsLeft] = useState(96);
  const [isLoading] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between md:space-y-8 space-y-4 items-center lg:mx-auto lg:flex-row flex-col-reverse">
          <motion.div viewport={{ once: true }} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-4 lg:w-3/5 w-full">
            {/* Early Access Badge */}
            {spotsLeft > 0 && (
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-200 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                  <motion.div className="w-2 h-2 bg-primary rounded-full font-semibold" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                  {isLoading ? <Skeleton className="w-32 bg-primary/20 h-4" /> : <span>Only {spotsLeft} Spots Left</span>}
                </div>
              </motion.div>
            )}

            <div className="md:space-y-4 space-y-2">
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Join the <span className="text-primary">Future of Shopping</span>
              </h1>
              <p className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">Get early access & discover what&apos;s next</p>
            </div>

            <div className="md:space-y-2 space-y-1">
              <p className="text-lg text-gray-700">We&apos;re building a new way to discover & shop from India&apos;s next big brands</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/join" className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                Join Early Access <ArrowRightIcon size={20} color="#ffffff" />
              </Link>
            </div>

            <p className="text-sm text-gray-500">Free to join. No spam.</p>
          </motion.div>

          {/* Right Illustration */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} className="mt-12 lg:mt-0 lg:w-2/5">
            <div className="relative w-full">
              <Image src="/images/hero.svg" alt="Illustration of discovering Indian brands" width={1000} height={1000} priority className="w-full h-auto object-contain" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
