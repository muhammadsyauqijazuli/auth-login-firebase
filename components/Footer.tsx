// Footer Component - /components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-r from-blue-500 to-purple-600 text-xs text-white">
                A
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">Authify</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="/support" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Bantuan
              </Link>
              <a href="mailto:support@dzkra.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Kontak
              </a>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Authify. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}