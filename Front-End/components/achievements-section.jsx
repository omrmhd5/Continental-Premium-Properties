"use client";

import { useLanguage } from "@/context/language-context";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AchievementsSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const partners = [
    {
      name: "Emaar",
      image: "/images/Partners/Emaar.jpg",
    },
    {
      name: "Damac",
      image: "/images/Partners/Damac.jpg",
    },
    {
      name: "Nakheel",
      image: "/images/Partners/Nakheel.jpg",
    },
    {
      name: "Sobha",
      image: "/images/Partners/Sobha.jpg",
    },
    {
      name: "Danube",
      image: "/images/Partners/Danube.jpg",
    },
    {
      name: "Binghatti",
      image: "/images/Partners/Binghatti.jpg",
    },
    {
      name: "Tiger",
      image: "/images/Partners/Tiger.jpg",
    },
    {
      name: "Azizi",
      image: "/images/Partners/Azizi.jpg",
    },
  ];

  return (
    <section className="py-16 my-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gold-gradient opacity-10 rounded-lg"></div>
        <div className="relative py-16 px-4 md:px-8">
          <div className={`text-center mb-12 ${isArabic ? "font-arabic" : ""}`}>
            <div className="inline-block mb-4">
              <span className="inline-block h-0.5 w-10 bg-brand-gold mr-2 align-middle"></span>
              <span className="text-brand-gold text-sm uppercase tracking-wider">
                {isArabic ? "شركاؤنا" : "Our Partners"}
              </span>
              <span className="inline-block h-0.5 w-10 bg-brand-gold ml-2 align-middle"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isArabic ? "شركاؤنا في النجاح" : "Our Success Partners"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isArabic
                ? "نفخر بالعمل مع أفضل الشركات العقارية في المنطقة"
                : "We are proud to work with the region's leading real estate companies"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((partner, index) => (
              <Card
                key={index}
                className="elegant-card bg-card/50 backdrop-blur-sm border-brand-gold/20">
                <CardContent className="flex flex-col items-center p-4">
                  <div className="relative w-32 h-32 mb-3">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 128px, 128px"
                    />
                  </div>
                  <h3 className="text-base font-medium text-center">
                    {partner.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
