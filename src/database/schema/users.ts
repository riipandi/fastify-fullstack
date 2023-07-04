import type { InferModel } from 'drizzle-orm'
import { pgEnum } from 'drizzle-orm/pg-core'
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { cities } from './cities'

export const roleEnum = pgEnum('role', ['user', 'admin'])

export const userTable = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  role: roleEnum('role').default('user').notNull(),
  // role: text('role', { enum: ['admin', 'user'] }),
  cityId: integer('city_id').references(() => cities.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(userTable)

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(userTable, {
  id: (schema) => schema.id.positive(),
  role: z.string(),
})
