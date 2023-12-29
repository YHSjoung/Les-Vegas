"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ContractDetailServer from './api/useContract';
import getContractsByType from './api/similarContract';
import Link from 'next/link';
import Header from '../../component/Header';
import Marquee from "react-fast-marquee";
import bet from './api/bet';
import Image from 'next/image';



const Contract: React.FC<ContractProps> = ({ data }) => {
  const params = useParams();
  const contractId = params;
  const contract = ContractDetailServer(contractId);
  //  const SimilarContracts = getContractsByType();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [SimilarContract, setSimilarContract] = useState([]);


  useEffect(() => {
    console.log("hello", contract);
    setSelectedOption(null); 
    //setSimilarContract(SimilarContracts);
  }, [contractId]);

  const handleSaveAnswer = (selectedOption: string) => {
    setSelectedOption(selectedOption);

  };

  const handlePlaceBet = () => {
    if (selectedOption) {
      if (betAmount >= 0) {
        bet(contract.id, selectedOption, betAmount);
      } else {
        console.warn('請輸入有效的下注金額');
      }
    } else {
      console.warn('請選擇一個選項');
    }
  };
  const ShowSimilarContract = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {SimilarContract.map((contract) => {
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
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {contract && (
        <>
          <div className="container my-5 py-2">
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
              <div className="col-md-6 col-md-6 py-5">
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
                    onChange={(e) => setBetAmount(Math.max(0, Number(e.target.value)))}
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
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
                {/* <ShowSimilarContract /> */}
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

