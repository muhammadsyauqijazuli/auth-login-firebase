"use client";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { mapAuthError } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onClick() {
    setError(null); setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        router.replace("/dashboard");
      } catch (popupErr: any) {
        const msg = String(popupErr?.message || popupErr);
        const code = popupErr?.code as string | undefined;
        const shouldFallback =
          code === "auth/popup-blocked" ||
          code === "auth/cancelled-popup-request" ||
          msg.includes("Cross-Origin-Opener-Policy") ||
          msg.includes("window.closed") ||
          msg.includes("popup") ||
          msg.includes("COOP");
        if (shouldFallback) {
          await signInWithRedirect(auth, provider);
        } else {
          throw popupErr;
        }
      }
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={onClick} className="btn w-full" disabled={loading}>
        {loading ? "Memproses..." : "Masuk dengan Google"}
      </button>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
