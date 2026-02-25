import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryAPI } from "../../api/endpoints";
import {
  Building2,
  Home,
  Building,
  Warehouse,
  Hotel,
  Castle,
} from "lucide-react";

const icons = [Building2, Home, Building, Warehouse, Hotel, Castle];

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    categoryAPI
      .list()
      .then((r) => setCategories(r.data.results || r.data))
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;
  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">
              Find exactly what you're looking for
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat, i) => {
              const Icon = icons[i % icons.length];
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/listings?category=${cat.id}`)}
                  className="card group flex flex-col items-center gap-3 p-6 text-center
                           transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                >
                  <div className="rounded-xl bg-primary-50 p-3 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
                    <Icon size={28} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesSection;
