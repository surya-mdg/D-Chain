import React from 'react'

const DonationBox = ({title, value}) => {
  return (
    <div className='flex flex-row justify-between rounded-[10px]'>
        <div className='pl-6 pt-6 pb-3 pr-6 text-gray-400 font-bold text-[20px]'>
            {title}
        </div>

        <div className='pb-3 pr-6 pt-6 text-white font-bold text-[20px]'>
            {value} ETH
        </div>                    
    </div>
  )
}

export default DonationBox