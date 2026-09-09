import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, HeartHandshake, Zap, Volume2, ShieldCheck, Sparkles } from 'lucide-react';

export const ShopFeatureCards = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Neural Emotion Core',
      desc: 'Powered by adaptive micro-AI that reads your mood and evolves expressions naturally.',
      color: 'bg-purple-100 text-pomify-purple-dark',
    },
    {
      icon: HeartHandshake,
      title: 'Proactive Life Assistant',
      desc: 'Reminds you of schedules, meetings, and hydration breaks without intrusive noise.',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: Volume2,
      title: 'Hi-Fi Spatial Audio',
      desc: 'Dual noise-canceling mic array & warm acoustic speaker for natural voice chats.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Zap,
      title: 'Magnetic Wireless Dock',
      desc: 'Effortless snap-to-charge base with all-day 18-hour continuous battery life.',
      color: 'bg-emerald-100 text-emerald-600',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <h2 className="text-3xl font-extrabold text-pomify-navy tracking-tight">
          Why Everyone Loves Pomify <span className="text-pomify-purple">.</span>
        </h2>
        <p className="text-sm text-pomify-subtext">
          Designed with cute aesthetics and high-performance smart hardware.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-purple-100 shadow-soft-glass glass-card-hover flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-pomify-navy">{item.title}</h3>
                <p className="text-xs text-pomify-subtext leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-purple-50 flex items-center gap-1 text-[11px] font-bold text-pomify-purple">
                <span>Learn hardware specs</span>
                <Sparkles className="w-3 h-3" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ShopFeatureCards;
