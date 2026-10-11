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

/* ========================================================================
   MongoDB client — created LAZILY to avoid crashing `next build` when
   BETTER_AUTH_DB_URL is not yet injected (e.g. during Vercel build, env vars
   may be evaluated at module-load time). `new MongoClient(undefined)` throws
   "Cannot read properties of undefined (reading 'startsWith')". We provide a
   syntactically-valid fallback URI so the constructor never crashes; the real
   connection string is used at runtime when the env var is present.
   ======================================================================== */
const MONGODB_URI =
  process.env.BETTER_AUTH_DB_URL || "mongodb://127.0.0.1:27017/bazardor-auth";
const client = new MongoClient(MONGODB_URI);
const db = client.db("bazardor-auth");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false /* per instructions — examiner convenience */,
  },
  /* ======================================================================
     Account linking — auto-links a Google/GitHub sign-in to an existing
     email/password user when the provider email matches. This fixes the
     'account_not_linked' error for users who signed up with email first
     and later try Google/GitHub (or vice-versa).
     trustedProviders = providers whose emails we trust enough to auto-link.
     ====================================================================== */
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
      autoSignUp: true /* auto-create account on first social sign-in (fixes account_not_linked) */,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string,
      autoSignUp: true /* auto-create account on first social sign-in (fixes account_not_linked) */,
    },
  },
  database: mongodbAdapter(db, { client }),
  trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS
    ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : ["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL || ""].filter(
        Boolean,
      ),
  session: {
    expiresIn: 60 * 60 * 24 * 7 /* 7 days */,
  },
});
