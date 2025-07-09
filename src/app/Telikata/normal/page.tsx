"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { ChevronUp, ChevronDown, ArrowLeft, Clock } from "lucide-react";
import {
  ResultData,
  Explanation,
  Sample,
  Correction,
  Difficulty,
} from "@/types/types";
import IfEmpty from "@/components/testpage/IfEmpty";
import TextField from "@/components/testpage/TextField";
import ExplanationPanel from "@/components/testpage/ExplanationPanel";
import Loading from "@/components/testpage/Loading";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const isValidLevel = (value: string | null): value is Difficulty =>
  ["mudah", "menengah", "sulit"].includes(value ?? "");

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

const progressBarVariants = {
  initial: { width: 0 },
  animate: (percentage: number) => ({
    width: `${percentage}%`,
    transition: { duration: 0.5, ease: easeOut },
  }),
};

const hintVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      opacity: { duration: 0.2 },
      height: { duration: 0.3 },
    },
  },
};

type NormalizedSample = Omit<Sample, "corrections"> & {
  corrections: Record<string, Correction>;
};

export default function TestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = isValidLevel(searchParams.get("level"))
    ? searchParams.get("level")!
    : "mudah";

  const [samples, setSamples] = useState<NormalizedSample[]>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [sampleIndex, setSampleIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [corrections, setCorrections] = useState<{ [index: number]: string }>(
    {}
  );
  const [feedback, setFeedback] = useState<{ [index: number]: boolean }>({});
  const [clickedWords, setClickedWords] = useState<number[]>([]);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const res = await fetch(`/api/samples?level=${level}`);
        const data: Sample[] = await res.json();

        if (!data || data.length === 0) {
          setIsDataEmpty(true);
          return;
        }

        const normalized: NormalizedSample[] = data.map((sample) => {
          const correctionMap: Record<string, Correction> = {};
          for (const c of Object.values(sample.corrections)) {
            correctionMap[c.wordIndex.toString()] = c;
          }
          return { ...sample, corrections: correctionMap };
        });

        setSamples(normalized);
        const randomIndex = Math.floor(Math.random() * normalized.length);
        setSampleIndex(randomIndex);
      } catch (err) {
        console.error("Failed to fetch samples:", err);
        setIsDataEmpty(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSamples();
  }, [level]);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (isDataEmpty) {
    return <IfEmpty level={searchParams.get("level") || "Challenge"} />;
  }

  if (isLoading || sampleIndex === null) {
    return <Loading />;
  }

  const sample = samples[sampleIndex];
  const originalWords = sample.original.split(" ");
  const totalErrors = Object.keys(sample.corrections).length;
  const correctedCount = Object.values(feedback).filter(Boolean).length;
  const remainingErrors = totalErrors - correctedCount;
  const progressPercentage = (correctedCount / totalErrors) * 100;

  const handleWordClick = (index: number) => {
    if (!isTimerRunning || finished) return;
    setClickedWords((prev) => (prev.includes(index) ? prev : [...prev, index]));
    if (sample.corrections[index]) {
      setEditingIndex(index);
    } else {
      setEditingIndex(null);
    }
  };

  const handleChangeCorrection = (value: string) => {
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

    const correctedText = originalWords
      .map((word, index) => (feedback[index] ? corrections[index] : word))
      .join(" ");

    const explanations = Object.entries(sample.corrections)
      .map(([indexStr, info]) => {
        const index = parseInt(indexStr);
        return feedback[index]
          ? {
              index,
              wrong: originalWords[index],
              correct: info.correct.join(" "),
              explanation: info.explanation,
            }
          : null;
      })
      .filter((e): e is Explanation => e !== null);

    const resultData: ResultData = {
      time: timer,
      totalErrors,
      correct: correctedCount,
      clicked: clickedWords.length,
      totalWords: originalWords.length,
      original: sample.original,
      corrected: correctedText,
      explanations,
      difficulty: level,
      isChallengeMode: false,
    };

    localStorage.setItem("siteliti_result", JSON.stringify(resultData));
    setTimeout(() => router.push("/result"), 500);
  };

  const renderWord = (word: string, index: number) => {
    const isEditing = editingIndex === index;
    const userCorrection = corrections[index];
    const isCorrect = feedback[index];
    const isWrongWord = index in sample.corrections;

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
        {isEditing && isWrongWord ? (
          <motion.input
            autoFocus
            value={userCorrection ?? word}
            onChange={(e) => handleChangeCorrection(e.target.value)}
            onBlur={() => setEditingIndex(null)}
            onKeyDown={(e) => e.key === "Enter" && setEditingIndex(null)}
            className="bg-white border-2 border-blue-400 rounded px-2 py-1 text-base focus:ring-2 focus:ring-blue-200 focus:outline-none transition min-w-[50px]"
            variants={inputVariants}
            whileFocus="focus"
          />
        ) : (
          <span>{userCorrection ?? word}</span>
        )}
      </motion.span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 sm:px-6 relative">
      {/* Back Button */}
      <motion.button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="h-6 w-6 text-gray-600" />
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
            Tes Ketelitian Bahasa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Temukan dan perbaiki kesalahan ejaan dalam teks berikut
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Text Editor Card */}
            <TextField originalWords={originalWords} renderWord={renderWord} />

            {/* Explanations Panel */}
            <AnimatePresence>
              <ExplanationPanel
                corrections={sample.corrections}
                feedback={feedback}
                originalWords={originalWords}
              />
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
                    Waktu Pengerjaan
                  </h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {formatTime(timer)}
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
            </motion.div>

            {/* Progress Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-gray-800 mb-4">
                Progress Koreksi
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Kesalahan ditemukan</span>
                    <span className="font-medium">
                      {correctedCount}/{totalErrors}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-blue-600 h-2.5 rounded-full"
                      variants={progressBarVariants}
                      initial="initial"
                      animate="animate"
                      custom={progressPercentage}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="bg-emerald-50 p-3 rounded-lg text-center"
                    whileHover={{ y: -2 }}
                  >
                    <p className="text-2xl font-bold text-emerald-600">
                      {correctedCount}
                    </p>
                    <p className="text-xs text-emerald-800">Terkoreksi</p>
                  </motion.div>
                  <motion.div
                    className="bg-red-50 p-3 rounded-lg text-center"
                    whileHover={{ y: -2 }}
                  >
                    <p className="text-2xl font-bold text-red-600">
                      {remainingErrors}
                    </p>
                    <p className="text-xs text-red-800">Belum diperbaiki</p>
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
              {finished ? "Mengarahkan ke hasil..." : "Selesaikan Tes"}
            </motion.button>

            {/* Hint Section */}
            {timer >= 120 && (
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-800">Butuh bantuan?</h4>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                  >
                    {showHint ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Sembunyikan
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Tampilkan petunjuk
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      variants={hintVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="overflow-hidden"
                    >
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg text-sm text-blue-900 space-y-2 border border-blue-100">
                        <p className="font-medium">
                          Daftar kata yang mengandung kesalahan:
                        </p>
                        <ul className="space-y-2">
                          {Object.entries(sample.corrections).map(
                            ([idx, item]) => (
                              <motion.li
                                key={idx}
                                className="flex items-start"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: parseInt(idx) * 0.05 }}
                              >
                                <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs mr-2 mt-0.5">
                                  {parseInt(idx) + 1}
                                </span>
                                <div>
                                  <span className="text-red-600 font-medium">
                                    {originalWords[parseInt(idx)]}
                                  </span>
                                  <span className="mx-2">→</span>
                                  <span className="text-emerald-600 font-medium">
                                    {item.correct.join(" ")}
                                  </span>
                                </div>
                              </motion.li>
                            )
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
