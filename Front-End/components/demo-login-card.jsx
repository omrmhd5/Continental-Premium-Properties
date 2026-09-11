"use client";

import { useTranslations } from "next-intl";

export default function DemoLoginCard({ className = "" }) {
  const t = useTranslations();
  return (
    <div
      className={`p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-start ${className}`}>
      <p className="font-semibold mb-2 text-center">{t("demoLogin.title")}</p>
      <div className="space-y-1 select-text">
        <p>
          <span className="font-medium">{t("demoLogin.role")}:</span> Admin
        </p>
        <p>
          <span className="font-medium">{t("demoLogin.usernameLabel")}:</span>{" "}
          admin
        </p>
        <p>
          <span className="font-medium">{t("demoLogin.passwordLabel")}:</span>{" "}
          admin123
        </p>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        {t("demoLogin.hint")}
      </p>
    </div>
  );
}
