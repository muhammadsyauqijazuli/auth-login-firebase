// Reset Password Page - /app/reset/page.tsx
"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { mapAuthError } from "@/lib/auth";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingReset, setLoadingReset] = useState(false);
  
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/dashboard");
  }, [user, loading, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); 
    setError(null); 
    setLoadingReset(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Email reset password telah dikirim. Silakan periksa inbox email Anda.");
    } catch (err: any) {
      setError(mapAuthError(err));
    } finally {
      setLoadingReset(false);
    }
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
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Kembali ke login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="animate-slide-up rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
            {/* Header */}
            <div className="mb-8 text-center animate-fade-in">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4 animate-bounce-subtle">
                <span className="text-xl">🔐</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Reset Password
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Masukkan email Anda untuk menerima tautan reset password.
              </p>
            </div>

            {/* Reset Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input 
                  id="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  placeholder="email@contoh.com" 
                />
              </div>
              
              <button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                disabled={loadingReset || !email.trim() || !isEmailValid} 
                type="submit"
              >
                {loadingReset ? "Mengirim..." : "Kirim Email Reset"}
              </button>
              
              {/* Messages */}
              {msg && (
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <p className="text-sm text-green-800 dark:text-green-200">{msg}</p>
                </div>
              )}
              {error && (
                <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
            </form>

            {/* Additional Info */}
            <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                💡 Pastikan email yang Anda masukkan sudah benar. Jika tidak menerima email, periksa folder spam.
              </p>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ingat password Anda?{" "}
              <Link 
                href="/login" 
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}