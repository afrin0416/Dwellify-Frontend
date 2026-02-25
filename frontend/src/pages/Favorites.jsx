import { useEffect, useState } from "react";
import { favAPI } from "../api/endpoints";
import AdvertisementCard from "../components/advertisements/AdvertisementCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Heart } from "lucide-react";

export default function Favorites() {
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    favAPI
      .list()
      .then((r) => setFavs(r.data.results || r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <Heart size={24} className="text-red-500" /> My Favorites
      </h1>

      {favs.length === 0 ? (
        <div className="card mt-8 py-20 text-center">
          <p className="text-lg text-gray-400">No favorites yet.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favs.map((f) => (
            <AdvertisementCard key={f.id} ad={f.advertisement_detail} />
          ))}
        </div>
      )}
    </div>
  );
}
