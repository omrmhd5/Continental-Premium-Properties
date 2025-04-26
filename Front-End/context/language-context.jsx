"use client"

import { createContext, useContext, useState } from "react"

// Create language context
const LanguageContext = createContext(undefined)

// Language provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  )
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return context
}
