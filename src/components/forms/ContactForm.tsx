"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    try {
      // Simulate client side submission validation stub until Phase 10 Resend integration
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Contact form submitted:", data);
      setIsSuccess(true);
      reset();
    } catch {
      setServerError("Failed to send message. Please try sending directly to contact@abeltensay.com.");
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-4 shadow-xl">
        <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-neutral-100">Message Sent Successfully!</h3>
        <p className="text-sm text-neutral-300 max-w-md mx-auto">
          Thank you for reaching out. A confirmation email has been logged, and Abel Tensay will reply shortly.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium">
          Your Name <span className="text-blue-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Jane Doe"
          {...register("name")}
          className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        {errors.name && (
          <p className="text-xs text-red-400 font-mono mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium">
          Your Email Address <span className="text-blue-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="jane@company.com"
          {...register("email")}
          className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        {errors.email && (
          <p className="text-xs text-red-400 font-mono mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium">
          Subject <span className="text-blue-400">*</span>
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Project Inquiry / Engineering Role"
          {...register("subject")}
          className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        {errors.subject && (
          <p className="text-xs text-red-400 font-mono mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium">
          Your Message <span className="text-blue-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project, software goals, or potential role..."
          {...register("message")}
          className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
        />
        {errors.message && (
          <p className="text-xs text-red-400 font-mono mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full"
        rightIcon={<Send className="h-4 w-4" />}
      >
        Send Message
      </Button>
    </form>
  );
}
