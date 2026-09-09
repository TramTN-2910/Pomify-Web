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
      color: 'from-pomify-purple to-pomify-blue',
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
            Explore 4 interactive core pillars. Click on any pillar to trigger a real-time live demo with Pomify.
          </p>
        </div>

        {/* Capabilities 4-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                className={`cursor-pointer transition-all duration-300 ${
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
                  <button className="text-xs font-bold text-pomify-purple flex items-center gap-1 hover:underline">
                    Test Live Demo &rarr;
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Live Interactive Sandbox / Demo Console */}
        <GlassCard className="max-w-4xl mx-auto !p-8 bg-white/90 border-purple-100 shadow-cute-float">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-purple-100">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono font-bold text-pomify-navy ml-2">
                Live Playground — Sandbox Mode [{activeTab.toUpperCase()}]
              </span>
            </div>
            <Badge variant="mint" icon={CheckCircle2}>Interactive</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Interactive Controls */}
            <div className="md:col-span-7 space-y-5">
              {activeTab === 'reminder' && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-pomify-navy block">Set Smart Water & Rest Reminder:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Drink water every 45 mins"
                      defaultValue="Remind me to rest & drink water in 45m"
                      className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-pomify-purple"
                    />
                    <Button variant="primary" size="sm" onClick={() => runDemoAction('reminder')}>
                      Trigger
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'planning' && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-pomify-navy block">Auto Task Sorter Demo:</label>
                  <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-semibold text-pomify-navy">
                      <span>✓ Finish Pomify Web Specs</span>
                      <span className="text-pomify-purple">09:00 AM</span>
                    </div>
                    <div className="flex items-center justify-between font-semibold text-pomify-navy">
                      <span>✓ 15-min Stretch Break</span>
                      <span className="text-emerald-600">10:30 AM</span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => runDemoAction('planning')}>
                    Optimize Calendar Now
                  </Button>
                </div>
              )}

              {activeTab === 'suggestion' && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-pomify-navy block">AI Workstyle Insight:</label>
                  <p className="text-xs text-pomify-subtext">Pomify detected you have been working continuously for 2 hours. Recommending a calming Lofi playlist.</p>
                  <Button variant="pink" size="sm" onClick={() => runDemoAction('suggestion')}>
                    Get AI Recommendation
                  </Button>
                </div>
              )}

              {activeTab === 'interaction' && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-pomify-navy block">Voice Wave Simulation:</label>
                  <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-1.5 h-6">
                      <div className="w-1 bg-pomify-purple h-full animate-wave" />
                      <div className="w-1 bg-pomify-blue h-3/4 animate-wave" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1 bg-pomify-pink h-full animate-wave" style={{ animationDelay: '0.4s' }} />
                      <div className="w-1 bg-pomify-mint h-1/2 animate-wave" style={{ animationDelay: '0.1s' }} />
                    </div>
                    <span className="text-xs text-slate-300 font-mono">Listening "Hey Pomify..."</span>
                    <Volume2 className="w-4 h-4 text-pomify-blue animate-pulse" />
                  </div>
                  <Button variant="primary" size="sm" onClick={() => runDemoAction('interaction')}>
                    Speak to Pomify
                  </Button>
                </div>
              )}
            </div>

            {/* Sandbox Status Display */}
            <div className="md:col-span-5 p-5 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Robot Reaction Status</span>
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto text-2xl shadow-inner">
                {demoState === 'running' ? '⚡' : demoState === 'completed' ? '✨' : '🤖'}
              </div>
              <p className="text-xs font-bold text-pomify-navy">
                {demoState === 'running' ? 'Processing Action...' : demoState === 'completed' ? 'Action Executed!' : 'Ready for test input'}
              </p>
            </div>

          </div>
        </GlassCard>

      </div>
    </section>
  );
};

export default CapabilitiesGrid;
