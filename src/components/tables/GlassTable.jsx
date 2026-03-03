import { users } from "../../data/users";

const maxRevenue = Math.max(...users.map((u) => u.revenue));

export default function GlassTable() {
  return (
    <div className="p-px rounded-3xl" style={{ background: "linear-gradient(135deg,#667eea,#764ba2,#f093fb)" }}>
      <div className="rounded-[23px] overflow-hidden" style={{ background: "rgba(10,5,30,0.88)", backdropFilter: "blur(20px)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg,#667eea,#f093fb)" }}>⚡</div>
            <div>
              <h2 className="text-white font-bold text-base">Revenue Dashboard</h2>
              <p className="text-white/40 text-xs">Live member performance</p>
            </div>
          </div>
          <span className="text-xs text-white/50 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">🟢 Live</span>
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Member", "Role", "Status", "Joined", "Revenue", "Share"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] uppercase tracking-[2px] text-white/25 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const pct = (u.revenue / maxRevenue) * 100;
              return (
                <tr key={u.id} className="border-t border-white/[0.05] hover:bg-white/[0.03] transition-colors">
                  {/* Member */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                        style={{ background: u.color + "22", border: `1px solid ${u.color}44`, color: u.color }}
                      >
                        {u.avatar}
                      </div>
                      <span className="text-white/90 text-sm font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white/35 text-sm">{u.role}</td>
                  <td className="px-5 py-4">
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: u.status === "Active" ? "rgba(16,185,129,0.15)" : u.status === "Pending" ? "rgba(245,158,11,0.15)" : "rgba(107,114,128,0.15)",
                        color: u.status === "Active" ? "#34d399" : u.status === "Pending" ? "#fbbf24" : "#9ca3af",
                        border: `1px solid ${u.status === "Active" ? "rgba(52,211,153,0.3)" : u.status === "Pending" ? "rgba(251,191,36,0.3)" : "rgba(156,163,175,0.3)"}`
                      }}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/30 text-xs">{u.joined}</td>
                  <td className="px-5 py-4 text-white font-bold">${u.revenue.toLocaleString()}</td>
                  {/* Progress bar */}
                  <td className="px-5 py-4 min-w-[120px]">
                    <div className="bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${u.color}, ${u.color}66)`, boxShadow: `0 0 8px ${u.color}88` }}
                      />
                    </div>
                    <p className="text-[10px] text-white/25 mt-1">{Math.round(pct)}% of top</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}