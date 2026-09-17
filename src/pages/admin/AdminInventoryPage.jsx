import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminInventoryApi, updateInventoryItemApi } from '../../services/api';
import { Search, Boxes, Plus, Edit2, Save, RefreshCw, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

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
      setToastMessage('Đã cập nhật tồn kho & giá bán thành công!');
      setTimeout(() => setToastMessage(''), 3000);
      setEditingId(null);
      fetchInventory();
    } else {
      alert(res.message || 'Cập nhật kho thất bại.');
    }
  };

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  };

  const stockBadge = {
    'In Stock': { color: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80', icon: CheckCircle2 },
    'Low Stock': { color: 'bg-amber-950/80 text-amber-300 border-amber-800/80', icon: AlertTriangle },
    'Out of Stock': { color: 'bg-rose-950/80 text-rose-300 border-rose-800/80', icon: XCircle },
  };

  return (
    <AdminLayout title="Quản lý Tồn Kho">
      <div className="space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 border border-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Filters Header */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <div className="flex items-center bg-slate-800/60 p-1 rounded-2xl border border-slate-700/60 text-xs">
              {['All', 'Robots', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    categoryFilter === cat ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'All' ? 'Tất cả danh mục' : cat}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center bg-slate-800/60 p-1 rounded-2xl border border-slate-700/60 text-xs">
              {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    statusFilter === st ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st === 'All' ? 'Mọi trạng thái' : st}
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
              placeholder="Tìm theo sản phẩm, SKU..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Inventory List */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
              <span>Đang kiểm tra tồn kho...</span>
            </div>
          ) : inventory.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-sm font-semibold">Không tìm thấy sản phẩm phù hợp trong kho.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Sản Phẩm</th>
                    <th className="p-4">Danh Mục</th>
                    <th className="p-4">Giá Bán</th>
                    <th className="p-4">Số Lượng Kho</th>
                    <th className="p-4">Trạng Thái Tồn Kho</th>
                    <th className="p-4 text-right">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {inventory.map((item) => {
                    const isEditing = editingId === item._id;
                    const BadgeIcon = stockBadge[item.status]?.icon || Boxes;
                    return (
                      <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                        {/* Product Info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-700/80 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-slate-100">{item.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">SKU: {item.sku}</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="p-4 font-semibold text-slate-400">{item.category}</td>

                        {/* Price */}
                        <td className="p-4 font-bold text-emerald-400 text-sm">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-28 px-2 py-1 bg-slate-800 border border-purple-500 rounded-lg text-white font-bold text-xs"
                            />
                          ) : (
                            formatVND(item.price)
                          )}
                        </td>

                        {/* Stock Quantity */}
                        <td className="p-4 font-black text-white text-sm">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(e.target.value)}
                              className="w-20 px-2 py-1 bg-slate-800 border border-purple-500 rounded-lg text-white font-bold text-xs"
                            />
                          ) : (
                            <span>{item.stock} sản phẩm</span>
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
                              <Save className="w-3.5 h-3.5" /> Lưu
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1 ml-auto transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Chỉnh sửa
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
