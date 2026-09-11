import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Lightbulb, Mic, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import useRobotStore from '../../robot-companion/store/robotStore';

export const CapabilitiesGrid = () => {
  const { setEmotion, setBubbleText } = useRobotStore();
  const [activeTab, setActiveTab] = useState('reminder');
  const [demoState, setDemoState] = useState('idle');

  // Trigger interactive feature action
  const runDemoAction = (tabKey) => {
    setDemoState('running');

    if (tabKey === 'reminder') {
      setEmotion('alert');
      setBubbleText('Alarm set! Take a 5-min walk at 3:00 PM 🔔');
      setTimeout(() => {
        setEmotion('caring');
        setDemoState('completed');
      }, 1800);
    } else if (tabKey === 'planning') {
      setEmotion('thinking');
      setBubbleText('Organizing tasks into calendar... 📅');
      setTimeout(() => {
        setEmotion('happy');
        setBubbleText('Schedule optimized cleanly! ✨');
        setDemoState('completed');
      }, 2000);
    } else if (tabKey === 'suggestion') {
      setEmotion('thinking');
      setBubbleText('Analyzing your work style... 💡');
      setTimeout(() => {
        setEmotion('happy');
        setBubbleText('Here is a recommended break playlist 🎵');
        setDemoState('completed');
      }, 2200);
    } else if (tabKey === 'interaction') {
      setEmotion('thinking');
      setBubbleText('Listening to voice wave... 🎙️');
      setTimeout(() => {
        setEmotion('happy');
        setBubbleText('Sure thing! I got you covered 🫶');
        setDemoState('completed');
      }, 1900);
    }
  };

  const capabilities = [
    {
      id: 'reminder',
      title: 'Smart Reminders',
      icon: Bell,
      tag: 'Caring Alert',
      color: 'from-amber-400 to-orange-400',
      description: 'Smart reminders based on your daily routine and wellness status.',
    },
    {
      id: 'planning',
      title: 'Auto Planning',
      icon: Calendar,
      tag: 'Task Sorting',
      color: 'from-blue-600 to-indigo-600',
      description: 'Automatically allocates your To-Do list to your peak focus hours.',
    },
    {
      id: 'suggestion',
      title: 'AI Insights',
      icon: Lightbulb,
      tag: 'Proactive Advice',
      color: 'from-emerald-400 to-teal-500',
      description: 'Provides intelligent insights, relaxing soundscapes, and break schedules.',
    },
    {
      id: 'interaction',
      title: 'Voice & Chat',
      icon: Mic,
      tag: 'Natural Voice',
      color: 'from-pink-400 to-rose-400',
      description: 'Two-way interaction with smooth voice recognition and natural emotional reactions.',
    },
  ];

  return (
    <section id="capabilities" className="py-24 relative overflow-hidden bg-pomify-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue" icon={Sparkles}>
            4 Pillars of Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pomify-navy tracking-tight">
            What Can <span className="text-pomify-purple">Pomify</span> Do?
          </h2>
          <p className="text-base sm:text-lg text-pomify-subtext leading-relaxed">
            Explore 4 core pillars designed to elevate your productivity and everyday experience.
          </p>
        </div>

        {/* Capabilities 4-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            const isSelected = activeTab === cap.id;

            return (
              <GlassCard
                key={cap.id}
                onClick={() => {
                  setActiveTab(cap.id);
                  runDemoAction(cap.id);
                }}
                className={`transition-all duration-300 ${
                  isSelected ? 'border-pomify-purple bg-white shadow-soft-glass scale-[1.03]' : 'hover:bg-white/80'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cap.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="purple">{cap.tag}</Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-pomify-navy mb-1">{cap.title}</h3>
                    <p className="text-xs text-pomify-subtext leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CapabilitiesGrid;
