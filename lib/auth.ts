import { AuthError } from "firebase/auth";

export function mapAuthError(err: unknown): string {
  const code = (err as AuthError)?.code ?? "";
  switch (code) {
    case "auth/invalid-email":
      return "Email tidak valid.";
    case "auth/user-disabled":
      return "Akun dinonaktifkan.";
    case "auth/user-not-found":
      return "Pengguna tidak ditemukan.";
    case "auth/wrong-password":
      return "Password salah.";
    case "auth/email-already-in-use":
      return "Email sudah terpakai.";
    case "auth/weak-password":
      return "Password terlalu lemah (min 6 karakter).";
    case "auth/popup-closed-by-user":
      return "Jendela login ditutup.";
    default:
      return "Terjadi kesalahan. Coba lagi.";
  }
}
