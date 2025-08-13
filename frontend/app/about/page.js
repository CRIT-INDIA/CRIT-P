'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import OurMissionSection from "./components/expertise";
import ERPImplementationDiagram from "./components/erp";
import TechHero from "./components/hero";
import Journey from "./components/journey";

export default function AboutPage() {
  const pathname = usePathname();

  useEffect(() => {
    // Client-side specific code can go here
    // For example, analytics tracking, etc.
  }, [pathname]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="relative overflow-hidden max-w-[1800px] w-full mx-auto bg-[#fff5f5] min-h-screen">
        {/* SEO H1 - Only for search engines */}
        <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
          About the Connecting Roots
        </h1>
        <div className="h-screen w-full bg-gray-100 animate-pulse"></div>
      </div>
    );
  }

  return (
    <main className="min-h-* bg-[#fff5f5]">
      <TechHero />
      <div className="relative min-h-*">
        <Journey />
      </div>
      <div className="relative min-w-* min-h-*">
        <ERPImplementationDiagram />
      </div>
      <div className="relative">
        <OurMissionSection />
      </div>
    </main>
  );
}