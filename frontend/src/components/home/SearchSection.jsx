import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, DollarSign, BedDouble } from "lucide-react";

const SearchSection = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    max_rent: "",
    bedrooms: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.city) params.set("city", filters.city);
    if (filters.max_rent) params.set("max_rent", filters.max_rent);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
    navigate(`/dist?${params.toString()}`);
  };
  return (
    <>
      <section className="-mt-8 relative z-10 mx-auto max-w-5xl px-4">
        <form
          onSubmit={handleSubmit}
          className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:gap-3 shadow-xl"
        >
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-500">
              <Search size={13} className="mr-1 inline" />
              Keyword
            </label>
            <input
              className="input-field"
              placeholder="Search by title…"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-500">
              <MapPin size={13} className="mr-1 inline" />
              City
            </label>
            <input
              className="input-field"
              placeholder="e.g. Dhaka"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            />
          </div>
          <div className="w-full sm:w-36">
            <label className="mb-1 block text-xs font-medium text-gray-500">
              <DollarSign size={13} className="mr-1 inline" />
              Max Rent
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="৳ Max"
              value={filters.max_rent}
              onChange={(e) =>
                setFilters({ ...filters, max_rent: e.target.value })
              }
            />
          </div>
          <div className="w-full sm:w-32">
            <label className="mb-1 block text-xs font-medium text-gray-500">
              <BedDouble size={13} className="mr-1 inline" />
              Beds
            </label>
            <select
              className="input-field"
              value={filters.bedrooms}
              onChange={(e) =>
                setFilters({ ...filters, bedrooms: e.target.value })
              }
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary sm:px-8!">
            <Search size={18} /> Search
          </button>
        </form>
      </section>
    </>
  );
};

export default SearchSection;
