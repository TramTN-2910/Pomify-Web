import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getDashboardStatsApi } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { DollarSign, ShoppingBag, Clock, AlertTriangle, TrendingUp, Package, ArrowUpRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const fetchStats = async () => {
    setLoading(true);
    const data = await getDashboardStatsApi();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  };

  if (loading || !stats) {
    return (
      <AdminLayout title="Sales Dashboard">
        <div className="flex items-center justify-center h-64 text-slate-400 gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-purple-500" />
          <span>Loading sales report analytics...</span>
        </div>
      </AdminLayout>
    );
  }

  const { summary, recentOrders, topProducts, salesTrend } = stats;

  const cardBgClass = theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm';
  const textTitleClass = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSubClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <AdminLayout title="Sales Dashboard">
      <div className="space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Revenue */}
          <div className={`p-5 rounded-3xl border shadow-xl relative overflow-hidden group transition-colors ${cardBgClass}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSubClass}`}>Total Revenue</span>
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className={`text-2xl font-black ${textTitleClass}`}>{formatVND(summary.totalRevenue)}</h3>
              <p className="text-xs text-emerald-500 font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18.5% from last month
              </p>
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div className={`p-5 rounded-3xl border shadow-xl relative overflow-hidden group transition-colors ${cardBgClass}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSubClass}`}>Total Orders</span>
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-2xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className={`text-2xl font-black ${textTitleClass}`}>{summary.totalOrders} orders</h3>
              <p className="text-xs text-indigo-500 font-medium flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 92% completion rate
              </p>
            </div>
          </div>

          {/* Card 3: Pending Orders */}
          <div className={`p-5 rounded-3xl border shadow-xl relative overflow-hidden group transition-colors ${cardBgClass}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSubClass}`}>Pending Orders</span>
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-amber-500">{summary.pendingOrders} orders</h3>
              <Link to="/admin/orders?status=Pending" className="text-xs text-amber-600 dark:text-amber-300 hover:underline flex items-center gap-1 mt-1">
                Review pending orders <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 4: Low Stock Alert */}
          <div className={`p-5 rounded-3xl border shadow-xl relative overflow-hidden group transition-colors ${cardBgClass}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${textSubClass}`}>Low Stock Alert</span>
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-rose-500">{summary.lowStockCount} items</h3>
              <Link to="/admin/inventory?status=Low Stock" className="text-xs text-rose-600 dark:text-rose-300 hover:underline flex items-center gap-1 mt-1">
                Inspect warehouse stock <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Charts & Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Growth Bar Chart Visualizer */}
          <div className={`lg:col-span-2 p-6 rounded-3xl border shadow-xl transition-colors ${cardBgClass}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-base font-bold flex items-center gap-2 ${textTitleClass}`}>
                  <TrendingUp className="w-5 h-5 text-purple-500" /> Revenue Growth Trend
                </h3>
                <p className={`text-xs ${textSubClass}`}>Monthly sales statistics (in millions VND)</p>
              </div>
              <span className="text-xs font-semibold text-purple-500 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full">
                2026 Analytics
              </span>
            </div>

            <div className="h-56 flex items-end justify-between gap-3 pt-8 px-2 border-b border-slate-800/40 pb-2">
              {salesTrend.map((item, idx) => {
                const maxRev = 200000000;
                const heightPercent = Math.min(100, Math.max(15, (item.revenue / maxRev) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-bold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {(item.revenue / 1000000).toFixed(0)}M
                    </span>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t-xl h-full flex items-end overflow-hidden">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-indigo-600 via-purple-500 to-pink-400 rounded-t-xl group-hover:brightness-125 transition-all duration-500"
                      />
                    </div>
                    <span className={`text-xs font-medium ${textSubClass} group-hover:text-purple-500 transition-colors`}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Selling Products */}
          <div className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between transition-colors ${cardBgClass}`}>
            <div>
              <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${textTitleClass}`}>
                <Package className="w-5 h-5 text-indigo-500" /> Top Selling Products
              </h3>
              <div className="space-y-3.5">
                {topProducts.map((prod, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl">
                    <div>
                      <h4 className={`text-xs font-bold ${textTitleClass} line-clamp-1`}>{prod.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">SKU: {prod.sku}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-purple-500">{prod.sold} sold</span>
                      <p className="text-[10px] text-slate-400">{prod.stock} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/admin/inventory"
              className="mt-4 text-center py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-xs font-semibold text-purple-500 rounded-2xl border border-purple-500/30 transition-colors"
            >
              Full Warehouse Control →
            </Link>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className={`p-6 rounded-3xl border shadow-xl transition-colors ${cardBgClass}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base font-bold flex items-center gap-2 ${textTitleClass}`}>
              <ShoppingBag className="w-5 h-5 text-pink-500" /> Recent Customer Orders
            </h3>
            <Link to="/admin/orders" className="text-xs text-purple-500 hover:underline font-semibold">
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Order Code</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                {recentOrders.map((order) => {
                  const statusColors = {
                    Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
                    Processing: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
                    Shipping: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
                    Delivered: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
                    Cancelled: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
                  };
                  return (
                    <tr key={order._id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-purple-500">{order.orderCode}</td>
                      <td className={`p-3.5 font-medium ${textTitleClass}`}>{order.customerName}</td>
                      <td className="p-3.5 font-bold text-emerald-500">{formatVND(order.totalAmount)}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${statusColors[order.status] || ''}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          to="/admin/orders"
                          className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 border border-purple-500/30 rounded-xl text-[11px] font-medium transition-colors"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
