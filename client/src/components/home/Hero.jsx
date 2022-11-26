import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex items-center justify-center h-[60vh]">
        <div className="">
          <div className="w-[100%] text-center text-3xl font-semibold">
            <p className="">Rent your next bike</p>
            <p className="text-teal-500">with Crypto!</p>
          </div>
          <p>
            Connect your wallet, choose your bike, and you're off to the races.
          </p>
          <p>When you return it, you can easily pay you fare with BNB.</p>
          <p>And we all like those BNB gas fees!</p>
          <div>
            <Link to="dashboard">
              <button className="justify-center button bg-teal-600 p-1 rounded-md text-white mt-2">
                Choose my bike
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
