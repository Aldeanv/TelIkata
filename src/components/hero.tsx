"use client";

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section id="hero" className="relative bg-white py-16 overflow-hidden">
      {/* Background Blur Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-indigo-100 opacity-30 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-blue-100 opacity-30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-5xl text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-block px-4 py-2 mb-6 bg-indigo-50 rounded-full"
        >
          <span className="text-sm font-medium text-indigo-600">
            Platform Interaktif SiTeliti
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Uji Kemampuan Bahasa dan Ketelitianmu dengan{" "}
          <span className="text-indigo-600 inline-block">
            <Typewriter
              words={[
                "Asik",
                "Cepat",
                "Efektif",
                "Interaktif",
                "Seru",
                "Mudah",
                "SiTeliti",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={160}
              deleteSpeed={60}
              delaySpeed={3600}
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          SiTeliti adalah platform edukatif yang melatih kemampuan membaca,
          mengenali kesalahan tata bahasa, dan meningkatkan ketelitian secara
          interaktif — tanpa rasa bosan.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href="/latihan/[mode]/[level]"
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-indigo-200 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Coba Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
