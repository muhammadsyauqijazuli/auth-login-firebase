# dzkra-auth (Next.js + Firebase)

A simple auth starter using Next.js (App Router), Firebase Authentication (Email/Password + Google), and Firestore example. Optimized for easy deploy to Vercel.

## Fitur
- Email & Password: daftar, login, reset password
- Login dengan Google (popup)
- State auth global dengan Context
- Proteksi halaman Dashboard
- Contoh Firestore (koleksi `notes`)
- TailwindCSS untuk styling

## Persiapan Firebase
1. Buat project di Firebase Console.
2. Aktifkan Authentication: Email/Password dan Google.
3. Tambahkan aplikasi Web dan salin config.
4. Tambahkan Authorized Domain (Vercel domain jika perlu).
5. (Opsional) Buat koleksi Firestore `notes`.

## Konfigurasi Environment
Salin `.env.local.example` menjadi `.env.local` lalu isi nilai dari Firebase Web App:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

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

## Catatan Keamanan
- Akses data harus diamankan via Firestore Security Rules. Contoh sederhana:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{docId} {
      allow read, create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.uid;
    }
  }
}
```

## Lisensi
Gunakan bebas untuk belajar dan proyek Anda.
