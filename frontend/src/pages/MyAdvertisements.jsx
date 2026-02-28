import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adsAPI } from "../api/endpoints";
import AdvertisementCard from "../components/advertisements/AdvertisementCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function MyAdvertisements() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    setLoading(true);
    adsAPI
      .mine()
      .then((r) => setAds(r.data.results || r.data))
      .catch(() => toast.error("Failed to load."))
      .finally(() => setLoading(false));
  };

  useEffect(fetch, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My dist</h1>
        <Link to="/dist/create" className="btn-primary">
          <PlusCircle size={18} /> New Listing
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : ads.length === 0 ? (
        <div className="card mt-10 py-20 text-center">
          <p className="text-lg text-gray-400">
            You haven't posted any dist yet.
          </p>
          <Link to="/dist/create" className="btn-primary mt-4 inline-flex">
            <PlusCircle size={18} /> Create your first listing
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <AdvertisementCard key={ad.id} ad={ad} showStatus />
          ))}
        </div>
      )}
    </div>
  );
}
