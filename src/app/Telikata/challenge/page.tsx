"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Clock, AlertTriangle } from "lucide-react";
import { sampleBank, Difficulty } from "@/data/test";

// Animation variants
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

const level: Difficulty = "challenge";
const samples = sampleBank[level];

export default function ChallengePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawDuration = searchParams.get("duration") ?? "";

  const parsedDuration = parseInt(rawDuration || "", 10);
  const duration =
    !isNaN(parsedDuration) && parsedDuration > 0 ? parsedDuration * 60 : 5 * 60;

  const [sampleIndex, setSampleIndex] = useState<number | null>(null);
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
    const index = Math.floor(Math.random() * samples.length);
    setSampleIndex(index);
    setTimeLeft(duration);
  }, [duration]);

  const handleAutoSubmit = useCallback(() => {
    if (sampleIndex === null) return;
    const sample = samples[sampleIndex];
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
  }, [
    sampleIndex,
    feedback,
    corrections,
    clickedWords,
    timeLeft,
    duration,
    router,
  ]);

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

  if (sampleIndex === null) return null;
  const sample = samples[sampleIndex];
  const originalWords = sample.original.split(" ");

  const handleWordClick = (index: number) => {
    if (!isTimerRunning || finished) return;
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
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
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
