import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const records = sqliteTable('records',{id:text('id').primaryKey(),kind:text('kind').notNull(),data:text('data').notNull(),revision:integer('revision').notNull().default(1)});
export const history = sqliteTable('history',{id:text('id').primaryKey(),recordId:text('record_id').notNull(),at:text('at').notNull(),actor:text('actor').notNull(),data:text('data').notNull()});
