import HeroSection from "../components/home/HeroSection";
import SearchSection from "../components/home/SearchSection";
import FeaturedListings from "../components/home/FeaturedListings";
import CategoriesSection from "../components/home/CategoriesSection";
import HowItWorks from "../components/home/HowItWorks";
import StatsSection from "../components/home/StatsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <FeaturedListings />
      <CategoriesSection />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection />
    </>
  );
}