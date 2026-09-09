import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, ListTodo, MessageSquare, HeartHandshake, Sparkles } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import Badge from '../../../components/ui/Badge';
import CanvasViewer from '../../../components/3d/CanvasViewer';
import PomifyRobot3D from '../../robot-companion/components/PomifyRobot3D';
import useRobotAnimation from '../../robot-companion/hooks/useRobotAnimation';

export const WhatIsPomify = () => {
  const { onHoverFeature, resetToIdle } = useRobotAnimation();
  const [activeConcept, setActiveConcept] = useState('manage');

  const concepts = [
    {
      id: 'manage',
      title: 'Manage Your Life',
      subtitle: 'Quản lý công việc & thời gian',
      description: 'Pomify tự động sắp xếp các nhiệm vụ trong ngày ngăn nắp, giúp bạn giữ tinh thần thoải mái.',
      icon: Calendar,
      color: 'bg-purple-100 text-pomify-purple-dark',
    },
    {
      id: 'remind',
      title: 'Smart Reminders',
      subtitle: 'Nhắc nhở thông minh & quan tâm',
      description: 'Nhắc lịch hẹn, uống nước, nghỉ ngơi hợp lý đúng thời điểm mà không gây phiền phức.',
      icon: Bell,
      color: 'bg-pink-100 text-pink-700',
    },
    {
      id: 'plan',
      title: 'Adaptive Planning',
      subtitle: 'Lập kế hoạch thích ứng',
      description: 'Linh hoạt điều chỉnh lịch trình khi có công việc đột xuất hoặc thay đổi ưu tiên.',
      icon: ListTodo,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'connect',
      title: 'Voice & Chat Connection',
      subtitle: 'Tương tác giọng nói & Chat',
      description: 'Trò chuyện tự nhiên như một người bạn thực sự với sóng âm giọng nói và cảm xúc linh hoạt.',
      icon: MessageSquare,
      color: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <section id="what-is-pomify" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-purple-50/30 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="purple" icon={HeartHandshake}>
            What is Pomify?
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pomify-navy tracking-tight">
            More than technology.
            <br />
            <span className="text-pomify-purple">A companion that truly cares.</span>
          </h2>
          <p className="text-base sm:text-lg text-pomify-subtext leading-relaxed">
            Pomify không chỉ là một ứng dụng trợ lý thông thường. Đây là sinh thể robot AI có tính cách, mang tới sự thư thái, năng suất và kết nối ấm áp cho không gian làm việc của bạn.
          </p>
        </div>

        {/* Split Layout: Left Content Story / Right Interactive Robot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Concepts Column */}
          <div className="lg:col-span-7 space-y-4">
            {concepts.map((item) => {
              const Icon = item.icon;
              const isSelected = activeConcept === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    setActiveConcept(item.id);
                    onHoverFeature(item.id);
                  }}
                  onMouseLeave={resetToIdle}
                >
                  <GlassCard
                    hoverEffect={false}
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? '!bg-white border-pomify-purple/60 shadow-soft-glass scale-[1.02]'
                        : 'hover:bg-white/90 opacity-90'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-pomify-navy">{item.title}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-pomify-subtext font-semibold">{item.subtitle}</span>
                        </div>
                        <p className="text-sm text-pomify-subtext leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>

          {/* Right Interactive 3D Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <GlassCard className="w-full !p-4 border-white/90 shadow-cute-float text-center bg-white/80 backdrop-blur-lg">
              <div className="flex items-center justify-between px-2 py-1 mb-2 border-b border-purple-100/60">
                <span className="text-xs font-bold text-pomify-navy flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pomify-purple" />
                  Live Concept Reaction
                </span>
                <span className="text-[11px] text-pomify-purple font-semibold capitalize">
                  Mode: {activeConcept}
                </span>
              </div>

              <div className="w-full h-[380px] relative">
                <CanvasViewer cameraPosition={[0, 0, 5]}>
                  <PomifyRobot3D scale={1.15} position={[0, -0.2, 0]} />
                </CanvasViewer>
              </div>

              <p className="text-xs text-pomify-subtext mt-2 font-medium">
                Hover over concepts on the left to see Pomify's real-time focus & emotion switch.
              </p>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsPomify;
