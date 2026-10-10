import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Only include social provider if BOTH id + secret are provided (non-empty)
const googleCreds =
  process.env.BETTER_AUTH_GOOGLE_CLIENT_ID &&
  process.env.BETTER_AUTH_GOOGLE_SECRET &&
  !process.env.BETTER_AUTH_GOOGLE_CLIENT_ID.includes("placeholder")
    ? {
        google: {
          clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID!,
          clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET!,
        },
      }
    : {};

const githubCreds =
  process.env.BETTER_AUTH_GITHUB_CLIENT_ID &&
  process.env.BETTER_AUTH_GITHUB_SECRET &&
  !process.env.BETTER_AUTH_GITHUB_CLIENT_ID.includes("placeholder")
    ? {
        github: {
          clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID!,
          clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET!,
        },
      }
    : {};

const socialProviders = { ...googleCreds, ...githubCreds };

// Database config — only include if BETTER_AUTH_DB_URL is set (non-empty)
const dbUrl = process.env.BETTER_AUTH_DB_URL;
const dbConfig = dbUrl
  ? (() => {
      const client = new MongoClient(dbUrl);
      const db = client.db("bazardor-auth");
      return {
        database: mongodbAdapter(db, { client }),
      };
    })()
  : {};

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazardor-dev-secret-change-in-production-please-use-long-random-32chars",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  // Spread social providers only if at least one exists
  ...(Object.keys(socialProviders).length > 0 ? { socialProviders } : {}),
  ...dbConfig,
  trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS
    ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
    : ["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL || ""].filter(
        Boolean,
      ),
});
