"use client";

import { motion } from "motion/react";
import { InstagramLogoIcon, SparkleIcon, SquaresFourIcon, TagIcon } from "@phosphor-icons/react";

export const JoinIfYouAreSection = () => {
  const personas = [
    {
      title: "A conscious shopper",
      description: "You care about quality, originiality, and homegrown products",
      icon: InstagramLogoIcon,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "A discovery lover",
      description: "You enjoy finding unique products before they go mainstream.",
      icon: SparkleIcon,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "A social commerce user",
      description: "You enjoy shop via Instagram, WhatsApp, or recommendations.",
      icon: SquaresFourIcon,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "A deal seeker",
      description: "You want early access, launch offers, and limited-time drops.",
      icon: TagIcon,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div viewport={{ once: true }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join if...</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((persona, index) => (
            <motion.div
              viewport={{ once: true }}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 transition-all flex flex-col md:flex-row md:space-x-4 transform hover:-translate-y-1">
              <div className={`w-16 h-16 ${persona.color} rounded-full flex items-center justify-center mb-4 md:mb-0 shrink-0`}>
                <persona.icon size={32} weight="duotone" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{persona.title}</h3>
                <p className="text-gray-600 text-base">{persona.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
