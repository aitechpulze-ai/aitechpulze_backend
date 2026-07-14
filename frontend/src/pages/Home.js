import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/home/HeroSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import AcademicHubSection from '../components/home/AcademicHubSection';
import TechStackSection from '../components/home/TechStackSection';
import HomeContactSection from '../components/home/HomeContactSection';
import PremiumLoader from '../components/PremiumLoader';
import InternshipPopup from '../components/home/InternshipPopup';

export default function Home() {
  useEffect(() => {
    // Add custom class to body for premium theme overrides if needed
    document.body.classList.add('premium-dark-theme');
    return () => {
      document.body.classList.remove('premium-dark-theme');
    };
  }, []);

  return (
    <>
      <SEO path="/" title="AiTechPulze | Architecting Intelligent Digital Experiences" />
      <PremiumLoader />
      
      <main className="bg-[#060713] selection:bg-blue-950 selection:text-blue-200 overflow-x-hidden">
        <HeroSection />
        <FeaturedProductsSection />
        <AcademicHubSection />
        <TechStackSection />
        <HomeContactSection />
      </main>
      
      <InternshipPopup />
    </>
  );
}
