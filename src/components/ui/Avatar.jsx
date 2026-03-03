export default function Avatar({ initials, color }) {
  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
      style={{ background: color + "22", border: `1px solid ${color}55`, color }}
    >
      {initials}
    </div>
  );
}