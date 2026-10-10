"use client";

import Image from "next/image";
import { Button } from "@heroui/react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 relative">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <p className="inline-block text-sm md:text-base font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4 md:mb-6">
              স্বাগতম বাজার দরে
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 text-base-content">
              প্রতিদিনের পণ্যের দাম
              <br />
              <span className="text-primary">এক নজরে</span>
            </h1>
            <p className="text-base md:text-lg text-base-content/70 max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed">
              আপনার প্রিয় পণ্যের আজকের বাজার দাম দেখুন, তুলনা করুন এবং সঠিক
              সিদ্ধান্ত নিন।
            </p>
            <a href="#সব-পণ্য" className="inline-block">
              <Button
                variant="primary"
                size="lg"
                className="rounded-xl font-semibold px-6 md:px-8 py-6 text-base md:text-lg shadow-lg shadow-emerald-900/20 hover:translate-y-[-1px] transition"
              >
                সব পণ্য দেখুন
                <span aria-hidden>→</span>
              </Button>
            </a>
          </div>
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50" />
              <div className="relative bg-base-100 rounded-2xl md:rounded-3xl p-2 md:p-4 shadow-2xl border border-base-200">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর হিরো ব্যানার"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-xl md:rounded-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
