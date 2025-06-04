export interface SearchFilters {
  query: string;
  location: string;
  categoryId?: number;
}

export interface ContactFormData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceNeeded: string;
  message?: string;
}
