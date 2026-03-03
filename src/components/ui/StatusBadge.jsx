export default function StatusBadge({ status }) {
  const styles = {
    Active:   "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Inactive: "bg-gray-100   text-gray-500   border border-gray-200",
    Pending:  "bg-amber-100  text-amber-600  border border-amber-200",
  };
  const dots = {
    Active: "bg-emerald-500",
    Inactive: "bg-gray-400",
    Pending: "bg-amber-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}