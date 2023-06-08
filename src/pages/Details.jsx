
import React,{useState,useEffect} from 'react';
import  '../components/pages.css'
import EditField from './EditField';
import ChooseFile from './chooseFile';
import { NFTStorage, File } from 'nft.storage'
const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQyRGFBOTZkMTE2MmQ0MDEwM0I2N2Y1NTlCRDUzNTc4MUE0OTA1MGYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDc5MDQ0MTcxNCwibmFtZSI6IkRlY2VudHJhbGl6ZWQtUGludGVyZXN0In0.Y5PmtHaI1GkUA6GqAT4QWP2Bp8rwGcR3mrIumFnZMAo" })
import { HelpOutlineTwoTone } from '@mui/icons-material';
//import passimg from '../assets/passimg.jpg';

//------------------------Ethereum Imports------------------------

import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import abi from "../utils/supplychain.json";

const getEthereumObject = () => window.ethereum;
const contractAddress = "0xB6f37486d340692741F86d96fFE589173b93C849";
const contractABI = abi.abi;
let supplyChainContract;

//------------------------Ethereum Imports------------------------

const Details = () => {
  const [inputText, setInputText] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [flag,setFlag]=useState(false);
  const [waiting,setWait] = useState(false);

//--------------------------Surya's Code--------------------------

  const [details,setDetails] = useState({name:"",role:"",address: "", phone: "", email: "", link: ""}); //Stores the user details
  const [userChanged, setUserChanged] = useState(false); //To check if the user has updated their data

  useEffect(() => {
    const reloadRun = async () => {
        await GetContract();
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

  const GetFileLink = async (_url) => {
    const code = "https://ipfs.io/ipfs/" + _url.split("/")[2] + "/" + _url.split("/")[3];
    var pdfLink = "";
    await fetch(code)
    .then(response => response.json())
    .then(data => {
        let img = data.image
        pdfLink = "https://ipfs.io/ipfs/" + img.split("/")[2] + "/" + img.split("/")[3];
    })
    .catch(error => console.error(error));
    console.log("PDF URLs: " + pdfLink);
    return pdfLink;
  }

  const FileUpload = async (_name, _description, _file) => {
    const metadata = await client.store({
    name: _name,
    description: _description,
    image: _file,
    });
    console.log("IPFS URL: " + metadata.url);
    const link = await GetFileLink(metadata.url);
    return link;
  }

  const handleUserData = async (event) =>{ //Updates the user data in the blockchain
    event.preventDefault();
    let link;
    setWait(true);
    if(event.target.elements["file"].files.length > 0)
    {
      link = await FileUpload("D-Chain","Decentralized supply chain", event.target.elements["file"].files[0]);
    }
    else
      link = details.link;
    console.log(link);
    setFlag(true);
    if(userChanged || event.target.elements["file"].files.length > 0)
    {
      await supplyChainContract.UpdateUser(details.role, details.name, details.email, details.phone, details.address, link);
      setUserChanged(false);
    }
  }

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

  const handleProductData = async (event) => { //Handles the product data being entered
    event.preventDefault();
    await supplyChainContract.UpdateSupplyChain(parseInt(event.target.prodCode.value), event.target.prodInfo.value);
  }

  const OnUserDataChange = (event) =>{ //Handles the user data being entered
    setDetails((prev) => {
      return {...prev,[event.target.name]: event.target.value};
    });
    setUserChanged(true); 
  }

  const Donate = async () => { //Handles the donation being made
    const amount = ethers.parseEther("1");
    await supplyChainContract.Donate(0,{value: amount});
  }

//--------------------------Surya's Code--------------------------

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inputText === "123") {
      setIsPasswordCorrect(true);

      const user = await supplyChainContract.GetUser(); //Retreives user data from the blockchain
      console.log(user);
      setDetails(() => {
        console.log(user);
        return {name: user[2], role: user[1],address: user[5],phone: user[4], email: user[3], link: user[6]};
      });
      console.log(user);
    }
    setInputText("");
  }


  if(flag===false){
    if (!isPasswordCorrect) {
      return (
        <div className="parent">
          <div className="lognp">
            <h1 className="text">Please enter password to</h1>
            <h6 className="textSub" >fill the details</h6>
            <form onSubmit={handleSubmit} className="form">
              <input
                className="inp"
                type="password"
                value={inputText}
                placeholder='Password'
                onChange={handleChange}
              />
              <button className="butt" style={{backgroundColor:"white", border:"1px solid #eee"}} type="submit">
                Let's Go
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="parent">
        <div className="det">
        <form className="container" action="" onSubmit={handleUserData}>

          <div className='flex flex-row mt-2 mt-9 gap-[30px] w-[100%] justify-center'>
            <label className="text-white font-bold text-[40px] text-middle">Your Details</label>
          </div>  

          <div className="flex flex-row mt-2 gap-[30px]">
            <div className="flex-col w-full">
              <EditField name="name" labelName="Name" inputType="text" inputId="form6Example1" inputName="name" placeholder="Name" change={(value) => OnUserDataChange(value)} value={details.name}/>
            </div>
            <div className="flex-col w-full">
              <EditField name="role" labelName="Role" inputType="text" inputId="form6Example2" inputName="role" placeholder="Farmer / Manufacturer / Shop" change={(value) => OnUserDataChange(value)} value={details.role}/>
            </div>
          </div>
  
         
          <div className="row mb-4">
            
            <div className="col">
              <div className="flex-col mt-10 flex md:flex-col bg-[#13131a] rounded-[20px]">        
                <label className="text-white font-bold text-[20px]" htmlFor="form6Example3">Email</label>
                <div className="flex mt-3 bg-[#1c1c24] rounded-[100px] justify-center items-center">
                    <input type="email" id="form6Example9" name="email" placeholder="companyname@domain.com" className="flex w-full font-epilogue font-normal text-[20px] pl-10 pr-10 pt-3 pb-3 placeholder:text-[#4b5264] text-white bg-[#1c1c24] rounded-[50px] outline-none"  onChange={OnUserDataChange} value={details.email} />        
                </div> 
              </div>
              {/*
              <div className="form-group">
                <input type="email" id="form6Example9" className="form-control" name="mail" />
                <label className="form-label text-danger" htmlFor="form6Example3">Email</label>
              </div>
              */}
            </div>
            <div className="col">
              <div className="flex-col mt-10 flex md:flex-col bg-[#13131a] rounded-[20px]">        
                <label className="text-white font-bold text-[20px]" htmlFor="form6Example4">Phone</label>
                <div className="flex mt-3 bg-[#1c1c24] rounded-[100px] justify-center items-center">
                    <input type="number" id="form6Example6" name="phone" placeholder="+91 1923456780" className="flex w-full font-epilogue font-normal text-[20px] pl-10 pr-10 pt-3 pb-3 placeholder:text-[#4b5264] text-white bg-[#1c1c24] rounded-[50px] outline-none"  onChange={OnUserDataChange} value={details.phone}/>        
                </div> 
              </div>
              {/*
              <div className="form-group">
                <input type="number" id="form6Example6" className="form-control" name="phone" />
                <label className="form-label text-danger" htmlFor="form6Example4">Phone</label>
              </div>
              */}
            </div>
          </div>
          
          <div className="form-group mb-4">
            <div className="flex-col mt-10 flex md:flex-col bg-[#13131a] rounded-[20px]">        
                <label className="text-white font-bold text-[20px]" htmlFor="form6Example6">Address</label>
                <div className="flex mt-3 bg-[#1c1c24] rounded-[100px] justify-center items-center">
                    <input type="text" id="form6Example5" name="address" placeholder="Your address" className="flex w-full font-epilogue font-normal text-[20px] pl-10 pr-10 pt-3 pb-3 placeholder:text-[#4b5264] text-white bg-[#1c1c24] rounded-[50px] outline-none" onChange={OnUserDataChange} value={details.address}/>        
                </div> 
            </div>
            {/*
            <input type="text" id="form6Example5" className="form-control" name="address" />
            <label className="form-label text-danger" htmlFor="form6Example6">Address</label>
            */}
          </div>

          <div className="flex-col mt-10 flex md:flex-col bg-[#13131a] rounded-[20px]">        
                <label className="text-white font-bold text-[20px]">Upload quality certification</label>
                {/*<chooseFile />*/}              
                <label className="mt-3">
                <input type="file" name="file"/>

                </label>
          </div>
       
          
          <div>
            <button style={{float:"right"}} type="submit" className="btn btn-warning rounded-[20px] pr-20 pl-20 pt-3 pb-3 btn-block mb-4 btn-danger">{waiting ? "Uploading" : "Next"}</button>
          </div>
          
          {/*   
          <div>
            <button style={{float:"right"}} type="button" onClick={Donate} className="btn btn-warning rounded-[20px] pr-20 pl-20 pt-3 pb-3 btn-block mb-4 btn-danger">Donate</button> {/* This button should appear in the supply chain page next to farmers [Currently clicking will donate 1 ETH to user with id = 0] 
          </div>
          */}
        </form>
      </div>
      </div>
      );
    }
  }
  else{
      return(
        <div className='parent'>
        <div className="det">
        <form className="container" action="" onSubmit={handleProductData}>
        <h1 className="textd">Update supply chain</h1>

          <div className="flex-col mt-10 flex md:flex-col bg-[#13131a] rounded-[20px]">        
                <label className="text-white font-bold text-[20px]" htmlFor="form6Example3">Product Code</label>
                <div className="flex mt-3 bg-[#1c1c24] rounded-[100px] justify-center items-center">
                    <input type="text" id="form6Example3" name="prodCode" placeholder="Product Code" className="flex w-full font-epilogue font-normal text-[20px] pl-10 pr-10 pt-3 pb-3 placeholder:text-[#4b5264] text-white bg-[#1c1c24] rounded-[50px] outline-none" />        
                </div> 
          </div>

          <div className="flex-col mt-10 flex md:flex-col bg-[#13131a] rounded-[20px]">        
                <label className="text-white font-bold text-[20px]" htmlFor="form6Example4">Product info</label>
                <div className="flex mt-3 bg-[#1c1c24] rounded-[100px] justify-center items-center">
                    <textarea id="w3review" name="prodInfo" rows="4" placeholder="Product Info" className="flex w-full font-epilogue font-normal text-[20px] pl-10 pr-10 pt-4 pb-3 placeholder:text-[#4b5264] text-white bg-[#1c1c24] rounded-[50px] outline-none" />        
                </div> 
          </div>



          {/*
          <div className="form-group mb-4">
            <input type="text" id="form6Example3" className="form-control" name="product name" />
            <label className="form-label text-danger" htmlFor="form6Example3">Product Name</label>
          </div>

          <div className="form-group mb-4">
            <input type="datetime-local" id="form6Example4" className="form-control" name="doj" />
            <label className="form-label text-danger" htmlFor="form6Example4">Product received date and time</label>
          </div>

          <div className="form-group mb-4">
            <textarea id="w3review" name="w3review" rows="4" className="form-control" cols="125"></textarea>
            <label className="form-label text-danger" htmlFor="form6Example4">Product info</label>
           </div>
           
          */}

          <div>
            <button style={{float:"right",marginTop:"20px"}} type="submit" className="btn btn-warning rounded-[20px] pr-20 pl-20 pt-3 pb-3 btn-block mb-4 btn-danger">Submit</button>
          </div>
          
        </form>
      </div>
      </div>
    );
  }
 
};

export default Details;