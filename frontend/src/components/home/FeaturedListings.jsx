import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { adsAPI } from "../../api/endpoints";
import AdvertisementCard from "../advertisements/AdvertisementCard";
import LoadingSpinner from "../common/LoadingSpinner";

const FeaturedListings = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adsAPI
      .list({ page_size: 6 })
      .then((r) => setAds(r.data.results || r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="section-title">Featured dist</h2>
            <p className="section-subtitle">
              Hand-picked properties waiting for you
            </p>
          </div>
          <Link
            to="/dist"
            className="hidden items-center gap-1 text-sm font-semibold text-primary-600 transition hover:text-primary-800 sm:flex"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : ads.length === 0 ? (
          <p className="mt-10 text-center text-gray-400">
            No dist yet. Be the first to post!
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ads.slice(0, 6).map((ad) => (
              <AdvertisementCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link to="/dist" className="btn-secondary">
            View all dist <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default FeaturedListings;
