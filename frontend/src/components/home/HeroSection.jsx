import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-primary-600 via-primary-700 to-accent-700">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur">
              🏠 #1 House Rental Platform
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find Your
              <span className="block text-primary-200">
                Perfect Rental Home
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-primary-100">
              Discover thousands of rental properties. Post your listing, manage
              requests, and pay securely — all in one beautiful platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/dist"
                className="btn-primary bg-white! text-primary-700! hover:bg-primary-50!"
              >
                <Search size={18} /> Browse dist
              </Link>
              <Link
                to="/register"
                className="btn-secondary border-white/30! bg-transparent! text-white! hover:bg-white/10!"
              >
                Get Started <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
