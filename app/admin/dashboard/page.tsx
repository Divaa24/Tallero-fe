'use client';

import { useState } from 'react';

export default function DashboardPage() {
  const [selectedBranch, setSelectedBranch] = useState('Cabang Utama Depok');

  // Data Antrean Pengerjaan Real-time
  const activeBookings = [
    {
      id: 'TL-8821',
      customer: 'Budi Santoso',
      phone: '0812-3456-7890',
      vehicle: 'Toyota Avanza Veloz',
      plate: 'B 1420 SKD',
      service: 'Servis Berkala & Ganti Oli',
      pit: 'Pit 1 (Lift)',
      mechanic: 'Ahmad S.',
      progress: 75,
      status: 'Diproses',
      time: '10:30 WIB',
    },
    {
      id: 'TL-8820',
      customer: 'Deni Kurniawan',
      phone: '0819-8765-4321',
      vehicle: 'Pajero Sport',
      plate: 'B 888 DEN',
      service: 'Tune Up 3D & Spooring',
      pit: 'Pit 2 (Spooring)',
      mechanic: 'Bambang S.',
      progress: 40,
      status: 'Diproses',
      time: '09:00 WIB',
    },
    {
      id: 'TL-8822',
      customer: 'Rina Wijaya',
      phone: '0857-1122-3344',
      vehicle: 'Honda Vario 150',
      plate: 'B 6891 POK',
      service: 'Cek Rem & Ganti Aki',
      pit: 'Pit 3 (Moped)',
      mechanic: 'Eko P.',
      progress: 10,
      status: 'Menunggu',
      time: '11:15 WIB',
    },
    {
      id: 'TL-8819',
      customer: 'Siti Hawa',
      phone: '0813-9988-7766',
      vehicle: 'Honda HR-V',
      plate: 'B 2231 RFS',
      service: 'Ganti Filter AC',
      pit: 'Pit 4 (Quick)',
      mechanic: 'Dedi K.',
      progress: 100,
      status: 'Selesai',
      time: '08:30 WIB',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER MINIMALIS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-[#013C58]">Ringkasan Operasional</h1>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-semibold border border-slate-200">
              <i className="fa-solid fa-location-dot text-[#F5A201] mr-1"></i>
              {selectedBranch}
            </span>
          </div>
          <p className="text-xs text-slate-500">Pantau arus pengerjaan unit dan alokasi mekanik hari ini.</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/admin/bookings"
            className="px-4 py-2 rounded-xl bg-[#013C58] hover:bg-[#00537A] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-plus text-[#F5A201]"></i>
            Booking Baru
          </a>
        </div>
      </div>

      {/* 2. STATS STRIP (Satu Container Bersih) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 shadow-sm">
        <div className="p-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Booking</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-[#013C58]">18</span>
            <span className="text-[11px] font-semibold text-emerald-600">↑ +12%</span>
          </div>
        </div>

        <div className="p-2 sm:pl-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Antrean Menunggu</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-[#F5A201]">5</span>
            <span className="text-[11px] text-slate-400">unit</span>
          </div>
        </div>

        <div className="p-2 sm:pl-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sedang Dikerjakan</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-[#00537A]">4</span>
            <span className="text-[11px] text-sky-600 font-medium">Pit Aktif</span>
          </div>
        </div>

        <div className="p-2 sm:pl-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Servis Selesai</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-600">9</span>
            <span className="text-[11px] text-slate-400">Siap Ambil</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN SECTION: TABEL UTAMA (70%) + SIDE PANEL (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TABEL ANTREAN UTAMA */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="font-bold text-sm text-[#013C58]">Pengerjaan Unit Hari Ini</h2>
                <p className="text-[11px] text-slate-400">Daftar kendaraan aktif di pit bengkel</p>
              </div>
              <a href="/admin/bookings" className="text-xs font-bold text-[#00537A] hover:underline">
                Lihat Semua →
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3">Kendaraan</th>
                    <th className="px-4 py-3">Pelanggan</th>
                    <th className="px-4 py-3">Layanan & Mekanik</th>
                    <th className="px-4 py-3">Progres</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeBookings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-800">{item.vehicle}</p>
                        <span className="inline-block px-1.5 py-0.5 mt-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono font-bold">
                          {item.plate}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{item.customer}</p>
                        <p className="text-[10px] text-slate-400">{item.time}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#00537A]">{item.service}</p>
                        <p className="text-[10px] text-slate-400">
                          {item.pit} • <span className="text-slate-600 font-semibold">{item.mechanic}</span>
                        </p>
                      </td>
                      <td className="px-4 py-3 w-28">
                        <div className="flex justify-between text-[10px] mb-1 font-semibold text-slate-600">
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.progress === 100 ? 'bg-emerald-500' : 'bg-[#00537A]'
                            }`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.status === 'Menunggu'
                              ? 'bg-amber-100 text-amber-800'
                              : item.status === 'Diproses'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SIDE PANEL: MONITORING PIT & ACTION */}
        <div className="space-y-4">
          {/* Status Kapasitas Pit */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
              <h3 className="font-bold text-xs text-[#013C58]">Status Pit Pengerjaan</h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                4/5 Pit Terisi
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div>
                  <p className="font-bold text-slate-700">Pit 1 (Lift Hidrolik)</p>
                  <p className="text-[10px] text-slate-400">Ahmad S. • Avanza Veloz</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div>
                  <p className="font-bold text-slate-700">Pit 2 (Spooring Line)</p>
                  <p className="text-[10px] text-slate-400">Bambang S. • Pajero Sport</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div>
                  <p className="font-bold text-slate-700">Pit 5 (General Repair)</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Tersedia (Kosong)</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#013C58] text-white p-4 rounded-2xl shadow-sm">
            <h3 className="font-bold text-xs text-[#A8E8F9] mb-1">Akses Pintas Admin</h3>
            <p className="text-[11px] text-slate-300 mb-3">Kelola data master aplikasi Tallero.</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="/admin/services"
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-center transition-colors block"
              >
                <i className="fa-solid fa-wrench text-[#F5A201] block mb-1 text-sm"></i>
                Tarif Servis
              </a>
              <a
                href="/admin/outlets"
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-center transition-colors block"
              >
                <i className="fa-solid fa-store text-[#A8E8F9] block mb-1 text-sm"></i>
                Data Outlet
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}