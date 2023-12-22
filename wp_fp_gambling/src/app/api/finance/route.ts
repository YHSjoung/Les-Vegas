import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch('https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=20231201&stockNo=0050&response=json&_=0');
        const data = await response.json();
        return NextResponse.json(
            {data: data},
            { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            {
              status: 500,
            },
          );
      }
};