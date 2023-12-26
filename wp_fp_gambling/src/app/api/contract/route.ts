import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { contractTable } from "@/db/schema";
import { postContract, putContract } from "@/controler/contract";

const GetContractSchema = z.object({
  contractId: z.string(),
});
type GetContractType = z.infer<typeof GetContractSchema>;

export async function GET(request: NextRequest) {
  const data = await request.json();
  try {
    GetContractSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const { contractId } = data as GetContractType;
  try {
    const contract = await db
      .select({
        id: contractTable.id,
        type: contractTable.type,
        title: contractTable.title,
        description: contractTable.description,
        optionA: contractTable.optionA,
        optionB: contractTable.optionB,
        optionC: contractTable.optionC,
        optionADollar: contractTable.optionADollar,
        optionBDollar: contractTable.optionBDollar,
        optionCDollar: contractTable.optionCDollar,
        totalDollar: contractTable.totalDollar,
        attendees: contractTable.attendees,
        blockDate: contractTable.blockDate,
        updateDate: contractTable.updateDate,
        open: contractTable.open,
        outcome: contractTable.outcome,
      })
      .from(contractTable)
      .where(eq(contractTable.id, contractId))
      .execute();
    console.log(contract);
    return NextResponse.json({ data: contract }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const newContract = await postContract(data);
    return NextResponse.json({ data: newContract }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    const updateContract = await putContract(data);
    return NextResponse.json({ data: updateContract }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
