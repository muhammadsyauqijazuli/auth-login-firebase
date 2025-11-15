"use client";
import { calculatePasswordStrength, type PasswordStrengthResult } from "@/lib/passwordStrength";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const result: PasswordStrengthResult = calculatePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Progress Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full transition-all duration-300 ${result.color}`}
          style={{ width: result.width }}
        />
      </div>

      {/* Feedback Text */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {result.feedback}
        </p>
        <span className={`text-xs font-medium ${
          result.strength === "weak" ? "text-red-600" :
          result.strength === "medium" ? "text-orange-600" :
          result.strength === "strong" ? "text-yellow-600" :
          "text-green-600"
        }`}>
          {result.strength === "weak" ? "Lemah" :
           result.strength === "medium" ? "Sedang" :
           result.strength === "strong" ? "Kuat" :
           "Sangat Kuat"}
        </span>
      </div>

      {/* Requirements Checklist */}
      <div className="mt-3 space-y-1 text-xs">
        <RequirementItem met={password.length >= 8} text="Minimal 8 karakter" />
        <RequirementItem met={/[A-Z]/.test(password)} text="Huruf besar (A-Z)" />
        <RequirementItem met={/[a-z]/.test(password)} text="Huruf kecil (a-z)" />
        <RequirementItem met={/\d/.test(password)} text="Angka (0-9)" />
        <RequirementItem met={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)} text="Karakter spesial (!@#$...)" />
      </div>
    </div>
  );
}

function RequirementItem({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`${met ? "text-green-600" : "text-gray-400"}`}>
        {met ? "✓" : "○"}
      </span>
      <span className={`${met ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
        {text}
      </span>
    </div>
  );
}
