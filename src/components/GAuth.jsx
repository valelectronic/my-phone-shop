
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify'
import { db } from '../firebase'
 import { useNavigate } from 'react-router-dom'
export default function GAuth() {
  const navigate = useNavigate()
// sign it with Google account 
  async  function  onGoogleClick(){
    try{
      const auth = getAuth()
      const provider = new
      GoogleAuthProvider() 
      const result = await signInWithPopup(auth,provider)
      const user = result.user
      
      //check if user already exist when sign with Google
      const DocRef = doc(db,"users",user.uid)
      const docSnap = await getDoc(DocRef)
      if(!docSnap.exists())(
        await setDoc(DocRef,{
          name: user.displayName,
          email:user.email,
          timestamp: serverTimestamp()
        })
      )
      navigate("/")

    }catch(error){
      toast.error("not authorized with Google")
      
    }
  }
  return (
    <button type='button' onClick={onGoogleClick} className='flex items-center justify-center
    w-full bg-red-600 text-white px-7 py-3 uppercase
    text-sm font-medium shadow-md hover:shadow-lg active:shadow-lg
    transition duration-150 rounded
     hover:bg-red-700 active:bg-red-800
      '> <FcGoogle className='text-2xl mr-2 bg-white rounded-full'/> continue with Google</button>
  )
}
