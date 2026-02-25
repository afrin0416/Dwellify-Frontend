import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Search,
  Heart,
  PlusCircle,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-1.5 text-sm font-medium transition ${
    isActive ? "text-primary-600" : "text-gray-600 hover:text-primary-600"
  }`;

import React from "react";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const close = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={close}
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-primary-700"
          >
            <Home size={26} />
            Dwellify
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            <NavLink to="/listings" className={navLinkClass}>
              <Search size={16} /> Browse
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/listings/create" className={navLinkClass}>
                  <PlusCircle size={16} /> Post Ad
                </NavLink>
                <NavLink to="/favorites" className={navLinkClass}>
                  <Heart size={16} /> Favorites
                </NavLink>
              </>
            )}

            {isAdmin && (
              <NavLink to="/admin/dashboard" className={navLinkClass}>
                <LayoutDashboard size={16} /> Admin
              </NavLink>
            )}
          </div>

          {/* Desktop right */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-full border border-gray-200
                           bg-gray-50 py-1.5 pl-3 pr-2 text-sm font-medium
                           text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                >
                  <User size={16} />
                  {user?.username || "Account"}
                  <ChevronDown
                    size={14}
                    className={`transition ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100
                             bg-white py-2 shadow-xl"
                  >
                    <div className="border-b border-gray-100 px-4 pb-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.first_name || user?.username}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={close}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={15} /> Profile
                    </Link>
                    <Link
                      to="/my-listings"
                      onClick={close}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Home size={15} /> My Listings
                    </Link>
                    <Link
                      to="/my-rent-requests"
                      onClick={close}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Search size={15} /> My Requests
                    </Link>
                    <Link
                      to="/received-requests"
                      onClick={close}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Search size={15} /> Received Requests
                    </Link>
                    <Link
                      to="/payments"
                      onClick={close}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LayoutDashboard size={15} /> Payments
                    </Link>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          close();
                          logout();
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm
                                 text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-secondary py-2! px-4! text-xs!"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary py-2! px-4! text-xs!"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-600 cursor-pointer"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
            <div className="flex flex-col gap-3 pt-3">
              <NavLink to="/listings" onClick={close} className={navLinkClass}>
                <Search size={16} /> Browse Listings
              </NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/listings/create"
                    onClick={close}
                    className={navLinkClass}
                  >
                    <PlusCircle size={16} /> Post Ad
                  </NavLink>
                  <NavLink
                    to="/favorites"
                    onClick={close}
                    className={navLinkClass}
                  >
                    <Heart size={16} /> Favorites
                  </NavLink>
                  <NavLink
                    to="/profile"
                    onClick={close}
                    className={navLinkClass}
                  >
                    <User size={16} /> Profile
                  </NavLink>
                  <NavLink
                    to="/my-listings"
                    onClick={close}
                    className={navLinkClass}
                  >
                    <Home size={16} /> My Listings
                  </NavLink>
                  <NavLink
                    to="/my-rent-requests"
                    onClick={close}
                    className={navLinkClass}
                  >
                    <Search size={16} /> My Requests
                  </NavLink>
                  <NavLink
                    to="/received-requests"
                    onClick={close}
                    className={navLinkClass}
                  >
                    <Search size={16} /> Received Requests
                  </NavLink>
                  <NavLink
                    to="/payments"
                    onClick={close}
                    className={navLinkClass}
                  >
                    <LayoutDashboard size={16} /> Payments
                  </NavLink>
                  {isAdmin && (
                    <NavLink
                      to="/admin/dashboard"
                      onClick={close}
                      className={navLinkClass}
                    >
                      <LayoutDashboard size={16} /> Admin Panel
                    </NavLink>
                  )}
                  <button
                    onClick={() => {
                      close();
                      logout();
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-red-600 cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={close}
                    className="btn-secondary flex-1 py-2! text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={close}
                    className="btn-primary flex-1 py-2! text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Click-away overlay for dropdown */}
        {dropdownOpen && <div className="fixed inset-0 z-40" onClick={close} />}
      </header>
    </>
  );
};

export default Navbar;
