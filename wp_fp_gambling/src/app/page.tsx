import Header from "./component/Header";
import TestAPI from "@/component/TestAPI";
import { auth, UserButton } from "@clerk/nextjs";
import { Navbar, Footer } from "./component";
import Main from "./component/Main";
import Contract from "./component/Contract";
import { Suspense } from "react";
import Loading from "./loading";
import { db } from "@/db";
import { eq, desc, isNull, sql } from "drizzle-orm";
import Link from "next/link";
import { betsTable, contractTable } from "@/db/schema";

export default async function Home() {
  const { userId } = auth();
  console.log(userId);

  const betSubquery = db.$with("attend_or_not").as(
    db
      .select({
        contractId: betsTable.contractId,
        option: betsTable.option,
        dollar: betsTable.dollar,
      })
      .from(betsTable)
      .where(eq(betsTable.userId, userId!)),
  );

  const contracts = await db
    .with(betSubquery)
    .select({
      contractId: contractTable.id,
      title: contractTable.title,
      description: contractTable.description,
      optionA: contractTable.optionA,
      optionB: contractTable.optionB,
      optionC: contractTable.optionC,
      totalDollar: contractTable.totalDollar,
      attendees: contractTable.attendees,
      blockDate: contractTable.blockDate,
      option: betSubquery.option,
      dollar: betSubquery.dollar,
    })
    .from(contractTable)
    .where(eq(contractTable.open, true))
    .leftJoin(betSubquery, eq(contractTable.id, betSubquery.contractId))
    .execute();
  console.log(contracts);
  return (
    <>
      <Header userId={userId!} />
      <Main />
      <Suspense fallback={<Loading />} />
      <div className="grid grid-cols-2 gap-4 m-4">
        {contracts.map((contract) => {
          console.log(contract);
          return (
            <Contract
              contractId={contract.contractId}
              title={contract.title}
              description={contract.description}
              totalDollar={contract.totalDollar!}
              optionA={contract.optionA!}
              optionB={contract.optionB!}
              optionC={contract.optionC!}
              attendees={contract.attendees!}
              blockDate={contract.blockDate!}
              option={contract.option}
              dollar={contract.dollar}
            />
          );
        })}
      </div>
      <Footer />

      <TestAPI
        userId={userId!}
        contractId="m.2023-12-27.2330"
        option="optionA"
        dollar={100}
      />
    </>
  );
}
