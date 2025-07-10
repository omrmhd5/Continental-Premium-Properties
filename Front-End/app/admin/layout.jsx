"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Building, LayoutDashboard, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/logo";
import { useLanguage } from "@/context/language-context";
import { ErrorPopup } from "@/components/error-popup";
import LanguageSwitcher from "@/components/language-switcher";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    description: "",
  });
  const { language, setLanguage } = useLanguage();
  const isArabic = language === "ar";

  useEffect(() => {
    setIsClient(true);
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    if (!token && pathname !== "/admin/login") {
      setErrorMessage({
        title: "Session Expired",
        description: "Your session has expired. Please log in again.",
      });
      setShowErrorPopup(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  // Don't render the layout for the login page
  if (pathname === "/admin/login" || !isClient) {
    return <>{children}</>;
  }

  // Update the navItems array to include only projects
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Building, label: "Projects", href: "/admin/projects" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-brand-gold/10 bg-card/50 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="p-4">
            <Logo variant="full" className="h-8 w-auto" />
          </div>
          <Separator className="my-2" />
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <Button
                      variant={pathname === item.href ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        pathname === item.href
                          ? "bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
                          : "hover:text-brand-gold hover:bg-brand-gold/10"
                      }`}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 mt-auto"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <nav className="sticky top-0 z-50 h-16 flex items-center justify-between px-4 bg-background/80 backdrop-blur-sm shadow-lg border-b border-brand-gold/20">
          <div className="md:hidden">
            <Logo variant="icon" className="h-8 w-auto pb-12" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <LanguageSwitcher />
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
                <Home className="h-4 w-4 mr-2" />
                {language === "ar"
                  ? "الصفحة الرئيسية"
                  : language === "fr"
                  ? "Page d'Accueil"
                  : "Homepage"}
              </Button>
            </Link>

            <Button
              variant="outline"
              className=" border-brand-gold/20 hover:bg-brand-gold/10 hover:text-brand-gold"
              onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {language === "ar"
                ? "تسجيل الخروج"
                : language === "fr"
                ? "Déconnexion"
                : "Logout"}
            </Button>
            <ThemeToggle />
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Error Popup */}
      <ErrorPopup
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        title={errorMessage.title}
        description={errorMessage.description}
        isTokenError={true}
      />
    </div>
  );
}
