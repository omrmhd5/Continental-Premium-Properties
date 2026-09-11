"use client";

import { useState, useEffect, memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { projectApi } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/config";

// Memoized Project Card Component for better performance
const ProjectCard = memo(function ProjectCard({ project, isArabic, index }) {
  const t = useTranslations();
  return (
    <Card
      className={`elegant-card overflow-hidden ${
        index + 1
      } bg-card text-card-foreground`}>
      {/* Project Image */}
      <div className="relative h-60">
        <Image
          src={resolveMediaUrl(project.images?.[0])}
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
                {t("status.startingFrom")}
              </span>
            )}
            <span className="mr-1">AED</span>
            {project.price}
          </div>
          {/* Handover for off-plan projects */}
          {project.status === "off-plan" && project.handover && (
            <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
              <span className="font-semibold">
                {t("projectDetails.handover")}: 
              </span>
              {project.handover}
            </div>
          )}
        </div>
      </div>

      {/* Project Details */}
      <CardContent
        className={`pt-6 ${isArabic ? "text-right font-arabic" : ""}`}>
        <CardTitle className="mb-2 font-bold text-foreground">
          {typeof project.title === "object"
            ? isArabic
              ? project.title.ar
              : project.title.en
            : project.title}
        </CardTitle>
        <p className="text-muted-foreground line-clamp-2">
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
            className="bg-gradient-to-r from-brand-gold to-brand-goldDark text-white font-bold border-none">
            {t("projects.viewDetails")}
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
          ? "bg-brand-gold text-white hover:bg-brand-gold/90"
          : "border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold"
      }`}>
      {label}
    </Button>
  );
});

function ProjectsSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const t = useTranslations();
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
    { value: "all", label: t("projects.filterAll") },
    {
      value: "buy",
      label: t("projects.filterBuy"),
    },
    { value: "rentals", label: t("status.rentals") },
  ];

  // Memoize filter change handler
  const handleFilterChange = useCallback((value) => {
    setActiveFilter(value);
  }, []);

  // Only show 3 projects on the homepage
  const filteredProjects =
    activeFilter === "all"
      ? projects.slice(0, 3)
      : activeFilter === "buy"
        ? projects
            .filter(
              (project) =>
                project.status === "off-plan" || project.status === "secondary",
            )
            .slice(0, 3)
        : projects
            .filter((project) => project.status === activeFilter)
            .slice(0, 3);

  return (
    <section className="py-16 bg-background" id="projects">
      {/* Section Header */}
      <div className={`text-center mb-12 ${isArabic ? "font-arabic" : ""}`}>
        <div className="inline-block mb-4">
          <span className="inline-block h-0.5 w-10 bg-brand-gold mr-2 align-middle"></span>
          <span className="text-brand-gold text-sm uppercase tracking-wider">
            {t("projects.label")}
          </span>
          <span className="inline-block h-0.5 w-10 bg-brand-gold ml-2 align-middle"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          {t("projects.exploreLuxury")}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("projects.diverseRange")}
        </p>
      </div>

      {/* Filter Buttons */}
      <div
        className={`flex flex-wrap gap-3 justify-center mb-10 ${
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

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-muted rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : filteredProjects.length > 0 ? (
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {t("projects.noneAvailable")}
          </p>
        </div>
      )}

      {/* View All Projects Button */}
      <div className="flex justify-center mt-12">
        <Link href="/projects">
          <Button className="bg-gradient-to-r from-brand-gold to-brand-goldDark text-white group">
            {t("projects.viewAll")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default memo(ProjectsSection);
