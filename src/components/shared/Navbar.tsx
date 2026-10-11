"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useApp } from "@/context/AppContext";
import { getBanglaDate } from "@/lib/utils";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

/**
 * Navbar — exact Penpot "Header" spec:
 *   Outer navbar: 118px total, base-100 bg #FAFCFA @ 95%
 *   Bottom border 1px #E1E8E1 (base-300)
 *   Row 1 (h 68): Logo + brand left | Sign In/Profile right
 *   Row 2 (h 49): 8 category chips (h 32, r 8, pad 1/13)
 *     Active chip: brand-primary bg + brand-on-primary text (contrast safe)
 */
const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { categories } = useApp();
  const [banglaDate, setBanglaDate] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    setBanglaDate(getBanglaDate());
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছে");
            setProfileDropdownOpen(false);
          },
        },
      });
    } catch (error) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  const isHomeActive = pathname === "/";
  const isCategoryActive = (slug: string) =>
    pathname === `/category/${slug}` ||
    pathname?.startsWith(`/category/${slug}/`);

  return (
    <nav className="sticky top-0 z-50 bg-[#FAFCFA]/95 backdrop-blur border-b border-[#E1E8E1]">
      {/* ─── Row 1: h 68, container 1152, pad 12/16 ─── */}
      <div className="mx-auto max-w-[1152px] px-4" style={{ height: 68 }}>
        <div
          className="flex items-center justify-between w-full h-full"
          style={{ padding: "12px 0", columnGap: 12 }}
        >
          {/* LEFT: Brand + Logo + Bangla date (desktop) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden btn-ghost-penpot !min-h-[40px] !px-2"
              aria-label="মোবাইল মেনু"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link
              href="/"
              className="flex items-center gap-2"
              style={{ height: 44 }}
            >
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={18}
                height={18}
                priority
                style={{ width: 18, height: 18 }}
              />
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold text-[#05893E]"
                  style={{ fontSize: 20, lineHeight: "24px" }}
                >
                  বাজার দর
                </span>
                <span
                  className="text-xs text-[#1D271F]/70"
                  style={{ fontSize: 11, lineHeight: "16px", marginTop: 2 }}
                >
                  {banglaDate}
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT: Auth buttons / Profile */}
          <div className="flex items-center gap-3">
            {session?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen((v) => !v)}
                  className="btn-ghost-penpot"
                >
                  <div
                    className="w-8 h-8 rounded-full bg-[#05893E] text-[#F3FBF4] flex items-center justify-center text-sm font-bold"
                    aria-hidden
                  >
                    {session.user.name?.charAt(0) || "ই"}
                  </div>
                  <span className="hidden sm:inline">{session.user.name}</span>
                </button>
                {profileDropdownOpen && (
                  <ul
                    className="absolute right-0 mt-2 w-52 rounded-xl bg-[#FAFCFA] border border-[#E1E8E1] p-2 shadow-lg z-20"
                    role="menu"
                  >
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="nav-chip w-full !justify-start"
                      >
                        প্রোফাইল
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile/update"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="nav-chip w-full !justify-start"
                      >
                        আপডেট প্রোফাইল
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="nav-chip w-full !justify-start text-[#D03739] hover:!bg-[#FFF6F5]"
                      >
                        সাইন আউট
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/signin" className="btn-ghost-penpot">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn-primary-penpot">
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Row 2: h 49, categories chips, desktop only inline ─── */}
      <div
        className="border-t border-[#F0F5F0] hidden lg:block"
        style={{ height: 49 }}
      >
        <div
          className="mx-auto max-w-[1152px] px-4 flex items-center"
          style={{ height: 48 }}
        >
          <ul className="flex items-center flex-wrap gap-1 w-full py-2">
            <li>
              <Link
                href="/"
                className={`nav-chip ${isHomeActive ? "is-active" : ""}`}
              >
                হোম
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className={`nav-chip ${
                    isCategoryActive(category.slug) ? "is-active" : ""
                  }`}
                >
                  <span aria-hidden>{category.icon}</span>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Mobile Menu Drawer ─── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E1E8E1] bg-[#FAFCFA]">
          <div className="mx-auto max-w-[1152px] px-4 py-3 flex flex-col gap-1">
            <span className="text-xs text-[#1D271F]/70 md:hidden mb-1">
              {banglaDate}
            </span>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-chip ${isHomeActive ? "is-active" : ""}`}
            >
              হোম
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`nav-chip ${
                  isCategoryActive(category.slug) ? "is-active" : ""
                }`}
              >
                <span aria-hidden>{category.icon}</span>
                {category.name}
              </Link>
            ))}
            {!session?.user && (
              <div className="mt-3 pt-3 border-t border-[#E1E8E1] flex flex-col gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-ghost-penpot w-full"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary-penpot w-full"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
            {session?.user && (
              <div className="mt-3 pt-3 border-t border-[#E1E8E1] flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-2 px-2">
                  <div className="w-8 h-8 rounded-full bg-[#05893E] text-[#F3FBF4] flex items-center justify-center text-sm font-bold">
                    {session.user.name?.charAt(0) || "ই"}
                  </div>
                  <span className="text-sm font-medium">
                    {session.user.name}
                  </span>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-chip"
                >
                  প্রোফাইল
                </Link>
                <Link
                  href="/profile/update"
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-chip"
                >
                  আপডেট প্রোফাইল
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="nav-chip !text-[#D03739] hover:!bg-[#FFF6F5]"
                >
                  সাইন আউট
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
