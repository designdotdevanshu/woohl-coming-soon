"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Loader2, Store, User, Mail, Globe, Instagram, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitFormAction } from "@/actions/form";
import { TocCheckbox } from "@/components/toc-checkbox";

// Zod validation schema
const formSchema = z
  .object({
    businessName: z.string().min(2, { message: "Business name is required" }),
    personName: z.string().min(2, { message: "Your name is required" }),
    designation: z.enum(["Founder/Co-founder", "CXO", "Sales Head", "Marketing Head", "Operations Manager", "Other"], { message: "Please select your designation" }),
    otherDesignation: z.string().optional(),
    phoneEmail: z.string().min(6, { message: "Enter phone or email" }),
    website: z
      .string()
      .optional()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "Please enter a valid URL",
      }),
    productCategories: z.string().min(2, { message: "Please enter a category" }),
    instagramHandle: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
  })
  .refine(
    (data) => {
      if (data.designation === "Other" && !data.otherDesignation?.trim()) {
        return false;
      }
      return true;
    },
    {
      message: "Please enter your designation",
      path: ["otherDesignation"],
    },
  );

type FormData = z.infer<typeof formSchema>;

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

const StyledButton = motion(Button);

export default function PreRegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      personName: "",
      designation: undefined,
      otherDesignation: "",
      phoneEmail: "",
      website: "",
      productCategories: "",
      instagramHandle: "",
      city: "",
      state: "",
    },
  });

  const DESIGNATIONS = ["Founder/Co-founder", "CXO", "Sales Head", "Marketing Head", "Operations Manager", "Other"];
  const designation = form.watch("designation");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", data);

    const res = await submitFormAction(data);
    if (!res.success) {
      console.error("Failed to submit form:", res.message);
      setIsSubmitting(false);
      return;
    }
    console.log("Form saved successfully:", res.message);
    // Reset form state
    setIsSubmitting(false);
    setIsSubmitted(true);
    form.reset();
  };

  const resetForm = () => {
    setIsSubmitted(false);
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
              className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
              {/* Header */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-8">
                {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-primary rounded-2xl mb-4">
                  <Store className="h-8 w-8 text-white" />
                </div> */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Join <span className="text-primary">Woohl</span> as a Seller
                </h1>
                <p className="text-gray-600 text-lg">Get early access to our platform</p>
              </motion.div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Business Information */}
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">Business Information</h2>

                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Business Name <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <IconInput placeholder="Your awesome business" icon={Store} {...field} />
                          </FormControl>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="productCategories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Product Categories <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Fashion, Electronics, Home Decor" className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-100 focus:ring-4 transition-all duration-200" {...field} />
                          </FormControl>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Personal Information */}
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">Personal Information</h2>

                    <FormField
                      control={form.control}
                      name="personName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Your Name <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <IconInput placeholder="John Doe" icon={User} {...field} />
                          </FormControl>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Designation <span className="text-primary">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-100 focus:ring-4 transition-all duration-200">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {DESIGNATIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />

                    <AnimatePresence>
                      {designation === "Other" && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                          <FormField
                            control={form.control}
                            name="otherDesignation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  Other Designation <span className="text-primary">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your designation" className="rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-100 focus:ring-4 transition-all duration-200" {...field} />
                                </FormControl>
                                <FormMessage className="text-primary font-medium" />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Contact Information */}
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">Contact Information</h2>

                    <FormField
                      control={form.control}
                      name="phoneEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Phone or Email <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <IconInput placeholder="your@email.com or +1234567890" icon={Mail} {...field} />
                          </FormControl>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Website</FormLabel>
                          <FormControl>
                            <IconInput placeholder="https://yourwebsite.com" icon={Globe} {...field} />
                          </FormControl>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="instagramHandle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Instagram Handle</FormLabel>
                          <FormControl>
                            <IconInput placeholder="@yourbusiness" icon={Instagram} {...field} />
                          </FormControl>
                          <FormMessage className="text-primary font-medium" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Location */}
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">Location</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">
                              City <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <IconInput placeholder="Mumbai" icon={MapPin} {...field} />
                            </FormControl>
                            <FormMessage className="text-primary font-medium" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">
                              State <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <IconInput placeholder="Maharashtra" icon={MapPin} {...field} />
                            </FormControl>
                            <FormMessage className="text-primary font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  <TocCheckbox />

                  {/* Submit Button */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="pt-6">
                    <StyledButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:primary/80 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        "Join the Waitlist"
                      )}
                    </StyledButton>
                  </motion.div>
                </form>
              </Form>
            </motion.div>
          ) : (
            // Success State
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-green-200 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6">
                <Check className="h-10 w-10 text-white" />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Woohl!</h2>
                <p className="text-gray-600 text-lg mb-8">Thanks for joining! We&apos;ll reach out to you soon with early access to our platform.</p>
                <Button onClick={resetForm} className="bg-primary hover:primary/80 text-white font-bold py-3 px-6 rounded-xl">
                  Submit Another Application
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
