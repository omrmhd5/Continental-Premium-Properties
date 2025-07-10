"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export default function MediaCenter() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/Event.webp",
      title: {
        en: "Project Launch Event",
        ar: "حدث إطلاق المشروع",
        fr: "Événement de Lancement du Projet",
      },
      description: {
        en: "Grand opening ceremony of our latest residential complex",
        ar: "حفل الافتتاح الكبير لأحدث مجمع سكني لدينا",
        fr: "Cérémonie d'ouverture grandiose de notre dernier complexe résidentiel",
      },
    },
    {
      image: "/images/Construction.webp",
      title: {
        en: "Construction Progress",
        ar: "تقدم البناء",
        fr: "Progrès de Construction",
      },
      description: {
        en: "Latest updates on our ongoing construction projects",
        ar: "آخر التحديثات حول مشاريع البناء الجارية لدينا",
        fr: "Dernières mises à jour sur nos projets de construction en cours",
      },
    },
    {
      image: "/images/Community.webp",
      title: {
        en: "Community Activities",
        ar: "أنشطة المجتمع",
        fr: "Activités Communautaires",
      },
      description: {
        en: "Residents enjoying community events in our developments",
        ar: "السكان يستمتعون بفعاليات المجتمع في مشاريعنا",
        fr: "Les résidents profitent des événements communautaires dans nos développements",
      },
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
            {language === "ar"
              ? "المركز الإعلامي"
              : language === "fr"
              ? "Centre Média"
              : "Media Center"}
          </span>
          <span className="inline-block h-0.5 w-10 bg-primary ml-2 align-middle"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          {language === "ar"
            ? "آخر الأخبار والفعاليات"
            : language === "fr"
            ? "Dernières Nouvelles et Événements"
            : "Latest News & Events"}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === "ar"
            ? "استكشف أحدث الأخبار والأحداث والصور من مشاريعنا"
            : language === "fr"
            ? "Explorez les dernières nouvelles, événements et images de nos projets"
            : "Explore the latest news, events, and images from our projects"}
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
                    alt={
                      language === "ar"
                        ? slide.title.ar
                        : language === "fr"
                        ? slide.title.fr
                        : slide.title.en
                    }
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                    <h3
                      className={`text-2xl font-serif font-bold mb-2 ${
                        isArabic ? "font-arabic text-right" : ""
                      }`}>
                      {language === "ar"
                        ? slide.title.ar
                        : language === "fr"
                        ? slide.title.fr
                        : slide.title.en}
                    </h3>
                    <p
                      className={`text-white/90 ${
                        isArabic ? "font-arabic text-right" : ""
                      }`}>
                      {language === "ar"
                        ? slide.description.ar
                        : language === "fr"
                        ? slide.description.fr
                        : slide.description.en}
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
          <span className="sr-only">
            {language === "ar"
              ? "السابق"
              : language === "fr"
              ? "Précédent"
              : "Previous"}
          </span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-primary/30 text-primary rounded-full"
          onClick={nextSlide}>
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">
            {language === "ar"
              ? "التالي"
              : language === "fr"
              ? "Suivant"
              : "Next"}
          </span>
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
