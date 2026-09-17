import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminInventoryApi, updateInventoryItemApi } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Search, Boxes, Edit2, Save, RefreshCw, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export const AdminInventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editStock, setEditStock] = useState(0);
  const [editPrice, setEditPrice] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const { theme } = useTheme();

  const fetchInventory = async () => {
    setLoading(true);
    const data = await getAdminInventoryApi(categoryFilter, statusFilter, searchTerm);
    setInventory(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, [categoryFilter, statusFilter]);

  const handleStartEdit = (item) => {
    setEditingId(item._id);
    setEditStock(item.stock);
    setEditPrice(item.price);
  };

  const handleSaveEdit = async (id) => {
    const res = await updateInventoryItemApi(id, editStock, editPrice);
    if (res.success) {
      setToastMessage('Inventory stock & price updated successfully!');
      setTimeout(() => setToastMessage(''), 3000);
      setEditingId(null);
      fetchInventory();
    } else {
      alert(res.message || 'Failed to update warehouse stock.');
    }
  };

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  };

  const stockBadge = {
    'In Stock': { color: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30', icon: CheckCircle2 },
    'Low Stock': { color: 'bg-amber-500/15 text-amber-500 border-amber-500/30', icon: AlertTriangle },
    'Out of Stock': { color: 'bg-rose-500/15 text-rose-500 border-rose-500/30', icon: XCircle },
  };

  const isDark = theme === 'dark';
  const cardBgClass = isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-md';
  const textTitleClass = isDark ? 'text-slate-100' : 'text-slate-900';
  const textSubClass = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <AdminLayout title="Inventory Control">
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 border border-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Filters Header */}
        <div className={`p-5 rounded-3xl border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${cardBgClass}`}>
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <div className={`flex items-center p-1 rounded-2xl border text-xs ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
              {['All', 'Robots', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    categoryFilter === cat
                      ? 'bg-purple-600 text-white shadow-sm'
                      : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className={`flex items-center p-1 rounded-2xl border text-xs ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
              {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    statusFilter === st
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {st === 'All' ? 'All Statuses' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                fetchInventory();
              }}
              placeholder="Search product, SKU..."
              className={`w-full pl-10 pr-4 py-2 border rounded-2xl text-xs focus:outline-none focus:border-purple-500 transition-colors ${
                isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Inventory Table List */}
        <div className={`rounded-3xl border shadow-xl overflow-hidden transition-colors ${cardBgClass}`}>
          {loading ? (
            <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-500" />
              <span>Checking warehouse stock levels...</span>
            </div>
          ) : inventory.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-sm font-semibold">No products found matching inventory criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`${isDark ? 'bg-slate-800 text-slate-200 border-b border-slate-700' : 'bg-slate-100 text-slate-700 border-b border-slate-200'} uppercase text-[10px] font-bold tracking-wider`}>
                  <tr>
                    <th className="p-4">Product Specs</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Unit Price</th>
                    <th className="p-4">Stock Quantity</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Quick Edit</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                  {inventory.map((item) => {
                    const isEditing = editingId === item._id;
                    const BadgeIcon = stockBadge[item.status]?.icon || Boxes;
                    return (
                      <tr key={item._id} className={`${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                        {/* Product Info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className={`w-10 h-10 rounded-xl object-cover border ${isDark ? 'border-slate-700' : 'border-slate-200'} shrink-0`}
                            />
                            <div>
                              <p className={`font-bold ${textTitleClass}`}>{item.name}</p>
                              <p className={`text-[10px] ${textSubClass} font-mono`}>SKU: {item.sku}</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className={`p-4 font-semibold ${textSubClass}`}>{item.category}</td>

                        {/* Price */}
                        <td className="p-4 font-bold text-emerald-500 text-sm">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className={`w-28 px-2 py-1 border border-purple-500 rounded-lg font-bold text-xs ${
                                isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'
                              }`}
                            />
                          ) : (
                            formatVND(item.price)
                          )}
                        </td>

                        {/* Stock Quantity */}
                        <td className={`p-4 font-black text-sm ${textTitleClass}`}>
                          {isEditing ? (
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(e.target.value)}
                              className={`w-20 px-2 py-1 border border-purple-500 rounded-lg font-bold text-xs ${
                                isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'
                              }`}
                            />
                          ) : (
                            <span>{item.stock} units</span>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold ${
                              stockBadge[item.status]?.color || ''
                            }`}
                          >
                            <BadgeIcon className="w-3.5 h-3.5" />
                            {item.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          {isEditing ? (
                            <button
                              onClick={() => handleSaveEdit(item._id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 ml-auto transition-colors"
                            >
                              <Save className="w-3.5 h-3.5" /> Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartEdit(item)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 ml-auto border transition-colors ${
                                isDark
                                  ? 'bg-slate-800 hover:bg-slate-700 text-purple-300 border-slate-700'
                                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                              }`}
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Edit Stock
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInventoryPage;
