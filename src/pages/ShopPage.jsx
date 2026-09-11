import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import ShopHero from '../features/shop/components/ShopHero';
import ShopFeatureCards from '../features/shop/components/ShopFeatureCards';
import CustomerReviews from '../features/shop/components/CustomerReviews';
import InteractivePurchaseSection from '../features/shop/components/InteractivePurchaseSection';

export const ShopPage = () => {
  return (
    <PageContainer>
      <ShopHero />
      <ShopFeatureCards />
      <CustomerReviews />
      <InteractivePurchaseSection />
    </PageContainer>
  );
};

export default ShopPage;
