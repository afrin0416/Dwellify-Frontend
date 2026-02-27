import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "https://dwellify-bice.vercel.app/",           
// }, { withCredentials: true });

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://dwellify-bice.vercel.app",
  withCredentials: true,
});
// Attach access token
API.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem("tokens") || "null");
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

// Auto-refresh on 401
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const tokens = JSON.parse(localStorage.getItem("tokens") || "null");

      if (tokens?.refresh) {
        try {
          const { data } = await axios.post(
            `${API.defaults.baseURL}/api/accounts/token/refresh/`,
            { refresh: tokens.refresh }
          );
          const newTokens = { ...tokens, access: data.access };
          if (data.refresh) newTokens.refresh = data.refresh;
          localStorage.setItem("tokens", JSON.stringify(newTokens));
          original.headers.Authorization = `Bearer ${data.access}`;
          return API(original);
        } catch {
          localStorage.removeItem("tokens");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;