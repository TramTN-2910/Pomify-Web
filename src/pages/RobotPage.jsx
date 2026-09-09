import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import HardwareAnatomy from '../features/landing/components/HardwareAnatomy';
import MouseTracker3D from '../features/robot-companion/components/MouseTracker3D';
import Badge from '../components/ui/Badge';
import { Bot, Sparkles, Cpu, ShieldCheck } from 'lucide-react';

export const RobotPage = () => {
  return (
    <MouseTracker3D>
      <PageContainer>
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <Badge variant="purple" icon={Bot}>
              Our Robot Anatomy & Hardware
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-pomify-navy tracking-tight">
              Crafted with Precision. <br />
              <span className="text-pomify-purple">Designed for Connection.</span>
            </h1>
            <p className="text-lg text-pomify-subtext leading-relaxed">
              Khám phá chi tiết cấu trúc linh kiện 3D, mắt LED cảm xúc, bộ xử lý AI và cảm biến tiệm cận được tích hợp bên trong Robot Pomify.
            </p>
          </div>

          {/* Anatomy Showcase Section */}
          <HardwareAnatomy />

        </div>
      </PageContainer>
    </MouseTracker3D>
  );
};

export default RobotPage;
