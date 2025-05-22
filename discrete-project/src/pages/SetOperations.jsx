import React, { useState } from "react";
import Navbar from "../components/Navbar";

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


// ---------- Pure helper functions ----------
const parseSetInput = (str) => {
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
const setComplement = (A, universe) => setDifference(universe, A);

// Operator metadata (binary only; `c` handled separately as unary postfix)
const OPS = {
  "∪": { prec: 1, fn: setUnion, symbol: "∪" },
  "+": { prec: 1, fn: setUnion }, // alias
  "U": { prec: 1, fn: setUnion }, // alias

  "∩": { prec: 2, fn: setIntersection, symbol: "∩" },

  "-": { prec: 1, fn: setDifference, symbol: "-" }, // main diff button
  "∖": { prec: 1, fn: setDifference }, // alias

  "Δ": { prec: 1, fn: setSymDiff, symbol: "Δ" },
  "^": { prec: 1, fn: setSymDiff }, // alias
};

// Shunting‑yard + RPN evaluation | complement (`c`) is postfix and highest‑precedence.
const evaluateExpression = (raw, sets) => {
  // replace "^c" with " c" to normalise aliases
  const pre = raw.replace(/\^c/g, " c");
  const tokens =
    pre.match(/S\d+|[c∩∪Δ\-\+U\^∖()]/g)?.filter((t) => !/\s+/.test(t)) || [];

  const output = [];
  const stack = [];

  tokens.forEach((tok) => {
    if (tok === "c") {
      // postfix – send straight to output
      output.push(tok);
    } else if (/^S\d+$/.test(tok)) {
      output.push(tok);
    } else if (tok in OPS) {
      while (
        stack.length &&
        stack[stack.length - 1] in OPS &&
        OPS[stack[stack.length - 1]].prec >= OPS[tok].prec
      )
        output.push(stack.pop());
      stack.push(tok);
    } else if (tok === "(") stack.push(tok);
    else if (tok === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") output.push(stack.pop());
      stack.pop();
      // If immediately followed by complement it'll be handled in next iteration.
    }
  });
  while (stack.length) output.push(stack.pop());

  // compute universe once
  const universe = Object.values(sets).reduce((acc, S) => setUnion(acc, S), new Set());

  // RPN evaluation supporting unary complement
  const valStack = [];
  output.forEach((t) => {
    if (/^S\d+$/.test(t)) valStack.push(sets[t]);
    else if (t === "c") {
      const A = valStack.pop();
      valStack.push(setComplement(A, universe));
    } else if (t in OPS) {
      const B = valStack.pop();
      const A = valStack.pop();
      valStack.push(OPS[t].fn(A, B));
    }
  });
  return valStack.pop();
};

const displaySet = (S) => `{${[...S].join(", ")}}`;

// ---------- React Component ----------
const SetOperations = () => {
  const [step, setStep] = useState("chooseN");
  const [n, setN] = useState(0);
  const [currentDef, setCurrentDef] = useState(1);
  const [tempInput, setTempInput] = useState("");
  const [sets, setSets] = useState({});
  const [expr, setExpr] = useState("");
  const [output, setOutput] = useState(null);
  const [error, setError] = useState("");
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Step 1
  const handleNSubmit = () => {
    const num = parseInt(n);
    if (!num || num <= 0) return;
    setN(num);
    setStep("defineSets");
  };

  // Step 2
  const saveSet = (key, valueStr) => {
    try {
      const newSet = parseSetInput(valueStr);
      setSets((prev) => ({ ...prev, [key]: newSet }));
      return true;
    } catch {
      setError("Invalid set format. Use numbers separated by commas.");
      return false;
    }
  };

  const handleSetSubmit = () => {
    if (saveSet("S" + currentDef, tempInput)) {
      setTempInput("");
      if (currentDef === n) setStep("calculator");
      else setCurrentDef(currentDef + 1);
    }
  };

  // Edit existing set in calculator mode
  const startEdit = (key) => {
    setEditingKey(key);
    setEditValue([...sets[key]].join(", "));
  };
  const commitEdit = () => {
    if (saveSet(editingKey, editValue)) {
      setEditingKey(null);
      setEditValue("");
    }
  };

  // Calculator helpers
  const pushToken = (token) =>
    setExpr((p) => (p && !/\s$/.test(p) ? p + " " : p) + token + " ");
  const clearExpr = () => {
    setExpr("");
    setOutput(null);
    setError("");
  };
  const backspace = () => setExpr((p) => p.trim().replace(/\S+\s*$/, ""));
  const handleEvaluate = () => {
    try {
      const res = evaluateExpression(expr.trim(), sets);
      setOutput(displaySet(res));
      setError("");
    } catch {
      setOutput(null);
      setError("Could not evaluate expression. Check syntax.");
    }
  };

  // ---------- UI ----------
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl p-4 font-sans">
        <h1 className="text-2xl font-bold mb-4">Set Operations Calculator</h1>

        {/* STEP 1 */}
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
            <button onClick={handleNSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">
              Confirm
            </button>
          </section>
        )}

        {/* STEP 2 */}
        {step === "defineSets" && (
          <section>
            <p className="mb-2">Define Set {currentDef} (comma‑separated numbers):</p>
            <input
              type="text"
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              className="border p-1 mr-2 w-64"
            />
            <button onClick={handleSetSubmit} className="bg-green-600 text-white px-3 py-1 rounded">
              Save
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </section>
        )}

        {/* STEP 3 */}
        {step === "calculator" && (
          <section className="space-y-4">
            {/* Set list with live edit */}
            <div className="grid sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded shadow-inner">
              {Array.from({ length: n }, (_, i) => {
                const key = `S${i + 1}`;
                return (
                  <div key={key} className="border rounded p-2 bg-white text-sm flex items-start justify-between gap-2">
                    {editingKey === key ? (
                      <>
                        <input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border p-1 flex-1"
                        />
                        <button onClick={commitEdit} className="bg-green-600 text-white px-2 rounded">
                          ✔
                        </button>
                      </>
                    ) : (
                      <>
                        <span>
                          <strong className="mr-1">{key}</strong> {displaySet(sets[key])}
                        </span>
                        <button onClick={() => startEdit(key)} className="bg-gray-200 px-2 rounded hover:bg-gray-300">
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: n }, (_, i) => (
                <button
                  key={i}
                  onClick={() => pushToken(`S${i + 1}`)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  S{i + 1}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["∪", "∩", "-", "Δ", "c"].map((op) => (
                <button
                  key={op}
                  onClick={() => pushToken(op)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  {op}
                </button>
              ))}
              <button onClick={() => pushToken("(")} className="bg-gray-200 px-3 py-1 rounded">
                (
              </button>
              <button onClick={() => pushToken(")")} className="bg-gray-200 px-3 py-1 rounded">
                )
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Aliases: ∪=+ or U   –=∖   Δ=^   Complement: `c` or `^c`
            </p>

            {/* Expression */}
            <div className="border p-2 min-h-[3rem] font-mono bg-gray-50 rounded">
              {expr || <span className="text-gray-400">Expression appears here…</span>}
            </div>

            {/* Actions */}
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