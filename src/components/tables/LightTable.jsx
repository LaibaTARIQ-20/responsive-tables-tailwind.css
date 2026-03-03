import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { users } from "../../data/users";
import StatusBadge from "../ui/StatusBadge";

export default function LightTable() {
  const [sortCol, setSortCol]   = useState(null);
  const [sortDir, setSortDir]   = useState(1);
  const [search, setSearch]     = useState("");

  const handleSort = (col) => {
    if (sortCol === col) setSortDir((d) => -d);
    else { setSortCol(col); setSortDir(1); }
  };

  const filtered = users
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortCol ? (a[sortCol] > b[sortCol] ? sortDir : -sortDir) : 0
    );

  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <ChevronsUpDown size={12} className="text-gray-300" />;
    return sortDir === 1
      ? <ChevronUp size={12} className="text-indigo-500" />
      : <ChevronDown size={12} className="text-indigo-500" />;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div>
          <h2 className="text-gray-900 font-bold text-base">Members Directory</h2>
          <p className="text-gray-400 text-xs mt-0.5">Click columns to sort</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-indigo-300 w-44 transition-colors"
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {[["name","Name"],["role","Role"],["status","Status"],["revenue","Revenue"]].map(([col, label]) => (
              <th
                key={col}
                onClick={() => handleSort(col)}
                className="px-5 py-3 text-left cursor-pointer select-none group"
              >
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-semibold tracking-wide ${sortCol === col ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-600"} transition-colors`}>
                    {label}
                  </span>
                  <SortIcon col={col} />
                </div>
              </th>
            ))}
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u, i) => (
            <tr key={u.id} className={`border-t border-gray-50 hover:bg-indigo-50/40 transition-colors ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}99)` }}
                  >
                    {u.avatar}
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">{u.name}</p>
                    <p className="text-gray-400 text-[11px]">{u.joined}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3.5 text-gray-500 text-sm">{u.role}</td>
              <td className="px-5 py-3.5"><StatusBadge status={u.status} /></td>
              <td className="px-5 py-3.5 text-gray-900 font-bold text-sm">${u.revenue.toLocaleString()}</td>
              <td className="px-5 py-3.5">
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors font-medium">Edit</button>
                  <button className="text-xs px-3 py-1.5 rounded-md border border-red-100 text-red-400 hover:bg-red-50 transition-colors font-medium">Remove</button>
                </div>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400 text-sm">No results found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}