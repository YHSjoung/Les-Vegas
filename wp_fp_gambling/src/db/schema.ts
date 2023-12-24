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

const typeEnum = pgEnum('type', ['sport', 'weather', 'marketing']);
const outcomeEnum = pgEnum('outcome', ['optionA', 'optionB', 'optionC']);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const theDayAfterTomorrow = new Date();
theDayAfterTomorrow.setDate(theDayAfterTomorrow.getDate() + 2);


export const contractTable = pgTable(
  "contract",
  {
    id: serial("id").primaryKey(),
    type: typeEnum("type").notNull(),
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    optionA: varchar("optionA").default(""),
    optionB: varchar("optionB").default(""),
    optionC: varchar("optionC").default(""),
    dollar: integer("dollar").default(0),
    attendees: integer("attendees").default(0),
    blockDate: date("blockDate",{mode: "date"}).default(tomorrow),
    updateDate: date("updateDate",{mode : "date"}).default(theDayAfterTomorrow),
    open: boolean("open").default(true),
    outcome: outcomeEnum("outcome"),
  },
  (table) => ({
    idIndex: index("id_index").on(table.id),
    titleIndex: index("title_index").on(table.title),
    typeIndex: index("type_index").on(table.type),
    dollarIndex: index("public_index").on(table.open),
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
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (table) => ({
    idIndex: index("id_index").on(table.id),
    userIdIndex: index("userId_index").on(table.userId),
    contractIdIndex: index("contractId_index").on(table.contractId),
    dollarIndex: index("dollar_index").on(table.dollar),
  }),
);