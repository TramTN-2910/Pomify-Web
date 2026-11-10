import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import useRobotStore from '../features/robot-companion/store/robotStore';
import { adminLoginApi } from '../services/api';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setBubbleText, triggerReaction } = useRobotStore();

  const [activeTab, setActiveTab] = useState('customer'); // 'customer' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailFocus = () => {
    setBubbleText("Welcome back! Type your email 😊", true);
    triggerReaction('happy');
  };

  const handlePasswordFocus = () => {
    setBubbleText("I am closing my eyes! Shy... 🙈", true);
    triggerReaction('caring');
  };

  const handleQuickAdmin = () => {
    setActiveTab('admin');
    setEmail('admin@pomify.vn');
    setPassword('admin123');
    setError('');
  };

  const handleQuickCustomer = () => {
    setActiveTab('customer');
    setEmail('alex@pomify.ai');
    setPassword('password123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const normalizedEmail = email.trim().toLowerCase();

      // Case A: Explicit Admin Tab OR Admin email detected
      if (activeTab === 'admin' || normalizedEmail === 'admin@pomify.vn' || normalizedEmail.includes('admin')) {
        const res = await adminLoginApi(email, password);
        if (res.success) {
          setBubbleText("Welcome back, Administrator! 🛡️", true);
          triggerReaction('happy');
          window.dispatchEvent(new Event('pomify_auth_change'));
          setTimeout(() => {
            navigate('/admin/orders');
          }, 600);
          return;
        } else {
          setError(res.message || 'Invalid administrator credentials.');
          setLoading(false);
          return;
        }
      }

      // Case B: Customer Sign In
      const customerData = {
        name: email.split('@')[0],
        email: email,
        role: 'customer',
      };
      const customerToken = `cust-token-${Date.now()}`;

      localStorage.setItem('pomify_customer_token', customerToken);
      localStorage.setItem('pomify_customer_user', JSON.stringify(customerData));
      window.dispatchEvent(new Event('pomify_auth_change'));

      setBubbleText("Welcome back! You're signed in 🎉", true);
      triggerReaction('happy');

      setTimeout(() => {
        // Redirect to Home or previous location (not stuck on /orders)
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }, 600);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto flex flex-col justify-center min-h-[75vh]">
        
        {/* Centered Glass Form */}
        <div className="p-8 sm:p-10 rounded-4xl bg-white/85 backdrop-blur-xl border border-purple-100 shadow-soft-glass space-y-5 text-left">
          
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-pomify-purple-dark text-xs font-bold mx-auto">
              {activeTab === 'admin' ? <ShieldCheck className="w-3.5 h-3.5 text-pomify-purple" /> : <User className="w-3.5 h-3.5" />}
              <span>{activeTab === 'admin' ? 'Administrator Access' : 'Account Access'}</span>
            </div>
            <h1 className="text-3xl font-black text-pomify-navy tracking-tight">
              {activeTab === 'admin' ? 'Admin Portal' : 'Welcome Back'} <span className="text-pomify-purple">.</span>
            </h1>
            <p className="text-xs text-pomify-subtext">
              {activeTab === 'admin'
                ? 'Sign in to access order processing, shipments, and inventory.'
                : 'Sign in to manage your Pomify companions and preferences.'}
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex p-1 bg-purple-50/80 rounded-2xl border border-purple-100">
            <button
              type="button"
              onClick={() => { setActiveTab('customer'); setError(''); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'customer'
                  ? 'bg-white text-pomify-purple-dark shadow-sm border border-purple-100'
                  : 'text-pomify-subtext hover:text-pomify-navy'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Customer
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('admin'); setError(''); if (!email) { setEmail('admin@pomify.vn'); setPassword('admin123'); } }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-white text-pomify-purple-dark shadow-sm border border-purple-100'
                  : 'text-pomify-subtext hover:text-pomify-navy'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-pomify-navy mb-1.5">
                {activeTab === 'admin' ? 'Admin Email Address' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-pomify-purple absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onFocus={handleEmailFocus}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === 'admin' ? 'admin@pomify.vn' : 'alex@pomify.ai'}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-bold focus:outline-none focus:border-pomify-purple transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-pomify-navy">Password</label>
                {activeTab === 'customer' && (
                  <Link to="/forgot-password" className="text-pomify-purple font-bold hover:underline">
                    Forgot password?
                  </Link>
                )}
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

            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={loading}
              className="w-full shadow-cute-float mt-2"
              icon={ArrowRight}
            >
              {loading
                ? 'Authenticating...'
                : activeTab === 'admin'
                ? 'Sign In to Admin Portal'
                : 'Sign In to Account'}
            </Button>
          </form>

          {/* Quick Demo Helper */}
          <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100/70 text-center space-y-1.5">
            <span className="text-[11px] font-bold text-pomify-subtext block uppercase tracking-wider">
              Quick Test Sign In
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleQuickAdmin}
                className="px-2.5 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 text-pomify-purple text-xs font-bold transition-all"
              >
                Admin (admin@pomify.vn)
              </button>
              <button
                type="button"
                onClick={handleQuickCustomer}
                className="px-2.5 py-1 rounded-xl bg-white hover:bg-slate-50 border border-purple-100 text-pomify-navy text-xs font-bold transition-all shadow-sm"
              >
                Customer
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-50 text-center text-xs text-pomify-subtext">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-pomify-purple hover:underline">
              Create Account
            </Link>
          </div>
        </div>

      </div>
    </PageContainer>
  );
};

export default LoginPage;
