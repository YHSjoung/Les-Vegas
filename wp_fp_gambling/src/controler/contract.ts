import { eq, } from "drizzle-orm";
import { db } from "@/db";
import { contractTable } from "@/db/schema";
import z from "zod";

export enum ContractType {
    Sport = "sport",
    Weather = "weather",
    Marketing = "marketing"
  }

const contractTypeValues = Object.values(ContractType);

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