import { eq } from "drizzle-orm";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import z from "zod";

const PostUserSchema = z.object({
  name: z.string(),
  email: z.string(),
});
type PostUserType = z.infer<typeof PostUserSchema>;

const AddDollarSchema = z.object({
  userId: z.number(),
  dollar: z.number(),
});
type AddDollarType = z.infer<typeof AddDollarSchema>;

const deductDollarSchema = z.object({
  userId: z.number(),
  dollar: z.number(),
});
type deductDollarType = z.infer<typeof deductDollarSchema>;

export async function postUser(data: PostUserType) {
  try {
    PostUserSchema.parse(data);
  } catch (error) {
    return "Post data does not match schema";
  }
  const { name, email } = data as PostUserType;
  try {
    const newUser = await db
      .insert(usersTable)
      .values({
        name: name,
        email: email,
      })
      .execute();
    return newUser;
  } catch (error) {
    return "Insert user failed";
  }
}

export async function addDollar(data: AddDollarType) {
  try {
    AddDollarSchema.parse(data);
  } catch (error) {
    return "Post data does not match schema";
  }
  const { userId, dollar } = data as AddDollarType;
  try {
    const user = await db
      .select({
        dollar: usersTable.dollar,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .execute();
    const newDollar = user[0].dollar! + dollar;
    const updatedUser = await db
      .update(usersTable)
      .set({
        dollar: newDollar,
      })
      .where(eq(usersTable.id, userId))
      .execute();
    return updatedUser;
  } catch (error) {
    return "Insert user failed";
  }
}
