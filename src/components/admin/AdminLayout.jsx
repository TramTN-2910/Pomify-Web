import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Bell, Search, ShieldCheck } from 'lucide-react';

export const AdminLayout = ({ children, title = 'Dashboard' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('pomify_admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-purple-500 selection:text-white">
      {/* Fixed Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Live Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Search */}
            <div className="relative w-64 hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm nhanh..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-800/80 border border-slate-700/60 rounded-xl text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500" />
            </button>
          </div>
        </header>

        {/* Page Main Content Container */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
