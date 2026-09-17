const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('pomify_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Admin Login
export const adminLoginApi = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      localStorage.setItem('pomify_admin_token', data.token);
      localStorage.setItem('pomify_admin_user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.warn('[API Warning] Backend server unreachable. Using local admin session fallback.');
    if (email === 'admin@pomify.vn' && password === 'admin123') {
      const mockUser = {
        id: 'admin-local',
        name: 'Pomify Admin',
        email: 'admin@pomify.vn',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      };
      const mockToken = 'mock-jwt-token-pomify-2026';
      localStorage.setItem('pomify_admin_token', mockToken);
      localStorage.setItem('pomify_admin_user', JSON.stringify(mockUser));
      return { success: true, token: mockToken, user: mockUser };
    }
    return { success: false, message: 'Invalid credentials or server connection failed.' };
  }
};

// Get Dashboard Stats
export const getDashboardStatsApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('[API Warning] Dashboard API fallback to local data');
    return {
      summary: {
        totalRevenue: 11640000,
        totalOrders: 4,
        pendingOrders: 1,
        lowStockCount: 2,
      },
      recentOrders: [
        { _id: 'ord-8801', orderCode: 'POM-2026-8801', customerName: 'Nguyễn Văn An', totalAmount: 3490000, status: 'Shipping', createdAt: new Date() },
        { _id: 'ord-8802', orderCode: 'POM-2026-8802', customerName: 'Trần Thị Minh', totalAmount: 4080000, status: 'Processing', createdAt: new Date(Date.now() - 3600000) },
        { _id: 'ord-8803', orderCode: 'POM-2026-8803', customerName: 'Lê Hoàng Nam', totalAmount: 580000, status: 'Delivered', createdAt: new Date(Date.now() - 86400000) },
        { _id: 'ord-8804', orderCode: 'POM-2026-8804', customerName: 'Phạm Thu Thảo', totalAmount: 3490000, status: 'Pending', createdAt: new Date(Date.now() - 172800000) },
      ],
      topProducts: [
        { name: 'Pomify Bot — Companion Edition', sku: 'POM-BOT-01', sold: 34, stock: 45, revenue: 118660000 },
        { name: 'Pomify Wireless Charging Dock', sku: 'POM-ACC-DOCK', sold: 19, stock: 3, revenue: 11210000 },
        { name: 'Pomify Smart Silicone Case & Ears Set', sku: 'POM-ACC-CASE', sold: 52, stock: 80, revenue: 15080000 },
      ],
      salesTrend: [
        { month: 'T4', revenue: 42000000, orders: 12 },
        { month: 'T5', revenue: 68000000, orders: 19 },
        { month: 'T6', revenue: 85000000, orders: 24 },
        { month: 'T7', revenue: 110000000, orders: 31 },
        { month: 'T8', revenue: 135000000, orders: 39 },
        { month: 'T9', revenue: 168000000, orders: 48 },
      ],
    };
  }
};

// Get Admin Orders
export const getAdminOrdersApi = async (status = 'All', search = '') => {
  try {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/admin/orders?${params.toString()}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('[API Warning] Orders API fallback');
    const localOrders = JSON.parse(localStorage.getItem('pomify_local_orders') || 'null') || [
      {
        _id: 'ord-8801',
        orderCode: 'POM-2026-8801',
        customerName: 'Nguyễn Văn An',
        customerEmail: 'an.nguyen@example.com',
        customerPhone: '0901234567',
        shippingAddress: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
        items: [{ productId: 'p1', name: 'Pomify Bot — Companion Edition', price: 3490000, quantity: 1, customization: { color: 'Lavender Violet', accessory: 'Cat Ears' } }],
        totalAmount: 3490000,
        paymentMethod: 'VietQR',
        paymentStatus: 'Paid',
        status: 'Shipping',
        notes: 'Giao giờ hành chính, gọi trước 15 phút.',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        _id: 'ord-8802',
        orderCode: 'POM-2026-8802',
        customerName: 'Trần Thị Minh',
        customerEmail: 'minh.tran@example.com',
        customerPhone: '0987654321',
        shippingAddress: '456 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
        items: [
          { productId: 'p1', name: 'Pomify Bot — Companion Edition', price: 3490000, quantity: 1, customization: { color: 'Sky Blue', accessory: 'Halo Ring' } },
          { productId: 'p2', name: 'Pomify Wireless Charging Dock', price: 590000, quantity: 1 },
        ],
        totalAmount: 4080000,
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        status: 'Processing',
        notes: '',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        _id: 'ord-8803',
        orderCode: 'POM-2026-8803',
        customerName: 'Lê Hoàng Nam',
        customerEmail: 'nam.le@example.com',
        customerPhone: '0912345678',
        shippingAddress: '789 Điện Biên Phủ, Quận Bình Thạnh, TP. Hồ Chí Minh',
        items: [{ productId: 'p3', name: 'Pomify Smart Silicone Case & Ears Set', price: 290000, quantity: 2 }],
        totalAmount: 580000,
        paymentMethod: 'VietQR',
        paymentStatus: 'Paid',
        status: 'Delivered',
        notes: 'Đã nhận hàng thành công',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        _id: 'ord-8804',
        orderCode: 'POM-2026-8804',
        customerName: 'Phạm Thu Thảo',
        customerEmail: 'thao.pham@example.com',
        customerPhone: '0933445566',
        shippingAddress: '12 Cách Mạng Tháng 8, Quận 3, TP. Hồ Chí Minh',
        items: [{ productId: 'p1', name: 'Pomify Bot — Companion Edition', price: 3490000, quantity: 1, customization: { color: 'Sakura Pink', accessory: 'Crown' } }],
        totalAmount: 3490000,
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        status: 'Pending',
        notes: 'Gói quà sinh nhật.',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
    ];

    return localOrders.filter((o) => {
      const matchStatus = !status || status === 'All' || o.status === status;
      const matchSearch =
        !search ||
        o.orderCode.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }
};

// Update Order Status
export const updateOrderStatusApi = async (id, status, paymentStatus) => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, paymentStatus }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('[API Warning] Update status fallback to localStorage');
    const orders = await getAdminOrdersApi('All', '');
    const idx = orders.findIndex((o) => o._id === id || o.orderCode === id);
    if (idx !== -1) {
      if (status) orders[idx].status = status;
      if (paymentStatus) orders[idx].paymentStatus = paymentStatus;
      localStorage.setItem('pomify_local_orders', JSON.stringify(orders));
      return { success: true, message: 'Status updated locally', data: orders[idx] };
    }
    return { success: false, message: 'Order not found' };
  }
};

