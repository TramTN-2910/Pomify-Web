import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Boxes, LogOut, Sparkles, ExternalLink, Bot } from 'lucide-react';

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('pomify_admin_user') || '{}');

  const menuItems = [
    { label: 'Sales Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Order Management', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Inventory Control', path: '/admin/inventory', icon: Boxes },
  ];

  const handleLogout = () => {
    localStorage.removeItem('pomify_admin_token');
    localStorage.removeItem('pomify_admin_user');
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-slate-900 dark:bg-slate-900 text-slate-100 flex flex-col justify-between p-4 border-r border-slate-800 dark:border-slate-800 shadow-2xl min-h-screen select-none shrink-0 transition-colors">
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-200 bg-clip-text text-transparent">
              Pomify Admin
            </h1>
            <span className="text-[11px] text-purple-400 font-medium px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-800/50">
              v1.0 Store Console
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Management</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white shadow-md shadow-purple-900/40 border border-purple-400/20 translate-x-1'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info & Logout */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between text-xs text-purple-300 hover:text-purple-200 bg-purple-950/40 hover:bg-purple-900/50 px-3 py-2.5 rounded-xl border border-purple-800/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Customer Storefront
          </span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </Link>

        <div className="flex items-center justify-between bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt="Admin"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/40 shrink-0"
            />
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">{user.name || 'Pomify Admin'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email || 'admin@pomify.vn'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
