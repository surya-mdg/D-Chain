
import React, {useState} from 'react'
import {BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Sidebar from './routes/Sidebar'
import Dashboard from './pages/Dashboard.jsx'
import Details from './pages/Details.jsx'
import Donations from './pages/Donations.jsx'
import Profile from './pages/Profile.jsx'
import Home from './routes/Home'

//------------------------Ethereum Imports------------------------

import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import abi from "./utils/supplychain.json";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const getEthereumObject = () => window.ethereum;
const contractAddress = "0xB6f37486d340692741F86d96fFE589173b93C849"; //Address needs to be updated also in Donations.jsx, Dashboard.jsx & Details.jsx
const contractABI = abi.abi;

//------------------------Ethereum Imports------------------------


const App = () => {
  const [message, setMessage] = useState("Loading...");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});
  const navigate = useNavigate();

  window.ethereum.on('accountsChanged', async(accounts) => {
    setAccount(accounts[0]);
  })

  const findAuthorizedWallet = async () => { //Searches for an authorized Metamask account
    
    try {
      const ethereum = getEthereumObject();

      if (ethereum == null) {
        setMessage("Install Metamask");
        console.log("No Metamask Found");
        return null;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length == 0) {
        setMessage("No Authorized Account");
        console.log("No Authorized Account");
        ConnectWallet();
        return null;
      } else {
        const acc = accounts[0];
        setAccount(accounts[0]);
        GetContract();
        console.log("Account connected to: " + message);
        navigate('/dashboard');
        accounts[0];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const ConnectWallet = async () => { //If no authorized account is found, this function will ask permission to connect to an account
    try {
      const ethereum = getEthereumObject();

      if (ethereum == null) {
        setMessage("Install Metamask");
        console.log("No Metamask Found");
        return null;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length == 0) {
        setMessage("No Authorized Account");
        console.log("No Authorized Account");
        return null;
      } else {
        setMessage("" + accounts[0]);
        setAccount(accounts[0]);
        GetContract();
        console.log("Account connected to: " + message);
        navigate('/dashboard');
        accounts[0];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const GetContract = async() => { //Gets the contract from the blockchain to run functions
    try {
      const ethereum = getEthereumObject();

      if (ethereum) {
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const socialMediaContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(socialMediaContract);
        console.log("Contract Set");
    } else setMessage("Ethereum Not Found");
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home connect={findAuthorizedWallet}/>} />
      <Route path="/dashboard" element={<Sidebar account={account}><Dashboard contract={contract} address={contractAddress} abi={contractABI}/></Sidebar>} />
      <Route path="/details" element={<Sidebar account={account}><Details /></Sidebar>} />
      <Route path="/profile" element={<Sidebar account={account}><Donations /></Sidebar>} />
    </Routes>

  )
}

export default App