// components/ExplanationPanel.tsx
"use client";

import { motion } from "framer-motion";
import { FileText, ChevronRight } from "lucide-react";
import { Correction } from "@/types/types";

interface Props {
  corrections: Record<string, Correction>;
  feedback: { [index: number]: boolean };
  originalWords: string[];
}

export default function ExplanationPanel({ corrections, feedback, originalWords }: Props) {
  const renderCorrectionExplanation = (
    [idx, item]: [string, Correction],
    i: number
  ) => {
    const index = Number(idx);
    if (!feedback[index]) return null;

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
              <span className="text-sm font-medium text-gray-500">Kata salah:</span>
              <motion.span
                className="text-sm font-medium bg-red-50 text-red-700 px-2 py-1 rounded"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {originalWords[index]}
              </motion.span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-500">Koreksi:</span>
              <motion.span
                className="text-sm font-medium bg-green-50 text-green-700 px-2 py-1 rounded"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
              >
                {item.correct.join(" ")}
              </motion.span>
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium text-gray-600">Penjelasan:</span> {item.explanation}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const hasCorrection = Object.entries(corrections).some(
    ([idx]) => feedback[Number(idx)]
  );

  if (!hasCorrection) return null;

  return (
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
          <h2 className="text-xl font-semibold text-gray-800">Detail Koreksi</h2>
        </div>
        <div className="space-y-4 mt-4">
          {Object.entries(corrections).map(renderCorrectionExplanation)}
        </div>
      </div>
    </motion.div>
  );
}
