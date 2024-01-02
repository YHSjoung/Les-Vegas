"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../component/Header";
import Marquee from "react-fast-marquee";
import handleBet from "./api/bet";
import Image from "next/image";
import { ContractContext } from "../../../useHook/useContract";
import { UserContext } from "@/useHook/useUser";

function Contract() {
  const { userId, dollar, setDollar } = useContext(UserContext);
  const {
    contract,
    contractsOfTheSameType,
    setContractId,
    setContractType,
    bet,
    setBet,
  } = useContext(ContractContext);
  const params = useParams();
  const paramsContractId = params.id as string;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<number | "">(0);
  const [block, setBlock] = useState(false);
  const [totalDollar, setTotalDollar] = useState(0);
  const [attendees, setAttendees] = useState(0);

  useEffect(() => {
    // 設置合約 ID
    setContractId(paramsContractId);
    let type;
    if (paramsContractId.split(".")[0] === "w") {
      type = "weather";
    } else if (paramsContractId.split(".")[0] === "nba") {
      type = "sport";
    } else if (paramsContractId.split(".")[0] === "m") {
      type = "marketing";
    }
    console.log(type);
    setContractType(type!);
    console.log(bet);
  }, [paramsContractId]);

  useEffect(() => {
    console.log("Bet:", bet);
    if (!bet) return;
    if (bet!.contractId === paramsContractId) {
      setBlock(true);
    }
    console.log("Block:", block);
  }, [bet, paramsContractId]);

  useEffect(() => {
    if (contract) {
      setAttendees(contract.attendees);
      setTotalDollar(contract.totalDollar);
    }
  }, [contract]);

  const handleSaveAnswer = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };

  const handlePlaceBet = () => {
    if (selectedOption === null) {
      alert("請選擇投注選項");
      return;
    }
    if (typeof betAmount !== "number") {
      setBetAmount(0);
      alert("下注金額不能為空");
      return;
    }
    if (betAmount > dollar!) {
      setBetAmount(dollar!);
      alert("下注金額不能大於您的餘額");
      return;
    }
    if (betAmount === 0) {
      setBetAmount(0);
      alert("下注金額不能為0");
      return;
    }
    handleBet(contract!.id, selectedOption, betAmount, userId!);
    setBlock(true);
    setTotalDollar(totalDollar + betAmount);
    setAttendees(attendees + 1);
    setDollar(dollar! - betAmount);
    setBet({
      id: paramsContractId,
      contractId: paramsContractId,
      userId: userId!,
      option: selectedOption!,
      dollar: betAmount,
    });
  };
  const ShowSimilarContract = () => {
    return (
      <>
        <div className="py-2">
          <div className="d-flex">
            {contractsOfTheSameType ? (
              <>
                {contractsOfTheSameType.map((contract) => {
                  return (
                    <div key={contract.id} className="card mx-4 text-center">
                      <Link
                        href={"/contract/" + contract.id}
                        className="btn btn-dark m-1"
                      >
                        <div className="card-body">
                          <h5 className="card-title">
                            {contract.title.substring(0, 15)}...
                          </h5>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>正在加載數據...</p>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {userId ? (
        <>
          <Header />
        </>
      ) : (
        <p>正在加載數據...</p>
      )}
      {contract && (
        <>
          <div className="p-4" />
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12 pt-3">
                <Image
                  src="/assets/IMG_1.PNG"
                  alt="Card"
                  width={500}
                  height={500}
                  layout="responsive"
                />
              </div>
              <div className="col-md-6 col-md-6 pt-20">
                <p
                  className="display-5 font-bold"
                  style={{ fontSize: "2.3rem" }}
                >
                  {contract.title}
                </p>
                <p className="lead"></p>
                <p className="display-6 my-4" style={{ fontSize: "1.9rem" }}>
                  投注池中總金額 $ {totalDollar}
                </p>
                <p className="display-6 my-4" style={{ fontSize: "1.9rem" }}>
                  投注人數 {attendees}
                </p>
                <p className="lead">{contract.description}</p>
                <div className="my-3">
                  <div className="row">
                    <div className="col-md-4">
                      <button
                        className={`
                        ${
                          selectedOption === "optionA" ||
                          bet?.option === "optionA"
                            ? "selected"
                            : ""
                        } 
                        ${
                          contract.outcome !== null &&
                          contract.outcome.toString() === "optionA"
                            ? "btn btn-success"
                            : "btn btn-outline-dark btn-block "
                        }`}
                        onClick={() => handleSaveAnswer("optionA")}
                        disabled={block}
                      >
                        {contract.optionA}
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button
                        className={`
                        ${
                          selectedOption === "optionB" ||
                          bet?.option === "optionB"
                            ? "selected"
                            : ""
                        } 
                        ${
                          contract.outcome !== null &&
                          contract.outcome.toString() === "optionB"
                            ? "btn btn-success"
                            : "btn btn-outline-dark btn-block "
                        }`}
                        onClick={() => handleSaveAnswer("optionB")}
                        disabled={block}
                      >
                        {contract.optionB}
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button
                        className={`
                        ${
                          selectedOption === "optionC" ||
                          bet?.option === "optionC"
                            ? "selected"
                            : ""
                        } 
                        ${
                          contract.outcome !== null &&
                          contract.outcome.toString() === "optionC"
                            ? "btn btn-success"
                            : "btn btn-outline-dark btn-block "
                        }`}
                        onClick={() => handleSaveAnswer("optionC")}
                        disabled={block}
                      >
                        {contract.optionC}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="my-3">
                  <label htmlFor="betAmount" className="form-label">
                    下注金額：
                  </label>
                  {block ? (
                    <input
                      type="number"
                      id="betAmount"
                      value={bet?.dollar.toString() || betAmount}
                      className="form-control"
                      disabled
                    />
                  ) : (
                    <input
                      type="number"
                      id="betAmount"
                      value={betAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        setBetAmount(
                          value === "" ? "" : Math.max(0, Number(value)),
                        );
                      }}
                      className="form-control"
                    />
                  )}
                </div>
                {block ? (
                  <p className="text-danger">
                    {contract.outcome === null
                      ? "您已投注，請等待結果揭曉"
                      : "結果已公佈"}
                  </p>
                ) : (
                  <button
                    className={`btn btn-outline-dark w-100`} // w-100 for full width
                    onClick={handlePlaceBet}
                  >
                    下注
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="d-none d-md-block">
                <h2 className="">You may also Like</h2>
                <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
                  <ShowSimilarContract />
                </Marquee>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Contract;
