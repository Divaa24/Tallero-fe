import Link from 'next/link';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar Navigasi */}
      <aside className="w-64 bg-tallero-navy text-white flex flex-col justify-between shadow-xl fixed h-screen z-20">
        <div>
          {/* Logo & Brand */}
          <div className="px-6 py-6 mb-4 border-b border-white/10 flex items-center gap-3">
            <i className="fa-solid fa-gear text-tallero-amber text-2xl animate-[spin_10s_linear_infinite]"></i>
            <div>
              <h1 className="text-xl font-extrabold tracking-wider text-tallero-sky">
                TALLERO
              </h1>
              <p className="text-[10px] text-tallero-yellow tracking-widest font-medium uppercase mt-0.5">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Menu Navigasi */}
          <nav className="space-y-1.5 px-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-tallero-teal transition-colors"
            >
              <i className="fa-solid fa-chart-pie w-5 text-center text-tallero-amber"></i> 
              Dashboard
            </Link>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-tallero-teal transition-colors"
            >
              <i className="fa-solid fa-clipboard-list w-5 text-center text-tallero-amber"></i> 
              Kelola Booking
            </Link>
            <Link
              href="/admin/services"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-tallero-teal transition-colors"
            >
              <i className="fa-solid fa-wrench w-5 text-center text-tallero-amber"></i> 
              Layanan Servis
            </Link>
            <Link
              href="/admin/outlets"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-tallero-teal transition-colors"
            >
              <i className="fa-solid fa-map-location-dot w-5 text-center text-tallero-amber"></i> 
              Outlet Bengkel
            </Link>
          </nav>
        </div>

        {/* Profil / Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="px-4 mb-4">
            <p className="text-xs text-gray-400">Login sebagai:</p>
            <p className="text-sm font-semibold text-white">Super Admin</p>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/20 transition-colors">
            <i className="fa-solid fa-right-from-bracket w-5 text-center"></i> 
            Keluar
          </button>
        </div>
      </aside>

      {/* Area Konten Utama (Berada di sebelah kanan Sidebar) */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
          <h2 className="text-lg font-bold text-tallero-navy">
            Sistem Manajemen Bengkel
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-green-700">API Terhubung</span>
            </div>
          </div>
        </header>

        {/* Isi Halaman (Otomatis berubah sesuai menu yang diklik) */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}