import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const {name,email} = formData
  function logout (){
    auth.signOut()
    navigate("/")
  }
  return (
   <>
   <section className='max-w-6xl mx-auto flex
   justify-center flex-col items-center'>
    <h1 className='text-3xl text-center
    mt-6 font-bold'>my profile</h1>
    <div className='w-full md:w-[50%] mt-6 px3'>
    <form >
      {/* name input */}
      <input type="text" value={name}  id="name" disabled
      className='mb-6 w-full px-4 py2 text-xl text-gray-700
      bg-white border border-gray-300 rounded
      transition ease-in-out l'  />
      {/* email input */}
      <input type="email" value={email}  id="name" disabled
      className='mb-6 w-full px-4 py2 text-xl text-gray-700
      bg-white border border-gray-300 rounded
      transition ease-in-out l'  />
      <div className='mb-6 flex justify-between whitespace-nowrap
      text-sm sm:text-lg '>
        <p className='flex items-center '>do you want to change your name? 
        <span className='text-red-600 hover:text-red-700
        transiton ease-in-out duration-200 ml-2 cursor-pointer'>Edit</span>
        </p>
        <p onClick={logout} className='text-blue-600
        hover:text-blue-800 transition duration-200 cursor-pointer'>sign out</p>
      </div>
    </form>
   </div>
   </section>
   
   </>
  )
}
