import API from "./axios";

// ── Auth ──
export const authAPI = {
  register: (data) => API.post("/api/accounts/register/", data),
  login: (data) => API.post("/api/accounts/login/", data),
  logout: (refresh) => API.post("/api/accounts/logout/", { refresh }),
  logoutAll: () => API.post("/api/accounts/logout-all/"),
  refreshToken: (refresh) =>
    API.post("/api/accounts/token/refresh/", { refresh }),
  getProfile: () => API.get("/api/accounts/profile/"),
  updateProfile: (data) => API.patch("/api/accounts/profile/", data),
  changePassword: (data) => API.post("/api/accounts/change-password/", data),
  resendVerification: (email) =>
    API.post("/api/accounts/resend-verification/", { email }),
};

// ── Advertisements ──
export const adsAPI = {
  list: (params) => API.get("/api/advertisements/", { params }),
  detail: (id) => API.get(`/api/advertisements/${id}/`),
  create: (data) => API.post("/api/advertisements/create/", data),
  update: (id, data) => API.patch(`/api/advertisements/${id}/update/`, data),
  remove: (id) => API.delete(`/api/advertisements/${id}/delete/`),
  mine: () => API.get("/api/advertisements/my-advertisements/"),
};

// ── Categories ──
export const categoryAPI = {
  list: () => API.get("/api/advertisements/categories/"),
  create: (data) => API.post("/api/advertisements/categories/", data),
};

// ── Rent Requests ──
export const rentAPI = {
  send: (adId, message) =>
    API.post(`/api/advertisements/${adId}/rent-request/`, { message }),
  mine: () => API.get("/api/advertisements/my-rent-requests/"),
  received: () => API.get("/api/advertisements/received-rent-requests/"),
  forAd: (adId) => API.get(`/api/advertisements/${adId}/rent-requests/`),
  handle: (id, action) =>
    API.patch(`/api/advertisements/rent-request/${id}/action/`, { action }),
};

// ── Favorites ──
export const favAPI = {
  list: () => API.get("/api/advertisements/favorites/"),
  add: (adId) => API.post(`/api/advertisements/${adId}/favorite/`),
  remove: (adId) => API.delete(`/api/advertisements/${adId}/unfavorite/`),
};

// ── Reviews ──
export const reviewAPI = {
  forAd: (adId) => API.get(`/api/advertisements/${adId}/reviews/`),
  create: (adId, data) =>
    API.post(`/api/advertisements/${adId}/review/`, data),
  update: (id, data) =>
    API.patch(`/api/advertisements/review/${id}/update/`, data),
  remove: (id) => API.delete(`/api/advertisements/review/${id}/delete/`),
};

// ── Payments ──
export const paymentAPI = {
  initiate: (data) => API.post("/api/payments/initiate/", data),
  history: () => API.get("/api/payments/history/"),
  detail: (id) => API.get(`/api/payments/${id}/`),
  byTran: (tranId) => API.get(`/api/payments/tran/${tranId}/`),
};

// ── Admin ──
export const adminAPI = {
  stats: () => API.get("/api/advertisements/admin/statistics/"),
  pending: () => API.get("/api/advertisements/admin/pending/"),
  allAds: (params) =>
    API.get("/api/advertisements/admin/all/", { params }),
  approve: (id, statusVal) =>
    API.patch(`/api/advertisements/admin/${id}/approve/`, {
      status: statusVal,
    }),
  deleteAd: (id) =>
    API.delete(`/api/advertisements/admin/${id}/delete/`),
  users: () => API.get("/api/accounts/users/"),
  allPayments: (params) =>
    API.get("/api/payments/admin/all/", { params }),
  refund: (id) => API.post(`/api/payments/admin/${id}/refund/`),
};