import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize, Star } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

const placeholder =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop";

const AdvertisementCard = ({ ad, showStatus = false }) => {
  return (
    <Link to={`/listings/${ad.id}`} className="card group overflow-hidden">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={ad.image || placeholder}
          alt={ad.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {ad.is_rented && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-lg bg-red-600 px-4 py-1.5 text-sm font-bold text-white">
              RENTED
            </span>
          </div>
        )}
        {showStatus && (
          <div className="absolute top-3 left-3">
            <StatusBadge status={ad.status} />
          </div>
        )}
        <div className="absolute top-3 right-3 rounded-lg bg-white/90 px-3 py-1 text-sm font-bold text-primary-700 shadow backdrop-blur">
          ৳{Number(ad.rent_amount).toLocaleString()}/mo
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="truncate text-lg font-bold text-gray-900 group-hover:text-primary-600 transition">
          {ad.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} /> {ad.city}
          {ad.address && `, ${ad.address.substring(0, 30)}`}
        </p>

        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <BedDouble size={15} /> {ad.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath size={15} /> {ad.bathrooms} Bath
          </span>
          {ad.area_sqft && (
            <span className="flex items-center gap-1">
              <Maximize size={15} /> {ad.area_sqft} sqft
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-400">by {ad.owner_username}</span>
          {ad.average_rating > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
              <Star size={13} fill="currentColor" />
              {ad.average_rating} ({ad.total_reviews})
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AdvertisementCard;
