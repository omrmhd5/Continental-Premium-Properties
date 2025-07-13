"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { ArrowLeft, Award, Building, CheckCircle, Users } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const values = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: { en: "Excellence", ar: "التميز", fr: "Excellence" },
      description: {
        en: "We strive for excellence in every project we undertake, ensuring the highest standards of quality and design.",
        ar: "نسعى للتميز في كل مشروع نقوم به، مما يضمن أعلى معايير الجودة والتصميم.",
        fr: "Nous visons l'excellence dans chaque projet que nous entreprenons, garantissant les plus hauts standards de qualité et de design.",
      },
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: { en: "Integrity", ar: "النزاهة", fr: "Intégrité" },
      description: {
        en: "We conduct our business with honesty, transparency, and ethical practices, building trust with our clients and partners.",
        ar: "نمارس أعمالنا بصدق وشفافية وممارسات أخلاقية، مما يبني الثقة مع عملائنا وشركائنا.",
        fr: "Nous menons nos activités avec honnêteté, transparence et éthique, bâtissant la confiance avec nos clients et partenaires.",
      },
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: { en: "Innovation", ar: "الابتكار", fr: "Innovation" },
      description: {
        en: "We embrace innovative solutions and modern technologies to create cutting-edge residential projects.",
        ar: "نتبنى الحلول المبتكرة والتقنيات الحديثة لإنشاء مشاريع سكنية متطورة.",
        fr: "Nous adoptons des solutions innovantes et des technologies modernes pour créer des projets résidentiels de pointe.",
      },
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: { en: "Community", ar: "المجتمع", fr: "Communauté" },
      description: {
        en: "We are committed to building not just properties, but thriving communities that enhance the quality of life.",
        ar: "نحن ملتزمون ببناء ليس فقط العقارات، ولكن المجتمعات المزدهرة التي تعزز جودة الحياة.",
        fr: "Nous nous engageons à construire non seulement des propriétés, mais aussi des communautés dynamiques qui améliorent la qualité de vie.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
                  language === "ar" ? "font-arabic" : ""
                }`}>
                {language === "ar"
                  ? "من نحن"
                  : language === "fr"
                  ? "À Propos"
                  : "About Us"}
              </h1>
              <p
                className={`text-muted-foreground mt-2 ${
                  language === "ar" ? "font-arabic" : ""
                }`}>
                {language === "ar"
                  ? "تعرف على قصتنا ورؤيتنا"
                  : language === "fr"
                  ? "Découvrez notre histoire et notre vision"
                  : "Learn about our story and vision"}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px] rounded-lg overflow-hidden elegant-card">
              <Image
                src="/images/Ourstory.webp"
                alt={isArabic ? "صورة الشركة" : "Company Image"}
                fill
                className="object-cover"
              />
            </div>
            <div className={isArabic ? "text-right font-arabic" : ""}>
              <div className="inline-block mb-4">
                <span className="inline-block h-0.5 w-10 bg-brand-gold mr-2 align-middle"></span>
                <span className="text-brand-gold text-sm uppercase tracking-wider">
                  {isArabic
                    ? "قصتنا"
                    : language === "fr"
                    ? "Notre Histoire"
                    : "Our Story"}
                </span>
                <span className="inline-block h-0.5 w-10 bg-brand-gold ml-2 align-middle"></span>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-brand-gold">
                {isArabic
                  ? "رواد في تطوير العقارات الفاخرة"
                  : language === "fr"
                  ? "Leaders du développement immobilier de luxe"
                  : "Leading Luxury Real Estate Development"}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {isArabic
                    ? `في قلب دبي، حيث تلتقي الفرص مع الطموحات، تأسست شركتنا العقارية لتكون بوابتك إلى عالم من الاستثمار العقاري الذكي والمربح. نحن فريق من الاستشاريين العقاريين الخبراء، نمتلك رؤية واضحة، ومعرفة عميقة بسوق العقارات الديناميكي في دبي.
نضع بين يديك خبرة ممتدة وسجلاً حافلاً من النجاحات، لنرافقك في كل خطوة من خطوات رحلتك العقارية – سواء كنت تبحث عن منزل أحلامك، أو ترغب في تنمية محفظتك الاستثمارية، أو تسعى لفهم خفايا السوق واتخاذ قرارات استراتيجية مدروسة.
نعمل بشغف، ونؤمن أن الثقة تُبنى على الشفافية والمصداقية، ولهذا نحرص على تقديم استشارات مخصصة، قائمة على تحليل دقيق واهتمام حقيقي بأهداف عملائنا.
معنا، لست مجرد عميل… أنت شريك نجاح`
                    : language === "fr"
                    ? `Au cœur de Dubaï, où les opportunités rencontrent les ambitions, notre société immobilière a été fondée pour être votre passerelle vers un monde d'investissement immobilier intelligent et rentable. Nous sommes une équipe de consultants immobiliers experts, dotés d'une vision claire et d'une connaissance approfondie du marché dynamique de Dubaï.
