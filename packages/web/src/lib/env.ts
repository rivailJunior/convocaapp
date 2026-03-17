import { z } from 'zod';

const envSchema = z.object({
  // Firebase Admin
  FIREBASE_ADMIN_SDK_JSON: z.string().min(1),

  // Asaas
  ASAAS_API_KEY: z.string().min(1),
  ASAAS_BASE_URL: z.string().url(),
  ASAAS_WEBHOOK_SECRET: z.string().min(1),

  // AWS
  AWS_REGION: z.string().default('sa-east-1'),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  S3_BUCKET_NAME: z.string().min(1),

  // Cron
  CRON_SECRET: z.string().min(16),

  // Public
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_GOOGLE_MAPS_KEY: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const formatted = parsed.error.flatten().fieldErrors;
    const missing = Object.keys(formatted).join(', ');
    throw new Error(`Missing or invalid environment variables: ${missing}`);
  }

  return parsed.data;
}

export const env = validateEnv();
