import { NextResponse } from "next/server";
import { contractTable } from "@/db/schema";
import { db } from "@/db";

// 建立昨天、今天、明天、後天的日期
const today = new Date();
const yesterday = new Date().setDate(today.getDate() - 1);
const tomorrow = new Date().setDate(today.getDate() + 1);
const theDayAfterTomorrow = new Date().setDate(today.getDate() + 2);
const DateArray = [yesterday, today, tomorrow, theDayAfterTomorrow];

// 建立 NBA 隊伍名稱字典
interface Dictionary {
  [key: string]: string;
};
const NBATeamNameDictionay: Dictionary = {
  "nba.t.1": "亞特蘭大老鷹",
  "nba.t.2": "波士頓塞爾提克",
  "nba.t.3": "新奧爾良鵜鶘",
  "nba.t.4": "芝加哥公牛",
  "nba.t.5": "克里夫蘭騎士",
  "nba.t.6": "達拉斯獨行俠",
  "nba.t.7": "丹佛金塊",
  "nba.t.8": "底特律活塞",
  "nba.t.9": "金州勇士",
  "nba.t.10": "休士頓火箭",
  "nba.t.11": "印第安納溜馬",
  "nba.t.12": "洛杉磯快艇",
  "nba.t.13": "洛杉磯湖人",
  "nba.t.14": "邁阿密熱火",
  "nba.t.15": "密爾瓦基公鹿",
  "nba.t.16": "明尼蘇達灰狼",
  "nba.t.17": "布魯克林籃網",
  "nba.t.18": "紐約尼克",
  "nba.t.19": "奧蘭多魔術",
  "nba.t.20": "費城76人",
  "nba.t.21": "鳳凰城太陽",
  "nba.t.22": "波特蘭拓荒者",
  "nba.t.23": "沙加緬度國王",
  "nba.t.24": "聖安東尼奧馬刺",
  "nba.t.25": "奧克拉荷馬雷霆",
  "nba.t.26": "猶他爵士",
  "nba.t.27": "華盛頓巫師",
  "nba.t.28": "多倫多暴龍",
  "nba.t.29": "曼菲斯灰熊",
  "nba.t.30": "夏洛特黃蜂",
};

