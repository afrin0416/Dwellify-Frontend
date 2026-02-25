import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/endpoints";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null"),
  );
  const [tokens, setTokens] = useState(() =>
    JSON.parse(localStorage.getItem("tokens") || "null"),
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!tokens?.access;
  const isAdmin = user?.role === "admin";

  // Persist
  useEffect(() => {
    if (tokens) localStorage.setItem("tokens", JSON.stringify(tokens));
    else localStorage.removeItem("tokens");
  }, [tokens]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await authAPI.login({ email, password });
      setTokens({ access: data.access, refresh: data.refresh });
      setUser(data.user);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.email?.[0] ||
        "Login failed.";
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const { data } = await authAPI.register(formData);
      toast.success(data.message || "Registered! Check your email.");
      navigate("/login");
      return data;
    } catch (err) {
      const errors = err.response?.data;
      if (errors) {
        Object.values(errors)
          .flat()
          .forEach((m) => toast.error(String(m)));
      } else {
        toast.error("Registration failed.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      if (tokens?.refresh) await authAPI.logout(tokens.refresh);
    } catch {
      /* ignore */
    }
    setUser(null);
    setTokens(null);
    toast.success("Logged out.");
    navigate("/login");
  }, [tokens, navigate]);

  const refreshProfile = useCallback(async () => {
    try {
      const { data } = await authAPI.getProfile();
      setUser(data);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        register,
        logout,
        refreshProfile,
        setUser,
        setTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
