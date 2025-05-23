import React, { useState } from "react";
import Navbar from "../components/Navbar";

// ---------------- Prime-factor logic ----------------
const factorize = (n) => {
  if (n < 2) return [];
  const factors = [];
  let divisor = 2;
  while (n > 1) {
    while (n % divisor === 0) {
      factors.push(divisor);
      n = Math.floor(n / divisor);
    }
    divisor++;
  }
  return factors;
};

// ---------------- Tree building ----------------
class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const buildTree = (n) => {
  if (isPrime(n)) return new TreeNode(n);
  for (let i = 2; i <= n; i++) {
    if (n % i === 0) {
      const left = buildTree(i);
      const right = buildTree(n / i);
      return new TreeNode(n, left, right);
    }
  }
};

// ------------ Tree rendering components ------------
const FactorNode = ({ node, isRoot = false }) => {
  const hasChildren = !!(node.left || node.right);

  return (
    <li className="relative flex flex-col items-center list-none">
      {/* vertical line up to parent */}
      {!isRoot && (
        <span
          className="absolute -top-4 left-1/2 w-px h-4 bg-gray-400 transform -translate-x-1/2"
        />
      )}

      {/* the value box */}
      <div className="bg-blue-100 border border-blue-300 rounded px-3 py-1 text-sm font-medium">
        {node.value}
      </div>

      {/* children + horizontal branch */}
      {hasChildren && (
        <ul className="relative flex justify-center items-start mt-6 space-x-8">
          {/* horizontal line connecting children */}
          <span className="absolute top-0 left-0 right-0 h-px bg-gray-400" />
          <FactorNode node={node.left} />
          <FactorNode node={node.right} />
        </ul>
      )}
    </li>
  );
};

const FactorTree = ({ root }) => (
  <ul className="flex justify-center">
    <FactorNode node={root} isRoot />
  </ul>
);

// ---------------- Main Component ----------------
const PrimeFactorization = () => {
  const [value, setValue] = useState("");
  const [factors, setFactors] = useState([]);
  const [treeRoot, setTreeRoot] = useState(null);
  const [error, setError] = useState("");

  const handleFactorize = () => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 2) {
      setError("Please enter an integer greater than 1");
      setFactors([]);
      setTreeRoot(null);
      return;
    }

    setError("");
    setFactors(factorize(num));
    setTreeRoot(buildTree(num));
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-md p-4 font-sans space-y-6">
        <h1 className="text-2xl font-bold">Prime Factorization</h1>

        {/* Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="number" className="font-medium">
            Enter a positive integer ≥2:
          </label>
          <input
            id="number"
            type="number"
            min="2"
            step="1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={handleFactorize}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Factorize
        </button>

        {error && <p className="text-red-600">{error}</p>}

        {factors.length > 0 && (
          <p className="text-lg">
            <strong>Prime factors:</strong> {factors.join(" × ")}
          </p>
        )}

        {treeRoot && (
          <div>
            <h2 className="text-lg font-bold mt-4 mb-2 text-center">
              Factor Tree
            </h2>
            <div className="overflow-x-auto">
              <FactorTree root={treeRoot} />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PrimeFactorization;