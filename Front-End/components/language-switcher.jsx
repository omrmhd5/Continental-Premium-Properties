"use client"

import { useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  // Memoize toggle handler for better performance
  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "ar" : "en")
  }, [language, setLanguage])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="text-sm border-primary/20 hover:bg-primary/10 hover:text-primary"
    >
      {language === "en" ? "العربية" : "English"}
    </Button>
  )
}

export default memo(LanguageSwitcher)
