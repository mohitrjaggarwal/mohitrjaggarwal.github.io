import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star } from "lucide-react";
import type { ServiceProvider } from "@shared/schema";
import ContactModal from "./contact-modal";

interface ProviderCardProps {
  provider: ServiceProvider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const getAvailabilityBadge = () => {
    if (provider.isAvailable) {
      return (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Available
        </div>
      );
    } else {
      return (
        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Busy
        </div>
      );
    }
  };

  const renderStars = (rating: string) => {
    const ratingNum = parseFloat(rating);
    const fullStars = Math.floor(ratingNum);
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    
    return stars;
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img
            src={provider.serviceImage || 'https://via.placeholder.com/400x250'}
            alt={`${provider.name} - ${provider.title}`}
            className="w-full h-48 object-cover"
          />
          {getAvailabilityBadge()}
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-3">
            <img
              src={provider.profileImage || 'https://via.placeholder.com/100x100'}
              alt={`${provider.name} profile`}
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{provider.name}</h3>
              <p className="text-gray-600">{provider.title}</p>
            </div>
          </div>
          
          <div className="flex items-center mb-3">
            <div className="flex mr-2">
              {renderStars(provider.rating || "0")}
            </div>
            <span className="text-gray-600 text-sm">
              {provider.rating} ({provider.reviewCount} reviews)
            </span>
          </div>
          
          <p className="text-gray-700 mb-4 line-clamp-3">
            {provider.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-blue-600">
              ${provider.hourlyRate}/hr
            </span>
            <span className="text-sm text-gray-600 flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {provider.location}
            </span>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setIsContactModalOpen(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Contact Now
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavorited(!isFavorited)}
              className={isFavorited ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        provider={provider}
      />
    </>
  );
}
