import React from "react";
import PayDueForm from "./PayDueForm";
import CreditAccountForm from "./CreditAccountForm";
import creditIcon from "../../assets/credit.png";
import dueIcon from "../../assets/due.webp";
import durationIcon from "../../assets/clock.jpg";
import { getBlockchainContext } from "../../context/BlockchainContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let bikeStatusCSS =
  " bike-status m-1 p-2 text-sm flex rounded-md border-black shadow-xl";

const Stats = () => {
  const { renterBalance, duration, due, renter } = getBlockchainContext();

  return (
    <div className="m-16 p-10">
      <p className="font-semibold text-2xl mb-2">
        Welcome {renter?.firstName}! Here are your stats:
      </p>
      <div className="flex justify-between">
        <div className="credits p-2 text-sm flex rounded-md border-black shadow-xl">
          <div className="info">
            <p className="">Balance</p>
            <p>{renterBalance}</p>
          </div>
          <div className="w-10 icon flex items-center justify-center">
            <img src={creditIcon} />
          </div>
        </div>
        {/* ======================================== */}
        <div className="due p-2 text-sm flex rounded-md border-black shadow-xl">
          <div className="info">
            <p className="">Due</p>
            <p>{due}</p>
          </div>
          <div className="icon w-10 flex items-center justify-center">
            <img src={dueIcon} />
          </div>
        </div>

        <div className="duration p-2 text-sm flex rounded-md border-black shadow-xl">
          <div className="info">
            <p className="">Ride Mins</p>
            <p>{duration}</p>
          </div>
          <div className="icon w-10 flex items-center justify-center">
            <img src={durationIcon} />
          </div>
        </div>

        {/* ===================================== */}
        <div
          className={
            `${renter && renter.active ? "bg-red-500" : "bg-green-500"}` +
            bikeStatusCSS
          }
        >
          <div>
            <p className="text-white">Bike Status</p>
          </div>
        </div>
      </div>
      <div className="forms flex mt-8">
        <CreditAccountForm />
        <PayDueForm />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Stats;
