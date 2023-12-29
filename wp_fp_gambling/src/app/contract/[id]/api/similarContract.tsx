import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { betsTable, contractTable, usersTable } from "@/db/schema";
import { auth } from "@clerk/nextjs";

export default async function getContractsByType() {
  const { userId } = auth();
  try {
    if (userId) {
      await db
        .insert(usersTable)
        .values({
          id: userId!,
        })
        .onConflictDoNothing()
        .execute();
    }

    const betSubquery = db.$with("attend_or_not").as(
      db
        .select({
          contractId: betsTable.contractId,
          option: betsTable.option,
          dollar: betsTable.dollar,
        })
        .from(betsTable)
        .where(eq(betsTable.userId, userId!)),
    );

    const contracts = await db
      .with(betSubquery)
      .select({
        contractId: contractTable.id,
        title: contractTable.title,
        description: contractTable.description,
        optionA: contractTable.optionA,
        optionB: contractTable.optionB,
        optionC: contractTable.optionC,
        totalDollar: contractTable.totalDollar,
        attendees: contractTable.attendees,
        blockDate: contractTable.blockDate,
        option: betSubquery.option,
        dollar: betSubquery.dollar,
      })
      .from(contractTable)
      .where(and(eq(contractTable.open, true), eq(contractTable.type, 'weather'))) 
      .leftJoin(betSubquery, eq(contractTable.id, betSubquery.contractId))
      .execute();
    console.log(contracts);
  } catch (error) {
    console.error('Error fetching contracts by type:', error);
  }
}
