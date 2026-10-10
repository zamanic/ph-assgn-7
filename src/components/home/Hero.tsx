"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { getBanglaDate } from "@/lib/utils";

/**
 * Hero Banner — exact Penpot spec §5.3
 * Outer frame: 1120 × 283 (desktop), r=24, bg #FAFCFA, 1px #E1E8E1 stroke.
 * Inner pad: 40/16.
 * Left stack (row-gap 8):
 *   1) Eyebrow date pill — 28h, r=14, pad 4/12, bg-primary/10, text-primary
 *   2) H1 — 36/700 LH45
 *   3) Spacer 4px
 *   4) Subtitle — 16/400 LH24, opacity 70%
 *   5) Spacer 12px
 *   6) HeroUI Primary Button (variant=primary size=lg) wrapped in anchor (#সব-পণ্য)
 * Right: Image 315 × 263 (exact bazar-hero.png dimensions)
 */
const Hero = () => {
  const [banglaDate, setBanglaDate] = useState("");
  useEffect(() => setBanglaDate(getBanglaDate()), []);

  return (
    <section className="mx-auto w-full max-w-[1152px] px-4">
      <div className="hero-frame">
        <div className="hero-inner">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* ─── LEFT: Copy stack ─── */}
            <div
              className="flex flex-col w-full lg:w-auto"
              style={{ maxWidth: 576, rowGap: 8 }}
            >
              {/* 1. Eyebrow date pill */}
              <span className="pill-eyebrow-penpot w-fit">
                {banglaDate || "বাজার দর"}
              </span>

              {/* 2. H1 */}
              <h1
                className="text-[#1D271F] m-0"
                style={{
                  fontSize: "clamp(28px, 5vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: 0,
                }}
              >
                আজকের বাজারের দাম এক নজরে
              </h1>

              {/* 3. Spacer 4px */}
              <div style={{ height: 4 }} aria-hidden />

              {/* 4. Subtitle */}
              <p
                className="m-0"
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#1D271F",
                  opacity: 0.7,
                }}
              >
                প্রতিদিনের প্রয়োজনীয় পণ্যের আজকের বাজার দাম এক নজরে দেখুন,
                দাম বাড়ানো ও কমানোর হার বুঝুন, তুলনা করুন এবং সঠিক
                সিদ্ধান্ত নিন।
              </p>

              {/* 5. Spacer 12px */}
              <div style={{ height: 12 }} aria-hidden />

              {/* 6. Primary CTA (HeroUI Button — variant/size props + penpot exact class on wrapper anchor) */}
              <div className="flex items-center">
                <a
                  href="#সব-পণ্য"
                  className="btn-primary-penpot text-decoration-none"
                  aria-label="সব পণ্য দেখুন"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="!bg-transparent !p-0 !min-h-0 !shadow-none !border-0"
                  >
                    সব পণ্য দেখুন
                    <span aria-hidden className="ml-[6px]">
                      →
                    </span>
                  </Button>
                </a>
              </div>
            </div>

            {/* ─── RIGHT: Hero image 315 × 263 (exact from Penpot §6.2) ─── */}
            <div
              className="mx-auto lg:mx-0 shrink-0 relative"
              style={{ width: 315, height: 263 }}
            >
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ব্যানার"
                width={315}
                height={263}
                style={{ width: 315, height: 263 }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
