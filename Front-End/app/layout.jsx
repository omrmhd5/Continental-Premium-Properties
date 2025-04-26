import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { ThemeProvider } from "@/components/theme-provider";
import { initializeProjects } from "@/lib/init-projects";

export const metadata = {
  title: "Development Solutions Real Estate - الحلول التطويرية العقارية",
  description:
    "Discover our premium residential projects with world-class specifications and modern designs",
  generator: "v0.dev",
};

// Initialize projects on the server
initializeProjects();

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
