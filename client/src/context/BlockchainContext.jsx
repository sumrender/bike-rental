import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { contractAbi, contractAddress } from "../config.json";
import { ethers } from "ethers";
import { useContext } from "react";
import { toast } from "react-toastify";

const BlockchainContext = createContext("");

const BlockchainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contractBalance, setContractBalance] = useState();
  const [renterExists, setRenterExists] = useState();
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

  const getBalance = async () => {
    try {
      const balanceOf = await contract.balanceOf();
      let balanceFormatted = ethers.utils.formatEther(balanceOf);
      console.log(balanceFormatted);
      setContractBalance(balanceFormatted);
      // console.log(contractBalance);
      // why is this undefined? I do not understand
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
      console.log(error);
    }
  };

  const getRenter = async () => {
    console.log("getRenter function called to get user's data");
    try {
      const renterData = await contract.getRenter(currentAccount);
      setRenter(renterData);
      console.log(renterData);
    } catch (error) {
      console.log(error);
    }
  };

  const addRenter = async (
    walletAddress,
    firstName,
    lastName,
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
      console.log(error);
    }
  };

  const getRenterBalance = async () => {
    try {
      if (!currentAccount) return;
      const balance = await contract.balanceOfRenter(currentAccount);
      setRenterBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  const getDue = async () => {
    try {
      if (!currentAccount) return;
      const due = await contract.getDue(currentAccount);
      setDue(ethers.utils.formatEther(due));
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalDuration = async () => {
    if (!currentAccount) return;
    try {
      const duration = await contract.getTotalDuration(currentAccount);
      setDuration(Number(duration));
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async (value) => {
    console.log("make payment function called");
    try {
      const ethVal = ethers.utils.parseEther(value);
      const payment = await contract.makePayment(currentAccount, ethVal);
      await payment.wait();
      await getRenter();
      await getRenterBalance();
      await getTotalDuration();
      await getDue();
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkOut = async () => {
    console.log("checkout called");
    if (!currentAccount) return;
    try {
      const checkout = await contract.checkOut(currentAccount);
      await checkout.wait();
      await getRenter();
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkIn = async () => {
    console.log("checkin called");
    if (!currentAccount) return;
    try {
      const checkin = await contract.checkIn(currentAccount);
      await checkin.wait();
      await getRenter();
      await getDue();
      await getTotalDuration();
    } catch (error) {
      toast.error(error.data.message, {
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
  }, [currentAccount]);

  return (
    <BlockchainContext.Provider
      value={{
        currentAccount,
        renterExists,
        renterBalance,
        duration,
        due,
        renter,
        connectWallet,
        addRenter,
        deposit,
        makePayment,
        checkOut,
        checkIn,
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
