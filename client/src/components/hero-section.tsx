import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (locationQuery) params.set("location", locationQuery);
    
    setLocation(`/providers?${params.toString()}`);
  };

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Trusted Local
            <span className="text-yellow-400 block mt-2">Professionals</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Connect with verified service providers in your area. From home repairs to personal care, we've got you covered.
          </p>
          
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="What service do you need?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 text-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Your location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full h-12 text-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <Button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white h-12 px-8 font-semibold whitespace-nowrap"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
