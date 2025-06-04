import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProviderCard from "@/components/provider-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ServiceCategory, ServiceProvider } from "@shared/schema";

export default function ServiceCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: category, isLoading: categoryLoading } = useQuery<ServiceCategory>({
    queryKey: [`/api/categories/${slug}`],
    enabled: !!slug,
  });

  const { data: providers, isLoading: providersLoading } = useQuery<ServiceProvider[]>({
    queryKey: ["/api/providers", category?.id],
    queryFn: () => fetch(`/api/providers?categoryId=${category?.id}`).then(res => res.json()),
    enabled: !!category?.id,
  });

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96 mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600">The requested service category could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className={`
            text-6xl mb-4
            ${category.color === 'trust-blue' ? 'text-blue-600' : 'text-green-600'}
          `}>
            <i className={category.icon}></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {category.name} Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {providersLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
            ))}
          </div>
        ) : providers?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No service providers found in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers?.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
