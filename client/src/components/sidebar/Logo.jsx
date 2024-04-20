import React from 'react'
import image from "../../assets/images"

export default function Logo() {
  return (
    <div className='flex items-center gap-[14px]'>
      <img src={image.logo} alt="logo" />
      <h2 className='text-[#00A3FF] font-semibold text-[22px]'>PDP Chat</h2>
    </div>
  )
}
