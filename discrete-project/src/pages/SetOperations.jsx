// import React, { useEffect } from "react";
// import Navbar from "../components/Navbar";

// const SetOperations = () => {
//     const[set_A, set_B] = useState(new Set([1,2,3,4]));




//     return (
//         <>
//             <Navbar/>
//             <h1>This is Set Operations</h1>
//         </>
//     );
// };

// export default SetOperations;


import React, { useState } from "react";
import Navbar from "../components/Navbar";

/*
  -----------------------------------------------------------------------------
  SetOperations.jsx
  -----------------------------------------------------------------------------
  A self‑contained React page that lets a visitor define any number (n) of sets
  and then build / evaluate set‑theory expressions interactively.
  ‑ Supported binary operations:
      • Union (U or +)
      • Intersection (∩)
      • Difference (\ or –)
      • Symmetric Difference (Δ)
  ‑ Supports real (double / floating‑point) elements.
  -----------------------------------------------------------------------------
*/

// ---------- Pure helper functions ----------
const parseSetInput = (str) => {
  // Accept numbers separated by commas / spaces. Allow duplicates & ignore blanks.
  const elems = str
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number);
  return new Set(elems);
};

const setUnion = (A, B) => new Set([...A, ...B]);
const setIntersection = (A, B) => new Set([...A].filter((x) => B.has(x)));
const setDifference = (A, B) => new Set([...A].filter((x) => !B.has(x)));
const setSymDiff = (A, B) => {
  const diffAB = [...A].filter((x) => !B.has(x));
  const diffBA = [...B].filter((x) => !A.has(x));
  return new Set([...diffAB, ...diffBA]);
};

// Operator metadata
const OPS = {
  "+": { prec: 1, fn: setUnion, symbol: "∪" },
  "U": { prec: 1, fn: setUnion, symbol: "∪" },
  "∪": { prec: 1, fn: setUnion, symbol: "∪" },
  "-": { prec: 1, fn: setDifference, symbol: "\\" },
  "\\": { prec: 1, fn: setDifference, symbol: "\\" },
  "∩": { prec: 2, fn: setIntersection, symbol: "∩" },
  "^": { prec: 1, fn: setSymDiff, symbol: "Δ" },
  "Δ": { prec: 1, fn: setSymDiff, symbol: "Δ" },
};

// Shunting‑yard + RPN evaluation for basic binary set ops
const evaluateExpression = (raw, setDict) => {
  const tokens = raw.match(/S\d+|[∩U\\+\-\^Δ()]|\s+/g)?.filter((t) => !/\s+/.test(t)) || [];
  const out = [];
  const stack = [];

  for (const tok of tokens) {
    if (/^S\d+$/.test(tok)) {
      out.push(tok);
    } else if (tok in OPS) {
      while (
        stack.length &&
        stack[stack.length - 1] in OPS &&
        OPS[stack[stack.length - 1]].prec >= OPS[tok].prec
      ) {
        out.push(stack.pop());
      }
      stack.push(tok);
    } else if (tok === "(") {
      stack.push(tok);
    } else if (tok === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") out.push(stack.pop());
      stack.pop(); // discard "("
    }
  }
  while (stack.length) out.push(stack.pop());

  // Evaluate RPN
  const valStack = [];
  for (const t of out) {
    if (/^S\d+$/.test(t)) {
      valStack.push(setDict[t]);
    } else if (t in OPS) {
      const B = valStack.pop();
      const A = valStack.pop();
      valStack.push(OPS[t].fn(A, B));
    }
  }
  return valStack.pop();
};

const displaySet = (S) => `{${[...S].join(", ")}}`;

// ---------- React Component ----------
const SetOperations = () => {
  const [step, setStep] = useState("chooseN"); // chooseN | defineSets | calculator
  const [n, setN] = useState(0);
  const [currentDef, setCurrentDef] = useState(1);
  const [tempInput, setTempInput] = useState("");
  const [sets, setSets] = useState({}); // key: "S1", value: Set
  const [expr, setExpr] = useState("");
  const [output, setOutput] = useState(null);
  const [error, setError] = useState("");

  // Handlers for step 1
  const handleNSubmit = () => {
    const num = parseInt(n);
    if (isNaN(num) || num <= 0) return;
    setN(num);
    setStep("defineSets");
  };

  // Handlers for step 2
  const handleSetSubmit = () => {
    try {
      const newSet = parseSetInput(tempInput);
      setSets((prev) => ({ ...prev, ["S" + currentDef]: newSet }));
      setTempInput("");
      if (currentDef === n) {
        setStep("calculator");
      } else {
        setCurrentDef(currentDef + 1);
      }
    } catch (e) {
      setError("Invalid set format. Use numbers separated by commas");
    }
  };

  // Calculator helpers
  const pushToken = (token) => setExpr((prev) => prev + (prev && !/\s$/.test(prev) ? " " : "") + token + " ");

  const clearExpr = () => {
    setExpr("");
    setOutput(null);
    setError("");
  };

  const backspace = () => {
    setExpr((prev) => prev.trim().replace(/\S+\s*$/, ""));
  };

  const handleEvaluate = () => {
    try {
      const res = evaluateExpression(expr.trim(), sets);
      setOutput(displaySet(res));
      setError("");
    } catch (e) {
      setOutput(null);
      setError("Could not evaluate expression. Check syntax.");
    }
  };

  // ---------------- UI ----------------
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl p-4 font-sans">
        <h1 className="text-2xl font-bold mb-4">Set Operations Calculator</h1>

        {step === "chooseN" && (
          <section>
            <p className="mb-2">How many sets do you want to define?</p>
            <input
              type="number"
              min="1"
              value={n || ""}
              onChange={(e) => setN(e.target.value)}
              className="border p-1 mr-2 w-24"
            />
            <button
              onClick={handleNSubmit}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Confirm
            </button>
          </section>
        )}

        {step === "defineSets" && (
          <section>
            <p className="mb-2">Define Set {currentDef} (comma‑separated numbers):</p>
            <input
              type="text"
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              className="border p-1 mr-2 w-64"
            />
            <button
              onClick={handleSetSubmit}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </section>
        )}

        {step === "calculator" && (
          <section className="space-y-4">
            {/* Set buttons */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: n }, (_, i) => (
                <button
                  key={i}
                  onClick={() => pushToken("S" + (i + 1))}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  S{i + 1}
                </button>
              ))}
            </div>

            {/* Operator buttons */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(OPS).filter((k) => k.length === 1).map((op) => (
                <button
                  key={op}
                  onClick={() => pushToken(op)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  {OPS[op].symbol || op}
                </button>
              ))}
              <button onClick={() => pushToken("(")} className="bg-gray-200 px-3 py-1 rounded">
                (
              </button>
              <button onClick={() => pushToken(")")} className="bg-gray-200 px-3 py-1 rounded">
                )
              </button>
            </div>

            {/* Expression display */}
            <div className="border p-2 min-h-[3rem] font-mono bg-gray-50 rounded">
              {expr || <span className="text-gray-400">Expression appears here…</span>}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button onClick={handleEvaluate} className="bg-blue-600 text-white px-3 py-1 rounded">
                Evaluate
              </button>
              <button onClick={backspace} className="bg-yellow-500 text-white px-3 py-1 rounded">
                Backspace
              </button>
              <button onClick={clearExpr} className="bg-red-600 text-white px-3 py-1 rounded">
                Clear
              </button>
            </div>

            {/* Output */}
            {output && (
              <p className="mt-4">
                <strong>Result:</strong> {output}
              </p>
            )}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </section>
        )}
      </main>
    </>
  );
};

export default SetOperations;