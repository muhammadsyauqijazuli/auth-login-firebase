"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
  }, [user, loading, router]);

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <p>Memverifikasi sesi...</p>
      </main>
    );
  }

  return <>{children}</>;
}
