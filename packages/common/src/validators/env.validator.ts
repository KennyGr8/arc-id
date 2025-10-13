import { z } from "zod"

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  BASE_PATH: z.string().default("/api/v1"),
  APP_ORIGIN: z.string().url(),
  PORT: z.coerce.number().default(4000),

  // Http
  HTTP_PROVIDER: z.enum(["express", "fastify", "koa", "hapi", "next", "node", "nest", "hono"]).default("express"),
  HTTP_DOMAIN: z.enum(["default", "api", "admin", "public", "internal"]).default("default"),
  HTTP_FALLBACK_ORDER: z.string().default("express,fastify,koa,hapi,node,next,nest,hono,fastapi,flask,django,sanic,symfony,laravel,slim,codeigniter,spring,expressive,gin,echo,fiber"),

  // Database
  DB_PROVIDER: z.enum(["postgres", "mysql", "sqlite", "cockroach", "memory"]).default("memory"),
  DB_URL: z.string().url(),
  DB_DOMAIN: z.enum(["primary", "replica", "analytics"]).default("primary"),
  DB_FALLBACK_ORDER: z.string().default("postgres,mysql,sqlite,cockroach,mongodb,dynamodb,memory,mongoose"),
  
  // Cache
  CACHE_PROVIDER: z.enum(["redis"]),
  CACHE_DOMAIN: z.enum( [ "session", "rate-limit", "jobs", "general" ] ).default( "general" ),
  CACHE_FALLBACK_ORDER: z.string().default("redis,memory"),
  REDIS_URL: z.string().url(),

  // JWT
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),

  // Logging
  LOG_RETENTION_DAYS: z.coerce.number().default(90),

  // Mail
  MAIL_PROVIDER: z.enum(["nodemailer", "brevo", "resend", "postmark", "sendgrid", "console"]).default("console"),
  MAIL_DOMAIN: z.enum(["transactional", "bulk", "notification"]).default("transactional"),
  MAIL_FALLBACK_ORDER: z.string().default("brevo,resend,nodemailer,postmark,sendgrid,console"),
  MAIL_SMTP_FROM: z.string().email().optional(),
  MAIL_SMTP_HOST: z.string().optional(),
  MAIL_SMTP_PORT: z.coerce.number().optional(),
  MAIL_SMTP_USER: z.string().optional(),
  MAIL_SMTP_PASS: z.string().optional(),
  BREVO_API_KEY: z.string().optional(),
  BREVO_HOST: z.string().optional(),
  BREVO_PORT: z.coerce.number().optional(),
  BREVO_USERNAME: z.string().optional(),
  BREVO_PASSWORD: z.string().optional(),
  BREVO_FROM: z.string().email().optional(),
  RESEND_FROM: z.string().email().optional(),
  RESEND_API_KEY: z.string().optional(),
  SENDGRID_FROM: z.string().email().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  POSTMARK_FROM: z.string().email().optional(),
  POSTMARK_API_KEY: z.string().optional(),

  // Billing
  BILLING_PROVIDER: z.enum(["stripe", "paystack", "lemonsqueezy"]),
  BILLING_DOMAIN: z.enum(["checkout", "subscription", "invoices", "customer", "webhook"]).default("checkout"),
  BILLING_FALLBACK_ORDER: z.string().default("stripe,paystack,lemonsqueezy"),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLIC_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_FREE: z.string().optional(),
  STRIPE_PRICE_PRO: z.string().optional(),
  STRIPE_PRICE_ENTERPRISE: z.string().optional(),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  PAYSTACK_PUBLIC_KEY: z.string().optional(),
  PAYSTACK_WEBHOOK_SECRET: z.string().optional(),
  PAYSTACK_CALLBACK_URL: z.string().url().optional(),
  PAYSTACK_WEBHOOK_URL: z.string().url().optional(),
  LEMON_API_KEY: z.string().optional(),
  LEMON_WEBHOOK_SECRET: z.string().optional(),

  // Framework
  FRAMEWORK_PROVIDER: z.enum(["express"]),
})

export const env = envSchema.parse(process.env)
