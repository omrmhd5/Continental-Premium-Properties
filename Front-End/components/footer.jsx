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
import { useLanguage } from "@/context/language-context";
import Logo from "@/components/logo";

export default function Footer() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <footer
      className={`py-16 border-t border-border mt-16 bg-background ${
        isArabic ? "font-arabic text-right" : ""
      }`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Logo variant="full" className="mb-4" />
          <p className="text-muted-foreground">
            {language === "ar"
              ? "نربطك بأفضل الفرص العقارية في السوق لتأمين استثمارك أو منزلك المثالي."
              : language === "fr"
              ? "Nous vous connectons aux meilleures opportunités immobilières pour sécuriser votre investissement ou votre maison idéale."
              : "We connect you to the best real estate opportunities to secure your investment or dream home."}
          </p>

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
          <h3 className="text-xl font-bold mb-4">
            {language === "ar"
              ? "روابط سريعة"
              : language === "fr"
              ? "Liens Rapides"
              : "Quick Links"}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {language === "ar"
                  ? "الرئيسية"
                  : language === "fr"
                  ? "Accueil"
                  : "Home"}
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {language === "ar"
                  ? "المشاريع"
                  : language === "fr"
                  ? "Projets"
                  : "Projects"}
              </Link>
            </li>
            <li>
              <Link
                href="/media"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {language === "ar"
                  ? "المركز الإعلامي"
                  : language === "fr"
                  ? "Centre Média"
                  : "Media Center"}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {language === "ar"
                  ? "من نحن"
                  : language === "fr"
                  ? "À Propos"
                  : "About Us"}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {language === "ar"
                  ? "اتصل بنا"
                  : language === "fr"
                  ? "Contactez-nous"
                  : "Contact Us"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">
            {language === "ar"
              ? "المشاريع"
              : language === "fr"
              ? "Projets"
              : "Projects"}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/projects?status=off-plan"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {language === "ar"
                  ? "قيد الإنشاء"
                  : language === "fr"
                  ? "En Construction"
                  : "Off Plan"}
              </Link>
            </li>
            <li>
              <Link
                href="/projects?status=secondary"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {language === "ar"
                  ? "ثانوي"
                  : language === "fr"
                  ? "Secondaire"
                  : "Secondary"}
              </Link>
            </li>
            <li>
              <Link
                href="/projects?status=rentals"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {language === "ar"
                  ? "إيجار"
                  : language === "fr"
                  ? "Locations"
                  : "Rentals"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">
            {language === "ar"
              ? "اتصل بنا"
              : language === "fr"
              ? "Contactez-nous"
              : "Contact Us"}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-gold mt-0.5" />
              <span className="text-muted-foreground">
                {isArabic
                  ? "2110-B2B Office Tower - Marasi Dr - Business Bay - Dubai"
                  : "2110-B2B Office Tower - Marasi Dr - Business Bay - Dubai"}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-gold" />
              <span className="text-muted-foreground">+971 4 770 5704</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-gold" />
              <span className="text-muted-foreground">
                propertiescontinental58@gmail.com{" "}
              </span>
            </li>
            <li className="flex items-center gap-3 mt-6">
              <Lock className="w-5 h-5 text-brand-gold" />
              <Link
                href="/admin/login"
                className="text-muted-foreground hover:text-brand-gold transition-colors">
                {language === "ar"
                  ? "لوحة الإدارة"
                  : language === "fr"
                  ? "Tableau de Bord Admin"
                  : "Admin Dashboard"}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="elegant-divider my-8"></div>

      <div className={`text-center ${isArabic ? "font-arabic" : ""}`}>
        <p className="text-muted-foreground">
          {language === "ar"
            ? "© 2025 Continental Premium Properties. جميع الحقوق محفوظة."
            : language === "fr"
            ? "© 2025 Continental Premium Properties. Tous droits réservés."
            : "© 2025 Continental Premium Properties. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
