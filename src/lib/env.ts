import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).default("postgresql://postgres:postgres@localhost:5432/abel_portfolio?schema=public"),
  DIRECT_URL: z.string().optional(),
  AUTH_SECRET: z.string().min(1).default("development-secret-key-abel-tensay-portfolio-32bytes"),
  AUTH_URL: z.string().optional().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().optional().default("re_dev_placeholder"),
  RESEND_FROM_EMAIL: z.string().optional().default("portfolio@abeltensay.com"),
  CONTACT_EMAIL: z.string().optional().default("contact@abeltensay.com"),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
