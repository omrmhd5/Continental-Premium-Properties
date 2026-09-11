"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/language-context";
import { useTranslations } from "next-intl";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL, languageHeaders } from "@/lib/config";

export default function ContactPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const t = useTranslations();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/projects/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...languageHeaders() },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      if (response.ok) {
        toast({
          title: t("contact.successTitle"),
          description: t("contact.success.description"),
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: t("contact.errorTitle"),
          description: t("contact.errorDesc"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("contact.errorTitle"),
        description: t("contact.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: t("contact.visitUs"),
      details: t("contact.addressValue"),
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: t("contact.callUs"),
      details: t("contact.phoneValue"),
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: t("contact.emailUs"),
      details: t("contact.emailValue"),
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-32">
        <section className="py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-primary mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("contact.backToHome")}
              </Link>
              <h1
                className={`text-3xl md:text-4xl font-serif font-bold ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {t("contact.title")}
              </h1>
              <p
                className={`text-muted-foreground mt-2 ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {t("contact.pageSubtitle")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="elegant-card">
                <CardContent
                  className={`flex flex-col items-center p-6 text-center ${
                    isArabic ? "font-arabic" : ""
                  }`}>
                  <div className="mb-4 p-3 bg-primary/10 rounded-full">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">
                    {info.title}
                  </h3>
                  <p className="text-muted-foreground">{info.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className={isArabic ? "order-2 font-arabic" : "order-1"}>
              <div className={isArabic ? "text-right" : ""}>
                <div className="inline-block mb-4">
                  <span className="inline-block h-0.5 w-10 bg-primary mr-2 align-middle"></span>
                  <span className="text-primary text-sm uppercase tracking-wider">
                    {t("contact.sendMessage")}
                  </span>
                  <span className="inline-block h-0.5 w-10 bg-primary ml-2 align-middle"></span>
                </div>
                <h2 className="text-2xl font-serif font-bold mb-4">
                  {t("contact.weValue")}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t("contact.fillForm")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder={t("contact.form.name")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="email"
                    type="email"
                    placeholder={t("contact.form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="phone"
                    placeholder={t("contact.form.phone")}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder={t("contact.form.subject")}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={t("contact.yourMessage")}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}>
                  {isSubmitting
                    ? t("contact.form.sending")
                    : t("contact.form.sendButton")}
                </Button>
              </form>
            </div>

            <div className={isArabic ? "order-1" : "order-2"}>
              <div className="h-full w-full rounded-lg overflow-hidden elegant-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.270752094652!2d55.285065100000004!3d25.1910828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f690035c2cbbb%3A0x41b7a29be60f16fd!2sContinental%20Premium%20Properties%20LLC!5e1!3m2!1sen!2seg!4v1752102626943!5m2!1sen!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
