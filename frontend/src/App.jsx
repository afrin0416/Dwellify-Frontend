import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdvertisementList from "./pages/AdvertisementList";
import AdvertisementDetail from "./pages/AdvertisementDetail";
import AdvertisementCreate from "./pages/AdvertisementCreate";
import AdvertisementEdit from "./pages/AdvertisementEdit";
import MyAdvertisements from "./pages/MyAdvertisements";
import MyRentRequests from "./pages/MyRentRequests";
import ReceivedRentRequests from "./pages/ReceivedRentRequests";
import Favorites from "./pages/Favorites";
import PaymentHistory from "./pages/PaymentHistory";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import PaymentCancel from "./pages/PaymentCancel";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAdvertisements from "./pages/AdminAdvertisements";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dist" element={<AdvertisementList />} />
          <Route path="/dist/:id" element={<AdvertisementDetail />} />

          {/* Auth required */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dist/create" element={<AdvertisementCreate />} />
            <Route path="/dist/:id/edit" element={<AdvertisementEdit />} />
            <Route path="/my-dist" element={<MyAdvertisements />} />
            <Route path="/my-rent-requests" element={<MyRentRequests />} />
            <Route
              path="/received-requests"
              element={<ReceivedRentRequests />}
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/payments" element={<PaymentHistory />} />
          </Route>

          {/* Payment callbacks */}
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/fail" element={<PaymentFail />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />

          {/* Admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/advertisements"
              element={<AdminAdvertisements />}
            />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
