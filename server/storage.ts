import { 
  serviceCategories, 
  serviceProviders, 
  inquiries,
  type ServiceCategory, 
  type ServiceProvider, 
  type Inquiry,
  type InsertServiceCategory,
  type InsertServiceProvider,
  type InsertInquiry 
} from "@shared/schema";

export interface IStorage {
  // Service Categories
  getServiceCategories(): Promise<ServiceCategory[]>;
  getServiceCategory(id: number): Promise<ServiceCategory | undefined>;
  getServiceCategoryBySlug(slug: string): Promise<ServiceCategory | undefined>;
  createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory>;

  // Service Providers
  getServiceProviders(categoryId?: number, location?: string): Promise<ServiceProvider[]>;
  getServiceProvider(id: number): Promise<ServiceProvider | undefined>;
  createServiceProvider(provider: InsertServiceProvider): Promise<ServiceProvider>;
  updateServiceProvider(id: number, provider: Partial<ServiceProvider>): Promise<ServiceProvider | undefined>;
  searchServiceProviders(query: string, categoryId?: number): Promise<ServiceProvider[]>;

  // Inquiries
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, ServiceCategory>;
  private providers: Map<number, ServiceProvider>;
  private inquiriesMap: Map<number, Inquiry>;
  private currentCategoryId: number;
  private currentProviderId: number;
  private currentInquiryId: number;

  constructor() {
    this.categories = new Map();
    this.providers = new Map();
    this.inquiriesMap = new Map();
    this.currentCategoryId = 1;
    this.currentProviderId = 1;
    this.currentInquiryId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed service categories
    const categories = [
      { name: "Electrician", slug: "electrician", icon: "fas fa-bolt", description: "Wiring, repairs & installations", color: "trust-blue" },
      { name: "Plumber", slug: "plumber", icon: "fas fa-wrench", description: "Pipes, leaks & water systems", color: "trust-blue" },
      { name: "Driver", slug: "driver", icon: "fas fa-car", description: "Personal & delivery driving", color: "trust-blue" },
      { name: "Installation", slug: "installation", icon: "fas fa-tools", description: "Furniture & appliance setup", color: "trust-blue" },
      { name: "Spa Services", slug: "spa", icon: "fas fa-spa", description: "Massage & wellness treatments", color: "reliable-green" },
      { name: "Salon", slug: "salon", icon: "fas fa-cut", description: "Hair, beauty & grooming", color: "reliable-green" },
      { name: "Fitness Coach", slug: "fitness", icon: "fas fa-dumbbell", description: "Personal training & nutrition", color: "reliable-green" },
      { name: "Consultant", slug: "consultant", icon: "fas fa-user-tie", description: "Business & professional advice", color: "reliable-green" },
    ];

    categories.forEach(cat => {
      const category: ServiceCategory = { ...cat, id: this.currentCategoryId++ };
      this.categories.set(category.id, category);
    });

    // Seed service providers
    const providers = [
      {
        name: "Mike Johnson",
        email: "mike@electrical.com",
        phone: "(555) 123-4567",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        categoryId: 1,
        title: "Licensed Electrician",
        description: "15 years experience in residential and commercial electrical work. Specializing in installations, repairs, and safety inspections.",
        experience: "15 years",
        hourlyRate: "75.00",
        location: "Downtown Area",
        rating: "4.9",
        reviewCount: 127,
        isAvailable: true,
        serviceImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        specialties: ["Wiring", "Panel Upgrades", "Safety Inspections"],
        createdAt: new Date(),
      },
      {
        name: "Sarah Williams",
        email: "sarah@plumbing.com",
        phone: "(555) 234-5678",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        categoryId: 2,
        title: "Master Plumber",
        description: "Emergency plumbing services available 24/7. Expert in pipe repairs, drain cleaning, and bathroom renovations.",
        experience: "12 years",
        hourlyRate: "85.00",
        location: "Westside",
        rating: "4.8",
        reviewCount: 89,
        isAvailable: false,
        serviceImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        specialties: ["Emergency Repairs", "Bathroom Renovations", "Drain Cleaning"],
        createdAt: new Date(),
      },
      {
        name: "Lisa Chen",
        email: "lisa@spa.com",
        phone: "(555) 345-6789",
        profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        categoryId: 5,
        title: "Certified Massage Therapist",
        description: "Relaxation and therapeutic massage services. Specializing in deep tissue, Swedish, and hot stone treatments.",
        experience: "8 years",
        hourlyRate: "90.00",
        location: "Central District",
        rating: "5.0",
        reviewCount: 156,
        isAvailable: true,
        serviceImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        specialties: ["Deep Tissue", "Swedish Massage", "Hot Stone Therapy"],
        createdAt: new Date(),
      },
      {
        name: "David Rodriguez",
        email: "david@drive.com",
        phone: "(555) 456-7890",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        categoryId: 3,
        title: "Professional Driver",
        description: "Reliable transportation services for personal and business needs. Clean vehicle, professional service.",
        experience: "6 years",
        hourlyRate: "35.00",
        location: "City Wide",
        rating: "4.7",
        reviewCount: 203,
        isAvailable: true,
        serviceImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        specialties: ["Airport Transfers", "Business Travel", "Event Transportation"],
        createdAt: new Date(),
      },
      {
        name: "Emily Foster",
        email: "emily@salon.com",
        phone: "(555) 567-8901",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        categoryId: 6,
        title: "Hair Stylist & Colorist",
        description: "Creative hair styling and coloring services. Specializing in modern cuts, balayage, and special occasion styles.",
        experience: "10 years",
        hourlyRate: "65.00",
        location: "Fashion District",
        rating: "4.9",
        reviewCount: 142,
        isAvailable: true,
        serviceImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        specialties: ["Hair Coloring", "Modern Cuts", "Wedding Styles"],
        createdAt: new Date(),
      },
      {
        name: "Marcus Thompson",
        email: "marcus@fitness.com",
        phone: "(555) 678-9012",
        profileImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        categoryId: 7,
        title: "Certified Personal Trainer",
        description: "Personalized fitness training and nutrition coaching. Helping clients achieve their health and fitness goals.",
        experience: "7 years",
        hourlyRate: "80.00",
        location: "Fitness District",
        rating: "4.8",
        reviewCount: 95,
        isAvailable: true,
        serviceImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        specialties: ["Weight Training", "Nutrition Coaching", "Cardio Programs"],
        createdAt: new Date(),
      },
    ];

    providers.forEach(provider => {
      const serviceProvider: ServiceProvider = { ...provider, id: this.currentProviderId++ };
      this.providers.set(serviceProvider.id, serviceProvider);
    });
  }

