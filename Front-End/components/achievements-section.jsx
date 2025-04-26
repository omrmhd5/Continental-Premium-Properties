"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Home, MapPin, Users } from "lucide-react"

export default function AchievementsSection() {
  const { language } = useLanguage()
  const isArabic = language === "ar"

  const achievements = [
    {
      icon: <MapPin className="h-10 w-10 text-brand-gold" />,
      title: { en: "Developed Area", ar: "المساحة المطورة" },
      value: "2,500,000",
      unit: { en: "m²", ar: "م²" },
    },
    {
      icon: <Users className="h-10 w-10 text-brand-gold" />,
      title: { en: "Residents", ar: "السكان" },
      value: "70,000+",
      unit: { en: "", ar: "" },
    },
    {
      icon: <Building className="h-10 w-10 text-brand-gold" />,
      title: { en: "Buildings Constructed", ar: "المباني المنشأة" },
      value: "1,300+",
      unit: { en: "", ar: "" },
    },
    {
      icon: <Home className="h-10 w-10 text-brand-gold" />,
      title: { en: "Residential Units", ar: "الوحدات السكنية" },
      value: "18,000+",
      unit: { en: "", ar: "" },
    },
  ]

  return (
    <section className="py-16 my-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gold-gradient opacity-10 rounded-lg"></div>
        <div className="relative py-16 px-4 md:px-8">
          <div className={`text-center mb-12 ${isArabic ? "font-arabic" : ""}`}>
            <div className="inline-block mb-4">
              <span className="inline-block h-0.5 w-10 bg-brand-gold mr-2 align-middle"></span>
              <span className="text-brand-gold text-sm uppercase tracking-wider">
                {isArabic ? "إنجازاتنا" : "Our Achievements"}
              </span>
              <span className="inline-block h-0.5 w-10 bg-brand-gold ml-2 align-middle"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isArabic ? "أرقام تتحدث عن نجاحنا" : "Numbers That Speak For Our Success"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isArabic
                ? "نفخر بما حققناه على مدار السنوات"
                : "We take pride in what we've accomplished over the years"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="elegant-card bg-card/50 backdrop-blur-sm border-brand-gold/20">
                <CardContent className={`flex flex-col items-center p-6 ${isArabic ? "font-arabic" : ""}`}>
                  {achievement.icon}
                  <h3 className="mt-4 text-lg font-medium text-muted-foreground">
                    {isArabic ? achievement.title.ar : achievement.title.en}
                  </h3>
                  <p className="mt-2 text-3xl font-bold">
                    {achievement.value}
                    <span className="text-lg ml-1 text-brand-gold">
                      {isArabic ? achievement.unit.ar : achievement.unit.en}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
