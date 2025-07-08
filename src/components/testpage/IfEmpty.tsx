"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function IfEmpty({ level }: { level: string }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-md w-full"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="flex justify-center mb-6"
        >
          <div className="p-3 bg-blue-50 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </motion.div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">
          Soal Belum Tersedia
        </h2>

        <p className="text-gray-500 text-center mb-6 leading-relaxed">
          Belum ada soal untuk tingkat{" "}
          <span className="font-medium text-blue-500">{level}</span>. Coba
          tingkat kesulitan lain atau periksa kembali nanti.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
        >
          Kembali ke Beranda
        </motion.button>
      </motion.div>
    </div>
  );
}
