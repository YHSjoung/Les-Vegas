import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { env } from "@/lib/env";
import { usersTable, contractTable, betsTable } from "@/db/schema";
