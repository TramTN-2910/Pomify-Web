import React from 'react';
import { Package, Zap, Cable, BookOpen, Sparkles } from 'lucide-react';

export const WhatsInTheBox = () => {
  const boxItems = [
    {
      icon: '🤖',
      title: 'Pomify Robot Core',
      desc: '1x Pomify AI Robot Companion in selected color edition.',
    },
    {
      icon: '⚡',
      title: 'Magnetic Charging Dock',
      desc: '1x Fast-charging snap base with anti-slip silicone feet.',
    },
    {
      icon: '🔌',
      title: 'Braided Type-C Cable',
      desc: '1.5m Premium pastel braided USB-C power cord.',
    },
    {
      icon: '📘',
      title: 'Quick Start & Sticker Pack',
      desc: 'Setup guide + 3 sheets of cute custom Pomify stickers.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-left space-y-1">
        <h3 className="text-2xl font-extrabold text-pomify-navy">What's in the Box</h3>
        <p className="text-sm text-pomify-subtext">Everything you need to get started right out of the box.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {boxItems.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-purple-100 shadow-soft-glass flex flex-col items-center text-center space-y-3"
          >
            <div className="text-4xl p-3 bg-purple-50 rounded-2xl border border-purple-100">{item.icon}</div>
            <h4 className="font-extrabold text-sm text-pomify-navy">{item.title}</h4>
            <p className="text-xs text-pomify-subtext leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsInTheBox;
