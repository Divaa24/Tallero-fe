'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Submit:', formData);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Sisi Kiri (Putih - Logo & Title) */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 min-h-[300px] md:min-h-screen">
        <div className="flex flex-col items-center text-center max-w-sm">
          {/* Logo Bengkel */}
          <div className="relative mb-6 flex items-center justify-center">
            <div className="w-40 h-40 md:w-52 md:h-52 text-tallero-amber flex items-center justify-center relative">
              <i className="fa-solid fa-gear text-[140px] md:text-[180px] absolute animate-[spin_10s_linear_infinite]"></i>
              <i className="fa-solid fa-car text-tallero-navy text-6xl md:text-7xl z-10"></i>
            </div>
          </div>

          {/* Title Logo */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-tallero-navy tracking-tight">
            TALLERO SERVICE
          </h1>
          <p className="text-sm font-semibold text-gray-600 tracking-widest mt-1">
            - BENGKEL TERPERCAYA -
          </p>
        </div>
      </div>

      {/* Sisi Kanan (Gradient Tallero Navy - Form) */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-tallero-navy via-[#01324a] to-tallero-teal flex flex-col justify-between p-8 md:p-16 min-h-[500px] md:min-h-screen">
        {/* Spacer Top */}
        <div className="hidden md:block"></div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Field Email */}
            <div>
              <label className="block text-xs font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="xxxx.08@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/10 text-white placeholder-gray-400 rounded-2xl px-5 py-3.5 border border-white/10 focus:outline-none focus:border-tallero-amber focus:ring-1 focus:ring-tallero-amber transition-all text-sm"
                required
              />
            </div>

            {/* Field Password */}
            <div>
              <label className="block text-xs font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/10 text-white placeholder-gray-400 rounded-2xl px-5 py-3.5 pr-12 border border-white/10 focus:outline-none focus:border-tallero-amber focus:ring-1 focus:ring-tallero-amber transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full bg-tallero-amber hover:bg-tallero-orange text-tallero-navy font-bold rounded-2xl py-3.5 text-sm transition-all shadow-lg active:scale-[0.99] mt-4"
            >
              Masuk
            </button>
          </form>

          {/* Link Ke Register */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-300">
              Belum punya akun?{' '}
              <Link href="/register" className="text-tallero-sky font-semibold hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="text-center pt-8">
          <p className="text-xs text-gray-400">
            © 2026 Tallero Services.
          </p>
        </div>
      </div>
    </div>
  );
}