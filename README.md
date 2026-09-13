# IP MAN HAIRSTUDIO

Aplikasi Kasir Barbershop Modern berbasis PWA (Progressive Web App) yang ringan, cepat, dan dapat diakses secara offline.

![IP MAN HAIRSTUDIO](https://img.shields.io/badge/IP%20MAN-HAIRSTUDIO-gold?style=for-the-badge&logo=gnubash&logoColor=white)
![Version](https://img.shields.io/badge/version-2.1.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

---

## Fitur Unggulan

### Kasir Modern
- **16 Menu Layanan** dengan 6 kategori (Potong, Paket, Treatment, Color, Perm)
- **Input Cepat** dengan tombol nominal (50rb, 100rb, 150rb, 200rb)
- **Diskon Persentase** (0-100%) dengan perhitungan otomatis
- **Format Rupiah** dengan pemisah titik (50.000)
- **Nama Pelanggan** untuk setiap transaksi

### Manajemen Transaksi
- **Void Transaksi** — batalkan transaksi tanpa menghapus data
- **Un-Void** — kembalikan transaksi yang ter-void ke status lunas
- **Cetak Ulang** — cetak ulang struk dari riwayat transaksi
- **Histori Lengkap** — semua transaksi tercatat dengan status (Lunas/Void)

### Struk Digital
- **Logo SVG Transparan** — tampil profesional di struk
- **Struk Lengkap** — detail transaksi, diskon, kembalian, nama pelanggan
- **Print Ready** — cetak langsung dari browser
- **Struk Bersih** — hanya data transaksi, tanpa tombol UI

### Mobile-First Design
- **Floating Cart Button** — tombol keranjang di layar HP
- **Slide-Up Panel** — panel pesanan tidak menutupi menu
- **Responsif** — optimal di HP, tablet, dan desktop
- **Touch Friendly** — tombol besar, mudah diakses

### Statistik & Laporan
- **Pendapatan Hari Ini** — langsung terlihat saat buka app
- **Transaksi Hari Ini** — jumlah pelanggan hari ini
- **Rata-rata per Transaksi** — insight bisnis
- **Layanan Populer** — tahu layanan favorit pelanggan
- **Grafik 7 Hari** — visualisasi pendapatan mingguan

### Riwayat Transaksi
- **Total Transaksi** — jumlah riwayat
- **Filter Tanggal** — cari transaksi tertentu
- **Pilih & Hapus** — kelola riwayat massal
- **Klik untuk Struk** — lihat detail transaksi
- **Status Transaksi** — Lunas atau Void

### Data Management
- **Auto-Save** — data tersimpan otomatis di localStorage
- **Auto-Cleanup** — hapus transaksi > 7 hari otomatis
- **Backup JSON** — backup semua data ke file
- **Restore JSON** — pulihkan data dari backup (merge/replace)
- **Export CSV** — ekspor ke Excel/Google Sheets (termasuk status void)

### Tema
- **Dark Mode** — tema gelap modern
- **Light Mode** — tema terang untuk outdoor
- **Toggle Praktis** — ganti tema dengan satu klik (tersimpan di localStorage)

### PWA (Progressive Web App)
- **Installable** — pasang seperti app native
- **Offline Ready** — tetap bisa dipakai tanpa internet
- **Home Screen** — akses langsung dari layar utama
- **Icon SVG** — ikon vektor berkualitas tinggi

---

## Tech Stack

| Teknologi | Fungsi |
|-----------|--------|
| **HTML5** | Struktur halaman |
| **CSS3** | Desain responsif & animasi |
| **JavaScript** | Logika aplikasi |
| **PWA** | Installable & offline |
| **Service Worker** | Caching & offline support |
| **localStorage** | Penyimpanan data lokal |
| **Canvas API** | Grafik pendapatan |
| **SVG** | Logo & ikon vektor |

---

## Instalasi

### Online (langsung pakai)
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

## Struktur Folder

```
aplikasi-barber/
├── index.html          # Halaman utama
├── style.css           # Desain & responsive
├── app.js              # Logika aplikasi
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline support
├── logo/
│   └── logo.svg        # Logo vektor transparan
├── icons/
│   └── icon.svg        # Ikon aplikasi
└── README.md           # Dokumentasi ini
```

---

## Menu Layanan

| Kategori | Layanan | Harga |
|----------|---------|-------|
| Potong | Mens Haircut | Rp 50.000 |
| Potong | Kids Haircut | Rp 35.000 |
| Potong | Shaving | Rp 25.000 |
| Potong | Trimming | Rp 10.000 |
| Paket | Paket Ganteng | Rp 65.000 |
| Paket | Paket Ganteng Full | Rp 110.000 |
| Treatment | Blackmask | Rp 30.000 |
| Treatment | Hair Spa | Rp 25.000 |
| Treatment | Creambath | Rp 50.000 |
| Treatment | Blackhead | Rp 15.000 |
| Color | Highlight Short | Rp 150.000 |
| Color | Highlight Medium | Rp 220.000 |
| Color | Highlight Long | Rp 300.000 |
| Perm | Down Perm & Rootlift | Rp 150.000 |
| Perm | Perm Short | Rp 250.000 |
| Perm | Perm Medium | Rp 300.000 |

---

## Kompatibilitas

| Device | Status |
|--------|--------|
| HP Android | Full Support |
| Tablet Android | Full Support |
| iPhone/iPad | Full Support |
| Desktop Chrome | Full Support |
| Desktop Firefox | Full Support |
| Offline Mode | Supported |

---

## Fitur Teknis

- **Responsive Design** — Mobile-first, 4 breakpoint (small mobile, mobile, tablet, desktop)
- **Touch Optimized** — Tombol besar, swipe-friendly
- **Haptic Feedback** — Vibrasi saat tambah item (jika device support)
- **Auto-Save** — Data tersimpan otomatis
- **Auto-Cleanup** — Hapus data > 7 hari
- **Keyboard Shortcuts** — ESC untuk tutup modal
- **Print Support** — Cetak struk langsung (bersih, tanpa UI)
- **Void/Un-Void** — Pembatalan transaksi dengan konfirmasi
- **Cache Busting** — Versi file untuk mencegah cache lama

---

## Changelog

### v2.1.0 (Latest)
- Tombol Cetak Ulang di riwayat transaksi
- Perbaiki layout tombol struk (2 baris)
- Cache busting untuk PC/Tablet
- Logo SVG transparan
- Fix print struk (sembunyikan modal void/unvoid)

### v2.0.0
- Sistem Void Transaksi
- Tombol Un-Void untuk mengembalikan transaksi
- Modal konfirmasi Void & Un-Void
- Status transaksi (Lunas/Void)
- Statistik exclude transaksi void
- Export CSV termasuk status

### v1.1.0
- 16 menu layanan dengan 6 kategori
- Fitur diskon persentase
- Backup/Restore data
- Tema Dark/Light mode
- Floating cart button (mobile)

---

## License

MIT License - Free untuk digunakan

---

## Author

**Pidzzzz**
- GitHub: [@Pidzzzz](https://github.com/Pidzzzz)

---

Made with care for Barbershop Indonesia
