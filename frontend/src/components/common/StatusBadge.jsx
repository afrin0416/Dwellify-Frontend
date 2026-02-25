const map = {
  pending: "badge-pending",
  approved: "badge-approved",
  rejected: "badge-rejected",
  accepted: "badge-accepted",
  completed: "badge bg-emerald-100 text-emerald-800",
  failed: "badge bg-red-100 text-red-800",
  cancelled: "badge bg-gray-100 text-gray-800",
  refunded: "badge bg-purple-100 text-purple-800",
  initiated: "badge bg-blue-50 text-blue-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span className={map[status] || "badge bg-gray-100 text-gray-700"}>
      {status}
    </span>
  );
}

export default StatusBadge