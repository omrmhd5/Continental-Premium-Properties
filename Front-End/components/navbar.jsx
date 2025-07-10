"use client";

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

// Memoized NavItem component for better performance
const NavItem = memo(function NavItem({ href, name, pathname, onClick }) {
  return (
    <Link
      href={href}
      className={`text-base font-medium transition-colors hover:text-brand-gold ${
        pathname === href ? "text-brand-gold" : "text-brand-gold"
      }`}
      onClick={onClick}>
      {name}
    </Link>
  );
});

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const isArabic = language === "ar";

  // Memoize toggle handler for better performance
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Toggle language
  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "ar" : "en");
  }, [language, setLanguage]);

  // Navigation items
  const navItems = [
    { name: isArabic ? "الرئيسية" : "Home", href: "/" },
    { name: isArabic ? "المشاريع" : "Projects", href: "/projects" },
    { name: isArabic ? "المركز الإعلامي" : "Media Center", href: "/media" },
    { name: isArabic ? "من نحن" : "About Us", href: "/about" },
    { name: isArabic ? "اتصل بنا" : "Contact Us", href: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-2xl border-b border-border">
      <nav
        className={`container mx-auto px-4 py-4 ${
          isArabic ? "font-arabic text-right" : ""
        }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo variant="full" className={isArabic ? "ml-auto" : ""} />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none text-brand-gold">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div
            className={`hidden md:flex md:items-center md:gap-8 ${
              isArabic ? "flex-row-reverse mr-auto" : "ml-auto"
            }`}>
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                name={item.name}
                pathname={pathname}
              />
            ))}

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-sm hover:bg-primary/10 hover:text-primary">
              {language === "en" ? "العربية" : "English"}
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 flex flex-col gap-4 ${
              isArabic ? "items-end" : ""
            }`}>
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                name={item.name}
                pathname={pathname}
                onClick={closeMenu}
              />
            ))}

            <div className="flex items-center gap-4 mt-4">
              {/* Language Toggle - Mobile */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-sm hover:bg-primary/10 hover:text-primary">
                {language === "en" ? "العربية" : "English"}
              </Button>

              {/* Theme Toggle - Mobile */}
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default memo(Navbar);
