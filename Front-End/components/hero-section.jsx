"use client";

import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/language-context";

export default function HeroSection() {
  const t = useTranslations("hero");
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden mt-36">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/Video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div
        className="absolute bottom-0 left-0 w-full h-52 z-20 pointer-events-none bg-gradient-to-b from-transparent via-black/70 to-white"
        style={{ marginBottom: "-2rem" }}
      />
      <div
        className={`relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 pt-24 ${
          isArabic ? "font-arabic" : ""
        }`}>
        <span className="text-brand-gold text-lg md:text-xl font-semibold mb-4 drop-shadow-lg">
          {t("headline")}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-xl">
          {t("companyName")}
        </h1>
        <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-8 drop-shadow-lg">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
