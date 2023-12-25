import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { eq, } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { usersTable, contractTable, betsTable } from "@/db/schema";

const GetContractSchema = z.object({
    contractId: z.number(),
});
type GetContractType = z.infer<typeof GetContractSchema>;

const PostContractsSchema = z.object({
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

const PutConractSchema = z.object({
    contractId: z.number(),
    typeId: z.string(),
    open: z.boolean().optional(),
    outcome: z.enum(["optionA", "optionB", "optionC"]).optional(),
    dollar: z.number().optional(),
});
type PutConractType = z.infer<typeof PutConractSchema>;

export async function GET(request: NextRequest) {
    const data = await request.json();
    try {
        GetContractSchema.parse(data);
    } catch (error) {
        return  NextResponse.json(
            { error: "Bad Request",},
            { status: 400,}
        );
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
            dollar: contractTable.dollar,
            attendees: contractTable.attendees,
            blockDate: contractTable.blockDate,
            updateDate: contractTable.updateDate,
            open: contractTable.open,
            outcome: contractTable.outcome,
        })
        .from(contractTable)
        .where(
            eq(contractTable.id, contractId),
        )
        .execute();
        console.log(contract);
        return NextResponse.json(
            { data: contract, },
            { status: 200, },
        );

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
        PostContractsSchema.parse(data);
    } catch (error) {
        return  NextResponse.json(
            { error: "Bad Request",},
            { status: 400,}
        );
    }
    const { type, title, description, optionA, optionB, optionC, blockDate, updateDate} = data as PostContractsType;
    try {
        const newContract = await db
        .insert(contractTable)
        .values({
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
        return NextResponse.json(
            { data: newContract, },
            { status: 200, },
        );

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
        PutConractSchema.parse(data);
    } catch (error) {
        return  NextResponse.json(
            { error: "Bad Request",},
            { status: 400,}
        );
    }
    const { contractId, open, outcome, dollar } = data as PutConractType;
    try {
        const updateContract = await db
        .update(contractTable)
        .set({
            open: open,
            outcome: outcome,
            dollar: dollar,
        })
        .where(
            eq(contractTable.id, contractId),
        )
        .returning()
        .execute();
        console.log(updateContract);
        return NextResponse.json(
            { data: updateContract, },
            { status: 200, },
        );

    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
        );
    }
}