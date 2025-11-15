export type PasswordStrength = "weak" | "medium" | "strong";

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number; // 0-100
  feedback: string;
  color: string;
}

export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  let score = 0;
  
  if (!password) {
    return {
      strength: "weak",
      score: 0,
      feedback: "Masukkan password",
      color: "bg-gray-300",
    };
  }

  // Length criteria
  if (password.length >= 6) score += 20;
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;

  // Complexity criteria
  if (/[a-z]/.test(password)) score += 15; // lowercase
  if (/[A-Z]/.test(password)) score += 15; // uppercase
  if (/[0-9]/.test(password)) score += 15; // numbers
  if (/[^a-zA-Z0-9]/.test(password)) score += 15; // special chars

  // Determine strength and feedback
  let strength: PasswordStrength;
  let feedback: string;
  let color: string;

  if (score < 40) {
    strength = "weak";
    feedback = "Lemah - Tambahkan huruf besar, angka, atau simbol";
    color = "bg-red-500";
  } else if (score < 70) {
    strength = "medium";
    feedback = "Sedang - Tambahkan lebih banyak variasi karakter";
    color = "bg-yellow-500";
  } else {
    strength = "strong";
    feedback = "Kuat - Password Anda sangat aman";
    color = "bg-green-500";
  }

  return { strength, score, feedback, color };
}
