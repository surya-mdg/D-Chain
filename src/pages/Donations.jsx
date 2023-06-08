
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CountBox from './CountBox';
import DonationBox from './DonationBox';
import DonateEth from './DonateEth';

//------------------------Ethereum Imports------------------------

import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import abi from "../utils/supplychain.json";

const getEthereumObject = () => window.ethereum;
const contractAddress = "0xB6f37486d340692741F86d96fFE589173b93C849";
const contractABI = abi.abi;
let supplyChainContract;

//------------------------Ethereum Imports------------------------

const Donate = () => {
  //const {state} = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [donations, setDonations] = useState({amount: 0, donators: 0}); //Sets the amount of donations and the number of donators
  const [donators, setDonators] = useState([]); //Stores list of donators and their respective donation amount

  const [user, setUser] = useState({name: "Register Your Details", location: "Register Your Details", email: "Register Your Details", type: ""});

  useEffect(() => {
    const reloadRun = async () => {
        await GetContract();
        await SetDonationInfo();
    }

    reloadRun();
  }, []);

  const GetContract = async() =>{ //Gets contract from blockchain to run functions
    try {
      const ethereum = getEthereumObject();

      if (ethereum) {
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        supplyChainContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
    } else setMessage("Ethereum Not Found");
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const SetDonationInfo = async() => { //Sets all the information for the donation page
        const user = await supplyChainContract.GetUser();
        console.log("Farmer ID: " + user[0] + " Name: " + user[2]);
        setUser({name: user[2], location: user[5], email: user[3], fileLink: user[6], type: user[1]});
        const donation = await supplyChainContract.GetDonations(user[0]);
        console.log("Amount: " + donation[0] + " Donators: " + donation[1]);
        setDonations({amount: ethers.formatEther(donation[0]), donators: parseInt(donation[1])});
        setDonators(donation[2]);
  }

  return (
    <div className='w-[100%] justify-center items-center bg-[#13131a]'>
        {isLoading && 'Loading...'}

        <div className='flex pt-10 md:flex-row gap-[30px] flex-col w-[100%]'>
            <div className='flex-1 flex-col pl-[40px]'>
                <div className='text-gradient text-[50px]' style={{marginBottom: "16vh"}}>
                    {user.name}
                </div>

                {/*<div className='text-white text-[20px]'>
                    Type
                </div>*/}

                <div className='mt-20 flex md:flex-col bg-[#1c1c24] w-full rounded-[20px]'>
                    <div className='pl-6 pt-6 pb-3 text-white font-bold text-[20px]'>
                        Location  
                    </div>

                    <div className='pl-6 pb-6 text-gray-400 font-bold text-[17px]'>
                        {user.location}
                    </div>

                    <div className='pl-6 pt-6 pb-3 text-white font-bold text-[20px]'>
                        Contact  
                    </div>

                    <div className='pl-6 pb-6 text-gray-400 font-bold text-[17px]'>
                        {user.email}
                    </div>

                    <div className='pl-6 pt-6 pb-3 text-white font-bold text-[20px]'>
                        Document Link:  <a href={user.fileLink} className='text-blue-400'>{user.fileLink}</a>
                    </div>
                    
                </div>

                {/*<div className='mt-10 flex md:flex-col bg-[#1c1c24] w-full rounded-[20px]'>
                    <div className='pl-6 pt-6 pb-3 pr-6 text-white font-bold text-[20px]'>
                        Description    
                    </div>

                    <div className='pl-6 pb-6 pr-6 text-gray-400 font-bold text-[17px]'>
                        engaged in agriculture, raising living organisms for food or raw materials including several dry fruits, agriculture-based textile raw materials, roots and tuber crops, pulses, farmed fish, eggs, coconut, sugarcane and numerous vegetables.
                    </div>
                    
                </div>*/}
                <div className='mt-20 text-white text-[30px]'>
                {user.type == "Farmer" ? "Donations received" : null}
                </div>

                {user.type == "Farmer" ? <div className='mt-10 flex md:flex-col bg-[#1c1c24] w-full'>                
                    {(donators.length == 0) ? <DonationBox title={"None"} value={0}/> : donators.map((donator, index) => (<DonationBox key={index} title={donator[0]} value={ethers.formatEther(donator[1])}/>))}             
                </div> : <div className='mt-10 flex md:flex-col bg-[#1c1c24] w-full h-[100px]'>                
                             
                </div>}
                <br/>
            </div>

            
            {/** Replace donation value by state.amount and contributer value by donators.length */} 
            <div className='flex md:w-[20%] mr-10 w-full flex-col flex-wrap justify-between mt-[190px]'>
                {user.type == "Farmer" ? <CountBox title='Donations received' value={donations.amount} style={{marginTop: "100"}}/> : null}
                {user.type == "Farmer" ? <CountBox title='Donators' value={donations.donators}/> : null}
            </div>
        </div>

    </div>
  )
}

export default Donate