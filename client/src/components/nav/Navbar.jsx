import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getBlockchainContext } from "../../context/BlockchainContext";

const Navbar = () => {
  const { connectWallet, currentAccount } = getBlockchainContext();

  return (
    <>
      <div className="flex justify-between bg-gray-300 p-2">
        <div className="logo text-3xl">
          <Link to="/" className="cursor-pointer">
            BikeChain
          </Link>
        </div>
        <div className="">
          <Link to="/dashboard">
            <button
              onClick={connectWallet}
              className="button bg-teal-600 p-1 rounded-md text-white"
            >
              {currentAccount
                ? `${currentAccount.slice(0, 5)}...${currentAccount.slice(
                    currentAccount.length - 4
                  )}`
                : "Connect Wallet"}
            </button>
          </Link>
          <Link to="/admin">
            <button className="ml-2 button bg-teal-600 p-1 rounded-md text-white">
              Admin
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
