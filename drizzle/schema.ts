import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Projects table - Film, Reklam, Belgesel, Müzik Video
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: mysqlEnum("category", ["film", "reklam", "belgesel", "muzik_video"]).notNull(),
  shortDescription: text("shortDescription"),
  fullDescription: text("fullDescription"),
  thumbnail: text("thumbnail"),
  gallery: json("gallery").$type<string[]>(),
  videoUrl: text("videoUrl"),
  director: varchar("director", { length: 255 }),
  camera: varchar("camera", { length: 255 }),
  duration: varchar("duration", { length: 100 }),
  year: int("year"),
  crew: text("crew"),
  status: mysqlEnum("status", ["active", "coming_soon", "draft"]).default("draft").notNull(),
  sortOrder: int("sortOrder").default(0),
  isFeatured: boolean("isFeatured").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Coming Soon Projects - Pek Yakında
 */
export const comingSoonProjects = mysqlTable("coming_soon_projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  teaserImage: text("teaserImage"),
  teaserVideo: text("teaserVideo"),
  description: text("description"),
  releaseDate: timestamp("releaseDate"),
  isActive: boolean("isActive").default(true),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ComingSoonProject = typeof comingSoonProjects.$inferSelect;
export type InsertComingSoonProject = typeof comingSoonProjects.$inferInsert;

/**
 * Email subscribers for coming soon notifications
 */
export const emailSubscribers = mysqlTable("email_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  isActive: boolean("isActive").default(true),
});

export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type InsertEmailSubscriber = typeof emailSubscribers.$inferInsert;

/**
 * Team members - Ekibimiz
 */
export const teamMembers = mysqlTable("team_members", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  department: mysqlEnum("department", ["yonetim", "kreatif", "produksiyon", "teknik"]).notNull(),
  photo: text("photo"),
  shortBio: text("shortBio"),
  fullBio: text("fullBio"),
  linkedinUrl: text("linkedinUrl"),
  imdbUrl: text("imdbUrl"),
  sortOrder: int("sortOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = typeof teamMembers.$inferInsert;

/**
 * Organization chart positions
 */
export const orgPositions = mysqlTable("org_positions", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  department: varchar("department", { length: 255 }),
  parentId: int("parentId"),
  photo: text("photo"),
  bio: text("bio"),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OrgPosition = typeof orgPositions.$inferSelect;
export type InsertOrgPosition = typeof orgPositions.$inferInsert;

/**
 * About page content sections
 */
export const aboutContent = mysqlTable("about_content", {
  id: int("id").autoincrement().primaryKey(),
  section: mysqlEnum("section", ["vision", "mission", "story", "values"]).notNull().unique(),
  title: varchar("title", { length: 255 }),
  content: text("content"),
  image: text("image"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AboutContent = typeof aboutContent.$inferSelect;
export type InsertAboutContent = typeof aboutContent.$inferInsert;

/**
 * Company values
 */
export const companyValues = mysqlTable("company_values", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CompanyValue = typeof companyValues.$inferSelect;
export type InsertCompanyValue = typeof companyValues.$inferInsert;

/**
 * Achievements and awards timeline
 */
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  year: int("year").notNull(),
  type: mysqlEnum("type", ["award", "milestone"]).default("milestone"),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

/**
 * Partner/client references
 */
export const partners = mysqlTable("partners", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: text("logo"),
  website: text("website"),
  sortOrder: int("sortOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

/**
 * Contact form messages
 */
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  projectType: mysqlEnum("projectType", ["film", "reklam", "belgesel", "muzik_video", "diger"]),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["unread", "read", "replied", "archived"]).default("unread").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

/**
 * Site settings
 */
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 100 }).notNull().unique(),
  settingValue: text("settingValue"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

/**
 * Contact information
 */
export const contactInfo = mysqlTable("contact_info", {
  id: int("id").autoincrement().primaryKey(),
  address: text("address"),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 320 }),
  mapLat: varchar("mapLat", { length: 50 }),
  mapLng: varchar("mapLng", { length: 50 }),
  facebook: text("facebook"),
  instagram: text("instagram"),
  twitter: text("twitter"),
  youtube: text("youtube"),
  linkedin: text("linkedin"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = typeof contactInfo.$inferInsert;
