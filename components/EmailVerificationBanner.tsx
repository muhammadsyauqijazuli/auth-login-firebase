"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { sendEmailVerification } from "firebase/auth";

export default function EmailVerificationBanner() {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user || user.emailVerified) return null;

  async function handleResend() {
    setSending(true);
    setMessage(null);
    setError(null);
    
    try {
      await sendEmailVerification(user!);
      setMessage("Email verifikasi telah dikirim! Periksa inbox Anda.");
    } catch (err: any) {
      if (err.code === "auth/too-many-requests") {
        setError("Terlalu banyak permintaan. Coba lagi nanti.");
      } else {
        setError("Gagal mengirim email. Coba lagi.");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-4">
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📧</span>
            <div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                Email Belum Terverifikasi
              </h3>
              <p className="mt-1 text-sm text-orange-700 dark:text-orange-300">
                Verifikasi email Anda untuk mengakses semua fitur. Periksa inbox atau folder spam.
              </p>
              {message && (
                <p className="mt-2 text-sm font-medium text-green-700 dark:text-green-300">
                  ✓ {message}
                </p>
              )}
              {error && (
                <p className="mt-2 text-sm font-medium text-red-700 dark:text-red-300">
                  ✗ {error}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleResend}
            disabled={sending}
            className="btn whitespace-nowrap disabled:opacity-50"
          >
            {sending ? "Mengirim..." : "Kirim Ulang"}
          </button>
        </div>
      </div>
    </div>
  );
}
