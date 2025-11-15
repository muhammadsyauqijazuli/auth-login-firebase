export type PasswordStrength = "weak" | "medium" | "strong" | "very-strong";

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number;
  feedback: string;
  color: string;
  width: string;
}

export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return {
      strength: "weak",
      score: 0,
      feedback: "Masukkan password",
      color: "bg-gray-300",
      width: "0%",
    };
  }

  let score = 0;
  const checks = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  // Scoring
  if (checks.length) score += 20;
  if (password.length >= 12) score += 10;
  if (checks.hasUpper) score += 20;
  if (checks.hasLower) score += 20;
  if (checks.hasNumber) score += 15;
  if (checks.hasSpecial) score += 15;

  // Determine strength
  let strength: PasswordStrength;
  let feedback: string;
  let color: string;
  let width: string;

  if (score < 40) {
    strength = "weak";
    feedback = "Lemah - Tambahkan huruf besar, angka, dan simbol";
    color = "bg-red-500";
    width = "25%";
  } else if (score < 60) {
    strength = "medium";
    feedback = "Sedang - Tambahkan karakter spesial untuk lebih kuat";
    color = "bg-orange-500";
    width = "50%";
  } else if (score < 80) {
    strength = "strong";
    feedback = "Kuat - Password Anda cukup aman";
    color = "bg-yellow-500";
    width = "75%";
  } else {
    strength = "very-strong";
    feedback = "Sangat Kuat - Password Anda sangat aman!";
    color = "bg-green-500";
    width = "100%";
  }

  return { strength, score, feedback, color, width };
}
