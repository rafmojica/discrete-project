import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router";

const Home = () => (
  <>
    <Navbar />

    {/* Hero Section */}
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Discreet App 🤫
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Generate truth tables, perform set operations, and explore prime factorization, all in one place!
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/truth-table"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Truth Tables
          </Link>
          <Link
            to="/set-operations"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Set Operations
          </Link>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          to="/truth-table"
          className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-2">Truth Tables</h3>
          <p>Create comprehensive truth tables for any Boolean expression.</p>
        </Link>

        <Link
          to="/set-operations"
          className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-2">Set Operations</h3>
          <p>Union, intersection, difference—and visualize them instantly.</p>
        </Link>

        <Link
          to="/prime-factorization"
          className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-2">Prime Factorization</h3>
          <p>Break down any integer into its prime factors with ease.</p>
        </Link>
      </div>
    </section>
  </>
);

export default Home;
