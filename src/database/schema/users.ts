import type { InferModel } from 'drizzle-orm/pg-core'
import { pgEnum } from 'drizzle-orm/pg-core'
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

import { cities } from './cities'

export const roleEnum = pgEnum('role', ['user', 'admin'])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  role: roleEnum('role').default('user').notNull(),
  cityId: integer('city_id').references(() => cities.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = InferModel<typeof users>

export type NewUser = InferModel<typeof users, 'insert'>
