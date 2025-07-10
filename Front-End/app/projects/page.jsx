"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/language-context";
import { ArrowLeft, Search, SplitSquareVertical } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SARSymbol } from "@/components/sar-symbol";
import PropertyComparison from "@/components/property-comparison";
import { useAnimation } from "@/hooks/use-animation";
import { projectApi } from "@/lib/api";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize animations
  useAnimation();

  // Load projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectApi.getAllProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    // Check if project matches search term (including location)
    const matchesSearch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.en
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.description?.ar?.includes(searchTerm) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    // Check if project matches status filter
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status options for filter
  const statusOptions = [
    {
      value: "all",
      label:
        language === "ar"
          ? "جميع الحالات"
          : language === "fr"
          ? "Tous les Statuts"
          : "All Statuses",
    },
    {
      value: "off-plan",
      label:
        language === "ar"
          ? "قيد الإنشاء"
          : language === "fr"
          ? "En Construction"
          : "Off Plan",
    },
    {
      value: "secondary",
      label:
        language === "ar"
          ? "ثانوي"
          : language === "fr"
          ? "Secondaire"
          : "Secondary",
    },
    {
      value: "rentals",
      label:
        language === "ar"
          ? "إيجار"
          : language === "fr"
          ? "Locations"
          : "Rentals",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <section className="py-12">
          {/* Page Header */}
          <div
            className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 ${
              isArabic ? "md:flex-row-reverse" : ""
            }`}>
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-brand-gold mb-4">
                {language === "ar" ? (
                  <>
                    {language === "ar"
                      ? "العودة إلى الصفحة الرئيسية"
                      : language === "fr"
                      ? "Retour à l'Accueil"
                      : "Back to Home"}
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </>
                ) : (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {language === "ar"
                      ? "العودة إلى الصفحة الرئيسية"
                      : language === "fr"
                      ? "Retour à l'Accueil"
                      : "Back to Home"}
                  </>
                )}
              </Link>
              <h1
                className={`text-3xl md:text-4xl font-serif font-bold text-brand-gold ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {language === "ar"
                  ? "مشاريعنا"
                  : language === "fr"
                  ? "Nos Projets"
                  : "Our Projects"}
              </h1>
              <p
                className={`text-brand-goldDark mt-2 ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {language === "ar"
                  ? "استكشف جميع مشاريعنا العقارية الفاخرة"
                  : language === "fr"
                  ? "Explorez tous nos projets immobiliers de luxe"
                  : "Explore all our luxury real estate projects"}
              </p>
            </div>

            {/* Compare Properties Button */}
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-gradient-to-r from-brand-gold to-brand-goldDark text-white font-bold border-none"
              onClick={() => setIsComparisonOpen(true)}>
              <SplitSquareVertical
                className={`h-4 w-4 ${isArabic ? "ml-2" : "mr-2"}`}
              />
              {language === "ar"
                ? "مقارنة العقارات"
                : language === "fr"
                ? "Comparer les Propriétés"
                : "Compare Properties"}
            </Button>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 ">
            {/* Search Input */}
            <div className="relative">
              <Search
                className={`absolute ${
                  isArabic ? "right-2.5" : "left-2.5"
                } top-2.5 h-4 w-4 text-muted-foreground`}
              />
              <Input
                placeholder={
                  language === "ar"
                    ? "ابحث بالاسم أو الموقع..."
                    : language === "fr"
                    ? "Rechercher par nom ou emplacement..."
                    : "Search by name or location..."
                }
                className={isArabic ? "pr-8" : "pl-8"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    language === "ar"
                      ? "تصفية حسب الحالة"
                      : language === "fr"
                      ? "Filtrer par statut"
                      : "Filter by status"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="backdrop-blur-sm relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  isArabic={isArabic}
                  index={index}
                />
              ))}
            </div>
          ) : (
            // No Projects Found Message
            <div className="text-center py-12 ">
              <p className={`text-xl ${isArabic ? "font-arabic" : ""}`}>
                {language === "ar"
                  ? "لم يتم العثور على مشاريع"
                  : language === "fr"
                  ? "Aucun projet trouvé"
                  : "No projects found"}
              </p>
              <p
                className={`text-muted-foreground mt-2 ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {language === "ar"
                  ? "يرجى تعديل معايير البحث الخاصة بك"
                  : language === "fr"
                  ? "Veuillez ajuster vos critères de recherche"
                  : "Please adjust your search criteria"}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}>
                {language === "ar"
                  ? "إعادة تعيين الفلاتر"
                  : language === "fr"
                  ? "Réinitialiser les Filtres"
                  : "Reset Filters"}
              </Button>
            </div>
          )}
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

