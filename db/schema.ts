import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core'

// Enums for issue status and priority
export const statusEnum = pgEnum('status', [
  'backlog',
  'todo',
  'in_progress',
  'done',
])
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high'])

// Issues table
export const tasks = pgTable('issues', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: statusEnum('status').default('backlog').notNull(),
  priority: priorityEnum('priority').default('medium').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: text('user_id').notNull(),
})

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Relations between tables
export const issuesRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}))

// Types
export type Task = InferSelectModel<typeof tasks>
export type User = InferSelectModel<typeof users>

// Status and priority labels for display
export const TASK_STATUS = {
  backlog: { label: 'Backlog', value: 'backlog' },
  todo: { label: 'Todo', value: 'todo' },
  in_progress: { label: 'In Progress', value: 'in_progress' },
  done: { label: 'Done', value: 'done' },
}

export const TASK_PRIORITY = {
  low: { label: 'Low', value: 'low' },
  medium: { label: 'Medium', value: 'medium' },
  high: { label: 'High', value: 'high' },
}

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),                          // nanoid()
  userId: text('user_id').notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  userAgent: text('user_agent'),
  ip: text('ip'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  revoked: boolean('revoked').notNull().default(false),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))
