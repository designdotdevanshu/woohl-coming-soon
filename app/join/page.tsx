"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Loader2, User, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { submitCustomerWaitlistAction } from "@/actions/customer";

// Zod validation schema
const formSchema = z.object({
  name: z.string({ message: "Name must be a string" }).min(1, { message: "Name is required" }).max(100, { message: "Name is too long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  city: z.string({ message: "City must be a string" }).max(100, { message: "City name is too long" }),
  interests: z.array(z.string()),
});

type FormData = z.infer<typeof formSchema>;

// Interest options
const INTEREST_OPTIONS = [
  { id: "fashion-apparel", label: "Fashion & Apparel" },
  { id: "beauty", label: "Beauty & Personal Care" },
  { id: "home-lifestyle", label: "Home & Lifestyle" },
  { id: "electronics", label: "Electronics" },
  { id: "jewellery", label: "Jewellery & Accessories" },
  { id: "fmcg", label: "Food & Beverages" },
  { id: "handmade", label: "Handmade & Artisan Products" },
];

// Custom styled components
type IconInputProps = React.ComponentProps<typeof Input> & {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
};

const IconInput: React.FC<IconInputProps> = ({ icon: Icon, className = "", ...props }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />}
    <Input className={`${Icon ? "pl-10" : ""} rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-100 focus:ring-4 transition-all duration-200 ${className}`} {...props} />
  </div>
);

const StyledButton = motion.create(Button);

export default function CustomerJoinPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      interests: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitCustomerWaitlistAction({
      name: data.name || undefined,
      email: data.email,
      city: data.city || undefined,
      interests: data.interests,
    });

    if (!res.success) {
      setErrorMessage(res.message);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    form.reset();
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    form.reset();
  };

  return (
    <div className="py-30 min-h-screen bg-[#fdf7f9] px-2 md:px-6">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-xl p-4 py-8 border border-orange-100 md:px-8 md:py-16">
              {/* Header */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Join <span className="text-primary">Woohl</span> Early Access
                </h1>
                <p className="text-gray-600 text-lg">Be first to discover emerging Indian brands</p>
              </motion.div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Information */}
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">Your Information</h2>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 gap-0">
                            Name<span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <IconInput required placeholder="Your name" icon={User} {...field} />
                          </FormControl>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 gap-0">
                            Email<span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <IconInput placeholder="you@example.com" type="email" icon={Mail} {...field} />
                          </FormControl>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 gap-0">
                            City<span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <IconInput required placeholder="e.g., Mumbai, Delhi" icon={MapPin} {...field} />
                          </FormControl>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Interests */}
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">What interests you?</h2>

                    <FormField
                      control={form.control}
                      name="interests"
                      render={() => (
                        <FormItem>
                          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                            {INTEREST_OPTIONS.map((interest) => (
                              <FormField
                                key={interest.id}
                                control={form.control}
                                name="interests"
                                render={({ field }) => {
                                  return (
                                    <FormItem key={interest.id} className="flex flex-row items-center sm:space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(interest.id)}
                                          onCheckedChange={(checked) => {
                                            return checked ? field.onChange([...field.value, interest.id]) : field.onChange(field.value?.filter((value) => value !== interest.id));
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">{interest.label}</FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Error Message */}
                  {errorMessage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {errorMessage}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <StyledButton
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center justify-center space-x-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Joining...</span>
                        </span>
                      ) : (
                        "Join Early Access"
                      )}
                    </StyledButton>
                  </motion.div>

                  {/* Privacy Note */}
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center text-sm text-gray-500">
                    We respect your privacy. No spam, ever.
                  </motion.p>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-3xl font-bold text-gray-900 mb-4">
                You&apos;re on the list
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-gray-600 text-lg mb-8">
                We&apos;ll email you when early access opens. Thank you for your interest in Woohl.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button onClick={resetForm} variant="outline" className="rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-all duration-200">
                  Join with another email
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
