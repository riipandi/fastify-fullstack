import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { primaryKey, uniqueIndex } from 'drizzle-orm/pg-core'
import { tenants } from './tenants'
import { users } from './users'

export const roles = pgTable(
  'roles',
  {
    id: uuid('id').defaultRandom().notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    tenantId: uuid('tenant_id').references(() => tenants.id),
    permissions: text('permissions').array().$type<Array<string>>(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (roles) => {
    return {
      cpk: primaryKey(roles.name, roles.tenantId),
      idIndex: uniqueIndex('roles_id_index').on(roles.id),
    }
  },
)

export const usersHasRoles = pgTable(
  'users_has_roles',
  {
    tenantId: uuid('tenant_id')
      .references(() => tenants.id)
      .notNull(),

    roleId: uuid('role_id')
      .references(() => roles.id)
      .notNull(),

    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),
  },
  (usersHasRoles) => {
    return {
      cpk: primaryKey(usersHasRoles.tenantId, usersHasRoles.roleId, usersHasRoles.userId),
    }
  },
)
