import React from 'react'
import {useLocation,useNavigate} from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  function path(route) {
    if (route === location.pathname){
      return true
    }
  }
  return (
    <div className='bg-white boder-b shadow-sm sticky top-0 z-50'>
      <header className='flex justify-between items-center px-3 max-w-6xl max-auto'>
        <div>
          <img src='data:image/png;base64,
          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
          PpQWHZfyddmDT9t9p0XLM/ehRMAmzAp9s
          XpuKoTQSbHentQoQfXn7SaRBxx
          jefiDBMWwNHEMjHMPWwDE0wjFsDRxDIxzD1q
          AWhvunx6DS+YnHM5w+8jz0Z7lT4uEMTZ6ke6H0g
          oUHMwyo3/feOJf8EPCDGZp8iPdE2iTDkbled4Q9/P6hDOuKZr
          R6sR/KUHhP4ccByoAiH1V7XfjfrEJ8KEPYeupVPgwPNa
          76+hR8mtaj6I9kiJ20up/yRoZiQ9PWTR/JcFqhhVXcyhB7
          ia2T1MCQOWRmws0MZ46hY2iBY+g5hhwcQwLH0HMMLXAMPceQg2NI4Bh6jqEFjqHnGEoIplBFheF0Wn5jZUcYHt59/+VaSYlhdjX
          /e6mHpxsMNwUtX/+z7NajbjCEuNMsnLRgCAGnzE0aCrrBUDoSWDC0HXaU4Bh6jqEFjqHnZhoBWC2y5b1gCMc5/8Zq4Y17vn+8xlUUDL3J0fd7pbH1HWHoBROIG5EYfnNkI+FVdIWhgMKwChxDzzG0wDH0HEMOjiGBY+g5hhY4hp5jyMExJHAMPcfQgr/LMACAI2UoHlBMkKH5FRWC
          YeUMwHBieQUOCyTigRXjfjd+Lc+GY9/sG5k+/mhBPTgbevWfv4P2LxFkKXbrh+TKQTvqc3mmToHc91WIsNdtCB66EPGmn2HJLUutxwoP0+n37kHYP3sFa8cA5yH1QxIG0XYROOC0x/zTbsIx7D7+c4Z/CY5h9/HfMaR3rXYduk7DXc/YbRBfxvhvSfGl+iWRDg4ODg4O3j8YdOUdI193dgAAAABJRU5ErkJggg=='
           alt='logo'
           className="h-9 cursor-pointer" onClick={()=>navigate("/")}/>
        </div>
        <div>
          <ul className='flex space-x-9'>
            <li className= 
            {`cursor-pointer py-3 text-sm border-b-[3px] font-semibold
             text-gray-400 border-b-transparent
             ${path("/") && 'text-black border-b-red-600'} `} onClick={()=>navigate("/")}>Home</li>
            <li className= 
            {`cursor-pointer py-3 text-sm border-b-[3px] font-semibold
             text-gray-400 border-b-transparent
             ${path("/offers") && 'text-black border-b-red-600'} `}onClick={()=>navigate("/offers")}>offers</li>
            <li className= 
            {` cursor-pointer py-3 text-sm border-b-[3px] font-semibold
             text-gray-400 border-b-transparent
             ${path("/sign_in") && 'text-black border-b-red-600'} `}onClick={()=>navigate("/sign_in")}>sign in</li>
          </ul>
        </div>
      </header>
    </div>

  )
}
