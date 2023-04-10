import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase'
import Spinner from '../components/Spinner'
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore,{ Autoplay,Navigation,Pagination, EffectFade} from 'swiper'

import "swiper/css/bundle"
export default function Listing() {
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading,setLoading] = useState(true)
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
      autoplay={{ delay: 2000 }}
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
  </main>
  )
}
