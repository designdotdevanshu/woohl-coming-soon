"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitCustomerWaitlistAction } from "@/actions/customer";

export const CustomerFinalCTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const res = await submitCustomerWaitlistAction({ email, interests: [] });

    if (res.success) {
      setEmail("");
      setMessage({ type: "success", text: "You're on the list. We'll be in touch." });
    } else {
      setMessage({ type: "error", text: res.message });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="relative bg-[#fff9f5] text-tertiary-foreground z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-2xl">
      <div className="glass-effect mb-16 rounded-2xl py-8 md:p-12 md:py-12">
        <div>
          <h3 className="my-4 text-3xl font-bold md:text-5xl text-center">
            Get early access to <span className="font-audiowide">Woohl</span>
          </h3>
          <p className="mb-6 text-tertiary-foreground text-center">Join India&apos;s next shopping movement.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row justify-center">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className="h-12 w-full lg:w-[40rem] bg-white text-base font-medium" />
            <Button type="submit" size="lg" disabled={isSubmitting} className="bg-primary h-12 w-full lg:w-48 text-base font-medium hover:bg-primary/80 transition-colors">
              {isSubmitting ? "Joining..." : "Join Early Access"}
            </Button>
          </form>
          {message && <p className={`mt-4 text-center text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>{message.text}</p>}
          <p className="mt-4 text-center text-sm text-gray-500">Free to join. We respect your privacy.</p>
        </div>
      </div>
    </div>
  );
};
