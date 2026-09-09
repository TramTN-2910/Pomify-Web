import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Eye, Mic, Wifi, Fingerprint, Activity } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import Badge from '../../../components/ui/Badge';
import CanvasViewer from '../../../components/3d/CanvasViewer';
import PomifyRobot3D from '../../robot-companion/components/PomifyRobot3D';
import useRobotStore from '../../robot-companion/store/robotStore';

export const HardwareAnatomy = () => {
  const { setEmotion, setBubbleText } = useRobotStore();
  const [activePart, setActivePart] = useState('face');

  const anatomyParts = [
    {
      id: 'face',
      name: 'Cute LED Face Display',
      subtitle: '2D/Vector Facial Expressions',
      description: 'Vivid OLED screen displaying bi-color facial expressions (Happy, Thinking, Caring, Sleepy).',
      icon: Eye,
      emotion: 'happy',
      bubble: 'Inspecting LED Face display 👁️',
      position: 'top-left',
    },
    {
      id: 'voice',
      name: 'Dual Mic & Speaker Array',
      subtitle: 'Noise-Canceling Mic & Spatial Audio',
      description: 'Dual directional noise-canceling microphone array paired with spatial audio speaker.',
      icon: Mic,
      emotion: 'alert',
      bubble: 'Testing Voice Speaker Array 🎙️',
      position: 'top-right',
    },
    {
      id: 'brain',
      name: 'Pomify AI Chip & Neural Engine',
      subtitle: 'AI Neural Core Processor',
      description: 'On-device neural chip providing real-time local AI processing and adaptive routine learning.',
      icon: Cpu,
      emotion: 'thinking',
      bubble: 'Neural Engine active 🧠',
      position: 'bottom-left',
    },
    {
      id: 'touch',
      name: 'Touch & Proximity Sensors',
      subtitle: 'Touch & Proximity Sensors',
      description: 'Robot responds with cute reactions or smiles when you touch its head or shell.',
      icon: Fingerprint,
      emotion: 'caring',
      bubble: 'Touch sensor activated 🫶',
      position: 'bottom-right',
    },
    {
      id: 'connectivity',
      name: 'Wi-Fi 6 & Cloud Sync',
      subtitle: 'Secure Cloud & Local Sync',
      description: 'Real-time schedule synchronization and encrypted cloud backup.',
      icon: Wifi,
      emotion: 'curious',
      bubble: 'Cloud Sync connected ☁️',
      position: 'center-bottom',
    },
  ];

  const handleSelectPart = (part) => {
    setActivePart(part.id);
    setEmotion(part.emotion);
    setBubbleText(part.bubble);
  };

  return (
    <section id="our-robot" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white rounded-[40px] my-12 mx-4 sm:mx-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="purple" icon={Activity}>
            Hardware Showroom Anatomy
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Meet the Hardware Behind <span className="text-pomify-purple">Pomify</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore the intricate hardware architecture packed inside this adorable desk companion.
          </p>
        </div>

        {/* Anatomy Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Callout Panels */}
          <div className="lg:col-span-4 space-y-4">
            {anatomyParts.slice(0, 2).map((part) => {
              const Icon = part.icon;
              const isSelected = activePart === part.id;

              return (
                <div
                  key={part.id}
                  onClick={() => handleSelectPart(part)}
                  onMouseEnter={() => handleSelectPart(part)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white/15 border-pomify-purple shadow-glow-purple scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-pomify-purple/20 text-pomify-purple flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{part.name}</h4>
                      <p className="text-xs text-pomify-purple font-medium">{part.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{part.description}</p>
                </div>
              );
            })}
          </div>

          {/* Center 3D Model Showcase */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center min-h-[420px]">
            <div className="w-full h-[400px] relative">
              <CanvasViewer cameraPosition={[0, 0, 5]}>
                <PomifyRobot3D scale={1.2} position={[0, -0.2, 0]} />
              </CanvasViewer>
            </div>

            {/* Selected Hardware Tag */}
            <div className="mt-4 px-4 py-2 rounded-full bg-pomify-purple/20 border border-pomify-purple/40 text-xs font-mono font-bold text-pomify-purple">
              Active Callout: {activePart.toUpperCase()}
            </div>
          </div>

          {/* Right Callout Panels */}
          <div className="lg:col-span-4 space-y-4">
            {anatomyParts.slice(2, 5).map((part) => {
              const Icon = part.icon;
              const isSelected = activePart === part.id;

              return (
                <div
                  key={part.id}
                  onClick={() => handleSelectPart(part)}
                  onMouseEnter={() => handleSelectPart(part)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white/15 border-pomify-purple shadow-glow-purple scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-pomify-blue/20 text-pomify-blue flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{part.name}</h4>
                      <p className="text-xs text-pomify-blue font-medium">{part.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{part.description}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HardwareAnatomy;
