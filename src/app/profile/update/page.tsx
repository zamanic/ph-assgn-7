"use client";

import { useEffect, useState } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfileUpdatePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      toast.error("এই পেজে যেতে লগইন করুন");
      router.replace(
        "/signin?callbackUrl=" + encodeURIComponent("/profile/update"),
      );
      return;
    }
    if (session.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const validate = () => {
    if (!name.trim()) {
      setError("নাম দিন");
      return false;
    }
    if (name.trim().length < 2) {
      setError("নাম কমপক্ষে ২ অক্ষর হতে হবে");
      return false;
    }
    setError(null);
    return true;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await updateUser(
        { name: name.trim() },
        {
          onSuccess: () => {
            toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
            router.push("/profile");
            router.refresh();
          },
          onError: (ctx: { error: { message: string } }) => {
            setError(ctx.error.message || "আপডেট ব্যর্থ হয়েছে");
            toast.error(ctx.error.message || "আপডেট ব্যর্থ হয়েছে");
          },
        },
      );
    } catch (err) {
      setError("আপডেট ব্যর্থ হয়েছে");
      toast.error("আপডেট ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-8 animate-pulse">
            <div className="h-7 w-48 bg-base-300 rounded mb-2" />
            <div className="h-4 w-32 bg-base-300 rounded mb-8" />
            <div className="h-5 w-16 bg-base-300 rounded mb-2" />
            <div className="h-12 w-full bg-base-300 rounded-lg mb-6" />
            <div className="h-12 w-full bg-base-300 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : session.user.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="mb-6">
        <Link
          href="/profile"
          className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content"
        >
          <span>←</span>
          প্রোফাইলে ফিরুন
        </Link>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4">
              {initials}
            </div>
            <h1 className="text-2xl font-bold">প্রোফাইল আপডেট</h1>
            <p className="text-sm text-base-content/60 mt-2">
              আপনার তথ্য আপডেট করুন
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-[#1D271F]">
                  নাম
                </span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="আপনার নাম"
                className={`input input-bordered w-full ${
                  error ? "input-error" : ""
                }`}
                disabled={loading}
              />
              {error && (
                <label className="label">
                  <span className="label-text-alt text-error">{error}</span>
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
                value={session.user.email || ""}
                disabled
                className="input input-bordered w-full bg-base-200 cursor-not-allowed opacity-70"
              />
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  ইমেইল পরিবর্তন করা যায় না
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 pt-4">
              <Link
                href="/profile"
                className={`btn btn-outline flex-1 !text-[#1D271F] !border-[#1D271F]/30 hover:!bg-[#1D271F]/5 ${
                  loading ? "pointer-events-none opacity-50" : ""
                }`}
              >
                বাতিল
              </Link>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : null}
                আপডেট করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
