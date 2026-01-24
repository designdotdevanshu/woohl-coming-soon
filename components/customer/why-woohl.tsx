"use client";

import { motion } from "motion/react";
import { SparkleIcon, TagIcon, MagnifyingGlassIcon, StorefrontIcon } from "@phosphor-icons/react";

export const WhyWoohlSection = () => {
  const features = [
    {
      icon: SparkleIcon,
      title: "Early Access Advantage",
      description: "Get first dibs on the latest products from curated brands before public launch",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: TagIcon,
      title: "Exclusive drops and discounts",
      description: "Get early member pricing and access to limited releases.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: MagnifyingGlassIcon,
      title: "Curated discovery",
      description: "Skip endless scrolling with handpicked brand collections.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: StorefrontIcon,
      title: "Shop directly from brands",
      description: "Discover homegrown brands and shop authentic products.",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <section id="why-woohl" className="py-12 md:py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-6">
            Why <span className="text-primary font-audiowide">Woohl</span> for Shoppers?
          </h2>
          <p className="text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed tracking-wide">
            A better way to discover and shop from India&apos;s most exciting Startups.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              viewport={{ once: true }}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center flex-col transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                className={`w-16 md:w-24 h-16 md:h-24 ${feature.color} rounded-full flex items-center justify-center mb-3 md:mb-6 flex-shrink-0`}
              >
                <feature.icon size={28} weight="duotone" className="md:w-10 md:h-10" />
              </div>

              <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-2 md:mb-4 text-center leading-tight">
                {feature.title}
              </h3>
              <p className="text-xs md:text-base text-gray-600 leading-relaxed text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
