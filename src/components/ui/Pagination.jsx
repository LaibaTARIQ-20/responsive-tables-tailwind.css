export default function Pagination({ current, total, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      {["←", ...Array.from({ length: total }, (_, i) => i + 1), "→"].map((p, i) => (
        <button
          key={i}
          onClick={() => typeof p === "number" && onChange(p)}
          className={`w-7 h-7 rounded-md text-xs font-medium transition-all
            ${p === current
              ? "bg-indigo-500 text-white"
              : "border border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"
            }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}