import React from 'react'
import {FcGoogle} from 'react-icons/fc'

export default function GAuth() {
  return (
    <button className='flex items-center justify-center
    w-full bg-red-600 text-white px-7 py-3 uppercase
    text-sm font-medium shadow-md hover:shadow-lg active:shadow-lg
    transition duration-150 rounded
     hover:bg-red-700 active:bg-red-800
      '> <FcGoogle className='text-2xl mr-2 bg-white rounded-full'/> continue with Google</button>
  )
}
