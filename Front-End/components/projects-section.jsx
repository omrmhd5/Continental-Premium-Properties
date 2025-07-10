"use client";

import { useState, useEffect, memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { ArrowRight } from "lucide-react";
import { projectApi } from "@/lib/api";

// Memoized Project Card Component for better performance
const ProjectCard = memo(function ProjectCard({ project, isArabic, index }) {
  return (
    <Card className={`elegant-card overflow-hidden ${index + 1}`}>
      {/* Project Image */}
      <div className="relative h-60">
        <Image
          src={project.images?.[0] || "/placeholder.svg?height=400&width=600"}
          alt={
            typeof project.title === "object"
              ? isArabic
                ? project.title.ar
                : project.title.en
              : project.title
          }
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Price and Handover Overlay */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1">
          <div className="flex items-center text-white font-bold text-lg">
            {project.status === "off-plan" && (
              <span
                className={`text-sm font-normal ${isArabic ? "ml-1" : "mr-1"}`}>
                {isArabic ? "يبدأ من" : "Starting from"}
              </span>
            )}
            <span className="mr-1">AED</span>
            {project.price}
          </div>
          {/* Handover for off-plan projects */}
          {project.status === "off-plan" && project.handover && (
            <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
              <span className="font-semibold">
                {isArabic ? "التسليم: " : "Handover: "}
              </span>
              {project.handover}
            </div>
          )}
        </div>
      </div>

      {/* Project Details */}
      <CardContent
        className={`pt-6 ${isArabic ? "text-right font-arabic" : ""}`}>
        <CardTitle className="mb-2 font-bold">
          {typeof project.title === "object"
            ? isArabic
              ? project.title.ar
              : project.title.en
            : project.title}
        </CardTitle>
        <p className="text-muted-foreground">
          {typeof project.description === "object"
            ? isArabic
              ? project.description.ar
              : project.description.en
            : project.description}
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
            className="border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
            {isArabic ? "عرض التفاصيل" : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
});

// Filter Button Component
const FilterButton = memo(function FilterButton({
  value,
  label,
  activeFilter,
  onClick,
  isArabic,
}) {
  return (
    <Button
      variant={activeFilter === value ? "default" : "outline"}
      onClick={onClick}
      className={`min-w-[100px] ${
        activeFilter === value
          ? "bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
          : "border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold"
      }`}>
      {isArabic ? label.ar : label.en}
    </Button>
  );
});

function ProjectsSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);
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

  // Filter definitions
  const filters = [
    { value: "all", label: { en: "All", ar: "الكل" } },
    {
      value: "off-plan",
      label: { en: "Off Plan", ar: "قيد الإنشاء" },
    },
    {
      value: "secondary",
      label: { en: "Secondary", ar: "ثانوي" },
    },
    { value: "rentals", label: { en: "Rentals", ar: "إيجار" } },
  ];

  // Memoize filter change handler
  const handleFilterChange = useCallback((value) => {
    setActiveFilter(value);
  }, []);

  // Only show 3 projects on the homepage
  const filteredProjects =
    activeFilter === "all"
      ? projects.slice(0, 3)
      : projects
          .filter((project) => project.status === activeFilter)
          .slice(0, 3);

  return (
    <section className="py-16" id="projects">
      {/* Section Header */}
      <div className={`text-center mb-12 ${isArabic ? "font-arabic" : ""}`}>
        <div className="inline-block mb-4 fade-in">
          <span className="inline-block h-0.5 w-10 bg-brand-gold mr-2 align-middle"></span>
          <span className="text-brand-gold text-sm uppercase tracking-wider">
            {isArabic ? "مشاريعنا" : "Our Projects"}
          </span>
          <span className="inline-block h-0.5 w-10 bg-brand-gold ml-2 align-middle"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">
          {isArabic ? "استكشف مشاريعنا الفاخرة" : "Explore Our Luxury Projects"}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto fade-in-up stagger-delay-1">
          {isArabic
            ? "استكشف مجموعة متنوعة من المشاريع السكنية الفاخرة لدينا"
            : "Explore our diverse range of luxury residential projects"}
        </p>
      </div>

      {/* Filter Buttons */}
      <div
        className={`flex flex-wrap gap-3 justify-center mb-10 fade-in-up stagger-delay-2 ${
          isArabic ? "flex-row-reverse font-arabic" : ""
        }`}>
        {filters.map((filter) => (
          <FilterButton
            key={filter.value}
            value={filter.value}
            label={filter.label}
            activeFilter={activeFilter}
            onClick={() => handleFilterChange(filter.value)}
            isArabic={isArabic}
          />
        ))}
      </div>

      {/* Projects Grid - Only 3 projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              isArabic={isArabic}
              index={index}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-12 fade-in">
            <p className={`text-xl ${isArabic ? "font-arabic" : ""}`}>
              {isArabic ? "لم يتم العثور على مشاريع" : "No projects found"}
            </p>
          </div>
        )}
      </div>

      {/* View All Projects Button */}
      <div className="flex justify-center mt-12 fade-in-up stagger-delay-5">
        <Link href="/projects">
          <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy group">
            {isArabic ? "عرض جميع المشاريع" : "View All Projects"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default memo(ProjectsSection);
