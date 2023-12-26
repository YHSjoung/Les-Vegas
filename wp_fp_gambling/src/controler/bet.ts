import { eq } from "drizzle-orm";
import { db } from "@/db";
import { betsTable } from "@/db/schema";
import z from "zod";

const PostBetSchema = z.object({
  userId: z.string(),
  contractId: z.string(),
  option: z.enum(["optionA", "optionB", "optionC"]),
  dollar: z.number(),
});
type PostBetType = z.infer<typeof PostBetSchema>;

export enum forWhat {
  user = "user",
  contract = "contract",
}

const GetBetSchema = z.object({
  userId: z.string().optional(),
  contractId: z.string().optional(),
  forWhat: z.enum(["user", "contract"]),
});
type GetBetType = z.infer<typeof GetBetSchema>;

export async function postBet(data: PostBetType) {
  try {
    PostBetSchema.parse(data);
  } catch (error) {
    return "Post data does not match schema";
  }
  const { userId, contractId, option, dollar } = data as PostBetType;
  try {
    const newBet = await db
      .insert(betsTable)
      .values({
        userId: userId,
        contractId: contractId,
        option: option,
        dollar: dollar,
      })
      .execute();
    return newBet;
  } catch (error) {
    return "Insert bet failed";
  }
}

export async function getBet(data: GetBetType) {
  try {
    GetBetSchema.parse(data);
  } catch (error) {
    return "Get data does not match schema";
  }
  const { userId, contractId, forWhat } = data as GetBetType;
  try {
    if (forWhat === "user") {
      const bet = await db
        .select({
          id: betsTable.id,
          userId: betsTable.userId,
          contractId: betsTable.contractId,
          option: betsTable.option,
          dollar: betsTable.dollar,
        })
        .from(betsTable)
        .where(eq(betsTable.userId, userId!))
        .execute();
      return bet;
    } else {
      const bet = await db
        .select({
          id: betsTable.id,
          userId: betsTable.userId,
          contractId: betsTable.contractId,
          option: betsTable.option,
          dollar: betsTable.dollar,
        })
        .from(betsTable)
        .where(eq(betsTable.contractId, contractId!))
        .execute();
      return bet;
    }
  } catch (error) {
    return "Get bet failed";
  }
}
