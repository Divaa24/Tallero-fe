'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* 1. NAVBAR */}
      <nav className="bg-tallero-navy text-white px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-gear text-tallero-amber text-2xl animate-[spin_10s_linear_infinite]"></i>
          <span className="text-xl font-extrabold tracking-widest text-tallero-sky">
            TALLERO
          </span>
        </div>

        {/* Menu Tengah (Desktop) */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link href="#beranda" className="hover:text-white transition-colors">Beranda</Link>
          <Link href="#layanan" className="hover:text-white transition-colors">Layanan Servis</Link>
          <Link href="#keunggulan" className="hover:text-white transition-colors">Keunggulan</Link>
          <Link href="#kontak" className="hover:text-white transition-colors">Kontak</Link>
        </div>

        {/* Tombol Login / Register */}
        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="hidden md:block px-5 py-2 text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            Masuk
          </Link>
          <Link 
            href="/register" 
            className="px-5 py-2 text-sm font-bold text-tallero-navy bg-tallero-amber rounded-full hover:bg-tallero-orange transition-colors"
          >
            Booking Sekarang
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION (Mirip bagian atas gambar, tapi nuansa Navy/Teal) */}
      <header id="beranda" className="relative bg-gradient-to-r from-tallero-navy to-[#012a3d] text-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
           <i className="fa-solid fa-car text-[400px]"></i>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-tallero-amber font-bold tracking-widest text-sm uppercase mb-4">
            Teknologi & Mekanik Handal
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            RAWAT KENDARAANMU <br/>
            <span className="text-tallero-sky">LEBIH MUDAH & CEPAT</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-lg">
            Sistem booking servis bengkel terpadu. Pilih layanan, tentukan jadwal, dan pantau status pengerjaan langsung dari HP kamu.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-tallero-amber text-tallero-navy font-bold rounded-full hover:bg-tallero-orange transition-transform hover:scale-105 shadow-lg"
            >
              Buat Booking
            </Link>
            <Link 
              href="#layanan" 
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Lihat Layanan
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HIGHLIGHT FITUR / KEUNGGULAN (Mirip deretan icon di gambar) */}
      <section id="keunggulan" className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-tallero-sky/20 text-tallero-teal flex items-center justify-center shrink-0">
              <i className="fa-regular fa-calendar-check text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold text-tallero-navy mb-1">Booking Tanpa Antre</h3>
              <p className="text-sm text-gray-500">Pilih jadwal servis dari mana saja, tidak perlu menunggu lama di bengkel.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-tallero-sky/20 text-tallero-teal flex items-center justify-center shrink-0">
              <i className="fa-solid fa-magnifying-glass-location text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold text-tallero-navy mb-1">Live Tracking Status</h3>
              <p className="text-sm text-gray-500">Pantau proses servis kendaraanmu (Menunggu, Diproses, Selesai) secara real-time.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-tallero-sky/20 text-tallero-teal flex items-center justify-center shrink-0">
              <i className="fa-solid fa-medal text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold text-tallero-navy mb-1">Mekanik Tersertifikasi</h3>
              <p className="text-sm text-gray-500">Ditangani oleh tenaga ahli profesional dengan suku cadang berkualitas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LAYANAN BENGKEL (Menggantikan bagian "Best Seller Parts" di gambar) */}
      <section id="layanan" className="py-20 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-tallero-navy uppercase mb-3">
            Layanan Servis Utama
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Berbagai jenis perawatan untuk menjaga performa mesin dan kenyamanan berkendara Anda.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card Layanan 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-tallero-sky/20 transition-colors">
              <i className="fa-solid fa-oil-can text-3xl text-gray-400 group-hover:text-tallero-teal"></i>
            </div>
            <h3 className="font-bold text-lg text-tallero-navy mb-2">Ganti Oli & Filter</h3>
            <p className="text-sm text-gray-500 mb-4">Perawatan rutin penggantian pelumas agar mesin tetap awet.</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xs font-bold text-tallero-amber">Estimasi 30 Menit</span>
            </div>
          </div>

          {/* Card Layanan 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-tallero-sky/20 transition-colors">
              <i className="fa-solid fa-wrench text-3xl text-gray-400 group-hover:text-tallero-teal"></i>
            </div>
            <h3 className="font-bold text-lg text-tallero-navy mb-2">Tune Up Mesin</h3>
            <p className="text-sm text-gray-500 mb-4">Pembersihan ruang bakar dan penyetelan ulang performa.</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xs font-bold text-tallero-amber">Estimasi 60 Menit</span>
            </div>
          </div>

          {/* Card Layanan 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-tallero-sky/20 transition-colors">
              <i className="fa-solid fa-car-burst text-3xl text-gray-400 group-hover:text-tallero-teal"></i>
            </div>
            <h3 className="font-bold text-lg text-tallero-navy mb-2">Cek Rem & Kaki-kaki</h3>
            <p className="text-sm text-gray-500 mb-4">Pengecekan kampas rem, suspensi, dan spooring balancing.</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xs font-bold text-tallero-amber">Estimasi 45 Menit</span>
            </div>
          </div>

          {/* Card Layanan 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-tallero-sky/20 transition-colors">
              <i className="fa-solid fa-snowflake text-3xl text-gray-400 group-hover:text-tallero-teal"></i>
            </div>
            <h3 className="font-bold text-lg text-tallero-navy mb-2">Servis AC & Kelistrikan</h3>
            <p className="text-sm text-gray-500 mb-4">Pengisian freon, cek kompresor, dan jalur kelistrikan aki.</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xs font-bold text-tallero-amber">Estimasi 90 Menit</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNERS (Adaptasi dari banner diskon di gambar) */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-tallero-teal to-tallero-navy rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-center min-h-[200px]">
            <i className="fa-solid fa-mobile-screen absolute -right-4 -bottom-8 text-[150px] opacity-20"></i>
            <div className="relative z-10">
              <span className="bg-tallero-amber text-tallero-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                Tersedia Segera
              </span>
              <h3 className="text-2xl font-bold mb-2">Download Aplikasi Mobile</h3>
              <p className="text-tallero-sky text-sm max-w-xs mb-6">Booking servis lebih gampang langsung dari genggaman tanganmu.</p>
              <button className="px-5 py-2 border border-white/30 rounded-lg text-sm hover:bg-white/10 transition-colors">
                Cari Tahu Lebih Lanjut
              </button>
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200 relative overflow-hidden flex flex-col justify-center min-h-[200px]">
            <i className="fa-solid fa-map-location-dot absolute -right-4 -bottom-8 text-[150px] text-gray-200"></i>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-tallero-navy mb-2">Cari Outlet Terdekat</h3>
              <p className="text-gray-500 text-sm max-w-xs mb-6">Temukan cabang Tallero Service yang paling dekat dengan lokasimu saat ini.</p>
              <Link href="/register" className="px-5 py-2 bg-tallero-navy text-white rounded-lg text-sm hover:bg-tallero-teal transition-colors">
                Lihat Peta Outlet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer id="kontak" className="bg-[#0b171c] text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Footer Logo */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-gear text-tallero-amber text-xl"></i>
              <span className="text-lg font-extrabold tracking-widest text-tallero-sky">
                TALLERO
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-6">
              Sistem manajemen dan booking bengkel terpercaya untuk kemudahan perawatan kendaraan Anda.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-tallero-amber hover:text-tallero-navy transition-colors">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-tallero-amber hover:text-tallero-navy transition-colors">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-tallero-amber hover:text-tallero-navy transition-colors">
                <i className="fa-brands fa-twitter text-sm"></i>
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Informasi</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-tallero-sky transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-tallero-sky transition-colors">Karir Mekanik</a></li>
              <li><a href="#" className="hover:text-tallero-sky transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-tallero-sky transition-colors">Cara Booking</a></li>
              <li><a href="#" className="hover:text-tallero-sky transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-tallero-sky transition-colors">Pusat Bantuan</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Lokasi Pusat</h4>
            <address className="not-italic text-sm space-y-3">
              <p><i className="fa-solid fa-location-dot mr-2 text-tallero-amber"></i> Jl. Raya Bengkel No. 123, Jakarta</p>
              <p><i className="fa-solid fa-envelope mr-2 text-tallero-amber"></i> info@tallero.com</p>
              <p><i className="fa-solid fa-phone mr-2 text-tallero-amber"></i> 0812-3456-7890</p>
            </address>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-gray-800 text-center text-xs">
          <p>Copyright © 2026 Tallero Services. All Right Reserved.</p>
        </div>
      </footer>
    </div>
  );
}