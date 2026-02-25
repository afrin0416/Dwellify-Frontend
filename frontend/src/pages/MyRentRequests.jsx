import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { rentAPI, paymentAPI } from "../api/endpoints";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StatusBadge from "../components/common/StatusBadge";
import toast from "react-hot-toast";
import { CreditCard } from "lucide-react";

export default function MyRentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(null);

  useEffect(() => {
    rentAPI.mine()
      .then((r) => setRequests(r.data.results || r.data))
      .catch(() => toast.error("Failed to load."))
      .finally(() => setLoading(false));
  }, []);

  const pay = async (reqId, type) => {
    setPaying(`${reqId}-${type}`);
    try {
      const { data } = await paymentAPI.initiate({
        rent_request_id: reqId,
        payment_type: type,
      });
      window.location.href = data.gateway_url;
    } catch (err) {
      toast.error(err.response?.data?.error || "Payment failed.");
    } finally {
      setPaying(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">My Rent Requests</h1>

      {requests.length === 0 ? (
        <div className="card mt-8 py-16 text-center">
          <p className="text-gray-400">No rent requests yet.</p>
          <Link to="/listings" className="btn-primary mt-4 inline-flex">
            Browse Listings
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {requests.map((rr) => (
            <div key={rr.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link
                    to={`/listings/${rr.advertisement}`}
                    className="text-lg font-semibold text-primary-700 hover:underline"
                  >
                    {rr.advertisement_title}
                  </Link>
                  <p className="mt-1 text-sm text-gray-500">
                    Sent on {new Date(rr.created_at).toLocaleDateString()}
                  </p>
                  {rr.message && (
                    <p className="mt-2 text-sm text-gray-600">"{rr.message}"</p>
                  )}
                </div>
                <StatusBadge status={rr.status} />
              </div>

              {rr.status === "accepted" && (
                <div className="mt-4 flex flex-wrap gap-3 border-t pt-4">
                  <button
                    onClick={() => pay(rr.id, "rent")}
                    disabled={paying === `${rr.id}-rent`}
                    className="btn-primary !py-2 !text-xs"
                  >
                    <CreditCard size={15} />
                    {paying === `${rr.id}-rent` ? "Redirecting…" : "Pay Rent"}
                  </button>
                  <button
                    onClick={() => pay(rr.id, "security_deposit")}
                    disabled={paying === `${rr.id}-security_deposit`}
                    className="btn-secondary !py-2 !text-xs"
                  >
                    <CreditCard size={15} />
                    {paying === `${rr.id}-security_deposit`
                      ? "Redirecting…"
                      : "Pay Security Deposit"}
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