  // Service Categories
  async getServiceCategories(): Promise<ServiceCategory[]> {
    return Array.from(this.categories.values());
  }

  async getServiceCategory(id: number): Promise<ServiceCategory | undefined> {
    return this.categories.get(id);
  }

  async getServiceCategoryBySlug(slug: string): Promise<ServiceCategory | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory> {
    const id = this.currentCategoryId++;
    const newCategory: ServiceCategory = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  // Service Providers
  async getServiceProviders(categoryId?: number, location?: string): Promise<ServiceProvider[]> {
    let providers = Array.from(this.providers.values());
    
    if (categoryId) {
      providers = providers.filter(provider => provider.categoryId === categoryId);
    }
    
    if (location) {
      providers = providers.filter(provider => 
        provider.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    return providers.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
  }

  async getServiceProvider(id: number): Promise<ServiceProvider | undefined> {
    return this.providers.get(id);
  }

  async createServiceProvider(provider: InsertServiceProvider): Promise<ServiceProvider> {
    const id = this.currentProviderId++;
    const newProvider: ServiceProvider = { 
      ...provider, 
      id,
      createdAt: new Date(),
      rating: "0",
      reviewCount: 0,
      isAvailable: true
    };
    this.providers.set(id, newProvider);
    return newProvider;
  }

  async updateServiceProvider(id: number, provider: Partial<ServiceProvider>): Promise<ServiceProvider | undefined> {
    const existing = this.providers.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...provider };
    this.providers.set(id, updated);
    return updated;
  }

  async searchServiceProviders(query: string, categoryId?: number): Promise<ServiceProvider[]> {
    let providers = Array.from(this.providers.values());
    
    if (categoryId) {
      providers = providers.filter(provider => provider.categoryId === categoryId);
    }
    
    const searchQuery = query.toLowerCase();
    providers = providers.filter(provider =>
      provider.name.toLowerCase().includes(searchQuery) ||
      provider.title.toLowerCase().includes(searchQuery) ||
      provider.description.toLowerCase().includes(searchQuery) ||
      provider.specialties?.some(specialty => specialty.toLowerCase().includes(searchQuery))
    );
    
    return providers.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
  }

  // Inquiries
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiriesMap.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiriesMap.get(id);
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const newInquiry: Inquiry = { 
      ...inquiry, 
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.inquiriesMap.set(id, newInquiry);
    return newInquiry;
  }

  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    const existing = this.inquiriesMap.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, status };
    this.inquiriesMap.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
