import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import TeamGrid from '../features/landing/components/TeamGrid';
import MouseTracker3D from '../features/robot-companion/components/MouseTracker3D';

export const AboutPage = () => {
  return (
    <MouseTracker3D>
      <PageContainer>
        <TeamGrid />
      </PageContainer>
    </MouseTracker3D>
  );
};

export default AboutPage;
