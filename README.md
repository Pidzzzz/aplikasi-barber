# 💈 IP MAN HAIRSTUDIO

Aplikasi Kasir Barbershop Modern berbasis PWA (Progressive Web App) yang ringan, cepat, dan dapat diakses secara offline.

![IP MAN HAIRSTUDIO](https://img.shields.io/badge/IP%20MAN-HAIRSTUDIO-gold?style=for-the-badge&logo=gnubash&logoColor=white)
![Version](https://img.shields.io/badge/version-1.1.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

---

## ✨ Fitur Unggulan

### 🛒 Kasir Modern
- **16 Menu Layanan** dengan 6 kategori (Potong, Paket, Treatment, Color, Perm)
- **Input Cepat** dengan tombol nominal (50rb, 100rb, 150rb, 200rb)
- **Diskon Persentase** (0-100%) dengan perhitungan otomatis
- **Format Rupiah** dengan pemisah titik (50.000)
- **Nama Pelanggan** untuk setiap transaksi

### 📱 Mobile-First Design
- **Floating Cart Button** — tombol keranjang di layar HP
- **Slide-Up Panel** — panel pesanan tidak menutupi menu
- **Responsif** — optimal di HP, tablet, dan desktop
- **Touch Friendly** — tombol besar, mudah diakses

### 📊 Statistik & Laporan
- **Pendapatan Hari Ini** — langsung terlihat saat buka app
- **Transaksi Hari Ini** — jumlah pelanggan hari ini
- **Rata-rata per Transaksi** — insight bisnis
- **Layanan Populer** — tahu layanan favorit pelanggan
- **Grafik 7 Hari** — visualisasi pendapatan mingguan

### 📝 Riwayat Transaksi
- **Total Transaksi** — jumlah riwayat
- **Filter Tanggal** — cari transaksi tertentu
- **Pilih & Hapus** — kelola riwayat massal
- **Klik untuk Struk** — lihat detail transaksi
- **Nama Pelanggan** — identifikasi pelanggan

### 🧾 Struk Digital
- **Struk Lengkap** — detail transaksi, diskon, kembalian
- **Print Ready** — cetak langsung dari browser
- **Desain Rapi** — format seperti struk toko

### 💾 Data Management
- **Auto-Save** — data tersimpan otomatis di localStorage
- **Auto-Cleanup** — hapus transaksi > 7 hari otomatis
- **Backup JSON** — backup semua data ke file
- **Restore JSON** — pulihkan data dari backup
- **Export CSV** — ekspel ke Excel/Google Sheets

### 🎨 Tema
- **Dark Mode** — tema gelap modern
- **Light Mode** — tema terang untuk outdoor
- **Toggle Praktis** — ganti tema dengan satu klik

### 📲 PWA (Progressive Web App)
- **Installable** — pasang seperti app native
- **Offline Ready** — tetap bisa dipakai tanpa internet
- **Home Screen** — akses langsung dari layar utama

---

## 🖥️ Tampilan

### Desktop
```
┌─────────────────────────────────────────────────────┐
│  💈 IP MAN HAIRSTUDIO          🌙 📋 ⚙️           │
├──────────────────────────────┬──────────────────────┤
│  Pilih Layanan               │  🛒 Pesanan         │
│  [Semua] [Potong] [Paket]   │                      │
│  ┌────────┐ ┌────────┐     │  Mens Haircut x1     │
│  │ ✂️     │ │ 🧖     │     │  Paket Ganteng x1    │
│  │Mens    │ │Paket   │     │                      │
│  │Haircut │ │Ganteng │     │  Subtotal: Rp 115.000│
│  │Rp50.000│ │Rp65.000│     │  Diskon 10%: -11.500│
│  └────────┘ └────────┘     │  Total: Rp 103.500  │
│                             │  [Bayar: 150.000]   │
│                             │  Kembali: 46.500    │
│                             │  [BAYAR SEKARANG]   │
└──────────────────────────────┴──────────────────────┘
```

### Mobile
```
┌─────────────────────┐
│ 💈 IP MAN    🌙 📋 │
├─────────────────────┤
│ Pilih Layanan       │
│ [Semua][Potong]...  │
│ ┌─────────────────┐ │
│ │ ✂️ Mens Haircut │ │
│ │ Potong rambut...│ │
│ │ Rp 50.000       │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ 🧖 Paket Ganteng│ │
│ │ ...             │ │
│ └─────────────────┘ │
│                     │
│  🟡 Rp 115.000 (2) │  ← Floating Cart
└─────────────────────┘
```

---

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|-----------|--------|
| **HTML5** | Struktur halaman |
| **CSS3** | Desain responsif & animasi |
| **JavaScript** | Logika aplikasi |
| **PWA** | Installable & offline |
| **Service Worker** | Caching & offline support |
| **localStorage** | Penyimpanan data lokal |
| **Canvas API** | Grafik pendapatan |

---

## 📦 Instalasi

### Online ( langsung pakai)
1. Buka link berikut:
```
https://pidzzzz.github.io/aplikasi-barber/
```
2. Klik **⋮** → **Tambahkan ke layar utama**

### Offline (Termux di HP)
1. Install Termux dari F-Droid
2. Jalankan:
```bash
pkg install python -y
cd /sdcard/barber-cashier
python -m http.server 8080
```
3. Buka Chrome: `localhost:8080`

---

## 📁 Struktur Folder

```
aplikasi-barber/
├── index.html          # Halaman utama
├── style.css           # Desain & responsive
├── app.js              # Logika aplikasi
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline support
├── icons/
│   └── icon.svg        # Ikon aplikasi
└── README.md           # Dokumentasi ini
```

---

## 🎯 Menu Layanan

| Kategori | Layanan | Harga |
|----------|---------|-------|
| ✂️ **Potong** | Mens Haircut | Rp 50.000 |
| ✂️ **Potong** | Kids Haircut | Rp 35.000 |
| ✂️ **Potong** | Shaving | Rp 25.000 |
| ✂️ **Potong** | Trimming | Rp 10.000 |
| 🧖 **Paket** | Paket Ganteng | Rp 65.000 |
| 🧖 **Paket** | Paket Ganteng Full | Rp 110.000 |
| 💆 **Treatment** | Blackmask | Rp 30.000 |
| 💆 **Treatment** | Hair Spa | Rp 25.000 |
| 💆 **Treatment** | Creambath | Rp 50.000 |
| 💆 **Treatment** | Blackhead | Rp 15.000 |
| 🎨 **Color** | Highlight Short | Rp 150.000 |
| 🎨 **Color** | Highlight Medium | Rp 220.000 |
| 🎨 **Color** | Highlight Long | Rp 300.000 |
| 💫 **Perm** | Down Perm & Rootlift | Rp 150.000 |
| 💫 **Perm** | Perm Short | Rp 250.000 |
| 💫 **Perm** | Perm Medium | Rp 300.000 |

---

## 📱 Kompatibilitas

| Device | Status |
|--------|--------|
| ✅ HP Android | Full Support |
| ✅ Tablet Android | Full Support |
| ✅ iPhone/iPad | Full Support |
| ✅ Desktop Chrome | Full Support |
| ✅ Desktop Firefox | Full Support |
| ✅ Offline Mode | Supported |

---

## 🔧 Fitur Teknis

- **Responsive Design** — Mobile-first, 4 breakpoint (small mobile, mobile, tablet, desktop)
- **Touch Optimized** — Tombol besar, swipe-friendly
- **Haptic Feedback** — Vibrasi saat tambah item (jika device support)
- **Auto-Save** — Data tersimpan otomatis
- **Auto-Cleanup** — Hapus data > 7 hari
- **Keyboard Shortcuts** — ESC untuk tutup modal
- **Print Support** — Cetak struk langsung

---

## 📄 License

MIT License - Free untuk digunakan

---

## 👨‍💻 Author

**Pidzzzz**
- GitHub: [@Pidzzzz](https://github.com/Pidzzzz)

---

## 🙏 Support

Jika aplikasi ini bermanfaat, berikan ⭐ Star di GitHub!

---

Made with ❤️ for Barbershop Indonesia
