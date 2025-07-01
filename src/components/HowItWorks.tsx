"use client";
import { motion } from 'framer-motion';

const steps = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: "Pilih Tingkat Kesulitan",
    description: "Mulai dari pemula hingga ahli, sesuaikan dengan kemampuanmu",
    accent: "from-blue-400 to-blue-500"
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "Temukan & Perbaiki Kesalahan",
    description: "Identifikasi kesalahan dalam teks dan perbaiki dengan tepat",
    accent: "from-purple-400 to-purple-500"
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Lihat Hasil & Umpan Balik",
    description: "Dapatkan penjelasan detail untuk setiap kesalahan yang ditemukan",
    accent: "from-emerald-400 to-emerald-500"
  }
];

export default function HowItWorks() {
  return (
    <section id='how-it-works' className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-3 text-sm font-medium text-gray-500 tracking-wider">
            PROSES BELAJAR
          </span>
          <h2 className="text-3xl font-light text-gray-900 sm:text-4xl">
            Cara Kerja <span className="font-medium">SiTeliti</span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-20 blur transition duration-300 group-hover:duration-200 ${step.accent}"></div>
              <div className="relative h-full bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-r ${step.accent}`}>
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center">
                  <span className="text-xs font-medium text-gray-400">Langkah {index + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}