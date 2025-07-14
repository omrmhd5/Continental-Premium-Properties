"use client";

import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  // Text translations
  const headline =
    language === "ar"
      ? "راحتك هي أولويتنا"
      : language === "fr"
      ? "Votre confort est notre priorité"
      : "Your comfort is our priority";
  const title = "Continental Premium Properties";
  const subtitle =
    language === "ar"
      ? "نقدم لكم أفضل المشاريع السكنية بمواصفات عالمية وتصاميم عصرية"
      : language === "fr"
      ? "Découvrez nos projets résidentiels premium avec des spécifications de classe mondiale et des designs modernes"
      : "Discover our premium residential projects with world-class specifications and modern designs";

  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden mt-24">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/Video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      {/* Bottom Gradient Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-52 z-20 pointer-events-none bg-gradient-to-t from-black/70 to-transparent" />
      {/* Centered Text */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 pt-24">
        <span className="text-brand-gold text-lg md:text-xl font-semibold mb-4 drop-shadow-lg">
          {headline}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-xl">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-8 drop-shadow-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
