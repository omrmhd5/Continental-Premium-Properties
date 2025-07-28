"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/language-context";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MediaPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems = [
    {
      id: 1,
      title: { en: "New Luxury Project Launch", ar: "إطلاق مشروع فاخر جديد" },
      date: "2023-12-15",
      image: "/images/Luxury.webp",
      content: {
        en: "We are excited to announce the launch of our newest luxury residential project in Dubai, featuring state-of-the-art amenities and modern design.",
        ar: "يسرنا أن نعلن عن إطلاق أحدث مشروع سكني فاخر لدينا في دبي، والذي يتميز بمرافق حديثة وتصميم عصري.",
      },
    },
    {
      id: 2,
      title: { en: "Completion of Sky Towers", ar: "الانتهاء من أبراج سكاي" },
      date: "2023-11-20",
      image: "/images/Skytowers.webp",
      content: {
        en: "We are proud to announce the successful completion of the Sky Towers project, ahead of schedule and with exceptional quality standards.",
        ar: "نحن فخورون بالإعلان عن الانتهاء الناجح من مشروع أبراج سكاي، قبل الموعد المحدد وبمعايير جودة استثنائية.",
      },
    },
    {
      id: 3,
      title: {
        en: "Annual Real Estate Exhibition",
        ar: "معرض العقارات السنوي",
      },
      date: "2023-10-05",
      image: "/images/Exhibition.webp",
      content: {
        en: "Join us at the Annual Real Estate Exhibition where we will showcase our latest projects and offer exclusive deals for attendees.",
        ar: "انضموا إلينا في معرض العقارات السنوي حيث سنعرض أحدث مشاريعنا ونقدم عروضًا حصرية للحاضرين.",
      },
    },
  ];

  const videos = [
    {
      id: 1,
      title: {
        en: "Dubai’s Most Premium Master Community",
        ar: "أرقى مجمع سكني متكامل في دبي",
      },
      videoId: "-MncVWVfVPY",
    },
    {
      id: 2,
      title: {
        en: "DAMAC Chelsea's Residence",
        ar: "إقامة داماك تشيلسي",
      },
      videoId: "gH31-9BqI7k",
    },
    {
      id: 3,
      title: {
        en: "Bugatti Residences by Binghatti",
        ar: "إقامات بوجاتي من بن غاطي",
      },
      videoId: "9yoJAWPtNhA",
    },
  ];

  const photos = [
    {
      id: 1,
      title: { en: "Project Launch Event", ar: "حدث إطلاق المشروع" },
      image: "/images/Event.webp",
    },
    {
      id: 2,
      title: { en: "Skyline Living", ar: "الحياة في ناطحات السحاب" },
      image: "/images/Skyline.webp",
    },
    {
      id: 3,
      title: { en: "Community Activities", ar: "أنشطة المجتمع" },
      image: "/images/Community.webp",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <section className="py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-primary mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "ar"
                  ? "العودة إلى الصفحة الرئيسية"
                  : language === "fr"
                  ? "Retour à l'Accueil"
                  : "Back to Home"}
              </Link>
              <h1
                className={`text-3xl md:text-4xl font-serif font-bold ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {language === "ar"
                  ? "المركز الإعلامي"
                  : language === "fr"
                  ? "Centre Média"
                  : "Media Center"}
              </h1>
              <p
                className={`text-muted-foreground mt-2 ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {language === "ar"
                  ? "استكشف أحدث الأخبار والفعاليات والصور من مشاريعنا"
                  : language === "fr"
                  ? "Explorez les dernières nouvelles, événements et images de nos projets"
                  : "Explore the latest news, events, and images from our projects"}
              </p>
            </div>
          </div>

          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="news"
                className="
      inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                {language === "ar"
                  ? "الأخبار"
                  : language === "fr"
                  ? "Actualités"
                  : "News"}
              </TabsTrigger>
              <TabsTrigger value="videos">
                {language === "ar"
                  ? "الفيديوهات"
                  : language === "fr"
                  ? "Vidéos"
                  : "Videos"}
              </TabsTrigger>
              <TabsTrigger value="gallery">
                {language === "ar"
                  ? "معرض الصور"
                  : language === "fr"
                  ? "Galerie Photos"
                  : "Photo Gallery"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="news" className="space-y-8">
              {newsItems.map((item) => (
                <Card key={item.id} className="elegant-card overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="relative h-60 md:h-full">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={isArabic ? item.title.ar : item.title.en}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`p-6 md:col-span-2 ${
                        isArabic ? "text-right font-arabic" : ""
                      }`}>
                      <div className="flex items-center gap-2 text-primary text-sm mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(item.date).toLocaleDateString(
                            isArabic ? "ar-SA" : "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-4">
                        {isArabic ? item.title.ar : item.title.en}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {isArabic ? item.content.ar : item.content.en}
                      </p>
                      <Button
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10 hover:text-primary">
                        {language === "ar"
                          ? "اقرأ المزيد"
                          : language === "fr"
                          ? "Lire Plus"
                          : "Read More"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="videos" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <a
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block">
                    <Card className="elegant-card overflow-hidden hover:scale-105 transition-transform duration-300">
                      <div className="relative h-48">
                        <Image
                          src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                          alt={isArabic ? video.title.ar : video.title.en}
                          fill
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <CardContent
                        className={`pt-4 ${
                          isArabic ? "text-right font-arabic" : ""
                        }`}>
                        <h3 className="font-serif font-bold">
                          {isArabic ? video.title.ar : video.title.en}
                        </h3>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gallery">
              <div className="relative">
                <div className="overflow-hidden rounded-lg shadow-lg elegant-card">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}>
                    {photos.map((photo, index) => (
                      <div
                        key={index}
                        className="w-full flex-shrink-0 relative">
                        <div className="relative aspect-[16/9]">
                          <Image
                            src={photo.image || "/placeholder.svg"}
                            alt={isArabic ? photo.title.ar : photo.title.en}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                            <h3
                              className={`text-2xl font-serif font-bold mb-2 ${
                                isArabic ? "font-arabic text-right" : ""
                              }`}>
                              {isArabic ? photo.title.ar : photo.title.en}
                            </h3>
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
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      }`}
                      onClick={() => setCurrentSlide(index)}>
                      <span className="sr-only">{`Slide ${index + 1}`}</span>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <Footer />
      </div>
    </div>
  );
}
