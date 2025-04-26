// Initial projects data
export const initialProjects = [
  {
    id: 1,
    title: "Luxury Villas",
    status: "available-properties",
    location: "Riyadh",
    price: "1,200,000",
    date: "2023-05-15",
    description: {
      en: "Exclusive villas with private pools and gardens",
      ar: "فلل حصرية مع مسابح وحدائق خاصة",
    },
    area: "350",
    bedrooms: "5",
    bathrooms: "4",
    floors: "2",
    images: ["/images/LuxuryVillas1.webp", "/images/LuxuryVillas2.webp"],
    features: [
      { en: "Swimming Pool", ar: "حمام سباحة" },
      { en: "Garden", ar: "حديقة" },
      { en: "Smart Home System", ar: "نظام منزل ذكي" },
    ],
  },
  {
    id: 2,
    title: "Modern Apartments",
    status: "coming",
    location: "Jeddah",
    price: "450,000",
    date: "2023-06-22",
    description: {
      en: "Contemporary apartments in the heart of the city",
      ar: "شقق معاصرة في قلب المدينة",
    },
    area: "120",
    bedrooms: "2",
    bathrooms: "2",
    floors: "1",
    images: ["/images/Apartment1.webp", "/images/Apartment2.webp"],
    features: [
      { en: "Gym", ar: "صالة رياضية" },
      { en: "Parking", ar: "موقف سيارات" },
    ],
  },
  {
    id: 3,
    title: "Beachfront Residences",
    status: "available-properties",
    location: "Dammam",
    price: "3,500,000",
    date: "2023-04-10",
    description: {
      en: "Luxury homes with stunning ocean views",
      ar: "منازل فاخرة مع إطلالات خلابة على المحيط",
    },
    area: "400",
    bedrooms: "6",
    bathrooms: "5",
    floors: "3",
    images: ["/images/Beachfront1.webp", "/images/Beachfront2.webp"],
    features: [
      { en: "Private Beach", ar: "شاطئ خاص" },
      { en: "Infinity Pool", ar: "مسبح لا نهائي" },
    ],
  },
];

// Function to initialize projects in localStorage
export function initializeProjects() {
  if (typeof window !== "undefined") {
    // Check if projects already exist in localStorage
    const existingProjects = localStorage.getItem("projects");

    // Only set projects if they don't exist
    if (!existingProjects) {
      localStorage.setItem("projects", JSON.stringify(initialProjects));
    }

    return existingProjects ? JSON.parse(existingProjects) : initialProjects;
  }

  return initialProjects;
}
