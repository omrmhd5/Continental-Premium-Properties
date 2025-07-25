"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/language-context";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/lib/config";

export default function ContactPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
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
        headers: { "Content-Type": "application/json" },
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
          title:
            language === "ar"
              ? "تم إرسال الشكوى أو الملاحظة بنجاح"
              : language === "fr"
              ? "Réclamation ou commentaire envoyé avec succès"
              : "Feedback or Complaint Sent Successfully",
          description:
            language === "ar"
              ? "سنتواصل معك في أقرب وقت ممكن"
              : language === "fr"
              ? "Nous vous répondrons dans les plus brefs délais"
              : "We will get back to you as soon as possible",
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
          title:
            language === "ar"
              ? "حدث خطأ أثناء الإرسال"
              : language === "fr"
              ? "Erreur lors de l'envoi"
              : "Error Sending Message",
          description:
            language === "ar"
              ? "يرجى المحاولة مرة أخرى لاحقًا"
              : language === "fr"
              ? "Veuillez réessayer plus tard"
              : "Please try again later",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title:
          language === "ar"
            ? "حدث خطأ أثناء الإرسال"
            : language === "fr"
            ? "Erreur lors de l'envoi"
            : "Error Sending Message",
        description:
          language === "ar"
            ? "يرجى المحاولة مرة أخرى لاحقًا"
            : language === "fr"
            ? "Veuillez réessayer plus tard"
            : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: { en: "Visit Us", ar: "زورنا", fr: "Visitez-nous" },
      details: {
        en: "2110-B2B Office Tower - Marasi Dr - Business Bay - Dubai",
        ar: "2110-B2B Office Tower - Marasi Dr - Business Bay - Dubai",
        fr: "2110-B2B Office Tower - Marasi Dr - Business Bay - Dubaï",
      },
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: { en: "Call Us", ar: "اتصل بنا", fr: "Appelez-nous" },
      details: {
        en: "+971 4 770 5704",
        ar: "+971 4 770 5704",
        fr: "+971 4 770 5704",
      },
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: { en: "Email Us", ar: "راسلنا", fr: "Envoyez-nous un email" },
      details: {
        en: "propertiescontinental58@gmail.com",
        ar: "propertiescontinental58@gmail.com",
        fr: "propertiescontinental58@gmail.com",
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <section className="py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-primary mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "ar"
                  ? "العودة إلى الصفحة الرئيسية"
                  : language === "fr"
                  ? "Retour à l'Accueil"
                  : "Back to Home"}
              </Link>
              <h1
                className={`text-3xl md:text-4xl font-serif font-bold ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {language === "ar"
                  ? "اتصل بنا"
                  : language === "fr"
                  ? "Contactez-nous"
                  : "Contact Us"}
              </h1>
              <p
                className={`text-muted-foreground mt-2 ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {language === "ar"
                  ? "نحن هنا للإجابة على أسئلتك ومساعدتك في العثور على منزل أحلامك"
                  : language === "fr"
                  ? "Nous sommes là pour répondre à vos questions et vous aider à trouver votre maison de rêve"
                  : "We're here to answer your questions and help you find your dream home"}
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
                    {isArabic
                      ? info.title.ar
                      : language === "fr"
                      ? info.title.fr
                      : info.title.en}
                  </h3>
                  <p className="text-muted-foreground">
                    {isArabic
                      ? info.details.ar
                      : language === "fr"
                      ? info.details.fr
                      : info.details.en}
                  </p>
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
                    {language === "ar"
                      ? "أرسل لنا رسالة"
                      : language === "fr"
                      ? "Envoyez-nous un Message"
                      : "Send Us a Message"}
                  </span>
                  <span className="inline-block h-0.5 w-10 bg-primary ml-2 align-middle"></span>
                </div>
                <h2 className="text-2xl font-serif font-bold mb-4">
                  {language === "ar"
                    ? "نحن نقدر ملاحظاتك"
                    : language === "fr"
                    ? "Nous Apprécions Votre Avis"
                    : "We Value Your Feedback"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {language === "ar"
                    ? "املأ النموذج أدناه وسنعاود الاتصال بك في أقرب وقت ممكن"
                    : language === "fr"
                    ? "Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais"
                    : "Fill out the form below and we'll get back to you as soon as possible"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder={
                      language === "ar"
                        ? "الاسم الكامل"
                        : language === "fr"
                        ? "Nom Complet"
                        : "Full Name"
                    }
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="email"
                    type="email"
                    placeholder={
                      language === "ar"
                        ? "البريد الإلكتروني"
                        : language === "fr"
                        ? "Adresse Email"
                        : "Email Address"
                    }
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="phone"
                    placeholder={
                      language === "ar"
                        ? "رقم الهاتف"
                        : language === "fr"
                        ? "Numéro de Téléphone"
                        : "Phone Number"
                    }
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder={
                      language === "ar"
                        ? "الموضوع"
                        : language === "fr"
                        ? "Sujet"
                        : "Subject"
                    }
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={
                      language === "ar"
                        ? "رسالتك"
                        : language === "fr"
                        ? "Votre Message"
                        : "Your Message"
                    }
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
                    ? language === "ar"
                      ? "جاري الإرسال..."
                      : language === "fr"
                      ? "Envoi en cours..."
                      : "Sending..."
                    : language === "ar"
                    ? "إرسال الرسالة"
                    : language === "fr"
                    ? "Envoyer le Message"
                    : "Send Message"}
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
