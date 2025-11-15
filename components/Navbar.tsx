"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const displayName = user?.displayName || user?.email || "Pengguna";
  const initials = displayName.split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()).join("");

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
              A
            </div>
            <span>Note With Auth</span>
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user && (
              <>
                {/* Desktop View */}
                <div className="hidden md:flex md:items-center md:gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.emailVerified ? "Terverifikasi" : "Belum diverifikasi"}
                    </p>
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {initials}
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user.displayName || user.email}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => {
                            signOut(auth);
                            setIsDropdownOpen(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                          <span className="mr-2">🚪</span>
                          Keluar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile View */}
                <div className="flex md:hidden items-center gap-3">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium"
                  >
                    {initials}
                  </button>
                </div>

                {/* Mobile Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute inset-x-0 top-16 md:hidden">
                    <div className="mx-4 rounded-lg bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.displayName || user.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                        <p className="text-xs mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full ${user.emailVerified ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'}`}>
                            {user.emailVerified ? '✓ Terverifikasi' : '✗ Belum diverifikasi'}
                          </span>
                        </p>
                      </div>
                      
                      <button
                        onClick={() => {
                          signOut(auth);
                          setIsDropdownOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <span className="mr-3">🚪</span>
                        Keluar dari Akun
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay untuk mobile dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
}