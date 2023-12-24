import { NextResponse } from "next/server";

async function updateDatabase() {};
"https://www.cwa.gov.tw/Data/js/3hr/ChartData_3hr_T_63.js?T=2023122300-0"

"https://www.cwa.gov.tw/Data/js/GT/ChartData_GT24hr_T_63.js?T=2023122400-0"
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


export async function GET2() {
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