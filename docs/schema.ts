import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const serviceCategories = pgTable("service_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
  color: text("color").notNull(),
});

export const serviceProviders = pgTable("service_providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  profileImage: text("profile_image"),
  categoryId: integer("category_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  experience: text("experience"),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }).notNull(),
  location: text("location").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  isAvailable: boolean("is_available").default(true),
  serviceImage: text("service_image"),
  specialties: text("specialties").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  serviceNeeded: text("service_needed").notNull(),
  message: text("message"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertServiceCategorySchema = createInsertSchema(serviceCategories).omit({
  id: true,
});

export const insertServiceProviderSchema = createInsertSchema(serviceProviders).omit({
  id: true,
  createdAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type ServiceCategory = typeof serviceCategories.$inferSelect;
export type ServiceProvider = typeof serviceProviders.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertServiceCategory = z.infer<typeof insertServiceCategorySchema>;
export type InsertServiceProvider = z.infer<typeof insertServiceProviderSchema>;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
