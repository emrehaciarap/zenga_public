import { eq, desc, asc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  projects, InsertProject, Project,
  comingSoonProjects, InsertComingSoonProject,
  emailSubscribers, InsertEmailSubscriber,
  teamMembers, InsertTeamMember,
  orgPositions, InsertOrgPosition,
  aboutContent, InsertAboutContent,
  companyValues, InsertCompanyValue,
  achievements, InsertAchievement,
  partners, InsertPartner,
  contactMessages, InsertContactMessage,
  siteSettings, InsertSiteSetting,
  contactInfo, InsertContactInfo
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ==================== USER FUNCTIONS ====================
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== PROJECTS FUNCTIONS ====================
export async function getAllProjects(status?: 'active' | 'coming_soon' | 'draft') {
  const db = await getDb();
  if (!db) return [];
  
  if (status) {
    return db.select().from(projects).where(eq(projects.status, status)).orderBy(asc(projects.sortOrder));
  }
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
}

export async function getProjectsByCategory(category: 'film' | 'reklam' | 'belgesel' | 'muzik_video') {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(projects)
    .where(and(eq(projects.category, category), eq(projects.status, 'active')))
    .orderBy(asc(projects.sortOrder));
}

export async function getFeaturedProjects() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(projects)
    .where(and(eq(projects.isFeatured, true), eq(projects.status, 'active')))
    .orderBy(asc(projects.sortOrder))
    .limit(3);
}

export async function getProjectBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return result[0];
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0];
}

export async function createProject(data: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(projects).values(data);
  return { success: true };
}

export async function updateProject(id: number, data: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(projects).set(data).where(eq(projects.id, id));
  return { success: true };
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(projects).where(eq(projects.id, id));
  return { success: true };
}

// ==================== COMING SOON FUNCTIONS ====================
export async function getComingSoonProjects() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(comingSoonProjects)
    .where(eq(comingSoonProjects.isActive, true))
    .orderBy(asc(comingSoonProjects.sortOrder));
}

export async function getAllComingSoonProjects() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(comingSoonProjects).orderBy(asc(comingSoonProjects.sortOrder));
}

export async function createComingSoonProject(data: InsertComingSoonProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(comingSoonProjects).values(data);
  return { success: true };
}

export async function updateComingSoonProject(id: number, data: Partial<InsertComingSoonProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(comingSoonProjects).set(data).where(eq(comingSoonProjects.id, id));
  return { success: true };
}

export async function deleteComingSoonProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(comingSoonProjects).where(eq(comingSoonProjects.id, id));
  return { success: true };
}

// ==================== EMAIL SUBSCRIBERS ====================
export async function subscribeEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(emailSubscribers).values({ email }).onDuplicateKeyUpdate({ set: { isActive: true } });
  return { success: true };
}

export async function getAllSubscribers() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(emailSubscribers).where(eq(emailSubscribers.isActive, true));
}

// ==================== TEAM MEMBERS FUNCTIONS ====================
export async function getTeamMembers(department?: 'yonetim' | 'kreatif' | 'produksiyon' | 'teknik') {
  const db = await getDb();
  if (!db) return [];
  
  if (department) {
    return db.select().from(teamMembers)
      .where(and(eq(teamMembers.department, department), eq(teamMembers.isActive, true)))
      .orderBy(asc(teamMembers.sortOrder));
  }
  return db.select().from(teamMembers)
    .where(eq(teamMembers.isActive, true))
    .orderBy(asc(teamMembers.sortOrder));
}

export async function getAllTeamMembers() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder));
}

export async function createTeamMember(data: InsertTeamMember) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(teamMembers).values(data);
  return { success: true };
}

export async function updateTeamMember(id: number, data: Partial<InsertTeamMember>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(teamMembers).set(data).where(eq(teamMembers.id, id));
  return { success: true };
}

export async function deleteTeamMember(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
  return { success: true };
}

// ==================== ORG POSITIONS FUNCTIONS ====================
export async function getOrgPositions() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(orgPositions).orderBy(asc(orgPositions.sortOrder));
}

