// ─────────────────────────────────────────────
//  Pagination.jsx
//  Page navigation buttons
//  Usage: <Pagination current={1} total={3} onChange={setPage} dark={true} />
// ─────────────────────────────────────────────

export default function Pagination({ current, total, onChange, dark }) {
  const pages  = ["←", ...Array.from({ length: total }, (_, i) => i + 1), "→"];
  const border = dark ? "rgba(255,255,255,0.1)"  : "#e2e8f0";
  const muted  = dark ? "rgba(255,255,255,0.25)" : "#94a3b8";

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {pages.map((p, i) => (
        <button
          key={i}
          onClick={() => typeof p === "number" && onChange(p)}
          style={{
            width:      32,
            height:     32,
            borderRadius: 8,
            fontSize:   13,
            fontWeight: 500,
            cursor:     "pointer",
            transition: "all 0.15s",
            background: p === current ? "#3b82f6"            : "transparent",
            color:      p === current ? "#ffffff"            : muted,
            border:     p === current ? "1px solid #3b82f6"  : `1px solid ${border}`,
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}