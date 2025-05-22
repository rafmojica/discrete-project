import React, { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo / Home */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-200">
          Discreet App 🤫
        </Link>

        {/* Hamburger Button (mobile) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Nav Links */}
        <ul
          className={`
            ${isOpen ? "block" : "hidden"}
            md:flex md:items-center md:space-x-8
            space-y-2 md:space-y-0
            absolute md:static top-full left-0 w-full md:w-auto
            bg-blue-600 md:bg-transparent
            px-6 py-4 md:p-0
          `}
        >
          <li>
            <Link
              to="/set-operations"
              className="block hover:text-blue-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Set Operations
            </Link>
          </li>
          <li>
            <Link
              to="/truth-table"
              className="block hover:text-blue-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Truth Tables
            </Link>
          </li>
          <li>
            <Link
              to="/prime-factorization"
              className="block hover:text-blue-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Prime Factorization
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