// Reusable Project Card Component
function ProjectCard({ project, isArabic, index }) {
  const { language } = useLanguage();
  return (
    <Card className={`elegant-card overflow-hidden ${(index % 5) + 1}`}>
      {/* Project Image with Status Badge */}
      <div className="relative h-60">
        <Image
          src={project.images?.[0] || "/placeholder.svg?height=400&width=600"}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <Badge status={project.status} isArabic={isArabic} />
        </div>
        {/* Price and Location Display */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1">
          <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
            {project.location}
          </span>
          <div className="flex items-center text-primary font-bold text-lg">
            {project.status === "off-plan" && (
              <span
                className={`text-sm font-normal ${
                  language === "ar" ? "ml-1" : "mr-1"
                }`}>
                {language === "ar"
                  ? "يبدأ من"
                  : language === "fr"
                  ? "À partir de"
                  : "Starting from"}
              </span>
            )}
            <span className="mr-1">AED</span>
            {project.price}
          </div>
          {/* Handover for off-plan projects */}
          {project.status === "off-plan" && project.handover && (
            <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
              <span className="font-semibold">
                {language === "ar"
                  ? "التسليم: "
                  : language === "fr"
                  ? "Livraison: "
                  : "Handover: "}
              </span>
              {project.handover}
            </div>
          )}
        </div>
      </div>

      {/* Project Details */}
      <CardContent
        className={`pt-6 ${isArabic ? "text-right font-arabic" : ""}`}>
        <CardTitle className="mb-2 font-serif">{project.title}</CardTitle>
        <p className="text-muted-foreground">
          {language === "ar"
            ? project.description?.ar
            : language === "fr"
            ? project.description?.fr
            : project.description?.en}
        </p>
      </CardContent>

      {/* View Details Button */}
      <CardFooter
        className={`flex ${
          isArabic ? "justify-start font-arabic" : "justify-end"
        }`}>
        <Link href={`/projects/${project._id}`}>
          <Button
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 hover:text-primary">
            {language === "ar"
              ? "عرض التفاصيل"
              : language === "fr"
              ? "Voir les Détails"
              : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// Badge component for project status
function Badge({ status, isArabic }) {
  const { language } = useLanguage();
  // Map status codes to colors and labels
  let bgColor = "bg-gray-500";
  let label =
    language === "ar" ? "غير معروف" : language === "fr" ? "Inconnu" : "Unknown";

  switch (status) {
    case "off-plan":
      bgColor = "bg-blue-500";
      label =
        language === "ar"
          ? "قيد الإنشاء"
          : language === "fr"
          ? "En Construction"
          : "Off Plan";
      break;
    case "secondary":
      bgColor = "bg-green-500";
      label =
        language === "ar"
          ? "ثانوي"
          : language === "fr"
          ? "Secondaire"
          : "Secondary";
      break;
    case "rentals":
      bgColor = "bg-purple-500";
      label =
        language === "ar"
          ? "إيجار"
          : language === "fr"
          ? "Locations"
          : "Rentals";
      break;
  }

  return (
    <span className={`${bgColor} text-white px-2 py-1 rounded text-sm`}>
      {label}
    </span>
  );
}
