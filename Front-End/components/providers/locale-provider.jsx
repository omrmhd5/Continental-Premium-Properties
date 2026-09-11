"use client";

import { NextIntlClientProvider } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";
import frMessages from "@/messages/fr.json";

const STORAGE_KEY = "language";
const APP_TIME_ZONE = "Asia/Dubai";

const messages = {
  en: enMessages,
  ar: arMessages,
  fr: frMessages,
};

const LocaleContext = createContext(null);

export function useAppLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useAppLocale must be used within LocaleProvider");
  }
  return context;
}

function applyDocumentLocale(locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ar" || stored === "fr") {
      setLocaleState(stored);
      applyDocumentLocale(stored);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyDocumentLocale(locale);
  }, [locale, ready]);

  const setLocale = useCallback((next) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyDocumentLocale(next);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages[locale]}
        timeZone={APP_TIME_ZONE}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
