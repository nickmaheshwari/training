"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "../images/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-stone-700 border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-xl font-bold text-blue-600">
              <Image src={logo} width={80} height={80} alt="logo" />
            </Link>
          </div>

          {/* Empty div to maintain flex spacing */}
          <div className="w-10"></div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute top-16 left-0 w-full bg-white border-b border-gray-200
          transform transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="space-y-1">
            <Link
              href="/feel"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              I want to feel...
            </Link>
            <Link
              href="/catch-up"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Catch Me Up
            </Link>
            <Link
              href="/my-algo"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              My Algo
            </Link>
            <Link
              href="/ad-contributions"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              My Ad Contributions
            </Link>
            <Link
              href="/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Settings
            </Link>
            <Link
              href="/our-vision"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Our Vision
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
