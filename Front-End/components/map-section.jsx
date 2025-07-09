"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/language-context";

export default function MapSection() {
  const mapRef = useRef(null);
  const { language } = useLanguage();
  const isArabic = language === "ar";

  useEffect(() => {
    // This is a placeholder for map initialization
    // In a real implementation, you would use a library like Google Maps, Mapbox, etc.
    if (mapRef.current) {
      const mapElement = mapRef.current;
      mapElement.innerHTML = `
        <div class="bg-muted h-full w-full flex items-center justify-center">
          <p class="text-muted-foreground">${
            isArabic ? "خريطة المواقع" : "Location Map"
          }</p>
        </div>
      `;
    }
  }, [isArabic]);

  return (
    <section className="py-16">
      <div className={`text-center mb-12 ${isArabic ? "font-arabic" : ""}`}>
        <div className="inline-block mb-4">
          <span className="inline-block h-0.5 w-10 bg-primary mr-2 align-middle"></span>
          <span className="text-primary text-sm uppercase tracking-wider">
            {isArabic ? "مواقعنا" : "Our Locations"}
          </span>
          <span className="inline-block h-0.5 w-10 bg-primary ml-2 align-middle"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          {isArabic ? "تواجدنا حول العالم" : "Our Global Presence"}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isArabic
            ? "استكشف مواقع مشاريعنا في جميع أنحاء المدينة"
            : "Explore our project locations throughout the city"}
        </p>
      </div>

      <div className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden elegant-card">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.270752094652!2d55.285065100000004!3d25.1910828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f690035c2cbbb%3A0x41b7a29be60f16fd!2sContinental%20Premium%20Properties%20LLC!5e1!3m2!1sen!2seg!4v1752102626943!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div
        className={`mt-8 grid grid-cols-1 gap-6 ${
          isArabic ? "font-arabic text-right" : ""
        }`}>
        <div className="p-6 bg-card rounded-lg elegant-card">
          <h3 className="text-xl font-serif font-semibold mb-2 text-center">
            {isArabic ? "المقر الرئيسي" : "Headquarters"}
          </h3>
          <p className="text-muted-foreground text-center">
            {isArabic
              ? "2110-B2B Office Tower - Marasi Dr - Business Bay - Dubai"
              : "2110-B2B Office Tower - Marasi Dr - Business Bay - Dubai"}
          </p>
        </div>
      </div>
    </section>
  );
}
