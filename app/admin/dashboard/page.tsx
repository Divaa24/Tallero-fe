'use client';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-tallero-navy mb-2">Dashboard Ringkasan</h1>
        <p className="text-gray-500 text-sm">Pantau statistik booking dan performa bengkel hari ini.</p>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-tallero-sky/20 text-tallero-teal flex items-center justify-center">
            <i className="fa-solid fa-clipboard-list text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Booking Hari Ini</p>
            <h3 className="text-2xl font-bold text-tallero-navy">12 <span className="text-xs font-normal text-gray-400">kendaraan</span></h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-amber-100 text-tallero-amber flex items-center justify-center">
            <i className="fa-solid fa-hourglass-half text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Menunggu Diproses</p>
            <h3 className="text-2xl font-bold text-tallero-navy">4 <span className="text-xs font-normal text-gray-400">antrean</span></h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
            <i className="fa-solid fa-check-double text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Servis Selesai</p>
            <h3 className="text-2xl font-bold text-tallero-navy">8 <span className="text-xs font-normal text-gray-400">kendaraan</span></h3>
          </div>
        </div>
      </div>

      {/* Banner / Info Tambahan */}
      <div className="bg-gradient-to-r from-tallero-navy to-tallero-teal rounded-2xl p-8 text-white shadow-md relative overflow-hidden">
        <i className="fa-solid fa-chart-line absolute -right-4 -bottom-4 text-[120px] opacity-10"></i>
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Selamat Datang di Tallero Admin!</h2>
          <p className="text-tallero-sky text-sm max-w-lg mb-4">
            Ini adalah halaman pusat kendali. Pastikan Anda selalu memantau menu <strong>Kelola Booking</strong> untuk memperbarui status pengerjaan kendaraan pelanggan agar fitur pelacakan (Live Tracking) di aplikasi pelanggan berjalan lancar.
          </p>
        </div>
      </div>
    </div>
  );
}