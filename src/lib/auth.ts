import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let authInstance: ReturnType<typeof betterAuth> | null = null;

function createAuth() {
  const dbUrl = process.env.BETTER_AUTH_DB_URL;

  if (!dbUrl) {
    return betterAuth({
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
      database: null as any,
      trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS
        ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
        : ["http://localhost:3000"],
    });
  }

  const client = new MongoClient(dbUrl);
  const db = client.db("bazardor-auth");

  return betterAuth({
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    socialProviders: {
      google: {
        clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET || "",
      },
      github: {
        clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID || "",
        clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET || "",
      },
    },
    database: mongodbAdapter(db, {
      client,
    }),
    trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS
      ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
      : ["http://localhost:3000"],
  });
}

export const auth = authInstance || (authInstance = createAuth());
