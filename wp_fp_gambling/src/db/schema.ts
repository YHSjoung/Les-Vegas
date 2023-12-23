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

const typeEnum = pgEnum('type', ['sport', 'weather', 'marketing']);

export const contractTable = pgTable(
  "contract",
  {
    id: serial("id").primaryKey(),
    type: typeEnum("type"),
    title: varchar("title").default(""),
    description: varchar("description").default(""),
    optionA: varchar("optionA").default(""),
    optionB: varchar("optionB").default(""),
    optionC: varchar("optionC").default(""),
    dollar: integer("dollar").default(0),
    attendees: integer("attendees").default(0),
    blockTime: timestamp("blockTime",{withTimezone: true}),
    public: boolean("public").default(true),
  },
  (table) => ({
    idIndex: index("id_index").on(table.id),
    titleIndex: index("title_index").on(table.title),
    typeIndex: index("type_index").on(table.type),
    dollarIndex: index("public_index").on(table.public),
    attendeesIndex: index("attendees_index").on(table.attendees),
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
  },
  (table) => ({
    idIndex: index("id_index").on(table.id),
    userIdIndex: index("userId_index").on(table.userId),
    contractIdIndex: index("contractId_index").on(table.contractId),
    dollarIndex: index("dollar_index").on(table.dollar),
  }),
);