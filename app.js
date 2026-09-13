/**
 * IP MAN HAIRSTUDIO - Kasir Barber PWA
 * Aplikasi kasir modern untuk barbershop
 */

// ============================================
// DATA & CONFIGURATION
// ============================================

const SERVICES = [
    {
        id: 1,
        name: "Mens Haircut",
        description: "Potong rambut + Keramas + Hot Towel + Massage + Vitamin + Styling Pomade",
        price: 50000,
        category: "single",
        icon: "✂️"
    },
    {
        id: 2,
        name: "Paket Ganteng",
        description: "Potong rambut + Keramas + Hair Spa + Massage + Vitamin + dll",
        price: 65000,
        category: "paket",
        icon: "🧖"
    },
    {
        id: 3,
        name: "Paket Ganteng Full",
        description: "Potong rambut + Keramas + Black Mask + Blackhead + Creambath + dll",
        price: 110000,
        category: "paket",
        icon: "💆"
    },
    {
        id: 4,
        name: "Kids Haircut",
        description: "Potong rambut anak + Keramas + Styling",
        price: 35000,
        category: "single",
        icon: "👦"
    },
    {
        id: 5,
        name: "Shaving",
        description: "Cukur jenggot + Kumis + Hot Towel",
        price: 25000,
        category: "single",
        icon: "🪒"
    },
    {
        id: 6,
        name: "Trimming",
        description: "Merapikan ujung rambut",
        price: 10000,
        category: "single",
        icon: "💇"
    },
    {
        id: 7,
        name: "Blackmask",
        description: "Perawatan wajah blackmask",
        price: 30000,
        category: "treatment",
        icon: "🎭"
    },
    {
        id: 8,
        name: "Hair Spa",
        description: "Perawatan rambut hair spa",
        price: 25000,
        category: "treatment",
        icon: "💆‍♂️"
    },
    {
        id: 9,
        name: "Creambath",
        description: "Perawatan rambut creambath",
        price: 50000,
        category: "treatment",
        icon: "🧴"
    },
    {
        id: 10,
        name: "Blackhead",
        description: "Perawatan komedo blackhead",
        price: 15000,
        category: "treatment",
        icon: "✨"
    },
    {
        id: 11,
        name: "Hair Color Highlight Short",
        description: "Pewarnaan highlight rambut pendek",
        price: 150000,
        category: "color",
        icon: "🎨"
    },
    {
        id: 12,
        name: "Hair Color Highlight Medium",
        description: "Pewarnaan highlight rambut sedang",
        price: 220000,
        category: "color",
        icon: "🎨"
    },
    {
        id: 13,
        name: "Hair Color Highlight Long",
        description: "Pewarnaan highlight rambut panjang",
        price: 300000,
        category: "color",
        icon: "🎨"
    },
    {
        id: 14,
        name: "Down Perm & Rootlift",
        description: "Down perm sekaligus rootlift",
        price: 150000,
        category: "perm",
        icon: "💫"
    },
    {
        id: 15,
        name: "Perm Short",
        description: "Perawatan perm rambut pendek",
        price: 250000,
        category: "perm",
        icon: "💫"
    },
    {
        id: 16,
        name: "Perm Medium",
        description: "Perawatan perm rambut sedang",
        price: 300000,
        category: "perm",
        icon: "💫"
    }
];

const TAX_RATE = 0; // Tidak ada pajak

// ============================================
// STATE MANAGEMENT
// ============================================

let state = {
    order: [],
    paymentAmount: 0,
    transactions: JSON.parse(localStorage.getItem('transactions')) || [],
    currentPage: 'kasir',
    selectedCategory: 'all',
    discountPercent: 0
};

// ============================================
// DATA MANAGEMENT - Auto Cleanup
// ============================================

function cleanupOldTransactions() {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const beforeCount = state.transactions.length;
    state.transactions = state.transactions.filter(t => {
        const txDate = new Date(t.date);
        return txDate > sevenDaysAgo;
    });
    
    const removed = beforeCount - state.transactions.length;
    if (removed > 0) {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
        console.log(`Auto-hapus ${removed} transaksi lama (>7 hari)`);
    }
}

function getTodayTransactionCount() {
    const today = new Date().toDateString();
    return state.transactions.filter(t => new Date(t.date).toDateString() === today).length;
}

function shouldShowExportReminder() {
    return getTodayTransactionCount() >= 20;
}

function checkExportReminder() {
    const banner = document.getElementById('exportBanner');
    if (banner && shouldShowExportReminder()) {
        banner.style.display = 'flex';
    }
}

