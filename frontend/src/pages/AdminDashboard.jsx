import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminAPI } from "../api/endpoints";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  Home,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  FileText,
  CreditCard,
  BarChart3,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI
      .stats()
      .then((r) => setStats(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!stats) return null;

  const cards = [
    {
      icon: Home,
      label: "Total dist",
      value: stats.total_advertisements,
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: CheckCircle,
      label: "Approved",
      value: stats.total_approved,
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      icon: Clock,
      label: "Pending",
      value: stats.total_pending,
      color: "text-amber-600 bg-amber-100",
    },
    {
      icon: XCircle,
      label: "Rejected",
      value: stats.total_rejected,
      color: "text-red-600 bg-red-100",
    },
    {
      icon: Users,
      label: "Total Users",
      value: stats.total_users,
      color: "text-purple-600 bg-purple-100",
    },
    {
      icon: FileText,
      label: "Rent Requests",
      value: stats.total_rent_requests,
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      icon: Star,
      label: "Reviews",
      value: stats.total_reviews,
      color: "text-amber-600 bg-amber-100",
    },
    {
      icon: Home,
      label: "Rented",
      value: stats.total_rented,
      color: "text-teal-600 bg-teal-100",
    },
    {
      icon: BarChart3,
      label: "This Month",
      value: stats.advertisements_this_month,
      color: "text-cyan-600 bg-cyan-100",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <div key={i} className="card flex items-center gap-4 p-5">
            <div className={`rounded-xl p-3 ${c.color}`}>
              <c.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{c.value}</p>
              <p className="text-sm text-gray-500">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link to="/admin/advertisements" className="btn-primary text-center">
          Manage Advertisements
        </Link>
        <Link to="/admin/users" className="btn-secondary text-center">
          Manage Users
        </Link>
        <Link to="/dist/create" className="btn-secondary text-center">
          Create Listing
        </Link>
      </div>
    </div>
  );
}
