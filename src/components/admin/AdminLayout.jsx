import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useTheme } from '../../context/ThemeContext';
import { getAdminNotificationsApi, markNotificationsReadApi } from '../../services/api';
import { Bell, Search, ShieldCheck, Sun, Moon, CheckCheck, Package, AlertCircle, ShoppingBag, Clock } from 'lucide-react';

export const AdminLayout = ({ children, title = 'Dashboard' }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('pomify_admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const fetchNotifs = async () => {
    const data = await getAdminNotificationsApi();
    if (data && data.data) {
      setNotifications(data.data);
      setUnreadCount(data.unreadCount || 0);
    }
  };

  useEffect(() => {
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 3000);
    return () => clearInterval(interval);
  }, []);


  const handleMarkAllRead = async () => {
    await markNotificationsReadApi();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  return (
    <div className={`flex min-h-screen font-sans antialiased transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Admin Navigation Sidebar */}
      <AdminSidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className={`h-16 border-b sticky top-0 z-30 px-6 flex items-center justify-between backdrop-blur-md transition-colors ${
          theme === 'dark'
            ? 'bg-slate-900/80 border-slate-800 text-white'
            : 'bg-white/80 border-slate-200 text-slate-900 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Live
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Search Input */}
            <div className="relative w-60 hidden sm:block">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Global Search..."
                className={`w-full pl-9 pr-4 py-1.5 border rounded-xl text-xs focus:outline-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-purple-500'
                    : 'bg-slate-100 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500'
                }`}
              />
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className={`p-2 rounded-xl border transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notification Center Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className={`relative p-2 rounded-xl border transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  </>
                )}
              </button>

              {/* Interactive Notification Feed Dropdown */}
              {showNotifDropdown && (
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl z-50 p-4 space-y-3 transition-colors ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      <Bell className="w-4 h-4 text-purple-400" /> System Notifications
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400">
                          {unreadCount} unread
                        </span>
                      )}
                    </h4>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] font-semibold text-purple-400 hover:underline flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No notifications yet.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          className={`p-3 rounded-xl border transition-colors flex items-start gap-3 ${
                            notif.isRead
                              ? theme === 'dark' ? 'bg-slate-800/30 border-slate-800/50' : 'bg-slate-50 border-slate-200'
                              : theme === 'dark' ? 'bg-purple-950/40 border-purple-800/60' : 'bg-purple-50 border-purple-200'
                          }`}
                        >
                          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                            {notif.type === 'stock' ? <AlertCircle className="w-4 h-4 text-amber-400" /> : <ShoppingBag className="w-4 h-4 text-purple-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-slate-200 dark:text-slate-100 flex items-center justify-between">
                              {notif.title}
                              <span className="text-[10px] font-normal text-slate-400">
                                {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </h5>
                            <p className="text-[11px] text-slate-400 dark:text-slate-300 mt-0.5 leading-snug">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
