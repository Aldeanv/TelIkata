"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Clock, AlertTriangle } from "lucide-react";
import { Sample, Correction } from "@/data/test";

const wordVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  correct: {
    scale: [1, 1.1, 1],
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    transition: { duration: 0.3 },
  },
  incorrect: {
    scale: [1, 1.1, 1],
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
    transition: { duration: 0.3 },
  },
};

const inputVariants = {
  focus: {
    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
    borderColor: "#2563EB",
    transition: { duration: 0.2 },
  },
};

export default function ChallengePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawDuration = searchParams.get("duration") ?? "";
  const parsedDuration = parseInt(rawDuration || "", 10);
  const duration =
    !isNaN(parsedDuration) && parsedDuration > 0 ? parsedDuration * 60 : 5 * 60;

  const [sample, setSample] = useState<Sample | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [noSample, setNoSample] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [corrections, setCorrections] = useState<{ [index: number]: string }>(
    {}
  );
  const [feedback, setFeedback] = useState<{ [index: number]: boolean }>({});
  const [clickedWords, setClickedWords] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchSample = async () => {
      try {
        const res = await fetch("/api/samples?level=challenge");
        const data: Sample[] = await res.json();

        if (!data || data.length === 0) {
          setNoSample(true);
          setIsLoading(false);
          return;
        }

        const raw = data[Math.floor(Math.random() * data.length)];

        // Ubah corrections dari array → object (map by wordIndex)
        const correctionMap: { [index: number]: Correction } = {};
        for (const item of raw.corrections) {
          correctionMap[item.wordIndex] = item;
        }

        setSample({
          ...raw,
          corrections: correctionMap,
        });

        setTimeLeft(duration);
      } catch (err) {
        console.error("Gagal mengambil sample:", err);
        setNoSample(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSample();
  }, [duration]);

  const handleAutoSubmit = useCallback(() => {
    if (!sample) return;

    const originalWords = sample.original.split(" ");
    const totalErrors = Object.keys(sample.corrections).length;
    const correct = Object.values(feedback).filter(Boolean).length;

    const correctedText = originalWords
      .map((word, index) => {
        const userCorrection = corrections[index];
        const isCorrect = feedback[index];
        return isCorrect ? userCorrection : word;
      })
      .join(" ");

    const explanations = Object.entries(sample.corrections)
      .map(([indexStr, info]) => {
        const index = parseInt(indexStr);
        const isCorrect = feedback[index];
        if (!isCorrect) return null;
        return {
          index,
          wrong: originalWords[index],
          correct: info.correct.join(" "),
          explanation: info.explanation,
        };
      })
      .filter(Boolean);

    const resultData = {
      time: duration - timeLeft,
      totalErrors,
      correct,
      clicked: clickedWords.length,
      totalWords: originalWords.length,
      original: sample.original,
      corrected: correctedText,
      explanations,
      timeUp: true,
      isChallengeMode: true,
      difficulty: duration,
    };

    localStorage.setItem("siteliti_result", JSON.stringify(resultData));
    setTimeout(() => router.push("/result"), 500);
  }, [sample, feedback, corrections, clickedWords, timeLeft, duration, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            setFinished(true);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, handleAutoSubmit]);

  const handleWordClick = (index: number) => {
    if (!isTimerRunning || finished || !sample) return;

    if (!clickedWords.includes(index)) {
      setClickedWords((prev) => [...prev, index]);
    }

    // Hanya kata dengan correction yang bisa di-edit
    if (sample.corrections[index]) {
      setEditingIndex(index);
    }
  };

  const handleChange = (value: string) => {
    if (editingIndex === null || !sample) return;
    const correction = sample.corrections[editingIndex];
    const expected = correction.correct.join(" ");
    const isCorrect = value.trim() === expected;
    setCorrections((prev) => ({ ...prev, [editingIndex]: value }));
    setFeedback((prev) => ({ ...prev, [editingIndex]: isCorrect }));
  };

  const handleFinish = () => {
    setIsTimerRunning(false);
    setFinished(true);
    handleAutoSubmit();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const isTimeLow = timeLeft <= 30;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 1.8,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="relative"
          >
            <div className="w-12 h-12 border-3 border-blue-400 border-t-transparent rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-1"
          >
            <h3 className="text-lg font-medium text-gray-700">
              Menyiapkan Tes
            </h3>
            <p className="text-sm text-gray-400">Harap tunggu sebentar...</p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-0.5 bg-gray-200 rounded-full overflow-hidden"
          >
            <div className="h-full bg-blue-400 w-1/3"></div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!sample || noSample) {
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
            <span className="font-medium text-blue-500">Challenge</span>. Coba
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

  const originalWords = sample.original.split(" ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 sm:px-6 relative">
      {/* Floating Back Button */}
      <motion.button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </motion.button>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text"
          >
            Mode Challenge
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Time Warning Banner */}
            <AnimatePresence>
              {isTimeLow && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center"
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Waktu hampir habis! Cepat temukan kesalahan yang tersisa.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Text Editor Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Teks Challenge
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    Klik kata untuk mengedit
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-base leading-relaxed p-4 bg-gray-50 rounded-lg">
                {originalWords.map((word, index) => {
                  const isEditing = editingIndex === index;
                  const userCorrection = corrections[index];
                  const isCorrect = feedback[index];

                  return (
                    <motion.span
                      key={index}
                      variants={wordVariants}
                      initial="initial"
                      whileHover={!isEditing ? "hover" : {}}
                      whileTap={!isEditing ? "tap" : {}}
                      animate={
                        isCorrect
                          ? "correct"
                          : userCorrection && !isCorrect
                          ? "incorrect"
                          : "initial"
                      }
                      onClick={() => handleWordClick(index)}
                      className={`relative cursor-pointer rounded-md transition
                        ${isCorrect ? "text-emerald-800" : ""}
                        ${userCorrection && !isCorrect ? "text-red-800" : ""}
                        ${
                          !userCorrection && !isCorrect
                            ? "hover:bg-blue-50 text-gray-800"
                            : ""
                        }
                      `}
                    >
                      {isEditing ? (
                        <motion.input
                          autoFocus
                          value={userCorrection ?? word}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={() => setEditingIndex(null)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && setEditingIndex(null)
                          }
                          className="bg-white border-2 border-blue-400 rounded px-2 py-1 text-base focus:ring-2 focus:ring-blue-200 focus:outline-none transition min-w-[50px]"
                          variants={inputVariants}
                          whileFocus="focus"
                        />
                      ) : (
                        <span>{userCorrection ?? word}</span>
                      )}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>

            {/* Explanations Panel */}
            <AnimatePresence>
              {Object.values(feedback).some(Boolean) && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="bg-indigo-50 p-2 rounded-lg mr-4"
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <FileText className="h-6 w-6 text-indigo-600" />
                      </motion.div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Koreksi Kamu
                      </h2>
                    </div>

                    <div className="space-y-4 mt-4">
                      {Object.entries(sample.corrections).map(
                        ([idx, item], i) => {
                          const index = Number(idx);
                          const isCorrected = feedback[index];
                          if (!isCorrected) return null;

                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="border border-gray-200 rounded-lg p-4 flex items-start space-x-4"
                            >
                              <div className="h-6 w-6 flex items-center justify-center bg-indigo-100 text-indigo-600 font-medium rounded-full text-xs">
                                {i + 1}
                              </div>
                              <div className="flex-1 text-sm">
                                <div className="space-y-2">
                                  <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-sm font-medium text-gray-500">
                                      Kata salah:
                                    </span>
                                    <motion.span
                                      className="text-sm font-medium bg-red-50 text-red-700 px-2 py-1 rounded"
                                      initial={{ scale: 0.9 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 500,
                                      }}
                                    >
                                      {originalWords[index]}
                                    </motion.span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-gray-400"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-500">
                                      Koreksi:
                                    </span>
                                    <motion.span
                                      className="text-sm font-medium bg-green-50 text-green-700 px-2 py-1 rounded"
                                      initial={{ scale: 0.9 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        delay: 0.1,
                                      }}
                                    >
                                      {item.correct.join(" ")}
                                    </motion.span>
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    <span className="font-medium text-gray-600">
                                      Penjelasan:
                                    </span>{" "}
                                    {item.explanation}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Timer Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Waktu Tersisa
                  </h3>
                  <p
                    className={`text-2xl font-bold mt-1 ${
                      isTimeLow ? "text-red-600" : "text-gray-800"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </p>
                </div>
                <motion.div
                  className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 60,
                    ease: "linear",
                  }}
                >
                  <Clock className="h-6 w-6 text-blue-500" />
                </motion.div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(timeLeft / duration) * 100}%` }}
                ></div>
              </div>
            </motion.div>

            {/* Progress Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-gray-800 mb-4">
                Kesalahan ditemukan
              </h3>
              <div className="space-y-4">
                <div>
                  <motion.div
                    className="bg-emerald-50 p-3 rounded-lg text-center"
                    whileHover={{ y: -2 }}
                  >
                    <p className="text-2xl font-bold text-emerald-600">
                      {Object.values(feedback).filter(Boolean).length}
                    </p>
                    <p className="text-xs text-emerald-800">Terkoreksi</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Finish Button */}
            <motion.button
              onClick={handleFinish}
              disabled={finished}
              className={`w-full px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm
                ${
                  finished
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-md"
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={!finished ? { scale: 1.02 } : {}}
              whileTap={!finished ? { scale: 0.98 } : {}}
            >
              {finished ? "Mengarahkan ke hasil..." : "Selesaikan Challenge"}
            </motion.button>

            {/* Challenge Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Mode Challenge</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  • Temukan semua kesalahan dalam waktu {formatTime(duration)}
                </p>
                <p>• Tidak ada petunjuk jumlah kesalahan</p>
                <p>• Tes berakhir otomatis saat waktu habis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
