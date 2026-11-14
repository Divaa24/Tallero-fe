'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ServicePackage {
  id: string;
  badge: string;
  category: string;
  title: string;
  specs: string;
  price: number;
  duration: string;
  image: string;
  isActive: boolean;
  checklist: string[];
}

const initialPackages: ServicePackage[] = [
  {
    id: 'srv-1',
    badge: 'TERLARIS',
    category: 'General Repair',
    title: 'Servis Berkala & Tune Up 3D',
    specs: 'Scan ECU • Bersih Ruang Bakar • Ganti Busi',
    price: 550000,
    duration: '± 90 Menit',
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    checklist: [
      'Pembersihan throttle body, injektor, dan ruang bakar',
      'Scanning sistem elektronik & sensor mesin via OBD2',
      'Pembersihan filter udara dan pengecekan busi',
    ],
  },
  {
    id: 'srv-2',
    badge: '',
    category: 'Perawatan Rutin',
    title: 'Ganti Oli Sintetik & Filter',
    specs: 'Oli Sintetik 4L • Filter Baru • Cek 15 Titik',
    price: 350000,
    duration: '± 30 Menit',
    image:
      'https://images.unsplash.com/photo-1635773054018-22c38833e134?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    checklist: [
      'Oli mesin full synthetic 4 liter sesuai spesifikasi pabrikan',
      'Penggantian filter oli dan gasket drain plug baru',
      'Pemeriksaan level minyak rem, air radiator, dan tekanan ban',
    ],
  },
  {
    id: 'srv-3',
    badge: '',
    category: 'Kaki-Kaki & Rem',
    title: 'Spooring 3D, Balancing & Rem',
    specs: 'Kalibrasi Sudut 3D • 4 Roda • Kampas Rem',
    price: 250000,
    duration: '± 45 Menit',
    image:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    checklist: [
      'Penyelarasan sudut camber, caster, dan toe dengan sensor 3D',
      'Balancing 4 roda untuk menghilangkan getaran di kecepatan tinggi',
      'Pembersihan kaliper dan pengukuran ketebalan kampas rem',
    ],
  },
  {
    id: 'srv-4',
    badge: 'PROMO',
    category: 'AC & Kelistrikan',
    title: 'Flushing AC & Cek Kelistrikan',
    specs: 'Freon R134a • Filter Kabin • Tes Aki',
    price: 320000,
    duration: '± 60 Menit',
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    checklist: [
      'Kuras oli kompresor dan pengisian ulang freon R134a murni',
      'Pembersihan evaporator serta pengecekan filter kabin',
      'Pengujian tegangan aki dan arus pengisian alternator',
    ],
  },
  {
    id: 'srv-5',
    badge: '',
    category: 'Mesin',
    title: 'Overhaul Ringan & Ganti Kopling',
    specs: 'Part OEM • Garansi 30 Hari • Test Drive',
    price: 1250000,
    duration: '± 4 Jam',
    image:
      'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80',
    isActive: false,
    checklist: [
      'Pembongkaran dan penggantian kampas kopling set OEM',
      'Pemeriksaan flywheel dan bearing kopling',
      'Uji jalan (test drive) dan penyetelan ulang pedal',
    ],
  },
];

const categoryOptions = [
  'Perawatan Rutin',
  'General Repair',
  'Kaki-Kaki & Rem',
  'AC & Kelistrikan',
  'Mesin',
];

