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
            src="/images/Logo.svg"
            alt={
              isArabic
                ? "Continental Premium Properties"
                : "Continental Premium Properties"
            }
            width={60}
            height={30}
            className="h-auto"
          />
        </div>
      ) : (
        <div className={`relative ${isDark ? "invert brightness-0" : ""}`}>
          <Image
            src="/images/Logo.svg"
            alt={
              isArabic
                ? "Continental Premium Properties"
                : "Continental Premium Properties"
            }
            width={17}
            height={17}
            className="h-auto"
          />
        </div>
      )}
    </Link>
  );
}
