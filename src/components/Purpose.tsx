"use client";

import { motion } from "framer-motion";
import { Lightbulb, Eye, BookOpenCheck } from "lucide-react";

export default function PurposeSection() {
  const features = [
    {
      icon: <Lightbulb className="h-8 w-8 text-indigo-600" />,
      title: "Meningkatkan Ketelitian",
      description:
        "Melatih pengguna untuk lebih teliti membaca dan memperhatikan detail dalam teks berbahasa Indonesia.",
    },
    {
      icon: <BookOpenCheck className="h-8 w-8 text-indigo-600" />,
      title: "Memahami Tata Bahasa",
      description:
        "Membantu pengguna memahami struktur kalimat, ejaan, dan penggunaan kata yang sesuai dengan kaidah Bahasa Indonesia.",
    },
    {
      icon: <Eye className="h-8 w-8 text-indigo-600" />,
      title: "Melatih Konsentrasi",
      description:
        "Mendorong fokus dan konsentrasi dengan interaksi langsung terhadap kata atau kalimat dalam teks.",
    },
  ];

  return (
    <section id="benefits" className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
        >
          Tujuan & Manfaat SiTeliti
        </motion.h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          SiTeliti dirancang untuk menjadi media interaktif yang membantu siapa saja — pelajar, guru, hingga orang tua — meningkatkan kemampuan berbahasa Indonesia dengan cara menyenangkan.
        </p>

        <div className="grid gap-8 md:grid-cols-3 text-left">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
