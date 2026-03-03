// ─────────────────────────────────────────────
//  Avatar.jsx
//  A small colored circle with initials inside
//  Usage: <Avatar initials="SJ" color="#3b82f6" size={36} />
// ─────────────────────────────────────────────

export default function Avatar({ initials, color, size = 36 }) {
  return (
    <div
      style={{
        width:          size,
        height:         size,
        borderRadius:   10,
        flexShrink:     0,
        background:     color + "22",
        border:         `1.5px solid ${color}44`,
        color:          color,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontSize:       size * 0.3,
        fontWeight:     700,
      }}
    >
      {initials}
    </div>
  );
}