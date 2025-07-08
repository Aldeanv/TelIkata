"use client";
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Latihan Interaktif',
    description: 'Klik kata yang salah dan berikan koreksi secara langsung. Setiap koreksi langsung dinilai.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    accent: 'bg-blue-100'
  },
  {
    name: 'Tingkat Kesulitan',
    description: 'Pilih tingkat kesulitan sesuai kemampuanmu: mudah, sedang, atau sulit. Setiap tingkat memiliki tantangan unik.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    accent: 'bg-purple-100'
  },
  {
    name: 'Tanpa Login',
    description: 'Mulai langsung tanpa perlu membuat akun terlebih dahulu.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
      </svg>
    ),
    accent: 'bg-amber-100'
  },
  {
    name: 'Evaluasi Hasil',
    description: 'Setelah latihan, lihat ringkasan performa kamu: jumlah koreksi, akurasi, dan teks akhir.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17v-2a2 2 0 012-2h6m3-4V7a2 2 0 00-2-2h-6l-2 2H6a2 2 0 00-2 2v8a2 2 0 002 2h3" />
      </svg>
    ),
    accent: 'bg-emerald-100'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-indigo-50 blur-3xl opacity-50"></div>
          <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-blue-50 blur-3xl opacity-50"></div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="text-center mb-20">
              <span className="inline-block mb-4 text-sm font-medium text-indigo-600 tracking-wider">
                FITUR UTAMA
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pengalaman Belajar <br className="hidden md:block" /> yang Menantang & Seru
              </h2>
              <div className="flex justify-center">
                <div className="h-1 w-16 bg-indigo-500 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className={`absolute -inset-0.5 rounded-xl ${feature.accent} opacity-0 group-hover:opacity-100 blur-sm transition duration-300`}></div>
                  <div className="relative h-full bg-white p-8 rounded-xl border border-gray-100 shadow-xs group-hover:shadow-sm transition-all duration-300">
                    <div className={`w-14 h-14 rounded-lg ${feature.accent} flex items-center justify-center mb-6 text-gray-800`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
