"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Mail, LinkedinIcon, TwitterIcon } from "lucide-react";
import { XLogoIcon } from "@phosphor-icons/react";
import teamMembers from "@/lib/data/team.json";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  className?: string;
  member: {
    id: string;
    name: string;
    background?: string;
    role: string;
    avatar?: string;
    colorClass: string;
    social?: {
      email?: string;
      linkedin?: string;
      twitter?: string;
      x?: string;
    };
  };
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "", ...props }) => (
  <section {...props} className={cn("py-8 lg:py-16", className)}>
    <div className="max-w-7xl mx-auto px-6">{children}</div>
  </section>
);

const AboutPage: React.FC = () => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore((prev) => !prev);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const TeamCard: React.FC<TeamCardProps> = ({ member, className }) => {
    return (
      <motion.div className={cn("bg-white rounded-2xl shadow-lg overflow-hidden", className)} variants={itemVariants} initial="rest" whileHover="hover" animate="rest">
        <motion.div variants={cardHoverVariants}>
          {!!member?.avatar && (
            <div className={`h-48 bg-gradient-to-br ${member.colorClass} flex items-center justify-center text-6xl relative overflow-hidden`}>
              <Image src={member.avatar} alt={member.name} width={800} height={450} className="relative z-10 filter drop-shadow-lg" />
            </div>
          )}
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-slate-800">{member.name}</h3>
            <p className="text-slate-600 text-sm font-medium">{member.role}</p>
            {/* <p className="text-slate-500 text-xs italic mt-1 mb-4 h-4">{member.background}</p> */}

            {member?.social && (
              <div className="mt-6 flex justify-center gap-3">
                {member.social?.email && (
                  <motion.a
                    href={`mailto:${member.social.email}`}
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <Mail className="w-4 h-4" />
                  </motion.a>
                )}
                {member.social?.linkedin && (
                  <motion.a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <LinkedinIcon className="w-4 h-4" />
                  </motion.a>
                )}
                {member.social?.twitter && (
                  <motion.a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <TwitterIcon className="w-4 h-4" />
                  </motion.a>
                )}
                {member.social?.x && (
                  <motion.a
                    href={member.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <XLogoIcon className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* Header */}
      <motion.header className="relative overflow-hidden rounded-b-[600%] bg-[#fdf7f9] text-tertiary-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="relative max-w-7xl mx-auto px-6 lg:py-24 lg:pb-32 p-6 text-center">
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-4" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            About <span className="font-audiowide">Woohl</span>
          </motion.h1>
          <motion.p className="text-lg md:text-xl opacity-90" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Building the future of social commerce for Indian brands
          </motion.p>
        </div>

        {/* Trapezium/Slanted bottom effect */}
        {/* <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" className="w-full h-16 md:h-20 lg:h-24 fill-slate-50" preserveAspectRatio="none">
            <path d="M0,120 L0,20 L1200,80 L1200,120 Z" />
          </svg>
        </div> */}
      </motion.header>

      {/* Our Story Section */}
      <Section>
        <motion.div className="" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          {/* <motion.div
            className="relative h-96 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 rounded-3xl flex items-center justify-center text-8xl shadow-2xl"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 2 }}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}>
            <Image src="/images/dashboard.png" alt="Woohl Logo" width={300} height={300} className="w-full rounded-3xl h-full shadow-lg" />
          </motion.div> */}

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-center lg:text-left font-bold text-slate-800">Our Story</h2>
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-slate-800 text-medium">
              Woohl was born from a simple but powerful idea: make buying Indian feel global, personal, and exciting. We&apos;ve seen the struggles like founders juggling 10 things, products getting buried under sponsored listings, brands
              forced to dance to the tune of impersonal algorithms and many more...{" "}
              {isReadMore &&
                "That's why Woohl is different. We are building a social commerce platform that puts storytelling, design, and real brand visibility at the heart of the experience. For creators, founders, and makers who are building something honest, the platform you've always deserved."}
              <span className="text-primary cursor-pointer" onClick={toggleReadMore}>
                {isReadMore ? " Show Less" : " Read More"}
              </span>
            </p>
          </motion.div>
        </motion.div>
      </Section>

      {/* Leadership Section */}
      <Section id="our-team" className="bg-white/50">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-slate-800" variants={itemVariants}>
            Our Team
          </motion.h2>
          <p className="text-lg md:text-xl text-center leading-relaxed mb-16 text-slate-800 text-medium">We&apos;re a team of builders, creators & believers working to give Indian brands the they deserve.</p>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
          <div className="gap-8">
            {/* Custom grid for team members: 2 in first row (centered), 4 in second, 1 in third */}
            <div className="w-full flex flex-col gap-8">
              {/* First row: 2 centered */}
              <div className="flex flex-col lg:flex-row justify-center gap-8">
                {teamMembers.slice(0, 2).map((member) => (
                  <TeamCard key={member.id} member={member} className="w-full max-w-sm" />
                ))}
              </div>
              {/* Second row: 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.slice(2, 6).map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Mission & Vision Section */}
      <Section className="bg-[#fdf7f9]">
        <motion.div id="our-mission" className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.div className="p-8 relative overflow-hidden" variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.3 } }}>
            <h3 className="text-4xl font-bold mb-6 text-center text-slate-800 relative z-10">Our Mission</h3>
            <p className="text-2xl leading-relaxed text-center text-slate-600 relative z-10">To empower Indian brands to grow, be discovered, and sell on their own terms.</p>
          </motion.div>

          <motion.div id="our-vision" className="p-8 relative overflow-hidden" variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.3 } }}>
            <h3 className="text-4xl font-bold mb-6 text-center text-slate-800 relative z-10">Our Vision</h3>
            <p className="text-2xl leading-relaxed text-center text-slate-600 relative z-10">To make shopping fun and buying Indian feel global, cool, and personal.</p>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
};

export default AboutPage;
