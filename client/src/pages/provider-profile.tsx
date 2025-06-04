import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactModal from "@/components/contact-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Star, Phone, Mail, Heart } from "lucide-react";
import type { ServiceProvider } from "@shared/schema";

export default function ProviderProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const { data: provider, isLoading, error } = useQuery<ServiceProvider>({
    queryKey: [`/api/providers/${id}`],
    enabled: !!id,
  });

  const renderStars = (rating: string) => {
    const ratingNum = parseFloat(rating);
    const fullStars = Math.floor(ratingNum);
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full rounded-2xl" />
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider Not Found</h1>
            <p className="text-gray-600">The requested service provider could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Hero Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={provider.serviceImage || 'https://via.placeholder.com/800x400'}
                  alt={`${provider.name} - ${provider.title}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  {provider.isAvailable ? (
                    <Badge className="bg-green-600">Available</Badge>
                  ) : (
                    <Badge className="bg-yellow-500">Busy</Badge>
                  )}
                </div>
              </div>

              {/* Provider Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={provider.profileImage || 'https://via.placeholder.com/100x100'}
                        alt={`${provider.name} profile`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
                        <p className="text-lg text-gray-600">{provider.title}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex mr-2">
                            {renderStars(provider.rating || "0")}
                          </div>
                          <span className="text-gray-600">
                            {provider.rating} ({provider.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={isFavorited ? "text-red-500" : ""}
                    >
                      <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {provider.location}
                    </div>
                    {provider.experience && (
                      <div>{provider.experience} experience</div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">About</h2>
                    <p className="text-gray-700">{provider.description}</p>
                  </div>

                  {provider.specialties && provider.specialties.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Specialties</h2>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing & Contact */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${provider.hourlyRate}/hr
                    </div>
                    <p className="text-gray-600">Starting rate</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {provider.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {provider.email}
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    Contact {provider.name}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-semibold">{provider.rating}/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reviews</span>
                      <span className="font-semibold">{provider.reviewCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`font-semibold ${provider.isAvailable ? 'text-green-600' : 'text-yellow-600'}`}>
                        {provider.isAvailable ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        provider={provider}
      />
    </>
  );
}
