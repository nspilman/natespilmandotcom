"use client";
import { useState } from "react";

const OPS_PER_SECOND = 1e8;

const curves = [
  { name: "log n", color: "#4ade80", f: (n: number) => Math.log2(n) },
  { name: "n", color: "#60a5fa", f: (n: number) => n },
  { name: "n log n", color: "#fbbf24", f: (n: number) => n * Math.log2(n) },
  { name: "n²", color: "#f87171", f: (n: number) => n * n },
];

const formatTime = (ops: number) => {
  const s = ops / OPS_PER_SECOND;
  if (s < 1e-3) return `${(s * 1e6).toFixed(2)} µs`;
  if (s < 1) return `${(s * 1e3).toFixed(1)} ms`;
  if (s < 60) return `${s.toFixed(1)} s`;
  if (s < 3600) return `${(s / 60).toFixed(1)} min`;
  if (s < 86400) return `${(s / 3600).toFixed(1)} hours`;
  return `${(s / 86400).toFixed(1)} days`;
};

const W = 600;
const H = 300;

export default function BigOGrowth() {
  // Slider moves through powers of 10 so small and huge n both get room.
  const [exp, setExp] = useState(2);
  const [logScale, setLogScale] = useState(false);
  const n = Math.round(10 ** exp);

  const yMax = n * n;
  const toY = (v: number) =>
    logScale
      ? H - (Math.log10(Math.max(v, 1)) / Math.log10(Math.max(yMax, 10))) * H
      : H - (v / yMax) * H;

  const path = (f: (n: number) => number) =>
    Array.from({ length: 101 }, (_, i) => {
      const x = 1 + ((n - 1) * i) / 100;
      return `${i ? "L" : "M"}${(i / 100) * W},${toY(f(x)).toFixed(1)}`;
    }).join(" ");

  return (
    <div className="my-8 rounded-lg border border-gray-700 p-4 not-prose">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full bg-gray-900 rounded">
        {curves.map((c) => (
          <path key={c.name} d={path(c.f)} stroke={c.color} strokeWidth={2.5} fill="none" />
        ))}
      </svg>

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
      <label className="mt-2 block text-sm text-gray-300">
        <input
          type="checkbox"
          checked={logScale}
          onChange={(e) => setLogScale(e.target.checked)}
          className="mr-2"
        />
        log scale y-axis
      </label>

      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400">
            <th>complexity</th>
            <th>operations</th>
            <th>time at 100M ops/sec</th>
          </tr>
        </thead>
        <tbody>
          {curves.map((c) => (
            <tr key={c.name} style={{ color: c.color }}>
              <td>{c.name}</td>
              <td className="font-mono">{Math.round(c.f(n)).toLocaleString()}</td>
              <td className="font-mono">{formatTime(c.f(n))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
