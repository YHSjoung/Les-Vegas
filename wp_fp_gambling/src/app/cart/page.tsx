import React from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { betsTable, contractTable, usersTable } from "@/db/schema";
import EmptyCart from "../component/EmptyCart";
import Bet from "../component/Bet";
import { auth } from "@clerk/nextjs";

export default async function Cart() {
  const { userId } = auth();
  console.log(userId);
  const dollar = await db
    .select({
      dollar: usersTable.dollar,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId!))
    .execute();

  let dollarNum;
  if (dollar.length === 0) {
    dollarNum = null;
  } else {
    dollarNum = dollar[0].dollar;
  }

  const betSubquery = db.$with("attend_or_not").as(
    db
      .select({
        id: betsTable.id,
        contractId: betsTable.contractId,
        option: betsTable.option,
        dollar: betsTable.dollar,
        status: betsTable.status,
        createdAt: betsTable.createdAt,
      })
      .from(betsTable)
      .orderBy(desc(betsTable.createdAt))
      .where(eq(betsTable.userId, userId!)),
  );

  const bets = await db
    .with(betSubquery)
    .select({
      id: betSubquery.id,
      contractId: betSubquery.contractId,
      type: contractTable.type,
      option: betSubquery.option,
      dollar: betSubquery.dollar,
      title: contractTable.title,
      optionA: contractTable.optionA,
      optionB: contractTable.optionB,
      optionC: contractTable.optionC,
      blockDate: contractTable.blockDate,
      updateDate: contractTable.updateDate,
      status: betSubquery.status,
    })
    .from(contractTable)
    .innerJoin(betSubquery, eq(contractTable.id, betSubquery.contractId))
    .orderBy(desc(betSubquery.createdAt))
    .execute();
  console.log(bets);

  return (
    <>
      <Header />
      <div className="p-11" />
      <div className="container my-3 py-3">
        <p className="text-center font-bold text-4xl z-5 mb-2">Cart</p>
        <hr />
        <>
          <section className="h-100 gradient-custom">
            <div className="container py-5">
              <div className="row d-flex justify-content-center my-4">
                <div className="col-md-8">
                  {bets.length === 0 ? (
                    <EmptyCart />
                  ) : (
                    <>
                      <div className="card mb-4">
                        <div className="card-header py-3 font-bold text-2xl ml-4">
                          Bet List
                        </div>
                        <div className="card-body">
                          {bets.map((bet) => {
                            return (
                              <Bet
                                key={bet.id}
                                id={bet.id}
                                contractId={bet.contractId!}
                                type={bet.type}
                                title={bet.title}
                                optionA={bet.optionA!}
                                optionB={bet.optionB!}
                                optionC={bet.optionC!}
                                blockDate={bet.blockDate!}
                                updateDate={bet.updateDate!}
                                option={bet.option!}
                                dollar={bet.dollar!}
                                status={bet.status!}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="col-md-4">
                  <div className="card mb-4">
                    <div className="card-header py-3 bg-light">
                      <h5 className="mb-0">Bet Summary</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          <div>
                            <strong>Total Bets</strong>
                          </div>
                          <span>{bets.length}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      </div>
      <Footer />
    </>
  );
}
