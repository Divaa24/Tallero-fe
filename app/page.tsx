'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ServicePackage {
  id: string;
  badge?: string;
  category: string;
  title: string;
  price: string;
  duration: string;
  mileage: string;
  warranty: string;
  partType: string;
  image: string;
}

const servicePackages: ServicePackage[] = [
  {
    id: 'srv-1',
    badge: 'TERLARIS',
    category: 'Perawatan Rutin',
    title: 'Servis Berkala & Tune Up 3D',
    price: 'Rp 550.000',
    duration: '± 90 Menit',
    mileage: '10.000 KM',
    warranty: 'Garansi 14 Hari',
    partType: 'Scan OBD2',
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-2',
    category: 'Perawatan Rutin',
    title: 'Ganti Oli Sintetik & Filter',
    price: 'Rp 350.000',
    duration: '± 30 Menit',
    mileage: '5.000 KM',
    warranty: 'Oli Original',
    partType: 'Cek 15 Titik',
    image:
      'https://images.unsplash.com/photo-1635773054018-22c38833e134?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-3',
    category: 'Kaki-Kaki',
    title: 'Spooring 3D, Balancing & Rem',
    price: 'Rp 250.000',
    duration: '± 45 Menit',
    mileage: '4 Roda',
    warranty: 'Kalibrasi 3D',
    partType: 'Cek Kampas',
    image:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-4',
    category: 'AC & Aki',
    title: 'Flushing AC & Cek Kelistrikan',
    price: 'Rp 320.000',
    duration: '± 60 Menit',
    mileage: 'Freon R134a',
    warranty: 'Tes Aki',
    partType: 'Filter Kabin',
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-5',
    category: 'Mesin',
    title: 'Overhaul Ringan & Ganti Kopling',
    price: 'Rp 1.250.000',
    duration: '± 4 Jam',
    mileage: 'Part OEM',
    warranty: 'Garansi 30 Hari',
    partType: 'Test Drive',
    image:
      'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-6',
    category: 'AC & Aki',
    title: 'Penggantian Aki & Cek Alternator',
    price: 'Rp 780.000',
    duration: '± 25 Menit',
    mileage: 'Aki Kering',
    warranty: 'Garansi 12 Bln',
    partType: 'Gratis Pasang',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
  },
];

const filterTabs = ['Semua', 'Perawatan Rutin', 'Kaki-Kaki', 'AC & Aki', 'Mesin'];

const carBrands = ['TOYOTA', 'HONDA', 'MITSUBISHI', 'SUZUKI', 'DAIHATSU', 'HYUNDAI'];

const testimonials = [
  {
    name: 'Rendra Pratama',
    car: 'Toyota Innova Reborn',
    comment:
      'Booking jam 10 pagi lewat web, sampai lokasi langsung masuk Pit 1 tanpa nunggu lama. Estimasi biaya dari awal sampai selesai sesuai nota.',
  },
  {
    name: 'Nadia Kusuma',
    car: 'Honda HR-V',
    comment:
      'Mekaniknya komunikatif dan nunjukin langsung kondisi kampas rem sebelum diganti. Ruang tunggunya bersih dan progres servis bisa dipantau.',
  },
  {
    name: 'Fajar Nugroho',
    car: 'Mitsubishi Pajero Sport',
    comment:
      'Spooring 3D dan tune up di cabang Depok hasilnya berasa banget, setir kembali lurus dan tarikan mesin jauh lebih enteng.',
  },
];

