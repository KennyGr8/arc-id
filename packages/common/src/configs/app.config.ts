import { getEnv } from "./get-env"

export const config = {
  APP: {
    NODE_ENV: getEnv("NODE_ENV"),
    BASE_PATH: getEnv("BASE_PATH"),
    ORIGIN: getEnv("APP_ORIGIN"),
    PORT: getEnv("PORT"),
    FRAMEWORK: getEnv("FRAMEWORK_PROVIDER"),
  },

  HTTP: {
    PROVIDER: getEnv("HTTP_PROVIDER"),
    DOMAIN: getEnv("HTTP_DOMAIN"),
    FALLBACK_ORDER: getEnv("HTTP_FALLBACK_ORDER").split(","),
  },

  DB: {
    PROVIDER: getEnv("DB_PROVIDER"),
    URL: getEnv("DB_URL"),
    DOMAIN: getEnv("DB_DOMAIN"),
    FALLBACK_ORDER: getEnv("DB_FALLBACK_ORDER").split(","),
  },
  
  CACHE: {
    DOMAIN: getEnv("CACHE_DOMAIN"),
    PROVIDER: getEnv("CACHE_PROVIDER"),
    URL: getEnv("REDIS_URL"),
  },

  JWT: {
    SECRET: getEnv("JWT_SECRET"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN"),
    REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
    REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN"),
  },

  MAIL: {
    PROVIDER: getEnv("MAIL_PROVIDER"),
    DOMAIN: getEnv("MAIL_DOMAIN"),
    FALLBACK_ORDER: getEnv("MAIL_FALLBACK_ORDER").split(","),
    NODEMAILER: {
      FROM: getEnv("MAIL_SMTP_FROM"),
      HOST: getEnv("MAIL_SMTP_HOST"),
      PORT: getEnv("MAIL_SMTP_PORT"),
      USER: getEnv("MAIL_SMTP_USER"),
      PASS: getEnv("MAIL_SMTP_PASS"),
    },
    BREVO: {
      API_KEY: getEnv("BREVO_API_KEY"),
      HOST: getEnv("BREVO_HOST"),
      PORT: getEnv("BREVO_PORT"),
      USERNAME: getEnv("BREVO_USERNAME"),
      PASSWORD: getEnv("BREVO_PASSWORD"),
      FROM: getEnv("BREVO_FROM"),
    },
    RESEND: {
      FROM: getEnv("RESEND_FROM"),
      API_KEY: getEnv("RESEND_API_KEY"),
    },
    SENDGRID: {
      FROM: getEnv("SENDGRID_FROM"),
      API_KEY: getEnv("SENDGRID_API_KEY"),
    },
  POSTMARK: {
      FROM: getEnv("POSTMARK_FROM"),
      API_KEY: getEnv("POSTMARK_API_KEY"),
    }
  },

  BILLING: {
    PROVIDER: getEnv("BILLING_PROVIDER"),
    DOMAIN: getEnv("BILLING_DOMAIN"),
    FALLBACK_ORDER: getEnv("BILLING_FALLBACK_ORDER").split(","),
    STRIPE: {
      SECRET_KEY: getEnv("STRIPE_SECRET_KEY"),
      PUBLIC_KEY: getEnv("STRIPE_PUBLIC_KEY"),
      WEBHOOK_SECRET: getEnv("STRIPE_WEBHOOK_SECRET"),
      PRICES: {
        FREE: getEnv("STRIPE_PRICE_FREE"),
        PRO: getEnv("STRIPE_PRICE_PRO"),
        ENTERPRISE: getEnv("STRIPE_PRICE_ENTERPRISE"),
      },
    },
    PAYSTACK: {
      SECRET_KEY: getEnv("PAYSTACK_SECRET_KEY"),
      PUBLIC_KEY: getEnv("PAYSTACK_PUBLIC_KEY"),
      WEBHOOK_SECRET: getEnv("PAYSTACK_WEBHOOK_SECRET"),
      CALLBACK_URL: getEnv("PAYSTACK_CALLBACK_URL"),
      WEBHOOK_URL: getEnv("PAYSTACK_WEBHOOK_URL"),
    },
    LEMON: {
      API_KEY: getEnv("LEMON_API_KEY"),
      WEBHOOK_SECRET: getEnv("LEMON_WEBHOOK_SECRET"),
    },
  },

  LOGGING: {
    RETENTION_DAYS: getEnv("LOG_RETENTION_DAYS"),
  },
}
