import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, MessageCircle, Heart, Clock, Music, Cpu, Compass, Layers } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import Badge from '../../../components/ui/Badge';
import useRobotStore from '../../robot-companion/store/robotStore';

export const FeaturesCatalog = () => {
  const { emotion, setEmotion } = useRobotStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Automatic emotion cycle demo
  useEffect(() => {
    const emotions = ['happy', 'curious', 'thinking', 'caring', 'sleepy'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % emotions.length;
      setEmotion(emotions[idx]);
    }, 3000);
    return () => clearInterval(interval);
  }, [setEmotion]);

  const categories = [
    { id: 'all', label: 'All Features' },
    { id: 'productivity', label: '⚡ Productivity' },
    { id: 'ai', label: '🧠 AI Capabilities' },
    { id: 'communication', label: '💬 Communication' },
    { id: 'companionship', label: '🫶 Companionship' },
  ];

  const features = [
    {
      id: 1,
      category: 'productivity',
      title: 'Smart Pomodoro Timer',
      description: 'Smart Pomodoro focus timer with automated short/long break ambient light cycles.',
      icon: Clock,
      badge: 'Productivity',
    },
    {
      id: 2,
      category: 'productivity',
      title: 'Task Sorting & Priority',
      description: 'Automated task prioritization based on urgency and optimal energy hours.',
      icon: Zap,
      badge: 'Productivity',
    },
    {
      id: 3,
      category: 'ai',
      title: 'Proactive Mood Sensor',
      description: 'Detects work rhythm and suggests soundscape changes when stress is detected.',
      icon: Cpu,
      badge: 'AI Engine',
    },
    {
      id: 4,
      category: 'ai',
      title: 'Voice Wave Synthesis',
      description: 'Smooth voice synthesis delivering instant responses to your questions.',
      icon: Sparkles,
      badge: 'AI Engine',
    },
    {
      id: 5,
      category: 'communication',
      title: 'Dual-mode AI Chat',
      description: 'Converse via floating AI chat widget or hands-free direct voice interaction.',
      icon: MessageCircle,
      badge: 'Chat & Voice',
    },
    {
      id: 6,
      category: 'communication',
      title: 'Speech Recognition',
      description: 'Accurate voice recognition equipped with ambient noise filtering.',
      icon: Compass,
      badge: 'Chat & Voice',
    },
    {
      id: 7,
      category: 'companionship',
      title: 'Warm Idle Companion',
      description: 'Sits on your desk with cute LED facial expressions and gentle micro-animations.',
      icon: Heart,
      badge: 'Companion',
    },
    {
      id: 8,
      category: 'companionship',
      title: 'Lofi Relax Soundscapes',
      description: 'Plays relaxing Lofi melodies and nature ambient soundscapes to recharge your focus.',
      icon: Music,
      badge: 'Companion',
    },
  ];

  const filteredFeatures = selectedCategory === 'all'
    ? features
    : features.filter((f) => f.category === selectedCategory);

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-pomify-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="purple" icon={Layers}>
            Features Catalog
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pomify-navy tracking-tight">
            Comprehensive Suite of <span className="text-pomify-purple">Features</span>
          </h2>
          <p className="text-base sm:text-lg text-pomify-subtext leading-relaxed">
            Discover the complete suite of smart features designed to elevate your daily focus and wellness.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-pomify-purple text-white shadow-cute-float scale-105'
                  : 'bg-white/80 text-pomify-navy hover:bg-white border border-purple-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Emotion Cycle Indicator */}
        <div className="mb-8 p-4 rounded-3xl bg-white/70 border border-purple-100 max-w-md mx-auto flex items-center justify-between text-xs">
          <span className="font-semibold text-pomify-navy">Live Robot Emotion State:</span>
          <span className="font-mono font-bold text-pomify-purple uppercase px-3 py-1 rounded-full bg-purple-100">
            {emotion}
          </span>
        </div>

        {/* 4-Column Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <GlassCard key={feat.id} className="!p-6 space-y-4 border-white/90">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-purple-100 text-pomify-purple flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant="glass">{feat.badge}</Badge>
                </div>
                <div>
                  <h3 className="text-base font-bold text-pomify-navy mb-1">{feat.title}</h3>
                  <p className="text-xs text-pomify-subtext leading-relaxed">{feat.description}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesCatalog;
