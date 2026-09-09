import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Volume2 } from 'lucide-react';
import CanvasViewer from '../../../components/3d/CanvasViewer';
import CustomizerRobot3D from './CustomizerRobot3D';
import ControlPanel from './ControlPanel';
import LiveSpecPreview from './LiveSpecPreview';
import useRobotStore from '../../robot-companion/store/robotStore';
import SpeechBubble from '../../../components/ui/SpeechBubble';

export const StudioLayout = () => {
  const [isBouncing, setIsBouncing] = useState(false);
  const { bubbleText, showBubble } = useRobotStore();

  const handleSaveBounce = () => {
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
    }, 2500);
  };

  return (
    <div className="w-full min-h-screen py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Studio Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-pomify-purple-dark text-xs font-bold border border-purple-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Module 8: Pomify 3D Customizer Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-pomify-navy tracking-tight">
          Make Pomify Truly Yours <span className="text-pomify-purple">.</span>
        </h1>
        <p className="text-sm text-pomify-subtext">
          Customize colors, expressions, smart finishes, and 3D accessories in real-time.
        </p>
      </div>

      {/* 3-Column Studio Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[680px]">
        
        {/* LEFT COLUMN: Control Panel (4 cols) */}
        <div className="lg:col-span-4 h-full">
          <ControlPanel />
        </div>

        {/* CENTER COLUMN: Interactive 3D Canvas (5 cols) */}
        <div className="lg:col-span-5 h-[450px] lg:h-full relative rounded-3xl bg-gradient-to-b from-white/80 via-purple-50/40 to-blue-50/30 border border-white/80 shadow-soft-glass flex flex-col justify-between overflow-hidden">
          
          {/* Controls overlay prompt */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-100 text-xs font-semibold text-pomify-navy shadow-sm">
            <RotateCcw className="w-3.5 h-3.5 text-pomify-purple animate-spin-slow" />
            <span>Drag to rotate 360° • Scroll to zoom</span>
          </div>

          {/* Speech Bubble Overlay */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <SpeechBubble text={bubbleText} visible={showBubble} />
          </div>

          {/* 3D Viewer Canvas */}
          <div className="w-full h-full">
            <CanvasViewer cameraPosition={[0, 0, 5.2]}>
              <CustomizerRobot3D isBouncing={isBouncing} />
            </CanvasViewer>
          </div>

          {/* Footer Badge */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-purple-100/60 text-xs text-pomify-subtext">
            <span className="font-semibold text-pomify-navy">3D Real-time Render Engine</span>
            <span className="text-[11px] text-pomify-purple font-bold">Smart Cute Vibe</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Specs Summary & Action (3 cols) */}
        <div className="lg:col-span-3 h-full">
          <LiveSpecPreview onSaveTrigger={handleSaveBounce} />
        </div>

      </div>

    </div>
  );
};

export default StudioLayout;
