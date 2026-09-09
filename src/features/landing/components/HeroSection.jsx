import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Bot, ShieldCheck, Heart, Zap } from 'lucide-react';
import Button from '../../../components/ui/Button';
import GlassCard from '../../../components/ui/GlassCard';
import SpeechBubble from '../../../components/ui/SpeechBubble';
import Badge from '../../../components/ui/Badge';
import CanvasViewer from '../../../components/3d/CanvasViewer';
import PomifyRobot3D from '../../robot-companion/components/PomifyRobot3D';
import MouseTracker3D from '../../robot-companion/components/MouseTracker3D';
import useRobotStore from '../../robot-companion/store/robotStore';
import useRobotAnimation from '../../robot-companion/hooks/useRobotAnimation';

export const HeroSection = () => {
  const { bubbleText, showBubble } = useRobotStore();
  const { onHoverCTA, resetToIdle } = useRobotAnimation();
  const [bubbleDelayed, setBubbleDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBubbleDelayed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MouseTracker3D>
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
        
        {/* Ambient Background Gradient Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pomify-purple/20 rounded-full filter blur-[100px] pointer-events-none animate-pulse-subtle" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pomify-blue/20 rounded-full filter blur-[100px] pointer-events-none animate-pulse-subtle" style={{ animationDelay: '1.5s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2">
                <Badge variant="purple" icon={Sparkles}>
                  Smart Tech • Cute Vibe
                </Badge>
                <Badge variant="glass">
                  Next-Gen AI Companion
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-pomify-navy leading-[1.15] tracking-tight">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-pomify-purple-dark via-pomify-purple to-pomify-blue">Pomify</span>.
                <br />
                Your AI companion with a heart.
              </h1>

              <p className="text-lg sm:text-xl text-pomify-subtext leading-relaxed font-normal max-w-xl">
                Your AI companion for a smarter, more connected everyday life. Designed to organize your day, anticipate your needs, and bring warm emotional presence to your desk.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#capabilities">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Sparkles}
                    onMouseEnter={() => onHoverCTA('explore')}
                    onMouseLeave={resetToIdle}
                  >
                    Explore Pomify
                  </Button>
                </a>
                <a href="/customize">
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={Bot}
                    onMouseEnter={() => onHoverCTA('create')}
                    onMouseLeave={resetToIdle}
                  >
                    Create Your Pomify
                  </Button>
                </a>
              </div>

              {/* Mini Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-purple-100/80 max-w-lg">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pomify-purple" />
                  <span className="text-xs font-semibold text-pomify-navy">Cute LED Face</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-pomify-blue" />
                  <span className="text-xs font-semibold text-pomify-navy">Real-time Voice</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-semibold text-pomify-navy">Smart Caring</span>
                </div>
              </div>
            </motion.div>

            {/* Right 3D Showcase Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[480px]"
            >
              {/* Floating Speech Bubble */}
              <div className="absolute top-4 z-30">
                <SpeechBubble text={bubbleText} visible={showBubble && bubbleDelayed} />
              </div>

              {/* Floating Decorative Glass Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 left-4 z-20 hidden sm:block"
              >
                <GlassCard className="!p-4 border-white/90 shadow-soft-glass backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-purple-100 flex items-center justify-center text-pomify-purple font-bold">
                      💡
                    </div>
                    <div>
                      <p className="text-xs font-bold text-pomify-navy">Adaptive AI</p>
                      <p className="text-[10px] text-pomify-subtext">Learns your routine</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-8 right-6 z-20 hidden sm:block"
              >
                <GlassCard className="!p-4 border-white/90 shadow-soft-glass backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                      🫶
                    </div>
                    <div>
                      <p className="text-xs font-bold text-pomify-navy">Caring Companion</p>
                      <p className="text-[10px] text-pomify-subtext">Reminds to take breaks</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* 3D Canvas with Interactive Pomify Robot */}
              <div className="w-full h-[450px] relative">
                <CanvasViewer cameraPosition={[0, 0, 5]}>
                  <PomifyRobot3D scale={1.25} position={[0, -0.3, 0]} />
                </CanvasViewer>
              </div>

              <div className="text-center mt-2">
                <p className="text-xs font-medium text-pomify-subtext flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Move cursor around to interact with Pomify 3D
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </MouseTracker3D>
  );
};

export default HeroSection;
