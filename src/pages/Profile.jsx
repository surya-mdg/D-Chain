import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CountBox from './CountBox';
import DonationBox from './DonationBox';
import CustomButton from './CustomButton';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {

    }  

  return (
    <div className='w-[100%] justify-center items-center bg-[#13131a]'>
        {isLoading && 'Loading...'}

        <div className='flex md:flex-row pt-10 gap-[30px] flex-col w-[100%]'>
            <div className='flex-1 flex-col pl-[40px]'>
                <div className='flex-1 flex-row'>
                    <div className='flex-1 flex-col'>
                        <div className='text-gradient text-[50px]'>
                        Owner name
                        </div>

                        <div className='text-white text-[20px]'>
                            Type
                        </div>
                    </div>

                    <CustomButton title='Save' styles='w-[150px] mt-10 bg-[#8c6dfd] my-5' btnType='button' handleClick={handleSave}/>
                </div>

                <div className='mt-4 flex md:flex-col bg-[#1c1c24] w-full rounded-[20px]'>
                    <div className='pl-6 pt-6 pb-3 text-white font-bold text-[20px]'>
                        Location    
                    </div>

                    <div className='pl-6 pb-6 pr-6'>
                        <input className="flex w-full font-bold text-[17px] placeholder:text-gray-400 text-gray-400 bg-transparent outline-none" value='15, 1st Floor Morvi House, 28/30 Goa Street, Ballard Estate, Mumbai, Maharashtra 400038' />
                    </div>
                    
                </div>

                <div className='mt-10 flex md:flex-col bg-[#1c1c24] w-full rounded-[20px]'>
                    <div className='pl-6 pt-6 pb-3 pr-6 text-white font-bold text-[20px]'>
                        Description    
                    </div>

                    <div className='pl-6 pb-6 pr-6'>
                        <input className='flex w-full font-bold text-[17px] placeholder:text-gray-400 text-gray-400 bg-transparent outline-none' value='engaged in agriculture, raising living organisms for food or raw materials including several dry fruits, agriculture-based textile raw materials, roots and tuber crops, pulses, farmed fish, eggs, coconut, sugarcane and numerous vegetables.' />
                    </div>
                    
                </div>

                <div className='mt-20 text-white text-[30px]'>
                    Donations received
                </div>

                <div className='mt-10 flex md:flex-col bg-[#1c1c24] w-full'>
                    <DonationBox title='0x12345678902345asdfgh' value='100'/>
                    <DonationBox title='0xwertyui5678902356789' value='150'/>
                    <DonationBox title='0xzxcvbnmwerty12345678' value='40'/>
                    <DonationBox title='0xplklmijnuhbygv234567' value='900'/>
                    <DonationBox title='0x1234567890wertyuisdf' value='1250'/>                    
                </div>
                
            </div>    
            {/** Replace donation value by state.amount and contributer value by donators.length */} 
            <div className='flex md:w-[20%] w-full flex-col flex-wrap justify-between mt-[270px] mr-10'>                
                <CountBox title='Donations received' value='300'/> 
                <CountBox title='Donators' value='5'/>                                
            </div>                
        </div>

    </div>
  )
}

export default Profile