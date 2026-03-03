/* eslint-disable react-hooks/set-state-in-effect */
// ─────────────────────────────────────────────
//  OrderTable.jsx
// ─────────────────────────────────────────────

import { useEffect, useState } from "react";
import { orders } from "../../data/data";
import Avatar from "../ui/Avatar";
import StatusBadge from "../ui/StatusBadge";
import Pagination from "../ui/Pagination";

export default function OrderTable({ dark }) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [hovered, setHovered] = useState(null);

  // ── Theme colors ──────────────────────────────────────────
  const c = {
    bg: dark ? "#0f1117" : "#ffffff",
    bg2: dark ? "#13151c" : "#f8fafc",
    border: dark ? "rgba(255,255,255,0.07)" : "#e2e8f0",
    text: dark ? "#f1f5f9" : "#0f172a",
    sub: dark ? "rgba(255,255,255,0.4)" : "#64748b",
    muted: dark ? "rgba(255,255,255,0.2)" : "#94a3b8",
    inputBg: dark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
    inputBrd: dark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
    rowHov: dark ? "rgba(255,255,255,0.03)" : "#f8fafc",
  };

  // ── Helpers ───────────────────────────────────────────────
  const filtered = orders.filter(
    (o) =>
      (o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "All" || o.status === filter)
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;

  // Auto-adapt: clamp page whenever totalPages changes (filters/search)
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = filtered.slice(startIndex, endIndex);

  const totalRevenue = orders
    .filter((o) => o.status === "Paid")
    .reduce((acc, o) => acc + o.amount, 0);

  const toggleAll = () =>
    setSelected(selected.length === orders.length ? [] : orders.map((o) => o.id));

  const toggleOne = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // ── Render ────────────────────────────────────────────────
  return (
    <div
      style={{
        background: c.bg,
        borderRadius: 16,
        border: `1px solid ${c.border}`,
        overflow: "hidden",
        boxShadow: dark
          ? "0 8px 32px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${c.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: c.text }}>
            Order Management
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: c.sub }}>
            {filtered.length} transactions ·{" "}
            <span style={{ color: "#10b981", fontWeight: 600 }}>
              ${totalRevenue.toLocaleString()} collected
            </span>
          </p>
        </div>

        {/* Search + Export */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: c.muted,
                fontSize: 14,
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search orders…"
              style={{
                background: c.inputBg,
                border: `1px solid ${c.inputBrd}`,
                borderRadius: 8,
                padding: "8px 12px 8px 34px",
                fontSize: 13,
                color: c.text,
                outline: "none",
                width: 190,
                fontFamily: "inherit",
              }}
            />
          </div>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "#3b82f6",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* ── FILTER TABS ── */}
      <div
        style={{
          padding: "12px 24px",
          borderBottom: `1px solid ${c.border}`,
          display: "flex",
          gap: 8,
          overflowX: "auto",
        }}
      >
        {["All", "Paid", "Pending", "Failed", "Refunded"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setPage(1);
            }}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
              background: filter === f ? "#3b82f6" : c.inputBg,
              color: filter === f ? "#ffffff" : c.sub,
              border:
                filter === f ? "1px solid #3b82f6" : `1px solid ${c.inputBrd}`,
            }}
          >
            {f}{" "}
            {f !== "All" && (
              <span style={{ opacity: 0.7 }}>
                {orders.filter((o) => o.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── STATS BAR ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        {[
          { label: "Total Orders", value: orders.length, clr: c.text },
          { label: "Paid", value: orders.filter((o) => o.status === "Paid").length, clr: "#10b981" },
          { label: "Pending", value: orders.filter((o) => o.status === "Pending").length, clr: "#f59e0b" },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, clr: "#3b82f6" },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "14px 24px",
              background: c.bg2,
              borderRight: i < 3 ? `1px solid ${c.border}` : "none",
            }}
          >
            <p style={{ margin: 0, fontSize: 11, color: c.muted, textTransform: "uppercase", letterSpacing: 1 }}>
              {s.label}
            </p>
            <p style={{ margin: "5px 0 0", fontSize: 22, fontWeight: 800, color: s.clr }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── TABLE ── */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
          {/* Head */}
          <thead>
            <tr style={{ background: c.bg2 }}>
              <th style={{ padding: "12px 24px", width: 44, textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={selected.length === orders.length}
                  onChange={toggleAll}
                  style={{ width: 14, height: 14, cursor: "pointer", accentColor: "#3b82f6" }}
                />
              </th>
              {["ORDER ID", "CUSTOMER", "PRODUCT", "DATE", "AMOUNT", "STATUS", ""].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 600,
                    color: c.muted,
                    letterSpacing: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {currentPageData.map((o) => (
              <tr
                key={`${o.id}-${o.customer}`}
                onMouseEnter={() => setHovered(o.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderTop: `1px solid ${c.border}`,
                  background: hovered === o.id ? c.rowHov : "transparent",
                  transition: "background 0.15s",
                }}
              >
                {/* Checkbox */}
                <td style={{ padding: "14px 24px", textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={selected.includes(o.id)}
                    onChange={() => toggleOne(o.id)}
                    style={{ width: 14, height: 14, cursor: "pointer", accentColor: "#3b82f6" }}
                  />
                </td>

                {/* Order ID */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", fontFamily: "monospace" }}>
                    {o.id}
                  </span>
                </td>

                {/* Customer */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar initials={o.avatar} color={o.color} size={36} />
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: c.text }}>
                        {o.customer}
                      </p>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: c.sub }}>
                        {o.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Product */}
                <td style={{ padding: "14px 16px", fontSize: 13, color: c.sub, whiteSpace: "nowrap" }}>
                  {o.product}
                </td>

                {/* Date */}
                <td style={{ padding: "14px 16px", fontSize: 12, color: c.muted, whiteSpace: "nowrap" }}>
                  {o.date}
                </td>

                {/* Amount */}
                <td style={{ padding: "14px 16px", fontSize: 15, fontWeight: 700, color: c.text }}>
                  ${o.amount}
                </td>

                {/* Status */}
                <td style={{ padding: "14px 16px" }}>
                  <StatusBadge status={o.status} />
                </td>

                {/* View button */}
                <td style={{ padding: "14px 16px" }}>
                  <button
                    style={{
                      padding: "5px 12px",
                      borderRadius: 7,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      background: "transparent",
                      border: `1px solid ${c.border}`,
                      color: c.sub,
                      opacity: hovered === o.id ? 1 : 0,
                      transition: "opacity 0.15s",
                    }}
                  >
                    View →
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: "48px", textAlign: "center", color: c.muted, fontSize: 14 }}>
                  No orders match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          padding: "14px 24px",
          borderTop: `1px solid ${c.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: c.muted }}>
          {selected.length > 0
            ? `${selected.length} rows selected`
            : `Showing ${currentPageData.length} of ${filtered.length} orders`}
        </p>

        <Pagination
          current={page}
          total={totalPages}
          onChange={(p) => setPage(p)}
          gap={1}
          dark={dark}
        />
      </div>
    </div>
  );
}