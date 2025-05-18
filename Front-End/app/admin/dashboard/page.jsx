"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [projectCount, setProjectCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">
            Projects Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your real estate projects.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start mr-2 border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
              <Home className="h-4 w-4 mr-2" />
              Homepage
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start mr-2 border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="elegant-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Building className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
            <p className="text-xs text-muted-foreground">
              Active projects in your portfolio
            </p>
            <div className="mt-4">
              <Link href="/admin/projects">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-bold px-8 py-6 text-lg">
                  Manage Projects
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for project management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/projects" className="block">
              <Button
                variant="outline"
                className="w-full justify-start mr-2 border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
                <Building className="mr-2 h-4 w-4" />
                View All Projects
              </Button>
            </Link>
            <Link href="/projects" className="block">
              <Button
                variant="outline"
                className="w-full justify-start mr-2 border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
                <Home className="mr-2 h-4 w-4" />
                View Public Projects Page
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
