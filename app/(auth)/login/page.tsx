"use client";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import GoogleButton from "@/components/GoogleButton";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/dashboard");
  }, [user, loading, router]);

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
                D
              </div>
              <span>Dzkra</span>
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Belum punya akun?{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Masuk ke Akun Anda
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Selamat datang kembali! Silakan masuk untuk melanjutkan.
              </p>
            </div>

            {/* Google Sign In */}
            <div className="mb-6">
              <GoogleButton />
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  atau lanjutkan dengan email
                </span>
              </div>
            </div>

            {/* Auth Form */}
            <AuthForm mode="login" />

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <Link 
                href="/reset" 
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Lupa password?
              </Link>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Belum punya akun?{" "}
              <Link 
                href="/register" 
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}