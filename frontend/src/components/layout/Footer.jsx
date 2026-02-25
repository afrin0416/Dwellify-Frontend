import { Link } from "react-router-dom";
import {
  Home,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Facebook,
} from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-gray-200 bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-extrabold text-white"
              >
                <Home size={24} />
                Dwellify
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Find your perfect rental home with ease. Post listings, send
                rent requests, and manage payments — all in one place.
              </p>
              <div className="mt-5 flex gap-3">
                {[Facebook, Twitter, Github].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="rounded-lg bg-gray-800 p-2 transition hover:bg-primary-600 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  ["/listings", "Browse Listings"],
                  ["/listings/create", "Post an Ad"],
                  ["/favorites", "My Favorites"],
                  ["/my-rent-requests", "My Requests"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="transition hover:text-primary-400">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Help Center",
                  "Privacy Policy",
                  "Terms of Service",
                  "FAQ",
                ].map((label) => (
                  <li key={label}>
                    <a href="#" className="transition hover:text-primary-400">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Contact Us
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-primary-400"
                  />
                  123 Rent Street, Dhaka, Bangladesh
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-primary-400" />
                  support@dwellify.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-primary-400" />
                  +880 1700 000 000
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Dwellify. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
