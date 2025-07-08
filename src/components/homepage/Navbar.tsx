"use client";

import Link from "next/link";
import { useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const sectionIds = [
    "hero",
    "how-it-works",
    "demo",
    "features",
    "benefits"
  ];
  const activeSection = useScrollSpy(sectionIds, 80);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="#hero" onClick={() => setIsOpen(false)} className="group">
            <span className="text-2xl font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
              Teli<span className="text-indigo-600 group-hover:text-gray-900 transition-colors duration-300">Kata</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {sectionIds.map((id) => (
              <NavLink
                key={id}
                href={`#${id}`}
                isActive={activeSection === id}
                onClick={() => setIsOpen(false)}
              >
                {menuTitle(id)}
              </NavLink>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-center">
                <span
                  className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-0.5"
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-gray-700 mt-1.5 transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-gray-700 mt-1.5 transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-0.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-sm">
          {sectionIds.map((id) => (
            <MobileNavLink
              key={id}
              href={`#${id}`}
              isActive={activeSection === id}
              onClick={() => setIsOpen(false)}
            >
              {menuTitle(id)}
            </MobileNavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Menu title mapping
function menuTitle(id: string) {
  const map: Record<string, string> = {
    hero: "Beranda",
    "how-it-works": "Cara Kerja",
    demo: "Demo Interaktif",
    features: "Fitur",
    benefits: "Manfaat",
  };
  return map[id] || id;
}

// Desktop NavLink
function NavLink({
  href,
  onClick,
  children,
  isActive,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        isActive
          ? "text-indigo-600 font-semibold"
          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
      }`}
    >
      {children}
    </Link>
  );
}

// Mobile NavLink
function MobileNavLink({
  href,
  onClick,
  children,
  isActive,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 text-base rounded-lg font-medium transition ${
        isActive
          ? "text-indigo-600 bg-gray-100"
          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
      }`}
    >
      {children}
    </Link>
  );
}
