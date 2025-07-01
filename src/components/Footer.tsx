export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-10">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Si<span className="text-indigo-600">Teliti</span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Platform edukatif interaktif untuk menguji dan melatih ketelitian
            bahasa Indonesia.
          </p>
        </div>

        <div className="flex justify-center space-x-6 text-sm text-gray-600 mb-6">
          <a href="#hero" className="hover:text-indigo-600 transition">
            Beranda
          </a>
          <a href="#features" className="hover:text-indigo-600 transition">
            Fitur
          </a>
          <a href="#benefits" className="hover:text-indigo-600 transition">
            Manfaat
          </a>
        </div>

        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} SiTeliti. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
