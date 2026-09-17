import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getDashboardStatsApi } from '../../services/api';
import { DollarSign, ShoppingBag, Clock, AlertTriangle, TrendingUp, Package, ArrowUpRight, CheckCircle2, Truck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
          <span>Đang tải dữ liệu báo cáo doanh số...</span>
        </div>
      </AdminLayout>
    );
  }

  const { summary, recentOrders, topProducts, salesTrend } = stats;

  return (
    <AdminLayout title="Sales Dashboard">
      <div className="space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Revenue */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tổng Doanh Thu</span>
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-white">{formatVND(summary.totalRevenue)}</h3>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18.5% so với tháng trước
              </p>
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tổng Đơn Hàng</span>
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-white">{summary.totalOrders} đơn</h3>
              <p className="text-xs text-indigo-400 font-medium flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Tỉ lệ hoàn thành 92%
              </p>
            </div>
          </div>

          {/* Card 3: Pending Orders */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Đơn Chờ Xử Lý</span>
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-amber-400">{summary.pendingOrders} đơn</h3>
              <Link to="/admin/orders?status=Pending" className="text-xs text-amber-300 hover:underline flex items-center gap-1 mt-1">
                Cần duyệt ngay <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 4: Low Stock Alert */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cảnh Báo Tồn Kho</span>
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-rose-400">{summary.lowStockCount} sản phẩm</h3>
              <Link to="/admin/inventory?status=Low Stock" className="text-xs text-rose-300 hover:underline flex items-center gap-1 mt-1">
                Xem kho sắp hết <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Charts & Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart Visualizer */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" /> Biểu Đồ Tăng Trưởng Doanh Thu
                </h3>
                <p className="text-xs text-slate-400">Doanh thu thống kê theo tháng (triệu VNĐ)</p>
              </div>
              <span className="text-xs font-semibold text-purple-300 bg-purple-950/80 border border-purple-800 px-3 py-1 rounded-full">
                2026 Analytics
              </span>
            </div>

            {/* Custom Bar Visualizer */}
            <div className="h-56 flex items-end justify-between gap-3 pt-8 px-2 border-b border-slate-800 pb-2">
              {salesTrend.map((item, idx) => {
                const maxRev = 200000000;
                const heightPercent = Math.min(100, Math.max(15, (item.revenue / maxRev) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-bold text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {(item.revenue / 1000000).toFixed(0)}M
                    </span>
                    <div className="w-full bg-slate-800/80 rounded-t-xl h-full flex items-end overflow-hidden">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-indigo-600 via-purple-500 to-pink-400 rounded-t-xl group-hover:brightness-125 transition-all duration-500"
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-indigo-400" /> Sản Phẩm Bán Chạy
              </h3>
              <div className="space-y-3.5">
                {topProducts.map((prod, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{prod.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">SKU: {prod.sku}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-purple-300">{prod.sold} đã bán</span>
                      <p className="text-[10px] text-slate-400">Còn {prod.stock} sp</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/admin/inventory"
              className="mt-4 text-center py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-purple-300 rounded-2xl border border-slate-700 transition-colors"
            >
              Quản lý kho chi tiết →
            </Link>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-pink-400" /> Đơn Hàng Mới Nhất
            </h3>
            <Link to="/admin/orders" className="text-xs text-purple-400 hover:underline font-semibold">
              Xem tất cả đơn hàng →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 uppercase text-[10px] font-bold text-slate-400 tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Mã Đơn</th>
                  <th className="p-3.5">Khách Hàng</th>
                  <th className="p-3.5">Tổng Tiền</th>
                  <th className="p-3.5">Trạng Thái</th>
                  <th className="p-3.5 rounded-r-xl text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentOrders.map((order) => {
                  const statusColors = {
                    Pending: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
                    Processing: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
                    Shipping: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
                    Delivered: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
                    Cancelled: 'bg-rose-950/80 text-rose-300 border-rose-800/60',
                  };
                  return (
                    <tr key={order._id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-purple-300">{order.orderCode}</td>
                      <td className="p-3.5 font-medium text-white">{order.customerName}</td>
                      <td className="p-3.5 font-bold text-emerald-400">{formatVND(order.totalAmount)}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${statusColors[order.status] || ''}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          to="/admin/orders"
                          className="px-3 py-1 bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-800/50 rounded-xl text-[11px] font-medium transition-colors"
                        >
                          Cập nhật
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
