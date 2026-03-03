import { useState } from "react";
import { users } from "../../data/users";
import StatusBadge from "../ui/StatusBadge";
import Avatar from "../ui/Avatar";
import Pagination from "../ui/Pagination";

export default function DarkTable() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  const toggle = (id) =>
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-zinc-900 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-7 py-5 border-b border-zinc-900">
        <div>
          <p className="text-[10px] tracking-[3px] uppercase text-zinc-600 mb-1">Team Members</p>
          <h2 className="text-white text-lg font-semibold">
            All Users <span className="text-zinc-600 font-normal">— {users.length}</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs hover:border-zinc-600 transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-400 transition-colors">
            + Invite
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead className="bg-zinc-950">
          <tr>
            <th className="w-10 px-7 py-3" />
            {["Name", "Role", "Status", "Joined", "Revenue"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-[10px] tracking-[2px] uppercase text-zinc-600 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="border-t border-zinc-900 hover:bg-zinc-900/50 transition-colors cursor-pointer group"
            >
              {/* Checkbox */}
              <td className="px-7 py-4">
                <div
                  onClick={() => toggle(u.id)}
                  className={`w-4 h-4 rounded cursor-pointer flex items-center justify-center transition-all
                    ${selected.includes(u.id)
                      ? "bg-indigo-500"
                      : "border border-zinc-700 group-hover:border-zinc-500"
                    }`}
                >
                  {selected.includes(u.id) && (
                    <span className="text-white text-[9px]">✓</span>
                  )}
                </div>
              </td>
              {/* Name + Avatar */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={u.avatar} color={u.color} />
                  <span className="text-zinc-200 font-medium text-sm">{u.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-zinc-500 text-sm">{u.role}</td>
              <td className="px-4 py-4"><StatusBadge status={u.status} /></td>
              <td className="px-4 py-4 text-zinc-500 text-sm">{u.joined}</td>
              <td className="px-4 py-4 text-zinc-200 font-semibold text-sm">
                ${u.revenue.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex items-center justify-between px-7 py-4 border-t border-zinc-900">
        <span className="text-zinc-600 text-xs">
          {selected.length > 0 ? `${selected.length} selected` : "Showing 1–6 of 6"}
        </span>
        <Pagination current={page} total={3} onChange={setPage} />
      </div>
    </div>
  );
}