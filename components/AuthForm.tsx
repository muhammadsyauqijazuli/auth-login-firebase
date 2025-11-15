"use client";
import { useState } from "react";
import { z } from "zod";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { mapAuthError } from "@/lib/auth";
import { useRouter } from "next/navigation";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";

const base = {
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
};
const schemaLogin = z.object(base);
const schemaRegister = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Minimal 8 karakter untuk keamanan lebih baik"),
});

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    // Pilih skema sesuai mode dan normalisasi data input
    const data = mode === "register" ? { ...form, name: form.name.trim() } : { email: form.email.trim(), password: form.password };
    const parse = (mode === "register" ? schemaRegister : schemaLogin).safeParse(data as any);
    if (!parse.success) {
      setError(parse.error.issues[0]?.message ?? "Input tidak valid");
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
        if ((data as any).name) await updateProfile(cred.user, { displayName: (data as any).name });
        try { await sendEmailVerification(cred.user); } catch {}
      }
      router.replace("/dashboard");
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "register" && (
        <div>
          <label className="label">Nama</label>
          <input className="input" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} placeholder="Nama lengkap" />
        </div>
      )}
      <div>
        <label className="label">Email</label>
        <input className="input" type="email" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} placeholder="email@contoh.com" />
      </div>
      <div>
        <label className="label">Password</label>
        <input className="input" type="password" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })} placeholder="••••••" />
        {mode === "register" && <PasswordStrengthIndicator password={form.password} />}
      </div>
      <button className="btn w-full" type="submit" disabled={loading}>{loading ? "Memproses..." : (mode === "login" ? "Masuk" : "Daftar")}</button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
}
