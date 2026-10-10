"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, updateUser, useSession } = authClient;

/**
 * Which Social OAuth providers are actually registered on the SERVER side.
 * Mirrored via NEXT_PUBLIC_* env vars so the front-end can avoid showing
 * Google/GitHub sign-in buttons when the provider isn't registered (otherwise
 * a click → 404 /api/auth/sign-in/social/{provider}).
 */
export type SocialProvider = "google" | "github";

export function isSocialProviderEnabled(provider: SocialProvider): boolean {
  if (provider === "google") {
    return process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true";
  }
  if (provider === "github") {
    return process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true";
  }
  return false;
}

export function getEnabledSocialProviders(): SocialProvider[] {
  const out: SocialProvider[] = [];
  if (isSocialProviderEnabled("google")) out.push("google");
  if (isSocialProviderEnabled("github")) out.push("github");
  return out;
}
