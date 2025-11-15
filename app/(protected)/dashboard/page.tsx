"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Protected from "@/components/Protected";
import { addDoc, collection, onSnapshot, query, serverTimestamp, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  type Note = { id: string; text?: string; uid?: string; createdAt?: any };
  const [items, setItems] = useState<Note[]>([]);
  const MAX_NOTE_LENGTH = 500;

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const arr: Note[] = snap.docs.map((d) => ({ 
        id: d.id, 
        ...d.data() 
      }));
      setItems(arr);
    });
    return () => unsub();
  }, [user]);

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !text.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        text: text.trim(),
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      setText("");
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(noteId: string) {
    if (!user) return;
    
    const confirmed = window.confirm("Yakin ingin menghapus catatan ini?");
    if (!confirmed) return;
    
    try {
      await deleteDoc(doc(db, "notes", noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  const displayName = user?.displayName || user?.email || "Pengguna";
  const initials = displayName.split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()).join("");

  return (
    <Protected requireVerified>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-xl font-bold text-white shadow-lg">
                  {initials || "U"}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Selamat datang, {displayName}!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Senang bertemu lagi. Mari kelola catatan Anda.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  {user?.emailVerified ? "✓ Email Terverifikasi" : "✗ Email Belum Diverifikasi"}
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Quick Actions */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Catatan</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{items.length}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-green-100 p-3 dark:bg-green-900">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Aktif</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900">
                  <span className="text-2xl">🕒</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sesi</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Online</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-orange-100 p-3 dark:bg-orange-900">
                  <span className="text-2xl">🔐</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Provider</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Firebase</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Notes Section */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white shadow-sm dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Catatan Saya</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Kelola dan buat catatan baru
                  </p>
                </div>
                
                {/* Add Note Form */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <form onSubmit={addNote} className="space-y-4">
                    <div>
                      <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Catatan Baru
                      </label>
                      <textarea
                        id="note"
                        rows={3}
                        maxLength={MAX_NOTE_LENGTH}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Tulis catatan Anda di sini..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                      <div className="mt-1 flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          💡 Max {MAX_NOTE_LENGTH} karakter
                        </span>
                        <span className={`${text.length > MAX_NOTE_LENGTH * 0.9 ? 'text-orange-600 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                          {text.length}/{MAX_NOTE_LENGTH}
                        </span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !text.trim() || text.length > MAX_NOTE_LENGTH}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? "Menambah..." : "Tambah Catatan"}
                    </button>
                  </form>
                </div>

                {/* Notes List */}
                <div className="p-6">
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Belum ada catatan
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Mulai dengan menambahkan catatan pertama Anda di atas.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((note) => (
                        <div
                          key={note.id}
                          className="group rounded-xl border border-gray-200 bg-gray-50 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 dark:border-gray-600 dark:bg-gray-700"
                        >
                          <div className="flex items-start justify-between">
                            <p className="text-gray-800 dark:text-gray-200 flex-1">
                              {note.text}
                            </p>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="ml-4 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity duration-200 p-1 rounded"
                              title="Hapus catatan"
                            >
                              🗑️
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>UID: {note.uid}</span>
                            <span>
                              {note.createdAt?.toDate?.()?.toLocaleDateString('id-ID') || 'Baru saja'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="rounded-2xl bg-white shadow-sm dark:bg-gray-800">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Profil Anda
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Nama/Email</p>
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {user?.displayName || user?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Status Verifikasi</p>
                      <p className={`font-medium ${user?.emailVerified ? 'text-green-600' : 'text-orange-600'}`}>
                        {user?.emailVerified ? "Terverifikasi" : "Belum Diverifikasi"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">User ID</p>
                      <p className="font-mono text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.uid}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Ringkasan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Catatan Aktif</span>
                    <span className="font-bold">{items.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Akun Status</span>
                    <span className="font-bold">Aktif</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Penyimpanan</span>
                    <span className="font-bold">Firestore</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Protected>
  );
}