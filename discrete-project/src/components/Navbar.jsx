import React, { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-200">
          Discreet App 🤫
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav Links */}
        <ul
          className={`flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 absolute md:static top-full left-0 w-full md:w-auto bg-blue-600 md:bg-transparent transition-transform transform duration-200 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <li>
            <Link
              to="/set-operations"
              className="block px-6 py-2 hover:text-blue-200"
              onClick={() => setIsOpen(false)}
            >
              Set Operations
            </Link>
          </li>
          <li>
            <Link
              to="/truth-table"
              className="block px-6 py-2 hover:text-blue-200"
              onClick={() => setIsOpen(false)}
            >
              Truth Tables
            </Link>
          </li>
          <li>
            <Link
              to="/prime-factorization"
              className="block px-6 py-2 hover:text-blue-200"
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
