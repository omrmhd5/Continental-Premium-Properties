"use client";

import { useAppLocale } from "@/components/providers/locale-provider";

export const languageOptions = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export function useLanguage() {
  const { locale, setLocale } = useAppLocale();
  return { language: locale, setLanguage: setLocale };
}
