import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { postBet, getBet } from "@/controler/bet";

export async function GET(request: NextRequest) {
  const data = await request.json();
  try {
    const Bets = await getBet(data);
    console.log(Bets);
    return NextResponse.json({ data: Bets }, { status: 200 });
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
    const bet = await postBet(data);
    console.log(bet);
    return NextResponse.json({ data: bet }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
