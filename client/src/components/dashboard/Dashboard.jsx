import React from "react";
import Stats from "./Stats";
import AddRenterForm from "./AddRenterForm";
import Bike from "./Bike";
import bike1 from "../../assets/bike1.jpg";
import { getBlockchainContext } from "../../context/BlockchainContext";
import Loading from "../loading/Loading";

const bikeData = [
  {
    img: bike1,
    id: "one",
  },
  {
    img: bike1,
    id: "two",
  },
  {
    img: bike1,
    id: "three",
  },
];

const Dashboard = () => {
  const { renterExists, currentAccount } = getBlockchainContext();

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="justify-self-center w-[40rem]">
          {renterExists == null && currentAccount ? (
            <Loading />
          ) : renterExists ? (
            <Stats />
          ) : (
            <AddRenterForm />
          )}
        </div>
      </div>
      <div className="bikes flex mb-32">
        {renterExists && bikeData.map((bike, i) => (
          <Bike key={i} bike={bike} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
