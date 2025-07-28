import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Continental Premium Properties - Continental Premium Properties",
  description:
    "Discover our premium residential projects with world-class specifications and modern designs",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <title>Continental Premium Properties</title>
        <meta
          name="description"
          content="Discover our premium residential projects with world-class specifications and modern designs. We connect you to the best real estate opportunities to secure your investment or dream home."
        />

        <meta
          property="og:url"
          content="https://www.continentalpremiumproperties.ae"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Continental Premium Properties" />
        <meta
          property="og:description"
          content="Discover our premium residential projects with world-class specifications and modern designs. We connect you to the best real estate opportunities to secure your investment or dream home."
        />
        <meta
          property="og:image"
          content="https://www.continentalpremiumproperties.ae/og-image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="continentalpremiumproperties.ae"
        />
        <meta
          property="twitter:url"
          content="https://www.continentalpremiumproperties.ae"
        />
        <meta name="twitter:title" content="Continental Premium Properties" />
        <meta
          name="twitter:description"
          content="Discover our premium residential projects with world-class specifications and modern designs. We connect you to the best real estate opportunities to secure your investment or dream home."
        />
        <meta
          name="twitter:image"
          content="https://www.continentalpremiumproperties.ae/og-image.png"
        />
      </head>
      <body className="font-dubai bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
