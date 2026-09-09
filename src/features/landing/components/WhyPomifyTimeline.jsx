import React from 'react';
import { motion } from 'framer-motion';
import { Brain, UserCheck, Heart, Sparkles } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import Badge from '../../../components/ui/Badge';
import useRobotStore from '../../robot-companion/store/robotStore';

export const WhyPomifyTimeline = () => {
  const { setEmotion, setBubbleText } = useRobotStore();

  const values = [
    {
      id: 'smart',
      tag: '01. SMART TECH',
      title: 'Smarter Than Standard Assistants',
      description: 'Pomify understands your schedule context, automatically adjusting smart task reminders based on your daily work habits.',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      emotion: 'thinking',
      bubble: 'Smart AI routing your day... 🧠',
      highlights: ['Predictive Tasking', 'Auto Priority Sorting', 'Focus Time Optimization'],
    },
    {
      id: 'personal',
      tag: '02. PERSONALIZED VIBE',
      title: 'Adorable Personalization & Adaptive Style',
      description: 'Never monotonous. Pomify switches expressions, colors, and tone of voice to match your unique personality and mood.',
      icon: UserCheck,
      color: 'from-pink-500 to-rose-400',
      emotion: 'curious',
      bubble: 'Learning your favorite vibe! ✨',
      highlights: ['3D Studio Material Customizer', 'Vivid LED Expressions', 'Personal Vibe Adaptation'],
    },
    {
      id: 'caring',
      tag: '03. CARING COMPANION',
      title: 'Knows When to Remind & When to Let You Rest',
      description: 'Understands the true value of tranquility. Pomify proactively detects fatigue signals to advise screen breaks right on time.',
      icon: Heart,
      color: 'from-emerald-400 to-teal-500',
      emotion: 'caring',
      bubble: 'Take a break! You did great today 🫶',
      highlights: ['Burnout Prevention', 'Hydration & Stretch Alerts', 'Long-term Wellness Protection'],
    },
  ];

  return (
    <section id="why-pomify" className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-50/20 via-white to-purple-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <Badge variant="purple" icon={Sparkles}>
            Why Choose Pomify?
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pomify-navy tracking-tight">
            Smarter. Cutest. <span className="text-pomify-purple">Always by your side.</span>
          </h2>
          <p className="text-base sm:text-lg text-pomify-subtext leading-relaxed">
            3 core pillars that make Pomify truly stand out from rigid traditional productivity tools.
          </p>
        </div>

        {/* Sequential Value Timeline Cards */}
        <div className="space-y-16 max-w-5xl mx-auto">
          {values.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                onViewportEnter={() => {
                  setEmotion(item.emotion);
                  setBubbleText(item.bubble);
                }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Content Side */}
                <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-xs font-extrabold tracking-widest text-pomify-purple uppercase">{item.tag}</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-pomify-navy leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-base text-pomify-subtext leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {item.highlights.map((point, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-white border border-purple-100 shadow-sm text-xs font-semibold text-pomify-navy flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pomify-purple" />
                        {point}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Card Side */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <GlassCard className="!p-8 bg-gradient-to-tr from-white to-purple-50/80 border-white/90 shadow-cute-float text-center space-y-6">
                    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center mx-auto shadow-md`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-pomify-purple tracking-widest uppercase">Core Pillar</span>
                      <h4 className="text-xl font-extrabold text-pomify-navy mt-1">{item.id.toUpperCase()} EXPERIENCE</h4>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/80 border border-purple-100/60 text-xs font-mono text-pomify-navy">
                      Emotion Trigger: <span className="font-bold text-pomify-purple capitalize">{item.emotion}</span>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyPomifyTimeline;
