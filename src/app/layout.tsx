import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
          <Navbar />
          <PriceTicker />
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
