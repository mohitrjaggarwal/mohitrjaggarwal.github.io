import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import type { ServiceCategory } from "@shared/schema";

export default function ServiceCategories() {
  const [, setLocation] = useLocation();
  
  const { data: categories, isLoading, error } = useQuery<ServiceCategory[]>({
    queryKey: ["/api/categories"],
  });

  const handleCategoryClick = (slug: string) => {
    setLocation(`/category/${slug}`);
  };

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Browse our most requested professional services</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Failed to load service categories. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Browse our most requested professional services</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className={`
                bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300
                ${category.color === 'trust-blue' 
                  ? 'hover:bg-blue-600 hover:text-white' 
                  : 'hover:bg-green-600 hover:text-white'
                }
              `}>
                <div className={`
                  text-4xl mb-4 transition-colors
                  ${category.color === 'trust-blue' 
                    ? 'text-blue-600 group-hover:text-white' 
                    : 'text-green-600 group-hover:text-white'
                  }
                `}>
                  <i className={category.icon}></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className={`
                  text-sm transition-colors
                  ${category.color === 'trust-blue' 
                    ? 'text-gray-600 group-hover:text-blue-100' 
                    : 'text-gray-600 group-hover:text-green-100'
                  }
                `}>
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
