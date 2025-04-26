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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463877.3180345717!2d46.492192847619044!3d24.725453869018008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1745107935313!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div
        className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 ${
          isArabic ? "font-arabic text-right" : ""
        }`}>
        <div className="p-6 bg-card rounded-lg elegant-card">
          <h3 className="text-xl font-serif font-semibold mb-2">
            {isArabic ? "المقر الرئيسي" : "Headquarters"}
          </h3>
          <p className="text-muted-foreground">
            {isArabic
              ? "شارع الملك فهد، الرياض، المملكة العربية السعودية"
              : "King Fahd Road, Riyadh, Saudi Arabia"}
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg elegant-card">
          <h3 className="text-xl font-serif font-semibold mb-2">
            {isArabic ? "مكتب المبيعات" : "Sales Office"}
          </h3>
          <p className="text-muted-foreground">
            {isArabic
              ? "طريق الملك عبدالله، جدة، المملكة العربية السعودية"
              : "King Abdullah Road, Jeddah, Saudi Arabia"}
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg elegant-card">
          <h3 className="text-xl font-serif font-semibold mb-2">
            {isArabic ? "مركز خدمة العملاء" : "Customer Service Center"}
          </h3>
          <p className="text-muted-foreground">
            {isArabic
              ? "شارع الأمير سلطان، الدمام، المملكة العربية السعودية"
              : "Prince Sultan Road, Dammam, Saudi Arabia"}
          </p>
        </div>
      </div>
    </section>
  );
}
