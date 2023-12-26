import { eq, } from "drizzle-orm";
import { db } from "@/db";
import { contractTable } from "@/db/schema";
import z from "zod";

export enum ContractType {
    Sport = "sport",
    Weather = "weather",
    Marketing = "marketing"
  };

const PostContractsSchema = z.object({
    id: z.string(),
    type: z.enum(["sport", "weather", "marketing"]),
    title: z.string(),
    description: z.string(),
    optionA: z.string(),
    optionB: z.string(),
    optionC: z.string(),
    blockDate: z.string(),
    updateDate: z.string(),
});
type PostContractsType = z.infer<typeof PostContractsSchema>;

export enum OptionType {
  optionA = "optionA",
  optionB = "optionB",
  optionC = "optionC"
};
const PutConractSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  open: z.boolean().optional(),
  outcome: z.enum(["optionA", "optionB", "optionC"]).optional(),
  totalDollar: z.number().optional(),
  optionADollar: z.number().optional(),
  optionBDollar: z.number().optional(),
  optionCDollar: z.number().optional(),
});
type PutConractType = z.infer<typeof PutConractSchema>;

export async function postContract(data: PostContractsType) {
    try {
        PostContractsSchema.parse(data);
    } catch (error) {
        return "Post data does not match schema"
    };
  const { id, type, title, description, optionA, optionB, optionC, blockDate, updateDate} = data as PostContractsType;
  console.log(data);
  try {
    const newContract = await db
      .insert(contractTable)
      .values({
          id: id,
          type: type,
          title: title,
          description: description,
          optionA: optionA,
          optionB: optionB,
          optionC: optionC,
          blockDate: blockDate,
          updateDate: updateDate,
      })
      .returning()
      .execute();
      console.log(newContract);
      return newContract;
    } catch (error) {
      return "Post contract failed"
    }
}

export async function putContract(data: PutConractType) {
  try {
    PutConractSchema.parse(data);
  } catch (error) {
    return  "Put data does not match schema"
  }
  const { id, open, outcome, totalDollar, optionADollar, optionBDollar, optionCDollar } = data as PutConractType;
  console.log(data);
  try {
  const updateContract = await db
        .update(contractTable)
        .set({
            open: open,
            outcome: outcome,
            totalDollar: totalDollar,
            optionADollar: optionADollar,
            optionBDollar: optionBDollar,
            optionCDollar: optionCDollar,
        })
        .where(
            eq(contractTable.id, id),
        )
        .returning()
        .execute();
        console.log(updateContract);
        return updateContract;
      } catch (error) {
        return "Put contract failed"
      }
}
