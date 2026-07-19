"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
          onClick={closeMenu}
        >
          HackathonHub
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            About
          </Link>

          <Link
            href="/hackathons"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Hackathons
          </Link>

          <Link
            href="/contact"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Contact
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg border border-blue-600 px-5 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-gray-800 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              About
            </Link>

            <Link
              href="/hackathons"
              onClick={closeMenu}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Hackathons
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>

            <div className="mt-3 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={closeMenu}
                className="rounded-lg border border-blue-600 px-5 py-3 text-center font-semibold text-blue-600"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={closeMenu}
                className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;