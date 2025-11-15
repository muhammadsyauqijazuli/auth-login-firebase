import { AuthError } from "firebase/auth";

export function mapAuthError(err: unknown): string {
  const code = (err as AuthError)?.code ?? "";
  const message = (err as Error)?.message ?? "";
  
  switch (code) {
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/user-disabled":
      return "Akun Anda telah dinonaktifkan. Hubungi support.";
    case "auth/user-not-found":
      return "Akun tidak ditemukan. Silakan daftar terlebih dahulu.";
    case "auth/wrong-password":
      return "Password salah. Silakan coba lagi.";
    case "auth/invalid-credential":
      return "Email atau password salah.";
    case "auth/email-already-in-use":
      return "Email sudah terdaftar. Silakan login atau gunakan email lain.";
    case "auth/weak-password":
      return "Password terlalu lemah. Gunakan minimal 6 karakter.";
    case "auth/operation-not-allowed":
      return "Metode login ini tidak diaktifkan.";
    case "auth/popup-closed-by-user":
      return "Jendela login ditutup. Silakan coba lagi.";
    case "auth/popup-blocked":
      return "Pop-up diblokir. Izinkan pop-up untuk login dengan Google.";
    case "auth/cancelled-popup-request":
      return "Login dibatalkan.";
    case "auth/network-request-failed":
      return "Koneksi internet bermasalah. Periksa koneksi Anda.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Coba lagi nanti.";
    case "auth/requires-recent-login":
      return "Silakan login ulang untuk melanjutkan.";
    default:
      if (message.includes("network") || message.includes("fetch")) {
        return "Gagal terhubung ke server. Periksa koneksi internet Anda.";
      }
      return "Terjadi kesalahan. Silakan coba lagi.";
  }
}
