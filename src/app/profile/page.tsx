"use client";

import { useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      toast.error("প্রোফাইল দেখতে লগইন করুন");
      router.replace("/signin?callbackUrl=" + encodeURIComponent("/profile"));
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("লগআউট সফল হয়েছে");
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (err) {
      toast.error("লগআউট ব্যর্থ হয়েছে");
    }
  };

  if (isPending || !session) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-8 animate-pulse">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-28 w-28 bg-base-300 rounded-full mb-4" />
              <div className="h-7 w-40 bg-base-300 rounded mb-2" />
              <div className="h-5 w-56 bg-base-300 rounded" />
            </div>
            <div className="space-y-3 mt-8">
              <div className="h-12 w-full bg-base-300 rounded-lg" />
              <div className="h-12 w-full bg-base-300 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-6">
        <Link
          href="/"
          className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content"
        >
          <span>←</span>
          হোমে ফিরুন
        </Link>
      </div>

      <div className="card bg-base-100 shadow-xl overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20" />

        <div className="card-body p-8 -mt-12">
          <div className="flex flex-col items-center text-center">
            <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-base-100">
              {initials}
            </div>

            <h1 className="text-2xl font-bold mt-5">{user.name || "ব্যবহারকারী"}</h1>
            <p className="text-base-content/60 mt-1 flex items-center gap-2">
              <span className="text-sm">📧</span>
              {user.email}
            </p>

            {user.createdAt && (
              <p className="text-xs text-base-content/50 mt-3">
                যোগদান করেছেন:{" "}
                {new Date(user.createdAt).toLocaleDateString("bn-BD", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="divider my-8" />

          <div className="space-y-3">
            <Link
              href="/profile/update"
              className="btn btn-primary w-full gap-2"
            >
              <span>✏️</span>
              তথ্য আপডেট করুন
            </Link>

            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error w-full gap-2"
            >
              <span>🚪</span>
              লগআউট
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
