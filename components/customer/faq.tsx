"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={cn(
        "group rounded-lg border border-border/60",
        "transition-all duration-200 ease-in-out",
        isOpen ? "bg-card/30 shadow-sm" : "hover:bg-card/50"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 hover:bg-accent transition-colors duration-200"
      >
        <h3
          className={cn(
            "text-left text-base font-medium transition-colors duration-200",
            "text-foreground/80",
            isOpen && "text-foreground"
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "shrink-0 rounded-full p-0.5",
            "transition-colors duration-200",
            isOpen ? "text-primary" : "text-muted-foreground"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.1,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
          >
            <div className="border-t border-border/40 px-6 pb-4 pt-2">
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function CustomerFAQSection() {
  const faqs: Omit<FAQItemProps, "index">[] = [
    {
      question: "Is joining the waitlist free?",
      answer:
        "Yes, joining the waitlist is completely free. There are no charges or commitments required.",
    },
    {
      question: "When will I get access?",
      answer:
        "We're launching in phases. Early registered users will get priority.",
    },
    {
      question: "What do early members get?",
      answer:
        "Early members get priority access to the platform, exclusive launch benefits, and limited drops.",
    },
    {
      question: "Is Woohl a marketplace or a brand?",
      answer:
        "Woohl is a marketplace that will feature multiple emerging Indian brands across various categories like fashion, beauty, home, lifestyle, etc.",
    },
    {
      question: "Will you share my email with brands?",
      answer:
        "No. Your email is only used to notify you about your waitlist status and platform updates. We do not share your information with third parties.",
    },
  ];

  const MAIL_FORMAT = {
    to: "tanishk@woohl.com",
    subject: "Customer Inquiry - Woohl",
    body: `Hi Woohl Team,

I have a question about Woohl early access. Please find my query below:

Question:

Looking forward to your response.

Best regards,
[Your Name]`,
  };

  const MAIL_CONTENT = `mailto:${MAIL_FORMAT.to}?subject=${encodeURIComponent(MAIL_FORMAT.subject)}&body=${encodeURIComponent(MAIL_FORMAT.body)}`;

  return (
    <section id="faq" className="relative w-full overflow-hidden bg-background py-16">
      {/* Decorative elements */}
      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="container max-w-7xl relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary px-3 py-1 text-xs font-medium uppercase tracking-wider"
          >
            FAQs
          </Badge>

          <h2 className="mb-3 bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-3xl font-bold text-transparent">
            Frequently Asked Questions
          </h2>

          <p className="text-muted-foreground">
            Everything you need to know about joining the Woohl waitlist
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-12 max-w-md text-center"
        >
          <p className="mb-4 text-sm text-muted-foreground">Still have questions?</p>
          <a href={MAIL_CONTENT}>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full border-primary/20 transition-all duration-300 hover:border-primary hover:bg-primary/5"
            >
              <Mail className="h-4 w-4" />
              <span>Contact us</span>
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
