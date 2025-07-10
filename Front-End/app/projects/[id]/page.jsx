"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Share2,
  Home,
  Bed,
  Bath,
  Ruler,
  Building,
  SplitSquareVertical,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SARSymbol } from "@/components/sar-symbol";
import PropertyComparison from "@/components/property-comparison";
import { projectApi } from "@/lib/api";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Fetch project data from API
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const data = await projectApi.getProjectById(id);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Image slideshow navigation
  const nextSlide = () => {
    if (project?.images) {
      setCurrentSlide((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (project?.images) {
      setCurrentSlide((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  // Share project functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `Check out this property: ${project.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Project not found state
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-serif mb-4">Project not found</h1>
        <Link href="/projects">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <section className="py-12">
          {/* Project Header */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-primary mb-4">
              {isArabic ? (
                <>
                  {isArabic ? "العودة إلى المشاريع" : "Back to Projects"}
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </>
              ) : (
                <>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {isArabic ? "العودة إلى المشاريع" : "Back to Projects"}
                </>
              )}
            </Link>
            <h1
              className={`text-3xl md:text-4xl font-serif font-bold ${
                isArabic ? "font-arabic" : ""
              }`}>
              {project.title}
            </h1>
            <div
              className={`flex items-center mt-2 ${
                isArabic ? "flex-row-reverse" : ""
              }`}>
              <div className="text-muted-foreground">
                <span className="inline-flex items-center">
                  <Building
                    className={`h-4 w-4 ${isArabic ? "ml-1" : "mr-1"}`}
                  />
                  {project.location}
                </span>
              </div>
              <div className={`${isArabic ? "mr-auto" : "ml-auto"} flex gap-2`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsComparisonOpen(true)}>
                  <SplitSquareVertical
                    className={`h-4 w-4 ${isArabic ? "ml-2" : "mr-2"}`}
                  />
                  {isArabic ? "مقارنة" : "Compare"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className={`h-4 w-4 ${isArabic ? "ml-2" : "mr-2"}`} />
                  {isArabic ? "مشاركة" : "Share"}
                </Button>
              </div>
            </div>
          </div>

          {/* Project Photos Slideshow */}
          <div className="relative mb-8 rounded-lg overflow-hidden elegant-card">
            <div className="relative aspect-[16/9]">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {project.images.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slideshow Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-primary/30 text-primary rounded-full"
              onClick={prevSlide}>
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">
                {isArabic ? "السابق" : "Previous"}
              </span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-primary/30 text-primary rounded-full"
              onClick={nextSlide}>
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">{isArabic ? "التالي" : "Next"}</span>
            </Button>

            {/* Slideshow Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-primary" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}>
                  <span className="sr-only">{`Slide ${index + 1}`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Description and Features */}
            <div className="md:col-span-2">
              {/* Project Description */}
              <Card className="elegant-card mb-8">
                <CardContent className="p-6">
                  <h2
                    className={`text-2xl font-serif font-bold mb-4 ${
                      isArabic ? "font-arabic" : ""
                    }`}>
                    {isArabic ? "وصف المشروع" : "Project Description"}
                  </h2>
                  <p
                    className={`text-muted-foreground ${
                      isArabic ? "font-arabic" : ""
                    }`}>
                    {isArabic ? project.description.ar : project.description.en}
                  </p>
                </CardContent>
              </Card>

              {/* Project Features */}
              <Card className="elegant-card">
                <CardContent className="p-6">
                  <h2
                    className={`text-2xl font-serif font-bold mb-4 ${
                      isArabic ? "font-arabic" : ""
                    }`}>
                    {isArabic ? "المميزات" : "Features"}
                  </h2>
                  <ul
                    className={`grid grid-cols-2 gap-4 ${
                      isArabic ? "font-arabic" : ""
                    }`}>
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full bg-primary ${
                            isArabic ? "ml-2" : "mr-2"
                          }`}></div>
                        <span>{isArabic ? feature.ar : feature.en}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Property Details and Price */}
            <div>
              {/* Property Specifications */}
              <Card className="elegant-card mb-8">
                <CardContent className="p-6">
                  <h2
                    className={`text-2xl font-serif font-bold mb-4 ${
                      isArabic ? "font-arabic" : ""
                    }`}>
                    {isArabic ? "التفاصيل" : "Details"}
                  </h2>
                  <div className="space-y-4">
                    {/* Area */}
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <div className="flex items-center">
                        <Ruler
                          className={`h-5 w-5 text-primary ${
                            isArabic ? "ml-2" : "mr-2"
                          }`}
                        />
                        <span className={isArabic ? "font-arabic" : ""}>
                          {isArabic ? "المساحة" : "Area"}
                        </span>
                      </div>
                      <span className="font-medium">{project.area} m²</span>
                    </div>

                    {/* Bedrooms */}
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <div className="flex items-center">
                        <Bed
                          className={`h-5 w-5 text-primary ${
                            isArabic ? "ml-2" : "mr-2"
                          }`}
                        />
                        <span className={isArabic ? "font-arabic" : ""}>
                          {isArabic ? "غرف النوم" : "Bedrooms"}
                        </span>
                      </div>
                      <span className="font-medium">{project.bedrooms}</span>
                    </div>

                    {/* Bathrooms */}
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <div className="flex items-center">
                        <Bath
                          className={`h-5 w-5 text-primary ${
                            isArabic ? "ml-2" : "mr-2"
                          }`}
                        />
                        <span className={isArabic ? "font-arabic" : ""}>
                          {isArabic ? "الحمامات" : "Bathrooms"}
                        </span>
                      </div>
                      <span className="font-medium">{project.bathrooms}</span>
                    </div>

                    {/* Floors */}
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <div className="flex items-center">
                        <Home
                          className={`h-5 w-5 text-primary ${
                            isArabic ? "ml-2" : "mr-2"
                          }`}
                        />
                        <span className={isArabic ? "font-arabic" : ""}>
                          {isArabic ? "الطوابق" : "Floors"}
                        </span>
                      </div>
                      <span className="font-medium">{project.floors}</span>
                    </div>

                    {/* Handover - Only for off-plan projects */}
                    {project.status === "off-plan" && project.handover && (
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <div className="flex items-center">
                          <Calendar
                            className={`h-5 w-5 text-primary ${
                              isArabic ? "ml-2" : "mr-2"
                            }`}
                          />
                          <span className={isArabic ? "font-arabic" : ""}>
                            {isArabic ? "التسليم" : "Handover"}
                          </span>
                        </div>
                        <span className="font-medium">{project.handover}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Price and Contact */}
              <Card className="elegant-card">
                <CardContent className="p-6">
                  <h2
                    className={`text-2xl font-serif font-bold mb-4 ${
                      isArabic ? "font-arabic" : ""
                    }`}>
                    {isArabic ? "السعر" : "Price"}
                  </h2>
                  <div className="flex items-center justify-center text-3xl font-bold text-primary">
                    {project.status === "off-plan" && (
                      <span
                        className={`text-lg font-normal ${
                          isArabic ? "ml-2" : "mr-2"
                        }`}>
                        {isArabic ? "يبدأ من" : "Starting from"}
                      </span>
                    )}
                    <span className="mr-2">AED</span>
                    {project.price}
                  </div>

                  {/* Handover - Prominent display for off-plan projects */}
                  {project.status === "off-plan" && project.handover && (
                    <div className="mt-4 text-center">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span
                            className={`text-lg font-semibold text-primary ${
                              isArabic ? "font-arabic" : ""
                            }`}>
                            {isArabic ? "التسليم" : "Handover"}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {project.handover}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <Button className="w-full">
                      {isArabic ? "تواصل معنا" : "Contact Us"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Property Comparison Modal */}
      {isComparisonOpen && (
        <PropertyComparison onClose={() => setIsComparisonOpen(false)} />
      )}
    </div>
  );
}
