import React from "react";
import { getBlockchainContext } from "../../context/BlockchainContext";

const Bike = ({ bike }) => {
  const { checkOut, checkIn } = getBlockchainContext();

  async function handleCheckout() {
    await checkOut(bike.id);
  }

  async function handleCheckin() {
    await checkIn(bike.id);
  }

  return (
    <>
      <div className="bike flex flex-col justify-between shadow-2xl m-6 p-2 w-1/3">
        <div className="image">
          <img src={bike.img} />
        </div>
        <p className="my-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptate,
          ratione, dignissimos odio debitis iure ut libero perferendis labore
          saepe tenetur aliquid eligendi
        </p>
        <div className="flex gap-3 justify-center m-2">
          <button
            onClick={handleCheckout}
            className="button bg-teal-600 p-1 rounded-md text-white"
          >
            Check Out
          </button>
          <button
            onClick={handleCheckin}
            className="button bg-teal-600 p-1 rounded-md text-white"
          >
            Check In
          </button>
        </div>
      </div>
    </>
  );
};

export default Bike;
