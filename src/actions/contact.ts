"use server";

import { z } from "zod";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { NotificationEmail } from "@/components/emails/NotificationEmail";
import { ConfirmationEmail } from "@/components/emails/ConfirmationEmail";

const contactInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name is too long."),
  email: z.string().email("Please enter a valid email address.").max(255, "Email is too long."),
  subject: z.string().min(3, "Subject must be at least 3 characters.").max(200, "Subject is too long."),
  message: z.string().min(10, "Message must be at least 10 characters long.").max(5000, "Message is too long."),
  honeypot: z.string().optional(), // Honeypot field for bot prevention
});

export type SendContactInput = z.infer<typeof contactInputSchema>;

// Simple in-memory rate limiter for contact submissions (max 5 requests per 2 minutes)
const submissionTimestamps = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 2 * 60 * 1000; // 2 minutes
  const maxRequests = 5;

  const userTimestamps = submissionTimestamps.get(identifier) || [];
  const recent = userTimestamps.filter((ts) => now - ts < windowMs);

  if (recent.length >= maxRequests) {
    return false;
  }

  recent.push(now);
  submissionTimestamps.set(identifier, recent);
  return true;
}

export async function sendContactMessage(input: SendContactInput) {
  // 1. Honeypot check (silently drop bot submissions)
  if (input.honeypot && input.honeypot.trim() !== "") {
    return { success: true, messageId: "bot-suppressed" };
  }

  // 2. Validate payload server-side
  const validation = contactInputSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid input data.",
    };
  }

  const { name, email, subject, message } = validation.data;

  // 3. Rate limiting check
  const rateLimitKey = email.toLowerCase();
  if (!checkRateLimit(rateLimitKey)) {
    return {
      success: false,
      error: "Too many contact requests. Please wait a couple of minutes before trying again.",
    };
  }

  try {
    // 4. Persist message to PostgreSQL database
    const savedMessage = await db.message.create({
      data: {
        name,
        email,
        subject,
        message,
        read: false,
        archived: false,
      },
    });

    // 5. Dispatch emails via Resend if API key is configured
    if (env.RESEND_API_KEY && env.RESEND_API_KEY !== "re_dev_placeholder") {
      const resend = new Resend(env.RESEND_API_KEY);

      // Notification email to Abel
      await resend.emails.send({
        from: env.RESEND_FROM_EMAIL || "portfolio@abeltensay.com",
        to: env.CONTACT_EMAIL || "abeltensay2@gmail.com",
        subject: `New Portfolio Inquiry: ${subject}`,
        react: NotificationEmail({ name, email, subject, message }),
      });

      // Confirmation email to visitor
      await resend.emails.send({
        from: env.RESEND_FROM_EMAIL || "portfolio@abeltensay.com",
        to: email,
        subject: `Message Received - Abel Tensay Portfolio`,
        react: ConfirmationEmail({ name, subject }),
      });
    }

    return {
      success: true,
      messageId: savedMessage.id,
    };
  } catch (err) {
    console.error("Error processing contact message:", err);
    return {
      success: false,
      error: "Failed to process message submission. Please try again later.",
    };
  }
}
