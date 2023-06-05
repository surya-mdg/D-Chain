import React from 'react'

const CountBox = ({title, value}) => {
  return (
    <div className='flex flex-col items-center flex-1'>
      <h4 className='font-epillogue text-[50px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate'>{value}</h4>
      <p className='bg-[#2c2f32] text-white text-[20px] rounded-b-[10px] w-full text-center p-3 truncate justify-center'>{title}</p>
    </div>
  )
}

export default CountBox