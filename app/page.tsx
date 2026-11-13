'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ServicePackage {
  id: string;
  badge?: string;
  category: string;
  title: string;
  specs: string;
  price: string;
  duration: string;
  image: string;
  checklist: string[];
}

const servicePackages: ServicePackage[] = [
  {
    id: 'srv-oli',
    category: 'Perawatan Rutin',
    title: 'Ganti Oli & Filter Mesin',
    specs: 'Oli Sintetik 4L • Filter Baru • Cek 15 Titik',
    price: 'Rp 350.000',
    duration: '± 30 Menit',
    image:
      'https://images.unsplash.com/photo-1635773054018-22c38833e134?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Oli mesin full synthetic 4 liter sesuai spesifikasi pabrikan',
      'Penggantian filter oli dan gasket drain plug baru',
      'Pemeriksaan level minyak rem, air radiator, dan tekanan ban',
    ],
  },
  {
    id: 'srv-berkala',
    badge: 'TERLARIS',
    category: 'General Repair',
    title: 'Servis Berkala & Tune Up 3D',
    specs: 'Scan ECU • Bersih Ruang Bakar • Busi & Filter',
    price: 'Rp 550.000',
    duration: '± 90 Menit',
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Pembersihan throttle body, injektor, dan ruang bakar',
      'Scanning sistem elektronik & sensor mesin via OBD2',
      'Pembersihan filter udara, pengecekan busi, dan penyetelan idle',
    ],
  },
  {
    id: 'srv-spooring',
    category: 'Kaki-Kaki & Rem',
    title: 'Spooring, Balancing & Cek Rem',
    specs: 'Kalibrasi 3D • 4 Roda • Cek Kampas Rem',
    price: 'Rp 250.000',
    duration: '± 45 Menit',
    image:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Penyelarasan sudut camber, caster, dan toe dengan sensor 3D',
      'Balancing 4 roda untuk menghilangkan getaran di kecepatan tinggi',
      'Pembersihan kaliper dan pengukuran ketebalan kampas rem',
    ],
  },
  {
    id: 'srv-ac',
    category: 'AC & Kelistrikan',
    title: 'Servis AC & Penggantian Aki',
    specs: 'Flushing Freon • Filter Kabin • Tes Alternator',
    price: 'Rp 320.000',
    duration: '± 60 Menit',
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Kuras oli kompresor dan pengisian ulang freon R134a murni',
      'Pembersihan evaporator serta pengecekan filter kabin',
      'Pengujian tegangan aki dan arus pengisian alternator',
    ],
  },
];

const carBrands = [
  { name: 'Toyota', code: 'TYT' },
  { name: 'Honda', code: 'HND' },
  { name: 'Mitsubishi', code: 'MTB' },
  { name: 'Suzuki', code: 'SZK' },
  { name: 'Daihatsu', code: 'DHT' },
  { name: 'Nissan', code: 'NSN' },
  { name: 'Mazda', code: 'MZD' },
  { name: 'Hyundai', code: 'HYD' },
];