// Get Admin Inventory
export const getAdminInventoryApi = async (category = 'All', status = 'All', search = '') => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/admin/inventory?${params.toString()}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('[API Warning] Inventory API fallback');
    const localInv = JSON.parse(localStorage.getItem('pomify_local_inventory') || 'null') || [
      {
        _id: 'prod-1',
        name: 'Pomify Bot — Companion Edition',
        sku: 'POM-BOT-01',
        category: 'Robots',
        price: 3490000,
        stock: 45,
        lowStockThreshold: 10,
        status: 'In Stock',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500',
        variants: [
          { name: 'Lavender Violet', color: '#A78BFA', accessory: 'Cat Ears', stock: 20 },
          { name: 'Sky Blue', color: '#93C5FD', accessory: 'Halo Ring', stock: 15 },
          { name: 'Sakura Pink', color: '#FBCFE8', accessory: 'Crown', stock: 10 },
        ],
      },
      {
        _id: 'prod-2',
        name: 'Pomify Wireless Charging Dock',
        sku: 'POM-ACC-DOCK',
        category: 'Accessories',
        price: 590000,
        stock: 3,
        lowStockThreshold: 5,
        status: 'Low Stock',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
        variants: [],
      },
      {
        _id: 'prod-3',
        name: 'Pomify Smart Silicone Case & Ears Set',
        sku: 'POM-ACC-CASE',
        category: 'Accessories',
        price: 290000,
        stock: 80,
        lowStockThreshold: 15,
        status: 'In Stock',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
        variants: [],
      },
      {
        _id: 'prod-4',
        name: 'Pomify Mini Smart Speaker Pod',
        sku: 'POM-BOT-MINI',
        category: 'Robots',
        price: 1890000,
        stock: 0,
        lowStockThreshold: 5,
        status: 'Out of Stock',
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500',
        variants: [],
      },
    ];

    return localInv.filter((p) => {
      const matchCat = !category || category === 'All' || p.category === category;
      const matchStatus = !status || status === 'All' || p.status === status;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }
};

// Update Inventory Stock
export const updateInventoryItemApi = async (id, stock, price, lowStockThreshold) => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/inventory/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ stock, price, lowStockThreshold }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('[API Warning] Inventory update fallback');
    const inv = await getAdminInventoryApi('All', 'All', '');
    const idx = inv.findIndex((item) => item._id === id || item.sku === id);
    if (idx !== -1) {
      if (stock !== undefined) {
        const newStock = Number(stock);
        inv[idx].stock = newStock;
        const threshold = lowStockThreshold !== undefined ? Number(lowStockThreshold) : inv[idx].lowStockThreshold;
        if (newStock <= 0) inv[idx].status = 'Out of Stock';
        else if (newStock <= threshold) inv[idx].status = 'Low Stock';
        else inv[idx].status = 'In Stock';
      }
      if (price !== undefined) inv[idx].price = Number(price);
      if (lowStockThreshold !== undefined) inv[idx].lowStockThreshold = Number(lowStockThreshold);
      localStorage.setItem('pomify_local_inventory', JSON.stringify(inv));
      return { success: true, message: 'Stock updated locally', data: inv[idx] };
    }
    return { success: false, message: 'Item not found' };
  }
};
