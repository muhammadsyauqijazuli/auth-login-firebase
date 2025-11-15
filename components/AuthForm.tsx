"use client";
import { useState } from "react";
import { z } from "zod";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { mapAuthError } from "@/lib/auth";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import { calculatePasswordStrength } from "@/lib/passwordStrength";

const base = {
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
};
const schemaLogin = z.object(base);
const schemaRegister = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  ...base,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const passwordStrength = mode === "register" ? calculatePasswordStrength(form.password) : null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    
    // Mark all fields as touched
    if (mode === "register") {
      setTouched({ name: true, email: true, password: true, confirmPassword: true });
    } else {
      setTouched({ email: true, password: true });
    }
    
    // Normalize and validate
    const data = mode === "register" 
      ? { ...form, name: form.name.trim(), email: form.email.trim() }
      : { email: form.email.trim(), password: form.password };
    
    const parse = (mode === "register" ? schemaRegister : schemaLogin).safeParse(data as any);
    if (!parse.success) {
      const errors: FieldErrors = {};
      parse.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        if (field) errors[field] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }
    
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        router.replace("/dashboard");
      } else {
        const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
        if ((data as any).name) await updateProfile(cred.user, { displayName: (data as any).name });
        try { 
          await sendEmailVerification(cred.user); 
          router.replace("/verify-email");
        } catch {
          router.replace("/dashboard");
        }
      }
    } catch (err) {
      setFieldErrors({ email: mapAuthError(err) });
    } finally {
      setLoading(false);
    }
  }

  function handleBlur(field: string) {
    setTouched({ ...touched, [field]: true });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "register" && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nama
          </label>
          <input
            id="name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={() => handleBlur("name")}
            placeholder="Nama lengkap"
          />
          {touched.name && fieldErrors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.name}</p>
          )}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onBlur={() => handleBlur("email")}
          placeholder="email@contoh.com"
        />
        {touched.email && fieldErrors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.email}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onBlur={() => handleBlur("password")}
          placeholder="••••••"
        />
        {touched.password && fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.password}</p>
        )}
        
        {/* Password Strength Indicator (register only) */}
        {mode === "register" && form.password && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-600">
                <div 
                  className={`h-full transition-all duration-300 ${passwordStrength?.color}`}
                  style={{ width: `${passwordStrength?.score}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {passwordStrength?.strength === "weak" && "Lemah"}
                {passwordStrength?.strength === "medium" && "Sedang"}
                {passwordStrength?.strength === "strong" && "Kuat"}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {passwordStrength?.feedback}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              💡 Gunakan huruf besar, kecil, angka, dan simbol
            </p>
          </div>
        )}
      </div>
      
      {mode === "register" && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Konfirmasi Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            onBlur={() => handleBlur("confirmPassword")}
            placeholder="••••••"
          />
          {touched.confirmPassword && fieldErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.confirmPassword}</p>
          )}
        </div>
      )}
      
      <button
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        type="submit"
        disabled={loading}
      >
        {loading && <LoadingSpinner size="sm" />}
        {loading ? "Memproses..." : (mode === "login" ? "Masuk" : "Daftar")}
      </button>
    </form>
  );
}
