import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase'
import Spinner from '../components/Spinner'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import {FaShare,FaMapMarkerAlt,FaMemory} from "react-icons/fa"
import {TbCurrencyNaira} from "react-icons/tb"
import {MdMemory, MdSecurityUpdateGood} from 'react-icons/md'
import {getAuth} from "firebase/auth"
import ContactUs from "../components/ContactUs"



export default function Listing() {
  const auth = getAuth()
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading,setLoading] = useState(true)
    const [shareLink, setShareLink] = useState(false)
    const [contactUs, setContactUs] = useState(false)

    SwiperCore.use([Autoplay,Navigation,Pagination])
    useEffect(() => {
      async function fetchListing() {
        const docRef = doc(db, "listings", params.listingID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setListing(docSnap.data());
          setLoading(false);
        }
      }
      fetchListing();
    }, [params.listingID]);
    if (loading) {
      return <Spinner />;
    }


  return (
    <main>
    <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    <div className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer
   border-2 border-gray-400 rounded-full w-12 h-12 flex
   justify-center items-center ' onClick={()=>{
    navigator.clipboard.writeText(window.location.href)
    setShareLink(true)
    setTimeout(()=>{
setShareLink(false)
    },2000)
   }}>
<FaShare className='text-lg text-slate-500'/>
    </div>
    {shareLink && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2
         border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}
      <div className='flex flex-col md:flex-row max-w-6xl
      lg:mx-auto m-4 p-4 rounded-lg  shadow-lg bg-white
      lg:space-x-5'>
       <div className=' w-full'>
        <p className='text-2xl font-bold mb-3 text-blue-900'>
        {listing.name} -  #{""}  {listing.offer ? listing.regularPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        :listing.regularPrice
         .toString()
         .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
         {listing.offer ? "" : " "}
         
</p> 
<p className='flex items-center mt-6 mb-3 font-semibold'>
  <FaMapMarkerAlt className='text-green-700 mr-2'/>
  {listing.address}</p>

  <div className='flex justify-start items-center space-x-4 w -[75%]'>
    <p className='bg-red-800 w-full max-w-[200px]
    rounded-md p-1 text-white text-center font-semibold
    shadow-md'>{ listing.guarantee === true  ? "GUARANTEED" : "NO RECEIPT"}</p>
  <p className='w-full max-w-[200px] bg-green-800 p-1 text-white 
    text-center font-semibold shadow-md rounded-md' >
    {listing.offer && (
      <p>#{
        
         +listing.regularPrice - +listing.discount
        } discount</p>
    ) }
  </p>
  
  
  </div>
  <p className='mt-3 mb-3'>
    <span className='font-semibold'>Description - </span>
    { listing.description}
  </p>

<p>
<div>
    <ul className='flex items-center space-x-3 sm:space-x-10 text-lg
    font-semibold '>
      <li className='flex items-center whitespace-nowrap'>
        <MdMemory className='text-lg mr-1 bg-blue-900 rounded-sm'/>
        {listing.rom}
      </li>
      <li className='flex items-center whitespace-nowrap'>
        <FaMemory className='text-lg mr-1 bg-blue-900 rounded-sm'/>
        {listing.ram}
      </li>
      <li className='flex items-center whitespace-nowrap'>
        <MdSecurityUpdateGood className='text-lg mr-1 bg-green-600 rounded-sm'/>
        {listing.repaid === true ? "Brand New" : "Fairly Used"}
      </li>
    </ul>
    
  </div>
</p>
{
  listing.userRef !== auth.currentUser?.uid
  && !contactUs && (
<div className='mt-7'>
<button onClick={()=>setContactUs(true)} className='px-7 py-3 bg-blue-600 text-white font-medium
    text-sm uppercase rounded shadow-md hover:bg-blue-700
    hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
    w-full text-center transition duration-150 ease-in-out'> Email the  seller</button>

</div>
  )
}
{
  contactUs && (
    <ContactUs userRef = {listing.userRef} listing = {listing} />
  )
}

       </div>
      
      </div>
  </main>
  
  )
}
