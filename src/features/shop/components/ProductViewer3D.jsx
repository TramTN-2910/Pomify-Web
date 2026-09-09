import React, { useState } from 'react';
import { OrbitControls, Html } from '@react-three/drei';
import CanvasViewer from '../../../components/3d/CanvasViewer';
import PomifyRobot3D from '../../robot-companion/components/PomifyRobot3D';
import RobotExpressions from '../../robot-companion/components/RobotExpressions';
import { Smile, RotateCcw, ZoomIn } from 'lucide-react';

export const ProductViewer3D = () => {
  const [activeEmotion, setActiveEmotion] = useState('happy');

  const emotions = [
    { id: 'happy', label: 'Happy', icon: '😊' },
    { id: 'curious', label: 'Curious', icon: '🥺' },
    { id: 'thinking', label: 'Thinking', icon: '🤔' },
    { id: 'caring', label: 'Caring', icon: '🥰' },
  ];

  return (
    <div className="w-full h-[520px] rounded-4xl bg-gradient-to-br from-white/90 via-purple-50/50 to-blue-50/40 border border-white shadow-soft-glass relative flex flex-col justify-between p-4 overflow-hidden">
      
      {/* Top Overlay Instructions */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-100 text-xs font-semibold text-pomify-navy shadow-sm">
        <RotateCcw className="w-3.5 h-3.5 text-pomify-purple" />
        <span>360° Interactive 3D Model</span>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full">
        <CanvasViewer cameraPosition={[0, 0, 4.8]}>
          <OrbitControls enablePan={false} minDistance={3.2} maxDistance={6.5} />
          <PomifyRobot3D scale={1.1} />
        </CanvasViewer>
      </div>

      {/* Bottom Emotion Selector Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-purple-100 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-bold text-pomify-navy">
          <Smile className="w-4 h-4 text-pomify-purple" />
          <span>Face LED Preview:</span>
        </div>
        <div className="flex items-center gap-1.5">
          {emotions.map((e) => (
            <button
              key={e.id}
              onClick={() => setActiveEmotion(e.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                activeEmotion === e.id
                  ? 'bg-pomify-purple text-white shadow-sm font-bold'
                  : 'bg-purple-50 text-pomify-navy hover:bg-purple-100'
              }`}
            >
              {e.icon} {e.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductViewer3D;
