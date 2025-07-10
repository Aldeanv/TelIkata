# 📚 TelIkata — Latihan Interaktif Bahasa Indonesia

**TelIkata** adalah aplikasi web interaktif yang dirancang untuk membantu pengguna mengasah ketelitian membaca sekaligus memperkuat pemahaman terhadap ejaan dan tata bahasa Bahasa Indonesia. 

Dalam percakapan digital maupun tulisan sehari-hari, kesalahan kecil seperti ejaan, kata depan, atau struktur kalimat sering kali diabaikan begitu saja. TelIkata hadir untuk meningkatkan kesadaran terhadap kesalahan-kesalahan tersebut melalui latihan ringan yang bisa dilakukan kapan saja. Dengan pendekatan yang aktif dan mudah diakses, pengguna dilatih untuk lebih jeli dan konsisten dalam menggunakan Bahasa Indonesia dengan baik dan benar.

---

## 🧩 Fitur Utama

🖱️ **Klik & Koreksi**  
Pengguna dapat mengeklik kata dalam paragraf dan menggantinya jika dirasa tidak tepat, misalnya untuk memperbaiki ejaan atau penggunaan imbuhan.

🎯 **Beragam Tingkat Kesulitan**  
Tersedia latihan dalam tiga level: mudah, menengah, dan sulit—dirancang untuk melatih ketelitian secara bertahap, mulai dari yang terbantu hingga tanpa petunjuk sama sekali.

⏱️ **Mode Tantangan**  
Latihan dibatasi waktu (1–3 menit), tanpa petunjuk atau feedback selama pengerjaan. Cocok untuk menguji fokus dan kecepatan.

⚡ **Analisis Instan**  
Setelah selesai, pengguna langsung mendapat ringkasan hasil berupa skor akurasi, kata yang dikoreksi, waktu pengerjaan, dan pembahasan.

🚀 **Tanpa Login**  
Bisa langsung digunakan di browser, tanpa perlu membuat akun.

---

## 🌐 Demo
🚀 [Coba TelIkata Sekarang](https://telikata.vercel.app)

Buka langsung di browser, tanpa perlu login atau install aplikasi.

---

## 🧱 Teknologi

- **Frontend**: [Next.js](https://nextjs.org/) + TypeScript  
- **Styling** : [TailwindCSS](https://tailwindcss.com/)
- **Animasi** : Framer Motion  
- **Backend** : Prisma + [PostgreSQL (Supabase)](https://supabase.com/)

---

## 📦 Instalasi

**1. Clone repositori**
```bash
git clone https://github.com/Aldeanv/TelIkata.git
cd TelIkata
```

**2. Install dependensi**
```bash
npm install
```

**3. Jalankan server**
```bash
npm run dev
```

**4. Konfigurasi Backend (Opsional)**

Tambahkan DATABASE_URL ke file .env
```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/telikata"
```
**5. Setup Prisma**
```bash
npx prisma generate
npx prisma db push
```
---

## 📁 Struktur Folder

```bash
src/
├── app/                             # Folder utama untuk routing (Next.js App Router)
│   ├── api/
│   │   └── samples/route.ts         # Endpoint API untuk mengambil soal latihan
│   ├── result/page.tsx              # Halaman hasil evaluasi setelah menyelesaikan latihan
│   ├── Telikata/
│   │   ├── [mode]/[level]/page.tsx  # Halaman dinamis berdasarkan mode dan tingkat kesulitan
│   │   ├── challenge/               # Komponen atau rute khusus untuk Mode Challenge
│   │   └── normal/                  # Komponen atau rute khusus untuk Mode Normal
│   ├── favicon.ico                  # Ikon untuk tab browser
│   ├── globals.css                  # File CSS global (Tailwind base config)
│   ├── layout.tsx                   # Layout root (header/footer/global state)
│   └── page.tsx                     # Halaman landing utama (home)
│
├── components/                      # Komponen UI reusable
│   ├── homepage/                    # Komponen yang digunakan khusus di landing page
│   └── testpage/                    # Komponen yang digunakan di halaman latihan
│
├── data/                            # Kumpulan data statis seperti soal atau metadata
├── generated/                       # File hasil generate Prisma Client
├── hooks/                           # Custom React hooks
├── lib/                             # Fungsi helper & utilities global
├── types/                           # Tipe TypeScript global

```

