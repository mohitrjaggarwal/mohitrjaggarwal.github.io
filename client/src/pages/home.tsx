import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ServiceCategories from "@/components/service-categories";
import FeaturedProviders from "@/components/featured-providers";
import HowItWorks from "@/components/how-it-works";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <ServiceCategories />
      <FeaturedProviders />
      <HowItWorks />
      <Footer />
    </div>
  );
}
