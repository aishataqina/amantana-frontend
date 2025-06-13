# Dokumentasi Proyek Amantana Frontend

## Daftar Isi

- [Panduan Setup Proyek](#panduan-setup-proyek)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Langkah-langkah Instalasi](#langkah-langkah-instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Troubleshooting](#troubleshooting)
- [Tampilan Aplikasi](#tampilan-aplikasi)
  - [Tampilan Awal](#tampilan-awal)
  - [Fitur Utama](#fitur-utama)
  - [Tampilan Detail](#tampilan-detail)

---

# Panduan Setup Proyek `amantana-frontend` (React Native)

Berikut adalah langkah-langkah untuk mengatur dan menjalankan proyek `amantana-frontend` di mesin lokal Anda. Proyek ini dibangun menggunakan **React Native**.

## Persyaratan Sistem

Sebelum memulai, pastikan sistem Anda memenuhi persyaratan berikut:

### Persyaratan Umum

- **Node.js** (versi 16 atau lebih tinggi) - [Download Node.js](https://nodejs.org/)
- **npm** atau **Yarn** sebagai package manager
- **Git** terinstal - [Download Git](https://git-scm.com/)
- **React Native CLI** terinstal globally

### Untuk Pengembangan Android

- **JDK (Java Development Kit)** versi 11 atau 17
- **Android Studio** dengan komponen berikut:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device (AVD)
- **Variabel Lingkungan** yang dikonfigurasi:
  - `ANDROID_HOME`
  - `JAVA_HOME`
  - Path ke Android SDK tools

### Untuk Pengembangan iOS (hanya di macOS)

- **Xcode** (versi terbaru dari App Store)
- **Xcode Command Line Tools**
- **CocoaPods** terinstal

**Catatan:** Jika Anda belum menyiapkan lingkungan pengembangan React Native, ikuti panduan resmi: [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) (pilih "React Native CLI Quickstart").

---

## Langkah-langkah Instalasi

### Langkah 1: Clone Repository

Buka Terminal atau Command Prompt, lalu jalankan perintah berikut:

```bash
git clone https://github.com/aishataqina/amantana-frontend.git
```

### Langkah 2: Masuk ke Direktori Proyek

```bash
cd amantana-frontend
```

### Langkah 3: Install Dependencies

Gunakan npm atau yarn untuk menginstall semua dependencies:

```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install
```

### Langkah 4: Setup untuk iOS (khusus macOS)

Jika Anda mengembangkan untuk iOS, jalankan perintah berikut:

```bash
cd ios
pod install
cd ..
```

### Langkah 5: Konfigurasi Environment (Opsional)

Jika proyek menggunakan file konfigurasi environment:

1. Salin file `.env.example` menjadi `.env`
2. Sesuaikan konfigurasi sesuai kebutuhan

```bash
cp .env.example .env
```

---

## Menjalankan Aplikasi

### Persiapan Sebelum Menjalankan

1. **Untuk Android**: Pastikan emulator Android sudah berjalan atau device fisik terhubung dengan USB debugging enabled
2. **Untuk iOS**: Pastikan iOS Simulator sudah berjalan

### Menjalankan Metro Bundler

Buka terminal dan jalankan:

```bash
npx react-native start
```

### Menjalankan di Android

Buka terminal baru (biarkan Metro Bundler tetap berjalan) dan jalankan:

```bash
npx react-native run-android
```

### Menjalankan di iOS (khusus macOS)

```bash
npx react-native run-ios
```

Atau untuk menjalankan di simulator iPhone tertentu:

```bash
npx react-native run-ios --simulator="iPhone 14"
```

---

## Troubleshooting

### Masalah Umum dan Solusi

**1. Metro Bundler Error**

```bash
npx react-native start --reset-cache
```

**2. Build Error pada Android**

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

**3. Pod Install Error pada iOS**

```bash
cd ios
pod deintegrate
pod install
cd ..
```

**4. Port 8081 sudah digunakan**

```bash
npx react-native start --port=8082
```

**5. Clear Cache Lengkap**

```bash
npx react-native start --reset-cache
# atau
npm start -- --reset-cache
```

### Perintah Berguna Lainnya

```bash
# Melihat device yang terhubung
adb devices

# Melihat iOS simulators yang tersedia
xcrun simctl list devices

# Build APK untuk testing
cd android
./gradlew assembleRelease
```

---

# Tampilan Aplikasi

## Tampilan Awal

### Splash Screen

<img src="../client/src/assets/img/splash-screen.png" alt="Tampilan Splash Screen Plantify" width="300">

**Deskripsi:**
Tampilan awal saat aplikasi Plantify dibuka, menampilkan logo dan branding aplikasi dengan animasi loading.

### Home Screen

<img src="../client/src/assets/img/home-ios.png" alt="Tampilan Halaman Utama Plantify" width="300">

**Deskripsi:**
Halaman utama aplikasi Plantify yang menampilkan:

- Fitur pencarian tanaman
- Kategori tanaman
- Daftar tanaman populer
- Navigasi ke fitur-fitur lainnya

---

## Fitur Utama

### Halaman Daftar Tanaman

<img src="../client/src/assets/img/plant-screen.png" alt="Tampilan Halaman Seluruh Card Tanaman" width="300">

**Deskripsi:**
Menampilkan koleksi lengkap tanaman dalam bentuk grid card dengan:

- Gambar tanaman
- Nama tanaman
- Kategori tanaman
- Status favorit

### Halaman Favorit

<img src="../client/src/assets/img/favorite-screen.png" alt="Tampilan Halaman Favorite" width="300">

**Deskripsi:**
Menampilkan daftar tanaman yang telah ditandai sebagai favorit oleh pengguna dengan kemampuan:

- Melihat tanaman favorit
- Menghapus dari favorit
- Navigasi ke detail tanaman

### Halaman Tambah Data Tanaman

<img src="../client/src/assets/img/add-plant-screen.png" alt="Tampilan Halaman Tambah Data Tanaman" width="300">

**Deskripsi:**
Form untuk menambahkan data tanaman baru dengan field:

- Nama tanaman
- Kategori tanaman
- Upload gambar tanaman
- Deskripsi dan informasi perawatan
- Validasi input data

### Halaman Pengingat Siram Tanaman

<img src="../client/src/assets/img/reminder-screen.png" alt="Tampilan Halaman Pengingat Siram Tanaman" width="300">

**Deskripsi:**
Fitur manajemen pengingat penyiraman dengan:

- Daftar pengingat aktif
- Jadwal penyiraman
- Notifikasi pengingat

### Halaman Pencarian Tanaman

<img src="../client/src/assets/img/search-screen.png" alt="Tampilan Halaman Pencarian Tanaman" width="300">

**Deskripsi:**
Fitur pencarian tanaman dengan:

- Search bar dengan real-time filtering
- Filter berdasarkan kategori
- Hasil pencarian yang relevan

<img src="../client/src/assets/img/search-screen-2.png" alt="Tampilan Hasil Pencarian" width="300">

**Deskripsi:**
Contoh tampilan hasil pencarian menampilkan tanaman yang sesuai dengan kata kunci pencarian.

---

## Tampilan Detail

### Halaman Detail Tanaman

<img src="../client/src/assets/img/detail-screen.png" alt="Tampilan Halaman Detail Tanaman" width="300">

**Deskripsi:**
Menampilkan informasi lengkap tanaman yang dipilih meliputi:

- Gambar tanaman dalam ukuran besar
- Nama dan nama ilmiah
- Deskripsi lengkap tanaman
- Informasi perawatan (penyiraman, pencahayaan, kelembaban)
- Tips dan panduan merawat
- Tombol untuk menambah ke favorit
- Opsi untuk mengatur pengingat

---

## Kontribusi

Untuk berkontribusi pada proyek ini:

1. Fork repository
2. Buat branch feature baru (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buat Pull Request

## Kontak

Untuk pertanyaan atau dukungan, hubungi:

- LinkedIn: [aishataqina](https://www.linkedin.com/in/aisha-taqina-7909572b7/)
- GitHub: [aishataqina](https://github.com/aishataqina)
