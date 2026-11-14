'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shelf: 'mesin' | 'kaki-ac' | 'promo';
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
}

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

const illustrations = {
  heroBanner: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
      <defs>
        <linearGradient id="bgHero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#013C58"/>
          <stop offset="100%" stop-color="#00537A"/>
        </linearGradient>
        <linearGradient id="goldBottle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFD166"/>
          <stop offset="100%" stop-color="#F5A201"/>
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#bgHero)"/>
      <circle cx="520" cy="70" r="140" fill="#A8E8F9" fill-opacity="0.08"/>
      <circle cx="140" cy="310" r="120" fill="#F5A201" fill-opacity="0.1"/>
      <g transform="translate(115, 65)">
        <rect x="20" y="55" width="130" height="175" rx="18" fill="url(#goldBottle)"/>
        <rect x="42" y="25" width="52" height="34" rx="6" fill="#012436"/>
        <rect x="48" y="12" width="40" height="16" rx="4" fill="#F5A201"/>
        <rect x="38" y="95" width="94" height="82" rx="10" fill="#013C58"/>
        <text x="85" y="130" text-anchor="middle" fill="#F5A201" font-family="Arial, sans-serif" font-weight="bold" font-size="18">5W-30</text>
        <text x="85" y="152" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="11">FULL SYNTHETIC</text>
      </g>
      <g transform="translate(275, 95)">
        <rect x="10" y="45" width="110" height="145" rx="16" fill="#E2E8F0"/>
        <rect x="32" y="20" width="44" height="28" rx="5" fill="#013C58"/>
        <rect x="24" y="80" width="82" height="72" rx="8" fill="#00537A"/>
        <text x="65" y="112" text-anchor="middle" fill="#A8E8F9" font-family="Arial, sans-serif" font-weight="bold" font-size="15">0W-20</text>
        <text x="65" y="132" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="10">ECO PROTECT</text>
      </g>
      <g transform="translate(415, 135)">
        <rect x="0" y="25" width="95" height="115" rx="12" fill="#012436" stroke="#A8E8F9" stroke-width="2"/>
        <rect x="8" y="12" width="79" height="16" rx="4" fill="#F5A201"/>
        <text x="47" y="82" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="13">OIL FILTER</text>
        <text x="47" y="100" text-anchor="middle" fill="#A8E8F9" font-family="Arial, sans-serif" font-size="10">OEM GRADE</text>
      </g>
    </svg>
  `),
  oil: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#EEF5F9"/>
      <circle cx="200" cy="120" r="85" fill="#013C58" fill-opacity="0.06"/>
      <rect x="125" y="55" width="88" height="130" rx="14" fill="#F5A201"/>
      <rect x="142" y="34" width="38" height="24" rx="5" fill="#013C58"/>
      <rect x="138" y="88" width="62" height="58" rx="8" fill="#013C58"/>
      <text x="169" y="114" text-anchor="middle" fill="#F5A201" font-family="Arial, sans-serif" font-weight="bold" font-size="13">5W-30</text>
      <text x="169" y="131" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="9">SYNTHETIC</text>
      <rect x="228" y="95" width="58" height="90" rx="10" fill="#00537A"/>
      <rect x="234" y="85" width="46" height="12" rx="4" fill="#013C58"/>
      <text x="257" y="143" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="10">FILTER</text>
    </svg>
  `),
  tuneUp: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#EAF2F8"/>
      <circle cx="170" cy="120" r="54" fill="none" stroke="#013C58" stroke-width="14" stroke-dasharray="18 10"/>
      <circle cx="170" cy="120" r="26" fill="#00537A"/>
      <circle cx="255" cy="95" r="34" fill="none" stroke="#F5A201" stroke-width="10" stroke-dasharray="12 8"/>
      <circle cx="255" cy="95" r="14" fill="#013C58"/>
      <rect x="225" y="145" width="85" height="44" rx="8" fill="#013C58"/>
      <text x="267" y="172" text-anchor="middle" fill="#A8E8F9" font-family="Arial, sans-serif" font-weight="bold" font-size="12">OBD2 ECU</text>
    </svg>
  `),
  spooring: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#EEF5F9"/>
      <line x1="65" y1="45" x2="65" y2="195" stroke="#00537A" stroke-width="2" stroke-dasharray="6 4"/>
      <line x1="335" y1="45" x2="335" y2="195" stroke="#00537A" stroke-width="2" stroke-dasharray="6 4"/>
      <line x1="50" y1="120" x2="350" y2="120" stroke="#F5A201" stroke-width="2.5"/>
      <circle cx="200" cy="120" r="74" fill="#1E293B"/>
      <circle cx="200" cy="120" r="52" fill="#CBD5E1"/>
      <circle cx="200" cy="120" r="18" fill="#013C58"/>
      <line x1="200" y1="68" x2="200" y2="172" stroke="#013C58" stroke-width="6"/>
      <line x1="148" y1="120" x2="252" y2="120" stroke="#013C58" stroke-width="6"/>
      <line x1="163" y1="83" x2="237" y2="157" stroke="#013C58" stroke-width="5"/>
      <line x1="237" y1="83" x2="163" y2="157" stroke="#013C58" stroke-width="5"/>
    </svg>
  `),
  brake: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#F1F5F9"/>
      <circle cx="195" cy="120" r="76" fill="#94A3B8" stroke="#475569" stroke-width="4"/>
      <circle cx="195" cy="120" r="60" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="4 8"/>
      <circle cx="195" cy="120" r="32" fill="#013C58"/>
      <circle cx="195" cy="120" r="14" fill="#E2E8F0"/>
      <path d="M235 55 C275 75, 285 135, 255 170 L225 152 C242 128, 238 92, 215 76 Z" fill="#F5A201" stroke="#013C58" stroke-width="3"/>
    </svg>
  `),
  battery: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#EAF2F8"/>
      <rect x="125" y="52" width="26" height="16" rx="3" fill="#00537A"/>
      <rect x="249" y="52" width="26" height="16" rx="3" fill="#F5A201"/>
      <rect x="105" y="68" width="190" height="122" rx="14" fill="#013C58"/>
      <rect x="122" y="92" width="156" height="74" rx="8" fill="#00537A"/>
      <polygon points="205,100 185,130 200,130 192,158 218,125 202,125" fill="#F5A201"/>
      <text x="145" y="135" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="18">-</text>
      <text x="248" y="135" fill="#F5A201" font-family="Arial, sans-serif" font-weight="bold" font-size="18">+</text>
    </svg>
  `),
  ac: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#E6F4FA"/>
      <circle cx="200" cy="120" r="72" fill="#FFFFFF" stroke="#00537A" stroke-width="6"/>
      <line x1="200" y1="65" x2="200" y2="175" stroke="#00537A" stroke-width="6" stroke-linecap="round"/>
      <line x1="145" y1="120" x2="255" y2="120" stroke="#00537A" stroke-width="6" stroke-linecap="round"/>
      <line x1="162" y1="82" x2="238" y2="158" stroke="#00537A" stroke-width="5" stroke-linecap="round"/>
      <line x1="238" y1="82" x2="162" y2="158" stroke="#00537A" stroke-width="5" stroke-linecap="round"/>
      <circle cx="200" cy="120" r="14" fill="#F5A201"/>
    </svg>
  `),
  radiator: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#EEF5F9"/>
      <rect x="115" y="55" width="170" height="130" rx="12" fill="#013C58"/>
      <rect x="130" y="72" width="140" height="96" rx="6" fill="#00537A"/>
      <line x1="130" y1="92" x2="270" y2="92" stroke="#A8E8F9" stroke-width="3"/>
      <line x1="130" y1="112" x2="270" y2="112" stroke="#A8E8F9" stroke-width="3"/>
      <line x1="130" y1="132" x2="270" y2="132" stroke="#A8E8F9" stroke-width="3"/>
      <line x1="130" y1="152" x2="270" y2="152" stroke="#A8E8F9" stroke-width="3"/>
      <rect x="180" y="42" width="40" height="14" rx="4" fill="#F5A201"/>
    </svg>
  `),
  suspension: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#F1F5F9"/>
      <rect x="190" y="32" width="20" height="176" rx="8" fill="#013C58"/>
      <path d="M160 65 L240 82 L160 99 L240 116 L160 133 L240 150 L160 167" fill="none" stroke="#F5A201" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="200" cy="34" r="14" fill="#00537A"/>
      <circle cx="200" cy="206" r="14" fill="#00537A"/>
    </svg>
  `),
};

const allServiceItems: ServiceItem[] = [
  // Deals / Promo Unggulan
  {
    id: 'pkg-tuneup',
    title: 'Paket Servis Berkala 10.000 KM & Tune Up 3D',
    category: 'Tune Up Mesin',
    shelf: 'promo',
    price: 550000,
    originalPrice: 680000,
    discountBadge: '-19%',
    duration: '± 90 Menit',
    rating: 5,
    reviews: 142,
    image: illustrations.tuneUp,
    description: 'Scan ECU OBD2, pembersihan throttle body, injektor, ruang bakar, dan cek 25 titik.',
  },
  {
    id: 'pkg-spooring-deal',
    title: 'Paket Spooring 3D, Balancing 4 Roda & Cek Rem',
    category: 'Kaki-Kaki & Spooring',
    shelf: 'promo',
    price: 250000,
    originalPrice: 320000,
    discountBadge: '-22%',
    duration: '± 45 Menit',
    rating: 5,
    reviews: 98,
    image: illustrations.spooring,
    description: 'Kalibrasi sudut roda komputerisasi 3D, balancing 4 ban, dan pembersihan kaliper rem.',
  },

  // Rak 1: Perawatan Mesin & Pelumas
  {
    id: 'pkg-oli-sintetik',
    title: 'Ganti Oli Full Synthetic 4L & Filter Oli Original',
    category: 'Oli & Pelumas',
    shelf: 'mesin',
    price: 350000,
    originalPrice: 400000,
    discountBadge: '-12%',
    duration: '± 30 Menit',
    rating: 5,
    reviews: 215,
    image: illustrations.oil,
    description: 'Penggantian oli mesin sintetik 4 liter, filter oli baru, dan pengecekan fluida.',
  },
  {
    id: 'pkg-gurah-mesin',
    title: 'Carbon Clean & Gurah Ruang Bakar Mesin',
    category: 'Tune Up Mesin',
    shelf: 'mesin',
    price: 280000,
    duration: '± 60 Menit',
    rating: 5,
    reviews: 74,
    image: illustrations.tuneUp,
    description: 'Mengangkat kerak karbon di ruang bakar untuk mengembalikan akselerasi dan efisiensi BBM.',
  },
  {
    id: 'pkg-oli-matic',
    title: 'Kuras Oli Transmisi Matic (ATF / CVT Flushing)',
    category: 'Oli & Pelumas',
    shelf: 'mesin',
    price: 620000,
    duration: '± 60 Menit',
    rating: 5,
    reviews: 63,
    image: illustrations.oil,
    description: 'Flushing menyeluruh oli transmisi otomatis menggunakan mesin ATF changer.',
  },
  {
    id: 'pkg-radiator',
    title: 'Kuras Radiator Coolant & Cek Sistem Pendingin',
    category: 'Sistem Pendingin',
    shelf: 'mesin',
    price: 195000,
    duration: '± 40 Menit',
    rating: 4,
    reviews: 51,
    image: illustrations.radiator,
    description: 'Pengurasan air radiator lama, isi ulang coolant pabrikan, dan tes tekanan tutup radiator.',
  },

  // Rak 2: Kaki-Kaki, Rem & Kelistrikan AC
  {
    id: 'pkg-kampas-rem',
    title: 'Ganti Kampas Rem Depan & Bubut Piringan Cakram',
    category: 'Sistem Rem',
    shelf: 'kaki-ac',
    price: 420000,
    originalPrice: 490000,
    discountBadge: '-14%',
    duration: '± 60 Menit',
    rating: 5,
    reviews: 89,
    image: illustrations.brake,
    description: 'Penggantian brake pad OEM, pelumasan pin kaliper, dan perataan permukaan cakram.',
  },
  {
    id: 'pkg-aki-mobil',
    title: 'Penggantian Aki Kering MF & Tes Alternator',
    category: 'Kelistrikan & Aki',
    shelf: 'kaki-ac',
    price: 780000,
    duration: '± 25 Menit',
    rating: 5,
    reviews: 112,
    image: illustrations.battery,
    description: 'Pemasangan aki bebas perawatan bergaransi 12 bulan plus cek pengisian dinamo ampere.',
  },
  {
    id: 'pkg-ac-flushing',
    title: 'Flushing Freon AC R134a & Ganti Filter Kabin',
    category: 'AC & Kelistrikan',
    shelf: 'kaki-ac',
    price: 320000,
    originalPrice: 380000,
    discountBadge: '-16%',
    duration: '± 60 Menit',
    rating: 5,
    reviews: 130,
    image: illustrations.ac,
    description: 'Kuras oli kompresor, isi ulang freon murni, pembersihan evaporator, dan filter kabin baru.',
  },
  {
    id: 'pkg-shockbreaker',
    title: 'Inspeksi Kaki-Kaki, Tie Rod & Shockbreaker',
    category: 'Kaki-Kaki & Spooring',
    shelf: 'kaki-ac',
    price: 150000,
    duration: '± 35 Menit',
    rating: 5,
    reviews: 47,
    image: illustrations.suspension,
    description: 'Pengecekan menyeluruh ball joint, rack steer, bushing arm, dan peredam kejut.',
  },
];

const categoryIcons = [
  { name: 'Oli & Pelumas', count: '4 Paket', icon: 'fa-oil-can' },
  { name: 'Sistem Rem', count: '3 Paket', icon: 'fa-compact-disc' },
  { name: 'Kaki-Kaki & Spooring', count: '4 Paket', icon: 'fa-car-side' },
  { name: 'Sistem Pendingin', count: '2 Paket', icon: 'fa-temperature-low' },
  { name: 'Tune Up Mesin', count: '5 Paket', icon: 'fa-gears' },
  { name: 'AC & Kelistrikan', count: '3 Paket', icon: 'fa-snowflake' },
  { name: 'Kelistrikan & Aki', count: '3 Paket', icon: 'fa-car-battery' },
  { name: 'Inspeksi Lengkap', count: '2 Paket', icon: 'fa-clipboard-check' },
];

const vehicleModelsByBrand: Record<string, string[]> = {
  Honda: ['HR-V', 'BR-V', 'Brio', 'City Hatchback', 'Civic', 'CR-V'],
  Toyota: ['Avanza', 'Veloz', 'Innova Reborn', 'Rush', 'Yaris', 'Fortuner'],
  Mitsubishi: ['Xpander', 'Pajero Sport', 'Xforce', 'Mirage'],
  Suzuki: ['Ertiga', 'XL7', 'Baleno', 'Ignis'],
  Daihatsu: ['Xenia', 'Terios', 'Sigra', 'Rocky'],
  Hyundai: ['Creta', 'Stargazer', 'Ioniq 5', 'Santa Fe'],
};

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function UserServicePortalPage() {
  // Vehicle Selector State
  const [selectedBrand, setSelectedBrand] = useState('Honda');
  const [selectedModel, setSelectedModel] = useState('HR-V');
  const [selectedYear, setSelectedYear] = useState('2022');
  const [selectedBranch, setSelectedBranch] = useState('Cabang Utama Depok');
  const [vehicleApplied, setVehicleApplied] = useState(true);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [savedIds, setSavedIds] = useState<string[]>(['pkg-tuneup', 'pkg-oli-sintetik']);

  // Booking Cart & Drawer State
  const [bookingCart, setBookingCart] = useState<ServiceItem[]>([allServiceItems[0]]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Checkout Form State
  const [plateNumber, setPlateNumber] = useState('B 1420 SKD');
  const [bookingDate, setBookingDate] = useState('2026-11-16');
  const [bookingTime, setBookingTime] = useState('10:00 WIB');
  const [complaintNote, setComplaintNote] = useState('');
  const [bookingSuccessCode, setBookingSuccessCode] = useState<string | null>(null);

  // Active Workshop Status
  const [activeTicket, setActiveTicket] = useState({
    code: 'TL-8821',
    vehicle: 'Honda HR-V (B 1420 SKD)',
    branch: 'Cabang Utama Depok',
    service: 'Servis Berkala 10.000 KM & Tune Up 3D',
    pit: 'Pit 2 • Mekanik Ahmad S.',
    status: 'Sedang Dikerjakan',
    progress: 70,
  });

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const models = vehicleModelsByBrand[brand] || ['Model Standar'];
    setSelectedModel(models[0]);
  };

  const toggleSaveItem = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToBookingCart = (item: ServiceItem) => {
    setBookingCart((prev) => {
      if (prev.some((existing) => existing.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
    setBookingSuccessCode(null);
    setIsCartOpen(true);
  };

  const removeFromBookingCart = (id: string) => {
    setBookingCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCost = bookingCart.reduce((sum, item) => sum + item.price, 0);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingCart.length === 0) return;

    const generatedCode = `TL-${Math.floor(1000 + Math.random() * 9000)}`;
    const serviceNames = bookingCart.map((s) => s.title).join(' + ');

    setActiveTicket({
      code: generatedCode,
      vehicle: `${selectedBrand} ${selectedModel} (${plateNumber.toUpperCase()})`,
      branch: selectedBranch,
      service: serviceNames,
      pit: 'Pit 1 • Terjadwal',
      status: 'Menunggu Kedatangan',
      progress: 15,
    });

    setBookingSuccessCode(generatedCode);
    setBookingCart([]);
  };

  const promoItems = allServiceItems.filter((item) => item.shelf === 'promo');
  const mesinItems = allServiceItems.filter((item) => item.shelf === 'mesin');
  const kakiAcItems = allServiceItems.filter((item) => item.shelf === 'kaki-ac');

  const searchedItems =
    searchQuery.trim() || activeCategory !== 'Semua'
      ? allServiceItems.filter((item) => {
          const matchQuery =
            !searchQuery.trim() ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
          const matchCat =
            activeCategory === 'Semua' || item.category === activeCategory;
          return matchQuery && matchCat;
        })
      : [];

  return (
    <div className="min-h-screen bg-[#f5f7f9] font-sans text-slate-800">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-white border-b border-slate-200/80 text-[11px] text-slate-500 px-6 py-2">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <span>
            Selamat datang di portal pelanggan{' '}
            <strong className="text-[#013C58]">Tallero Auto Service</strong>, Armitha Hadi
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(true)}
              className="hover:text-[#00537A] font-medium transition-colors"
            >
              Lacak Status Pit ({activeTicket.code})
            </button>
            <span className="text-slate-300">|</span>
            <Link href="/#kontak" className="hover:text-[#00537A] transition-colors">
              Bantuan Bengkel
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/login" className="text-[#013C58] font-semibold hover:text-[#00537A]">
              Keluar
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo + Search Bar + Keranjang Booking) */}
      <header className="bg-white px-6 py-4 border-b border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#013C58] text-[#F5A201] flex items-center justify-center shadow-xs">
                <i className="fa-solid fa-gear text-base"></i>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-[#013C58] block leading-none">
                  TALLERO
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-[#00537A]">
                  Service &amp; Booking Portal
                </span>
              </div>
            </Link>

            {/* Mobile Booking Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-[#013C58] text-white text-xs font-semibold"
            >
              <i className="fa-solid fa-calendar-check text-[#F5A201]"></i>
              <span>Booking ({bookingCart.length})</span>
            </button>
          </div>

          {/* Search Bar Tengah */}
          <div className="w-full lg:w-[460px] flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 focus-within:bg-white focus-within:border-[#00537A] transition-colors">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              aria-label="Filter Kategori"
              className="px-3 py-2.5 text-xs font-medium text-slate-600 bg-transparent border-r border-slate-200 focus:outline-none hidden sm:block"
            >
              <option value="Semua">Semua Kategori</option>
              {categoryIcons.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari paket ganti oli, tune up, kampas rem, aki..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-transparent focus:outline-none text-slate-700"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-2 text-slate-400 hover:text-slate-600 text-xs"
                aria-label="Hapus pencarian"
              >
                ✕
              </button>
            )}
            <button
              type="button"
              aria-label="Cari Paket"
              className="px-4 py-2.5 bg-[#013C58] hover:bg-[#00537A] text-white text-xs transition-colors"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(true)}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#A8E8F9]/40 text-[#013C58] flex items-center justify-center transition-colors">
                <i className="fa-solid fa-car-on text-sm"></i>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">Status Pit Aktif</span>
                <span className="text-xs font-bold text-[#013C58] group-hover:text-[#00537A]">
                  {activeTicket.code}
                </span>
              </div>
            </button>

            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-[#013C58]">
              <i className="fa-regular fa-heart text-sm"></i>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00537A] text-white text-[10px] font-bold flex items-center justify-center">
                {savedIds.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 pl-3 border-l border-slate-200 text-left group"
            >
              <div className="relative w-9 h-9 rounded-full bg-[#013C58] text-white flex items-center justify-center group-hover:bg-[#00537A] transition-colors">
                <i className="fa-solid fa-clipboard-list text-sm"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F5A201] text-[#013C58] text-[10px] font-extrabold flex items-center justify-center">
                  {bookingCart.length}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">Daftar Booking</span>
                <span className="text-xs font-bold text-[#013C58]">
                  {formatRupiah(totalCost)}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 3. SUB-NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200/80 px-6 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-6 overflow-x-auto py-3">
            <button
              type="button"
              onClick={() => {
                setActiveCategory('Semua');
                setSearchQuery('');
              }}
              className="font-bold text-[#013C58] whitespace-nowrap"
            >
              Katalog Paket Servis
            </button>
            <a
              href="#promo-bulanan"
              className="font-medium text-slate-600 hover:text-[#00537A] whitespace-nowrap"
            >
              Promo Bulan Ini
            </a>
            <a
              href="#rak-mesin"
              className="font-medium text-slate-600 hover:text-[#00537A] whitespace-nowrap"
            >
              Perawatan Mesin &amp; Oli
            </a>
            <a
              href="#rak-kaki-ac"
              className="font-medium text-slate-600 hover:text-[#00537A] whitespace-nowrap"
            >
              Kaki-Kaki, Rem &amp; AC
            </a>
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(true)}
              className="font-medium text-slate-600 hover:text-[#00537A] whitespace-nowrap"
            >
              Pantau Pengerjaan
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500">
            <i className="fa-solid fa-location-dot text-[#F5A201]"></i>
            <span>Cabang Aktif:</span>
            <strong className="text-[#013C58]">{selectedBranch}</strong>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-5 space-y-6">
        {/* 4. DARK VEHICLE SELECTOR BAR */}
        <section className="bg-[#013C58] rounded-xl p-3.5 md:px-5 md:py-3.5 text-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            <div className="lg:col-span-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#F5A201]/20 text-[#F5A201] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-car text-sm"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">
                  Pilih Kendaraan Anda
                </p>
                <p className="text-[10px] text-[#A8E8F9]">
                  Sesuaikan paket dengan tipe mobil
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                aria-label="Pilih Merek"
                className="px-2.5 py-2 rounded-lg bg-white text-slate-800 text-xs font-medium focus:outline-none"
              >
                {Object.keys(vehicleModelsByBrand).map((brand) => (
                  <option key={brand} value={brand}>
                    1. {brand}
                  </option>
                ))}
              </select>

              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                aria-label="Pilih Model"
                className="px-2.5 py-2 rounded-lg bg-white text-slate-800 text-xs font-medium focus:outline-none"
              >
                {(vehicleModelsByBrand[selectedBrand] || []).map((model) => (
                  <option key={model} value={model}>
                    2. {model}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Pilih Tahun"
                className="px-2.5 py-2 rounded-lg bg-white text-slate-800 text-xs font-medium focus:outline-none"
              >
                {['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'].map((yr) => (
                  <option key={yr} value={yr}>
                    3. Tahun {yr}
                  </option>
                ))}
              </select>

              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                aria-label="Pilih Cabang"
                className="px-2.5 py-2 rounded-lg bg-white text-slate-800 text-xs font-medium focus:outline-none"
              >
                <option value="Cabang Utama Depok">4. Outlet Depok</option>
                <option value="Cabang Bogor City">4. Outlet Bogor</option>
                <option value="Cabang Jakarta Selatan">4. Outlet Jaksel</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <button
                type="button"
                onClick={() => setVehicleApplied(true)}
                className="w-full py-2 px-3 rounded-lg bg-[#F5A201] hover:bg-[#e09300] text-[#013C58] font-bold text-xs transition-colors"
              >
                Terapkan Unit
              </button>
            </div>
          </div>

          {vehicleApplied && (
            <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-200">
              <span>
                Unit aktif:{' '}
                <strong className="text-[#F5A201]">
                  {selectedBrand} {selectedModel} ({selectedYear})
                </strong>{' '}
                • Lokasi: <strong className="text-white">{selectedBranch}</strong>
              </span>
              <span className="text-[#A8E8F9]">Kapasitas Pit Tersedia Hari Ini</span>
            </div>
          )}
        </section>

        {/* HASIL PENCARIAN / FILTER JIKA AKTIF */}
        {(searchQuery.trim() !== '' || activeCategory !== 'Semua') && (
          <section className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#013C58]">
                  Hasil Filter Paket Servis ({searchedItems.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Kategori: {activeCategory} {searchQuery && `• Kata kunci: "${searchQuery}"`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('Semua');
                  setSearchQuery('');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700"
              >
                Reset Filter
              </button>
            </div>

            {searchedItems.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                Paket servis tidak ditemukan. Coba kata kunci lain seperti oli, rem, atau AC.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {searchedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex flex-col justify-between hover:border-[#00537A] transition-colors"
                  >
                    <div>
                      <div className="relative h-32 rounded-lg overflow-hidden bg-slate-100 mb-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.discountBadge && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#F5A201] text-[#013C58] text-[10px] font-bold">
                            {item.discountBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-[#00537A]">{item.category}</span>
                      <h3 className="text-xs font-semibold text-[#013C58] mt-0.5 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm font-bold text-[#013C58] mt-2">
                        {formatRupiah(item.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToBookingCart(item)}
                      className="mt-3 w-full py-2 rounded-lg bg-[#013C58] hover:bg-[#00537A] text-white font-semibold text-[11px] transition-colors"
                    >
                      Pilih Paket
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 5. HERO BANNER UTAMA */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#e7eff4] via-[#eef5f9] to-[#d9eaf3] border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-3.5">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#00537A]">
              Penawaran Khusus Pelanggan Terdaftar
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#013C58] leading-tight">
              Hemat Hingga <span className="text-[#F5A201]">Rp 130.000</span>{' '}
              <span className="block text-xl sm:text-2xl font-bold mt-0.5">
                Paket Ganti Oli Sintetik &amp; Tune Up
              </span>
            </h1>
            <p className="text-xs text-slate-600 max-w-md leading-relaxed">
              Pilih paket perawatan sesuai kebutuhan {selectedBrand} {selectedModel} Anda dan kunci jam kedatangan di pit tanpa perlu mengantre.
            </p>
            <div className="pt-1 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => addToBookingCart(allServiceItems[0])}
                className="px-5 py-2.5 rounded-lg bg-[#013C58] hover:bg-[#00537A] text-white font-bold text-xs transition-colors shadow-xs"
              >
                Booking Paket Ini
              </button>
              <a
                href="#rak-mesin"
                className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-[#013C58] border border-slate-200 font-semibold text-xs transition-colors"
              >
                Lihat Semua Paket
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 h-56 sm:h-72 bg-[#013C58]">
            <img
              src={illustrations.heroBanner}
              alt="Servis Mesin dan Ganti Oli Tallero"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* 6. STRIP 8 KATEGORI SERVIS */}
        <section className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categoryIcons.map((cat) => {
              const isSelected = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(isSelected ? 'Semua' : cat.name)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'border-[#013C58] bg-[#A8E8F9]/30'
                      : 'border-slate-100 hover:border-[#00537A]/40 bg-slate-50/60'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200/80 text-[#013C58] flex items-center justify-center text-sm shadow-2xs">
                    <i className={`fa-solid ${cat.icon}`}></i>
                  </div>
                  <span className="text-[11px] font-semibold text-[#013C58] leading-tight">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400">{cat.count}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 7. BENTO 3 BANNER PROMO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Banner 1: Amber */}
          <div
            style={{ background: 'linear-gradient(135deg, #F5A201 0%, #e08e00 100%)' }}
            className="rounded-xl text-[#013C58] p-5 flex flex-col justify-between min-h-[155px] shadow-2xs"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/40 px-2 py-0.5 rounded">
                Hemat Hingga 20%
              </span>
              <h3 className="text-lg font-extrabold mt-2 leading-snug">
                OLI SINTETIK &amp; FILTER ASLI
              </h3>
              <p className="text-xs font-medium text-[#013C58]/85 mt-0.5">
                Gratis cek 15 titik fluida mesin
              </p>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => addToBookingCart(allServiceItems[2])}
                className="px-4 py-1.5 rounded-lg bg-[#013C58] hover:bg-[#00537A] text-white font-semibold text-[11px] transition-colors"
              >
                Pilih Paket Oli
              </button>
            </div>
          </div>

          {/* Banner 2: Sky / Light Teal */}
          <div
            style={{ background: 'linear-gradient(135deg, #d8f1fa 0%, #b8e5f5 100%)' }}
            className="rounded-xl text-[#013C58] p-5 flex flex-col justify-between min-h-[155px] border border-[#A8E8F9]"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00537A]">
                Kalibrasi Komputerisasi
              </span>
              <h3 className="text-lg font-extrabold mt-1.5 leading-snug">
                SPOORING 3D &amp; BALANCING
              </h3>
              <p className="text-xs text-slate-700 mt-0.5">
                Setir stabil dan ban lebih awet
              </p>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => addToBookingCart(allServiceItems[1])}
                className="px-4 py-1.5 rounded-lg bg-[#013C58] hover:bg-[#00537A] text-white font-semibold text-[11px] transition-colors"
              >
                Booking Spooring
              </button>
            </div>
          </div>

          {/* Banner 3: Dark Navy */}
          <div
            style={{ background: 'linear-gradient(135deg, #012436 0%, #013C58 100%)' }}
            className="rounded-xl text-white p-5 flex flex-col justify-between min-h-[155px]"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5A201]">
                Siaga Perjalanan
              </span>
              <h3 className="text-lg font-extrabold mt-1.5 leading-snug">
                SERVIS AC &amp; AKI BERGARANSI
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Gratis pengecekan tegangan alternator
              </p>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => addToBookingCart(allServiceItems[7])}
                className="px-4 py-1.5 rounded-lg bg-[#F5A201] hover:bg-[#e09300] text-[#013C58] font-bold text-[11px] transition-colors"
              >
                Pilih Paket Aki
              </button>
            </div>
          </div>
        </section>

        {/* 8. PAKET PROMO BULAN INI + KARTU STATUS SERVIS AKTIF */}
        <section id="promo-bulanan" className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Kiri 8 Kolom */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#013C58]">
                Paket Servis Pilihan Bulan Ini
              </h2>
              <span className="text-[11px] font-medium text-[#00537A]">
                Harga transparan termasuk jasa mekanik
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promoItems.map((deal) => (
                <div
                  key={deal.id}
                  className="rounded-xl border border-slate-200/80 p-3.5 flex gap-3.5 items-center hover:border-[#00537A]/50 transition-colors"
                >
                  <div className="relative w-28 h-28 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover"
                    />
                    {deal.discountBadge && (
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#F5A201] text-[#013C58] text-[10px] font-bold">
                        {deal.discountBadge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-[#013C58]">
                        {formatRupiah(deal.price)}
                      </span>
                      {deal.originalPrice && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatRupiah(deal.originalPrice)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-semibold text-slate-800 leading-snug">
                      {deal.title}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {deal.category} • {deal.duration}
                    </p>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => addToBookingCart(deal)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#013C58] hover:bg-[#00537A] text-white font-semibold text-[11px] transition-colors"
                      >
                        Pilih Paket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kanan 4 Kolom: Live Workshop Status Card */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00537A]">
                  Status Pit Anda
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  {activeTicket.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#013C58]">
                  {activeTicket.vehicle}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Kode: <strong className="font-mono text-[#013C58]">{activeTicket.code}</strong> •{' '}
                  {activeTicket.pit}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-[#013C58]">
                  <span>Progres Pengerjaan</span>
                  <span>{activeTicket.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00537A] rounded-full transition-all"
                    style={{ width: `${activeTicket.progress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1">
                  {activeTicket.service}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsStatusModalOpen(true)}
              className="mt-4 w-full py-2 rounded-lg bg-[#013C58] hover:bg-[#00537A] text-white font-semibold text-xs transition-colors"
            >
              Lihat Detail Pengerjaan
            </button>
          </div>
        </section>

        {/* 9. RAK KATEGORI 1: PERAWATAN MESIN & PELUMAS */}
        <section id="rak-mesin" className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Banner Kiri */}
            <div className="lg:col-span-3 relative bg-[#013C58] text-white p-6 flex flex-col justify-between min-h-[260px]">
              <img
                src={illustrations.tuneUp}
                alt="Perawatan Mesin"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="relative z-10 space-y-3">
                <h2 className="text-lg font-bold leading-snug">
                  Perawatan Mesin &amp; Pelumas
                </h2>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  <li>• Ganti Oli Sintetik</li>
                  <li>• Tune Up &amp; Scan ECU</li>
                  <li>• Gurah Ruang Bakar</li>
                  <li>• Flushing Oli Matic</li>
                  <li>• Kuras Radiator</li>
                </ul>
              </div>
              <div className="relative z-10 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveCategory('Oli & Pelumas')}
                  className="px-4 py-1.5 rounded-lg bg-[#F5A201] text-[#013C58] font-bold text-[11px]"
                >
                  Filter Kategori Ini
                </button>
              </div>
            </div>

            {/* 4 Kartu Paket Kanan */}
            <div className="lg:col-span-9 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mesinItems.map((item) => {
                const isSaved = savedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between hover:shadow-sm hover:border-[#00537A]/40 transition-all"
                  >
                    <div>
                      <div className="relative h-32 rounded-lg overflow-hidden bg-slate-100 mb-2.5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.discountBadge && (
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#F5A201] text-[#013C58] text-[10px] font-bold">
                            {item.discountBadge}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleSaveItem(item.id)}
                          aria-label="Simpan Paket"
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-[11px]"
                        >
                          <i
                            className={
                              isSaved
                                ? 'fa-solid fa-heart text-[#F5A201]'
                                : 'fa-regular fa-heart text-slate-400'
                            }
                          ></i>
                        </button>
                      </div>

                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-[#013C58]">
                          {formatRupiah(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            {formatRupiah(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs font-semibold text-slate-800 mt-1 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{item.duration}</span>
                        <span className="text-[#F5A201]">
                          {'★'.repeat(item.rating)} ({item.reviews})
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToBookingCart(item)}
                      className="mt-3 w-full py-2 rounded-lg bg-[#013C58] hover:bg-[#00537A] text-white font-semibold text-[11px] transition-colors"
                    >
                      Pilih Paket
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. RAK KATEGORI 2: KAKI-KAKI, REM & AC */}
        <section id="rak-kaki-ac" className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Banner Kiri */}
            <div className="lg:col-span-3 relative bg-[#01293d] text-white p-6 flex flex-col justify-between min-h-[260px]">
              <img
                src={illustrations.brake}
                alt="Sistem Rem dan Kaki-Kaki"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="relative z-10 space-y-3">
                <h2 className="text-lg font-bold leading-snug">
                  Kaki-Kaki, Rem &amp; Sistem AC
                </h2>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  <li>• Kampas &amp; Cakram Rem</li>
                  <li>• Spooring &amp; Balancing 3D</li>
                  <li>• Penggantian Aki Kering</li>
                  <li>• Flushing Freon AC</li>
                  <li>• Inspeksi Shockbreaker</li>
                </ul>
              </div>
              <div className="relative z-10 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveCategory('Sistem Rem')}
                  className="px-4 py-1.5 rounded-lg bg-[#F5A201] text-[#013C58] font-bold text-[11px]"
                >
                  Filter Kategori Ini
                </button>
              </div>
            </div>

            {/* 4 Kartu Paket Kanan */}
            <div className="lg:col-span-9 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kakiAcItems.map((item) => {
                const isSaved = savedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between hover:shadow-sm hover:border-[#00537A]/40 transition-all"
                  >
                    <div>
                      <div className="relative h-32 rounded-lg overflow-hidden bg-slate-100 mb-2.5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.discountBadge && (
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#F5A201] text-[#013C58] text-[10px] font-bold">
                            {item.discountBadge}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleSaveItem(item.id)}
                          aria-label="Simpan Paket"
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-[11px]"
                        >
                          <i
                            className={
                              isSaved
                                ? 'fa-solid fa-heart text-[#F5A201]'
                                : 'fa-regular fa-heart text-slate-400'
                            }
                          ></i>
                        </button>
                      </div>

                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-[#013C58]">
                          {formatRupiah(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            {formatRupiah(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs font-semibold text-slate-800 mt-1 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{item.duration}</span>
                        <span className="text-[#F5A201]">
                          {'★'.repeat(item.rating)} ({item.reviews})
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToBookingCart(item)}
                      className="mt-3 w-full py-2 rounded-lg bg-[#013C58] hover:bg-[#00537A] text-white font-semibold text-[11px] transition-colors"
                    >
                      Pilih Paket
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 11. BOTTOM 3 PROMO BANNERS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
          <div className="rounded-xl bg-[#01293d] text-white p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase text-[#A8E8F9]">
                Perlindungan Purna Servis
              </span>
              <h3 className="text-base font-bold mt-1">GARANSI RESMI 14 HARI</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Gratis pengecekan ulang di seluruh cabang Tallero.
              </p>
            </div>
          </div>

          <div
            style={{ background: 'linear-gradient(135deg, #013C58 0%, #00537A 100%)' }}
            className="rounded-xl text-white p-5 flex flex-col justify-between shadow-xs"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase text-[#F5A201]">
                Reservasi Online
              </span>
              <h3 className="text-base font-bold mt-1 text-white">PIT TERKUNCI SESUAI JADWAL</h3>
              <p className="text-[11px] text-slate-200 mt-0.5">
                Datang sesuai jam booking dan langsung ditangani mekanik.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#011f2e] text-white p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase text-[#F5A201]">
                Transparansi Biaya
              </span>
              <h3 className="text-base font-bold mt-1">SUKU CADANG OEM BERGARANSI</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Konfirmasi harga suku cadang sebelum pemasangan.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 12. FOOTER PORTAL PELANGGAN TALLERO */}
      <footer className="bg-[#012436] text-slate-300 border-t border-[#013C58]">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {/* Kolom 1: Brand & Kontak Cepat */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#013C58] text-[#F5A201] flex items-center justify-center border border-white/10">
                <i className="fa-solid fa-gear text-sm"></i>
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-white block leading-none">
                  TALLERO
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-[#A8E8F9]">
                  Auto Service &amp; Care
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Bengkel perawatan dan perbaikan mobil modern dengan booking pit online, estimasi biaya transparan, dan garansi pengerjaan 14 hari.
            </p>
            <div className="pt-1 space-y-1.5 text-[11px]">
              <p className="flex items-center gap-2 text-slate-300">
                <i className="fa-solid fa-clock text-[#F5A201] w-3.5"></i>
                <span>Setiap Hari: 08.00 – 17.00 WIB</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <i className="fa-solid fa-phone text-[#F5A201] w-3.5"></i>
                <span>(021) 7889-4410 • Layanan Darurat</span>
              </p>
            </div>
          </div>

          {/* Kolom 2: Kategori Paket Servis */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Kategori Layanan
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>
                <a href="#promo-bulanan" className="hover:text-[#F5A201] transition-colors">
                  Paket Servis Berkala &amp; Tune Up
                </a>
              </li>
              <li>
                <a href="#rak-mesin" className="hover:text-[#F5A201] transition-colors">
                  Ganti Oli Sintetik &amp; Flushing Matic
                </a>
              </li>
              <li>
                <a href="#rak-kaki-ac" className="hover:text-[#F5A201] transition-colors">
                  Spooring 3D, Balancing &amp; Rem
                </a>
              </li>
              <li>
                <a href="#rak-kaki-ac" className="hover:text-[#F5A201] transition-colors">
                  Perawatan AC &amp; Penggantian Aki
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Lokasi Cabang Bengkel */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Cabang Bengkel
            </h4>
            <ul className="space-y-2.5 text-[11px] text-slate-400">
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-location-dot text-[#F5A201] mt-0.5"></i>
                <div>
                  <strong className="text-slate-200 block">Cabang Utama Depok</strong>
                  <span>Jl. Margonda Raya No. 214, Depok</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-location-dot text-[#F5A201] mt-0.5"></i>
                <div>
                  <strong className="text-slate-200 block">Cabang Bogor City</strong>
                  <span>Jl. Pajajaran Indah No. 48, Bogor</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-location-dot text-[#F5A201] mt-0.5"></i>
                <div>
                  <strong className="text-slate-200 block">Cabang Jakarta Selatan</strong>
                  <span>Jl. RS Fatmawati No. 89, Jaksel</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Akses Cepat Pelanggan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Portal Pelanggan
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => setIsStatusModalOpen(true)}
                  className="hover:text-[#F5A201] transition-colors text-left"
                >
                  Lacak Progres Pit ({activeTicket.code})
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-[#F5A201] transition-colors text-left"
                >
                  Daftar Paket Booking ({bookingCart.length})
                </button>
              </li>
              <li>
                <Link href="/" className="hover:text-[#F5A201] transition-colors">
                  Beranda Utama Tallero
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#F5A201] transition-colors">
                  Keluar dari Akun
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="border-t border-white/10 bg-[#011b29] px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>© 2026 Tallero Auto Service. Seluruh hak cipta dilindungi.</p>
            <div className="flex flex-wrap items-center gap-3 text-[10px]">
              <span className="text-[#A8E8F9]">Garansi Servis 14 Hari</span>
              <span>•</span>
              <span>Suku Cadang OEM</span>
              <span>•</span>
              <span>Estimasi Biaya Transparan</span>
            </div>
          </div>
        </div>
      </footer>

      {/* DRAWER KERANJANG BOOKING SERVIS (SLIDE-OVER KANAN) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Drawer Header */}
            <div className="bg-[#013C58] text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F5A201]">
                  Formulir Reservasi Pit
                </span>
                <h2 className="text-base font-bold">
                  Daftar Paket Booking ({bookingCart.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
              {bookingSuccessCode ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="text-base font-bold text-[#013C58]">
                    Booking Pit Berhasil Dibuat
                  </h3>
                  <p className="text-slate-600">
                    Kode Reservasi Anda adalah{' '}
                    <strong className="font-mono text-[#013C58] bg-white px-2 py-0.5 rounded border border-emerald-200">
                      {bookingSuccessCode}
                    </strong>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Silakan datang ke <strong>{selectedBranch}</strong> pada{' '}
                    <strong>{bookingDate}</strong> pukul <strong>{bookingTime}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setBookingSuccessCode(null);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-2.5 rounded-lg bg-[#013C58] text-white font-bold"
                  >
                    Kembali ke Katalog
                  </button>
                </div>
              ) : (
                <>
                  {/* Daftar Paket Dipilih */}
                  <div className="space-y-2.5">
                    <p className="font-semibold text-[#013C58]">Paket Layanan Dipilih:</p>
                    {bookingCart.length === 0 ? (
                      <div className="p-6 rounded-xl border border-dashed border-slate-200 text-center text-slate-400">
                        Belum ada paket servis dipilih. Silakan pilih paket dari katalog.
                      </div>
                    ) : (
                      bookingCart.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                        >
                          <div>
                            <p className="font-semibold text-[#013C58]">{item.title}</p>
                            <p className="text-[11px] text-[#00537A] font-bold mt-0.5">
                              {formatRupiah(item.price)} • {item.duration}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromBookingCart(item.id)}
                            className="text-slate-400 hover:text-red-600 px-2 py-1"
                            aria-label="Hapus paket"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Form Jadwal & Kendaraan */}
                  {bookingCart.length > 0 && (
                    <form
                      id="confirm-booking-form"
                      onSubmit={handleConfirmBooking}
                      className="space-y-3.5 pt-3 border-t border-slate-100"
                    >
                      <div className="p-3 rounded-xl bg-[#A8E8F9]/30 border border-[#A8E8F9]">
                        <span className="text-[10px] font-semibold text-[#00537A] uppercase block">
                          Unit &amp; Cabang Tujuan
                        </span>
                        <p className="font-bold text-[#013C58] mt-0.5">
                          {selectedBrand} {selectedModel} ({selectedYear}) — {selectedBranch}
                        </p>
                      </div>

                      <div>
                        <label className="block font-semibold text-[#013C58] mb-1">
                          Nomor Polisi Kendaraan
                        </label>
                        <input
                          type="text"
                          required
                          value={plateNumber}
                          onChange={(e) => setPlateNumber(e.target.value)}
                          placeholder="Contoh: B 1420 SKD"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg uppercase font-mono focus:outline-none focus:border-[#00537A]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-[#013C58] mb-1">
                            Tanggal Kedatangan
                          </label>
                          <input
                            type="date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00537A]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-[#013C58] mb-1">
                            Jam Slot Pit
                          </label>
                          <select
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-[#00537A]"
                          >
                            <option value="08:30 WIB">08:30 WIB</option>
                            <option value="10:00 WIB">10:00 WIB</option>
                            <option value="13:00 WIB">13:00 WIB</option>
                            <option value="15:00 WIB">15:00 WIB</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-[#013C58] mb-1">
                          Catatan Keluhan Tambahan (Opsional)
                        </label>
                        <textarea
                          rows={2}
                          value={complaintNote}
                          onChange={(e) => setComplaintNote(e.target.value)}
                          placeholder="Contoh: Bunyi berdecit saat mengerem pelan..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00537A]"
                        />
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* Drawer Footer */}
            {!bookingSuccessCode && bookingCart.length > 0 && (
              <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3 shrink-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Total Estimasi Biaya</span>
                  <span className="text-base font-extrabold text-[#013C58]">
                    {formatRupiah(totalCost)}
                  </span>
                </div>
                <button
                  type="submit"
                  form="confirm-booking-form"
                  className="w-full py-3 rounded-xl bg-[#013C58] hover:bg-[#00537A] text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Konfirmasi Jadwal Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DETAIL STATUS PENGERJAAN PIT */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-xs">
            <div
              style={{ background: 'linear-gradient(135deg, #013C58 0%, #00537A 100%)' }}
              className="text-white px-5 py-4 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase text-[#F5A201]">
                  Live Workshop Tracker
                </span>
                <h3 className="text-base font-bold">Status Pengerjaan Kendaraan</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsStatusModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex justify-between">
                  <span className="font-mono font-bold text-[#00537A]">{activeTicket.code}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                    {activeTicket.status}
                  </span>
                </div>
                <p className="font-bold text-sm text-[#013C58]">{activeTicket.vehicle}</p>
                <p className="text-slate-500">
                  {activeTicket.branch} • {activeTicket.pit}
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#013C58] mb-1">Paket Dikerjakan:</p>
                <p className="text-slate-600">{activeTicket.service}</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold text-[#013C58]">
                  <span>Progres Pit</span>
                  <span>{activeTicket.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00537A] rounded-full"
                    style={{ width: `${activeTicket.progress}%` }}
                  ></div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsStatusModalOpen(false)}
                className="w-full py-2.5 rounded-lg bg-[#013C58] hover:bg-[#00537A] text-white font-bold transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}