# TM Multichip — Landing Page

Website single page untuk aplikasi **TM Multichip** (top up pulsa, tagihan, dan voucher game). Dibuat dengan HTML, CSS, dan sedikit JavaScript — tanpa framework, jadi bisa langsung dipublikasikan sebagai static site.

## Isi folder

```
├── index.html        -> struktur halaman (header, body, footer)
├── style.css          -> semua styling
├── script.js          -> script kecil (tahun otomatis di footer)
├── netlify.toml        -> konfigurasi build Netlify
├── assets/
│   └── app-screenshot.jpeg
└── README.md
```

## 1. Simpan ke GitHub

1. Buat repository baru di GitHub, misalnya `tm-multichip-website`.
2. Di folder ini, jalankan:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TM Multichip landing page"
   git branch -M main
   git remote add origin https://github.com/USERNAME/tm-multichip-website.git
   git push -u origin main
   ```
   Ganti `USERNAME` dengan username GitHub Anda.

## 2. Publikasikan ke Netlify

1. Buka [app.netlify.com](https://app.netlify.com/) dan login.
2. Klik **Add new site → Import an existing project**.
3. Pilih **GitHub**, lalu pilih repository `tm-multichip-website`.
4. Build settings dibiarkan default (situs ini statis, tidak perlu build command). Pastikan **Publish directory** terisi `.` (sudah diatur otomatis lewat `netlify.toml`).
5. Klik **Deploy site**. Netlify akan memberi Anda domain sementara seperti `nama-acak.netlify.app`.

## 3. Hubungkan domain dari Hostinger

1. Di Netlify: masuk ke **Site configuration → Domain management → Add a domain**, lalu masukkan domain Anda (misalnya `tmmultichip.id`).
2. Netlify akan menampilkan nilai DNS yang perlu diarahkan — biasanya salah satu dari:
   - **Opsi A (disarankan):** ubah nameserver domain di Hostinger menjadi nameserver Netlify.
   - **Opsi B:** tambahkan record berikut di **hPanel Hostinger → Domains → DNS/Nameserver**:
     - Tipe `A` untuk domain utama (root) mengarah ke IP yang diberikan Netlify (biasanya `75.2.60.5`).
     - Tipe `CNAME` untuk `www` mengarah ke domain `nama-acak.netlify.app` dari Netlify Anda.
3. Simpan perubahan DNS di Hostinger, lalu tunggu propagasi (umumnya 15 menit–24 jam).
4. Kembali ke Netlify dan aktifkan **HTTPS/SSL otomatis** (Let's Encrypt) setelah domain terverifikasi.

Setelah langkah ini selesai, domain Hostinger Anda akan menampilkan situs yang sama dengan yang ada di repository GitHub — setiap kali Anda `git push`, Netlify akan otomatis membangun ulang dan memperbarui situs.

## Mengubah konten

- Tombol **Unduh Aplikasi** mengarah ke `https://bit.ly/47gVaY4`.
- Tombol **Hubungi CS** mengarah ke `https://wa.me/6281536520505`.
- Untuk mengganti nomor WhatsApp, cari `wa.me/6281536520505` di `index.html` dan ganti dengan nomor baru (format: kode negara tanpa tanda `+`, tanpa spasi).
- Warna diambil langsung dari warna resmi TM Multichip: teal `rgb(135, 201, 187)` dan merah dari logo. Semua bisa diubah lewat variabel di bagian atas `style.css` (`:root { ... }`).

## Mengganti foto slideshow

Slideshow di dalam bingkai HP (otomatis bergeser setiap 4 detik, atau bisa digeser manual dengan tombol panah/titik) memakai 3 gambar:

- `assets/slide-1.jpg`
- `assets/slide-2.jpg`
- `assets/slide-3.jpg`

Untuk mengganti fotonya, cukup timpa file dengan nama yang sama, atau tambah slide baru dengan menambahkan baris `<img class="slide" src="assets/slide-4.jpg" alt="..." />` di dalam `.slide-track` pada `index.html` — logika JavaScript akan otomatis membaca berapa pun jumlah slide yang ada.
