import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Bot, Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import CanvasViewer from '../components/3d/CanvasViewer';
import PomifyRobot3D from '../features/robot-companion/components/PomifyRobot3D';
import useRobotStore from '../features/robot-companion/store/robotStore';
import SpeechBubble from '../components/ui/SpeechBubble';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setBubbleText, triggerReaction, bubbleText, showBubble } = useRobotStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailFocus = () => {
    setBubbleText("Welcome back! Type your email 😊", true);
    triggerReaction('happy');
  };

  const handlePasswordFocus = () => {
    setBubbleText("I am closing my eyes! Shy... 🙈", true);
    triggerReaction('caring');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBubbleText("Logging you in... 🎉", true);
    triggerReaction('happy');
    setTimeout(() => {
      navigate('/orders');
    }, 1000);
  };

  return (
    <PageContainer>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto flex flex-col justify-center min-h-[75vh]">
        
        {/* Centered Glass Form */}
        <div className="p-8 sm:p-10 rounded-4xl bg-white/80 backdrop-blur-xl border border-purple-100 shadow-soft-glass space-y-6 text-left">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-pomify-purple-dark text-xs font-bold mx-auto">
              <User className="w-3.5 h-3.5" />
              <span>Account Access</span>
            </div>
            <h1 className="text-3xl font-black text-pomify-navy tracking-tight">
              Welcome Back <span className="text-pomify-purple">.</span>
            </h1>
            <p className="text-xs text-pomify-subtext">Sign in to manage your Pomify companions and order history.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-pomify-navy mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-pomify-purple absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onFocus={handleEmailFocus}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@pomify.ai"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-bold focus:outline-none focus:border-pomify-purple transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-pomify-navy">Password</label>
                <Link to="/forgot-password" className="text-pomify-purple font-bold hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-pomify-purple absolute left-4 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onFocus={handlePasswordFocus}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-bold focus:outline-none focus:border-pomify-purple transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-pomify-purple"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button variant="primary" size="lg" type="submit" className="w-full shadow-cute-float mt-2" icon={ArrowRight}>
              Sign In to Account
            </Button>
          </form>

          <div className="pt-4 border-t border-purple-50 text-center text-xs text-pomify-subtext">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-pomify-purple hover:underline">Create Account</Link>
          </div>
        </div>

      </div>
    </PageContainer>
  );
};

export default LoginPage;
