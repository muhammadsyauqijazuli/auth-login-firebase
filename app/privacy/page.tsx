import Link from "next/link";

export default function PrivacyPage() {
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
            Kebijakan Privasi
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Informasi yang Kami Kumpulkan
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Authify mengumpulkan informasi berikut untuk menyediakan layanan autentikasi yang aman:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>Email dan password (dienkripsi dengan Firebase Authentication)</li>
                <li>Nama pengguna (opsional)</li>
                <li>Informasi profil dari Google Sign-In (jika Anda memilih metode ini)</li>
                <li>Data catatan yang Anda simpan di dashboard</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2. Bagaimana Kami Menggunakan Data Anda
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Data Anda digunakan untuk:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>Menyediakan akses ke akun Anda</li>
                <li>Menyimpan dan menampilkan catatan pribadi Anda</li>
                <li>Mengirim email verifikasi dan reset password</li>
                <li>Meningkatkan keamanan dan pengalaman pengguna</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Keamanan Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Kami menggunakan Firebase Authentication dan Firestore dengan security rules ketat 
                untuk melindungi data Anda. Password dienkripsi dan tidak pernah disimpan dalam bentuk plaintext.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Hak Anda
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Anda memiliki hak untuk:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>Mengakses dan mengubah data pribadi Anda</li>
                <li>Menghapus akun dan semua data terkait</li>
                <li>Meminta salinan data Anda</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                5. Kontak
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami di:{" "}
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
