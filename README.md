# Aplikasi Pemesanan Ayam Geprek UMKM

Aplikasi ini merupakan platform sederhana untuk pemesanan ayam UMKM yang terdiri dari tiga halaman utama, yaitu:

1. **Halaman Pemesanan (Order Page)**  
   Halaman utama yang digunakan pelanggan untuk melihat daftar menu dan melakukan pemesanan. Data pesanan akan dikirim langsung ke Google Spreadsheet melalui link berikut:  
   [Google Spreadsheet Pesanan](https://docs.google.com/spreadsheets/d/13CHN4bN-EvqUMwyd7ito_CPtGTI-i7mrF32bn29pl_c/edit?gid=0#gid=0)

2. **Halaman Login Admin**  
   Halaman login yang digunakan oleh admin untuk mengakses dashboard. Halaman dashboard hanya bisa diakses jika admin telah berhasil login.

3. **Halaman Dashboard Admin**  
   Halaman ini digunakan untuk mengelola data menu makanan. Admin dapat melakukan operasi CRUD (Create, Read, Update, Delete) secara realtime menggunakan database Firebase. Data yang dikelola di dashboard akan langsung ditampilkan di halaman pemesanan.

---

## Teknologi yang Digunakan

- **Frontend**: [Vite](https://vitejs.dev/), [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Database**: [Firebase Firestore](https://firebase.google.com/products/firestore)
- **Hosting**: [Vercel](https://vercel.com/)
- **Integrasi Spreadsheet**: Google Spreadsheet sebagai tujuan pengiriman data pesanan dari pelanggan

---

## Fitur Utama

- ✨ Tampilan responsif dan ringan
- 🔒 Login admin untuk keamanan akses dashboard
- ⚙️ Realtime CRUD untuk data menu makanan
- 📤 Integrasi langsung ke Google Spreadsheet untuk pencatatan pesanan pelanggan
- ☁️ Deploy di Vercel, siap online kapan saja

---

## Developer

Proyek ini dibuat oleh **Helyas** sebagai bagian dari pengembangan sistem pemesanan sederhana untuk mendukung UMKM.

---

## Lisensi

Proyek ini bersifat open untuk kebutuhan pembelajaran dan pengembangan skala kecil.
