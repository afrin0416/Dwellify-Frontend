import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { rentAPI } from "../api/endpoints";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StatusBadge from "../components/common/StatusBadge";
import toast from "react-hot-toast";
import { Check, X } from "lucide-react";

export default function ReceivedRentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(null);

  const fetch = () => {
    setLoading(true);
    rentAPI
      .received()
      .then((r) => setRequests(r.data.results || r.data))
      .catch(() => toast.error("Failed to load."))
      .finally(() => setLoading(false));
  };

  useEffect(fetch, []);

  const handle = async (id, action) => {
    setActing(`${id}-${action}`);
    try {
      await rentAPI.handle(id, action);
      toast.success(`Request ${action}ed!`);
      fetch();
    } catch (err) {
      toast.error(err.response?.data?.error || "Action failed.");
    } finally {
      setActing(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">
        Received Rent Requests
      </h1>

      {requests.length === 0 ? (
        <div className="card mt-8 py-16 text-center">
          <p className="text-gray-400">No requests received yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {requests.map((rr) => (
            <div key={rr.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link
                    to={`/listings/${rr.advertisement}`}
                    className="font-semibold text-primary-700 hover:underline"
                  >
                    {rr.advertisement_title}
                  </Link>
                  <p className="mt-1 text-sm text-gray-500">
                    From <strong>{rr.requester_username}</strong> (
                    {rr.requester_email})
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(rr.created_at).toLocaleString()}
                  </p>
                  {rr.message && (
                    <p className="mt-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                      "{rr.message}"
                    </p>
                  )}
                </div>
                <StatusBadge status={rr.status} />
              </div>

              {rr.status === "pending" && (
                <div className="mt-4 flex gap-3 border-t pt-4">
                  <button
                    onClick={() => handle(rr.id, "accept")}
                    disabled={acting === `${rr.id}-accept`}
                    className="btn-success !py-2"
                  >
                    <Check size={16} />
                    {acting === `${rr.id}-accept` ? "…" : "Accept"}
                  </button>
                  <button
                    onClick={() => handle(rr.id, "reject")}
                    disabled={acting === `${rr.id}-reject`}
                    className="btn-danger !py-2"
                  >
                    <X size={16} />
                    {acting === `${rr.id}-reject` ? "…" : "Reject"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
