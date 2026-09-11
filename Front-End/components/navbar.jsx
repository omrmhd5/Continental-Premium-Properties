"use client";

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/language-context";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import LanguageSwitcher from "@/components/language-switcher";

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
  const { language } = useLanguage();
  const t = useTranslations("nav");
  const isArabic = language === "ar";

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("projects"), href: "/projects" },
    { name: t("mediaCenter"), href: "/media" },
    { name: t("aboutUs"), href: "/about" },
    { name: t("contactUs"), href: "/contact" },
  ];

  return (
    <div className="fixed top-11 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-2xl border-b border-border">
      <nav
        className={`container mx-auto px-4 py-4 ${
          isArabic ? "font-arabic text-right" : ""
        }`}>
        <div className="flex items-center justify-between">
          <Logo variant="full" className={isArabic ? "ml-auto" : ""} />

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none text-brand-gold">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

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
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

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
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default memo(Navbar);