const workshopArticles = [
  {
    date: '12 Nov 2026',
    title: 'Tanda Kampas Rem Mulai Menipis dan Kapan Harus Diganti',
    excerpt:
      'Kenali bunyi decit halus serta perubahan jarak pengereman agar keselamatan berkendara tetap terjaga.',
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80',
  },
  {
    date: '08 Nov 2026',
    title: 'Pentingnya Spooring & Balancing Setiap 10.000 Kilometer',
    excerpt:
      'Sudut roda yang bergeser membuat ban cepat habis sebelah dan setir terasa bergetar di kecepatan tinggi.',
    image:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
  },
  {
    date: '03 Nov 2026',
    title: 'Tips Memilih Viskositas Oli Mesin Sesuai Usia Kendaraan',
    excerpt:
      'Panduan praktis membaca kode SAE pada kemasan oli agar pelumasan komponen mesin bekerja optimal.',
    image:
      'https://images.unsplash.com/photo-1635773054018-22c38833e134?auto=format&fit=crop&w=600&q=80',
  },
];

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-2">
      <span className="w-5 h-[2px] bg-tallero-teal rounded-full"></span>
      <span className="w-2 h-2 rounded-full bg-tallero-amber"></span>
      <span className="w-5 h-[2px] bg-tallero-teal rounded-full"></span>
    </div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Semua');
  const [savedIds, setSavedIds] = useState<string[]>(['srv-1']);
  const [selectedBranch, setSelectedBranch] = useState('Cabang Utama Depok');
  const [selectedService, setSelectedService] = useState('Servis Berkala & Tune Up 3D');
  const [selectedDate, setSelectedDate] = useState('2026-11-16');

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const visiblePackages =
    activeTab === 'Semua'
      ? servicePackages.slice(0, 3)
      : servicePackages.filter((item) => item.category === activeTab);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#012436] text-slate-300 text-[11px] py-2 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-envelope text-tallero-amber"></i>
              layanan@tallero.id
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-phone text-tallero-amber"></i>
              021-77889900
            </span>
          </div>
          <div className="flex items-center gap-3.5 text-slate-300">
            <a href="#kontak" aria-label="Facebook" className="hover:text-tallero-sky transition-colors">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#kontak" aria-label="Instagram" className="hover:text-tallero-sky transition-colors">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#kontak" aria-label="WhatsApp" className="hover:text-tallero-sky transition-colors">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className="bg-white px-6 py-3.5 sticky top-0 z-50 border-b border-slate-100 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="#beranda" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-tallero-navy text-tallero-amber flex items-center justify-center">
              <i className="fa-solid fa-gear text-sm"></i>
            </div>
            <span className="text-lg font-bold tracking-tight text-tallero-navy">
              TALLERO<span className="text-tallero-amber">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600">
            <Link href="#beranda" className="text-tallero-navy font-semibold">
              Beranda
            </Link>
            <Link href="#tentang" className="hover:text-tallero-navy transition-colors">
              Tentang Kami
            </Link>
            <Link href="#layanan" className="hover:text-tallero-navy transition-colors">
              Paket Servis
            </Link>
            <Link href="#keunggulan" className="hover:text-tallero-navy transition-colors">
              Keunggulan
            </Link>
            <Link href="#artikel" className="hover:text-tallero-navy transition-colors">
              Artikel
            </Link>
            <Link href="#kontak" className="hover:text-tallero-navy transition-colors">
              Kontak
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-medium text-slate-600 hover:text-tallero-navy transition-colors px-2 py-1.5"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Booking Servis
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-tallero-navy"
            aria-label="Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2.5 text-xs font-medium text-slate-700">
            <Link href="#beranda" onClick={() => setMobileMenuOpen(false)} className="py-1">Beranda</Link>
            <Link href="#tentang" onClick={() => setMobileMenuOpen(false)} className="py-1">Tentang Kami</Link>
            <Link href="#layanan" onClick={() => setMobileMenuOpen(false)} className="py-1">Paket Servis</Link>
            <Link href="#keunggulan" onClick={() => setMobileMenuOpen(false)} className="py-1">Keunggulan</Link>
            <Link href="#kontak" onClick={() => setMobileMenuOpen(false)} className="py-1">Kontak</Link>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1 text-center py-2 border border-slate-200 rounded-lg">
                Masuk
              </Link>
              <Link href="/register" className="flex-1 text-center py-2 bg-tallero-navy text-white rounded-lg font-semibold">
                Booking Servis
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION (Layout Persis Satos dengan Nuansa Sky-Navy-Teal) */}
      <header
        id="beranda"
        className="relative bg-gradient-to-br from-[#f4f9fc] via-[#eef6fa] to-[#e1eff6] pt-10 pb-20 px-6 overflow-hidden"
      >
        {/* Watermark Teks Tipis di Latar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[90px] sm:text-[140px] font-bold text-tallero-sky/25 tracking-widest uppercase pointer-events-none select-none leading-none">
          TALLERO
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Kiri */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-tallero-amber"></span>
              <span className="text-[11px] font-semibold text-tallero-teal uppercase tracking-wider">
                Selamat Datang di Tallero
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-tallero-navy leading-tight tracking-tight">
              Servis Berkala &amp; Perawatan Mobil Terjadwal
            </h1>

            <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed max-w-md">
              Pesan jadwal servis kendaraanmu secara online tanpa antre lama, dapatkan rincian estimasi biaya transparan, dan ditangani langsung oleh mekanik bersertifikat.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-bold text-xs transition-colors shadow-sm"
              >
                Jadwalkan Servis
              </Link>
              <Link
                href="#layanan"
                className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-tallero-navy border border-slate-200 font-semibold text-xs transition-colors"
              >
                Lihat Paket Servis
              </Link>
            </div>
          </div>

          {/* Kanan: Visual Mobil */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=85"
                alt="Perawatan Kendaraan Tallero Auto Service"
                className="w-full h-[240px] sm:h-[290px] object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* 4. FLOATING PILL BOOKING BAR */}
        <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg border border-slate-200/80 p-3.5 md:px-6 md:py-4 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="px-2">
              <label className="block text-[10px] font-semibold text-tallero-teal uppercase mb-1">
                Pilih Cabang Bengkel
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                aria-label="Pilih Cabang Bengkel"
                className="w-full text-xs font-semibold text-tallero-navy bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Cabang Utama Depok">Cabang Utama Depok</option>
                <option value="Cabang Bogor City">Cabang Bogor City</option>
                <option value="Cabang Jakarta Selatan">Cabang Jakarta Selatan</option>
              </select>
            </div>

            <div className="px-2 pt-2.5 md:pt-0">
              <label className="block text-[10px] font-semibold text-tallero-teal uppercase mb-1">
                Jenis Layanan
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                aria-label="Jenis Layanan"
                className="w-full text-xs font-semibold text-tallero-navy bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Servis Berkala & Tune Up 3D">Servis Berkala &amp; Tune Up</option>
                <option value="Ganti Oli Sintetik & Filter">Ganti Oli &amp; Filter</option>
                <option value="Spooring 3D, Balancing & Rem">Spooring &amp; Balancing</option>
                <option value="Flushing AC & Cek Kelistrikan">Servis AC &amp; Aki</option>
              </select>
            </div>

            <div className="px-2 pt-2.5 md:pt-0">
              <label className="block text-[10px] font-semibold text-tallero-teal uppercase mb-1">
                Tanggal Kedatangan
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                aria-label="Tanggal Kedatangan"
                className="w-full text-xs font-semibold text-tallero-navy bg-transparent focus:outline-none cursor-pointer"
              />
            </div>

            <div className="pt-3 md:pt-0 md:pl-3">
              <Link
                href="/register"
                className="block w-full text-center py-2.5 px-4 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-bold text-xs transition-colors shadow-xs"
              >
                Booking Pit
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 5. BRAND LOGOS STRIP */}
      <section className="py-8 bg-white border-b border-slate-100 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-6">
          {carBrands.map((brand) => (
            <div
              key={brand}
              className="flex items-center gap-2 text-slate-400 hover:text-tallero-navy transition-colors"
            >
              <i className="fa-solid fa-car-side text-xs text-tallero-teal/60"></i>
              <span className="text-xs font-bold tracking-widest">{brand}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HOW IT WORKS (3 STEPS) */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <span className="text-[11px] font-semibold text-tallero-teal uppercase tracking-wider">
            Alur Pelayanan
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-tallero-navy mt-0.5">
            Langkah Mudah Servis di Tallero
          </h2>
          <SectionDivider />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3 px-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-tallero-sky/30 text-tallero-navy flex items-center justify-center text-base">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h3 className="font-semibold text-sm text-tallero-navy">Pilih Lokasi Cabang</h3>
            <p className="text-xs font-normal text-slate-500 leading-relaxed">
              Tentukan outlet Tallero terdekat di Depok, Bogor, atau Jakarta Selatan sesuai domisili Anda.
            </p>
          </div>

          <div className="text-center space-y-3 px-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-tallero-navy text-tallero-amber flex items-center justify-center text-base shadow-sm">
              <i className="fa-regular fa-calendar-check"></i>
            </div>
            <h3 className="font-semibold text-sm text-tallero-navy">Tentukan Jadwal &amp; Paket</h3>
            <p className="text-xs font-normal text-slate-500 leading-relaxed">
              Pilih paket perawatan berkala atau keluhan spesifik beserta jam kedatangan untuk mengunci slot pit.
            </p>
          </div>

          <div className="text-center space-y-3 px-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-tallero-sky/30 text-tallero-navy flex items-center justify-center text-base">
              <i className="fa-solid fa-car"></i>
            </div>
            <h3 className="font-semibold text-sm text-tallero-navy">Datang &amp; Pantau Pengerjaan</h3>
            <p className="text-xs font-normal text-slate-500 leading-relaxed">
              Tunjukkan kode booking saat tiba, konfirmasi estimasi biaya, dan pantau progres mekanik secara langsung.
            </p>
          </div>
        </div>
      </section>

      {/* 7. ABOUT US + SUV IMAGE + 4 STAT CARDS (Persis image_56cb65.png) */}
      <section id="tentang" className="pt-14 pb-6 px-6 bg-[#f5f9fc] border-t border-slate-200/70">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Kiri: Visual Mobil SUV Gagah */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-white">
              <img
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=85"
                alt="SUV Perawatan Bengkel Tallero"
                className="w-full h-[260px] sm:h-[310px] object-cover"
              />
            </div>
          </div>

          {/* Kanan: Deskripsi, Tanda Tangan Kepala Bengkel & Badge Pengalaman */}
          <div className="lg:col-span-6 space-y-3.5">
            <span className="text-[11px] font-semibold text-tallero-teal uppercase tracking-wider">
              Tentang Tallero
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-tallero-navy leading-snug">
              Pengalaman Servis Terbaik Dengan Standar Mekanik Resmi
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tallero-amber"></span>
              <span className="w-8 h-[2px] bg-tallero-teal rounded-full"></span>
            </div>

            <p className="text-xs font-normal text-slate-600 leading-relaxed">
              Tallero Auto Service hadir untuk memudahkan pemilik kendaraan mendapatkan perawatan berkala tanpa antre panjang. Setiap unit diperiksa menggunakan scanner diagnostik OBD2 dan peralatan kalibrasi 3D modern.
            </p>
            <p className="text-xs font-normal text-slate-600 leading-relaxed">
              Seluruh penggantian suku cadang dikonfirmasikan terlebih dahulu kepada pemilik kendaraan dengan rincian harga yang transparan dan bergaransi resmi.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <p className="font-serif italic text-lg font-bold text-tallero-navy">
                  Ahmad Supriadi
                </p>
                <span className="text-[11px] font-medium text-tallero-teal">
                  Kepala Mekanik &amp; Operational Lead
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tallero-amber to-[#d98a00] text-tallero-navy flex flex-col items-center justify-center shadow-sm shrink-0">
                <span className="text-xs font-bold leading-none">14</span>
                <span className="text-[8px] font-bold uppercase">Hari Garansi</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 STAT CARDS OVERLAPPING KE SECTION BAWAH */}
        <div className="max-w-4xl mx-auto mt-10 -mb-14 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-md text-center space-y-1">
            <i className="fa-regular fa-face-smile text-tallero-teal text-xl"></i>
            <p className="text-lg font-bold text-tallero-navy">4.780+</p>
            <p className="text-[11px] font-normal text-slate-500">Pelanggan Puas</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-md text-center space-y-1">
            <i className="fa-solid fa-warehouse text-tallero-amber text-xl"></i>
            <p className="text-lg font-bold text-tallero-navy">15 Pit</p>
            <p className="text-[11px] font-normal text-slate-500">Lift &amp; Spooring 3D</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-md text-center space-y-1">
            <i className="fa-solid fa-car-side text-tallero-teal text-xl"></i>
            <p className="text-lg font-bold text-tallero-navy">7.890+</p>
            <p className="text-[11px] font-normal text-slate-500">Unit Terservis</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-md text-center space-y-1">
            <i className="fa-solid fa-location-dot text-tallero-amber text-xl"></i>
            <p className="text-lg font-bold text-tallero-navy">3 Cabang</p>
            <p className="text-[11px] font-normal text-slate-500">Depok, Bogor &amp; Jaksel</p>
          </div>
        </div>
      </section>

      {/* 8. PAKET SERVIS UNGGULAN (3-COLUMN CARDS PERSIS REFERENSI) */}
      <section id="layanan" className="pt-24 pb-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <span className="text-[11px] font-semibold text-tallero-teal uppercase tracking-wider">
            Layanan Bengkel Resmi
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-tallero-navy mt-0.5">
            Paket Servis Unggulan Kami
          </h2>
          <SectionDivider />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-tallero-navy text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {visiblePackages.map((pkg) => {
            const isSaved = savedIds.includes(pkg.id);
            return (
              <div
                key={pkg.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Box + Wishlist Icon */}
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    {pkg.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-tallero-amber text-tallero-navy text-[10px] font-bold">
                        {pkg.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleSave(pkg.id)}
                      aria-label="Simpan Paket"
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-xs transition-colors"
                    >
                      <i
                        className={`${
                          isSaved
                            ? 'fa-solid fa-heart text-tallero-amber'
                            : 'fa-regular fa-heart text-slate-400 hover:text-tallero-navy'
                        }`}
                      ></i>
                    </button>
                  </div>

                  {/* Card Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-tallero-navy">{pkg.title}</h3>

                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="text-sm font-bold text-tallero-teal">{pkg.price}</span>
                      <span className="text-[11px] font-normal text-slate-400">
                        • {pkg.duration}
                      </span>
                    </div>

                    {/* 3 Mini Spec Icons Row */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-normal text-slate-500">
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-gauge text-tallero-teal text-[10px]"></i>
                        {pkg.mileage}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-shield-halved text-tallero-amber text-[10px]"></i>
                        {pkg.warranty}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-wrench text-tallero-teal text-[10px]"></i>
                        {pkg.partType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Full-width Navy Button (Tanpa Panah) */}
                <div className="px-4 pb-4">
                  <Link
                    href="/register"
                    className="block w-full text-center py-2 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-semibold text-xs transition-colors"
                  >
                    Pilih Layanan
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-7">
          <span className="w-5 h-1.5 rounded-full bg-tallero-navy"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
        </div>
      </section>

      {/* 9. BEST CUSTOMER EXPERIENCE — TOP-DOWN CAR + 6 CONNECTOR CALLOUTS (Persis image_56cb3f.png) */}
      <section id="keunggulan" className="py-16 px-6 bg-[#f5f9fc] border-y border-slate-200/70">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold text-tallero-teal uppercase tracking-wider">
              Standar Bengkel Tallero
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-tallero-navy mt-0.5">
              Pengalaman Servis Terbaik Untuk Pelanggan
            </h2>
            <SectionDivider />
          </div>

          {/* 3-Column Diagram: Left Callouts | Center Top-Down Car | Right Callouts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Kolom Kiri (3 Item) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center justify-between lg:justify-end gap-3">
                <div className="lg:text-right">
                  <div className="inline-flex w-9 h-9 rounded-lg bg-white border border-slate-200 text-tallero-teal items-center justify-center shadow-2xs mb-1.5">
                    <i className="fa-solid fa-tags text-xs"></i>
                  </div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Tarif Servis Kompetitif</h3>
                  <p className="text-[11px] font-normal text-slate-500">Estimasi jelas sebelum pengerjaan</p>
                </div>
                <div className="hidden lg:flex items-center">
                  <span className="w-10 h-[1px] bg-tallero-teal/40"></span>
                  <span className="w-2 h-2 rounded-full bg-tallero-navy"></span>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-3">
                <div className="lg:text-right">
                  <div className="inline-flex w-9 h-9 rounded-lg bg-white border border-slate-200 text-tallero-amber items-center justify-center shadow-2xs mb-1.5">
                    <i className="fa-regular fa-clock text-xs"></i>
                  </div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Jadwal Pit Tanpa Antre</h3>
                  <p className="text-[11px] font-normal text-slate-500">Slot langsung terkunci saat booking</p>
                </div>
                <div className="hidden lg:flex items-center">
                  <span className="w-10 h-[1px] bg-tallero-teal/40"></span>
                  <span className="w-2 h-2 rounded-full bg-tallero-amber"></span>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-3">
                <div className="lg:text-right">
                  <div className="inline-flex w-9 h-9 rounded-lg bg-white border border-slate-200 text-tallero-teal items-center justify-center shadow-2xs mb-1.5">
                    <i className="fa-solid fa-credit-card text-xs"></i>
                  </div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Pembayaran Fleksibel</h3>
                  <p className="text-[11px] font-normal text-slate-500">Mendukung QRIS, Debit &amp; Transfer</p>
                </div>
                <div className="hidden lg:flex items-center">
                  <span className="w-10 h-[1px] bg-tallero-teal/40"></span>
                  <span className="w-2 h-2 rounded-full bg-tallero-navy"></span>
                </div>
              </div>
            </div>

            {/* Tengah: Visual Mobil Tampak Atas (Top-Down Automotive Illustration) */}
            <div className="lg:col-span-4 flex justify-center py-2">
              <div className="relative w-48 sm:w-52">
                <svg
                  viewBox="0 0 220 420"
                  className="w-full h-auto drop-shadow-md"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Ilustrasi Inspeksi Kendaraan Tampak Atas"
                >
                  {/* Tire Tracks */}
                  <rect x="44" y="340" width="18" height="72" rx="4" fill="#A8E8F9" fillOpacity="0.45" />
                  <rect x="158" y="340" width="18" height="72" rx="4" fill="#A8E8F9" fillOpacity="0.45" />

                  {/* Wheels */}
                  <rect x="26" y="72" width="14" height="54" rx="6" fill="#013C58" />
                  <rect x="180" y="72" width="14" height="54" rx="6" fill="#013C58" />
                  <rect x="26" y="275" width="14" height="54" rx="6" fill="#013C58" />
                  <rect x="180" y="275" width="14" height="54" rx="6" fill="#013C58" />

                  {/* Side Mirrors */}
                  <path d="M36 128 L16 135 L18 147 L38 144 Z" fill="#00537A" />
                  <path d="M184 128 L204 135 L202 147 L182 144 Z" fill="#00537A" />

                  {/* Main Car Chassis */}
                  <rect
                    x="36"
                    y="24"
                    width="148"
                    height="352"
                    rx="42"
                    fill="#FFFFFF"
                    stroke="#013C58"
                    strokeWidth="3"
                  />

                  {/* Hood Lines */}
                  <path d="M58 46 Q110 34 162 46 L154 112 Q110 104 66 112 Z" fill="#F1F7FA" stroke="#00537A" strokeWidth="1.5" />
                  <line x1="82" y1="45" x2="76" y2="108" stroke="#A8E8F9" strokeWidth="2" />
                  <line x1="138" y1="45" x2="144" y2="108" stroke="#A8E8F9" strokeWidth="2" />

                  {/* Front Windshield */}
                  <path d="M54 116 Q110 104 166 116 L158 164 Q110 156 62 164 Z" fill="#013C58" />
                  <path d="M64 122 Q110 112 156 122 L151 154 Q110 148 69 154 Z" fill="#00537A" />

                  {/* Cabin Interior / Roof Cutaway */}
                  <rect x="58" y="168" width="104" height="128" rx="16" fill="#EAF4F9" stroke="#00537A" strokeWidth="1.5" />

                  {/* Front Seats */}
                  <rect x="66" y="178" width="36" height="44" rx="8" fill="#FFFFFF" stroke="#013C58" strokeWidth="1.5" />
                  <rect x="118" y="178" width="36" height="44" rx="8" fill="#FFFFFF" stroke="#013C58" strokeWidth="1.5" />

                  {/* Rear Seats */}
                  <rect x="66" y="236" width="88" height="48" rx="10" fill="#FFFFFF" stroke="#013C58" strokeWidth="1.5" />
                  <line x1="110" y1="236" x2="110" y2="284" stroke="#CBD5E1" strokeWidth="1.5" />

                  {/* Rear Windshield */}
                  <path d="M62 302 Q110 310 158 302 L164 340 Q110 350 56 340 Z" fill="#013C58" />

                  {/* Headlights (Amber Accent) */}
                  <path d="M46 38 Q58 28 74 32 L68 44 L46 46 Z" fill="#F5A201" />
                  <path d="M174 38 Q162 28 146 32 L152 44 L174 46 Z" fill="#F5A201" />

                  {/* Taillights */}
                  <rect x="48" y="362" width="28" height="7" rx="3.5" fill="#F5A201" />
                  <rect x="144" y="362" width="28" height="7" rx="3.5" fill="#F5A201" />
                </svg>
              </div>
            </div>

            {/* Kolom Kanan (3 Item) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center">
                  <span className="w-2 h-2 rounded-full bg-tallero-navy"></span>
                  <span className="w-10 h-[1px] bg-tallero-teal/40"></span>
                </div>
                <div>
                  <div className="inline-flex w-9 h-9 rounded-lg bg-white border border-slate-200 text-tallero-teal items-center justify-center shadow-2xs mb-1.5">
                    <i className="fa-solid fa-shield-halved text-xs"></i>
                  </div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Garansi Pengerjaan 14 Hari</h3>
                  <p className="text-[11px] font-normal text-slate-500">Gratis pengecekan ulang jika ada kendala</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center">
                  <span className="w-2 h-2 rounded-full bg-tallero-amber"></span>
                  <span className="w-10 h-[1px] bg-tallero-teal/40"></span>
                </div>
                <div>
                  <div className="inline-flex w-9 h-9 rounded-lg bg-white border border-slate-200 text-tallero-amber items-center justify-center shadow-2xs mb-1.5">
                    <i className="fa-solid fa-truck-pickup text-xs"></i>
                  </div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Bantuan Darurat &amp; Derek</h3>
                  <p className="text-[11px] font-normal text-slate-500">Siaga panggilan area Jabodetabek</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center">
                  <span className="w-2 h-2 rounded-full bg-tallero-navy"></span>
                  <span className="w-10 h-[1px] bg-tallero-teal/40"></span>
                </div>
                <div>
                  <div className="inline-flex w-9 h-9 rounded-lg bg-white border border-slate-200 text-tallero-teal items-center justify-center shadow-2xs mb-1.5">
                    <i className="fa-solid fa-user-gear text-xs"></i>
                  </div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Mekanik Spesialis</h3>
                  <p className="text-[11px] font-normal text-slate-500">Ditangani teknisi berpengalaman</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Bottom Feature Pills */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {[
              { icon: 'fa-gears', label: 'Mesin' },
              { icon: 'fa-car-battery', label: 'Kelistrikan' },
              { icon: 'fa-snowflake', label: 'Sistem AC' },
              { icon: 'fa-compact-disc', label: 'Rem & Roda' },
              { icon: 'fa-oil-can', label: 'Pelumas' },
            ].map((spec) => (
              <div
                key={spec.label}
                className="bg-white px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-center gap-2 text-xs font-medium text-tallero-navy"
              >
                <i className={`fa-solid ${spec.icon} text-tallero-teal text-xs`}></i>
                <span>{spec.label}</span>
                <i className="fa-solid fa-check text-tallero-amber text-[10px]"></i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIAL SECTION */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <span className="text-[11px] font-semibold text-tallero-teal uppercase tracking-wider">
            Ulasan Pelanggan
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-tallero-navy mt-0.5">
            Apa Kata Pelanggan Kami
          </h2>
          <SectionDivider />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center gap-1 text-tallero-amber text-xs">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-xs font-normal text-slate-600 leading-relaxed">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-tallero-navy text-white flex items-center justify-center text-xs font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-tallero-navy">{item.name}</p>
                    <p className="text-[10px] font-normal text-tallero-teal">{item.car}</p>
                  </div>
                </div>
                <i className="fa-solid fa-quote-right text-tallero-sky text-lg"></i>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. NEWSLETTER / PROMO BANNER DENGAN MOBIL SUV */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-r from-[#01293d] via-[#013C58] to-[#00537A] p-6 md:p-10 text-white shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-tallero-amber">
              Info Promo &amp; Pengingat Servis
            </span>
            <h2 className="text-xl md:text-2xl font-bold leading-snug">
              Dapatkan Info Diskon Servis Berkala Terbaru
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tallero-amber"></span>
              <span className="w-8 h-[2px] bg-tallero-sky rounded-full"></span>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="pt-2 flex flex-col sm:flex-row items-center gap-2 bg-white p-1.5 rounded-xl max-w-md"
            >
              <input
                type="email"
                placeholder="Masukkan alamat email Anda..."
                className="w-full px-3 py-2 text-xs font-normal text-slate-700 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-bold text-xs transition-colors shrink-0"
              >
                Langganan
              </button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-white/15 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85"
                alt="Kendaraan SUV Tallero"
                className="w-full h-44 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. LATEST BLOG & TIPS PERAWATAN */}
      <section id="artikel" className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <span className="text-[11px] font-semibold text-tallero-teal uppercase tracking-wider">
            Tips Otomotif
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-tallero-navy mt-0.5">
            Panduan Perawatan Kendaraan
          </h2>
          <SectionDivider />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {workshopArticles.map((art, idx) => (
            <article
              key={idx}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 bg-slate-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded bg-tallero-navy text-white text-[10px] font-semibold">
                    {art.date}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm text-tallero-navy leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs font-normal text-slate-500 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <Link
                  href="#layanan"
                  className="text-xs font-semibold text-tallero-teal hover:text-tallero-navy transition-colors"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 13. FOOTER (Persis Struktur Satos dengan Palet Tallero) */}
      <footer id="kontak" className="bg-[#011c29] text-slate-300 pt-14 pb-6 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Kolom 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-tallero-teal text-tallero-amber flex items-center justify-center text-xs">
                <i className="fa-solid fa-gear"></i>
              </div>
              <span className="text-base font-bold text-white tracking-wider">
                TALLERO<span className="text-tallero-amber">.</span>
              </span>
            </div>
            <p className="text-xs font-normal text-slate-400 leading-relaxed">
              Sistem manajemen dan reservasi servis bengkel terpadu untuk menjaga performa kendaraan Anda tetap prima setiap hari.
            </p>
            <div className="flex gap-2.5 pt-1">
              <a
                href="#kontak"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-tallero-teal flex items-center justify-center text-xs transition-colors"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#kontak"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-tallero-teal flex items-center justify-center text-xs transition-colors"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="#kontak"
                aria-label="WhatsApp"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-tallero-teal flex items-center justify-center text-xs transition-colors"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Menu Utama
            </h4>
            <ul className="space-y-1.5 text-xs font-normal text-slate-400">
              <li><Link href="#beranda" className="hover:text-tallero-sky transition-colors">Beranda</Link></li>
              <li><Link href="#tentang" className="hover:text-tallero-sky transition-colors">Tentang Kami</Link></li>
              <li><Link href="#layanan" className="hover:text-tallero-sky transition-colors">Paket Servis</Link></li>
              <li><Link href="#keunggulan" className="hover:text-tallero-sky transition-colors">Keunggulan</Link></li>
              <li><Link href="#artikel" className="hover:text-tallero-sky transition-colors">Artikel Otomotif</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Tautan Bantuan */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Akses Sistem
            </h4>
            <ul className="space-y-1.5 text-xs font-normal text-slate-400">
              <li><Link href="/register" className="hover:text-tallero-sky transition-colors">Buat Jadwal Booking</Link></li>
              <li><Link href="/login" className="hover:text-tallero-sky transition-colors">Masuk Akun Pelanggan</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-tallero-amber transition-colors">Portal Admin Bengkel</Link></li>
              <li><Link href="#kontak" className="hover:text-tallero-sky transition-colors">Garansi &amp; Ketentuan</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Galeri Bengkel 3x2 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Galeri Bengkel
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=200&q=75',
                'https://images.unsplash.com/photo-1635773054018-22c38833e134?auto=format&fit=crop&w=200&q=75',
                'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=200&q=75',
                'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=75',
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=200&q=75',
                'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=200&q=75',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Galeri Bengkel Tallero"
                  className="w-full h-12 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4 Info Columns Bottom */}
        <div className="max-w-5xl mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-xs border-b border-white/10">
          <div>
            <span className="block font-semibold text-white mb-1">Lokasi Pusat</span>
            <p className="text-[11px] font-normal text-slate-400">
              Jl. Margonda Raya No. 120, Beji, Kota Depok
            </p>
          </div>
          <div>
            <span className="block font-semibold text-white mb-1">Email Layanan</span>
            <p className="text-[11px] font-normal text-slate-400">
              layanan@tallero.id
            </p>
          </div>
          <div>
            <span className="block font-semibold text-white mb-1">Telepon &amp; WhatsApp</span>
            <p className="text-[11px] font-semibold text-tallero-amber">
              021-77889900 / 0812-3456-7890
            </p>
          </div>
          <div>
            <span className="block font-semibold text-white mb-1">Jam Operasional</span>
            <p className="text-[11px] font-normal text-slate-400">
              Senin – Minggu: 08.00 – 17.00 WIB
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-5 text-center text-[11px] font-normal text-slate-500">
          <p>© 2026 Tallero Auto Service. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}