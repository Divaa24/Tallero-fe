'use client';

import { useState } from 'react';

export default function OutletsPage() {
  const [outlets, setOutlets] = useState([
    {
      id: 'OUT-01',
      name: 'Cabang Utama Depok',
      address: 'Jl. Margonda Raya No. 120, Beji, Kota Depok',
      phone: '021-77889900',
      manager: 'Budi Santoso',
      pits: 5,
      hours: '08:00 - 17:00 WIB',
      status: 'Aktif',
    },
    {
      id: 'OUT-02',
      name: 'Cabang Bogor City',
      address: 'Jl. Pajajaran No. 45, Bogor Timur, Kota Bogor',
      phone: '0251-8334455',
      manager: 'Hendra Setiawan',
      pits: 4,
      hours: '08:00 - 17:00 WIB',
      status: 'Aktif',
    },
    {
      id: 'OUT-03',
      name: 'Cabang Jakarta Selatan',
      address: 'Jl. Fatmawati No. 88, Cilandak, Jakarta Selatan',
      phone: '021-7556677',
      manager: 'Rian Hidayat',
      pits: 6,
      hours: '08:00 - 18:00 WIB',
      status: 'Aktif',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredOutlets = outlets.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-[#013C58]">Data Outlet Bengkel</h1>
          <p className="text-xs text-slate-500">
            Kelola informasi lokasi cabang, kapasitas pit, dan jam operasional bengkel.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#013C58] hover:bg-[#00537A] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm">
          <i className="fa-solid fa-plus text-[#F5A201]"></i>
          Tambah Outlet Baru
        </button>
      </div>

      {/* Bar Pencarian */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder="Cari cabang atau alamat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#00537A]/20 transition-all"
          />
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Total Outlet: <strong className="text-[#00537A]">{outlets.length} cabang</strong>
        </span>
      </div>

      {/* Grid Cards Outlet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredOutlets.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold text-[#00537A] bg-[#00537A]/10 px-2 py-0.5 rounded font-mono">
                    {item.id}
                  </span>
                  <h3 className="font-bold text-[#013C58] text-base mt-1">{item.name}</h3>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    item.status === 'Aktif'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                <i className="fa-solid fa-location-dot text-[#F5A201] mr-1"></i>
                {item.address}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Kepala Cabang:</span>
                  <span className="font-semibold text-slate-700">{item.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Telepon:</span>
                  <span className="font-mono font-medium">{item.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kapasitas Pit:</span>
                  <span className="font-bold text-[#00537A]">{item.pits} Pit Pengerjaan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jam Operasional:</span>
                  <span className="font-medium">{item.hours}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors">
                Edit Outlet
              </button>
              <button className="text-[#00537A] font-bold hover:underline">
                Lihat Jadwal Pit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}