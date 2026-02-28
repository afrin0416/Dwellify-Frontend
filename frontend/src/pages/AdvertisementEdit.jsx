import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adsAPI, categoryAPI } from "../api/endpoints";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Edit, Upload } from "lucide-react";

export default function AdvertisementEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    rent_amount: "",
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: "",
  });

  useEffect(() => {
    categoryAPI
      .list()
      .then((r) => setCategories(r.data.results || r.data))
      .catch(() => {});
    adsAPI
      .detail(id)
      .then((r) => {
        const d = r.data;
        setForm({
          title: d.title || "",
          description: d.description || "",
          category: d.category || "",
          address: d.address || "",
          city: d.city || "",
          state: d.state || "",
          zip_code: d.zip_code || "",
          rent_amount: d.rent_amount || "",
          bedrooms: d.bedrooms || 1,
          bathrooms: d.bathrooms || 1,
          area_sqft: d.area_sqft || "",
        });
        if (d.image) setPreview(d.image);
      })
      .catch(() => toast.error("Not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== null) fd.append(k, v);
      });
      if (imageFile) fd.append("image", imageFile);
      await adsAPI.update(id, fd);
      toast.success("Listing updated!");
      navigate(`/dist/${id}`);
    } catch (err) {
      toast.error("Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <Edit size={24} /> Edit Listing
      </h1>

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5 p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            required
            className="input-field"
            value={form.title}
            onChange={set("title")}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            required
            rows={4}
            className="input-field"
            value={form.description}
            onChange={set("description")}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <select
              className="input-field"
              value={form.category}
              onChange={set("category")}
            >
              <option value="">Select…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Rent (৳)</label>
            <input
              required
              type="number"
              className="input-field"
              value={form.rent_amount}
              onChange={set("rent_amount")}
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Address</label>
          <input
            required
            className="input-field"
            value={form.address}
            onChange={set("address")}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">City</label>
            <input
              required
              className="input-field"
              value={form.city}
              onChange={set("city")}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">State</label>
            <input
              className="input-field"
              value={form.state}
              onChange={set("state")}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Zip</label>
            <input
              className="input-field"
              value={form.zip_code}
              onChange={set("zip_code")}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Bedrooms</label>
            <input
              type="number"
              min={0}
              className="input-field"
              value={form.bedrooms}
              onChange={set("bedrooms")}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Bathrooms</label>
            <input
              type="number"
              min={0}
              className="input-field"
              value={form.bathrooms}
              onChange={set("bathrooms")}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Area (sqft)
            </label>
            <input
              type="number"
              className="input-field"
              value={form.area_sqft}
              onChange={set("area_sqft")}
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Image</label>
          <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:border-primary-400">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-40 rounded-lg object-cover"
              />
            ) : (
              <Upload size={32} className="text-gray-400" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </div>
        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? "Saving…" : "Update Listing"}
        </button>
      </form>
    </div>
  );
}