function exportAndClear() {
    if (state.transactions.length === 0) {
        alert('Tidak ada data untuk di-export!');
        return;
    }
    
    const csvContent = [
        ['ID', 'Tanggal', 'Pelanggan', 'Item', 'Subtotal', 'Total', 'Bayar', 'Kembali'],
        ...state.transactions.map(t => [
            t.id,
            formatDateTime(new Date(t.date)),
            t.customer || 'Umum',
            t.items.map(item => `${item.name} x${item.quantity}`).join(', '),
            t.subtotal,
            t.total,
            t.payment,
            t.change
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ipman-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Tanya apakah mau hapus data
    if (confirm('Export berhasil! Hapus semua data transaksi dari tablet?')) {
        state.transactions = [];
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
        alert('Data sudah dibersihkan!');
    }
    
    checkExportReminder();
}

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
    // Splash
    splash: document.getElementById('splash'),
    app: document.getElementById('app'),
    
    // Header
    backBtn: document.getElementById('backBtn'),
    menuBtn: document.getElementById('menuBtn'),
    datetime: document.getElementById('datetime'),
    historyBtn: document.getElementById('historyBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    
    // Sidebar
    sidebar: document.getElementById('sidebar'),
    closeSidebar: document.getElementById('closeSidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    navItems: document.querySelectorAll('.nav-item'),
    
    // Kasir Page
    serviceGrid: document.getElementById('serviceGrid'),
    orderItems: document.getElementById('orderItems'),
    subtotal: document.getElementById('subtotal'),
    total: document.getElementById('total'),
    customerName: document.getElementById('customerName'),
    paymentAmount: document.getElementById('paymentAmount'),
    changeAmount: document.getElementById('changeAmount'),
    payBtn: document.getElementById('payBtn'),
    
    // Category Tabs
    tabBtns: document.querySelectorAll('.tab-btn'),
    
    // Quick Amounts
    quickBtns: document.querySelectorAll('.quick-btn'),
    
    // Menu Page
    menuList: document.getElementById('menuList'),
    
    // History Page
    historyList: document.getElementById('historyList'),
    historyDate: document.getElementById('historyDate'),
    exportBtn: document.getElementById('exportBtn'),
    
    // Stats Page
    todayRevenue: document.getElementById('todayRevenue'),
    todayTransactions: document.getElementById('todayTransactions'),
    avgTicket: document.getElementById('avgTicket'),
    totalRevenue: document.getElementById('totalRevenue'),
    popularList: document.getElementById('popularList'),
    
    // Modal
    receiptModal: document.getElementById('receiptModal'),
    receiptNo: document.getElementById('receiptNo'),
    receiptDate: document.getElementById('receiptDate'),
    receiptCashier: document.getElementById('receiptCashier'),
    receiptItems: document.getElementById('receiptItems'),
    receiptSubtotal: document.getElementById('receiptSubtotal'),
    receiptTotal: document.getElementById('receiptTotal'),
    receiptPayment: document.getElementById('receiptPayment'),
    receiptChange: document.getElementById('receiptChange'),
    printReceipt: document.getElementById('printReceipt'),
    closeReceipt: document.getElementById('closeReceipt'),
    
    // Success
    successOverlay: document.getElementById('successOverlay'),
    successMessage: document.getElementById('successMessage')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatNumberWithDots(value) {
    // Remove non-numeric characters
    const numbers = value.replace(/\D/g, '');
    // Add dots as thousand separators
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseFormattedNumber(value) {
    // Remove dots to get raw number
    return parseInt(value.replace(/\./g, '')) || 0;
}

function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

function formatDateTime(date) {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function generateTransactionId() {
    const date = new Date();
    const prefix = 'BC';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${day}${month}${year}${random}`;
}

function isToday(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderServiceCards() {
    const filteredServices = state.selectedCategory === 'all' 
        ? SERVICES 
        : SERVICES.filter(s => s.category === state.selectedCategory);
    
    elements.serviceGrid.innerHTML = filteredServices.map(service => `
        <div class="service-card ${state.order.find(item => item.id === service.id) ? 'selected' : ''}" 
             data-id="${service.id}">
            <span class="service-badge ${service.category}">${service.category === 'paket' ? 'Paket' : 'Satuan'}</span>
            <div class="service-icon">${service.icon}</div>
            <h3 class="service-name">${service.name}</h3>
            <p class="service-desc">${service.description}</p>
            <div class="service-price">${formatCurrency(service.price)}</div>
        </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => addToOrder(parseInt(card.dataset.id)));
    });
}

function renderOrderItems() {
    if (state.order.length === 0) {
        elements.orderItems.innerHTML = `
            <div class="empty-order">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                <p>Belum ada pesanan</p>
            </div>
        `;
        return;
    }
    
    elements.orderItems.innerHTML = state.order.map(item => `
        <div class="order-item" data-id="${item.id}">
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-price">${formatCurrency(item.price)}</div>
            </div>
            <div class="order-item-qty">
                <button class="qty-btn minus" data-id="${item.id}">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn plus" data-id="${item.id}">+</button>
            </div>
            <button class="order-item-remove" data-id="${item.id}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `).join('');
    
    // Add quantity handlers
    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateQuantity(parseInt(btn.dataset.id), -1);
        });
    });
    
    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateQuantity(parseInt(btn.dataset.id), 1);
        });
    });
    
    document.querySelectorAll('.order-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromOrder(parseInt(btn.dataset.id));
        });
    });
}

