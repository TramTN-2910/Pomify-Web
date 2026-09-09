import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import HeroSection from '../features/landing/components/HeroSection';
import WhatIsPomify from '../features/landing/components/WhatIsPomify';
import CapabilitiesGrid from '../features/landing/components/CapabilitiesGrid';
import WhyPomifyTimeline from '../features/landing/components/WhyPomifyTimeline';

export const HomePage = () => {
  return (
    <PageContainer>
      {/* 1. Home (Meet Pomify) */}
      <HeroSection />

      {/* 2. What is Pomify? */}
      <WhatIsPomify />

      {/* 3. What Can Pomify Do? */}
      <CapabilitiesGrid />

      {/* 4. Why Pomify? */}
      <WhyPomifyTimeline />
    </PageContainer>
  );
};

export default HomePage;
