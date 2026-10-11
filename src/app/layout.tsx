import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Providers from "@/providers/Providers";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PriceTicker from "@/components/shared/PriceTicker";
import { Toaster } from "react-hot-toast";

/**
 * Single font family per Penpot DESIGN_TOKENS_REPORT.md §2:
 *   "Hind Siliguri" (Google Font) — weights 400, 500, 600, 700.
 *   Supports both Bengali and Latin glyphs.
 */
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "প্রয়োজনীয় পণ্যের বর্তমান বাজার দাম এক নজরে দেখুন",
};

// ────────────────────────────────────────────────────────────
// Fallback skeletons (shown while Suspend-bound Navbar/Ticker stream in)
// They mirror the exact heights of the real components to avoid layout shift.
// ────────────────────────────────────────────────────────────
function NavbarFallback() {
  return (
    <nav
      className="sticky top-0 z-50 bg-[#FAFCFA]/95 border-b border-[#E1E8E1]"
      style={{ height: 118 }}
    >
      {/* Row 1 — h 68 */}
      <div className="mx-auto max-w-[1152px] px-4" style={{ height: 68 }}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-[#F0F5F0] animate-pulse" />
            <div className="h-5 w-24 rounded bg-[#F0F5F0] animate-pulse" />
          </div>
          <div className="h-10 w-[118px] rounded-lg bg-[#F0F5F0] animate-pulse" />
        </div>
      </div>
      {/* Row 2 — h 49 */}
      <div className="border-t border-[#F0F5F0]" style={{ height: 49 }}>
        <div className="mx-auto max-w-[1152px] px-4 py-2 flex items-center gap-1 h-full overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-16 rounded-lg bg-[#F0F5F0] animate-pulse"
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

function TickerFallback() {
  return (
    <div
      className="bg-[#FAFCFA] overflow-hidden"
      style={{
        height: 37,
        borderTop: "1px solid #E1E8E1",
        borderBottom: "1px solid #E1E8E1",
      }}
    >
      <div className="h-6 mx-auto w-full max-w-4xl bg-[#F0F5F0] animate-pulse mt-[5px] rounded" />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F0F5F0]">
        <Providers>
          <AppProvider>
            <Suspense fallback={<NavbarFallback />}>
              <Navbar />
            </Suspense>
            <Suspense fallback={<TickerFallback />}>
              <PriceTicker />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#1D271F" /* Penpot base-content */,
                  color: "#FAFCFA" /* base-100 on dark */,
                  borderRadius: 8,
                  fontSize: 14,
                  border: "1px solid #2E3A30",
                },
                success: {
                  duration: 3000,
                  style: {
                    background: "#1A9951" /* success rgb(26,153,81) */,
                    border: "1px solid #148244",
                    color: "#F3FBF4" /* primary-content */,
                  },
                  iconTheme: {
                    primary: "#F3FBF4",
                    secondary: "#1A9951",
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: "#D03739" /* error rgb(208,55,57) */,
                    border: "1px solid #B02D2F" /* hover.error-border */,
                    color: "#FFF6F5" /* error-content */,
                  },
                  iconTheme: {
                    primary: "#FFF6F5",
                    secondary: "#D03739",
                  },
                },
              }}
            />
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
