"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useTranslations } from "next-intl";

export default function MediaCenter() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/Event.webp",
      title: t("media.slides.launch.title"),
      description: t("media.slides.launch.description"),
    },
    {
      image: "/images/Skyline.webp",
      title: t("media.slides.skyline.title"),
      description: t("media.slides.skyline.description"),
    },
    {
      image: "/images/Community.webp",
      title: t("media.slides.community.title"),
      description: t("media.slides.community.description"),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="py-16" id="media">
      <div className={`text-center mb-12 ${isArabic ? "font-arabic" : ""}`}>
        <div className="inline-block mb-4">
          <span className="inline-block h-0.5 w-10 bg-primary mr-2 align-middle"></span>
          <span className="text-primary text-sm uppercase tracking-wider">
            {t("media.title")}
          </span>
          <span className="inline-block h-0.5 w-10 bg-primary ml-2 align-middle"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          {t("media.latestNews")}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("media.explore")}
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-lg shadow-lg elegant-card">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                    <h3
                      className={`text-2xl font-serif font-bold mb-2 ${
                        isArabic ? "font-arabic text-right" : ""
                      }`}>
                      {slide.title}
                    </h3>
                    <p
                      className={`text-white/90 ${
                        isArabic ? "font-arabic text-right" : ""
                      }`}>
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-primary/30 text-primary rounded-full"
          onClick={prevSlide}>
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">{t("common.previous")}</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-primary/30 text-primary rounded-full"
          onClick={nextSlide}>
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">{t("common.next")}</span>
        </Button>

        <div className="flex justify-center mt-4 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              onClick={() => setCurrentSlide(index)}>
              <span className="sr-only">{`Slide ${index + 1}`}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
