'use client';

import Image from "next/image";
import { useState } from "react";
import moon from "@/public/moon-pic.png";

export default function Home() {
  const [countdown] = useState({
    days: "01",
    hours: "01",
    minutes: "01",
    seconds: "01",
  });

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 font-[var(--font-montserrat-alt)]">
      {/* Navbar */}
      <nav className="flex justify-center">
        <div className="w-[1248px] h-[74px] bg-[#0a0c0d]/80 border border-[#333] rounded-full flex items-center justify-between px-8 backdrop-blur-lg">
          <div className="text-[#ff4b70] border border-[#ff4b70] px-4 py-1 rounded-full font-semibold text-sm bg-black">
            Woohl
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button className="text-white hover:text-[#ff4b70] transition">request a Demo</button>
            <button className="border border-[#ff4b70] px-4 py-1 rounded-full hover:bg-[#ff4b70] hover:text-black transition font-semibold">
              Sell on Woohl
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-16">
        {/* Moon Image */}
        <Image
          src={moon}
          alt="Moon"
          width={406}
          height={213}
          className="w-[406px] h-[213px] object-contain"
          priority
        />

        {/* Heading: One Line */}
        <h1 className="mt-10 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold max-w-5xl leading-tight tracking-tight">
          A new era for Indian startups begins with <span className="text-[#ff4b70]">Woohl</span>
        </h1>

        {/* Countdown */}
        <div className="flex gap-9 mt-10">
          {Object.values(countdown).map((val, i) => (
            <div key={i} className="flex gap-1">
              {val.split("").map((digit, index) => (
                <div
                  key={index}
                  className="bg-[#ff4b70] text-white w-8 h-12 flex items-center justify-center rounded-md text-lg font-bold"
                >
                  {digit}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Countdown Labels */}
        <div className="mt-2 text-xs tracking-widest text-gray-300 flex gap-10">
          <span>DAYS</span>
          <span>HOURS</span>
          <span>MINUTES</span>
          <span>SECONDS</span>
        </div>

        {/* Subheading */}
        <p className="mt-4 text-gray-400 text-sm">
          Launching soon — the easiest way to start selling online
        </p>

        {/* Email Input & CTA */}
        <div className="flex flex-col sm:flex-row mt-6 gap-3 items-center w-full max-w-md">
          <input
            type="email"
            placeholder="enter your email here...."
            className="bg-[#1a1a1a] text-white px-4 py-3 rounded-full focus:outline-none placeholder-gray-400 w-full sm:w-[60%]"
          />
          <button className="bg-[#ff4b70] hover:bg-pink-500 text-white px-6 py-3 rounded-full font-semibold transition w-full sm:w-auto whitespace-nowrap">
            Join the Waitlist
          </button>
        </div>
      </section>
    </main>
  );
}
