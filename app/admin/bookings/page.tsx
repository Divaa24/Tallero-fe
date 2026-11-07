'use client';

import { useState } from 'react';

export default function BookingsPage() {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const [bookings, setBookings] = useState([
    {
      id: 'TL-8821',
      customer: 'Budi Santoso',
      phone: '0812-3456-7890',
      vehicle: 'Toyota Avanza Veloz',
      plate: 'B 1420 SKD',
      service: 'Servis Berkala 20.000 KM + Ganti Oli',
      price: 'Rp 650.000',
      date: '2026-10-30',
      time: '10:30 WIB',
      status: 'Diproses',
      mechanic: 'Ahmad Supriadi (Pit 1)',
      notes: 'Keluhan: Keluar bunyi halus di rem depan saat pengereman mendadak.',
    },
    {
      id: 'TL-8822',
      customer: 'Rina Wijaya',
      phone: '0857-1122-3344',
      vehicle: 'Honda Vario 150 eSP',
      plate: 'B 6891 POK',
      service: 'Cek Sistem Rem & Penggantian Aki GS',
      price: 'Rp 320.000',
      date: '2026-10-30',
      time: '11:15 WIB',
      status: 'Menunggu',
      mechanic: 'Belum Ditugaskan',
      notes: 'Aki starter sering soak saat pagi hari.',
    },
    {
      id: 'TL-8820',
      customer: 'Deni Kurniawan',
      phone: '0819-8765-4321',
      vehicle: 'Mitsubishi Pajero Sport',
      plate: 'B 888 DEN',
      service: 'Tune Up 3D & Spooring Balancing',
      price: 'Rp 1.100.000',
      date: '2026-10-30',
      time: '09:00 WIB',
      status: 'Selesai',
      mechanic: 'Bambang S. (Pit 2)',
      notes: 'Minta dipastikan balancing roda belakang.',
    },
    {
      id: 'TL-8819',
      customer: 'Siti Hawa',
      phone: '0813-9988-7766',
      vehicle: 'Honda HR-V',
      plate: 'B 2231 RFS',
      service: 'Ganti Filter AC & Fogging Anti Bakteri',
      price: 'Rp 450.000',
      date: '2026-10-29',
      time: '14:00 WIB',
      status: 'Selesai',
      mechanic: 'Dedi K. (Pit 4)',
      notes: 'AC kurang dingin.',
    },
  ]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filteredBookings = bookings.filter((item) => {
    const matchesFilter = filterStatus === 'Semua' || item.status === filterStatus;
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-[#013C58]">Kelola Booking & Antrean</h1>
          <p className="text-xs text-slate-500">Pantau dan perbarui status pengerjaan servis secara langsung.</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <i className="fa-solid fa-file-export text-slate-400"></i>
            Export Data
          </button>
        </div>
      </div>

      {/* Bar Filter & Pencarian */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Pills Status */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {['Semua', 'Menunggu', 'Diproses', 'Selesai'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-[#00537A] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Input Cari */}
        <div className="relative w-full md:w-72">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder="Cari kode, nama, plat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#00537A]/20 transition-all"
          />
        </div>
      </div>

      {/* Tabel Data Booking */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-4 py-3.5">Kode & Waktu</th>
                <th className="px-4 py-3.5">Pelanggan</th>
                <th className="px-4 py-3.5">Kendaraan</th>
                <th className="px-4 py-3.5">Layanan</th>
                <th className="px-4 py-3.5">Status Pengerjaan</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-bold text-[#00537A] text-sm">{item.id}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.time} ({item.date})</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-bold text-slate-800">{item.customer}</p>
                      <p className="text-[10px] text-slate-400">{item.phone}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-slate-800">{item.vehicle}</p>
                      <span className="inline-block px-1.5 py-0.5 mt-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-mono font-bold">
                        {item.plate}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-[#00537A]">{item.service}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{item.price}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border outline-none cursor-pointer transition-all ${
                          item.status === 'Menunggu'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : item.status === 'Diproses'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedBooking(item)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#00537A] text-slate-700 hover:text-white font-bold text-[11px] transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    Tidak ada data booking yang sesuai filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Booking */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-150">
            <div className="bg-[#013C58] text-white p-5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-extrabold text-[#F5A201] uppercase tracking-wider">Detail Booking</span>
                <h3 className="text-lg font-bold">{selectedBooking.id} — {selectedBooking.customer}</h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Kendaraan</span>
                  <p className="font-bold text-slate-800 text-sm">{selectedBooking.vehicle}</p>
                  <p className="font-mono text-slate-600 font-bold">{selectedBooking.plate}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Mekanik & Pit</span>
                  <p className="font-semibold text-slate-800">{selectedBooking.mechanic}</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Paket Layanan</span>
                <p className="font-bold text-[#00537A] text-sm">{selectedBooking.service}</p>
                <p className="text-slate-600 mt-0.5 font-semibold">Total Est: {selectedBooking.price}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Catatan Pelanggan</span>
                <p className="text-slate-700 bg-amber-50/60 p-3 rounded-xl border border-amber-100 mt-1 italic">
                  "{selectedBooking.notes}"
                </p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl bg-[#013C58] text-white font-bold text-xs hover:bg-[#00537A]"
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