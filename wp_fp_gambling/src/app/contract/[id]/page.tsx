"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../component/Header';
import Marquee from "react-fast-marquee";
import bet from './api/bet';
import Image from 'next/image';
import { useUser } from "@clerk/nextjs";
import { number, set } from 'zod';
import { ContractContext } from './api/useContract';
function Contract () {
  const { user } = useUser();
  const { contract, contracts, setContractId, setContractType, dollar, setUserId } = useContext(ContractContext);
  const params = useParams();
  const paramsContractId = params.id as string;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<number | "">(0);


  useEffect(() => {
    setContractId(paramsContractId);
    let type
    if (paramsContractId.split(".")[0] === "w") {
      type = "weather"
    } else if (paramsContractId.split(".")[0] === "nba") {
      type = "sport"
    } else if (paramsContractId.split(".")[0] === "m") {
      type = "marketing"
    }
    console.log(type)
    setContractType(type!);
    if (user) {
      setUserId(user.id);
      console.log(user.id);
    }
  },[paramsContractId, user]);


  const handleSaveAnswer = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };

  const handlePlaceBet = () => {
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
    if (selectedOption) {
      if (betAmount >= 0) {
        bet(contract!.id, selectedOption, betAmount);
      }
    };
  }
  const ShowSimilarContract = () => {
    return (
      <>
        <div className="py-2">
          <div className="d-flex">
            {contracts ? (
              <>
              {contracts.map((contract) => {
                return (
                  <div key={contract.id} className="card mx-4 text-center">
                    {/* <img
                      className="card-img-top p-3"
                      src={item.image}
                      alt="Card"
                      height={300}
                      width={300}
                    /> */}
                    <Link href={"/contract/" + contract.id} className="btn btn-dark m-1">
  
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
      {user ? (
        <>
          <Header userId={user.id} dollar={dollar} />
        </>
      ) : (
          <p>正在加載數據...</p>
      )}
      {contract && (
        <>
          <div className="p-8" />
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12 py-3">
              <Image
                src="/assets/IMG_1.PNG"
                alt="Card"
                width={500}
                height={500}
                layout="responsive"
                />
              </div>
              <div className="col-md-6 col-md-6 py-4">
              <h1 className="display-5" style={{ fontSize: '1.9rem' }}>{contract.title}</h1>
                <p className="lead"></p>
                <h3 className="display-6 my-4">${contract.totalDollar}</h3>
                <p className="lead">{contract.description}</p>
                <div className="my-3">
                  <div className="row">
                    <div className="col-md-4">
                      <button
                        className={`btn btn-outline-dark btn-block ${selectedOption === 'optionA' ? 'selected' : ''}`}
                        onClick={() => handleSaveAnswer('optionA')}
                      >
                        {contract.optionA}
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button
                        className={`btn btn-outline-dark btn-block ${selectedOption === 'optionB' ? 'selected' : ''}`}
                        onClick={() => handleSaveAnswer('optionB')}
                      >
                        {contract.optionB}
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button
                        className={`btn btn-outline-dark btn-block ${selectedOption === 'optionC' ? 'selected' : ''}`}
                        onClick={() => handleSaveAnswer('optionC')}
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
                  <input
                    type="number"
                    id="betAmount"
                    value={betAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setBetAmount(value === '' ? '' : Math.max(0, Number(value)));
                    }}
                    className="form-control"
                  />
                </div>

                <button
                  className={`btn btn-outline-dark w-100`} // w-100 for full width
                  onClick={handlePlaceBet}
                >
                  下注
                </button>
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

  
 
};

export default Contract;