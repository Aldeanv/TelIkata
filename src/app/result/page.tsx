"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Explanation, ResultData } from "@/types/types";
import {
  RotateCw,
  AlertCircle,
  Check,
  Clock,
  BarChart2,
  Eye,
  FileText,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ResultPage() {
  const [result, setResult] = useState<ResultData | null>(null);
  const pathname = usePathname();
  const [isOriginalExpanded, setOriginalExpanded] = useState(false);
  const [isCorrectedExpanded, setCorrectedExpanded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("siteliti_result");
    if (stored) {
      const parsed: ResultData = JSON.parse(stored);

      if (!parsed.isChallengeMode && !parsed.difficulty) {
        const segments = pathname.split("/");
        if (segments.length >= 4) {
          parsed.difficulty = segments[3];
        }
      }

      setResult(parsed);
    }
  }, [pathname]);

  if (!result)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat hasil tes...</p>
      </div>
    );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const accuracy = Math.round((result.correct / result.totalErrors) * 100);
  const untouched = Math.round(
    ((result.totalWords - result.clicked) / result.totalWords) * 100
  );

  const errorIndices = result.explanations.map((exp) => exp.index);

  const renderOriginalText = () => {
    const words = result.original.split(" ");
    const limit = 40;
    const displayedWords = isOriginalExpanded ? words : words.slice(0, limit);

    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="text-gray-800 leading-relaxed tracking-wide">
          {displayedWords.map((word, index) => (
            <span
              key={index}
              className={`
              relative px-0.5
              ${
                errorIndices.includes(index)
                  ? "text-red-600 font-medium bg-red-50 rounded"
                  : "text-gray-700"
              }
            `}
            >
              {word}{" "}
            </span>
          ))}
        </div>

        {words.length > limit && (
          <button
            onClick={() => setOriginalExpanded(!isOriginalExpanded)}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
          >
            {isOriginalExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Tutup
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Selengkapnya
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  const renderCorrectedText = () => {
    const words = result.corrected.split(" ");
    const limit = 40;
    const displayedWords = isCorrectedExpanded ? words : words.slice(0, limit);

    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="text-gray-800 leading-relaxed tracking-wide">
          {displayedWords.map((word, index) => (
            <span
              key={index}
              className={`
              relative px-0.5
              ${
                errorIndices.includes(index)
                  ? "text-green-600 font-medium bg-green-50 rounded"
                  : "text-gray-700"
              }
            `}
            >
              {word}{" "}
            </span>
          ))}
        </div>

        {words.length > limit && (
          <button
            onClick={() => setCorrectedExpanded(!isCorrectedExpanded)}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
          >
            {isCorrectedExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Tutup
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Selengkapnya
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4 sm:px-6">
      <div className="max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 sm:p-8"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-emerald-600" strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hasil Tes Ketelitian
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
              Berikut analisis dari tes yang telah Anda kerjakan
            </p>
          </div>

          {/* Mode & Info */}
          <div className="mb-8 text-center">
            {result.isChallengeMode ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                <Zap className="h-4 w-4" />
                Mode Challenge - {result.difficulty}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">
                <FileText className="h-4 w-4" />
                Mode Normal -{" "}
                <span className="capitalize text-gray-700 ml-1">
                  {result.difficulty ?? "tidak diketahui"}
                </span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <StatCard
              icon={<Clock className="h-5 w-5" />}
              value={formatTime(result.time)}
              label="Waktu Pengerjaan"
              color="blue"
            />
            <StatCard
              icon={<BarChart2 className="h-5 w-5" />}
              value={`${accuracy}%`}
              label="Akurasi Koreksi"
              color="emerald"
            />
            <StatCard
              icon={<Eye className="h-5 w-5" />}
              value={`${untouched}%`}
              label="Akurasi Ketepatan"
              color="violet"
            />
            <StatCard
              icon={<FileText className="h-5 w-5" />}
              value={`${result.correct}/${result.totalErrors}`}
              label="Koreksi Benar"
              color="amber"
            />
          </div>

          {/* Text Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <TextCard
              title="Teks Asli"
              content={renderOriginalText()}
              icon={<AlertCircle className="h-5 w-5 text-gray-400" />}
              badgeColor="gray"
            />
            <TextCard
              title="Teks Koreksi"
              content={renderCorrectedText()}
              icon={<Check className="h-5 w-5 text-emerald-500" />}
              badgeColor="emerald"
            />
          </div>

          {/* Explanations */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-50 p-2 rounded-lg mr-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Detail Koreksi
              </h2>
            </div>

            {result.explanations.length > 0 ? (
              <div className="space-y-3">
                {result.explanations.map((item, idx) => (
                  <ExplanationCard key={idx} item={item} index={idx} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-500">
                  Tidak ada koreksi yang berhasil dilakukan
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => {
                localStorage.removeItem("siteliti_result");
                window.location.href = "/";
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <RotateCw className="h-4 w-4" />
              Coba Lagi
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const StatCard = ({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: "blue" | "emerald" | "violet" | "amber";
}) => {
  const colorMap = {
    blue: { bg: "bg-blue-50", text: "text-blue-600" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
    violet: { bg: "bg-violet-50", text: "text-violet-600" },
    amber: { bg: "bg-amber-50", text: "text-amber-600" },
  };

  return (
    <div className={`${colorMap[color].bg} p-4 rounded-xl`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${colorMap[color].text}`}>{icon}</div>
        <div>
          <div className={`text-2xl font-semibold ${colorMap[color].text}`}>
            {value}
          </div>
          <div className="text-sm text-gray-500 mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
};

const TextCard = ({
  title,
  content,
  icon,
  badgeColor,
}: {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  badgeColor: "gray" | "emerald";
}) => {
  const colorMap = {
    gray: { bg: "bg-gray-100", text: "text-gray-600" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <div
          className={`p-1.5 rounded-md ${colorMap[badgeColor].bg} ${colorMap[badgeColor].text}`}
        >
          {icon}
        </div>
        <h3 className="font-medium text-gray-700 text-sm">{title}</h3>
      </div>
      <div className="p-4 bg-gray-50">
        <div className="text-gray-800 text-sm leading-relaxed">{content}</div>
      </div>
    </div>
  );
};

const ExplanationCard = ({
  item,
  index,
}: {
  item: Explanation;
  index: number;
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-start gap-4">
        <div className="bg-indigo-100 text-indigo-600 rounded-lg w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">
          {index + 1}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-500">SALAH:</span>
            <span className="text-sm font-medium bg-red-50 text-red-600 px-2 py-1 rounded">
              {item.wrong}
            </span>
            <span className="text-xs text-gray-400">→</span>
            <span className="text-xs font-medium text-gray-500">BENAR:</span>
            <span className="text-sm font-medium bg-emerald-50 text-emerald-600 px-2 py-1 rounded">
              {item.correct}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Alasan:</span>{" "}
            {item.explanation}
          </div>
        </div>
      </div>
    </div>
  );
};
