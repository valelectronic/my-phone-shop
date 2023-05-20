import {React, useEffect} from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import { Swiper,SwiperSlide } from 'swiper/react'
import SwiperCore, {
    EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper'
 import 'swiper/css/bundle'
import { useNavigate } from 'react-router-dom'

export default function Slider() {
    const [listings, setListings] = useState(null)
    const [loading,setLoading] = useState(true)
    SwiperCore.use([Autoplay,Navigation,Pagination])
    const navigate = useNavigate()
    useEffect(() => {
      async function fetchListings() {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        console.log(listings)
        setLoading(false);
      }
      fetchListings();
    }, []);
    if(loading){
      return <Spinner/>
    }
    if(listings.length === 0){
      return <> </>
    }
  return (
    <>
   <Swiper 
   slidesPerView={1}
   navigation
   pagination={{ type: "progressbar" }}
   effect="fade"
   modules={[EffectFade]}
   autoplay={{ delay: 2000 }}
   >
   {listings.map(({data, id})=>(
      <SwiperSlide key={id}  onClick={()=> navigate(`/category/${data.type}
      /${id}`)}>
<div style={{background: `url(${data.imgUrls[0]})center, no-repeat`,
backgroundSize: 'cover'}} className='w-full h-[300px] overflow-hidden'>

</div>
      </SwiperSlide>  
    ))}
   </Swiper>
    
    </>
  )
}
