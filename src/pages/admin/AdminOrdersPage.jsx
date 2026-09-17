import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminOrdersApi, updateOrderStatusApi } from '../../services/api';
import { Search, Filter, RefreshCw, Eye, CheckCircle, Truck, PackageCheck, AlertCircle, XCircle, ChevronDown, Check } from 'lucide-react';

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getAdminOrdersApi(statusFilter, searchTerm);
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    const res = await updateOrderStatusApi(orderId, newStatus);
    if (res.success) {
      setToastMessage(`Đã cập nhật đơn hàng sang '${newStatus}'!`);
      setTimeout(() => setToastMessage(''), 3000);
      fetchOrders();
    } else {
      alert(res.message || 'Cập nhật thất bại.');
    }
    setUpdatingId(null);
  };

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  };

  const statusOptions = ['Pending', 'Processing', 'Shipping', 'Delivered', 'Cancelled'];

  const statusBadgeStyle = {
    Pending: 'bg-amber-950/80 text-amber-300 border-amber-800/80',
    Processing: 'bg-blue-950/80 text-blue-300 border-blue-800/80',
    Shipping: 'bg-purple-950/80 text-purple-300 border-purple-800/80',
    Delivered: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80',
    Cancelled: 'bg-rose-950/80 text-rose-300 border-rose-800/80',
  };

  return (
    <AdminLayout title="Quản lý Đơn hàng">
      <div className="space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 border border-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <Check className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Filters & Search Header */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {['All', ...statusOptions].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {st === 'All' ? 'Tất cả đơn' : st}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm mã đơn, tên, sđt..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </form>
        </div>

        {/* Orders Table Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
              <span>Đang lấy danh sách đơn hàng...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-sm font-semibold">Không tìm thấy đơn hàng phù hợp.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Mã Đơn & Ngày</th>
                    <th className="p-4">Khách Hàng</th>
                    <th className="p-4">Sản Phẩm</th>
                    <th className="p-4">Tổng Tiền</th>
                    <th className="p-4">Thanh Toán</th>
                    <th className="p-4">Trạng Thái Đơn</th>
                    <th className="p-4 text-right">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Code & Date */}
                      <td className="p-4 font-medium">
                        <span className="font-mono font-bold text-purple-300 block">{order.orderCode}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="p-4">
                        <p className="font-bold text-slate-100">{order.customerName}</p>
                        <p className="text-[11px] text-slate-400">{order.customerPhone}</p>
                      </td>

                      {/* Items Summary */}
                      <td className="p-4 max-w-[200px]">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="truncate">
                            <span className="font-semibold text-slate-200">{item.name}</span>
                            <span className="text-slate-400 text-[10px] ml-1">x{item.quantity}</span>
                            {item.customization?.color && (
                              <p className="text-[10px] text-purple-400">
                                Color: {item.customization.color} ({item.customization.accessory || 'No ears'})
                              </p>
                            )}
                          </div>
                        ))}
                      </td>

                      {/* Total Amount */}
                      <td className="p-4 font-bold text-emerald-400 text-sm">
                        {formatVND(order.totalAmount)}
                      </td>

                      {/* Payment Method & Status */}
                      <td className="p-4">
                        <span className="font-semibold text-slate-300 block">{order.paymentMethod}</span>
                        <span
                          className={`text-[10px] font-bold ${
                            order.paymentStatus === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {order.paymentStatus === 'Paid' ? '✓ Đã thanh toán' : '⏳ Chưa thanh toán'}
                        </span>
                      </td>

                      {/* Order Status Select Box */}
                      <td className="p-4">
                        <div className="relative inline-block">
                          <select
                            disabled={updatingId === order._id}
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none appearance-none pr-8 cursor-pointer transition-all ${
                              statusBadgeStyle[order.status] || ''
                            }`}
                          >
                            {statusOptions.map((st) => (
                              <option key={st} value={st} className="bg-slate-900 text-slate-100">
                                {st}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300" />
                        </div>
                      </td>

                      {/* Action Detail Drawer */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-xl border border-slate-700 transition-colors"
                          title="Xem chi tiết đơn"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Chi Tiết Đơn Hàng <span className="font-mono text-purple-400">{selectedOrder.orderCode}</span>
                </h3>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white text-lg">
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                  <p className="font-bold text-slate-200">Thông tin người nhận:</p>
                  <p className="text-slate-300">{selectedOrder.customerName} — {selectedOrder.customerPhone}</p>
                  <p className="text-slate-400">{selectedOrder.customerEmail}</p>
                  <p className="text-slate-300 font-medium mt-1">📍 Địa chỉ: {selectedOrder.shippingAddress}</p>
                  {selectedOrder.notes && <p className="text-amber-300 italic mt-1">Ghi chú: {selectedOrder.notes}</p>}
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-slate-200">Danh sách mặt hàng:</p>
                  {selectedOrder.items?.map((it, i) => (
                    <div key={i} className="flex justify-between p-2.5 bg-slate-800/30 rounded-xl">
                      <div>
                        <p className="font-semibold text-white">{it.name}</p>
                        <p className="text-slate-400 text-[11px]">Đơn giá: {formatVND(it.price)} x {it.quantity}</p>
                      </div>
                      <p className="font-bold text-emerald-400">{formatVND(it.price * it.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-slate-800 pt-3 text-sm font-bold">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-emerald-400 text-base">{formatVND(selectedOrder.totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-2xl transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
