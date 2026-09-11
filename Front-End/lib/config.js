export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export function getRequestLanguage() {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("language");
  if (stored === "ar" || stored === "fr" || stored === "en") return stored;
  return "en";
}

export function languageHeaders() {
  const lang = getRequestLanguage();
  return {
    "Accept-Language": lang,
    "X-Language": lang,
  };
}

export function resolveMediaUrl(src) {
  if (!src) {
    return "/placeholder.svg?height=400&width=600";
  }
  if (src.startsWith("/uploads/")) {
    return `${API_ORIGIN}${src}`;
  }
  return src;
}
