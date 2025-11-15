import Link from "next/link";

export default function TermsPage() {
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
          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Syarat & Ketentuan
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Penerimaan Ketentuan
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Dengan menggunakan Authify, Anda setuju untuk terikat dengan syarat dan ketentuan ini. 
                Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, mohon jangan gunakan layanan kami.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2. Penggunaan Layanan
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Anda setuju untuk:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-1">
                <li>Memberikan informasi yang akurat dan lengkap saat mendaftar</li>
                <li>Menjaga kerahasiaan password dan informasi akun Anda</li>
                <li>Tidak menggunakan layanan untuk tujuan ilegal atau tidak sah</li>
                <li>Tidak mencoba mengakses akun pengguna lain tanpa izin</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Akun Pengguna
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Anda bertanggung jawab penuh atas aktivitas yang terjadi di akun Anda. 
                Harap segera laporkan kepada kami jika Anda mencurigai adanya penggunaan tidak sah.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Konten Pengguna
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Anda mempertahankan hak kepemilikan atas konten yang Anda simpan di Authify. 
                Namun, kami berhak menghapus konten yang melanggar ketentuan ini atau hukum yang berlaku.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                5. Batasan Tanggung Jawab
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Authify disediakan "sebagaimana adanya" tanpa jaminan apa pun. Kami tidak bertanggung jawab 
                atas kehilangan data, gangguan layanan, atau kerugian lainnya yang mungkin terjadi.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                6. Perubahan Ketentuan
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Kami berhak mengubah ketentuan ini kapan saja. Perubahan akan efektif setelah diposting di halaman ini. 
                Penggunaan layanan yang berkelanjutan setelah perubahan berarti Anda menerima ketentuan yang diperbarui.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                7. Kontak
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, hubungi kami di:{" "}
                <a href="mailto:support@authify.com" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  support@authify.com
                </a>
              </p>
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
