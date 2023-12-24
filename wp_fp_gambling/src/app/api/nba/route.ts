import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://api-secure.sports.yahoo.com/v1/editorial/s/scoreboard?&region=TW&tz=Asia%2FTaipei&ysp_redesign=1&leagues=nba&date=2023-12-15");
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