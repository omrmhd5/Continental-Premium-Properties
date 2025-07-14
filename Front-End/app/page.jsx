"use client";

import { Suspense } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import MapSection from "@/components/map-section";
import AchievementsSection from "@/components/achievements-section";
import MediaCenter from "@/components/media-center";
import Footer from "@/components/footer";

// Loading fallback component
const SectionLoading = () => (
  <div className="py-16">
    <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
    <div className="h-4 bg-muted rounded w-2/3 mx-auto mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-64 bg-muted rounded"></div>
      ))}
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4 pt-20">
        {/* Use Suspense for code-splitting and better loading experience */}
        <Suspense fallback={<SectionLoading />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoading />}>
          <MapSection />
        </Suspense>

        <Suspense fallback={<SectionLoading />}>
          <AchievementsSection />
        </Suspense>

        <Suspense fallback={<SectionLoading />}>
          <MediaCenter />
        </Suspense>

        <Footer />
      </div>
    </div>
  );
}
