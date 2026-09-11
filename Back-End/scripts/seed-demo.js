require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const Project = require("../Models/ProjectModel");

const LOCAL_URI =
  "mongodb://127.0.0.1:27017/continental-premium-properties-demo";

function pickUri() {
  const mode = process.argv.includes("--remote") ? "remote" : "local";
  if (mode === "remote") {
    const uri = process.env.MONGO_URI_REMOTE || process.env.MONGO_URI;
    if (!uri || uri.includes("127.0.0.1") || uri.includes("localhost")) {
      throw new Error(
        "Remote seed needs MONGO_URI_REMOTE or MONGO_URI pointing at Atlas (continental-premium-properties-demo).",
      );
    }
    return { mode, uri };
  }
  return {
    mode,
    uri: process.env.MONGO_URI_LOCAL || LOCAL_URI,
  };
}

const listings = [
  {
    title: "Marina Gate Apartment",
    status: "secondary",
    location: "Dubai Marina",
    price: "1850000",
    date: new Date("2025-03-12"),
    description: {
      en: "Bright two-bedroom apartment overlooking Dubai Marina, with upgraded finishes and full building amenities.",
      ar: "شقة غرفتين مشرقة تطل على مرسى دبي، بتشطيبات محدّثة ومرافق متكاملة في المبنى.",
    },
    area: "1280",
    bedrooms: "2",
    bathrooms: "2",
    floors: "22",
    images: ["/images/Apartment1.webp", "/images/Apartment2.webp"],
    features: [
      { en: "Marina view", ar: "إطلالة على المرسى" },
      { en: "Covered parking", ar: "موقف مغطى" },
      { en: "Gym & pool", ar: "نادي رياضي ومسبح" },
    ],
  },
  {
    title: "Downtown Residences",
    status: "rentals",
    location: "Downtown Dubai",
    price: "145000",
    date: new Date("2025-04-02"),
    description: {
      en: "Furnished rental near Downtown, designed for comfortable city living with easy access to retail and dining.",
      ar: "إيجار مفروش قرب وسط المدينة، مصمم لحياة حضرية مريحة مع وصول سهل للتسوق والمطاعم.",
    },
    area: "980",
    bedrooms: "1",
    bathrooms: "1",
    floors: "18",
    images: ["/images/Apartment2.webp", "/images/Apartment1.webp"],
    features: [
      { en: "Furnished", ar: "مفروشة" },
      { en: "Concierge", ar: "خدمة استقبال" },
      { en: "High floor", ar: "طابق مرتفع" },
    ],
  },
  {
    title: "Palm Beachfront Residence",
    status: "off-plan",
    location: "Palm Jumeirah",
    price: "4200000",
    date: new Date("2025-01-20"),
    handover: "12/2027",
    description: {
      en: "Off-plan beachfront residence on the Palm with private beach access and panoramic Gulf views.",
      ar: "إقامة قيد الإنشاء على الشاطئ في نخلة جميرا مع وصول خاص للشاطئ وإطلالات بانورامية على الخليج.",
    },
    area: "2100",
    bedrooms: "3",
    bathrooms: "4",
    floors: "8",
    images: ["/images/Beachfront1.webp", "/images/Beachfront2.webp"],
    features: [
      { en: "Private beach", ar: "شاطئ خاص" },
      { en: "Sea view", ar: "إطلالة بحرية" },
      { en: "Smart home", ar: "منزل ذكي" },
    ],
  },
  {
    title: "JBR Beach Suites",
    status: "secondary",
    location: "Jumeirah Beach Residence",
    price: "2650000",
    date: new Date("2025-02-08"),
    description: {
      en: "Secondary-market beach suite steps from The Walk, with open living spaces and resort-style amenities.",
      ar: "جناح شاطئي في السوق الثانوي على خطوات من ذا ووك، بمساحات معيشة مفتوحة ومرافق أشبه بالمنتجع.",
    },
    area: "1560",
    bedrooms: "2",
    bathrooms: "3",
    floors: "14",
    images: ["/images/Beachfront2.webp", "/images/Beachfront1.webp"],
    features: [
      { en: "Beach access", ar: "وصول للشاطئ" },
      { en: "The Walk nearby", ar: "قرب ذا ووك" },
      { en: "Balcony", ar: "شرفة" },
    ],
  },
  {
    title: "Emirates Hills Villa",
    status: "off-plan",
    location: "Emirates Hills",
    price: "9800000",
    date: new Date("2024-11-15"),
    handover: "06/2027",
    description: {
      en: "Off-plan luxury villa with a private garden, pool, and family living spaces in a gated community.",
      ar: "فيلا فاخرة قيد الإنشاء بحديقة خاصة ومسبح ومساحات معيشة عائلية داخل مجمع مسوّر.",
    },
    area: "5400",
    bedrooms: "5",
    bathrooms: "6",
    floors: "2",
    images: ["/images/LuxuryVillas1.webp", "/images/LuxuryVillas2.webp"],
    features: [
      { en: "Private pool", ar: "مسبح خاص" },
      { en: "Maid's room", ar: "غرفة خادمة" },
      { en: "Landscaped garden", ar: "حديقة منسقة" },
    ],
  },
  {
    title: "Arabian Ranches Villa",
    status: "rentals",
    location: "Arabian Ranches",
    price: "280000",
    date: new Date("2025-05-01"),
    description: {
      en: "Family villa available to rent in Arabian Ranches, close to parks, schools, and community retail.",
      ar: "فيلا عائلية للإيجار في المرابع العربية، قرب الحدائق والمدارس وتجارة المجتمع.",
    },
    area: "3200",
    bedrooms: "4",
    bathrooms: "4",
    floors: "2",
    images: ["/images/LuxuryVillas2.webp", "/images/LuxuryVillas1.webp"],
    features: [
      { en: "Community park", ar: "حديقة مجتمعية" },
      { en: "Covered garage", ar: "مرآب مغطى" },
      { en: "Family layout", ar: "تصميم عائلي" },
    ],
  },
];

async function seed() {
  const { mode, uri } = pickUri();
  console.log(`Seeding ${mode} database...`);
  await mongoose.connect(uri);
  await User.deleteMany({});
  await Project.deleteMany({});

  const password = await bcrypt.hash("admin123", 12);
  await User.create({ username: "admin", password });

  await Project.insertMany(listings);
  console.log(
    `Seeded admin / admin123 and ${listings.length} listings into ${mode}.`,
  );
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
