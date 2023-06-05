import React from 'react';
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import abi from "../utils/supplychain.json";

const getEthereumObject = () => window.ethereum;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = abi.abi;
let supplyChainContract;

const Donate = async () => { //Handles the donation being made
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
    const amount = ethers.parseEther("0.0065");
    await supplyChainContract.Donate(0,{value: amount});
}

const SearchResult = ({ ownType, owner, prodName, loc, arvDate, prodDesc, fileName, nodeAdd, contact}) => {
  return (

    <div className='w-[100%]'>
        
        {/*<div className="absolute left-1/2 mb-2 h-[50px] min-h-[1em] w-0.5 bg-neutral-100 opacity-100 dark:opacity-50"></div>*/}
        

        <div className='bg-[#1c1c24] rounded-[20px] mt-10 p-10 h-fit'>

            <div className='relative'>
                {ownType == "Farmer" ? <button style={{float:"right"}} type="button" onClick={Donate} className="btn btn-warning rounded-[20px] pr-20 pl-20 pt-3 pb-3 btn-block mb-4 btn-danger">Donate</button> : null} {/* This button should appear in the supply chain page next to farmers [Currently clicking will donate 1 ETH to user with id = 0] */}
            </div>

            <div className='text-white font-bold text-[45px] text-left font-poppins'>
                {ownType}
            </div>
            <div className='text-white text-[20px] text-left font-bold'>
                Owner: {owner}
            </div>
            <div className='text-white text-[20px] text-left font-bold'>
                Node Address: {nodeAdd}
            </div>
            <div className='text-white text-[20px] text-left font-bold'>
                Product name: {prodName}
            </div>
            <div className='text-white text-[20px] text-left font-bold'>
                Email: {contact}
            </div>
            <div className='text-white text-[20px] text-left font-bold'>
                Location: {loc}
            </div>

            <div className='text-white text-[20px] text-left font-bold mt-4'>
                Arrived Date: {arvDate}
            </div>
            

            <div className='text-white text-[20px] text-left mt-4'>
                Description: {prodDesc}
            </div>

            {fileName != "" ? 
            <div className='text-white text-[20px] mt-4 text-left font-bold'>
                Quality certificate: <a href={fileName} className='text-blue-400'>{fileName}</a>
            </div> : null}
            
        </div>
    </div>
    
  )
}

export default SearchResult