"use client";
import { useState } from "react";
import { z } from "zod";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { mapAuthError } from "@/lib/auth";
import { useRouter } from "next/navigation";

const base = {
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
};
const schemaLogin = z.object(base);
const schemaRegister = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  ...base,
});

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function validateField(field: string, value: string) {
    const schema = mode === "register" ? schemaRegister : schemaLogin;
    try {
      schema.pick({ [field]: true } as any).parse({ [field]: value });
      setFieldErrors(prev => ({ ...prev, [field]: "" }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setFieldErrors(prev => ({ ...prev, [field]: err.errors[0]?.message || "" }));
      }
    }
  }

  function handleBlur(field: string) {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, form[field as keyof typeof form]);
  }

  function handleChange(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  }

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
          <label htmlFor="name" className="label">Nama</label>
          <input
            id="name"
            className={`input ${touched.name && fieldErrors.name ? "border-red-500 focus:ring-red-200" : ""}`}
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder="Nama lengkap"
          />
          {touched.name && fieldErrors.name && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.name}</p>
          )}
        </div>
      )}
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input
          id="email"
          type="email"
          className={`input ${touched.email && fieldErrors.email ? "border-red-500 focus:ring-red-200" : ""}`}
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="email@contoh.com"
        />
        {touched.email && fieldErrors.email && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="label">Password</label>
        <input
          id="password"
          type="password"
          className={`input ${touched.password && fieldErrors.password ? "border-red-500 focus:ring-red-200" : ""}`}
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          placeholder="••••••"
        />
        {touched.password && fieldErrors.password && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{fieldErrors.password}</p>
        )}
      </div>
      <button className="btn w-full" type="submit" disabled={loading}>{loading ? "Memproses..." : (mode === "login" ? "Masuk" : "Daftar")}</button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
}
