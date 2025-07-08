import { motion } from "framer-motion";

export default function TextField({
  originalWords,
  renderWord,
}: {
  originalWords: string[];
  renderWord: (word: string, index: number) => React.ReactNode;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Teks yang Perlu Dikoreksi
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Klik kata untuk mengedit
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-base leading-relaxed p-4 bg-gray-50 rounded-lg">
        {originalWords.map((word, index) => renderWord(word, index))}
      </div>
    </motion.div>
  );
}
