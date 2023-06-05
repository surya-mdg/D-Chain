import React from 'react';
import CustomButton from './CustomButton';

const DonateEth = () => {
  
  const handleDonate = async () => {

  }  

  return (
    <div className='flex flex-col w-[100%]'>
        <div className='bg-[#2c2f32] text-white text-[20px] rounded-t-[10px] w-full text-center p-3 truncate justify-center'>
            Donate
        </div>

        <div className="flex h-[100px] bg-[#13131a] w-full justify-center items-center pt-5 pb-5">
        <input type="number" min='0' placeholder="0 ETH" step='10' className="flex w-full font-epilogue pl-3 pr-3 font-normal text-[50px] placeholder:text-gray-400 text-[#8c6dfd] bg-transparent outline-none" />        
        </div>

        <div className='bg-[#13131a] text-white text-[17px] p-3'>
            <p>Show your support by donating to a raw materials producer</p>
        </div>

        <CustomButton title='Donate' styles='w-full bg-[#8c6dfd] my-2' btnType='button' handleClick={handleDonate}/>

    </div>
  )
}

export default DonateEth