Nous vous offrons une vaste expérience et un parcours jalonné de succès, vous accompagnant à chaque étape de votre parcours immobilier—que vous recherchiez la maison de vos rêves, souhaitiez développer votre portefeuille d'investissement ou cherchiez à comprendre le marché et à prendre des décisions stratégiques.
Nous travaillons avec passion et croyons que la confiance se construit sur la transparence et la crédibilité, c'est pourquoi nous fournissons des conseils personnalisés basés sur une analyse approfondie et un réel intérêt pour vos objectifs.
Avec nous, vous n'êtes pas seulement un client… vous êtes un partenaire de réussite.`
                    : `In the heart of Dubai, where opportunities meet ambitions, our real estate company was founded to be your gateway to a world of smart and profitable real estate investment. We are a team of expert real estate consultants with a clear vision and deep knowledge of Dubai's dynamic property market.
We offer you extensive experience and a proven track record of success, accompanying you every step of your real estate journey—whether you're searching for your dream home, looking to grow your investment portfolio, or seeking to understand the market and make strategic decisions.
We work with passion and believe that trust is built on transparency and credibility, which is why we provide tailored advice based on thorough analysis and a genuine interest in your goals.
With us, you are not just a client… you are a partner in success.`}
                </p>
                <p>
                  {isArabic
                    ? "نحن نفخر بمحفظتنا المتنوعة من المشاريع السكنية الفاخرة، من الفلل الحصرية إلى الشقق العصرية والمجمعات السكنية المتكاملة. كل مشروع نقوم به يعكس التزامنا بالتميز والابتكار والجودة."
                    : language === "fr"
                    ? "Nous sommes fiers de notre portefeuille diversifié de projets résidentiels de luxe, des villas exclusives aux appartements modernes et aux complexes résidentiels intégrés. Chaque projet que nous réalisons reflète notre engagement envers l'excellence, l'innovation et la qualité."
                    : "We take pride in our diverse portfolio of luxury residential projects, from exclusive villas to modern apartments and integrated residential complexes. Each project we undertake reflects our commitment to excellence, innovation, and quality."}
                </p>
                <p>
                  {isArabic
                    ? "مع فريق من المهنيين ذوي الخبرة والمهارة، نحن ملتزمون بتجاوز توقعات عملائنا وتقديم مساحات معيشية استثنائية تدوم مدى الحياة."
                    : language === "fr"
                    ? "Avec une équipe de professionnels expérimentés et qualifiés, nous nous engageons à dépasser les attentes de nos clients et à offrir des espaces de vie exceptionnels qui résistent à l'épreuve du temps."
                    : "With a team of experienced and skilled professionals, we are committed to exceeding our clients' expectations and delivering exceptional living spaces that stand the test of time."}
                </p>
              </div>
            </div>
          </div>

          <div className={`text-center mb-12 ${isArabic ? "font-arabic" : ""}`}>
            <div className="inline-block mb-4">
              <span className="inline-block h-0.5 w-10 bg-brand-gold mr-2 align-middle"></span>
              <span className="text-brand-gold text-sm uppercase tracking-wider">
                {isArabic
                  ? "قيمنا"
                  : language === "fr"
                  ? "Nos Valeurs"
                  : "Our Values"}
              </span>
              <span className="inline-block h-0.5 w-10 bg-brand-gold ml-2 align-middle"></span>
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4 text-brand-gold">
              {isArabic
                ? "المبادئ التي توجهنا"
                : language === "fr"
                ? "Les principes qui nous guident"
                : "The Principles That Guide Us"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isArabic
                ? "قيمنا الأساسية هي أساس كل ما نقوم به، من تصميم مشاريعنا إلى كيفية تعاملنا مع عملائنا وشركائنا"
                : language === "fr"
                ? "Nos valeurs fondamentales sont le socle de tout ce que nous faisons, de la conception de nos projets à la façon dont nous interagissons avec nos clients et partenaires."
                : "Our core values are the foundation of everything we do, from how we design our projects to how we interact with our clients and partners"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value, index) => (
              <Card
                key={index}
                className="elegant-card bg-card text-card-foreground">
                <CardContent
                  className={`flex flex-col items-center p-6 text-center ${
                    isArabic ? "font-arabic" : ""
                  }`}>
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-serif font-bold mb-2">
                    {isArabic
                      ? value.title.ar
                      : language === "fr"
                      ? value.title.fr
                      : value.title.en}
                  </h3>
                  <p className="text-muted-foreground">
                    {isArabic
                      ? value.description.ar
                      : language === "fr"
                      ? value.description.fr
                      : value.description.en}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
