"use client";

import Script from "next/script";

// calendly link
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

if (!CALENDLY_URL) {
  throw new Error("NEXT_PUBLIC_CALENDLY_URL is not defined in the environment variables.");
}

const CalendlyInline = () => (
  <section className="min-h-screen bg-white">
    {/* Calendly embed container */}
    <div data-url={CALENDLY_URL} className="calendly-inline-widget min-w-[20rem] h-[45rem] mt-15" />

    {/* Calendly script (loaded once the page is interactive) */}
    <Script src="https://assets.calendly.com/assets/external/widget.js" />
  </section>
);

export default CalendlyInline;