function renderOrderSummary() {
    const subtotal = state.order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountValue = Math.round(subtotal * state.discountPercent / 100);
    const total = subtotal - discountValue;
    
    elements.subtotal.textContent = formatCurrency(subtotal);
    elements.total.textContent = formatCurrency(total);
    
    // Show/hide discount row
    const discountRow = document.getElementById('discountRow');
    const discountAmount = document.getElementById('discountAmount');
    if (state.discountPercent > 0) {
        discountRow.style.display = 'flex';
        discountAmount.textContent = `- ${formatCurrency(discountValue)}`;
    } else {
        discountRow.style.display = 'none';
    }
    
    // Update floating cart
    updateFloatingCart(total);
    
    updateChange();
}

function updateFloatingCart(total) {
    const count = state.order.reduce((sum, item) => sum + item.quantity, 0);
    const floatingCount = document.getElementById('floatingCartCount');
    const floatingTotal = document.getElementById('floatingCartTotal');
    const floatingBtn = document.getElementById('floatingCartBtn');
    
    if (floatingCount) floatingCount.textContent = count;
    if (floatingTotal) floatingTotal.textContent = formatCurrency(total);
    
    // Show/hide floating button
    if (floatingBtn) {
        if (count > 0) {
            floatingBtn.style.display = 'flex';
        } else {
            floatingBtn.style.display = 'none';
            // Also close panel if no items
            const orderSection = document.querySelector('.order-section');
            if (orderSection) orderSection.classList.remove('panel-open');
            const overlay = document.getElementById('orderPanelOverlay');
            if (overlay) overlay.classList.remove('active');
        }
    }
}

function toggleOrderPanel() {
    const orderSection = document.querySelector('.order-section');
    const overlay = document.getElementById('orderPanelOverlay');
    
    if (orderSection) {
        orderSection.classList.toggle('panel-open');
        if (overlay) {
            overlay.classList.toggle('active', orderSection.classList.contains('panel-open'));
        }
    }
}

function closeOrderPanel() {
    const orderSection = document.querySelector('.order-section');
    const overlay = document.getElementById('orderPanelOverlay');
    
    if (orderSection) orderSection.classList.remove('panel-open');
    if (overlay) overlay.classList.remove('active');
}

function renderMenuList() {
    elements.menuList.innerHTML = SERVICES.map(service => `
        <div class="menu-item">
            <div class="menu-item-icon">${service.icon}</div>
            <div class="menu-item-info">
                <h3 class="menu-item-name">${service.name}</h3>
                <p class="menu-item-desc">${service.description}</p>
            </div>
            <div class="menu-item-price">${formatCurrency(service.price)}</div>
        </div>
    `).join('');
}

function renderHistoryList() {
    const filterDate = elements.historyDate.value;
    let transactions = state.transactions;
    
    if (filterDate) {
        transactions = transactions.filter(t => isToday(t.date) && t.date.startsWith(filterDate));
    }
    
    // Update count
    const historyCount = document.getElementById('historyCount');
    if (historyCount) {
        historyCount.textContent = `(${transactions.length})`;
    }
    
    // Show/hide actions
    const historyActions = document.getElementById('historyActions');
    if (historyActions) {
        historyActions.style.display = transactions.length > 0 ? 'flex' : 'none';
    }
    
    if (transactions.length === 0) {
        elements.historyList.innerHTML = `
            <div class="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p>Belum ada riwayat transaksi</p>
            </div>
        `;
        return;
    }
    
    elements.historyList.innerHTML = transactions.reverse().map(t => {
        const isVoid = t.status === 'void';
        return `
        <div class="history-item ${isVoid ? 'voided' : ''}" data-id="${t.id}">
            <input type="checkbox" class="item-checkbox" data-id="${t.id}" ${isVoid ? 'disabled' : ''}>
            <div class="history-header">
                <div class="history-header-left">
                    <span class="history-id">${t.id}</span>
                    <span class="history-customer">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        ${t.customer || 'Umum'}
                    </span>
                </div>
                <span class="history-date">${formatDateTime(new Date(t.date))}</span>
            </div>
            <div class="history-items">
                ${t.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
            </div>
            <div class="history-footer">
                <span class="history-total">${formatCurrency(t.total)}</span>
                <div class="history-actions-row">
                    ${!isVoid ? `<button class="btn-reprint" onclick="event.stopPropagation(); reprintTransaction('${t.id}')" title="Cetak ulang struk">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 6,2 18,2 18,9"/>
                            <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                            <rect x="6" y="14" width="12" height="8"/>
                        </svg>
                        Cetak
                    </button>` : ''}
                    ${isVoid
                        ? `<button class="btn-unvoid" onclick="event.stopPropagation(); unVoidTransaction('${t.id}')" title="Kembalikan transaksi ini">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="1,4 1,10 7,10"/>
                                <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                            </svg>
                            Un-Void
                        </button>`
                        : `<button class="btn-void" onclick="event.stopPropagation(); voidTransaction('${t.id}')" title="Void transaksi ini">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                            </svg>
                            Void
                        </button>`
                    }
                </div>
            </div>
        </div>
    `}).join('');
    
    // Checkbox events
    document.querySelectorAll('.item-checkbox').forEach(cb => {
        cb.addEventListener('change', updateSelectedCount);
    });
    
    // Click history item to show receipt
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Jangan trigger kalau klik checkbox
            if (e.target.classList.contains('item-checkbox')) return;
            
            const txId = item.dataset.id;
            const transaction = state.transactions.find(t => t.id === txId);
            if (transaction) {
                showReceipt(transaction);
            }
        });
    });
    
    updateSelectedCount();
}

