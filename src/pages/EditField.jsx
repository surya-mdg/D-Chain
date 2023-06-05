import React from 'react'

const EditField = ({labelName, inputType, inputId, inputName, placeholder,change,value }) => {
  return (
    <div className="flex-col mt-10 flex md:flex-col bg-[#13131a] rounded-[20px]">        
        <label className="text-white font-bold text-[20px]" htmlFor="form6Example9">{labelName}</label>
        <div className="flex mt-3 bg-[#1c1c24] rounded-[100px] justify-center items-center">
            <input type={inputType} id={inputId} name={inputName} placeholder={placeholder} className="flex w-full font-epilogue font-normal text-[20px] pl-10 pr-10 pt-3 pb-3 placeholder:text-[#4b5264] text-white bg-[#1c1c24] rounded-[50px] outline-none" onChange={change} value={value}/>        
        </div> 
    </div>
  )
}

export default EditField