//格式化全局日期 YYYY-MM-DD
function formateDate(DateArray: Array<string|number|Date>) {
  const formatedDateArray = [];
  for (let i = 0; i < DateArray.length; i++) {
    const date = new Date(DateArray[i]);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    formatedDateArray[i] = `${year}-${month}-${day}`;
  }
  return formatedDateArray;
};
// 建立天氣合約
async function postWeatherContract() {
  const formatedDateArray = formateDate(DateArray);

  // 格式化天氣日期 YYYYMMDD
  const weatherDateArray = [];
  for (let i = 0; i < DateArray.length; i++) {
    const weatherDate = formatedDateArray[i].replace(/-/g, "");
    weatherDateArray.push(weatherDate);
  };
  // 調取明天中午 12 點的氣溫預測
  const response = await fetch(`https://www.cwa.gov.tw/Data/js/3hr/ChartData_3hr_T_63.js?T=${weatherDateArray[1]}00-0`);
  const textdata = await response.text();
  const forcastDegree = Number(textdata.split('\n\n')[2].split('\n')[9].split('[')[1].split(',')[12]);
  console.log(forcastDegree);

  // 建立合約
  const res = await fetch("/api/contract", {
    method: "POST",
    body: JSON.stringify({
      type: "weather",
      title: `台北市大安區 ${DateArray[2]} 中午 12 點氣溫`,
      description: "你覺得明天的氣溫會是多少呢？",
      optionA: `${forcastDegree}度以下`,
      optionB: `${forcastDegree}度 ~ ${forcastDegree + 1}度`,
      optionC: `${forcastDegree + 1}度以上`,
      blockeDate: DateArray[2],
      updateDate: DateArray[3],
    }),
  });
  const data = await res.json();
  return data;
};
// 建立 NBA 合約
async function postNBAContract() {
  // 調取明天 NBA 明天賽程
  const response = await fetch(`https://api-secure.sports.yahoo.com/v1/editorial/s/scoreboard?&region=TW&tz=Asia%2FTaipei&ysp_redesign=1&leagues=nba&date=${DateArray[2]}`);
  const data = await response.json();
  const games = data.service.scoreboard.games;
  if (!games) {
    return "There isn't any game tomorrow";
  }
  console.log(games);

  // 建立合約
  const gamesArray = Object.values(games);
  const postNBAReses = gamesArray.map(async (game :any) => {
    const res = await fetch("/api/contract", {
      method: "POST",
      body: JSON.stringify({
        type: "NBA",
        title: `${DateArray[2]} ${NBATeamNameDictionay[game.home_team_id]} VS ${NBATeamNameDictionay[game.away_team_id]}`,
        description: "你覺得哪一隊會贏呢？",
        optionA: `${NBATeamNameDictionay[game.home_team_id]}`,
        optionB: `平手`,
        optionC: `${NBATeamNameDictionay[game.away_team_id]}`,
        blockeDate: DateArray[2],
        updateDate: DateArray[3],
      }),
    });
    const data = await res.json();
    return data;
    // return {
    //   home_team_id: game.home_team_id,
    //   away_team_id: game.away_team_id,
    //   total_home_points: game.total_home_points,
    //   total_away_points: game.total_away_points,
    //   status_displayname: game.status_displayname,
    //   winning_team_id: game.winning_team_id,
    // };
  });
  console.log(postNBAReses);
  return postNBAReses;
};
// 建立股價合約
async function postMarketingContract() {
  const formatedDateArray = formateDate(DateArray);
  const companyArray = ["長榮 (2603)", "台積電(2330)", "開發金(2883)"];

  const postMarketingReses = companyArray.map(async (company) => {
    const res = await fetch("/api/contract", {
      method: "POST",
      body: JSON.stringify({
        type: "marketing",
        title: `${formatedDateArray[2]} ${company} 股價漲跌`,
        description: `你覺得明天 ${company} 股價漲跌多少 %?`,
        optionA: `-1.5% 以下`,
        optionB: `-1.5% ~ 1.5%`,
        optionC: `1.5% 以上`,
        blockeDate: formatedDateArray[2],
        updateDate: formatedDateArray[3],
      }),
    });
    const data = await res.json();
    return data;
  });
  console.log(postMarketingReses);
  return postMarketingReses;
};

async function updateWeatherContract() {
  const formatedDateArray = formateDate(DateArray);
  
}




`https://www.cwa.gov.tw/Data/js/GT/ChartData_GT24hr_T_63.js?T=${DateArray[1]}00-0`

// [2603(長榮), 2330(台積電), 2883(開發金)]
// const response = await fetch('https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=20231201&stockNo=0050&response=json');

export async function GET() {
  try {
    const formatedDateArray = formateDate(DateArray);

    const response = await fetch('https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=20231201&stockNo=0050&response=json');
    const data = await response.json();
      const games = data.service.scoreboard.games;
      if (!games) {
          return NextResponse.json(
            { error: "There isn't any game tomorrow" },
            {
              status: 500,
            },
          );
        }
        console.log(games);
        const gamesArray = Object.values(games);
        const gameScore = gamesArray.map(async (game :any) => {
          const res = await fetch("/api/contract", {
            method: "POST",
            body: JSON.stringify({
              type: "NBA",
              title: `${DateArray[2]} ${NBATeamNameDictionay[game.home_team_id]} VS ${NBATeamNameDictionay[game.away_team_id]}`,
              description: "你覺得哪一隊會贏呢？",
              optionA: `${NBATeamNameDictionay[game.home_team_id]}`,
              optionB: `平手`,
              optionC: `${NBATeamNameDictionay[game.away_team_id]}`,
              blockeDate: DateArray[2],
              updateDate: DateArray[3],
            }),
          });
          // return {
          //   home_team_id: game.home_team_id,
          //   away_team_id: game.away_team_id,
          //   total_home_points: game.total_home_points,
          //   total_away_points: game.total_away_points,
          //   status_displayname: game.status_displayname,
          //   winning_team_id: game.winning_team_id,
          // };
        });
        console.log(gameScore);
        return NextResponse.json(
            {data: data.service.scoreboard.games},
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