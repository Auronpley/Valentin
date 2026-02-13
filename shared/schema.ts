
import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  accepted: boolean("accepted").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResponseSchema = createInsertSchema(responses).pick({
  accepted: true,
});

export type InsertResponse = z.infer<typeof insertResponseSchema>;
export type Response = typeof responses.$inferSelect;
