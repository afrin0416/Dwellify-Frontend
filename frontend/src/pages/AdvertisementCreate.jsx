import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adsAPI, categoryAPI } from "../api/endpoints";
import toast from "react-hot-toast";
import { PlusCircle, Upload } from "lucide-react";

export default function AdvertisementCreate() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);

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
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    categoryAPI
      .list()
      .then((r) => setCategories(r.data.results || r.data))
      .catch(() => {});
  }, []);

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

      const { data } = await adsAPI.create(fd);
      toast.success("Listing created! Awaiting admin approval.");
      navigate(`/listings/${data.id}`);
    } catch (err) {
      const errors = err.response?.data;
      if (errors) {
        Object.entries(errors).forEach(([k, v]) =>
          toast.error(`${k}: ${Array.isArray(v) ? v.join(", ") : v}`),
        );
      } else {
        toast.error("Failed to create listing.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <PlusCircle size={24} /> Post New Listing
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Your listing will be reviewed before going live.
      </p>

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5 p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">Title *</label>
          <input
            required
            className="input-field"
            placeholder="e.g. Spacious 2BR in Gulshan"
            value={form.title}
            onChange={set("title")}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Description *
          </label>
          <textarea
            required
            rows={4}
            className="input-field"
            placeholder="Describe the property…"
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
            <label className="mb-1 block text-sm font-medium">
              Rent Amount (৳) *
            </label>
            <input
              required
              type="number"
              className="input-field"
              placeholder="15000"
              value={form.rent_amount}
              onChange={set("rent_amount")}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Address *</label>
          <input
            required
            className="input-field"
            placeholder="House 12, Road 5, Dhanmondi"
            value={form.address}
            onChange={set("address")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">City *</label>
            <input
              required
              className="input-field"
              placeholder="Dhaka"
              value={form.city}
              onChange={set("city")}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">State</label>
            <input
              className="input-field"
              placeholder="Dhaka Division"
              value={form.state}
              onChange={set("state")}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Zip Code</label>
            <input
              className="input-field"
              placeholder="1205"
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
              placeholder="1200"
              value={form.area_sqft}
              onChange={set("area_sqft")}
            />
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Property Image
          </label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition hover:border-primary-400 hover:bg-primary-50">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-40 rounded-lg object-cover"
              />
            ) : (
              <>
                <Upload size={32} className="text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Click to upload</p>
              </>
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
          {saving ? "Creating…" : "Create Listing"}
        </button>
      </form>
    </div>
  );
}
