"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

type ProtectedProps = {
  children: React.ReactNode;
  requireVerified?: boolean;
};

export default function Protected({ children, requireVerified = false }: ProtectedProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (requireVerified && !user.emailVerified) {
      router.replace("/verify-email");
    }
  }, [user, loading, router, requireVerified]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-gray-700 dark:text-gray-200">
          <LoadingSpinner size="lg" />
          <p>Sedang memuat sesi Anda…</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p>Mengalihkan ke login…</p>
      </main>
    );
  }

  if (requireVerified && !user.emailVerified) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p>Mengalihkan: email belum terverifikasi…</p>
      </main>
    );
  }

  return <>{children}</>;
}
