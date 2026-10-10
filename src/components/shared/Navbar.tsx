"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useApp } from "@/context/AppContext";
import { getBanglaDate } from "@/lib/utils";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

// Active link style — contrast ≥ 5.6:1  (emerald-700 bg + pure white text/semibold)
const activeClass =
  "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] hover:text-white font-semibold shadow-sm";

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
    <nav className="bg-base-100 shadow-sm sticky top-0 z-50 border-b border-base-300">
      <div className="container mx-auto px-4">
        <div className="navbar py-2">
          <div className="navbar-start">
            <div className="lg:hidden mr-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-ghost btn-square"
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
            </div>
            <Link href="/" className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-icon.png"
                  alt="বাজার দর লোগো"
                  width={40}
                  height={40}
                  priority
                />
                <span className="text-xl font-bold text-primary">বাজার দর</span>
              </div>
              <span className="text-xs text-base-content/70 ml-1 hidden sm:inline">
                {banglaDate}
              </span>
            </Link>
          </div>

          <div className="navbar-end gap-2">
            {session?.user ? (
              <div className="dropdown dropdown-end">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="btn btn-ghost gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
                    {session.user.name?.charAt(0) || "ই"}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">
                    {session.user.name}
                  </span>
                </button>
                {profileDropdownOpen && (
                  <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-lg mt-2">
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        প্রোফাইল
                      </Link>
                    </li>
                    <li>
                      <button type="button" onClick={handleSignOut}>
                        সাইন আউট
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  className={`btn btn-outline btn-sm ${
                    pathname === "/signin" ? "btn-active" : ""
                  }`}
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className={`btn btn-primary btn-sm text-primary-content ${
                    pathname === "/signup" ? "btn-active" : ""
                  }`}
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Category Row */}
        <div className="hidden lg:block border-t border-base-300 py-1">
          <ul className="menu menu-horizontal px-1 gap-1 flex-wrap">
            <li>
              <Link
                href="/"
                className={`rounded-lg text-sm ${
                  isHomeActive ? activeClass : ""
                }`}
              >
                হোম
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className={`rounded-lg text-sm ${
                    isCategoryActive(category.slug) ? activeClass : ""
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-base-300 pt-3">
            <span className="text-xs text-base-content/70 block mb-2">
              {banglaDate}
            </span>
            <ul className="menu menu-sm gap-1">
              <li>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg ${isHomeActive ? activeClass : ""}`}
                >
                  হোম
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg ${
                      isCategoryActive(category.slug) ? activeClass : ""
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Link>
                </li>
              ))}
              {!session?.user && (
                <div className="mt-3 pt-3 border-t border-base-300 flex flex-col gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-outline btn-sm w-full"
                  >
                    সাইন ইন
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary btn-sm w-full text-primary-content"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
              {session?.user && (
                <div className="mt-3 pt-3 border-t border-base-300">
                  <div className="flex items-center gap-2 mb-2 px-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
                      {session.user.name?.charAt(0) || "ই"}
                    </div>
                    <span className="text-sm font-medium">
                      {session.user.name}
                    </span>
                  </div>
                  <ul className="gap-1">
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-lg"
                      >
                        প্রোফাইল
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left rounded-lg"
                      >
                        সাইন আউট
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
