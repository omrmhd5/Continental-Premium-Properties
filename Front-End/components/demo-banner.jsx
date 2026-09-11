"use client";

import { useTranslations } from "next-intl";

export default function DemoBanner() {
  const t = useTranslations("banner");
  return (
    <div className="bg-amber-500 text-white text-center text-sm sm:text-base font-semibold py-2 px-4 sticky top-0 z-[60]">
      {t("demo")} · {t("wake")}
    </div>
  );
}
