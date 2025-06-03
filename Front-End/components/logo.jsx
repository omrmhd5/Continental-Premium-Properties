"use client";

import { useLanguage } from "@/context/language-context";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Logo({ variant = "full", className = "" }) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isArabic = language === "ar";

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only check `theme` after mount
  const isDark = mounted && theme === "dark";

  return (
    <Link href="/" className={`block ${className}`}>
      {variant === "full" ? (
        <div className={`relative ${isDark ? "invert brightness-0" : ""}`}>
          <Image
            src="/images/logo-full.svg"
            alt={
              isArabic
                ? "الحلول التطويرية العقارية"
                : "Development Solutions Real Estate"
            }
            width={120}
            height={60}
            className="h-auto"
          />
        </div>
      ) : (
        <div className={`relative ${isDark ? "invert brightness-0" : ""}`}>
          <Image
            src="/images/logo-icon.svg"
            alt={
              isArabic
                ? "الحلول التطويرية العقارية"
                : "Development Solutions Real Estate"
            }
            width={35}
            height={35}
            className="h-auto"
          />
        </div>
      )}
    </Link>
  );
}
