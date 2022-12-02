import React from "react";

import creditIcon from "../../assets/credit.png";
import dueIcon from "../../assets/due.webp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBlockchainContext } from "../../context/BlockchainContext";
import { useState } from "react";

function OwnerStats() {
  const { ownerBalance, contractBalance, withdrawOwnerBalance } =
    getBlockchainContext();

  const [disableButton, setDisableButton] = useState(false);

  async function handleWithdrawal() {
    if (ownerBalance <= 0) return;
    setDisableButton(true);
    await withdrawOwnerBalance();
    setDisableButton(false);
  }

  return (
    <div className="m-16 p-10 flex flex-col">
      <p className="font-semibold text-2xl mb-2">
        Welcome Owner! Here are your stats:
      </p>
      <div className="flex justify-between">
        <div className="p-8 text-sm flex rounded-md border-black shadow-xl">
          <div className="info">
            <p className="">Owner Balance</p>
            <p>{ownerBalance}</p>
          </div>
          <div className="w-10 icon flex items-center justify-center">
            <img src={creditIcon} />
          </div>
        </div>
        {/* ======================================== */}
        <div className="due p-8 text-sm flex rounded-md border-black shadow-xl">
          <div className="info">
            <p className="">Contract Balance</p>
            <p>{contractBalance}</p>
          </div>
          <div className="icon w-10 flex items-center justify-center">
            <img src={dueIcon} />
          </div>
        </div>
      </div>

      <div className="withdraw flex mt-8 justify-center">
        <button
          disabled={disableButton}
          onClick={handleWithdrawal}
          className="button bg-teal-600 p-1 rounded-md text-white"
        >
          {disableButton ? "Please wait" : "Withdraw"}
        </button>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default OwnerStats;
