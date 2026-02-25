import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  adsAPI,
  rentAPI,
  favAPI,
  reviewAPI,
  paymentAPI,
} from "../api/endpoints";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StatusBadge from "../components/common/StatusBadge";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Star,
  Heart,
  Send,
  CreditCard,
  ArrowLeft,
  Edit,
  Trash2,
} from "lucide-react";

export default function AdvertisementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [isFav, setIsFav] = useState(false);

  // Review
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    setLoading(true);
    adsAPI
      .detail(id)
      .then((r) => setAd(r.data))
      .catch(() => toast.error("Listing not found."))
      .finally(() => setLoading(false));

    if (isAuthenticated) {
      favAPI
        .list()
        .then((r) => {
          const favs = r.data.results || r.data;
          setIsFav(favs.some((f) => f.advertisement === Number(id)));
        })
        .catch(() => {});
    }
  }, [id, isAuthenticated]);

  const sendRentRequest = async () => {
    setSending(true);
    try {
      await rentAPI.send(id, message);
      toast.success("Rent request sent!");
      setMessage("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send request.");
    } finally {
      setSending(false);
    }
  };

  const toggleFav = async () => {
    try {
      if (isFav) {
        await favAPI.remove(id);
        setIsFav(false);
        toast.success("Removed from favorites.");
      } else {
        await favAPI.add(id);
        setIsFav(true);
        toast.success("Added to favorites!");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed.");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      await reviewAPI.create(id, reviewForm);
      toast.success("Review submitted!");
      // Refresh ad
      const { data } = await adsAPI.detail(id);
      setAd(data);
      setReviewForm({ rating: 5, comment: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!ad) return <p className="py-20 text-center text-gray-400">Not found.</p>;

  const isOwner = user?.id === ad.owner;
  const placeholder =
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left — Image & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card overflow-hidden">
            <img
              src={ad.image || placeholder}
              alt={ad.title}
              className="aspect-video w-full object-cover"
            />
          </div>

          {/* Extra images */}
          {ad.images?.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {ad.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt=""
                  className="h-24 w-32 shrink-0 rounded-xl object-cover"
                />
              ))}
            </div>
          )}

          <div className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{ad.title}</h1>
                <p className="mt-1 flex items-center gap-1 text-gray-500">
                  <MapPin size={16} /> {ad.address}, {ad.city}
                  {ad.state && `, ${ad.state}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-primary-600">
                  ৳{Number(ad.rent_amount).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">per month</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status={ad.status} />
              {ad.is_rented && (
                <span className="badge bg-red-100 text-red-700">Rented</span>
              )}
              {ad.category_name && (
                <span className="badge bg-blue-50 text-blue-700">
                  {ad.category_name}
                </span>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: BedDouble, label: "Bedrooms", val: ad.bedrooms },
                { icon: Bath, label: "Bathrooms", val: ad.bathrooms },
                {
                  icon: Maximize,
                  label: "Area",
                  val: ad.area_sqft ? `${ad.area_sqft} sqft` : "N/A",
                },
                {
                  icon: Star,
                  label: "Rating",
                  val: ad.average_rating || "N/A",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl bg-gray-50 p-3 text-center"
                >
                  <s.icon size={20} className="mx-auto text-primary-500" />
                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {s.val}
                  </p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {ad.description}
              </p>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              Posted by{" "}
              <strong className="text-gray-600">{ad.owner_username}</strong> •{" "}
              {new Date(ad.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Reviews */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900">
              Reviews ({ad.reviews?.length || 0})
            </h3>

            {ad.reviews?.length > 0 ? (
              <div className="mt-4 space-y-4">
                {ad.reviews.map((r) => (
                  <div key={r.id} className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{r.user_username}</p>
                      <div className="flex gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < r.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                    {r.comment && (
                      <p className="mt-2 text-sm text-gray-600">{r.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-gray-400">No reviews yet.</p>
            )}

            {/* Add review */}
            {isAuthenticated && !isOwner && (
              <form
                onSubmit={submitReview}
                className="mt-6 space-y-3 border-t pt-4"
              >
                <h4 className="text-sm font-semibold">Leave a Review</h4>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-500">Rating:</label>
                  <select
                    className="input-field !w-20"
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm({
                        ...reviewForm,
                        rating: Number(e.target.value),
                      })
                    }
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} ★
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  rows={3}
                  className="input-field"
                  placeholder="Write your review…"
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn-primary !py-2"
                >
                  {submittingReview ? "Submitting…" : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Actions for owner */}
          {isOwner && (
            <div className="card space-y-3 p-5">
              <h3 className="font-semibold text-gray-900">Manage Listing</h3>
              <Link
                to={`/listings/${ad.id}/edit`}
                className="btn-secondary w-full"
              >
                <Edit size={16} /> Edit
              </Link>
              <Link to="/received-requests" className="btn-primary w-full">
                View Rent Requests
              </Link>
            </div>
          )}

          {/* Actions for non-owner */}
          {isAuthenticated && !isOwner && (
            <div className="card space-y-3 p-5">
              <h3 className="font-semibold text-gray-900">Interested?</h3>

              <button
                onClick={toggleFav}
                className={`w-full ${isFav ? "btn-danger" : "btn-secondary"}`}
              >
                <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                {isFav ? "Remove Favorite" : "Add to Favorites"}
              </button>

              {!ad.is_rented && (
                <>
                  <textarea
                    rows={3}
                    className="input-field"
                    placeholder="Optional message to the owner…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    onClick={sendRentRequest}
                    disabled={sending}
                    className="btn-primary w-full"
                  >
                    <Send size={16} />
                    {sending ? "Sending…" : "Send Rent Request"}
                  </button>
                </>
              )}
            </div>
          )}

          {!isAuthenticated && (
            <div className="card p-5 text-center">
              <p className="text-sm text-gray-500">
                <Link
                  to="/login"
                  className="font-semibold text-primary-600 hover:underline"
                >
                  Sign in
                </Link>{" "}
                to send requests or save favorites.
              </p>
            </div>
          )}

          {/* Owner info */}
          <div className="card p-5">
            <h3 className="mb-3 font-semibold text-gray-900">Property Owner</h3>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                {ad.owner_username?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {ad.owner_username}
                </p>
                <p className="text-xs text-gray-500">{ad.owner_email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
