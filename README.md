# Authify - Modern Authentication System

🔐 Production-ready authentication starter built with Next.js 16 (App Router), Firebase Authentication, and Firestore. Fully optimized for Vercel deployment with comprehensive security features.

## ✨ Fitur Production-Ready

### Authentication
- ✅ Email & Password authentication dengan validasi kuat
- ✅ Google Sign-In (popup + redirect fallback)
- ✅ Email verification system dengan resend functionality
- ✅ Password reset dengan validasi email
- ✅ Protected routes dengan auto-redirect
- ✅ Session persistence

### Security & Validation
- ✅ Password strength indicator (real-time)
- ✅ Per-field validation dengan error messages
- ✅ Firestore Security Rules (user-based access control)
- ✅ COOP/COEP headers untuk Google popup
- ✅ Input sanitization dan validation

### UX/UI
- ✅ Modern gradient design (Tailwind CSS)
- ✅ Loading states di semua operasi async
- ✅ User-friendly error messages (Bahasa Indonesia)
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Professional dashboard dengan statistics

### Developer Experience
- ✅ TypeScript strict mode
- ✅ Organized folder structure
- ✅ Reusable components
- ✅ Comprehensive error handling
- ✅ Environment variables documentation

## Persiapan Firebase
1. Buat project di Firebase Console.
2. Aktifkan Authentication: Email/Password dan Google.
3. Tambahkan aplikasi Web dan salin config.
4. Tambahkan Authorized Domain (Vercel domain jika perlu).
5. (Opsional) Buat koleksi Firestore `notes`.

## 🔧 Konfigurasi Environment Variables

### Required Variables
Salin `.env.local.example` menjadi `.env.local` dan isi dengan konfigurasi Firebase Anda:

```env
# Firebase Web App Configuration
# Dapatkan dari: Firebase Console → Project Settings → Your apps → Web app

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
# API key untuk Firebase SDK (public, aman untuk client-side)

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com  
# Domain untuk Firebase Authentication

NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
# Project ID unik dari Firebase

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
# Bucket untuk Firebase Storage

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
# Sender ID untuk Cloud Messaging

NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
# App ID unik untuk aplikasi web Anda
```

### Cara Mendapatkan Firebase Config
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih/buat project
3. Ke Project Settings (⚙️) → Your apps
4. Pilih web app atau buat baru (</> icon)
5. Copy semua nilai config ke `.env.local`

## Jalankan Lokal
```powershell
npm install
npm run dev
```
Buka http://localhost:3000.

## Deploy ke Vercel
1. Push repo ini ke GitHub.
2. Di Vercel: New Project → import repo.
3. Pada Settings → Environment Variables, tambahkan variabel seperti di `.env.local.example`.
4. Deploy. Setelah selesai, test login/daftar.

## Struktur Utama
- `app/(auth)/*` — login, register, reset password
- `app/(protected)/dashboard` — halaman terproteksi + contoh Firestore
- `context/AuthContext.tsx` — state auth global
- `lib/firebase.ts` — inisialisasi Firebase
- `components/*` — komponen UI & helper

## 🔐 Catatan Keamanan

### Firestore Security Rules
Rules sudah dikonfigurasi di `firestore.rules`. Deploy ke Firebase:

```bash
# Install Firebase CLI (jika belum)
npm install -g firebase-tools

# Login
firebase login

# Init project (pilih Firestore)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

### Rules Overview
- ✅ Semua akses memerlukan autentikasi
- ✅ User hanya bisa read/write data mereka sendiri
- ✅ Validasi struktur data (text max 5000 chars)
- ✅ Prevent unauthorized access ke collections lain

### Best Practices
1. **Jangan commit `.env.local`** - sudah ada di `.gitignore`
2. **Gunakan Environment Variables di Vercel** untuk production
3. **Enable Email Verification** untuk akun baru
4. **Monitor Firebase Console** untuk aktivitas mencurigakan
5. **Update dependencies** secara berkala
6. **Test Security Rules** di Firebase Console → Firestore → Rules → Simulator

## Lisensi
Gunakan bebas untuk belajar dan proyek Anda.
