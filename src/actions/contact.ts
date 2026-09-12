"use server";

import { z } from "zod";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { NotificationEmail } from "@/components/emails/NotificationEmail";
import { ConfirmationEmail } from "@/components/emails/ConfirmationEmail";

const contactInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type SendContactInput = z.infer<typeof contactInputSchema>;

export async function sendContactMessage(input: SendContactInput) {
  // 1. Validate payload server-side
  const validation = contactInputSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid input data.",
    };
  }

  const { name, email, subject, message } = validation.data;

  try {
    // 2. Persist message to PostgreSQL database
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

    // 3. Dispatch emails via Resend if API key is configured
    if (env.RESEND_API_KEY && env.RESEND_API_KEY !== "re_dev_placeholder") {
      const resend = new Resend(env.RESEND_API_KEY);

      // Notification email to Abel
      await resend.emails.send({
        from: env.RESEND_FROM_EMAIL || "portfolio@abeltensay.com",
        to: env.CONTACT_EMAIL || "abeltensay@example.com",
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
