"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const difficulties = ["Mudah", "Menengah", "Sulit"] as const;
const challengeDurations = [3, 5, 10] as const;

type Mode = "normal" | "challenge";
type Difficulty = typeof difficulties[number];

export default function ModeSelectionPage() {
  const [selectedMode, setSelectedMode] = useState<Mode>("normal");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("Mudah");
  const [selectedTime, setSelectedTime] = useState<number>(3);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-8"
      >
        <Header />

        <ModeTabs selected={selectedMode} onSelect={setSelectedMode} />

        {selectedMode === "normal" ? (
          <NormalModeSection
            selectedDifficulty={selectedDifficulty}
            onSelectDifficulty={setSelectedDifficulty}
          />
        ) : (
          <ChallengeModeSection selectedTime={selectedTime} onSelectTime={setSelectedTime} />
        )}

        <Link
          href="/"
          className="block w-full pt-4 py-2 text-center text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← Kembali ke Beranda
        </Link>
      </motion.div>
    </section>
  );
}

function Header() {
  return (
    <div className="text-center space-y-1">
      <h1 className="text-3xl font-bold text-gray-900">Tes Ketelitian Membaca</h1>
      <p className="text-gray-600">
        Pilih mode dan tingkat kesulitan untuk menguji seberapa teliti kamu menemukan kesalahan dalam teks.
      </p>
    </div>
  );
}

function ModeTabs({ selected, onSelect }: { selected: Mode; onSelect: (m: Mode) => void }) {
  const modes: Mode[] = ["normal", "challenge"];

  return (
    <div className="flex justify-center gap-2 p-1 bg-gray-100 rounded-full">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onSelect(mode)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            selected === mode
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {mode === "normal" ? "Mode Normal" : "Mode Challenge"}
        </button>
      ))}
    </div>
  );
}

function NormalModeSection({
  selectedDifficulty,
  onSelectDifficulty,
}: {
  selectedDifficulty: Difficulty;
  onSelectDifficulty: (d: Difficulty) => void;
}) {
  const descriptions: Record<Difficulty, string> = {
    Mudah: "Teks pendek dengan 3–5 kesalahan. Cocok untuk pemula atau pemanasan.",
    Menengah: "Teks sedang dengan 6–8 kesalahan. Cocok untuk latihan fokus dan akurasi.",
    Sulit: "Teks panjang tanpa informasi jumlah kesalahan. Cocok untuk penguji ketelitian tingkat lanjut.",
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Tingkat Kesulitan</h2>
      <div className="grid grid-cols-3 gap-3">
        {difficulties.map((dif) => (
          <motion.button
            key={dif}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectDifficulty(dif)}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              selectedDifficulty === dif
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {dif}
          </motion.button>
        ))}
      </div>

      <div className="space-y-4 text-gray-700">
        <div className="p-4 bg-blue-50 rounded-lg font-medium">
          {descriptions[selectedDifficulty]}
        </div>

        <div className="space-y-3">
          <Feature icon="🖱️" title="Klik-Kata Aktif" desc="Semua kata bisa diklik untuk dikoreksi. Hanya koreksi yang benar yang dihitung sebagai skor." />
          <Feature icon="⏱️" title="Timer Otomatis" desc="Waktu dihitung sejak teks muncul. Hasilmu akan menunjukkan kecepatan dan akurasi." />
          <Feature icon="📊" title="Evaluasi Visual" desc="Setelah selesai, kamu bisa melihat kata mana saja yang kamu sentuh, benar atau salah." />
        </div>
      </div>

      <Link
        href={`/Telikata/normal/${selectedDifficulty.toLowerCase()}`}
        className="block w-full py-3 bg-blue-500 text-white text-center font-medium rounded-lg hover:bg-blue-600 transition shadow-md hover:shadow-lg"
      >
        Mulai Tes
      </Link>
    </motion.div>
  );
}

function ChallengeModeSection({
  selectedTime,
  onSelectTime,
}: {
  selectedTime: number;
  onSelectTime: (t: number) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Pilih Durasi Challenge</h2>
      <div className="grid grid-cols-3 gap-3">
        {challengeDurations.map((min) => (
          <motion.button
            key={min}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTime(min)}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              selectedTime === min
                ? "bg-pink-500 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {min} Menit
          </motion.button>
        ))}
      </div>

      <div className="space-y-4 text-gray-700">
        <div className="p-4 bg-pink-50 rounded-lg font-medium">
          Temukan dan perbaiki sebanyak mungkin kesalahan dalam waktu {selectedTime} menit. Tidak ada bantuan, tidak ada petunjuk.
        </div>

        <div className="space-y-3">
          <Feature icon="🔒" color="pink" title="Tanpa Petunjuk" desc="Kamu tidak diberi tahu jumlah kesalahan. Fokus dan teliti adalah kunci." />
          <Feature icon="⏳" color="pink" title="Waktu Terbatas" desc="Tes akan berakhir otomatis setelah waktu habis." />
          <Feature icon="📈" color="pink" title="Skor Akhir" desc="Kamu akan mendapatkan skor akurasi dan kecepatan di akhir challenge." />
        </div>
      </div>

      <Link
        href={`/Telikata/challenge/${selectedTime}`}
        className="block w-full py-3 bg-pink-500 text-white text-center font-medium rounded-lg hover:bg-pink-600 transition shadow-md hover:shadow-lg"
      >
        Mulai Challenge
      </Link>
    </motion.div>
  );
}

function Feature({
  icon,
  title,
  desc,
  color = "blue",
}: {
  icon: string;
  title: string;
  desc: string;
  color?: "blue" | "pink";
}) {
  const bgColor = color === "blue" ? "bg-blue-100" : "bg-pink-100";
  const textColor = color === "blue" ? "text-blue-500" : "text-pink-500";

  return (
    <div className="flex items-start gap-3">
      <div className={`p-1.5 ${bgColor} rounded-full`}>
        <span className={`${textColor}`}>{icon}</span>
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
