import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLoginApi } from '../../services/api';
import { Bot, Lock, Mail, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@pomify.vn');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await adminLoginApi(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Authentication failed.');
      }
    } catch (err) {
      setError('System authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl shadow-lg shadow-purple-500/30 mb-4">
            <Bot className="w-8 h-8 text-white animate-bounce" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Pomify Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in with administrator credentials to manage store orders & inventory</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-950/80 border border-rose-800/80 rounded-2xl text-xs text-rose-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pomify.vn"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="p-3 bg-purple-950/40 border border-purple-800/40 rounded-2xl text-[11px] text-purple-300 space-y-1">
            <p className="font-semibold flex items-center gap-1 text-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Default Demo Account:
            </p>
            <p>Email: <code className="text-white font-mono">admin@pomify.vn</code></p>
            <p>Password: <code className="text-white font-mono">admin123</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Admin Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-slate-800 pt-4">
          <Link to="/" className="text-xs text-slate-400 hover:text-purple-300 inline-flex items-center gap-1.5 transition-colors">
            <Sparkles className="w-3.5 h-3.5" /> Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