function updateSelectedCount() {
    const checked = document.querySelectorAll('.item-checkbox:checked').length;
    const selectedCount = document.getElementById('selectedCount');
    const selectAll = document.getElementById('selectAll');
    
    if (selectedCount) {
        selectedCount.textContent = checked;
    }
    
    const total = document.querySelectorAll('.item-checkbox').length;
    if (selectAll) {
        selectAll.checked = checked === total && total > 0;
        selectAll.indeterminate = checked > 0 && checked < total;
    }
}

function deleteSelectedTransactions() {
    const checkedIds = Array.from(document.querySelectorAll('.item-checkbox:checked')).map(cb => cb.dataset.id);
    
    if (checkedIds.length === 0) {
        alert('Pilih transaksi yang ingin dihapus!');
        return;
    }
    
    if (!confirm(`Hapus ${checkedIds.length} transaksi yang dipilih?`)) {
        return;
    }
    
    state.transactions = state.transactions.filter(t => !checkedIds.includes(t.id));
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
    renderHistoryList();
    alert(`${checkedIds.length} transaksi berhasil dihapus!`);
}

function voidTransaction(id) {
    const transaction = state.transactions.find(t => t.id === id);
    if (!transaction) return;
    if (transaction.status === 'void') {
        alert('Transaksi ini sudah di-void!');
        return;
    }

    document.getElementById('voidModalTransactionId').textContent = id;
    document.getElementById('voidModalItems').textContent = transaction.items.map(i => i.name).join(', ');
    document.getElementById('voidModalTotal').textContent = formatCurrency(transaction.total);

    const confirmBtn = document.getElementById('voidConfirmBtn');
    confirmBtn.onclick = function() {
        transaction.status = 'void';
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
        document.getElementById('voidModal').classList.remove('active');
        renderHistoryList();
        renderStats();
        alert(`Transaksi ${id} berhasil di-void!`);
    };

    document.getElementById('voidModal').classList.add('active');
}

function unVoidTransaction(id) {
    const transaction = state.transactions.find(t => t.id === id);
    if (!transaction) return;
    if (transaction.status !== 'void') {
        alert('Transaksi ini bukan transaksi void!');
        return;
    }

    document.getElementById('unvoidModalTransactionId').textContent = id;
    document.getElementById('unvoidModalItems').textContent = transaction.items.map(i => i.name).join(', ');
    document.getElementById('unvoidModalTotal').textContent = formatCurrency(transaction.total);

    const confirmBtn = document.getElementById('unvoidConfirmBtn');
    confirmBtn.onclick = function() {
        transaction.status = 'lunas';
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
        document.getElementById('unvoidModal').classList.remove('active');
        renderHistoryList();
        renderStats();
        alert(`Transaksi ${id} berhasil dikembalikan!`);
    };

    document.getElementById('unvoidModal').classList.add('active');
}

function reprintTransaction(id) {
    const transaction = state.transactions.find(t => t.id === id);
    if (!transaction) return;
    showReceipt(transaction);
}

function renderStats() {
    // Today's stats (exclude void)
    const todayTransactions = state.transactions.filter(t => isToday(t.date) && t.status !== 'void');
    const todayRevenue = todayTransactions.reduce((sum, t) => sum + t.total, 0);
    const avgTicket = todayTransactions.length > 0 ? Math.round(todayRevenue / todayTransactions.length) : 0;
    
    // Total stats (exclude void)
    const totalRevenue = state.transactions.filter(t => t.status !== 'void').reduce((sum, t) => sum + t.total, 0);
    
    elements.todayRevenue.textContent = formatCurrency(todayRevenue);
    elements.todayTransactions.textContent = todayTransactions.length;
    elements.avgTicket.textContent = formatCurrency(avgTicket);
    elements.totalRevenue.textContent = formatCurrency(totalRevenue);
    
    // Popular services
    renderPopularServices();
    
    // Revenue chart
    renderRevenueChart();
}

