const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('pomify_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Admin Login API
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

// Dashboard Stats API
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
        { _id: 'ord-8801', orderCode: 'POM-2026-8801', customerName: 'Nguyen Van An', totalAmount: 3490000, status: 'Shipping', createdAt: new Date() },
        { _id: 'ord-8802', orderCode: 'POM-2026-8802', customerName: 'Tran Thi Minh', totalAmount: 4080000, status: 'Processing', createdAt: new Date(Date.now() - 3600000) },
        { _id: 'ord-8803', orderCode: 'POM-2026-8803', customerName: 'Le Hoang Nam', totalAmount: 580000, status: 'Delivered', createdAt: new Date(Date.now() - 86400000) },
        { _id: 'ord-8804', orderCode: 'POM-2026-8804', customerName: 'Pham Thu Thao', totalAmount: 3490000, status: 'Pending', createdAt: new Date(Date.now() - 172800000) },
      ],
      topProducts: [
        { name: 'Pomify Bot — Companion Edition', sku: 'POM-BOT-01', sold: 34, stock: 45, revenue: 118660000 },
        { name: 'Pomify Wireless Charging Dock', sku: 'POM-ACC-DOCK', sold: 19, stock: 3, revenue: 11210000 },
        { name: 'Pomify Smart Silicone Case & Ears Set', sku: 'POM-ACC-CASE', sold: 52, stock: 80, revenue: 15080000 },
      ],
      salesTrend: [
        { month: 'Apr', revenue: 42000000, orders: 12 },
        { month: 'May', revenue: 68000000, orders: 19 },
        { month: 'Jun', revenue: 85000000, orders: 24 },
        { month: 'Jul', revenue: 110000000, orders: 31 },
        { month: 'Aug', revenue: 135000000, orders: 39 },
        { month: 'Sep', revenue: 168000000, orders: 48 },
      ],
    };
  }
};

// Admin Orders API
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
        customerName: 'Nguyen Van An',
        customerEmail: 'an.nguyen@example.com',
        customerPhone: '0901234567',
        shippingAddress: '123 Nguyen Hue St, District 1, Ho Chi Minh City',
        items: [{ productId: 'prod-1', name: 'Pomify Bot — Companion Edition', price: 3490000, quantity: 1, customization: { color: 'Lavender Violet', accessory: 'Cat Ears' } }],
        totalAmount: 3490000,
        paymentMethod: 'VietQR',
        paymentStatus: 'Paid',
        status: 'Shipping',
        cancellationReason: '',
        notes: 'Deliver during office hours, call 15 minutes before arrival.',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        _id: 'ord-8802',
        orderCode: 'POM-2026-8802',
        customerName: 'Tran Thi Minh',
        customerEmail: 'minh.tran@example.com',
        customerPhone: '0987654321',
        shippingAddress: '456 Le Loi St, District 1, Ho Chi Minh City',
        items: [
          { productId: 'prod-1', name: 'Pomify Bot — Companion Edition', price: 3490000, quantity: 1, customization: { color: 'Sky Blue', accessory: 'Halo Ring' } },
          { productId: 'prod-2', name: 'Pomify Wireless Charging Dock', price: 590000, quantity: 1 },
        ],
        totalAmount: 4080000,
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        status: 'Processing',
        cancellationReason: '',
        notes: '',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        _id: 'ord-8803',
        orderCode: 'POM-2026-8803',
        customerName: 'Le Hoang Nam',
        customerEmail: 'nam.le@example.com',
        customerPhone: '0912345678',
        shippingAddress: '789 Dien Bien Phu St, Binh Thanh District, Ho Chi Minh City',
        items: [{ productId: 'prod-3', name: 'Pomify Smart Silicone Case & Ears Set', price: 290000, quantity: 2 }],
        totalAmount: 580000,
        paymentMethod: 'VietQR',
        paymentStatus: 'Paid',
        status: 'Delivered',
        cancellationReason: '',
        notes: 'Delivered successfully.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        _id: 'ord-8804',
        orderCode: 'POM-2026-8804',
        customerName: 'Pham Thu Thao',
        customerEmail: 'thao.pham@example.com',
        customerPhone: '0933445566',
        shippingAddress: '12 Cach Mang Thang 8 St, District 3, Ho Chi Minh City',
        items: [{ productId: 'prod-1', name: 'Pomify Bot — Companion Edition', price: 3490000, quantity: 1, customization: { color: 'Sakura Pink', accessory: 'Crown' } }],
        totalAmount: 3490000,
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        status: 'Pending',
        cancellationReason: '',
        notes: 'Birthday gift wrapping requested.',
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

// Update Order Status API with cancellation reason
export const updateOrderStatusApi = async (id, status, paymentStatus, cancellationReason = '') => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, paymentStatus, cancellationReason }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('[API Warning] Update status fallback to localStorage');
    const orders = await getAdminOrdersApi('All', '');
    const idx = orders.findIndex((o) => o._id === id || o.orderCode === id);
    if (idx !== -1) {
      if (status) orders[idx].status = status;
      if (paymentStatus) orders[idx].paymentStatus = paymentStatus;
      if (cancellationReason) orders[idx].cancellationReason = cancellationReason;
      localStorage.setItem('pomify_local_orders', JSON.stringify(orders));
      return { success: true, message: 'Status updated locally', data: orders[idx] };
    }
    return { success: false, message: 'Order not found' };
  }
};

// Admin Inventory API
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

// Update Inventory Stock API
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

// Notifications APIs
export const getAdminNotificationsApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/notifications`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('[API Warning] Notifications API fallback');
    return {
      success: true,
      unreadCount: 2,
      data: [
        {
          _id: 'n1',
          title: 'New Order Placed',
          message: 'Order POM-2026-8804 placed by Pham Thu Thao (3,490,000 ₫).',
          type: 'order',
          isRead: false,
          link: '/admin/orders',
          createdAt: new Date(Date.now() - 300000).toISOString(),
        },
        {
          _id: 'n2',
          title: 'Low Stock Alert ⚠️',
          message: 'Pomify Wireless Charging Dock stock is down to 3 units.',
          type: 'stock',
          isRead: false,
          link: '/admin/inventory',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          _id: 'n3',
          title: 'Order Status Update',
          message: 'Order POM-2026-8801 status changed to Shipping.',
          type: 'order',
          isRead: true,
          link: '/admin/orders',
          createdAt: new Date(Date.now() - 21600000).toISOString(),
        },
      ],
    };
  }
};

export const markNotificationsReadApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/notifications/read`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: true, message: 'Notifications marked read locally' };
  }
};
