import React, { useState } from "react";
import Navbar from "../components/Navbar";

const TruthTable = () => {
  const [varsInput, setVarsInput] = useState("");
  const [exprInput, setExprInput] = useState("");
  const [table, setTable] = useState([]);

  const generateTable = () => {
    const vars = varsInput
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    const n = vars.length;
    const rows = [];

    let expr = exprInput
      .replace(/\bAND\b/gi, "&&")
      .replace(/\bOR\b/gi, "||")
      .replace(/\bNOT\b/gi, "!")
      .replace(/×/g, "&&")
      .replace(/÷/g, "||");

    const func = new Function(...vars, `return ${expr};`);

    for (let i = 0; i < (1 << n); i++) {
      const values = vars.map((_, idx) => Boolean((i >> (n - idx - 1)) & 1));
      let result;
      try {
        result = func(...values);
      } catch {
        result = "Error";
      }
      rows.push({ values, result: Boolean(result).toString() });
    }

    setTable([{ vars, rows }]);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Truth Table Generator</h1>

        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Variables</span>
            <input
              type="text"
              value={varsInput}
              onChange={(e) => setVarsInput(e.target.value)}
              placeholder="e.g. A, B, C"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium">Expression</span>
            <input
              type="text"
              value={exprInput}
              onChange={(e) => setExprInput(e.target.value)}
              placeholder="e.g. (A AND B) OR NOT C"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <button
            onClick={generateTable}
            className="self-start bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            Generate Table
          </button>
        </div>

        {table.map(({ vars, rows }, ti) => (
          <div key={ti} className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {vars.map((v) => (
                    <th
                      key={v}
                      className="border px-3 py-2 text-center font-medium"
                    >
                      {v}
                    </th>
                  ))}
                  <th className="border px-3 py-2 text-center font-medium">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {row.values.map((val, ci) => (
                      <td key={ci} className="border px-3 py-1 text-center">
                        {val ? "1" : "0"}
                      </td>
                    ))}
                    <td className="border px-3 py-1 text-center">
                      {row.result === "Error"
                        ? "Err"
                        : row.result === "true"
                        ? "1"
                        : "0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default TruthTable;
