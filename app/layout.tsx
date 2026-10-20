import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tallero Service - Bengkel Terpercaya",
  description: "Aplikasi Booking Servis Bengkel Berbasis Web dan Mobile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* CDN Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* CDN FontAwesome untuk Ikon */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />

        {/* Konfigurasi Palet Warna Tallero */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      tallero: {
                        sky: '#A8E8F9',
                        teal: '#00537A',
                        navy: '#013C58',
                        amber: '#F5A201',
                        orange: '#FFBA42',
                        yellow: '#FFD35B',
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}