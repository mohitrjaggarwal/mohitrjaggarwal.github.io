import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ServiceProvider } from "@shared/schema";
import type { ContactFormData } from "@/lib/types";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: ServiceProvider;
}

export default function ContactModal({ isOpen, onClose, provider }: ContactModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<ContactFormData>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    serviceNeeded: "",
    message: "",
  });

  const createInquiryMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/inquiries", {
        ...data,
        providerId: provider.id,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Your inquiry has been sent to the service provider. They will contact you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      handleClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send your inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerPhone || !formData.serviceNeeded) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createInquiryMutation.mutate(formData);
  };

  const handleClose = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      serviceNeeded: "",
      message: "",
    });
    onClose();
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {provider.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customerName">Your Name *</Label>
            <Input
              id="customerName"
              type="text"
              placeholder="Enter your name"
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="customerPhone">Phone Number *</Label>
            <Input
              id="customerPhone"
              type="tel"
              placeholder="Your phone number"
              value={formData.customerPhone}
              onChange={(e) => handleInputChange("customerPhone", e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="customerEmail">Email Address</Label>
            <Input
              id="customerEmail"
              type="email"
              placeholder="Your email address"
              value={formData.customerEmail}
              onChange={(e) => handleInputChange("customerEmail", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="serviceNeeded">Service Needed *</Label>
            <Input
              id="serviceNeeded"
              type="text"
              placeholder="Describe your service needs"
              value={formData.serviceNeeded}
              onChange={(e) => handleInputChange("serviceNeeded", e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={4}
              placeholder="Additional details about your project"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={createInquiryMutation.isPending}
            >
              {createInquiryMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
