"use client";
import { useState } from "react";

const terms = [
  { name: "n²", color: "#f87171", f: (n: number) => n * n },
  { name: "n log n", color: "#fbbf24", f: (n: number) => n * Math.log2(n) },
  { name: "n", color: "#60a5fa", f: (n: number) => n },
];

const formatPct = (p: number) =>
  p >= 99.99 && p < 100 ? `${p.toFixed(4)}%` : p < 0.01 ? "<0.01%" : `${p.toFixed(2)}%`;

export default function BigOShare() {
  // Slider moves through powers of 10 so small and huge n both get room.
  const [exp, setExp] = useState(0.5);
  const n = Math.max(2, Math.round(10 ** exp));

  const values = terms.map((t) => t.f(n));
  const total = values.reduce((a, b) => a + b, 0);
  const shares = values.map((v) => (v / total) * 100);

  return (
    <div className="my-8 rounded-lg border border-gray-700 p-4 not-prose">
      <p className="text-sm text-gray-400">
        Total work for an algorithm that does n² + n log n + n steps
      </p>

      <div className="mt-3 flex h-12 w-full overflow-hidden rounded">
        {terms.map((t, i) => (
          <div
            key={t.name}
            style={{ width: `${shares[i]}%`, background: t.color }}
            className="transition-[width] duration-150"
          />
        ))}
      </div>

      <label className="mt-4 block text-sm text-gray-300">
        n = <span className="font-mono text-white">{n.toLocaleString()}</span>
        <input
          type="range"
          min={0.3}
          max={6}
          step={0.01}
          value={exp}
          onChange={(e) => setExp(Number(e.target.value))}
          className="ml-3 w-2/3 align-middle"
        />
      </label>

      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400">
            <th>term</th>
            <th>steps</th>
            <th>share of total</th>
          </tr>
        </thead>
        <tbody>
          {terms.map((t, i) => (
            <tr key={t.name} style={{ color: t.color }}>
              <td>{t.name}</td>
              <td className="font-mono">{Math.round(values[i]).toLocaleString()}</td>
              <td className="font-mono">{formatPct(shares[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
