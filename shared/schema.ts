
import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Table for Authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // In a real app, this should be hashed
  name: text("name").notNull(),
  role: text("role").default("user"),
});

export const insertUserSchema = createInsertSchema(users);
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Groundwater Data Table (for Dashboard Aggregation)
export const groundwaterStats = pgTable("groundwater_stats", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  province: text("province").notNull(),
  district: text("district").notNull(),
  subdistrict: text("subdistrict").notNull(),
  
  // Categorization
  ownerType: text("owner_type").notNull(), // 'government' | 'private'
  usageType: text("usage_type").notNull(), // 'agriculture' | 'consumption' | 'business'
  
  // Metrics
  depth: integer("depth").notNull(), // meters
  diameter: integer("diameter").notNull(), // inches
  usageVolume: integer("usage_volume").notNull(), // cubic meters
  isContaminated: boolean("is_contaminated").notNull().default(false),
  
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertGroundwaterStatSchema = createInsertSchema(groundwaterStats);
export type GroundwaterStat = typeof groundwaterStats.$inferSelect;
export type InsertGroundwaterStat = z.infer<typeof insertGroundwaterStatSchema>;

// Dashboard Summary Type (API Response)
export type DashboardSummary = {
  totalWells: number;
  government: {
    total: number;
    agriculture: number;
    consumption: number;
  };
  private: {
    total: number;
    agriculture: number;
    consumption: number;
    business: number;
  };
  lastUpdated: string;
};