function renderPopularServices() {
    const serviceCounts = {};
    state.transactions.filter(t => t.status !== 'void').forEach(t => {
        t.items.forEach(item => {
            if (!serviceCounts[item.name]) {
                serviceCounts[item.name] = { count: 0, revenue: 0 };
            }
            serviceCounts[item.name].count += item.quantity;
            serviceCounts[item.name].revenue += item.price * item.quantity;
        });
    });
    
    const sortedServices = Object.entries(serviceCounts)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5);
    
    if (sortedServices.length === 0) {
        elements.popularList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Belum ada data</p>';
        return;
    }
    
    elements.popularList.innerHTML = sortedServices.map(([name, data], index) => `
        <div class="popular-item">
            <span class="popular-rank">${index + 1}</span>
            <div class="popular-info">
                <div class="popular-name">${name}</div>
                <div class="popular-count">${data.count}x terjual</div>
            </div>
            <div class="popular-revenue">${formatCurrency(data.revenue)}</div>
        </div>
    `).join('');
}

function renderRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    const ctx = canvas.getContext('2d');
    
    // Get last 7 days data
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push({
            date: date.toISOString().split('T')[0],
            label: date.toLocaleDateString('id-ID', { weekday: 'short' }),
            revenue: 0
        });
    }
    
    // Calculate revenue per day (exclude void)
    state.transactions.filter(t => t.status !== 'void').forEach(t => {
        const tDate = new Date(t.date).toISOString().split('T')[0];
        const dayData = last7Days.find(d => d.date === tDate);
        if (dayData) {
            dayData.revenue += t.total;
        }
    });
    
    // Draw chart
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 300;
    const padding = 40;
    
    ctx.clearRect(0, 0, width, height);
    
    const maxRevenue = Math.max(...last7Days.map(d => d.revenue), 100000);
    const barWidth = (width - padding * 2) / 7 - 10;
    
    last7Days.forEach((day, index) => {
        const x = padding + index * ((width - padding * 2) / 7) + 5;
        const barHeight = (day.revenue / maxRevenue) * (height - padding * 2);
        const y = height - padding - barHeight;
        
        // Bar
        ctx.fillStyle = '#c9a227';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();
        
        // Label
        ctx.fillStyle = '#a0a0b0';
        ctx.font = '12px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(day.label, x + barWidth / 2, height - 15);
        
        // Value
        if (day.revenue > 0) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '11px Poppins';
            ctx.fillText(formatCurrency(day.revenue), x + barWidth / 2, y - 8);
        }
    });
}

// ============================================
// ORDER FUNCTIONS
// ============================================

