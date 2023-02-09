import React from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { useState } from 'react'
import { Link} from 'react-router-dom'
import GAuth from '../components/GAuth'
import {createUserWithEmailAndPassword, getAuth,updateProfile} from "firebase/auth"
import {db} from "../firebase"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

export default function SignUp() {
  
  const [showPassword, setShowPassword] = useState((false))

  const [formData, setformData] = useState({

    name: "",
    email: "",
    password: ""
  })
  //
  const {email,password,name} = formData
  const navigate = useNavigate()
   function onChange(e){
setformData((prevState)=>({
  ...prevState,
  [e.target.id]: e.target.value
})
  )}
  //authentication
  async  function submitting(e){ 
    e.preventDefault()
    try {
      const auth = getAuth()
      const userDetail = await createUserWithEmailAndPassword(auth,email,password)
      updateProfile(auth.currentUser,{
        displayName:name
      })
      //deleting password and saving your details to the firestore
      const user = userDetail.user
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db,"users",user.uid),formDataCopy)
      navigate("/")
      toast.success("welcome to our E-shop")
      setformData.name("")
      setformData.email("")
      setformData.password("")
      
    } catch (error) {
      //using react toastify to alert error messages
toast.error("something went wrong, please follow instructions")

    }

  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'> Sign Up</h1>
      <div className=' flex justify-center flex-wrap items-center 
      py-10 px-6 max-w-6xl max-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img className='w-full rounded-2xl'
          src='https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=400 ' alt='key'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={submitting} >
            <input className='text-xl text-gray-700
             transition
             ease-in-out rounded border-gray-300
             bg-white w-full px-4 py-2 mb-6 ' type="text"
            id='name' value={name} onChange = {onChange}
            placeholder= ' Full name:' />

            <input className='text-xl text-gray-700
             transition
             ease-in-out rounded border-gray-300
             bg-white w-full px-4 py-2 mb-6 ' type="email"
            id='email' value={email} onChange = {onChange}
            placeholder= ' Email address:' />

            <div className='relative mb-6'>
            <input className='text-xl text-gray-500
             transition
             ease-in-out rounded border-gray-300
             bg-white w-full px-4 py-2 '
             type={showPassword ? "text": "password"}
            id='password' value={password} onChange = {onChange}
            placeholder= ' Password:' />
            {showPassword? (
              <AiFillEyeInvisible  className='absolute right-3 top-3 
              text-xl cursor-pointer'
               onClick={()=>{setShowPassword((prev)=>!prev)}}/>

            ):<AiFillEye className='absolute right-3 top-3 
            text-xl cursor-pointer'  onClick={()=>{setShowPassword((prev)=>!prev)}}/>}
            </div>
            <div className='flex justify-between
            text-sm sm:text-lg whitespace-nowrap'>
              <p className='mb-6'>have an account? 
              <Link to= "/Sign_in" className='text-red-600
              transiton duration-200 ease-in-out ml-2 hover:text-red-700'>
                 Sign In</Link>
              </p>
              <p>
                <Link to = "/forgot_password"
                className='text-blue-700
                transiton duration-200 ease-in-out  hover:text-blue-800'>  Forgot password ?</Link>
              </p>
            </div>
            <button type='submit' className='w-full
          bg-blue-600 text-white px-7 py-3
          text-sm font-medium uppercase rounded
          shadow-md hover:bg-blue-700
          transition duration-150
          active:bg-800 ease-in-out hover:shadow-lg'>Sign UP</button>
          <div className='my-4 before:border-t flex
          before:flex-1 item-center
          before:border-gray-300 before:border-teal-
          after:border-t 
          after:flex-1 items-center
          after:border-gray-300 after:border- t-200'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <GAuth/>
          </form>
         
        </div>
      </div>
    </section>
  )
}

