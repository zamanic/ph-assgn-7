import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

/* ========================================================================
   BetterAuth SERVER CONFIG with Google + GitHub OAuth
   Rewritten for issue: "Missing GitHub and Google OAuth Providers"
   - Registers provider IFF (env exists AND != placeholder / empty) — typed safe.
   - Passes scopes + explicit redirectURL (OAuth callback from providers)
   - socialProviders set UNCONDITIONALLY (not spread + conditional) so even empty
     object {} doesn't confuse BetterAuth config shape.
   ======================================================================== */

type ProviderDef = {
  clientId: string;
  clientSecret: string;
  redirectURL?: string;
  scopes?: string[];
};

const appUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

/* ── Environment helpers ──────────────────────────────────────────────── */
function isNonPlaceholder(v: string | undefined | null): v is string {
  if (!v) return false;
  const v2 = v.trim();
  if (v2.length === 0) return false;
  if (/placeholder/i.test(v2)) return false;
  if (/your.*(id|secret)/i.test(v2)) return false;
  return true;
}

/* ── Google ───────────────────────────────────────────────────────────── */
const G_ID = process.env.BETTER_AUTH_GOOGLE_CLIENT_ID;
const G_SEC = process.env.BETTER_AUTH_GOOGLE_SECRET;
const googleEnabled = isNonPlaceholder(G_ID) && isNonPlaceholder(G_SEC);
const google: ProviderDef | null = googleEnabled
  ? {
      clientId: G_ID!,
      clientSecret: G_SEC!,
      redirectURL: `${appUrl}/api/auth/callback/google`,
      scopes: ["openid", "email", "profile"],
    }
  : null;

/* ── GitHub ───────────────────────────────────────────────────────────── */
const GH_ID = process.env.BETTER_AUTH_GITHUB_CLIENT_ID;
const GH_SEC = process.env.BETTER_AUTH_GITHUB_SECRET;
const githubEnabled = isNonPlaceholder(GH_ID) && isNonPlaceholder(GH_SEC);
const github: ProviderDef | null = githubEnabled
  ? {
      clientId: GH_ID!,
      clientSecret: GH_SEC!,
      redirectURL: `${appUrl}/api/auth/callback/github`,
      scopes: ["read:user", "user:email"],
    }
  : null;

/* Unconditionally shaped object (spread is safe but never empty) */
export const SOCIAL_PROVIDERS_ACTIVE: { google: boolean; github: boolean } = {
  google: googleEnabled,
  github: githubEnabled,
};

/* ── Database (MongoDB Atlas via mongodbAdapter + shared client) ─────── */
const dbUrl = process.env.BETTER_AUTH_DB_URL;
const dbConfig = dbUrl
  ? (() => {
      const client = new MongoClient(dbUrl);
      const db = client.db("bazardor-auth");
      return { database: mongodbAdapter(db, { client }) } as const;
    })()
  : {};

/* ── Assemble BetterAuth instance ────────────────────────────────────── */
export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazardor-dev-secret-change-in-production-please-use-long-random-32chars",
  baseURL: appUrl,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, /* per user's examiner convenience rule */
  },
  socialProviders: {
    ...(google ? { google } : {}),
    ...(github ? { github } : {}),
  },
  ...dbConfig,
  trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS
    ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : ["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL || ""]
        .filter(Boolean),
  session: {
    cookieCache: { enabled: true, maxAge: 5 * 60 },
    expiresIn: 60 * 60 * 24 * 7, /* 7 days */
  },
});