function addToOrder(serviceId) {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return;
    
    const existingItem = state.order.find(item => item.id === serviceId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.order.push({
            ...service,
            quantity: 1
        });
    }
    
    renderServiceCards();
    renderOrderItems();
    renderOrderSummary();
    
    // On mobile, briefly show the panel when adding item
    if (window.innerWidth <= 768) {
        const orderSection = document.querySelector('.order-section');
        const overlay = document.getElementById('orderPanelOverlay');
        if (orderSection && !orderSection.classList.contains('panel-open')) {
            orderSection.classList.add('panel-open');
            if (overlay) overlay.classList.add('active');
            
            // Auto-close after 1.5s
            setTimeout(() => {
                if (state.order.length > 0) {
                    orderSection.classList.remove('panel-open');
                    if (overlay) overlay.classList.remove('active');
                }
            }, 1500);
        }
    }
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

function updateQuantity(itemId, change) {
    const item = state.order.find(item => item.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromOrder(itemId);
        return;
    }
    
    renderOrderItems();
    renderOrderSummary();
    renderServiceCards();
}

function removeFromOrder(itemId) {
    state.order = state.order.filter(item => item.id !== itemId);
    
    renderOrderItems();
    renderOrderSummary();
    renderServiceCards();
}

function updateChange() {
    const subtotal = state.order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountValue = Math.round(subtotal * state.discountPercent / 100);
    const total = subtotal - discountValue;
    const payment = parseFormattedNumber(elements.paymentAmount.value);
    const change = payment - total;
    
    if (payment > 0) {
        elements.changeAmount.textContent = formatCurrency(change);
        elements.changeAmount.classList.toggle('negative', change < 0);
    } else {
        elements.changeAmount.textContent = formatCurrency(0);
        elements.changeAmount.classList.remove('negative');
    }
}

function updatePayButton() {
    // Tombol selalu aktif, validasi di processPayment
}

// ============================================
// TRANSACTION FUNCTIONS
// ============================================

function processPayment() {
    if (state.order.length === 0) {
        alert('Pilih layanan terlebih dahulu!');
        return;
    }
    
    const subtotal = state.order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountPercent = state.discountPercent;
    const discountValue = Math.round(subtotal * discountPercent / 100);
    const total = subtotal - discountValue;
    const payment = parseFormattedNumber(elements.paymentAmount.value);
    
    if (payment === 0 || isNaN(payment)) {
        alert('Masukkan jumlah pembayaran!');
        return;
    }
    
    if (payment < total) {
        alert('Jumlah pembayaran kurang! Total: ' + formatCurrency(total));
        return;
    }
    
    const transaction = {
        id: generateTransactionId(),
        date: new Date().toISOString(),
        items: [...state.order],
        subtotal,
        discountPercent,
        discountValue,
        total,
        payment,
        change: payment - total,
        customer: elements.customerName.value || 'Pelanggan',
        status: 'lunas'
    };
    
    state.transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
    
    showSuccess(transaction);
    
    state.order = [];
    state.paymentAmount = 0;
    state.discountPercent = 0;
    elements.paymentAmount.value = '';
    elements.customerName.value = '';
    elements.discountInput.value = '';
    
    renderServiceCards();
    renderOrderItems();
    renderOrderSummary();
    
    // Cek pengingat export setelah transaksi baru
    checkExportReminder();
    
    // Close order panel on mobile
    closeOrderPanel();
}

function showReceipt(transaction) {
    elements.receiptNo.textContent = transaction.id;
    elements.receiptDate.textContent = formatDateTime(new Date(transaction.date));
    elements.receiptCashier.textContent = transaction.customer;
    
    const isVoid = transaction.status === 'void';
    
    elements.receiptItems.innerHTML = transaction.items.map(item => `
        <div class="receipt-item">
            <span>${item.name} x${item.quantity}</span>
            <span>${formatCurrency(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    // Build totals with discount
    let totalsHTML = '';
    if (transaction.discountPercent > 0) {
        totalsHTML = `
            <p><span>Subtotal:</span> <span>${formatCurrency(transaction.subtotal)}</span></p>
            <p class="receipt-discount"><span>Diskon ${transaction.discountPercent}%:</span> <span>- ${formatCurrency(transaction.discountValue)}</span></p>
            <p class="receipt-total"><span>TOTAL:</span> <span id="receiptTotal">${formatCurrency(transaction.total)}</span></p>
        `;
    } else {
        totalsHTML = `
            <p class="receipt-total"><span>TOTAL:</span> <span id="receiptTotal">${formatCurrency(transaction.total)}</span></p>
        `;
    }
    totalsHTML += `
        <p><span>Bayar:</span> <span>${formatCurrency(transaction.payment)}</span></p>
        <p><span>Kembali:</span> <span>${formatCurrency(transaction.change)}</span></p>
    `;
    
    if (isVoid) {
        totalsHTML += `<p class="receipt-void-badge">*** VOID ***</p>`;
    }
    
    document.querySelector('.receipt-totals').innerHTML = totalsHTML;
    
    elements.receiptPayment.textContent = formatCurrency(transaction.payment);
    elements.receiptChange.textContent = formatCurrency(transaction.change);
    
    // Show/hide void button on receipt
    const voidBtn = document.getElementById('voidReceiptBtn');
    if (voidBtn) {
        voidBtn.style.display = isVoid ? 'none' : 'inline-flex';
        voidBtn.onclick = function() {
            elements.receiptModal.classList.remove('active');
            voidTransaction(transaction.id);
        };
    }
    
    elements.receiptModal.classList.add('active');
}

function showSuccess(transaction) {
    elements.successMessage.textContent = `Kembali: ${formatCurrency(transaction.change)}`;
    elements.successOverlay.classList.add('active');
    
    setTimeout(() => {
        elements.successOverlay.classList.remove('active');
        showReceipt(transaction);
    }, 2000);
}

function printReceipt() {
    // Hide everything except receipt modal
    const app = document.getElementById('app');
    const successOverlay = document.getElementById('successOverlay');
    const receiptModal = document.getElementById('receiptModal');
    const voidModal = document.getElementById('voidModal');
    const unvoidModal = document.getElementById('unvoidModal');
    
    if (app) app.style.display = 'none';
    if (successOverlay) successOverlay.style.display = 'none';
    if (voidModal) voidModal.style.display = 'none';
    if (unvoidModal) unvoidModal.style.display = 'none';
    if (receiptModal) {
        receiptModal.style.position = 'static';
        receiptModal.style.background = 'none';
        receiptModal.style.zIndex = 'auto';
    }
    
    // Print
    window.print();
    
    // Restore
    if (app) app.style.display = '';
    if (successOverlay) successOverlay.style.display = '';
    if (voidModal) voidModal.style.display = '';
    if (unvoidModal) unvoidModal.style.display = '';
    if (receiptModal) {
        receiptModal.style.position = '';
        receiptModal.style.background = '';
        receiptModal.style.zIndex = '';
    }
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function navigateTo(page) {
    state.currentPage = page;
    
    // Update nav items
    elements.navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
    
    // Update pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    document.getElementById(`${page}Page`).classList.add('active');
    
    // Show/hide back button (hide on kasir page)
    if (page === 'kasir') {
        elements.backBtn.classList.add('hidden');
    } else {
        elements.backBtn.classList.remove('hidden');
    }
    
    // Render page-specific content
    if (page === 'riwayat') {
        renderHistoryList();
    } else if (page === 'statistik') {
        renderStats();
    } else if (page === 'menu') {
        renderMenuList();
    }
    
    // Close order panel on navigation
    closeOrderPanel();
    
    // Close sidebar on mobile
    closeSidebar();
}

function toggleSidebar() {
    elements.sidebar.classList.toggle('active');
    elements.sidebarOverlay.classList.toggle('active');
}

function closeSidebar() {
    elements.sidebar.classList.remove('active');
    elements.sidebarOverlay.classList.remove('active');
}

// ============================================
// THEME MANAGEMENT
// ============================================

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

// ============================================
// DATE TIME UPDATE
// ============================================

function updateDateTime() {
    const now = new Date();
    elements.datetime.textContent = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================
// BACKUP & RESTORE FUNCTIONS
// ============================================

function backupData() {
    if (state.transactions.length === 0) {
        alert('Tidak ada data untuk di-backup!');
        return;
    }
    
    const backupData = {
        appName: 'IP MAN HAIRSTUDIO',
        version: '1.1.0',
        backupDate: new Date().toISOString(),
        transactions: state.transactions
    };
    
    const jsonContent = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ipman-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('Backup berhasil! File JSON telah diunduh.');
}

function restoreData() {
    document.getElementById('restoreFileInput').click();
}

function handleRestoreFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.json')) {
        alert('File harus berformat JSON!');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (!data.appName || !data.transactions) {
                alert('File backup tidak valid!');
                return;
            }
            
            const confirmRestore = confirm(
                `Ditemukan ${data.transactions.length} transaksi dari backup.\n` +
                `Tanggal backup: ${formatDateTime(new Date(data.backupDate))}\n\n` +
                `Gabungkan dengan data yang ada atau ganti semuanya?`
            );
            
            if (!confirmRestore) {
                event.target.value = '';
                return;
            }
            
            const mergeChoice = confirm('Klik OK untuk GABUNGKAN data, atau Cancel untuk MENGGANTIKAN semua data.');
            
            if (mergeChoice) {
                // Merge - add unique transactions
                const existingIds = new Set(state.transactions.map(t => t.id));
                let addedCount = 0;
                data.transactions.forEach(t => {
                    if (!existingIds.has(t.id)) {
                        state.transactions.push(t);
                        addedCount++;
                    }
                });
                alert(`Berhasil menggabungkan ${addedCount} transaksi baru!`);
            } else {
                // Replace
                state.transactions = data.transactions;
                alert(`Berhasil mengganti semua data dengan ${data.transactions.length} transaksi dari backup!`);
            }
            
            localStorage.setItem('transactions', JSON.stringify(state.transactions));
            
            // Refresh current page
            if (state.currentPage === 'riwayat') {
                renderHistoryList();
            } else if (state.currentPage === 'statistik') {
                renderStats();
            }
            
        } catch (error) {
            alert('Gagal membaca file backup: ' + error.message);
        }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
}

// ============================================
// DISCOUNT FUNCTIONS
// ============================================

function applyDiscount() {
    const input = document.getElementById('discountInput');
    const value = parseInt(input.value) || 0;
    
    if (value < 0 || value > 100) {
        alert('Diskon harus antara 0 - 100%');
        return;
    }
    
    state.discountPercent = value;
    
    const btn = document.getElementById('applyDiscountBtn');
    if (value > 0) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
    
    renderOrderSummary();
}

function removeDiscount() {
    state.discountPercent = 0;
    const input = document.getElementById('discountInput');
    if (input) input.value = '';
    
    const btn = document.getElementById('applyDiscountBtn');
    if (btn) btn.classList.remove('active');
    
    renderOrderSummary();
}

// ============================================
// EVENT LISTENERS
// ============================================

function initEventListeners() {
    // Back button
    elements.backBtn.addEventListener('click', () => navigateTo('kasir'));
    
    // Menu button
    elements.menuBtn.addEventListener('click', toggleSidebar);
    elements.closeSidebar.addEventListener('click', closeSidebar);
    elements.sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Discount
    const applyDiscountBtn = document.getElementById('applyDiscountBtn');
    const discountInput = document.getElementById('discountInput');
    const discountRemove = document.getElementById('discountRemove');
    
    if (applyDiscountBtn) {
        applyDiscountBtn.addEventListener('click', applyDiscount);
    }
    if (discountInput) {
        discountInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (parseInt(val) > 100) val = '100';
            e.target.value = val;
        });
        discountInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyDiscount();
            }
        });
    }
    if (discountRemove) {
        discountRemove.addEventListener('click', removeDiscount);
    }
    
    // Backup & Restore
    const backupBtn = document.getElementById('backupBtn');
    const restoreBtn = document.getElementById('restoreBtn');
    const restoreFileInput = document.getElementById('restoreFileInput');
    
    if (backupBtn) {
        backupBtn.addEventListener('click', backupData);
    }
    if (restoreBtn) {
        restoreBtn.addEventListener('click', restoreData);
    }
    if (restoreFileInput) {
        restoreFileInput.addEventListener('change', handleRestoreFile);
    }
    
    // Export banner
    const bannerExportBtn = document.getElementById('bannerExportBtn');
    const bannerDismissBtn = document.getElementById('bannerDismissBtn');
    if (bannerExportBtn) {
        bannerExportBtn.addEventListener('click', exportAndClear);
    }
    if (bannerDismissBtn) {
        bannerDismissBtn.addEventListener('click', () => {
            document.getElementById('exportBanner').style.display = 'none';
        });
    }
    
    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.page);
        });
    });
    
    // Header buttons
    elements.historyBtn.addEventListener('click', () => navigateTo('riwayat'));
    elements.settingsBtn.addEventListener('click', () => {
        // TODO: Settings modal
        alert('Pengaturan akan segera hadir!');
    });
    
    // Category tabs
    elements.tabBtns.forEach(tab => {
        tab.addEventListener('click', () => {
            elements.tabBtns.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.selectedCategory = tab.dataset.category;
            renderServiceCards();
        });
    });
    
    // Quick amounts
    elements.quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.paymentAmount.value = formatNumberWithDots(btn.dataset.amount);
            updateChange();
        });
    });
    
    // Payment input
    elements.paymentAmount.addEventListener('input', (e) => {
        let val = e.target.value.replace(/[^\d]/g, '');
        e.target.value = formatNumberWithDots(val);
        updateChange();
    });
    
    // Pay button
    elements.payBtn.addEventListener('click', () => {
        processPayment();
        closeOrderPanel();
    });
    
    // Floating cart button (mobile)
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    if (floatingCartBtn) {
        floatingCartBtn.addEventListener('click', toggleOrderPanel);
    }
    
    // Order panel overlay
    const orderPanelOverlay = document.getElementById('orderPanelOverlay');
    if (orderPanelOverlay) {
        orderPanelOverlay.addEventListener('click', closeOrderPanel);
    }
    
    // Receipt modal
    elements.closeReceipt.addEventListener('click', () => {
        elements.receiptModal.classList.remove('active');
    });
    elements.printReceipt.addEventListener('click', printReceipt);
    
    // History date filter
    elements.historyDate.addEventListener('change', renderHistoryList);
    
    // Export button
    elements.exportBtn.addEventListener('click', exportTransactions);
    
    // Select all checkbox
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', (e) => {
            document.querySelectorAll('.item-checkbox').forEach(cb => {
                cb.checked = e.target.checked;
            });
            updateSelectedCount();
        });
    }
    
    // Delete selected button
    const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener('click', deleteSelectedTransactions);
    }
    
    // Close modal on overlay click
    elements.receiptModal.addEventListener('click', (e) => {
        if (e.target === elements.receiptModal) {
            elements.receiptModal.classList.remove('active');
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC to close modals
        if (e.key === 'Escape') {
            elements.receiptModal.classList.remove('active');
            closeSidebar();
        }
    });
}

// ============================================
// EXPORT FUNCTION
// ============================================

function exportTransactions() {
    if (state.transactions.length === 0) {
        alert('Tidak ada data untuk di-export!');
        return;
    }
    
    const csvContent = [
        ['ID', 'Tanggal', 'Pelanggan', 'Item', 'Subtotal', 'Total', 'Bayar', 'Kembali', 'Status'],
        ...state.transactions.map(t => [
            t.id,
            formatDateTime(new Date(t.date)),
            t.customer || 'Umum',
            t.items.map(item => `${item.name} x${item.quantity}`).join(', '),
            t.subtotal,
            t.total,
            t.payment,
            t.change,
            t.status === 'void' ? 'VOID' : 'Lunas'
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barbercash-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// ============================================
// PWA FUNCTIONS
// ============================================

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Hide splash after 1.5 seconds
    setTimeout(() => {
        elements.splash.classList.add('hidden');
        elements.app.classList.remove('hidden');
    }, 1500);
    
    // Load theme
    loadTheme();
    
    // Auto-hapus transaksi > 7 hari
    cleanupOldTransactions();
    
    // Initialize
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    renderServiceCards();
    renderOrderItems();
    renderOrderSummary();
    
    initEventListeners();
    registerServiceWorker();
    
    // Set today's date for history filter
    elements.historyDate.value = new Date().toISOString().split('T')[0];
    
    // Cek pengingat export
    checkExportReminder();
    
    // Hide floating cart initially
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    if (floatingCartBtn) floatingCartBtn.style.display = 'none';
    
    console.log('IP MAN HAIRSTUDIO initialized!');
}

// Start app
document.addEventListener('DOMContentLoaded', init);
