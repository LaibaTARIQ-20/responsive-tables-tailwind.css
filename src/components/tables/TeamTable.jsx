// ─────────────────────────────────────────────
//  TeamTable.jsx
//  Team / HR management table with:
//  - Search by name or department
//  - Sortable columns (click any header)
//  - Presence dot on avatar (Online/Busy/Away/Offline)
//  - Department colored pill
//  - Task progress bar (color coded)
//  - Hover-reveal Edit / Remove buttons
//  - Dark / Light theme via `dark` prop
//
//  Usage: <TeamTable dark={true} />
// ─────────────────────────────────────────────

import { useState } from "react";
import { teamMembers, presenceColors, deptColors } from "../../data/data";
import Avatar from "../ui/Avatar";

export default function TeamTable({ dark }) {
  const [sortCol, setSortCol] = useState("name");
  const [sortDir, setSortDir] = useState(1);
  const [search,  setSearch]  = useState("");
  const [hovered, setHovered] = useState(null);

  // ── Theme colors ──────────────────────────────────────────
  const c = {
    bg:       dark ? "#111318"               : "#ffffff",
    bg2:      dark ? "#14161e"               : "#f8fafc",
    border:   dark ? "rgba(255,255,255,0.07)": "#e2e8f0",
    text:     dark ? "#f1f5f9"               : "#0f172a",
    sub:      dark ? "rgba(255,255,255,0.4)" : "#64748b",
    muted:    dark ? "rgba(255,255,255,0.2)" : "#94a3b8",
    inputBg:  dark ? "rgba(255,255,255,0.06)": "#f1f5f9",
    inputBrd: dark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
    rowHov:   dark ? "rgba(255,255,255,0.03)": "#f8fafc",
    track:    dark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
    dotBd:    dark ? "#111318"               : "#ffffff",
  };

  // ── Sort logic ────────────────────────────────────────────
  const handleSort = col => {
    if (sortCol === col) setSortDir(d => -d);
    else { setSortCol(col); setSortDir(1); }
  };

  // ── Filtered + sorted rows ────────────────────────────────
  const sorted = [...teamMembers]
    .filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.dept.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a[sortCol] > b[sortCol] ? sortDir : -sortDir);

  // ── Column definitions ────────────────────────────────────
  const cols = [
    { key: "name",   label: "MEMBER"   },
    { key: "dept",   label: "DEPT"     },
    { key: "role",   label: "ROLE"     },
    { key: "status", label: "STATUS"   },
    { key: "tasks",  label: "PROGRESS" },
    { key: "joined", label: "SINCE"    },
  ];

  // ── Render ────────────────────────────────────────────────
  return (
    <div
      style={{
        background:   c.bg,
        borderRadius: 16,
        border:       `1px solid ${c.border}`,
        overflow:     "hidden",
        boxShadow:    dark
          ? "0 8px 32px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >

      {/* ── HEADER ── */}
      <div
        style={{
          padding:        "20px 24px",
          borderBottom:   `1px solid ${c.border}`,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            16,
          flexWrap:       "wrap",
        }}
      >
        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width:          42,
              height:         42,
              borderRadius:   12,
              fontSize:       20,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              background:     dark ? "rgba(99,102,241,0.15)" : "#ede9fe",
              border:         dark ? "1px solid rgba(99,102,241,0.3)" : "1px solid #c4b5fd",
            }}
          >
            👥
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: c.text }}>
              Team Members
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: c.sub }}>
              {teamMembers.length} people ·{" "}
              <span style={{ color: "#10b981", fontWeight: 600 }}>
                {teamMembers.filter(m => m.status === "Online").length} online now
              </span>
            </p>
          </div>
        </div>

        {/* Search + Add */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position:     "absolute",
                left:         10,
                top:          "50%",
                transform:    "translateY(-50%)",
                color:        c.muted,
                fontSize:     14,
                pointerEvents:"none",
              }}
            >
              🔍
            </span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search people…"
              style={{
                background:   c.inputBg,
                border:       `1px solid ${c.inputBrd}`,
                borderRadius: 8,
                padding:      "8px 12px 8px 34px",
                fontSize:     13,
                color:        c.text,
                outline:      "none",
                width:        190,
                fontFamily:   "inherit",
              }}
            />
          </div>
          <button
            style={{
              padding:      "8px 16px",
              borderRadius: 8,
              background:   "#6366f1",
              border:       "none",
              color:        "#ffffff",
              fontSize:     13,
              fontWeight:   600,
              cursor:       "pointer",
            }}
          >
            + Add Member
          </button>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>

          {/* Head */}
          <thead>
            <tr style={{ background: c.bg2 }}>
              {cols.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    padding:       "12px 20px",
                    textAlign:     "left",
                    fontSize:      11,
                    fontWeight:    600,
                    letterSpacing: 1,
                    cursor:        "pointer",
                    userSelect:    "none",
                    whiteSpace:    "nowrap",
                    color:         sortCol === col.key ? "#6366f1" : c.muted,
                    transition:    "color 0.15s",
                  }}
                >
                  {col.label}{" "}
                  {sortCol === col.key
                    ? <span style={{ color: "#6366f1" }}>{sortDir === 1 ? "↑" : "↓"}</span>
                    : <span style={{ opacity: 0.3 }}>⇅</span>
                  }
                </th>
              ))}
              <th
                style={{
                  padding:       "12px 20px",
                  textAlign:     "left",
                  fontSize:      11,
                  fontWeight:    600,
                  color:         c.muted,
                  letterSpacing: 1,
                }}
              >
                ACTIONS
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {sorted.map(m => {
              const pct           = Math.round((m.done / m.tasks) * 100);
              const dc            = deptColors[m.dept]     || "#6366f1";
              const pc            = presenceColors[m.status];
              const progressColor = pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444";

              return (
                <tr
                  key={m.name}
                  onMouseEnter={() => setHovered(m.name)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    borderTop:  `1px solid ${c.border}`,
                    background: hovered === m.name ? c.rowHov : "transparent",
                    transition: "background 0.15s",
                  }}
                >

                  {/* Member + avatar + presence dot */}
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <Avatar initials={m.avatar} color={m.color} size={38} />
                        {/* Presence dot */}
                        <span
                          style={{
                            position:     "absolute",
                            bottom:       -1,
                            right:        -1,
                            width:        11,
                            height:       11,
                            borderRadius: "50%",
                            background:   pc,
                            border:       `2px solid ${c.dotBd}`,
                          }}
                        />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: c.text }}>
                          {m.name}
                        </p>
                        <p style={{ margin: "2px 0 0", fontSize: 12, color: c.sub }}>
                          {m.name.toLowerCase().replace(" ", ".")}@company.com
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Department pill */}
                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        padding:      "4px 10px",
                        borderRadius: 7,
                        fontSize:     12,
                        fontWeight:   600,
                        background:   dc + "18",
                        color:        dc,
                        border:       `1px solid ${dc}35`,
                      }}
                    >
                      {m.dept}
                    </span>
                  </td>

                  {/* Role */}
                  <td style={{ padding: "16px 20px", fontSize: 13, color: c.sub, whiteSpace: "nowrap" }}>
                    {m.role}
                  </td>

                  {/* Online status */}
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span
                        style={{
                          width:        8,
                          height:       8,
                          borderRadius: "50%",
                          background:   pc,
                          flexShrink:   0,
                        }}
                      />
                      <span style={{ fontSize: 13, color: c.sub }}>{m.status}</span>
                    </div>
                  </td>

                  {/* Progress bar */}
                  <td style={{ padding: "16px 20px", minWidth: 160 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          flex:         1,
                          height:       6,
                          borderRadius: 3,
                          background:   c.track,
                          overflow:     "hidden",
                        }}
                      >
                        <div
                          style={{
                            height:     "100%",
                            width:      `${pct}%`,
                            borderRadius: 3,
                            background: progressColor,
                            transition: "width 0.6s ease",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize:   12,
                          fontWeight: 700,
                          color:      progressColor,
                          minWidth:   32,
                          textAlign:  "right",
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: c.muted }}>
                      {m.done} of {m.tasks} tasks
                    </p>
                  </td>

                  {/* Since year */}
                  <td style={{ padding: "16px 20px", fontSize: 13, color: c.sub }}>
                    {m.joined}
                  </td>

                  {/* Actions (show on hover) */}
                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        display:    "flex",
                        gap:        8,
                        opacity:    hovered === m.name ? 1 : 0,
                        transition: "opacity 0.15s",
                      }}
                    >
                      <button
                        style={{
                          padding:      "5px 12px",
                          borderRadius: 7,
                          fontSize:     12,
                          fontWeight:   500,
                          cursor:       "pointer",
                          background:   "transparent",
                          border:       `1px solid ${c.border}`,
                          color:        c.sub,
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          padding:      "5px 12px",
                          borderRadius: 7,
                          fontSize:     12,
                          fontWeight:   500,
                          cursor:       "pointer",
                          background:   "transparent",
                          border:       "1px solid rgba(239,68,68,0.3)",
                          color:        "#ef4444",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          padding:        "14px 24px",
          borderTop:      `1px solid ${c.border}`,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            8,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: c.muted }}>
          Showing {sorted.length} of {teamMembers.length} members
        </p>

        {/* Presence legend */}
        <div style={{ display: "flex", gap: 12 }}>
          {Object.entries(presenceColors).map(([s, col]) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: col }} />
              <span style={{ fontSize: 12, color: c.muted }}>
                {s} ({teamMembers.filter(m => m.status === s).length})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}