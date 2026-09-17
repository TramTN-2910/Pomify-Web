import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminOrdersApi, updateOrderStatusApi } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Search, RefreshCw, Eye, ChevronDown, Check, Ban, X } from 'lucide-react';

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const { theme } = useTheme();

  // Cancellation Reason Modal State
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('Customer Request');

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getAdminOrdersApi(statusFilter, searchTerm);
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleSelectStatus = (order, newStatus) => {
    // Rule 1: Cannot change status of a Cancelled order
    if (order.status === 'Cancelled') {
      alert('Order is Cancelled and locked. Status cannot be changed.');
      return;
    }

    // Rule 2: Cannot revert Delivered orders to Pending/Processing
    if (order.status === 'Delivered' && (newStatus === 'Pending' || newStatus === 'Processing')) {
      alert('Delivered orders cannot be reverted back to Pending or Processing.');
      return;
    }

    // Rule 3: If selecting Cancelled, open Cancellation Reason modal
    if (newStatus === 'Cancelled') {
      setCancellingOrder(order);
      setCancelReason('Customer Request');
      return;
    }

    // Otherwise proceed with direct update
    executeStatusUpdate(order._id, newStatus, '');
  };

  const executeStatusUpdate = async (orderId, status, reason) => {
    setUpdatingId(orderId);
    const res = await updateOrderStatusApi(orderId, status, undefined, reason);
    if (res.success) {
      setToastMessage(`Order status updated to '${status}' successfully!`);
      setTimeout(() => setToastMessage(''), 3000);
      setCancellingOrder(null);
      fetchOrders();
    } else {
      alert(res.message || 'Failed to update order status.');
    }
    setUpdatingId(null);
  };

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  };

  const statusOptions = ['Pending', 'Processing', 'Shipping', 'Delivered', 'Cancelled'];
  const cancelReasons = ['Customer Request', 'Out of Stock', 'Payment Failed', 'Invalid Shipping Address', 'Other'];

  const statusBadgeStyle = {
    Pending: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    Processing: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    Shipping: 'bg-purple-500/15 text-purple-500 border-purple-500/30',
    Delivered: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    Cancelled: 'bg-rose-500/15 text-rose-500 border-rose-500/30',
  };

  const isDark = theme === 'dark';
  const cardBgClass = isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-md';
  const textTitleClass = isDark ? 'text-slate-100' : 'text-slate-900';
  const textSubClass = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <AdminLayout title="Order Management">
      <div className="space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 border border-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <Check className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Filters & Search Header */}
        <div className={`p-5 rounded-3xl border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${cardBgClass}`}>
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {['All', ...statusOptions].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40'
                    : isDark
                    ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {st === 'All' ? 'All Orders' : st}
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
              placeholder="Search code, name, phone..."
              className={`w-full pl-10 pr-4 py-2 border rounded-2xl text-xs focus:outline-none focus:border-purple-500 transition-colors ${
                isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </form>
        </div>

        {/* Orders Table Container */}
        <div className={`rounded-3xl border shadow-xl overflow-hidden transition-colors ${cardBgClass}`}>
          {loading ? (
            <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-500" />
              <span>Fetching order history console...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-sm font-semibold">No matching customer orders found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`${isDark ? 'bg-slate-800 text-slate-200 border-b border-slate-700' : 'bg-slate-100 text-slate-700 border-b border-slate-200'} uppercase text-[10px] font-bold tracking-wider`}>
                  <tr>
                    <th className="p-4">Order Code & Date</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Purchased Items</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status & Action</th>
                    <th className="p-4 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                  {orders.map((order) => (
                    <tr key={order._id} className={`${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                      {/* Code & Date */}
                      <td className="p-4 font-medium">
                        <span className="font-mono font-bold text-purple-500 block">{order.orderCode}</span>
                        <span className={`text-[10px] ${textSubClass}`}>
                          {new Date(order.createdAt).toLocaleDateString('en-US')}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="p-4">
                        <p className={`font-bold ${textTitleClass}`}>{order.customerName}</p>
                        <p className={`text-[11px] ${textSubClass}`}>{order.customerPhone}</p>
                      </td>

                      {/* Items Summary */}
                      <td className="p-4 max-w-[220px]">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="truncate">
                            <span className={`font-semibold ${textTitleClass}`}>{item.name}</span>
                            <span className={`text-[10px] ml-1 ${textSubClass}`}>x{item.quantity}</span>
                            {item.customization?.color && (
                              <p className="text-[10px] text-purple-500">
                                {item.customization.color} ({item.customization.accessory || 'No ears'})
                              </p>
                            )}
                          </div>
                        ))}
                      </td>

                      {/* Total Amount */}
                      <td className="p-4 font-bold text-emerald-500 text-sm">
                        {formatVND(order.totalAmount)}
                      </td>

                      {/* Payment Method */}
                      <td className="p-4">
                        <span className={`font-semibold block ${textTitleClass}`}>{order.paymentMethod}</span>
                        <span className={`text-[10px] font-bold ${order.paymentStatus === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {order.paymentStatus === 'Paid' ? '✓ Paid' : '⏳ Unpaid'}
                        </span>
                      </td>

                      {/* Order Status Select Box */}
                      <td className="p-4">
                        <div className="relative inline-block">
                          <select
                            disabled={updatingId === order._id || order.status === 'Cancelled'}
                            value={order.status}
                            onChange={(e) => handleSelectStatus(order, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none appearance-none pr-8 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                              statusBadgeStyle[order.status] || ''
                            }`}
                          >
                            {statusOptions.map((st) => (
                              <option key={st} value={st} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                                {st}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                        </div>

                        {order.cancellationReason && (
                          <p className="text-[10px] text-rose-500 mt-1 italic font-semibold">Reason: {order.cancellationReason}</p>
                        )}
                      </td>

                      {/* Action View Detail */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className={`p-2 rounded-xl border transition-colors ${
                            isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-purple-400 border-slate-700'
                              : 'bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200'
                          }`}
                          title="View order details"
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

        {/* Cancellation Reason Modal */}
        {cancellingOrder && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`border w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 transition-colors ${cardBgClass}`}>
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                <h3 className="text-base font-bold text-rose-500 flex items-center gap-2">
                  <Ban className="w-5 h-5" /> Cancel Order {cancellingOrder.orderCode}
                </h3>
                <button onClick={() => setCancellingOrder(null)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className={textSubClass}>
                  Cancelling an order is permanent. Item stock will be automatically returned to inventory.
                </p>

                <div>
                  <label className={`block text-xs font-semibold ${textTitleClass} mb-1.5`}>Select Cancellation Reason:</label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className={`w-full p-2.5 border rounded-xl text-xs focus:outline-none focus:border-purple-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  >
                    {cancelReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setCancellingOrder(null)}
                  className={`flex-1 py-2.5 font-bold text-xs rounded-2xl transition-colors ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={() => executeStatusUpdate(cancellingOrder._id, 'Cancelled', cancelReason)}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-rose-600/30 transition-colors"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`border w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto transition-colors ${cardBgClass}`}>
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                <h3 className="text-base font-bold flex items-center gap-2">
                  Order Specs <span className="font-mono text-purple-500">{selectedOrder.orderCode}</span>
                </h3>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-200 text-lg">
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
                  <p className="font-bold">Shipping Recipient:</p>
                  <p>{selectedOrder.customerName} — {selectedOrder.customerPhone}</p>
                  <p className="text-slate-400">{selectedOrder.customerEmail}</p>
                  <p className="font-medium mt-1">📍 Address: {selectedOrder.shippingAddress}</p>
                  {selectedOrder.cancellationReason && (
                    <p className="text-rose-500 font-bold mt-1">🚫 Cancellation Reason: {selectedOrder.cancellationReason}</p>
                  )}
                  {selectedOrder.notes && <p className="text-amber-500 italic mt-1">Note: {selectedOrder.notes}</p>}
                </div>

                <div className="space-y-2">
                  <p className="font-bold">Purchased Items:</p>
                  {selectedOrder.items?.map((it, i) => (
                    <div key={i} className={`flex justify-between p-2.5 rounded-xl ${isDark ? 'bg-slate-800/40' : 'bg-slate-100'}`}>
                      <div>
                        <p className="font-semibold">{it.name}</p>
                        <p className="text-slate-400 text-[11px]">Price: {formatVND(it.price)} x {it.quantity}</p>
                      </div>
                      <p className="font-bold text-emerald-500">{formatVND(it.price * it.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-slate-700/50 pt-3 text-sm font-bold">
                  <span>Grand Total Amount:</span>
                  <span className="text-emerald-500 text-base">{formatVND(selectedOrder.totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-2xl transition-colors"
              >
                Close Specs
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
