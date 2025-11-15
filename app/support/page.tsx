import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                A
              </div>
              <span>Authify</span>
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Masuk
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
            <span className="text-3xl">💬</span>
          </div>

          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white text-center">
            Pusat Bantuan
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Pertanyaan Umum (FAQ)
              </h2>
              
              <div className="space-y-4">
                <details className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    Bagaimana cara reset password?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Klik "Lupa password?" di halaman login, masukkan email Anda, dan kami akan mengirimkan 
                    link untuk reset password ke inbox Anda.
                  </p>
                </details>

                <details className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    Bagaimana cara verifikasi email?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Setelah mendaftar, cek inbox email Anda dan klik link verifikasi dari Firebase. 
                    Jika tidak menerima email, periksa folder spam atau gunakan tombol "Kirim Ulang" di halaman verifikasi.
                  </p>
                </details>

                <details className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    Apakah data saya aman?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Ya, kami menggunakan Firebase Authentication dengan enkripsi tingkat enterprise. 
                    Password Anda tidak pernah disimpan dalam bentuk plaintext, dan semua data dilindungi oleh 
                    Firestore Security Rules.
                  </p>
                </details>

                <details className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    Bagaimana cara menghapus akun?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Saat ini fitur hapus akun sedang dalam pengembangan. Untuk menghapus akun, 
                    silakan hubungi kami di support@authify.com dan kami akan membantu prosesnya.
                  </p>
                </details>

                <details className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    Kenapa Google Sign-In tidak berfungsi?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Pastikan browser Anda mengizinkan popup atau gunakan mode redirect. 
                    Jika masih bermasalah, coba gunakan browser lain atau login dengan email/password.
                  </p>
                </details>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Hubungi Kami
              </h2>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-600 dark:bg-gray-700">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Masih butuh bantuan? Tim support kami siap membantu Anda.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                      <a 
                        href="mailto:support@authify.com" 
                        className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                      >
                        support@authify.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Waktu Respon</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">1-2 hari kerja</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Sumber Daya
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  href="/privacy" 
                  className="rounded-lg border border-gray-200 bg-white p-4 hover:border-blue-300 hover:shadow-md transition-all dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-500"
                >
                  <p className="font-medium text-gray-900 dark:text-white">🔒 Kebijakan Privasi</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Bagaimana kami melindungi data Anda
                  </p>
                </Link>
                <Link 
                  href="/terms" 
                  className="rounded-lg border border-gray-200 bg-white p-4 hover:border-blue-300 hover:shadow-md transition-all dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-500"
                >
                  <p className="font-medium text-gray-900 dark:text-white">📜 Syarat & Ketentuan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Aturan penggunaan layanan
                  </p>
                </Link>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href="/" 
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              ← Kembali ke beranda
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
