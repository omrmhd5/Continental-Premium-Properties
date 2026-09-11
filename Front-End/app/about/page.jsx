"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { useTranslations } from "next-intl";
import { ArrowLeft, Award, Building, CheckCircle, Users } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const t = useTranslations();

  const values = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: t("about.values.excellence.title"),
      description: t("about.values.excellence.description"),
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: t("about.values.integrity.title"),
      description: t("about.values.integrity.description"),
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: t("about.values.community.title"),
      description: t("about.values.community.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 pt-32">
        <section className="py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-primary mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("about.backToHome")}
              </Link>
              <h1
                className={`text-3xl md:text-4xl font-serif font-bold ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {t("about.title")}
              </h1>
              <p
                className={`text-muted-foreground mt-2 ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {t("about.subtitle")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px] rounded-lg overflow-hidden elegant-card">
              <Image
                src="/images/Ourstory.webp"
                alt={t("about.companyImage")}
                fill
                className="object-cover"
              />
            </div>
            <div className={isArabic ? "text-right font-arabic" : ""}>
              <div className="inline-block mb-4">
                <span className="inline-block h-0.5 w-10 bg-brand-gold mr-2 align-middle"></span>
                <span className="text-brand-gold text-sm uppercase tracking-wider">
                  {t("about.storyLabel")}
                </span>
                <span className="inline-block h-0.5 w-10 bg-brand-gold ml-2 align-middle"></span>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-brand-gold">
                {t("about.storyTitle")}
              </h2>
              <div className="space-y-4 text-muted-foreground whitespace-pre-line">
                <p>{t("about.storyP1")}</p>
                <p>{t("about.storyP2")}</p>
                <p>{t("about.storyP3")}</p>
              </div>
            </div>
          </div>

          <div className={`text-center mb-12 ${isArabic ? "font-arabic" : ""}`}>
            <div className="inline-block mb-4">
              <span className="inline-block h-0.5 w-10 bg-brand-gold mr-2 align-middle"></span>
              <span className="text-brand-gold text-sm uppercase tracking-wider">
                {t("about.valuesLabel")}
              </span>
              <span className="inline-block h-0.5 w-10 bg-brand-gold ml-2 align-middle"></span>
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4 text-brand-gold">
              {t("about.valuesTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("about.valuesIntro")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value, index) => (
              <Card
                key={index}
                className="elegant-card bg-card text-card-foreground">
                <CardContent
                  className={`flex flex-col items-center p-6 text-center ${
                    isArabic ? "font-arabic" : ""
                  }`}>
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-serif font-bold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
