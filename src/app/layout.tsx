import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PriceTicker from "@/components/shared/PriceTicker";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "প্রয়োজনীয় পণ্যের বর্তমান বাজার দাম এক নজরে দেখুন",
};

// Simple skeleton navbar shown while the real navbar (usePathname) streams in
function NavbarFallback() {
  return (
    <nav className="bg-base-100 shadow-sm sticky top-0 z-50 border-b border-base-300">
      <div className="container mx-auto px-4">
        <div className="navbar py-2">
          <div className="navbar-start">
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 animate-pulse bg-base-200 rounded-lg" />
                <div className="h-6 w-28 animate-pulse bg-base-200 rounded" />
              </div>
            </div>
          </div>
          <div className="navbar-end gap-2">
            <div className="h-9 w-24 animate-pulse bg-base-200 rounded-lg" />
            <div className="h-9 w-24 animate-pulse bg-base-200 rounded-lg" />
          </div>
        </div>
        <div className="hidden lg:block border-t border-base-300 py-2">
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 animate-pulse bg-base-200 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function TickerFallback() {
  return (
    <div className="bg-base-100 border-b border-base-300 py-2 overflow-hidden">
      <div className="animate-pulse h-6 bg-base-200 rounded mx-auto w-full max-w-4xl" />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-200">
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
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              },
              success: {
                duration: 3000,
                style: {
                  background: "#166534",
                  border: "1px solid #22c55e",
                },
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: "#991b1b",
                  border: "1px solid #ef4444",
                },
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
