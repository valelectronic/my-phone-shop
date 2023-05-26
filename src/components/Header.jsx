import React, { useEffect, useState } from 'react'
import {useLocation,useNavigate} from "react-router-dom"
import {getAuth, onAuthStateChanged} from "firebase/auth"

export default function Header() {

  const [pageState ,setPageState] = useState("sign in")
  const navigate = useNavigate()
  const location = useLocation()
  const auth = getAuth()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setPageState("profile")
      }else{
        setPageState("sign in")
      }
    })
  })
  function path(route) {
    if (route === location.pathname){
      return true
    }
  }
  return (
    <div className='bg-white boder-b shadow-sm sticky top-0 z-40 '>
      <header className='flex justify-between items-center px-3 max-w-6xl max-auto'>
        <div>
          <img width= "50px" height= "50px" src= " data:image/png;base64,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" alt='logo'
           className="h-9 cursor-pointer " onClick={()=>navigate("/")}/>
        </div>
        <div>
          <ul className='flex space-x-9'>
            <li className= 
            {`cursor-pointer py-3 text-sm border-b-[3px] font-bold
             text-gray-400 border-b-transparent
             ${path("/") && 'text-black border-b-red-600'} `} onClick={()=>navigate("/")}>Home</li>
            <li className= 
            {`cursor-pointer py-3 text-sm border-b-[3px] font-semibold
             text-gray-400 border-b-transparent
             ${path("/offers") && 'text-black border-b-red-600'} `}onClick={()=>navigate("/offers")}>offers</li>
            <li className= 
            {` cursor-pointer py-3 text-sm border-b-[3px] font-semibold
             text-gray-400 border-b-transparent
             ${(path("/sign_in") ||path("/profile")) && 'text-black border-b-red-600'} `}
             onClick={()=>navigate("/profile")}>{pageState}</li>
          </ul>
        </div>
      </header>
    </div>

  )
}
