// ─────────────────────────────────────────────
//  StatusBadge.jsx
//  Colored pill badge for order status
//  Usage: <StatusBadge status="Paid" />
//  Accepts: "Paid" | "Pending" | "Failed" | "Refunded"
// ─────────────────────────────────────────────

import { statusCfg } from "../../data/data";

export default function StatusBadge({ status }) {
  const cfg = statusCfg[status] || statusCfg.Pending;

  return (
    <span
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            6,
        padding:        "4px 10px",
        borderRadius:   20,
        fontSize:       12,
        fontWeight:     600,
        background:     cfg.bg,
        color:          cfg.color,
        border:         `1px solid ${cfg.border}`,
        whiteSpace:     "nowrap",
      }}
    >
      {/* Dot */}
      <span
        style={{
          width:        6,
          height:       6,
          borderRadius: "50%",
          background:   cfg.color,
          flexShrink:   0,
        }}
      />
      {status}
    </span>
  );
}