import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminInventoryApi, updateInventoryItemApi, createProductApi, deleteInventoryItemApi } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Search, Boxes, Edit2, Plus, Trash2, Save, RefreshCw, AlertTriangle, CheckCircle2, XCircle, X } from 'lucide-react';

export const AdminInventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const { theme } = useTheme();

  // Product Add / Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    category: 'Robots',
    price: '',
    originalPrice: '',
    stock: '',
    lowStockThreshold: 5,
    badge: 'None',
    image: '',
    description: '',
  });

  // Delete Confirmation State
  const [deletingProduct, setDeletingProduct] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    const data = await getAdminInventoryApi(categoryFilter, statusFilter, searchTerm);
    setInventory(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, [categoryFilter, statusFilter]);

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingProduct(null);
    setProductForm({
      name: '',
      sku: `POM-ITEM-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Robots',
      price: '',
      originalPrice: '',
      stock: '20',
      lowStockThreshold: 5,
      badge: 'None',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500',
      description: '',
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (item) => {
    setModalMode('edit');
    setEditingProduct(item);
    setProductForm({
      name: item.name || '',
      sku: item.sku || '',
      category: item.category || 'Robots',
      price: item.price || '',
      originalPrice: item.originalPrice || '',
      stock: item.stock !== undefined ? item.stock : '',
      lowStockThreshold: item.lowStockThreshold || 5,
      badge: item.badge || 'None',
      image: item.image || '',
      description: item.description || '',
    });
    setShowModal(true);
  };

  const handleSaveProductForm = async (e) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const res = await createProductApi(productForm);
      if (res.success) {
        setToastMessage('New product added to catalog successfully!');
        setShowModal(false);
        fetchInventory();
      } else {
        alert(res.message || 'Failed to create product.');
      }
    } else {
      const res = await updateInventoryItemApi(editingProduct._id, productForm);
      if (res.success) {
        setToastMessage('Product details updated successfully!');
        setShowModal(false);
        fetchInventory();
      } else {
        alert(res.message || 'Failed to update product.');
      }
    }
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;
    const res = await deleteInventoryItemApi(deletingProduct._id);
    if (res.success) {
      setToastMessage('Product deleted from inventory.');
      setTimeout(() => setToastMessage(''), 3000);
      setDeletingProduct(null);
      fetchInventory();
    } else {
      alert(res.message || 'Failed to delete product.');
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

        {/* Action Header & Filters */}
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

          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  fetchInventory();
                }}
                placeholder="Search SKU or name..."
                className={`w-full pl-10 pr-4 py-2 border rounded-2xl text-xs focus:outline-none focus:border-purple-500 transition-colors ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Create Product Button */}
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-purple-600/30 flex items-center gap-1.5 whitespace-nowrap transition-all"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
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
                    <th className="p-4">Badge Tag</th>
                    <th className="p-4">Unit Price</th>
                    <th className="p-4">Stock Quantity</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                  {inventory.map((item) => {
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

                        {/* Badge Tag */}
                        <td className="p-4">
                          {item.badge && item.badge !== 'None' ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              {item.badge}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">None</span>
                          )}
                        </td>

                        {/* Price */}
                        <td className="p-4 font-bold text-emerald-500 text-sm">
                          {formatVND(item.price)}
                        </td>

                        {/* Stock Quantity */}
                        <td className={`p-4 font-black text-sm ${textTitleClass}`}>
                          <span>{item.stock} units</span>
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
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className={`p-1.5 rounded-xl text-xs font-bold border transition-colors ${
                                isDark
                                  ? 'bg-slate-800 hover:bg-slate-700 text-purple-300 border-slate-700'
                                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                              }`}
                              title="Edit product specs"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingProduct(item)}
                              className="p-1.5 rounded-xl text-xs font-bold border bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/30 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create / Edit Product Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`border w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto transition-colors ${cardBgClass}`}>
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Boxes className="w-5 h-5 text-purple-500" />
                  {modalMode === 'create' ? 'Add New Product to Store' : 'Edit Product Specifications'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProductForm} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Creator Kit Bundle"
                    className={`w-full p-2.5 border rounded-xl focus:outline-none focus:border-purple-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">SKU Code *</label>
                    <input
                      type="text"
                      required
                      value={productForm.sku}
                      onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                      placeholder="POM-BOT-01"
                      className={`w-full p-2.5 border rounded-xl focus:outline-none focus:border-purple-500 ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Category *</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className={`w-full p-2.5 border rounded-xl focus:outline-none focus:border-purple-500 ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="Robots">Robots</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Bundles">Bundles</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Price (VND) *</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      placeholder="3490000"
                      className={`w-full p-2.5 border rounded-xl focus:outline-none focus:border-purple-500 ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      placeholder="45"
                      className={`w-full p-2.5 border rounded-xl focus:outline-none focus:border-purple-500 ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Badge Tag</label>
                    <select
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                      className={`w-full p-2.5 border rounded-xl focus:outline-none focus:border-purple-500 ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="None">None</option>
                      <option value="Popular">Popular ⭐</option>
                      <option value="Best Seller">Best Seller 🔥</option>
                      <option value="New Release">New Release ✨</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Low Stock Warning Threshold</label>
                    <input
                      type="number"
                      value={productForm.lowStockThreshold}
                      onChange={(e) => setProductForm({ ...productForm, lowStockThreshold: e.target.value })}
                      className={`w-full p-2.5 border rounded-xl focus:outline-none focus:border-purple-500 ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="https://..."
                    className={`w-full p-2.5 border rounded-xl focus:outline-none focus:border-purple-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Hardware overview, features, and key specifications..."
                    className={`w-full p-2.5 border rounded-xl focus:outline-none focus:border-purple-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className={`flex-1 py-2.5 font-bold text-xs rounded-2xl transition-colors ${
                      isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-purple-600/30 transition-all"
                  >
                    {modalMode === 'create' ? 'Create Product' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingProduct && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`border w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 transition-colors ${cardBgClass}`}>
              <div className="text-center space-y-2">
                <div className="p-3 bg-rose-500/10 text-rose-500 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-rose-500">Delete Product?</h3>
                <p className={textSubClass}>
                  Are you sure you want to delete <strong className={textTitleClass}>{deletingProduct.name}</strong> from catalog? This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDeletingProduct(null)}
                  className={`flex-1 py-2.5 font-bold text-xs rounded-2xl transition-colors ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-rose-600/30 transition-colors"
                >
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInventoryPage;
