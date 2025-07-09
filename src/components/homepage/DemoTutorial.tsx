"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define types
interface CorrectionData {
  correct: string[];
  explanation: string;
}

interface SampleData {
  original: string;
  corrections: Record<number, CorrectionData>;
}

// Contoh soal
const samples: SampleData[] = [
  {
    original: "Dia tinggal dikampung dan senang mempelajari Bahasa indonesia.",
    corrections: {
      2: {
        correct: ["di kampung"],
        explanation: "Penulisan yang benar adalah 'di kampung', bukan 'dikampung'.",
      },
      7: {
        correct: ["Indonesia."],
        explanation: "Gunakan huruf kapital: 'Indonesia'.",
      },
    },
  },
  {
    original: "Saya suka makan apel, jeruk dan pisang.",
    corrections: {
      3: {
        correct: ["apel"],
        explanation: "Tidak perlu koma setelah 'apel'.",
      },
      4: {
        correct: ["jeruk,", "dan"],
        explanation: "Gunakan koma sebelum 'dan' dalam daftar.",
      },
    },
  },
];

export default function InteractiveDemo() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const sample = samples[sampleIndex];
  const originalWords = sample.original.split(" ");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [corrections, setCorrections] = useState<{ [index: number]: string }>({});
  const [feedback, setFeedback] = useState<{ [index: number]: boolean }>({});
  const [clickedWords, setClickedWords] = useState<number[]>([]);

  const handleWordClick = (index: number) => {
    if (!clickedWords.includes(index)) {
      setClickedWords((prev) => [...prev, index]);
    }

    if (sample.corrections[index]) {
      setEditingIndex(index);
    }
  };

  const handleChange = (value: string) => {
    if (editingIndex === null) return;

    const correction = sample.corrections[editingIndex];
    const expected = correction.correct.join(" ");
    const isCorrect = value.trim() === expected;

    setCorrections((prev) => ({ ...prev, [editingIndex]: value }));
    setFeedback((prev) => ({ ...prev, [editingIndex]: isCorrect }));
  };

  const handleRefresh = () => {
    setSampleIndex((prev) => (prev + 1) % samples.length);
    setCorrections({});
    setFeedback({});
    setEditingIndex(null);
    setClickedWords([]);
  };

  const getAccuracyMetrics = () => {
    const totalCorrections = Object.keys(corrections).length;
    const correctCorrections = Object.values(feedback).filter(Boolean).length;

    const correctionAccuracy =
      totalCorrections > 0
        ? Math.round((correctCorrections / totalCorrections) * 100)
        : 0;

    const totalWords = originalWords.length;
    const falseClicks = clickedWords.filter((i) => !sample.corrections[i]).length;

    const visualAccuracy =
      totalWords > 0
        ? Math.round(((totalWords - falseClicks) / totalWords) * 100)
        : 100;

    return { correctionAccuracy, visualAccuracy };
  };

  const { correctionAccuracy, visualAccuracy } = getAccuracyMetrics();

  return (
    <section id="demo" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-3"
          >
            Latihan Ketelitian Bahasa
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bacalah kalimat berikut dengan saksama. Klik kata yang{" "}
            <span className="underline font-bold text-black underline-offset-2 decoration-dotted">
              menurutmu salah
            </span>{" "}
            lalu perbaiki. Setiap koreksi akan dinilai berdasarkan ejaan, tanda
            baca, dan kapitalisasi.
          </p>
          <button
            onClick={handleRefresh}
            className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
          >
            🔄 Coba Kalimat Lain
          </button>
        </div>

        {/* Teks */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="mb-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-sm font-medium text-gray-500">
                Koreksi Teks
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-lg leading-relaxed mb-1">
              {originalWords.map((word, index) => {
                const isEditing = editingIndex === index;
                const userCorrection = corrections[index];
                const isCorrect = feedback[index];
                const isEditable = sample.corrections[index];

                return (
                  <span
                    key={index}
                    onClick={() => handleWordClick(index)}
                    className={`relative cursor-pointer rounded transition duration-200 ease-in-out
                      ${
                        isCorrect
                          ? "bg-green-50 text-green-700"
                          : userCorrection && !isCorrect
                          ? "bg-red-50 text-red-700"
                          : "hover:bg-gray-100 text-gray-800"
                      }`}
                  >
                    {isEditing && isEditable ? (
                      <input
                        autoFocus
                        value={userCorrection ?? word}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) => e.key === "Enter" && setEditingIndex(null)}
                        className="bg-white border border-gray-300 px-2 py-1 rounded w-auto text-base focus:ring-2 focus:ring-indigo-300 focus:outline-none transition duration-150"
                      />
                    ) : (
                      userCorrection ?? word
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Penjelasan */}
          <AnimatePresence>
            {Object.values(feedback).some(Boolean) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 border-t border-gray-200 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <h4 className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" />
                    </svg>
                    Penjelasan Koreksi
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(sample.corrections).map(([idx, item]) => {
                      const index = Number(idx);
                      return feedback[index] ? (
                        <div key={idx} className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-green-500 mt-1 mr-2" />
                          <p className="text-gray-700">{item.explanation}</p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Statistik */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex bg-white rounded-lg shadow p-2">
            <div className="px-4 py-2 text-center border-r border-gray-100">
              <p className="text-sm font-medium text-gray-500">Kata Diperbaiki</p>
              <p className="text-xl font-semibold text-indigo-600">
                {Object.keys(corrections).length}
              </p>
            </div>
            <div className="px-4 py-2 text-center border-r border-gray-100">
              <p className="text-sm font-medium text-gray-500">Akurasi Koreksi</p>
              <p className="text-xl font-semibold text-indigo-600">
                {correctionAccuracy}%
              </p>
            </div>
            <div className="px-4 py-2 text-center">
              <p className="text-sm font-medium text-gray-500">Akurasi Ketepatan</p>
              <p className="text-xl font-semibold text-indigo-600">
                {visualAccuracy}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
