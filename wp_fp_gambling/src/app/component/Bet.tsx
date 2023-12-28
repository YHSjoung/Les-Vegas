"use client";
import React from "react";
type BetItemTypes = {
  id: number;
  contractId: string;
  title: string;
  type: string;
  option: string;
  optionA: string;
  optionB: string;
  optionC: string;
  blockDate: string;
  updateDate: string;
  dollar: number;
  status: boolean;
};
export default function Bet({
  id,
  contractId,
  title,
  type,
  option,
  dollar,
  status,
  optionA,
  optionB,
  optionC,
  blockDate,
  updateDate,
}: BetItemTypes) {
  if (option) {
    if (option === "optionA") {
      option = optionA;
    } else if (option === "optionB") {
      option = optionB;
    } else if (option === "optionC") {
      option = optionC;
    }
  }

  let winOrLose;
  if (new Date(updateDate) < new Date()) {
    winOrLose = status ? "贏" : "輸";
  } else {
    winOrLose = "押注";
  }

  return (
    <div key={id}>
      <div className="row d-flex align-items-center">
        <div className="col-lg-3 col-md-12">
          <div className="bg-image rounded" data-mdb-ripple-color="light">
            {/* <img
                            src={item.image}
                            // className="w-100"
                            alt={item.title}
                            width={100}
                            height={75}
                        /> */}
          </div>
        </div>

        <div className="col-lg-5 col-md-6">
          <p>
            <strong>{title}</strong>
          </p>
          {/* <p>Color: blue</p>
                    <p>Size: M</p> */}
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            {/* <button
                        className="btn px-3"
                        onClick={() => {
                            removeItem(item);
                        }}
                        >
                        <i className="fas fa-minus"></i>
                        </button> */}

            <p className="mx-5">{`你選了      ${option}`}</p>

            {/* <button
                        className="btn px-3"
                        onClick={() => {
                            addItem(item);
                        }}
                        >
                        <i className="fas fa-plus"></i>
                        </button> */}
          </div>

          <p className="text-start text-md-center">
            <strong>
              <span className="text-muted">{winOrLose}</span> ${dollar}
            </strong>
          </p>
        </div>
      </div>

      <hr className="my-4" />
    </div>
  );
}
