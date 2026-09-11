export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export function resolveMediaUrl(src) {
  if (!src) {
    return "/placeholder.svg?height=400&width=600";
  }
  if (src.startsWith("/uploads/")) {
    return `${API_ORIGIN}${src}`;
  }
  return src;
}