export async function createOrgPosition(data: InsertOrgPosition) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(orgPositions).values(data);
  return { success: true };
}

export async function updateOrgPosition(id: number, data: Partial<InsertOrgPosition>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(orgPositions).set(data).where(eq(orgPositions.id, id));
  return { success: true };
}

export async function deleteOrgPosition(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(orgPositions).where(eq(orgPositions.id, id));
  return { success: true };
}

// ==================== ABOUT CONTENT FUNCTIONS ====================
export async function getAboutContent() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(aboutContent);
}

export async function upsertAboutContent(data: InsertAboutContent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(aboutContent).values(data).onDuplicateKeyUpdate({
    set: { title: data.title, content: data.content, image: data.image }
  });
  return { success: true };
}

// ==================== COMPANY VALUES FUNCTIONS ====================
export async function getCompanyValues() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(companyValues).orderBy(asc(companyValues.sortOrder));
}

export async function createCompanyValue(data: InsertCompanyValue) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(companyValues).values(data);
  return { success: true };
}

export async function updateCompanyValue(id: number, data: Partial<InsertCompanyValue>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(companyValues).set(data).where(eq(companyValues.id, id));
  return { success: true };
}

export async function deleteCompanyValue(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(companyValues).where(eq(companyValues.id, id));
  return { success: true };
}

// ==================== ACHIEVEMENTS FUNCTIONS ====================
export async function getAchievements() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(achievements).orderBy(desc(achievements.year), asc(achievements.sortOrder));
}

export async function createAchievement(data: InsertAchievement) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(achievements).values(data);
  return { success: true };
}

export async function updateAchievement(id: number, data: Partial<InsertAchievement>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(achievements).set(data).where(eq(achievements.id, id));
  return { success: true };
}

export async function deleteAchievement(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(achievements).where(eq(achievements.id, id));
  return { success: true };
}

// ==================== PARTNERS FUNCTIONS ====================
export async function getPartners() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(partners)
    .where(eq(partners.isActive, true))
    .orderBy(asc(partners.sortOrder));
}

export async function getAllPartners() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(partners).orderBy(asc(partners.sortOrder));
}

export async function createPartner(data: InsertPartner) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(partners).values(data);
  return { success: true };
}

export async function updatePartner(id: number, data: Partial<InsertPartner>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(partners).set(data).where(eq(partners.id, id));
  return { success: true };
}

export async function deletePartner(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(partners).where(eq(partners.id, id));
  return { success: true };
}

// ==================== CONTACT MESSAGES FUNCTIONS ====================
export async function getContactMessages(status?: 'unread' | 'read' | 'replied' | 'archived') {
  const db = await getDb();
  if (!db) return [];
  
  if (status) {
    return db.select().from(contactMessages)
      .where(eq(contactMessages.status, status))
      .orderBy(desc(contactMessages.createdAt));
  }
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function createContactMessage(data: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(contactMessages).values(data);
  return { success: true };
}

export async function updateContactMessageStatus(id: number, status: 'unread' | 'read' | 'replied' | 'archived') {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(contactMessages).set({ status }).where(eq(contactMessages.id, id));
  return { success: true };
}

export async function deleteContactMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  return { success: true };
}

// ==================== SITE SETTINGS FUNCTIONS ====================
export async function getSiteSettings() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(siteSettings);
}

export async function getSiteSetting(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
  return result[0]?.settingValue;
}

export async function upsertSiteSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(siteSettings).values({ settingKey: key, settingValue: value })
    .onDuplicateKeyUpdate({ set: { settingValue: value } });
  return { success: true };
}

// ==================== CONTACT INFO FUNCTIONS ====================
export async function getContactInfo() {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(contactInfo).limit(1);
  return result[0];
}

export async function upsertContactInfo(data: InsertContactInfo) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getContactInfo();
  if (existing) {
    await db.update(contactInfo).set(data).where(eq(contactInfo.id, existing.id));
  } else {
    await db.insert(contactInfo).values(data);
  }
  return { success: true };
}
