"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Building } from "lucide-react";
import { projectApi } from "@/lib/api";
import { useLanguage } from "@/context/language-context";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const t = useTranslations();
  const [stats, setStats] = useState({
    totalProjects: 0,
    offPlan: 0,
    secondary: 0,
    rentals: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projects = await projectApi.getAllProjects();
        setStats({
          totalProjects: projects.length,
          offPlan: projects.filter((p) => p.status === "off-plan").length,
          secondary: projects.filter((p) => p.status === "secondary").length,
          rentals: projects.filter((p) => p.status === "rentals").length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
              isArabic ? "font-arabic" : ""
            }`}>
            {t("admin.dashboard.title")}
          </h1>
          <p
            className={`text-muted-foreground ${
              isArabic ? "font-arabic" : ""
            }`}>
            {t("admin.dashboard.overview")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/projects">
            <Button
              variant="default"
              size="sm"
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90">
              <Building className="h-4 w-4 mr-2" />
              {t("admin.dashboard.projects")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                isArabic ? "font-arabic" : ""
              }`}>
              {t("admin.dashboard.totalProjects")}
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                isArabic ? "font-arabic" : ""
              }`}>
              {t("admin.dashboard.offPlan")}
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offPlan}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                isArabic ? "font-arabic" : ""
              }`}>
              {t("admin.dashboard.secondary")}
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.secondary}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                isArabic ? "font-arabic" : ""
              }`}>
              {t("admin.dashboard.rentals")}
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rentals}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
