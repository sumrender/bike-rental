import { useEffect } from "react";
import { useState } from "react";
import { getBlockchainContext } from "../../context/BlockchainContext";
import Loading from "../loading/Loading";
import OwnerStats from "./OwnerStats";

function Admin() {
  const { ownerBalance } = getBlockchainContext();

  return (
    <>
      {/* {ownerBalance === undefined ? (
        <Loading />
      ) : ownerBalance === null ? (
        <h1>Not Authorized</h1>
      ) : (
        <OwnerStats />
      )} */}
      <OwnerStats />
    </>
  );
}

export default Admin;
