import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import FeaturesCatalog from '../features/landing/components/FeaturesCatalog';
import MouseTracker3D from '../features/robot-companion/components/MouseTracker3D';

export const FeaturesPage = () => {
  return (
    <MouseTracker3D>
      <PageContainer>
        <FeaturesCatalog />
      </PageContainer>
    </MouseTracker3D>
  );
};

export default FeaturesPage;
