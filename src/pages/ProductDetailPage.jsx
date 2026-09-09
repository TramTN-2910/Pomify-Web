import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import ProductViewer3D from '../features/shop/components/ProductViewer3D';
import ProductBuyBox from '../features/shop/components/ProductBuyBox';
import HardwareSpecs from '../features/shop/components/HardwareSpecs';
import WhatsInTheBox from '../features/shop/components/WhatsInTheBox';
import ProductFAQ from '../features/shop/components/ProductFAQ';
import InteractivePurchaseSection from '../features/shop/components/InteractivePurchaseSection';

export const ProductDetailPage = () => {
  return (
    <PageContainer>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* Upper Grid: 3D Viewer (Left) + Buy Box (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductViewer3D />
          </div>
          <div className="lg:col-span-6">
            <ProductBuyBox />
          </div>
        </div>

        {/* Middle Section: Whats In The Box */}
        <div className="pt-8 border-t border-purple-100">
          <WhatsInTheBox />
        </div>

        {/* Hardware Specs Accordion */}
        <div className="pt-8 border-t border-purple-100 max-w-4xl mx-auto">
          <HardwareSpecs />
        </div>

        {/* Collapsible FAQ Section */}
        <div className="pt-8 border-t border-purple-100">
          <ProductFAQ />
        </div>

        {/* Lower CTA */}
        <InteractivePurchaseSection />
      </div>
    </PageContainer>
  );
};

export default ProductDetailPage;
