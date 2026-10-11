import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

/* ========================================================================
   BetterAuth SERVER CONFIG — Google + GitHub OAuth
   Follows the coding style of nextJS-better-auth-social-main/src/lib/auth.js
   (direct socialProviders object + direct mongodbAdapter).
   Uses credentials from .env:
     BETTER_AUTH_DB_URL, BETTER_AUTH_GOOGLE_CLIENT_ID, BETTER_AUTH_GOOGLE_SECRET,
     BETTER_AUTH_GITHUB_CLIENT_ID, BETTER_AUTH_GITHUB_SECRET
   ======================================================================== */

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL!);
const db = client.db("bazardor-auth");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, /* per instructions — examiner convenience */
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string,
    },
  },
  database: mongodbAdapter(db, { client }),
  trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS
    ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : ["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL || ""]
        .filter(Boolean),
  session: {
    expiresIn: 60 * 60 * 24 * 7, /* 7 days */
  },
});
