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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: isArabic
          ? "تم إرسال الرسالة بنجاح"
          : "Message Sent Successfully",
        description: isArabic
          ? "سنتواصل معك في أقرب وقت ممكن"
          : "We will get back to you as soon as possible",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: { en: "Visit Us", ar: "زورنا" },
      details: {
        en: "2110-B2B Office Tower - Marasi Dr - Business Bay - Dubai",
        ar: "2110-B2B Office Tower - Marasi Dr - Business Bay - Dubai",
      },
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: { en: "Call Us", ar: "اتصل بنا" },
      details: { en: "+971 4 123 4567", ar: "+971 4 123 4567" },
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: { en: "Email Us", ar: "راسلنا" },
      details: { en: "info@eliteestates.com", ar: "info@eliteestates.com" },
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
                {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
              </Link>
              <h1
                className={`text-3xl md:text-4xl font-serif font-bold ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {isArabic ? "اتصل بنا" : "Contact Us"}
              </h1>
              <p
                className={`text-muted-foreground mt-2 ${
                  isArabic ? "font-arabic" : ""
                }`}>
                {isArabic
                  ? "نحن هنا للإجابة على أسئلتك ومساعدتك في العثور على منزل أحلامك"
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
                    {isArabic ? info.title.ar : info.title.en}
                  </h3>
                  <p className="text-muted-foreground">
                    {isArabic ? info.details.ar : info.details.en}
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
                    {isArabic ? "أرسل لنا رسالة" : "Send Us a Message"}
                  </span>
                  <span className="inline-block h-0.5 w-10 bg-primary ml-2 align-middle"></span>
                </div>
                <h2 className="text-2xl font-serif font-bold mb-4">
                  {isArabic ? "نحن نقدر ملاحظاتك" : "We Value Your Feedback"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {isArabic
                    ? "املأ النموذج أدناه وسنعاود الاتصال بك في أقرب وقت ممكن"
                    : "Fill out the form below and we'll get back to you as soon as possible"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
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
                      isArabic ? "البريد الإلكتروني" : "Email Address"
                    }
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="phone"
                    placeholder={isArabic ? "رقم الهاتف" : "Phone Number"}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder={isArabic ? "الموضوع" : "Subject"}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={isArabic ? "رسالتك" : "Your Message"}
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
                    ? isArabic
                      ? "جاري الإرسال..."
                      : "Sending..."
                    : isArabic
                    ? "إرسال الرسالة"
                    : "Send Message"}
                </Button>
              </form>
            </div>

            <div className={isArabic ? "order-1" : "order-2"}>
              <div className="h-full w-full rounded-lg overflow-hidden elegant-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6374.550124458795!2d55.28219997482252!3d25.190918077714933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6824f0311909%3A0x65950f712e2bef2!2sB2B%20Office%20Tower%20-%20Marasi%20Dr%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e1!3m2!1sen!2seg!4v1752100557391!5m2!1sen!2seg"
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
