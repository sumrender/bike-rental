import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { contractAbi, contractAddress } from "../config.json";
import { ethers } from "ethers";
import { useContext } from "react";
import { toast } from "react-toastify";

const BlockchainContext = createContext("");

const BlockchainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [renterExists, setRenterExists] = useState();
  const [ownerBalance, setOwnerBalance] = useState();

  const [contractBalance, setContractBalance] = useState();
  const [renter, setRenter] = useState();
  const [renterBalance, setRenterBalance] = useState();
  const [due, setDue] = useState();
  const [duration, setDuration] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  const connectWallet = async () => {
    console.log("connect wallet called");
    try {
      if (!window.ethereum) return alert("Please install Metamask");
      const accounts = await provider.send("eth_requestAccounts");
      console.log("connection successful");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install Metamask");
      const accounts = await provider.send("eth_requestAccounts");
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // console.log("currentAccount:", currentAccount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOwnerBalance = async () => {
    try {
      const ownerBal = await contract.getOwnerBalance();
      let balanceFormatted = ethers.utils.formatEther(ownerBal);
      setOwnerBalance(balanceFormatted);
    } catch (error) {
      console.log(error.reason);
      setOwnerBalance(null);
    }
  };

  const withdrawOwnerBalance = async () => {
    try {
      await contract.withdrawOwnerBalance();
      console.log("Owner has withdrawn money successfully.");
    } catch (error) {
      console.log(error.reason);
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getContractBalance = async () => {
    try {
      const contractBal = await contract.balanceOf();
      let balanceFormatted = ethers.utils.formatEther(contractBal);
      setContractBalance(balanceFormatted);
    } catch (error) {
      console.log(error);
    }
  };

  const checkRenterExists = async () => {
    if (!currentAccount) return;
    try {
      const isRenter = await contract.renterExists(currentAccount);
      setRenterExists(isRenter);
      if (isRenter) getRenter();
    } catch (error) {
      console.log(error.reason);
    }
  };

  const getRenter = async () => {
    console.log("getRenter function called to get user's data");
    try {
      const renterData = await contract.getRenter(currentAccount);
      setRenter(renterData);
      console.log(renterData);
    } catch (error) {
      console.log(error.reason);
    }
  };

  const addRenter = async (
    walletAddress,
    firstName,
    lastName,
    cycleName,
    canRent,
    active,
    balance,
    due,
    start,
    end
  ) => {
    try {
      const addRenterToContract = await contract.addRenter(
        walletAddress,
        firstName,
        lastName,
        cycleName,
        canRent,
        active,
        balance,
        due,
        start,
        end
      );
      await addRenterToContract.wait();
      console.log(`${firstName} added`);
      checkRenterExists();
    } catch (error) {
      console.log(error.reason);
    }
  };

  const getRenterBalance = async () => {
    try {
      if (!currentAccount) return;
      const balance = await contract.balanceOfRenter(currentAccount);
      setRenterBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error.reason);
    }
  };

  const deposit = async (value) => {
    try {
      const depositVal = ethers.utils.parseEther(value);
      console.log(
        "🚀 ~ file: BlockchainContext.jsx ~ line 124 ~ deposit ~ depositVal",
        depositVal
      );

      const deposit = await contract.deposit(currentAccount, {
        value: depositVal,
      }); // Notice how ether val send as object, and in contract
      // deposit only has 1 parameter, walletAddress
      await deposit.wait();
      await getRenterBalance();
    } catch (error) {
      console.log(error.reason);
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getDue = async () => {
    try {
      if (!currentAccount) return;
      const due = await contract.getDue(currentAccount);
      setDue(ethers.utils.formatEther(due));
    } catch (error) {
      console.log(error.reason);
    }
  };

  const getTotalDuration = async () => {
    if (!currentAccount) return;
    try {
      const duration = await contract.getTotalDuration(currentAccount);
      setDuration(Number(duration));
    } catch (error) {
      console.log(error.reason);
    }
  };

  const makePayment = async (value) => {
    try {
      console.log("make payment function called");
      const ethVal = ethers.utils.parseEther(value);
      console.log(`balance: ${balance}, and due: ${ethVal}`);
      console.log("makePayment");
      const payment = await contract.makePayment(currentAccount, ethVal);
      await payment.wait();
      await getRenter();
      await getRenterBalance();
      await getTotalDuration();
      await getDue();
    } catch (error) {
      console.log(error.reason);
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkOut = async (cycleName) => {
    console.log("checkout called for id", cycleName);
    if (cycleName === "") {
      console.log("cycleID is empty");
      return;
    }
    if (!currentAccount) return;
    try {
      const checkout = await contract.checkOut(currentAccount, cycleName);
      await checkout.wait();
      await getRenter();
    } catch (error) {
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkIn = async (cycleName) => {
    console.log("checkin called for id", cycleName);
    if (!currentAccount) return;
    if (renter.cycleName !== cycleName) {
      console.log("CycleIDs do not match");
      return;
    }
    try {
      const checkin = await contract.checkIn(currentAccount);
      await checkin.wait();
      await getRenter();
      await getDue();
      await getTotalDuration();
    } catch (error) {
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkRenterExists();
    getRenterBalance();
    getDue();
    getTotalDuration();
    // admin calls
    getOwnerBalance();
    getContractBalance();
  }, [currentAccount]);

  // useEffect to reload page on
  // account change
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  return (
    <BlockchainContext.Provider
      value={{
        currentAccount,
        renterExists,
        duration,
        due,
        renterBalance,
        ownerBalance,
        contractBalance,
        renter,
        connectWallet,
        addRenter,
        deposit,
        makePayment,
        checkOut,
        checkIn,
        withdrawOwnerBalance,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const getBlockchainContext = () => {
  return useContext(BlockchainContext);
};

export default BlockchainProvider;
