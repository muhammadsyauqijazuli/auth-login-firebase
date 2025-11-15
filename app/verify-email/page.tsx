"use client";
import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function VerifyEmailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner size="lg" />
          <p className="text-gray-700 dark:text-gray-200">Memuat...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  if (user.emailVerified) {
    router.replace("/dashboard");
    return null;
  }

  async function handleResend() {
    if (!user) return;
    setMessage(null);
    setError(null);
    setSending(true);

    try {
      await sendEmailVerification(user);
      setMessage("Email verifikasi berhasil dikirim! Periksa inbox Anda.");
    } catch (err: any) {
      if (err.code === "auth/too-many-requests") {
        setError("Terlalu banyak permintaan. Tunggu beberapa saat lalu coba lagi.");
      } else {
        setError("Gagal mengirim email. Coba lagi nanti.");
      }
    } finally {
      setSending(false);
    }
  }

  function handleReload() {
    window.location.reload();
  }

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
              Kembali ke login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <span className="text-3xl">📧</span>
            </div>

            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Verifikasi Email Anda
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Kami telah mengirim email verifikasi ke:
              </p>
              <p className="mt-2 font-medium text-blue-600 dark:text-blue-400">
                {user.email}
              </p>
            </div>

            {/* Instructions */}
            <div className="mb-6 space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Langkah-langkah:
              </h2>
              <ol className="list-inside list-decimal space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Buka inbox email Anda</li>
                <li>Cari email dari Firebase (periksa folder spam jika perlu)</li>
                <li>Klik link verifikasi di dalam email</li>
                <li>Kembali ke halaman ini dan klik "Saya Sudah Verifikasi"</li>
              </ol>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleReload}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Saya Sudah Verifikasi
              </button>

              <button
                onClick={handleResend}
                disabled={sending}
                className="w-full border border-gray-300 bg-white text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" />
                    Mengirim...
                  </span>
                ) : (
                  "Kirim Ulang Email Verifikasi"
                )}
              </button>
            </div>

            {/* Messages */}
            {message && (
              <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <p className="text-sm text-green-800 dark:text-green-200">{message}</p>
              </div>
            )}
            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                💡 <strong>Tips:</strong> Email verifikasi biasanya tiba dalam beberapa menit. 
                Jika tidak menerima, periksa folder spam atau kirim ulang email verifikasi.
              </p>
            </div>
          </div>

          {/* Bottom Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/login" 
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              ← Kembali ke halaman login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
