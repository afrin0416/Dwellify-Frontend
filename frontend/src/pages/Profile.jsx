import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/endpoints";
import toast from "react-hot-toast";
import { User, Save, Lock } from "lucide-react";

export default function Profile() {
  const { user, refreshProfile } = useAuth();
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
  });
  const [pwForm, setPwForm] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: "",
  });
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await authAPI.updateProfile(form);
      await refreshProfile();
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setChangingPw(true);
    try {
      const { data } = await authAPI.changePassword(pwForm);
      // Update tokens from response
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      localStorage.setItem(
        "tokens",
        JSON.stringify({
          ...tokens,
          access: data.access,
          refresh: data.refresh,
        }),
      );
      toast.success("Password changed!");
      setPwForm({
        old_password: "",
        new_password: "",
        new_password_confirm: "",
      });
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        Object.values(err.response?.data || {})
          .flat()
          .join(" ") ||
        "Failed.";
      toast.error(msg);
    } finally {
      setChangingPw(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      {/* Info card */}
      <div className="card mt-6 p-6">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-700">
            {user?.username?.[0]?.toUpperCase() || <User />}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
            <p className="text-sm text-gray-500 capitalize">
              Role: {user?.role}
            </p>
          </div>
        </div>

        <form onSubmit={handleProfile} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Username</label>
              <input
                className="input-field"
                value={form.username}
                onChange={set("username")}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <input
                className="input-field"
                value={form.phone_number}
                onChange={set("phone_number")}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                First Name
              </label>
              <input
                className="input-field"
                value={form.first_name}
                onChange={set("first_name")}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Last Name
              </label>
              <input
                className="input-field"
                value={form.last_name}
                onChange={set("last_name")}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Address</label>
            <textarea
              rows={2}
              className="input-field"
              value={form.address}
              onChange={set("address")}
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary">
            <Save size={16} /> {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="card mt-6 p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <Lock size={20} /> Change Password
        </h2>
        <form onSubmit={handlePassword} className="mt-4 space-y-4">
          <input
            type="password"
            required
            className="input-field"
            placeholder="Current password"
            value={pwForm.old_password}
            onChange={(e) =>
              setPwForm({ ...pwForm, old_password: e.target.value })
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="password"
              required
              minLength={8}
              className="input-field"
              placeholder="New password"
              value={pwForm.new_password}
              onChange={(e) =>
                setPwForm({ ...pwForm, new_password: e.target.value })
              }
            />
            <input
              type="password"
              required
              minLength={8}
              className="input-field"
              placeholder="Confirm new password"
              value={pwForm.new_password_confirm}
              onChange={(e) =>
                setPwForm({ ...pwForm, new_password_confirm: e.target.value })
              }
            />
          </div>
          <button type="submit" disabled={changingPw} className="btn-primary">
            {changingPw ? "Changing…" : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
