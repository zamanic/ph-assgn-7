"use client";

import { useEffect, useState } from "react";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      toast.error("প্রোফাইল দেখতে লগইন করুন");
      router.replace("/signin?callbackUrl=" + encodeURIComponent("/profile"));
      return;
    }
    if (session.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছে");
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (err) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("নাম দিন");
      return;
    }
    if (name.trim().length < 2) {
      setError("নাম কমপক্ষে ২ অক্ষর হতে হবে");
      return;
    }
    setError(null);
    setUpdating(true);
    try {
      await updateUser(
        { name: name.trim() },
        {
          onSuccess: () => {
            toast.success("নাম সফলভাবে আপডেট হয়েছে!");
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
      setUpdating(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-base-300 rounded mb-2" />
          <div className="h-4 w-64 bg-base-300 rounded mb-8" />
          <div className="h-32 w-full bg-base-300 rounded-2xl mb-6" />
          <div className="h-40 w-full bg-base-300 rounded-2xl" />
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
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      {/* Page header */}
      <div className="mb-8">
        <h1
          className="m-0 text-[#1D271F]"
          style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.3 }}
        >
          আমার প্রোফাইল
        </h1>
        <p
          className="m-0 mt-2"
          style={{ fontSize: 14, color: "#1D271F", opacity: 0.6 }}
        >
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Profile card */}
      <div
        className="bg-[#FAFCFA] mb-6"
        style={{
          borderRadius: 16,
          border: "1px solid #E1E8E1",
          padding: 24,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Avatar */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#05893E",
              color: "#F3FBF4",
              fontSize: 24,
              fontWeight: 700,
            }}
            aria-hidden
          >
            {initials}
          </div>

          {/* Name + email */}
          <div className="flex-1 min-w-0">
            <p
              className="m-0 text-[#1D271F]"
              style={{ fontSize: 20, fontWeight: 700 }}
            >
              {user.name || "ব্যবহারকারী"}
            </p>
            <p
              className="m-0 mt-1"
              style={{ fontSize: 14, color: "#1D271F", opacity: 0.6 }}
            >
              {user.email}
            </p>
          </div>

          {/* Sign out button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="shrink-0 inline-flex items-center gap-2"
            style={{
              minHeight: 40,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #D03739",
              background: "transparent",
              color: "#D03739",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#FFF6F5")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span aria-hidden>↩</span>
            সাইন আউট
          </button>
        </div>
      </div>

      {/* Name update section */}
      <div
        className="bg-[#FAFCFA]"
        style={{
          borderRadius: 16,
          border: "1px solid #E1E8E1",
          padding: 24,
        }}
      >
        <h2
          className="m-0 mb-5 text-[#1D271F]"
          style={{ fontSize: 18, fontWeight: 700 }}
        >
          নাম হালনাগাদ করুন
        </h2>

        <form onSubmit={handleUpdateName}>
          <label
            htmlFor="profile-name"
            className="block mb-2 text-[#1D271F]"
            style={{ fontSize: 14, fontWeight: 500 }}
          >
            নাম
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="আপনার নাম"
            disabled={updating}
            className="w-full"
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: `1px solid ${error ? "#D03739" : "#E1E8E1"}`,
              background: "#FFFFFF",
              color: "#1D271F",
              fontSize: 15,
              outline: "none",
              transition: "border-color 150ms ease",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = error ? "#D03739" : "#05893E")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = error ? "#D03739" : "#E1E8E1")
            }
          />
          {error && (
            <p
              className="m-0 mt-2"
              style={{ fontSize: 13, color: "#D03739" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={updating}
            style={{
              marginTop: 16,
              minHeight: 42,
              padding: "0 20px",
              borderRadius: 8,
              border: "none",
              background: updating ? "#05893E80" : "#05893E",
              color: "#F3FBF4",
              fontSize: 14,
              fontWeight: 600,
              cursor: updating ? "not-allowed" : "pointer",
              transition: "background 150ms ease",
            }}
          >
            {updating ? "আপডেট হচ্ছে..." : "নাম হালনাগাদ করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
