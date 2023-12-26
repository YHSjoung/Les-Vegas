import { relations } from "drizzle-orm";
import {
    index,
    pgTable,
    serial,
    varchar,
    integer,
    pgEnum,
    timestamp,
    boolean,
    date,
  } from "drizzle-orm/pg-core";
  
export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email").unique(),
    dollar: integer("dollar").default(0),
    name: varchar("name").default(""),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
    nameIndex: index("name_index").on(table.name),
  }),
);

export const typeEnum = pgEnum('type', ['sport', 'weather', 'marketing']);
export const outcomeEnum = pgEnum('outcome', ['optionA', 'optionB', 'optionC']);

export const contractTable = pgTable(
  "contract",
  {
    id: varchar("id").primaryKey(),
    type: typeEnum("type").notNull(),
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    optionA: varchar("optionA").default(""),
    optionB: varchar("optionB").default(""),
    optionC: varchar("optionC").default(""),
    optionADollar: integer("optionADollar").default(0),
    optionBDollar: integer("optionBDollar").default(0),
    optionCDollar: integer("optionCDollar").default(0),
    totalDollar: integer("dollar").default(0),
    attendees: integer("attendees").default(0),
    blockDate: varchar("blockDate"),
    updateDate: varchar("updateDate"),
    open: boolean("open").default(true),
    outcome: outcomeEnum("outcome"),
  },
  (table) => ({
    idIndex: index("contract_id_index").on(table.id),
    titleIndex: index("contract_title_index").on(table.title),
    typeIndex: index("contract_type_index").on(table.type),
  }),
);

export const betsTable = pgTable(
  "bets",
  {
    id: serial("id").primaryKey(),
    userId: integer("userId"),
    contractId: integer("contractId"),
    option: varchar("option").default(""),
    dollar: integer("dollar").default(0),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (table) => ({
    idIndex: index("bet_id_index").on(table.id),
    userIdIndex: index("bet_userId_index").on(table.userId),
    contractIdIndex: index("bet_contractId_index").on(table.contractId),
    dollarIndex: index("bet_dollar_index").on(table.dollar),
  }),
);