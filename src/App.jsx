// ─────────────────────────────────────────────
//  App.jsx  ←  ROOT FILE (goes directly in src/)
//  Controls dark/light theme + tab switching
//  Imports both table components and renders them
// ─────────────────────────────────────────────

import { useState }  from "react";
import OrderTable    from "./components/tables/OrderTable";
import TeamTable     from "./components/tables/TeamTable";

const TABS = [
  { label: "Order Management", icon: "🧾" },
  { label: "Team / HR",        icon: "👥" },
];

export default function App() {
  const [dark,   setDark]   = useState(true);   // true = dark, false = light
  const [active, setActive] = useState(0);      // 0 = OrderTable, 1 = TeamTable

  // ── Page-level colors ─────────────────────────────────────
  const pageBg  = dark ? "#09090f" : "#f1f5f9";
  const textH   = dark ? "#f1f5f9" : "#0f172a";
  const textSub = dark ? "rgba(255,255,255,0.3)" : "#94a3b8";

  return (
    <>
      {/* ── Global font + reset ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; }
        input { font-family: inherit; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.2); border-radius: 3px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      {/* ── Page wrapper ── */}
      <div
        style={{
          minHeight:  "100vh",
          background: pageBg,
          fontFamily: "'Outfit', sans-serif",
          transition: "background 0.3s",
          padding:    "48px 40px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* ── PAGE HEADER ── */}
          <div
            style={{
              display:        "flex",
              alignItems:     "flex-start",
              justifyContent: "space-between",
              marginBottom:   40,
              gap:            16,
            }}
          >
            {/* Title */}
            <div>
              <p
                style={{
                  fontSize:      11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color:         textSub,
                  fontWeight:    600,
                  marginBottom:  10,
                }}
              >
                Component Library
              </p>
              <h1
                style={{
                  fontSize:      34,
                  fontWeight:    800,
                  color:         textH,
                  letterSpacing: -0.5,
                  lineHeight:    1.1,
                }}
              >
                Production Tables
              </h1>
              <p style={{ fontSize: 14, color: textSub, marginTop: 10 }}>
                Responsive, themeable table components for real dashboards
              </p>
            </div>

            {/* Dark / Light toggle button */}
            <button
              onClick={() => setDark(d => !d)}
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        8,
                padding:    "10px 18px",
                borderRadius: 10,
                fontSize:   14,
                fontWeight: 600,
                cursor:     "pointer",
                flexShrink: 0,
                transition: "all 0.2s",
                background: dark ? "rgba(255,255,255,0.06)" : "#ffffff",
                border:     dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
                color:      dark ? "rgba(255,255,255,0.6)" : "#475569",
                boxShadow:  dark ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontSize: 16 }}>{dark ? "☀️" : "🌙"}</span>
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {/* ── TAB SWITCHER ── */}
          <div
            style={{
              display:    "inline-flex",
              gap:        4,
              padding:    4,
              borderRadius: 12,
              marginBottom: 28,
              background: dark ? "rgba(255,255,255,0.04)" : "#ffffff",
              border:     dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
              boxShadow:  dark ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {TABS.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        8,
                  padding:    "9px 20px",
                  borderRadius: 9,
                  fontSize:   14,
                  fontWeight: 600,
                  cursor:     "pointer",
                  border:     "none",
                  transition: "all 0.2s",
                  // active vs idle style
                  background: active === i
                    ? (dark ? "rgba(255,255,255,0.1)" : "#0f172a")
                    : "transparent",
                  color: active === i
                    ? "#ffffff"
                    : (dark ? "rgba(255,255,255,0.35)" : "#94a3b8"),
                }}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* ── ACTIVE TABLE ── */}
          {/* key forces re-animation when tab or theme changes */}
          <div key={`${active}-${dark}`} style={{ animation: "fadeUp 0.25s ease" }}>
            {active === 0 && <OrderTable dark={dark} />}
            {active === 1 && <TeamTable  dark={dark} />}
          </div>

        </div>
      </div>
    </>
  );
}