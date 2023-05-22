import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import { db } from '../firebase'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Offers() {
  const [listings,setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastPage, setLastPage] = useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try {
        const listingRef = collection(db,"listings")
        const q = query(listingRef,where("offer", "==", true), 
        orderBy("timestamp", "desc"),
        limit(4) )
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastPage(lastVisible)

        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("could not fetch listings")
      }

    }
    fetchListings()

  },[])
async function LoadMore(){
  try {
    const listingRef = collection(db,"listings")
    const q = query(listingRef,where("offer", "==", true), 
    orderBy("timestamp", "desc"),
    startAfter(lastPage),
    limit(4) )
    const querySnap = await getDocs(q)

    const lastVisible =  querySnap.docs[querySnap.docs.length -1]
    setLastPage(lastVisible)

    const listings = []
    querySnap.forEach((doc)=>{
      return listings.push({
        id: doc.id,
        data: doc.data()
      })
    })
    setListings((prevState)=>[
      ...prevState, ...listings
    ])
    setLoading(false)
  } catch (error) {
    toast.error("could not fetch listings")
  }

}
  return (
    <div className='max-w-6xl max-auto px-3 '>
<h1 className='text-3xl text-center mt-6 font-bold mb-6'>OFFERS</h1>
{loading ? (
  <Spinner/>
): listings && listings.length > 0 ?(
<>
<main>
            <ul className="sm:grid sm:grid-cols-2 
            lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastPage && (
            <div className='flex justify-center items-center'>
              <button onClick={LoadMore} className='bg-white px-3 py-1.5 text-gray-700
              border border-gray-300 mb-6 mt-6
              h0ver:boder-slate-600
              rounded transition duration-150 ease-in-out'>load more</button>
            </div>
          )}
</>
): (
  <p>there are no current offers</p>
)
  }
    </div>
  )
}

export default Offers