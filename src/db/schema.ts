import {
  boolean,
  index,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Enquiries submitted through the contact and distributor forms.
 * Type-specific fields are kept in `payload` so both workflows share one
 * table while staying queryable.
 */
export const enquiries = pgTable(
  "enquiries",
  {
    id: serial("id").primaryKey(),
    kind: varchar("kind", { length: 20 }).notNull(), // "contact" | "distributor"
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 190 }).notNull(),
    phone: varchar("phone", { length: 30 }).notNull(),
    message: text("message").notNull(),
    payload: jsonb("payload").notNull(), // enquiry type, business fields, etc.
    consent: boolean("consent").notNull().default(false),
    /** SHA-256 hash of the requester IP — stored hashed, never raw. */
    ipHash: varchar("ip_hash", { length: 64 }),
    status: varchar("status", { length: 20 }).notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("enquiries_kind_idx").on(t.kind),
    index("enquiries_created_at_idx").on(t.createdAt),
  ],
);

/**
 * Product catalogue table reserved for the future admin dashboard.
 * The public site currently reads from the audited module in
 * `src/lib/products.ts`; this table mirrors that shape so an admin panel
 * can later manage records without restructuring.
 */
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 140 }).notNull().unique(),
    name: varchar("name", { length: 190 }).notNull(),
    category: varchar("category", { length: 80 }).notNull(),
    form: varchar("form", { length: 60 }),
    tagline: varchar("tagline", { length: 240 }),
    summary: text("summary"),
    packSizes: jsonb("pack_sizes"),
    ingredients: jsonb("ingredients"),
    image: varchar("image", { length: 400 }),
    sources: jsonb("sources"),
    verificationStatus: varchar("verification_status", { length: 30 })
      .notNull()
      .default("needs_review"),
    published: boolean("published").notNull().default(false),
    indexable: boolean("indexable").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("products_published_idx").on(t.published)],
);

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
export type DbProduct = typeof products.$inferSelect;
