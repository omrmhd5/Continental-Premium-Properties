"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Lock,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/language-context";
import Logo from "@/components/logo";

export default function Footer() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const t = useTranslations();

  return (
    <footer
      className={`py-16 border-t border-border mt-16 bg-background ${
        isArabic ? "font-arabic text-right" : ""
      }`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Logo variant="full" className="mb-4" />
          <p className="text-muted-foreground">{t("footer.description")}</p>

          <div className="flex gap-4 mt-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-brand-gold transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-brand-gold transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-brand-gold transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-brand-gold transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{t("footer.quickLinks")}</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {t("nav.projects")}
              </Link>
            </li>
            <li>
              <Link
                href="/media"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {t("nav.mediaCenter")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {t("nav.aboutUs")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {t("nav.contactUs")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{t("nav.projects")}</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/projects?status=off-plan"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {t("status.offPlan")}
              </Link>
            </li>
            <li>
              <Link
                href="/projects?status=secondary"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {t("status.secondary")}
              </Link>
            </li>
            <li>
              <Link
                href="/projects?status=rentals"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {t("status.rentals")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{t("nav.contactUs")}</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-gold mt-0.5" />
              <span className="text-muted-foreground">
                {t("contact.addressValue")}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-gold" />
              <span className="text-muted-foreground">
                {t("contact.phoneValue")}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-gold" />
              <span className="text-muted-foreground">
                {t("contact.emailValue")}
              </span>
            </li>
            <li className="flex items-center gap-3 mt-6">
              <Lock className="w-5 h-5 text-brand-gold" />
              <Link
                href="/admin/login"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {t("footer.adminDashboard")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="elegant-divider my-8"></div>

      <div className={`text-center ${isArabic ? "font-arabic" : ""}`}>
        <p className="text-muted-foreground">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
