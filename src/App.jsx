import { useState } from "react";
import DarkTable   from "./components/tables/DarkTable";
import LightTable  from "./components/tables/LightTable";
import GlassTable  from "./components/tables/GlassTable";

const tabs = [
  { label: "🌑 Dark Luxury",    component: <DarkTable />  },
  { label: "☀️ Clean Light",   component: <LightTable /> },
  { label: "✨ Glassmorphism", component: <GlassTable /> },
];

export default function App() {
  const [active, setActive] = useState(0);
  return (
    <div className="min-h-screen bg-[#0d0d0d] p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold text-center mb-2">Table Components</h1>
        <p className="text-zinc-500 text-center text-sm mb-8">Three styles — pick your flavor</p>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-8">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${active === i
                  ? "bg-indigo-500 text-white"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-500 hover:border-zinc-600"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Active Table */}
        {tabs[active].component}
      </div>
    </div>
  );
}