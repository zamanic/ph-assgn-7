"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signIn,
  signUp,
  getEnabledSocialProviders,
  type SocialProvider,
} from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [providers] = useState<SocialProvider[]>(() =>
    getEnabledSocialProviders(),
  );
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    if (!name) {
      newErrors.name = "নাম দিন";
    } else if (name.trim().length < 2) {
      newErrors.name = "নাম কমপক্ষে ২ অক্ষর হতে হবে";
    }

    if (!email) {
      newErrors.email = "ইমেইল দিন";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা দিন";
    }

    if (!password) {
      newErrors.password = "পাসওয়ার্ড দিন";
    } else if (password.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await signUp.email(
        {
          name: name.trim(),
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success("নিবন্ধন সফল হয়েছে! লগইন করুন");
            router.push("/signin");
          },
          onError: (ctx: { error: { message: string } }) => {
            toast.error(ctx.error.message || "নিবন্ধন ব্যর্থ হয়েছে");
          },
        },
      );
    } catch (err) {
      toast.error("নিবন্ধন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    const label = provider === "google" ? "গুগল" : "গিটহাব";
    try {
      setLoading(true);
      await signIn.social(
        { provider, callbackURL: "/" },
        {
          onSuccess: () => {
            toast.success(`${label} দিয়ে নিবন্ধন সফল হয়েছে!`);
            router.push("/");
            router.refresh();
          },
          onError: (ctx: { error: { message: string } }) => {
            toast.error(
              ctx.error.message || `${label} দিয়ে নিবন্ধন ব্যর্থ হয়েছে`,
            );
          },
        },
      );
    } catch (err) {
      toast.error(`${label} দিয়ে নিবন্ধন ব্যর্থ হয়েছে`);
    } finally {
      setLoading(false);
    }
  };

  const GoogleSvg = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  const GithubSvg = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">📝</div>
              <h1 className="text-2xl font-bold">নিবন্ধন করুন</h1>
              <p className="text-sm text-base-content/60 mt-2">
                নতুন অ্যাকাউন্ট তৈরি করুন
              </p>
            </div>

            {providers.length > 0 && (
              <>
                <div
                  className={`grid gap-3 mb-6 ${
                    providers.length > 1 ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {providers.includes("google") && (
                    <button
                      type="button"
                      onClick={() => handleSocialSignIn("google")}
                      className="btn btn-outline gap-2 w-full !text-[#1D271F] !border-[#1D271F]/30 hover:!bg-[#1D271F]/5"
                      disabled={loading}
                    >
                      <GoogleSvg />
                      Google
                    </button>
                  )}
                  {providers.includes("github") && (
                    <button
                      type="button"
                      onClick={() => handleSocialSignIn("github")}
                      className="btn btn-outline gap-2 w-full !text-[#1D271F] !border-[#1D271F]/30 hover:!bg-[#1D271F]/5"
                      disabled={loading}
                    >
                      <GithubSvg />
                      GitHub
                    </button>
                  )}
                </div>

                <div className="divider text-xs text-base-content/50 my-2">
                  অথবা
                </div>
              </>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-[#1D271F]">
                    নাম
                  </span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম"
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  disabled={loading}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.name}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-[#1D271F]">
                    ইমেইল
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  disabled={loading}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-[#1D271F]">
                    পাসওয়ার্ড
                  </span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`input input-bordered w-full ${
                    errors.password ? "input-error" : ""
                  }`}
                  disabled={loading}
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.password}
                    </span>
                  </label>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : null}
                নিবন্ধন করুন
              </button>
            </form>

            <div className="text-center mt-6 pt-4 border-t border-base-200">
              <p className="text-sm text-base-content/70">
                একাউন্ট আছে?{" "}
                <Link
                  href="/signin"
                  className="text-primary font-semibold hover:underline"
                >
                  লগইন করুন
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
