
import React, {useState} from 'react';
import  '../components/pages.css';

//------------------------Ethereum Imports------------------------

import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import abi from "../utils/supplychain.json";
import * as buffer from "buffer";
import SearchResult from './SearchResult';
window.Buffer = buffer.Buffer;

const contractAddress = "0xB6f37486d340692741F86d96fFE589173b93C849";
const contractABI = abi.abi;

//------------------------Ethereum Imports------------------------

const Dashboard = (props) => {
  const [prodID, setProdID] = useState("");
  const [prodDet, setProdDet] = useState([]);

  const GetSupplyChain = async () => { //Gets the supply chain of a product using its ID
    console.log("Entered ID: " + prodID);
    let chainCount = 0;

    const ethereum = window.ethereum;
    const provider = new Web3Provider(ethereum);
    const signer = provider.getSigner();
    const supplyChainContract = new ethers.Contract(contractAddress, contractABI, signer);

    const info = await supplyChainContract.GetSupplyChain(parseInt(prodID));
    info.map((node) => {
      chainCount++;
      const bigNumber = BigInt(node[4]);
      const timestamp = new Date((Number(bigNumber) * 1000));
      const chainInfo = {type: node[0][1], owner: node[0][2], location: node[0][5], desc: node[0][3], fileName: node[0][6], prodName: node[1], processDesc: node[2], nodeAdd: node[3], timestamp: timestamp.toLocaleString()};
      setProdDet((prev) => [...prev,chainInfo]);
      console.log(chainInfo);
    })
    console.log(prodDet);
  }

  const OnChange = (event) => {
    setProdID(event.target.value);
  }

  return (    
    <div className="parent">
        <div className="">
            <div>
               <h1 className="text">Search using product ID...</h1>
            </div>
            <div>
               <input name="prodID" size="130" className="inpd" type="text" placeholder="Product ID"  value={prodID} onChange={(value) => OnChange(value)}/> 
               <button className="butt" style={{backgroundColor:"white", border:"1px solid #eee"}} type="submit" onClick={() => GetSupplyChain()}>
                  Get
                </button>    

                {/* display when product ID is entered*/}
                {/*
                <div className='text-white font-bold text-[60px] mb-9 mt-20 text-left font-poppins'>
                    Product Journey
                  </div>
                */}

                <div className='flex w-[100%] flex-col flex-wrap justify-between mt-9'>   
                  {/*              
                  <SearchResult 
                    ownType={node[0][0]}
                    prodName={node[1]}
                    loc={node[0][2]}
                    arvDate="12/02/2023" 
                    dispDate="14/04/2023" 
                    prodDesc={node[2]}/>
                  */}
                  {
                    prodDet.map((item) => (
                    <SearchResult 
                      ownType={item.type}
                      owner={item.owner}
                      prodName={item.prodName}
                      loc={item.location}
                      arvDate={item.timestamp}                     
                      prodDesc={item.processDesc}
                      fileName={item.fileName}
                      nodeAdd={item.nodeAdd}
                      contact={item.desc}
                      />))
                  }
                  {/*
                  <SearchResult 
                    ownType="Manufacturer" 
                    prodName="Peanut Butter" 
                    loc="Bangalore" 
                    arvDate="12/02/2023"                     
                    prodDesc="This is passed product desc"/>
                */}
                </div>
            </div>
        </div>     
    </div>    
  )
};

export default Dashboard;