const badgeOptions = [
  { label: 'Tanpa Label', value: '' },
  { label: 'TERLARIS', value: 'TERLARIS' },
  { label: 'PROMO', value: 'PROMO' },
  { label: 'HEMAT', value: 'HEMAT' },
];

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminLayananPage() {
  const [packages, setPackages] = useState<ServicePackage[]>(initialPackages);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // State Modal Tambah / Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Perawatan Rutin');
  const [formBadge, setFormBadge] = useState('');
  const [formPrice, setFormPrice] = useState('350000');
  const [formDuration, setFormDuration] = useState('± 45 Menit');
  const [formSpecs, setFormSpecs] = useState('');
  const [formImage, setFormImage] = useState(
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80'
  );
  const [formIsActive, setFormIsActive] = useState(true);
  const [formChecklist, setFormChecklist] = useState<string[]>(['']);

  // State Modal Konfirmasi Hapus
  const [deleteTarget, setDeleteTarget] = useState<ServicePackage | null>(null);

  // Filter daftar paket
  const filteredPackages = packages.filter((pkg) => {
    const matchSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.specs.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === 'Semua' || pkg.category === selectedCategory;
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && pkg.isActive) ||
      (statusFilter === 'inactive' && !pkg.isActive);
    return matchSearch && matchCategory && matchStatus;
  });

  // Statistik ringkas
  const totalCount = packages.length;
  const activeCount = packages.filter((p) => p.isActive).length;
  const promoCount = packages.filter((p) => p.badge !== '').length;
  const avgPrice =
    totalCount > 0
      ? Math.round(packages.reduce((sum, item) => sum + item.price, 0) / totalCount)
      : 0;

  const openAddModal = () => {
    setEditingId(null);
    setFormTitle('');
    setFormCategory('Perawatan Rutin');
    setFormBadge('');
    setFormPrice('350000');
    setFormDuration('± 45 Menit');
    setFormSpecs('');
    setFormImage(
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80'
    );
    setFormIsActive(true);
    setFormChecklist(['Pemeriksaan standar kendaraan']);
    setIsFormOpen(true);
  };

  const openEditModal = (pkg: ServicePackage) => {
    setEditingId(pkg.id);
    setFormTitle(pkg.title);
    setFormCategory(pkg.category);
    setFormBadge(pkg.badge);
    setFormPrice(String(pkg.price));
    setFormDuration(pkg.duration);
    setFormSpecs(pkg.specs);
    setFormImage(pkg.image);
    setFormIsActive(pkg.isActive);
    setFormChecklist(pkg.checklist.length > 0 ? [...pkg.checklist] : ['']);
    setIsFormOpen(true);
  };

  const handleChecklistChange = (index: number, value: string) => {
    const updated = [...formChecklist];
    updated[index] = value;
    setFormChecklist(updated);
  };

  const addChecklistRow = () => {
    setFormChecklist([...formChecklist, '']);
  };

  const removeChecklistRow = (index: number) => {
    if (formChecklist.length === 1) return;
    setFormChecklist(formChecklist.filter((_, idx) => idx !== index));
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedChecklist = formChecklist.map((item) => item.trim()).filter(Boolean);
    const parsedPrice = Math.max(0, Number(formPrice) || 0);

    if (editingId) {
      setPackages((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: formTitle.trim(),
                category: formCategory,
                badge: formBadge,
                price: parsedPrice,
                duration: formDuration.trim() || '± 45 Menit',
                specs: formSpecs.trim(),
                image:
                  formImage.trim() ||
                  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
                isActive: formIsActive,
                checklist: cleanedChecklist,
              }
            : item
        )
      );
    } else {
      const newPkg: ServicePackage = {
        id: `srv-${Date.now()}`,
        title: formTitle.trim(),
        category: formCategory,
        badge: formBadge,
        price: parsedPrice,
        duration: formDuration.trim() || '± 45 Menit',
        specs: formSpecs.trim(),
        image:
          formImage.trim() ||
          'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
        isActive: formIsActive,
        checklist: cleanedChecklist,
      };
      setPackages((prev) => [newPkg, ...prev]);
    }

    setIsFormOpen(false);
  };

  const togglePackageStatus = (id: string) => {
    setPackages((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setPackages((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* TOP BAR ADMIN */}
      <header className="bg-white border-b border-slate-200/80 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 mb-0.5">
              <Link href="/admin/dashboard" className="hover:text-tallero-teal transition-colors">
                Dashboard Admin
              </Link>
              <span>/</span>
              <span className="text-tallero-teal font-semibold">Paket Servis</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-tallero-navy">
              Manajemen Paket Servis
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-lg border border-slate-200 hover:border-tallero-teal text-xs font-medium text-slate-600 hover:text-tallero-navy transition-colors"
            >
              Lihat Landing Page
            </Link>
            <button
              type="button"
              onClick={openAddModal}
              className="px-4 py-2 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2"
            >
              <i className="fa-solid fa-plus text-[11px]"></i>
              <span>Tambah Paket Servis</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* 4 SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500">Total Paket Servis</p>
              <p className="text-xl font-bold text-tallero-navy mt-0.5">{totalCount} Paket</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tallero-sky/30 text-tallero-navy flex items-center justify-center text-sm">
              <i className="fa-solid fa-wrench"></i>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500">Tayang di Landing Page</p>
              <p className="text-xl font-bold text-tallero-teal mt-0.5">{activeCount} Aktif</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
              <i className="fa-solid fa-eye"></i>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500">Paket Berlabel Promo</p>
              <p className="text-xl font-bold text-tallero-navy mt-0.5">{promoCount} Paket</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tallero-amber/20 text-tallero-amber flex items-center justify-center text-sm">
              <i className="fa-solid fa-tag"></i>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-500">Rata-Rata Tarif</p>
              <p className="text-base md:text-lg font-bold text-tallero-navy mt-0.5">
                {formatRupiah(avgPrice)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tallero-navy text-tallero-amber flex items-center justify-center text-sm">
              <i className="fa-solid fa-receipt"></i>
            </div>
          </div>
        </div>

        {/* FILTER & SEARCH BAR */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {['Semua', ...categoryOptions].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-tallero-navy text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Status Select */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              aria-label="Filter Status"
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-tallero-teal"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif (Tayang)</option>
              <option value="inactive">Nonaktif (Draft)</option>
            </select>

            <div className="relative">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama paket atau spesifikasi..."
                className="w-full sm:w-64 pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-tallero-teal focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* DATA TABLE PAKET SERVIS */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Paket Servis</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Estimasi Durasi</th>
                  <th className="py-3.5 px-4">Tarif Dasar</th>
                  <th className="py-3.5 px-4">Status Tayang</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredPackages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      Tidak ada paket servis yang sesuai dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredPackages.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Paket & Thumbnail */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-14 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-tallero-navy">
                                {pkg.title}
                              </span>
                              {pkg.badge && (
                                <span className="px-2 py-0.5 rounded bg-tallero-amber text-tallero-navy text-[10px] font-bold">
                                  {pkg.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {pkg.specs}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Kategori */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-tallero-sky/25 text-tallero-navy font-medium text-[11px]">
                          {pkg.category}
                        </span>
                      </td>

                      {/* Durasi */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        <span className="inline-flex items-center gap-1.5">
                          <i className="fa-regular fa-clock text-tallero-teal text-[11px]"></i>
                          {pkg.duration}
                        </span>
                      </td>

                      {/* Tarif */}
                      <td className="py-3.5 px-4 font-bold text-tallero-navy">
                        {formatRupiah(pkg.price)}
                      </td>

                      {/* Toggle Status */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => togglePackageStatus(pkg.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                            pkg.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              pkg.isActive ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          ></span>
                          {pkg.isActive ? 'Aktif' : 'Nonaktif'}
                        </button>
                      </td>

                      {/* Tombol Aksi */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(pkg)}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-tallero-teal text-tallero-navy hover:bg-tallero-sky/15 font-medium text-[11px] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(pkg)}
                            className="px-2.5 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 font-medium text-[11px] transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL TAMBAH / EDIT PAKET SERVIS */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-tallero-navy to-tallero-teal text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-tallero-amber">
                  Katalog Layanan Bengkel
                </span>
                <h2 className="text-base font-bold">
                  {editingId ? 'Edit Paket Servis' : 'Tambah Paket Servis Baru'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSavePackage}
              className="p-5 space-y-4 overflow-y-auto text-xs"
            >
              <div>
                <label className="block font-semibold text-tallero-navy mb-1">
                  Nama Paket Servis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Servis Berkala & Tune Up 3D"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-tallero-teal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-tallero-navy mb-1">
                    Kategori Layanan
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-tallero-teal"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-tallero-navy mb-1">
                    Label Sorotan (Badge)
                  </label>
                  <select
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-tallero-teal"
                  >
                    {badgeOptions.map((b) => (
                      <option key={b.label} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-tallero-navy mb-1">
                    Tarif Dasar (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={5000}
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="550000"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-tallero-teal"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-tallero-navy mb-1">
                    Estimasi Durasi Pengerjaan
                  </label>
                  <input
                    type="text"
                    required
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="Contoh: ± 90 Menit"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-tallero-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-tallero-navy mb-1">
                  Ringkasan Spesifikasi Singkat
                </label>
                <input
                  type="text"
                  required
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  placeholder="Contoh: Scan ECU • Bersih Ruang Bakar • Ganti Busi"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-tallero-teal"
                />
              </div>

              <div>
                <label className="block font-semibold text-tallero-navy mb-1">
                  URL Foto Layanan
                </label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-tallero-teal"
                />
              </div>

              {/* Poin Rincian Pengerjaan */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-tallero-navy">
                    Rincian Pengerjaan (Checklist)
                  </label>
                  <button
                    type="button"
                    onClick={addChecklistRow}
                    className="text-[11px] font-semibold text-tallero-teal hover:text-tallero-navy"
                  >
                    + Tambah Poin
                  </button>
                </div>
                <div className="space-y-2">
                  {formChecklist.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleChecklistChange(index, e.target.value)}
                        placeholder={`Poin pengerjaan #${index + 1}`}
                        className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-tallero-teal"
                      />
                      {formChecklist.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChecklistRow(index)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600"
                          aria-label="Hapus Poin"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggle Status Tayang */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div>
                  <p className="font-semibold text-tallero-navy">Tampilkan di Landing Page</p>
                  <p className="text-[11px] text-slate-500">
                    Paket aktif dapat langsung dipilih pelanggan saat booking.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="w-4 h-4 accent-tallero-navy cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-tallero-navy hover:bg-tallero-teal text-white font-bold transition-colors"
                >
                  {editingId ? 'Simpan Perubahan' : 'Simpan Paket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-slate-200 p-5 space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-base shrink-0">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-tallero-navy">Hapus Paket Servis?</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Paket <strong className="text-slate-700">{deleteTarget.title}</strong> akan dihapus dari katalog layanan.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}