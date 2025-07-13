"use client";

import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className={`text-center mb-12 ${isArabic ? "font-arabic" : ""}`}>
        <div className="inline-block mb-4">
          <span className="inline-block h-0.5 w-10 bg-brand-gold mr-2 align-middle"></span>
          <span className="text-brand-gold text-sm uppercase tracking-wider">
            {language === "ar"
              ? "راحتك هي أولويتنا"
              : language === "fr"
              ? "Votre confort est notre priorité"
              : "Your comfort is our priority"}
          </span>
          <span className="inline-block h-0.5 w-10 bg-brand-gold ml-2 align-middle"></span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-brand-gold dark:text-brand-gold">
          {isArabic
            ? "Continental Premium Properties"
            : "Continental Premium Properties"}
        </h1>
        <p className="text-xl text-brand-goldDark max-w-3xl mx-auto">
          {language === "ar"
            ? "نقدم لكم أفضل المشاريع السكنية بمواصفات عالمية وتصاميم عصرية"
            : language === "fr"
            ? "Découvrez nos projets résidentiels premium avec des spécifications de classe mondiale et des designs modernes"
            : "Discover our premium residential projects with world-class specifications and modern designs"}
        </p>

        <div className="mt-8">
          <Link href="/projects">
            <Button className="bg-gradient-to-r from-brand-gold to-brand-goldDark text-white font-bold px-8 py-6 text-lg border-none">
              {language === "ar"
                ? "استكشف مشاريعنا"
                : language === "fr"
                ? "Explorer Nos Projets"
                : "Explore Our Projects"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg border border-brand-gold/20">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/LLjuTvY-yQs?autoplay=1&mute=1&controls=0&loop=1&playlist=LLjuTvY-yQs"
          title="Residential Projects"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen></iframe>
      </div>
    </section>
  );
}
