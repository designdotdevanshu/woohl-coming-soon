"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { EnvelopeSimpleIcon, UserCheckIcon, ShoppingBagIcon } from "@phosphor-icons/react";

type Step = {
  title: string;
  description: string;
  icon: typeof EnvelopeSimpleIcon;
  color: string;
};

const steps: Step[] = [
  {
    title: "Join the waitlist",
    description: "Submit your email and preferences. It takes less than a minute.",
    icon: EnvelopeSimpleIcon,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Get invited",
    description: "Early users get access first when we launch.",
    icon: UserCheckIcon,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Shop & Discover",
    description: "Access exclusive drops and offers and shop directly from founders",
    icon: ShoppingBagIcon,
    color: "bg-purple-100 text-purple-600",
  },
];

export function CustomerHowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section id="how-it-works" ref={ref} className="py-12 sm:py-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl font-bold text-center mb-4"
        >
          How it works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-gray-600 text-center mb-10 sm:mb-16 max-w-2xl mx-auto"
        >
          Three simple steps to get early access
        </motion.p>

        {/* Step Items */}
        <div className="flex mt-8 sm:mt-10 flex-col items-center sm:flex-row sm:justify-between gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{ visible: { opacity: 1, y: 0 } }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex-1 flex flex-col w-full max-w-[18rem] sm:max-w-80 items-center text-center"
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 ${step.color} rounded-full flex items-center justify-center mb-4 sm:mb-6`}
              >
                <step.icon size={32} weight="duotone" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-primary mb-2">Step {index + 1}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