const workshopBranches = [
  {
    name: 'Cabang Utama Depok',
    address: 'Jl. Margonda Raya No. 120, Beji, Depok',
    hours: '08.00 – 17.00 WIB',
    pitStatus: '2 Pit Kosong',
  },
  {
    name: 'Cabang Bogor City',
    address: 'Jl. Pajajaran No. 45, Bogor Timur',
    hours: '08.00 – 17.00 WIB',
    pitStatus: '3 Pit Kosong',
  },
  {
    name: 'Cabang Jakarta Selatan',
    address: 'Jl. Fatmawati No. 88, Cilandak',
    hours: '08.00 – 18.00 WIB',
    pitStatus: '2 Pit Kosong',
  },
];

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServicePackage | null>(null);
  const [quickBranch, setQuickBranch] = useState('Cabang Utama Depok');
  const [quickBrand, setQuickBrand] = useState('Toyota');
  const [quickPackage, setQuickPackage] = useState('Servis Berkala & Tune Up 3D');
  const [quickDate, setQuickDate] = useState('2026-11-14');

  const displayedServices = searchTerm.trim()
    ? servicePackages.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.specs.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : servicePackages;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. TOP UTILITY HEADER */}
      <div className="bg-white border-b border-slate-200/80 px-6 py-3">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link href="#beranda" className="flex items-center gap-2.5 self-start md:self-auto">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-tallero-navy to-tallero-teal flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-gear text-tallero-amber text-base"></i>
            </div>
            <div>
              <span className="text-lg font-bold tracking-wider text-tallero-navy block leading-none">
                TALLERO
              </span>
              <span className="text-[10px] font-medium tracking-widest text-tallero-teal uppercase">
                Auto Service Center
              </span>
            </div>
          </Link>

          {/* Search Bar Tengah */}
          <div className="w-full md:w-[380px] flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 focus-within:border-tallero-teal focus-within:bg-white transition-colors">
            <span className="px-3 text-[11px] font-medium text-slate-500 border-r border-slate-200 hidden sm:inline">
              Semua Layanan
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari ganti oli, tune up, spooring..."
              className="flex-1 px-3 py-2 text-xs font-normal bg-transparent focus:outline-none text-slate-700"
            />
            <a
              href="#paket-servis"
              aria-label="Cari Layanan"
              className="px-3.5 py-2 bg-tallero-navy hover:bg-tallero-teal text-white text-xs transition-colors"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>

          {/* Tombol Akun Kanan (Bersih Tanpa Ikon Pintasan Berlebih) */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <Link
              href="/login"
              className="px-3.5 py-2 rounded-lg border border-slate-200 hover:border-tallero-teal text-tallero-navy font-medium text-xs transition-colors"
            >
              Masuk Akun
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-semibold text-xs transition-colors shadow-sm"
            >
              Booking Servis
            </Link>
          </div>
        </div>
      </div>

      {/* 2. DARK NAVIGATION BAR */}
      <nav className="bg-gradient-to-r from-[#01293d] via-[#013C58] to-[#00537A] text-white px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center overflow-x-auto">
            <Link
              href="#beranda"
              className="px-4 py-2.5 bg-tallero-teal font-semibold text-white border-b-2 border-tallero-amber whitespace-nowrap"
            >
              Beranda
            </Link>
            <Link
              href="#paket-servis"
              className="px-4 py-2.5 font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Paket Servis
            </Link>
            <Link
              href="#merek-mobil"
              className="px-4 py-2.5 font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Merek Ditangani
            </Link>
            <Link
              href="#keunggulan"
              className="px-4 py-2.5 font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Keunggulan Bengkel
            </Link>
            <Link
              href="#cabang-bengkel"
              className="px-4 py-2.5 font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Tentang & Cabang
            </Link>
            <Link
              href="#kontak"
              className="px-4 py-2.5 font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Kontak
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-medium text-tallero-sky">
            <span className="w-1.5 h-1.5 rounded-full bg-tallero-amber"></span>
            <span>Buka Setiap Hari: 08.00 – 17.00 WIB</span>
          </div>
        </div>
      </nav>

      {/* 3. DRAMATIC AUTOMOTIVE HERO BANNER */}
      <header
        id="beranda"
        className="relative bg-gradient-to-r from-[#061822] via-[#013C58] to-[#00537A] text-white overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1500&q=85"
            alt="Tallero Auto Service Workshop"
            className="w-full h-full object-cover object-right opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051620] via-[#013C58]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-20 md:pt-16 md:pb-24">
          <div className="max-w-lg space-y-4">
            <span className="inline-block px-2.5 py-1 rounded bg-tallero-amber/20 border border-tallero-amber/40 text-tallero-amber text-[11px] font-semibold tracking-wider uppercase">
              Bengkel Modern & Terjadwal
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-[36px] font-bold leading-tight tracking-tight uppercase">
              Rawat Performa Mesin.{' '}
              <span className="text-tallero-amber block">Berkendara Lebih Tenang.</span>
            </h1>

            <p className="text-xs sm:text-sm font-normal text-slate-200 leading-relaxed">
              Pesan jadwal servis berkala, spooring 3D, dan perbaikan kendaraan secara online dengan estimasi biaya transparan serta pantauan progres mekanik langsung.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-bold text-xs border border-tallero-sky/40 shadow-md transition-colors"
              >
                Jadwalkan Servis
              </Link>
              <Link
                href="#paket-servis"
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/25 backdrop-blur-sm transition-colors"
              >
                Lihat Paket & Tarif
              </Link>
            </div>

            {/* 4 Mini Stats Row */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15">
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-warehouse text-tallero-sky text-base"></i>
                <div>
                  <p className="text-xs font-bold text-white">15+ Pit</p>
                  <p className="text-[10px] font-normal text-slate-300">Lift & Spooring</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-car text-tallero-amber text-base"></i>
                <div>
                  <p className="text-xs font-bold text-white">8+ Merek</p>
                  <p className="text-[10px] font-normal text-slate-300">Jepang & Korea</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-shield-halved text-tallero-sky text-base"></i>
                <div>
                  <p className="text-xs font-bold text-white">14 Hari</p>
                  <p className="text-[10px] font-normal text-slate-300">Garansi Servis</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-receipt text-tallero-amber text-base"></i>
                <div>
                  <p className="text-xs font-bold text-white">Transparan</p>
                  <p className="text-[10px] font-normal text-slate-300">Estimasi Awal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. FLOATING QUICK-BOOKING BAR */}
      <section id="booking-cepat" className="px-6 -mt-9 relative z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200/90 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            <div className="lg:col-span-3 flex items-center gap-2.5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-2.5 lg:pb-0 lg:pr-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-tallero-navy to-tallero-teal text-white flex items-center justify-center shrink-0">
                <i className="fa-solid fa-wrench text-xs text-tallero-amber"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-tallero-navy">Booking Pit Cepat</p>
                <p className="text-[10px] font-normal text-slate-400">Pilih cabang & paket</p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              <select
                value={quickBranch}
                onChange={(e) => setQuickBranch(e.target.value)}
                aria-label="Pilih Cabang"
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-tallero-teal"
              >
                <option value="Cabang Utama Depok">Outlet Depok</option>
                <option value="Cabang Bogor City">Outlet Bogor</option>
                <option value="Cabang Jakarta Selatan">Outlet Jaksel</option>
              </select>

              <select
                value={quickBrand}
                onChange={(e) => setQuickBrand(e.target.value)}
                aria-label="Pilih Merek Mobil"
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-tallero-teal"
              >
                {carBrands.map((b) => (
                  <option key={b.code} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>

              <select
                value={quickPackage}
                onChange={(e) => setQuickPackage(e.target.value)}
                aria-label="Pilih Jenis Layanan"
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-tallero-teal"
              >
                {servicePackages.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={quickDate}
                onChange={(e) => setQuickDate(e.target.value)}
                aria-label="Tanggal Kedatangan"
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-tallero-teal"
              />
            </div>

            <div className="lg:col-span-2">
              <Link
                href="/register"
                className="block w-full text-center py-2.5 px-3 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-bold text-xs transition-colors shadow-sm"
              >
                Pesan Jadwal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PAKET SERVIS POPULER */}
      <section id="paket-servis" className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-tallero-navy uppercase tracking-tight">
                Paket Servis Populer
              </h2>
              <p className="text-xs font-normal text-slate-500 mt-0.5">
                Standar pengerjaan resmi dengan estimasi waktu dan rincian biaya yang jelas.
              </p>
            </div>
            <Link
              href="/register"
              className="text-xs font-semibold text-tallero-teal hover:text-tallero-navy transition-colors"
            >
              Semua Layanan
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedServices.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-tallero-teal/40 transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 bg-slate-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-tallero-amber text-tallero-navy text-[10px] font-bold tracking-wide shadow-sm">
                        {item.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-tallero-navy/85 text-white text-[10px] font-medium backdrop-blur-sm">
                      {item.duration}
                    </span>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] font-medium text-tallero-teal uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-sm text-tallero-navy mt-0.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-normal text-slate-500 mt-1">
                      {item.specs}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-baseline justify-between">
                      <span className="text-sm font-bold text-tallero-navy">{item.price}</span>
                      <span className="text-[10px] font-normal text-slate-400">Estimasi Mulai</span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedServiceModal(item)}
                    className="py-2 rounded-lg border border-slate-200 hover:border-tallero-teal text-slate-700 hover:text-tallero-navy font-medium text-[11px] transition-colors"
                  >
                    Detail
                  </button>
                  <Link
                    href="/register"
                    className="py-2 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-semibold text-[11px] text-center transition-colors"
                  >
                    Pilih Layanan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MEREK KENDARAAN YANG DITANGANI */}
      <section id="merek-mobil" className="py-10 bg-white border-y border-slate-200/80 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base md:text-lg font-bold text-tallero-navy uppercase tracking-tight">
              Merek Kendaraan yang Ditangani
            </h2>
            <span className="text-[11px] font-normal text-slate-400">
              Scanner OBD2 & Suku Cadang Lengkap
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {carBrands.map((brand) => (
              <div
                key={brand.code}
                className="p-3 rounded-xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 hover:border-tallero-teal/50 transition-colors flex flex-col items-center justify-center text-center"
              >
                <div className="w-9 h-9 rounded-full bg-tallero-navy/5 text-tallero-navy flex items-center justify-center text-xs font-bold mb-1.5">
                  {brand.code}
                </div>
                <span className="text-xs font-semibold text-slate-700">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MENGAPA MEMILIH TALLERO + BANNER KEUNTUNGAN SERVIS */}
      <section
        id="keunggulan"
        className="py-12 px-6 bg-gradient-to-b from-slate-50 via-[#eef6fa] to-slate-50"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <h2 className="text-base md:text-lg font-bold text-tallero-navy uppercase tracking-tight mb-6">
              Mengapa Servis di Tallero?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-tallero-teal/10 text-tallero-teal flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-certificate text-sm"></i>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Suku Cadang Asli</h3>
                  <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                    Part OEM bergaransi resmi
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-tallero-amber/15 text-tallero-amber flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-tags text-sm"></i>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Tarif Transparan</h3>
                  <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                    Konfirmasi biaya sebelum kerja
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-tallero-teal/10 text-tallero-teal flex items-center justify-center shrink-0">
                  <i className="fa-regular fa-clock text-sm"></i>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Tanpa Antre Lama</h3>
                  <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                    Pit terkunci sesuai jam booking
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-tallero-amber/15 text-tallero-amber flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-laptop-medical text-sm"></i>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Diagnosa Modern</h3>
                  <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                    Peralatan OBD2 & Spooring 3D
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-tallero-teal/10 text-tallero-teal flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-headset text-sm"></i>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-tallero-navy">Garansi 14 Hari</h3>
                  <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                    Gratis pengecekan ulang
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Horizontal Perks Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#012233] via-[#013C58] to-[#00537A] text-white p-6 shadow-md border border-tallero-sky/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-tallero-amber text-tallero-navy flex items-center justify-center text-xl font-bold shrink-0">
                  %
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-tallero-amber">
                    Penawaran Booking Online
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">
                    Keuntungan Setiap Reservasi
                  </h3>
                  <Link
                    href="/register"
                    className="inline-block mt-2 px-3.5 py-1.5 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white border border-tallero-sky/35 text-[11px] font-semibold transition-colors"
                  >
                    Buat Jadwal
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t lg:border-t-0 lg:border-l border-white/15 pt-4 lg:pt-0 lg:pl-6 text-xs">
                <div>
                  <p className="font-bold text-tallero-sky text-sm">Gratis</p>
                  <p className="text-[11px] font-normal text-slate-300 mt-0.5">
                    Inspeksi 25 Titik Kendaraan
                  </p>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Diskon 15%</p>
                  <p className="text-[11px] font-normal text-slate-300 mt-0.5">
                    Jasa Servis Pelanggan Baru
                  </p>
                </div>
                <div>
                  <p className="font-bold text-tallero-amber text-sm">Gratis Cuci</p>
                  <p className="text-[11px] font-normal text-slate-300 mt-0.5">
                    Cuci Eksterior Pasca Servis
                  </p>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">14 Hari</p>
                  <p className="text-[11px] font-normal text-slate-300 mt-0.5">
                    Garansi Resmi Pengerjaan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TENTANG BENGKEL + LOKASI CABANG RESMI */}
      <section id="cabang-bengkel" className="py-12 bg-white border-t border-slate-200/80 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Kiri: Foto & Profil Bengkel */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <div className="sm:col-span-5 h-48 sm:h-full rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80"
                alt="Fasilitas Bengkel Tallero"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 space-y-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-tallero-teal">
                Tentang Tallero Auto Service
              </span>
              <h2 className="text-lg font-bold text-tallero-navy leading-snug">
                Bengkel Perawatan Kendaraan Terpercaya di Jabodetabek
              </h2>
              <p className="text-xs font-normal text-slate-600 leading-relaxed">
                Beroperasi di Depok, Bogor, dan Jakarta Selatan, Tallero menghadirkan standar perawatan berkala dengan mekanik bersertifikat, peralatan kalibrasi modern, dan riwayat servis digital untuk setiap kendaraan.
              </p>
              <div className="pt-2">
                <Link
                  href="/register"
                  className="inline-block px-4 py-2 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-semibold text-xs transition-colors"
                >
                  Booking Sekarang
                </Link>
              </div>
            </div>
          </div>

          {/* Kanan: Daftar Cabang Bengkel (Pengganti Lacak Pengerjaan) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#01293d] via-[#013C58] to-[#00537A] text-white p-5 flex flex-col justify-between shadow-md">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-tallero-amber">
                Jaringan Bengkel Resmi
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Lokasi Cabang Tallero
              </h3>
              <p className="text-[11px] font-normal text-slate-300 mt-1">
                Pilih lokasi bengkel terdekat untuk jadwal perawatan kendaraanmu.
              </p>

              <div className="mt-3.5 space-y-2.5">
                {workshopBranches.map((branch, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm flex items-start justify-between gap-2"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">{branch.name}</p>
                      <p className="text-[11px] font-normal text-slate-200 mt-0.5">
                        {branch.address}
                      </p>
                      <p className="text-[10px] font-normal text-tallero-sky mt-0.5">
                        Buka: {branch.hours}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-tallero-amber text-tallero-navy text-[10px] font-bold shrink-0">
                      {branch.pitStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/register"
                className="block w-full text-center py-2.5 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white border border-tallero-sky/40 font-semibold text-xs transition-colors"
              >
                Pilih Cabang & Booking
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer id="kontak" className="bg-[#011f2e] text-slate-300 pt-10 pb-6 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <i className="fa-solid fa-gear text-tallero-amber text-base"></i>
              <span className="text-base font-bold tracking-wider text-white">TALLERO</span>
            </div>
            <p className="text-xs font-normal text-slate-400 leading-relaxed mb-4">
              Sistem manajemen dan reservasi perawatan kendaraan untuk kenyamanan berkendara harian Anda.
            </p>
            <div className="flex gap-2.5">
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
              <a
                href="#kontak"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-tallero-teal flex items-center justify-center text-xs transition-colors"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Akses Cepat
            </h4>
            <ul className="space-y-1.5 text-xs font-normal text-slate-400">
              <li><Link href="#paket-servis" className="hover:text-white transition-colors">Paket Servis & Tarif</Link></li>
              <li><Link href="#merek-mobil" className="hover:text-white transition-colors">Merek Ditangani</Link></li>
              <li><Link href="#cabang-bengkel" className="hover:text-white transition-colors">Lokasi Cabang Bengkel</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-tallero-amber transition-colors">Portal Admin Bengkel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Cabang Bengkel
            </h4>
            <ul className="space-y-1.5 text-xs font-normal text-slate-400">
              <li>Cabang Utama Depok (Margonda)</li>
              <li>Cabang Bogor City (Pajajaran)</li>
              <li>Cabang Jakarta Selatan (Fatmawati)</li>
              <li className="text-tallero-sky pt-1">Buka Setiap Hari: 08.00 – 17.00 WIB</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Kontak Pusat
            </h4>
            <address className="not-italic text-xs font-normal text-slate-400 space-y-2">
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-tallero-amber"></i>
                <span>021-77889900 / 0812-3456-7890</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-tallero-amber"></i>
                <span>layanan@tallero.id</span>
              </p>
              <p className="flex items-start gap-2">
                <i className="fa-solid fa-location-dot text-tallero-amber mt-0.5"></i>
                <span>Jl. Margonda Raya No. 120, Beji, Kota Depok</span>
              </p>
            </address>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-normal text-slate-400">
          <p>© 2026 Tallero Auto Service. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-2">
            <span>Metode Pembayaran:</span>
            <span className="px-2 py-0.5 rounded bg-white text-tallero-navy font-bold text-[10px]">QRIS</span>
            <span className="px-2 py-0.5 rounded bg-white text-tallero-navy font-bold text-[10px]">TRANSFER</span>
            <span className="px-2 py-0.5 rounded bg-white text-tallero-navy font-bold text-[10px]">DEBIT</span>
          </div>
        </div>
      </footer>

      {/* MODAL DETAIL PAKET SERVIS */}
      {selectedServiceModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-tallero-navy to-tallero-teal text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-tallero-amber uppercase">
                  {selectedServiceModal.category}
                </span>
                <h3 className="text-base font-bold">{selectedServiceModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedServiceModal(null)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">Estimasi Biaya</span>
                  <span className="text-base font-bold text-tallero-navy">
                    {selectedServiceModal.price}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Durasi Pengerjaan</span>
                  <span className="font-semibold text-tallero-teal">
                    {selectedServiceModal.duration}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-semibold text-tallero-navy mb-2">Rincian Pengerjaan:</p>
                <ul className="space-y-1.5 text-slate-600 font-normal">
                  {selectedServiceModal.checklist.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <i className="fa-solid fa-check text-tallero-teal mt-0.5 text-[10px]"></i>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedServiceModal(null)}
                  className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium"
                >
                  Tutup
                </button>
                <Link
                  href="/register"
                  className="flex-1 py-2 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-bold text-center transition-colors"
                >
                  Booking Paket Ini
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}