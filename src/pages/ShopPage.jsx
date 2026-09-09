import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import ShopHero from '../features/shop/components/ShopHero';
import ShopFeatureCards from '../features/shop/components/ShopFeatureCards';
import InteractivePurchaseSection from '../features/shop/components/InteractivePurchaseSection';

export const ShopPage = () => {
  return (
    <PageContainer>
      <ShopHero />
      <ShopFeatureCards />
      <InteractivePurchaseSection />
    </PageContainer>
  );
};

export default ShopPage;
