"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/language-context";
import { X, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
// Make sure the import is correct
import { SARSymbol } from "@/components/sar-symbol";
import Link from "next/link";
import { projectApi } from "@/lib/api";

// Memoized comparison row component
const ComparisonRow = memo(function ComparisonRow({
  label,
  value1,
  value2,
  comparison,
  isArabic,
}) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-border">
      <div className={`font-medium ${isArabic ? "font-arabic" : ""}`}>
        {label}
      </div>
      <div
        className={`text-center ${
          comparison === "greater" ? "text-green-500 font-bold" : ""
        }`}>
        {value1}
        {comparison === "greater" && <Check className="inline ml-1 h-4 w-4" />}
      </div>
      <div
        className={`text-center ${
          comparison === "less" ? "text-green-500 font-bold" : ""
        }`}>
        {value2}
        {comparison === "less" && <Check className="inline ml-1 h-4 w-4" />}
      </div>
    </div>
  );
});

function PropertyComparison({ onClose }) {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [projects, setProjects] = useState([]);
  const [selectedProject1, setSelectedProject1] = useState(null);
  const [selectedProject2, setSelectedProject2] = useState(null);
  const [project1, setProject1] = useState(null);
  const [project2, setProject2] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Set project1 when selectedProject1 changes
  useEffect(() => {
    if (selectedProject1) {
      const found = projects.find((p) => p._id === selectedProject1);
      setProject1(found || null);
    } else {
      setProject1(null);
    }
  }, [selectedProject1, projects]);

  // Set project2 when selectedProject2 changes
  useEffect(() => {
    if (selectedProject2) {
      const found = projects.find((p) => p._id === selectedProject2);
      setProject2(found || null);
    } else {
      setProject2(null);
    }
  }, [selectedProject2, projects]);

  // Helper function to compare values
  const compareValues = useCallback((value1, value2) => {
    if (!value1 || !value2) return "equal";
    const num1 =
      typeof value1 === "string"
        ? Number.parseInt(value1.replace(/,/g, "")) || 0
        : value1;
    const num2 =
      typeof value2 === "string"
        ? Number.parseInt(value2.replace(/,/g, "")) || 0
        : value2;
    if (num1 === num2) return "equal";
    if (num1 > num2) return "greater";
    return "less";
  }, []);

  // Handle view details click - close the modal
  const handleViewDetails = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-auto elegant-card border-brand-gold/20">
        {/* Comparison Modal Header */}
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle
            className={`text-2xl font-bold ${isArabic ? "font-arabic" : ""}`}>
            {language === "ar"
              ? "مقارنة العقارات"
              : language === "fr"
              ? "Comparaison de Propriétés"
              : "Property Comparison"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          {/* Property Selection Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={`block mb-2 ${isArabic ? "font-arabic" : ""}`}>
                {language === "ar"
                  ? "العقار الأول"
                  : language === "fr"
                  ? "Première Propriété"
                  : "First Property"}
              </label>
              <Select
                value={selectedProject1}
                onValueChange={setSelectedProject1}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      language === "ar"
                        ? "اختر عقار"
                        : language === "fr"
                        ? "Sélectionner une propriété"
                        : "Select a property"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={`p1-${project._id}`} value={project._id}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={`block mb-2 ${isArabic ? "font-arabic" : ""}`}>
                {language === "ar"
                  ? "العقار الثاني"
                  : language === "fr"
                  ? "Deuxième Propriété"
                  : "Second Property"}
              </label>
              <Select
                value={selectedProject2}
                onValueChange={setSelectedProject2}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      language === "ar"
                        ? "اختر عقار"
                        : language === "fr"
                        ? "Sélectionner une propriété"
                        : "Select a property"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={`p2-${project._id}`} value={project._id}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {project1 && project2 ? (
            <>
              {/* Property Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={
                      project1.images?.[0] ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={project1.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">
                      {project1.title}
                    </h3>
                  </div>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={
                      project2.images?.[0] ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={project2.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">
                      {project2.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="space-y-4">
                <ComparisonRow
                  label={
                    language === "ar"
                      ? "السعر"
                      : language === "fr"
                      ? "Prix"
                      : "Price"
                  }
                  value1={
                    <div className="flex items-center justify-center">
                      <span className="mr-1">AED</span>
                      {project1.price}
                    </div>
                  }
                  value2={
                    <div className="flex items-center justify-center">
                      <span className="mr-1">AED</span>
                      {project2.price}
                    </div>
                  }
                  comparison={compareValues(
                    Number.parseInt(project1.price?.replace(/,/g, "")) || 0,
                    Number.parseInt(project2.price?.replace(/,/g, "")) || 0
                  )}
                  isArabic={isArabic}
                />

                <ComparisonRow
                  label={
                    language === "ar"
                      ? "المساحة"
                      : language === "fr"
                      ? "Surface"
                      : "Area"
                  }
                  value1={`${project1.area || 0} ft²`}
                  value2={`${project2.area || 0} ft²`}
                  comparison={null}
                  isArabic={isArabic}
                />

                <ComparisonRow
                  label={
                    language === "ar"
                      ? "غرف النوم"
                      : language === "fr"
                      ? "Chambres"
                      : "Bedrooms"
                  }
                  value1={project1.bedrooms || ""}
                  value2={project2.bedrooms || ""}
                  comparison={null}
                  isArabic={isArabic}
                />

                <ComparisonRow
                  label={
                    language === "ar"
                      ? "الحمامات"
                      : language === "fr"
                      ? "Salles de Bain"
                      : "Bathrooms"
                  }
                  value1={project1.bathrooms || ""}
                  value2={project2.bathrooms || ""}
                  comparison={null}
                  isArabic={isArabic}
                />

                <ComparisonRow
                  label={
                    language === "ar"
                      ? "الطوابق"
                      : language === "fr"
                      ? "Étages"
                      : "Floors"
                  }
                  value1={project1.floors || ""}
                  value2={project2.floors || ""}
                  comparison={null}
                  isArabic={isArabic}
                />

                {/* Handover - Only show if both projects are off-plan and have handover dates */}
                {project1.status === "off-plan" &&
                  project2.status === "off-plan" && (
                    <ComparisonRow
                      label={
                        language === "ar"
                          ? "التسليم"
                          : language === "fr"
                          ? "Livraison"
                          : "Handover"
                      }
                      value1={project1.handover || "N/A"}
                      value2={project2.handover || "N/A"}
                      comparison="text"
                      isArabic={isArabic}
                    />
                  )}

                <ComparisonRow
                  label={
                    language === "ar"
                      ? "الموقع"
                      : language === "fr"
                      ? "Emplacement"
                      : "Location"
                  }
                  value1={project1.location}
                  value2={project2.location}
                  comparison="text"
                  isArabic={isArabic}
                />

                <ComparisonRow
                  label={
                    language === "ar"
                      ? "الحالة"
                      : language === "fr"
                      ? "Statut"
                      : "Status"
                  }
                  value1={getStatusLabel(project1.status, isArabic, language)}
                  value2={getStatusLabel(project2.status, isArabic, language)}
                  comparison="text"
                  isArabic={isArabic}
                />
              </div>

              {/* View Details Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Button
                  variant="outline"
                  className="w-full border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold"
                  onClick={handleViewDetails}
                  asChild>
                  <Link href={`/projects/${project1._id}`}>
                    {isArabic ? "عرض التفاصيل" : "View Details"}
                    {isArabic ? (
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    ) : (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold"
                  onClick={handleViewDetails}
                  asChild>
                  <Link href={`/projects/${project2._id}`}>
                    {isArabic ? "عرض التفاصيل" : "View Details"}
                    {isArabic ? (
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    ) : (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div
              className={`text-center py-12 ${isArabic ? "font-arabic" : ""}`}>
              <p className="text-muted-foreground">
                {isArabic
                  ? "يرجى اختيار عقارين للمقارنة"
                  : "Please select two properties to compare"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to get status label based on status code
function getStatusLabel(status, isArabic, language) {
  switch (status) {
    case "off-plan":
      return language === "ar"
        ? "قيد الإنشاء"
        : language === "fr"
        ? "En Construction"
        : "Off Plan";
    case "secondary":
      return language === "ar"
        ? "ثانوي"
        : language === "fr"
        ? "Secondaire"
        : "Secondary";
    case "rentals":
      return language === "ar"
        ? "إيجار"
        : language === "fr"
        ? "Locations"
        : "Rentals";
    default:
      return status;
  }
}

export default memo(PropertyComparison);
