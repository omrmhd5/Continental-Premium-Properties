"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  LogOut,
  Building2,
  Landmark,
  Clock,
  DollarSign,
  Building,
} from "lucide-react";
import { projectApi } from "@/lib/api";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const isArabic = language === "ar";
  const [stats, setStats] = useState({
    totalProjects: 0,
    availableProperties: 0,
    availableLands: 0,
    comingSoon: 0,
    forSale: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projects = await projectApi.getAllProjects();
        const stats = {
          totalProjects: projects.length,
          availableProperties: projects.filter(
            (p) => p.status === "available-properties"
          ).length,
          availableLands: projects.filter((p) => p.status === "available-lands")
            .length,
          comingSoon: projects.filter((p) => p.status === "coming").length,
          forSale: projects.filter((p) => p.status === "selling").length,
        };
        setStats(stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
              isArabic ? "font-arabic" : ""
            }`}>
            {isArabic ? "لوحة التحكم" : "Dashboard"}
          </h1>
          <p
            className={`text-muted-foreground ${
              isArabic ? "font-arabic" : ""
            }`}>
            {isArabic
              ? "نظرة عامة على مشاريعك العقارية"
              : "Overview of your real estate projects"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/projects">
            <Button
              variant="default"
              size="sm"
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90">
              <Building className="h-4 w-4 mr-2" />
              {isArabic ? "المشاريع" : "Projects"}
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
              {isArabic ? "إجمالي المشاريع" : "Total Projects"}
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
              {isArabic ? "عقارات متاحة" : "Available Properties"}
            </CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.availableProperties}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                isArabic ? "font-arabic" : ""
              }`}>
              {isArabic ? "أراضي متاحة" : "Available Lands"}
            </CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableLands}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                isArabic ? "font-arabic" : ""
              }`}>
              {isArabic ? "قريباً" : "Coming Soon"}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.comingSoon}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                isArabic ? "font-arabic" : ""
              }`}>
              {isArabic ? "للبيع" : "For Sale"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.forSale}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
