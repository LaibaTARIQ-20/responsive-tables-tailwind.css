/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from "react";

// Returns an array like: [1, 2, 3, 4, "gap", 65, 66]
function getPaginationItems(current, total, siblings = 1) {
  // If total pages are small, show everything (no ellipses needed)
  const maxVisible =
    2 + // first + last
    (2 * siblings + 1) + // window around current
    2; // possible two gaps

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const first = 1;
  const last = total;

  // Keep window away from the edges because we always show first/last
  const left = Math.max(current - siblings, 2);
  const right = Math.min(current + siblings, total - 1);

  const items = [first];

  // Left gap / fill
  if (left > 2) items.push("gap-left");
  else for (let p = 2; p < left; p++) items.push(p);

  // Middle window
  for (let p = left; p <= right; p++) items.push(p);

  // Right gap / fill
  if (right < total - 1) items.push("gap-right");
  else for (let p = right + 1; p < total; p++) items.push(p);

  items.push(last);
  return items;
}

export default function Pagination({
  current,
  total,
  onChange,
  dark,
  gap = 1, // "siblings" count around current
}) {
  // Auto-adapt guardrails
  const safeTotal = Math.max(1, Number(total) || 1);
  const safeCurrent = Math.min(Math.max(1, Number(current) || 1), safeTotal);

  if (safeTotal <= 1) return null;

  const baseBtn = "px-3 py-1.5 text-sm font-medium rounded-md transition";
  const activeStyle = "bg-blue-600 text-white";

  const normalStyle = dark
    ? "text-gray-300 hover:bg-white/10"
    : "text-gray-600 hover:bg-gray-100";

  const disabledStyle = "opacity-40 cursor-not-allowed";
  const gapStyle = dark ? "text-gray-500" : "text-gray-400";

  const items = useMemo(
    () => getPaginationItems(safeCurrent, safeTotal, gap),
    [safeCurrent, safeTotal, gap]
  );

  const goTo = (p) => {
    const next = Math.min(Math.max(1, p), safeTotal);
    if (next === safeCurrent) return;
    onChange(next);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Previous */}
      <button
        disabled={safeCurrent === 1}
        onClick={() => goTo(safeCurrent - 1)}
        className={`${baseBtn} ${
          safeCurrent === 1 ? disabledStyle : normalStyle
        }`}
        aria-label="Previous page"
      >
        ←
      </button>

      {items.map((it) => {
        // Ellipsis
        if (typeof it === "string" && it.startsWith("gap")) {
          return (
            <span key={it} className={`px-2 ${gapStyle}`} aria-hidden="true">
              …
            </span>
          );
        }

        const p = it;
        return (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={`${baseBtn} ${
              p === safeCurrent ? activeStyle : normalStyle
            }`}
            aria-current={p === safeCurrent ? "page" : undefined}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={safeCurrent === safeTotal}
        onClick={() => goTo(safeCurrent + 1)}
        className={`${baseBtn} ${
          safeCurrent === safeTotal ? disabledStyle : normalStyle
        }`}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}