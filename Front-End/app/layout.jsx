import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Development Solutions Real Estate - الحلول التطويرية العقارية",
  description:
    "Discover our premium residential projects with world-class specifications and modern designs",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className="font-dubai">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
