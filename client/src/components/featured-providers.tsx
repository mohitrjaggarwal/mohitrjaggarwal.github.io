import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProviderCard from "./provider-card";
import type { ServiceProvider } from "@shared/schema";

export default function FeaturedProviders() {
  const [, setLocation] = useLocation();
  
  const { data: providers, isLoading, error } = useQuery<ServiceProvider[]>({
    queryKey: ["/api/providers"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top-Rated Professionals</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Meet our most trusted and experienced service providers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Failed to load featured providers. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredProviders = providers?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top-Rated Professionals</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Meet our most trusted and experienced service providers</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => setLocation("/providers")}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
          >
            View All Professionals
          </Button>
        </div>
      </div>
    </section>
  );
}
