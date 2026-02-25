import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { adsAPI, categoryAPI } from "../api/endpoints";
import AdvertisementCard from "../components/advertisements/AdvertisementCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function AdvertisementList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    count: 0,
  });

  console.log("Adds : ", ads);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    city: searchParams.get("city") || "",
    category: searchParams.get("category") || "",
    min_rent: searchParams.get("min_rent") || "",
    max_rent: searchParams.get("max_rent") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    is_rented: searchParams.get("is_rented") || "",
  });

  useEffect(() => {
    categoryAPI
      .list()
      .then((r) => setCategories(r.data.results || r.data))
      .catch(() => {});
  }, []);

  const fetchAds = (params = {}) => {
    setLoading(true);
    const query = { ...filters, ...params };
    Object.keys(query).forEach((k) => {
      if (!query[k]) delete query[k];
    });
    adsAPI
      .list(query)
      .then((r) => {
        setAds(r.data.results || r.data);
        setPagination({
          next: r.data.next,
          previous: r.data.previous,
          count: r.data.count,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
    fetchAds();
  };

  const clearFilters = () => {
    const empty = {
      search: "",
      city: "",
      category: "",
      min_rent: "",
      max_rent: "",
      bedrooms: "",
      is_rented: "",
    };
    setFilters(empty);
    setSearchParams({});
    fetchAds(empty);
  };

  const set = (k) => (e) => setFilters({ ...filters, [k]: e.target.value });

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Browse Listings
            </h1>
            <p className="text-sm text-gray-500">
              {pagination.count || 0} properties found
            </p>
          </div>
          <button
            onClick={() => setShowFilters((p) => !p)}
            className="btn-secondary py-2! px-4! md:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Sidebar filters */}
          <aside
            className={`w-full shrink-0 lg:w-64 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <form onSubmit={applyFilters} className="card space-y-4 p-5">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Search
                </label>
                <input
                  className="input-field"
                  placeholder="Keyword…"
                  value={filters.search}
                  onChange={set("search")}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  City
                </label>
                <input
                  className="input-field"
                  placeholder="e.g. Dhaka"
                  value={filters.city}
                  onChange={set("city")}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Category
                </label>
                <select
                  className="input-field"
                  value={filters.category}
                  onChange={set("category")}
                >
                  <option value="">All</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Min ৳
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={filters.min_rent}
                    onChange={set("min_rent")}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Max ৳
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={filters.max_rent}
                    onChange={set("max_rent")}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Bedrooms
                </label>
                <select
                  className="input-field"
                  value={filters.bedrooms}
                  onChange={set("bedrooms")}
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Status
                </label>
                <select
                  className="input-field"
                  value={filters.is_rented}
                  onChange={set("is_rented")}
                >
                  <option value="">All</option>
                  <option value="false">Available</option>
                  <option value="true">Rented</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">
                <Search size={16} /> Apply
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="btn-secondary w-full"
              >
                <X size={16} /> Clear
              </button>
            </form>
          </aside>

          {/* Listings grid */}
          <div className="flex-1">
            {loading ? (
              <LoadingSpinner />
            ) : ads.length === 0 ? (
              <div className="card py-20 text-center">
                <p className="text-lg font-semibold text-gray-400">
                  No listings found
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {ads.map((ad) => (
                  <AdvertisementCard key={ad.id} ad={ad} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {(pagination.next || pagination.previous) && (
              <div className="mt-8 flex justify-center gap-4">
                <button
                  disabled={!pagination.previous}
                  onClick={() =>
                    fetchAds({
                      page: new URL(pagination.previous).searchParams.get(
                        "page",
                      ),
                    })
                  }
                  className="btn-secondary"
                >
                  Previous
                </button>
                <button
                  disabled={!pagination.next}
                  onClick={() =>
                    fetchAds({
                      page: new URL(pagination.next).searchParams.get("page"),
                    })
                  }
                  className="btn-secondary"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
