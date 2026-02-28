import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminAPI } from "../api/endpoints";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StatusBadge from "../components/common/StatusBadge";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Trash2, ExternalLink } from "lucide-react";

export default function AdminAdvertisements() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pending");

  const fetch = (status) => {
    setLoading(true);
    const fetcher =
      status === "pending" ? adminAPI.pending() : adminAPI.allAds({ status });
    fetcher
      .then((r) => setAds(r.data.results || r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => fetch(tab), [tab]);

  const approve = async (id, status) => {
    try {
      await adminAPI.approve(id, status);
      toast.success(`Advertisement ${status}!`);
      fetch(tab);
    } catch (err) {
      toast.error("Failed.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this advertisement?")) return;
    try {
      await adminAPI.deleteAd(id);
      toast.success("Deleted!");
      fetch(tab);
    } catch {
      toast.error("Failed.");
    }
  };

  const tabs = ["pending", "approved", "rejected"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">
        Manage Advertisements
      </h1>

      <div className="mt-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition cursor-pointer ${
              tab === t
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : ads.length === 0 ? (
        <div className="card mt-8 py-16 text-center text-gray-400">
          No {tab} advertisements.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="card flex flex-wrap items-center justify-between gap-4 p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={ad.image || "https://via.placeholder.com/80"}
                  alt=""
                  className="h-16 w-20 rounded-lg object-cover"
                />
                <div>
                  <Link
                    to={`/dist/${ad.id}`}
                    className="font-semibold text-gray-900 hover:text-primary-600"
                  >
                    {ad.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {ad.city} • ৳{Number(ad.rent_amount).toLocaleString()} • by{" "}
                    {ad.owner_username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={ad.status} />
                {ad.status === "pending" && (
                  <>
                    <button
                      onClick={() => approve(ad.id, "approved")}
                      className="btn-success py-1.5! px-3!!text-xs"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button
                      onClick={() => approve(ad.id, "rejected")}
                      className="btn-danger py-1.5! px-3! text-xs!"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => remove(ad.id)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
