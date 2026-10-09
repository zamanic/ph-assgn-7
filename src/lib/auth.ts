import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazardor-dev-secret-change-in-production-please-use-long-random-string-32chars",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID || "placeholder",
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET || "placeholder",
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID || "placeholder",
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET || "placeholder",
    },
  },
  ...(process.env.BETTER_AUTH_DB_URL
    ? {
        database: (() => {
          const client = new MongoClient(process.env.BETTER_AUTH_DB_URL!);
          const db = client.db("bazardor-auth");
          return mongodbAdapter(db, { client });
        })(),
      }
    : {}),
  trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS
    ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
    : ["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL || ""].filter(
        Boolean,
      ),
});
